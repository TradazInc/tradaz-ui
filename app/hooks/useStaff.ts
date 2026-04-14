import { useState, useEffect, useRef, useMemo } from "react";

// --- TYPES & BASE MOCK DATA ---
export type StaffRole = 'store_manager' | 'sales_rep' | 'support_agent' | 'inventory_clerk';
export type StaffStatus = 'active' | 'suspended' | 'invited';

export interface StaffMember {
    id: string;
    name: string;
    email: string;
    role: StaffRole;
    status: StaffStatus;
    salesGenerated?: string; 
    lastActive: string;
}

const BASE_MOCK_STAFF: StaffMember[] = [
    { id: "STF-001", name: "Wada Gift", email: "wada@urbankicks.com", role: "store_manager", status: "active", lastActive: "Just now" },
    { id: "STF-002", name: "David O.", email: "david.o@urbankicks.com", role: "sales_rep", status: "active", salesGenerated: "₦1,250,000", lastActive: "2 hours ago" },
    { id: "STF-003", name: "Amina Yusuf", email: "amina@urbankicks.com", role: "sales_rep", status: "active", salesGenerated: "₦850,000", lastActive: "5 mins ago" },
    { id: "STF-004", name: "Chinedu Eze", email: "chinedu@urbankicks.com", role: "inventory_clerk", status: "active", lastActive: "Yesterday" },
    { id: "STF-005", name: "Sarah Connor", email: "sarah.c@urbankicks.com", role: "support_agent", status: "invited", lastActive: "Never" },
];

// Generator to simulate a larger database for infinite scroll
const generateExtendedStaff = (count: number): StaffMember[] => {
    return Array.from({ length: count }).map((_, i) => {
        const base = BASE_MOCK_STAFF[i % BASE_MOCK_STAFF.length];
        return {
            ...base,
            id: `STF-${(i + 1).toString().padStart(3, '0')}`,
            name: i >= 5 ? `${base.name} ${i + 1}` : base.name,
            email: i >= 5 ? `staff${i + 1}@urbankicks.com` : base.email
        };
    });
};

const TOTAL_STAFF = 45;
const ITEMS_PER_PAGE = 10;

export const useStaff = () => {
    
    const [allStaff] = useState<StaffMember[]>(() => generateExtendedStaff(TOTAL_STAFF));
    
    // UI View State
    const [isAddingStaff, setIsAddingStaff] = useState(false);

    //  Search & Sort State
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [sortBy, setSortBy] = useState("name"); 
    const [sortOrder, setSortOrder] = useState("asc");

    // Infinite Scroll State
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    // Handlers
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleRoleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => { setRoleFilter(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortOrder(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };

    // Search & Sort Engine
    const processedStaff = useMemo(() => {
        let processed = [...allStaff];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            processed = processed.filter(s => 
                s.name.toLowerCase().includes(q) || 
                s.email.toLowerCase().includes(q) ||
                s.id.toLowerCase().includes(q)
            );
        }

        if (roleFilter !== "all") {
            processed = processed.filter(s => s.role === roleFilter);
        }

        processed.sort((a, b) => {
            let comparison = 0;
            if (sortBy === "role") comparison = a.role.localeCompare(b.role);
            else if (sortBy === "status") comparison = a.status.localeCompare(b.status);
            else comparison = a.name.localeCompare(b.name);
            
            return sortOrder === "desc" ? -comparison : comparison;
        });

        return processed;
    }, [allStaff, searchQuery, roleFilter, sortBy, sortOrder]);

    const visibleItems = processedStaff.slice(0, visibleCount);

    // Dynamic KPIs based on filtered data
    const activeSalesRepsCount = processedStaff.filter(s => s.role === 'sales_rep' && s.status === 'active').length;
    const pendingInvitesCount = processedStaff.filter(s => s.status === 'invited').length;

    // Infinite Scroll Observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && visibleCount < processedStaff.length && !isLoadingMore) {
                setIsLoadingMore(true);
                setTimeout(() => {
                    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, processedStaff.length));
                    setIsLoadingMore(false);
                }, 600);
            }
        }, { threshold: 0.1 });

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [visibleCount, processedStaff.length, isLoadingMore]);

    return {
        isAddingStaff, setIsAddingStaff,
        searchQuery, roleFilter, sortBy, sortOrder,
        handleSearch, handleRoleFilter, handleSortBy, handleSortOrder,
        visibleItems, processedCount: processedStaff.length, totalLimit: TOTAL_STAFF,
        visibleCount, isLoadingMore, loaderRef,
        activeSalesRepsCount, pendingInvitesCount
    };
};
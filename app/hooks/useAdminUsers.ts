import { useState, useEffect, useRef, useMemo } from "react";

// --- TYPES ---
export type Role = 'super_admin' | 'shop_owner' | 'shop_staff' | 'customer';
export type Status = 'active' | 'banned';

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: Role;
    status: Status;
    lastLogin: string;
    activeSessions: number;
    tenant: string;
}

const BASE_USERS: AdminUser[] = [
    { id: "USR-001", name: "Wada Gift", email: "hello@tradaz.com", role: "super_admin", status: "active", lastLogin: "2 mins ago", activeSessions: 2, tenant: "Platform HQ" },
    { id: "USR-002", name: "Sarah Connor", email: "sarah@tech.com", role: "shop_owner", status: "active", lastLogin: "1 hour ago", activeSessions: 1, tenant: "Minimalist Hub" },
    { id: "USR-003", name: "Mike Ross", email: "mike@urbankicks.com", role: "shop_staff", status: "active", lastLogin: "5 mins ago", activeSessions: 3, tenant: "Urban Kicks NG" },
    { id: "USR-004", name: "John Doe", email: "john@doe.com", role: "customer", status: "banned", lastLogin: "3 days ago", activeSessions: 0, tenant: "N/A" },
];

// Generator to build a large list for infinite scrolling
const generateExtendedUsers = (count: number): AdminUser[] => {
    return Array.from({ length: count }).map((_, i) => {
        const base = BASE_USERS[i % BASE_USERS.length];
        return {
            ...base,
            id: `USR-${(i + 1).toString().padStart(3, '0')}`,
            name: i >= 4 ? `${base.name} ${i + 1}` : base.name,
            email: i >= 4 ? `user${i + 1}@example.com` : base.email,
        };
    });
};

const TOTAL_USERS = 60;
const ITEMS_PER_PAGE = 15;

export const useAdminUsers = () => {
    // 1. Data State
    const [allUsers, setAllUsers] = useState<AdminUser[]>(() => generateExtendedUsers(TOTAL_USERS));
    
    // 2. Search & Sort State
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("name"); 
    const [sortOrder, setSortOrder] = useState("asc");

    // 3. Infinite Scroll State
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    // Handlers
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleRoleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => { setRoleFilter(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => { setStatusFilter(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortOrder(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };

    // 4. Search & Sort Engine
    const processedUsers = useMemo(() => {
        let processed = [...allUsers];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            processed = processed.filter(user => 
                user.name.toLowerCase().includes(q) || 
                user.email.toLowerCase().includes(q) ||
                user.tenant.toLowerCase().includes(q)
            );
        }

        if (roleFilter !== "all") {
            processed = processed.filter(user => user.role === roleFilter);
        }

        if (statusFilter !== "all") {
            processed = processed.filter(user => user.status === statusFilter);
        }

        processed.sort((a, b) => {
            let comparison = 0;
            if (sortBy === "tenant") comparison = a.tenant.localeCompare(b.tenant);
            else if (sortBy === "role") comparison = a.role.localeCompare(b.role);
            else comparison = a.name.localeCompare(b.name); // Default to name
            
            return sortOrder === "desc" ? -comparison : comparison;
        });

        return processed;
    }, [allUsers, searchQuery, roleFilter, statusFilter, sortBy, sortOrder]);

    const visibleItems = processedUsers.slice(0, visibleCount);

    // 5. Infinite Scroll Observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && visibleCount < processedUsers.length && !isLoadingMore) {
                setIsLoadingMore(true);
                setTimeout(() => {
                    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, processedUsers.length));
                    setIsLoadingMore(false);
                }, 600);
            }
        }, { threshold: 0.1 });

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [visibleCount, processedUsers.length, isLoadingMore]);

    return {
        searchQuery, roleFilter, statusFilter, sortBy, sortOrder,
        handleSearch, handleRoleFilter, handleStatusFilter, handleSortBy, handleSortOrder,
        visibleItems, processedCount: processedUsers.length, totalLimit: TOTAL_USERS,
        visibleCount, isLoadingMore, loaderRef,
        setAllUsers // Exported in case you need to add/remove users later
    };
};
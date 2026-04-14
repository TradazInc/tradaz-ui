import { useState, useEffect, useRef, useMemo } from "react";
import { generateDummyStaffSalaries } from "@/app/lib/data";
import { StaffSalary } from "@/app/lib/definitions";

const TOTAL_STAFF = 45;
const ITEMS_PER_PAGE = 10;

export const useStaffSalaries = () => {
    //  Data State (Load all into memory for local filtering)
    const [allSalaries] = useState<StaffSalary[]>(() => generateDummyStaffSalaries(TOTAL_STAFF, 0));
    
    //  Search & Sort State
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("name"); // 'name', 'salary', 'role'
    const [sortOrder, setSortOrder] = useState("asc");

    //  Infinite Scroll State
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    //  Handlers
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => { setStatusFilter(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortOrder(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };

    //  Search & Sort Engine
    const processedSalaries = useMemo(() => {
        let processed = [...allSalaries];

        // Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            processed = processed.filter(s => 
                s.name.toLowerCase().includes(q) || 
                s.role.toLowerCase().includes(q) ||
                s.bank.toLowerCase().includes(q)
            );
        }

        // Filter by Status
        if (statusFilter !== "all") {
            processed = processed.filter(s => s.status.toLowerCase() === statusFilter.toLowerCase());
        }

        // Sort
        processed.sort((a, b) => {
            let comparison = 0;
            if (sortBy === "salary") {
                comparison = a.salary - b.salary;
            } else if (sortBy === "role") {
                comparison = a.role.localeCompare(b.role);
            } else {
                comparison = a.name.localeCompare(b.name);
            }
            return sortOrder === "desc" ? -comparison : comparison;
        });

        return processed;
    }, [allSalaries, searchQuery, statusFilter, sortBy, sortOrder]);

    const visibleItems = processedSalaries.slice(0, visibleCount);

    //  Dynamic Financial Metrics (Calculated based on current filters!)
    const totalPayroll = processedSalaries.reduce((acc, curr) => acc + curr.salary, 0);
    const totalCleared = processedSalaries.filter(s => s.status === "Paid").reduce((acc, curr) => acc + curr.salary, 0);
    const totalPending = totalPayroll - totalCleared;

    // Infinite Scroll Observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && visibleCount < processedSalaries.length && !isLoadingMore) {
                setIsLoadingMore(true);
                setTimeout(() => {
                    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, processedSalaries.length));
                    setIsLoadingMore(false);
                }, 600);
            }
        }, { threshold: 0.1 });

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [visibleCount, processedSalaries.length, isLoadingMore]);

    return {
        searchQuery, statusFilter, sortBy, sortOrder,
        handleSearch, handleStatusFilter, handleSortBy, handleSortOrder,
        visibleItems, processedSalariesLength: processedSalaries.length, totalStaff: TOTAL_STAFF,
        visibleCount, isLoadingMore, loaderRef,
        totalPayroll, totalCleared, totalPending
    };
};
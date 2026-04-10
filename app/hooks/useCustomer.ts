import { useState, useEffect, useRef, useMemo } from "react";
import { generateDummyCustomers } from "@/app/lib/data";
import { Customer } from "@/app/lib/definitions";

const TOTAL_CUSTOMERS = 150;
const ITEMS_PER_PAGE = 10;

export const useCustomers = () => {
    const [allCustomers] = useState<Customer[]>(() => generateDummyCustomers(TOTAL_CUSTOMERS, 0));
    
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("spend"); 
    const [sortOrder, setSortOrder] = useState("desc"); 

    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => { setStatusFilter(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortOrder(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };

    // Action Handlers for the Dropdown Menu
    const handleQuickAction = (action: string, customer: Customer) => {
        // In the future, this will trigger a toast or an API call
        console.log(`Performing ${action} on ${customer.name}`);
    };

    const processedCustomers = useMemo(() => {
        let processed = [...allCustomers];
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            processed = processed.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.handle.toLowerCase().includes(q));
        }
        if (statusFilter !== "all") {
            processed = processed.filter(c => c.status.toLowerCase() === statusFilter.toLowerCase());
        }
        processed.sort((a, b) => {
            let comparison = 0;
            if (sortBy === "spend") comparison = a.spend - b.spend;
            else if (sortBy === "orders") comparison = a.orders - b.orders;
            else if (sortBy === "name") comparison = a.name.localeCompare(b.name);
            return sortOrder === "desc" ? -comparison : comparison;
        });
        return processed;
    }, [allCustomers, searchQuery, statusFilter, sortBy, sortOrder]);

    const visibleItems = processedCustomers.slice(0, visibleCount);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && visibleCount < processedCustomers.length && !isLoadingMore) {
                setIsLoadingMore(true);
                setTimeout(() => {
                    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, processedCustomers.length));
                    setIsLoadingMore(false);
                }, 600);
            }
        }, { threshold: 0.1 });
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [visibleCount, processedCustomers.length, isLoadingMore]);

    return {
        searchQuery, statusFilter, sortBy, sortOrder,
        handleSearch, handleStatusFilter, handleSortBy, handleSortOrder,
        visibleItems, processedCustomersLength: processedCustomers.length,
        visibleCount, isLoadingMore, loaderRef,
        selectedCustomer, setSelectedCustomer, handleQuickAction
    };
};
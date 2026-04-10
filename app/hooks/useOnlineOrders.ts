import { useState, useEffect, useRef, useMemo } from "react";
import { generateDummyOnlineOrders } from "@/app/lib/data";
import { OnlineOrder } from "@/app/lib/definitions";

const TOTAL_ORDERS = 150;
const ITEMS_PER_PAGE = 10;

export const useOnlineOrders = () => {
    //  Data State
    const [allOrders] = useState<OnlineOrder[]>(() => generateDummyOnlineOrders(TOTAL_ORDERS, 0));
    
    // Search & Sort State
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("date"); 
    const [sortOrder, setSortOrder] = useState("desc");

    //  Infinite Scroll State
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    //  Detail View State (Eye Button)
    const [selectedOrder, setSelectedOrder] = useState<OnlineOrder | null>(null);

    // Handlers
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => { setStatusFilter(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortOrder(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };

    // Search & Sort Engine
    const processedOrders = useMemo(() => {
        let processed = [...allOrders];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            processed = processed.filter(o => 
                o.id.toLowerCase().includes(q) || 
                o.customer.toLowerCase().includes(q)
            );
        }

        if (statusFilter !== "all") {
            processed = processed.filter(o => o.status.toLowerCase() === statusFilter.toLowerCase());
        }

        processed.sort((a, b) => {
            let comparison = 0;
            if (sortBy === "total") {
                comparison = a.total - b.total;
            } else {
                // Default to Date sorting
                comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
            }
            return sortOrder === "desc" ? -comparison : comparison;
        });

        return processed;
    }, [allOrders, searchQuery, statusFilter, sortBy, sortOrder]);

    const visibleItems = processedOrders.slice(0, visibleCount);

    // Infinite Scroll Observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && visibleCount < processedOrders.length && !isLoadingMore) {
                setIsLoadingMore(true);
                setTimeout(() => {
                    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, processedOrders.length));
                    setIsLoadingMore(false);
                }, 600);
            }
        }, { threshold: 0.1 });

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [visibleCount, processedOrders.length, isLoadingMore]);

    return {
        searchQuery, statusFilter, sortBy, sortOrder,
        handleSearch, handleStatusFilter, handleSortBy, handleSortOrder,
        visibleItems, processedOrdersLength: processedOrders.length, totalOrders: TOTAL_ORDERS,
        visibleCount, isLoadingMore, loaderRef,
        selectedOrder, setSelectedOrder
    };
};
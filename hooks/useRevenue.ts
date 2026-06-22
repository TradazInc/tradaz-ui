import { useState, useEffect, useRef, useMemo } from "react";
import { generateDummyRevenue } from "@/app/lib/data";
import { RevenueTransaction } from "@/app/lib/definitions";

const TOTAL_LIMIT = 60;
const ITEMS_PER_PAGE = 15;

export const useRevenue = () => {
    //  Data State
    const [allTransactions] = useState<RevenueTransaction[]>(() => generateDummyRevenue(TOTAL_LIMIT, 0));
    
    // Search & Sort State
    const [searchQuery, setSearchQuery] = useState("");
    const [channelFilter, setChannelFilter] = useState("all");
    const [sortBy, setSortBy] = useState("date"); // 'date', 'amount'
    const [sortOrder, setSortOrder] = useState("desc");

    //  Infinite Scroll State
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    //  Handlers
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleChannelFilter = (e: React.ChangeEvent<HTMLSelectElement>) => { setChannelFilter(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortOrder(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };

    //  Search & Sort Engine
    const processedTransactions = useMemo(() => {
        let processed = [...allTransactions];

        // Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            processed = processed.filter(t => 
                t.source.toLowerCase().includes(q) || 
                t.reference.toLowerCase().includes(q)
            );
        }

        // Filter by Channel
        if (channelFilter !== "all") {
            processed = processed.filter(t => t.channel.toLowerCase() === channelFilter.toLowerCase());
        }

        // Sort
        processed.sort((a, b) => {
            let comparison = 0;
            if (sortBy === "amount") {
                comparison = a.amount - b.amount;
            } else {
                comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
            }
            return sortOrder === "desc" ? -comparison : comparison;
        });

        return processed;
    }, [allTransactions, searchQuery, channelFilter, sortBy, sortOrder]);

    const visibleItems = processedTransactions.slice(0, visibleCount);

    // Dynamic Financial Metrics
    const totalRevenue = processedTransactions.filter(t => t.status !== "Refunded").reduce((acc, curr) => acc + curr.amount, 0);
    const onlineSales = processedTransactions.filter(t => t.channel === "Online" && t.status !== "Refunded").reduce((acc, curr) => acc + curr.amount, 0);
    const posSales = processedTransactions.filter(t => t.channel === "POS" && t.status !== "Refunded").reduce((acc, curr) => acc + curr.amount, 0);

    // Infinite Scroll Observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && visibleCount < processedTransactions.length && !isLoadingMore) {
                setIsLoadingMore(true);
                setTimeout(() => {
                    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, processedTransactions.length));
                    setIsLoadingMore(false);
                }, 600);
            }
        }, { threshold: 0.1 });

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [visibleCount, processedTransactions.length, isLoadingMore]);

    return {
        searchQuery, channelFilter, sortBy, sortOrder,
        handleSearch, handleChannelFilter, handleSortBy, handleSortOrder,
        visibleItems, processedCount: processedTransactions.length, totalLimit: TOTAL_LIMIT,
        visibleCount, isLoadingMore, loaderRef,
        totalRevenue, onlineSales, posSales
    };
};
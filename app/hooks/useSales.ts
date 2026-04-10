import { useState, useEffect, useRef, useMemo } from "react";
import { generateDummySales } from "@/app/lib/data";
import { SalesRecord } from "@/app/lib/definitions";

const TOTAL_SALES = 150;
const ITEMS_PER_PAGE = 10;

export const useSales = () => {
    const [allSales] = useState<SalesRecord[]>(() => generateDummySales(TOTAL_SALES));
    
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("date"); 
    const [sortOrder, setSortOrder] = useState("desc"); 

    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    const [selectedSale, setSelectedSale] = useState<SalesRecord | null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortOrder(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };

    const processedSales = useMemo(() => {
        let processed = [...allSales];
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            processed = processed.filter(s => s.id.toLowerCase().includes(q) || s.transaction.toLowerCase().includes(q));
        }
        processed.sort((a, b) => {
            let comparison = 0;
            if (sortBy === "total") comparison = a.total - b.total;
            else if (sortBy === "discount") comparison = a.discount - b.discount;
            else comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
            return sortOrder === "desc" ? -comparison : comparison;
        });
        return processed;
    }, [allSales, searchQuery, sortBy, sortOrder]);

    const visibleItems = processedSales.slice(0, visibleCount);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && visibleCount < processedSales.length && !isLoadingMore) {
                setIsLoadingMore(true);
                setTimeout(() => {
                    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, processedSales.length));
                    setIsLoadingMore(false);
                }, 600);
            }
        }, { threshold: 0.1 });
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [visibleCount, processedSales.length, isLoadingMore]);

    return {
        searchQuery, sortBy, sortOrder,
        handleSearch, handleSortBy, handleSortOrder,
        visibleItems, processedSalesLength: processedSales.length,
        visibleCount, isLoadingMore, loaderRef,
        selectedSale, setSelectedSale
    };
};
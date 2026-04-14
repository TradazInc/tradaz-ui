import { useState, useEffect, useRef, useMemo } from "react";
import { generateDummyExpenses } from "@/app/lib/data";
import { Expense } from "@/app/lib/definitions";

const TOTAL_EXPENSES_LIMIT = 60;
const ITEMS_PER_PAGE = 15;

export const useExpenses = () => {
    //  Data State (Load all into memory for fast local filtering)
    const [allExpenses] = useState<Expense[]>(() => generateDummyExpenses(TOTAL_EXPENSES_LIMIT, 0));
    
    //  Search & Sort State
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortBy, setSortBy] = useState("date"); // 'date', 'amount'
    const [sortOrder, setSortOrder] = useState("desc");

    //  Infinite Scroll State
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    //  Handlers
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleCategoryFilter = (e: React.ChangeEvent<HTMLSelectElement>) => { setCategoryFilter(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortOrder(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };

    // Search & Sort Engine
    const processedExpenses = useMemo(() => {
        let processed = [...allExpenses];

        // Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            processed = processed.filter(e => 
                e.description.toLowerCase().includes(q) || 
                e.reference.toLowerCase().includes(q)
            );
        }

        // Filter by Category
        if (categoryFilter !== "all") {
            processed = processed.filter(e => e.category.toLowerCase() === categoryFilter.toLowerCase());
        }

        // Sort
        processed.sort((a, b) => {
            let comparison = 0;
            if (sortBy === "amount") {
                comparison = a.amount - b.amount;
            } else {
                // Default to date sorting
                comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
            }
            return sortOrder === "desc" ? -comparison : comparison;
        });

        return processed;
    }, [allExpenses, searchQuery, categoryFilter, sortBy, sortOrder]);

    const visibleItems = processedExpenses.slice(0, visibleCount);

    //  Dynamic Financial Metrics (Calculated based on current filters!)
    const totalExpenses = processedExpenses.reduce((acc, curr) => acc + curr.amount, 0);
    const pendingExpenses = processedExpenses.filter(e => e.status === "Pending").reduce((acc, curr) => acc + curr.amount, 0);
    const clearedExpenses = totalExpenses - pendingExpenses;

    // Infinite Scroll Observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && visibleCount < processedExpenses.length && !isLoadingMore) {
                setIsLoadingMore(true);
                setTimeout(() => {
                    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, processedExpenses.length));
                    setIsLoadingMore(false);
                }, 600);
            }
        }, { threshold: 0.1 });

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [visibleCount, processedExpenses.length, isLoadingMore]);

    return {
        searchQuery, categoryFilter, sortBy, sortOrder,
        handleSearch, handleCategoryFilter, handleSortBy, handleSortOrder,
        visibleItems, processedExpensesLength: processedExpenses.length, totalLimit: TOTAL_EXPENSES_LIMIT,
        visibleCount, isLoadingMore, loaderRef,
        totalExpenses, pendingExpenses, clearedExpenses
    };
};
import { useState, useEffect, useRef, useMemo } from "react";

// --- TYPES ---
export type PlanTier = 'Basic' | 'Pro' | 'Enterprise';
export type SubStatus = 'active' | 'past_due' | 'canceled' | 'trialing';

export interface Subscription {
    id: string;
    tenant: string;
    owner: string;
    plan: PlanTier;
    cycle: 'Monthly' | 'Annually';
    amount: number;
    status: SubStatus;
    nextBilling: string;
    startedAt: string;
}

const BASE_SUBSCRIPTIONS: Subscription[] = [
    { id: "SUB-8812", tenant: "Urban Kicks NG", owner: "Wada Gift", plan: "Pro", cycle: "Monthly", amount: 45000, status: "active", nextBilling: "Nov 12, 2026", startedAt: "Oct 12, 2024" },
    { id: "SUB-8813", tenant: "Minimalist Hub", owner: "Sarah Connor", plan: "Enterprise", cycle: "Annually", amount: 1500000, status: "active", nextBilling: "Jan 01, 2027", startedAt: "Jan 01, 2024" },
    { id: "SUB-8814", tenant: "Lagos Streetwear", owner: "Tobi O.", plan: "Basic", cycle: "Monthly", amount: 15000, status: "past_due", nextBilling: "Overdue by 3 days", startedAt: "Mar 15, 2025" },
    { id: "SUB-8815", tenant: "Tech Gadgets Pro", owner: "John Doe", plan: "Pro", cycle: "Monthly", amount: 45000, status: "trialing", nextBilling: "Trial ends in 5 days", startedAt: "Oct 25, 2026" },
];

// Generator to build a large list for infinite scrolling
const generateExtendedSubscriptions = (count: number): Subscription[] => {
    return Array.from({ length: count }).map((_, i) => {
        const base = BASE_SUBSCRIPTIONS[i % BASE_SUBSCRIPTIONS.length];
        return {
            ...base,
            id: `SUB-${8812 + i}`,
            tenant: i >= 4 ? `${base.tenant} ${i + 1}` : base.tenant,
        };
    });
};

const TOTAL_SUBSCRIPTIONS = 50;
const ITEMS_PER_PAGE = 10;

export const useAdminSubscriptions = () => {
    
    // 1. Data State (Removed the duplicate declaration)
    const [allSubscriptions, setAllSubscriptions] = useState<Subscription[]>(() => generateExtendedSubscriptions(TOTAL_SUBSCRIPTIONS));
    
    // 🚀 NEW: Handler to push new subscriptions into the list
    const handleAddSubscription = (newSub: Subscription) => {
        setAllSubscriptions(prev => [newSub, ...prev]);
    };

    // 2. Search & Sort State
    const [searchQuery, setSearchQuery] = useState("");
    const [planFilter, setPlanFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("amount"); 
    const [sortOrder, setSortOrder] = useState("desc");

    // 3. Infinite Scroll State
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    // Handlers
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handlePlanFilter = (e: React.ChangeEvent<HTMLSelectElement>) => { setPlanFilter(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => { setStatusFilter(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortOrder(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };

    // 4. Search & Sort Engine
    const processedSubscriptions = useMemo(() => {
        let processed = [...allSubscriptions];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            processed = processed.filter(sub => 
                sub.id.toLowerCase().includes(q) || 
                sub.tenant.toLowerCase().includes(q) ||
                sub.owner.toLowerCase().includes(q)
            );
        }

        if (planFilter !== "all") {
            processed = processed.filter(sub => sub.plan.toLowerCase() === planFilter.toLowerCase());
        }

        if (statusFilter !== "all") {
            processed = processed.filter(sub => sub.status === statusFilter);
        }

        processed.sort((a, b) => {
            let comparison = 0;
            if (sortBy === "amount") {
                // Normalize to Monthly amount for accurate sorting
                const aMonthly = a.cycle === 'Annually' ? a.amount / 12 : a.amount;
                const bMonthly = b.cycle === 'Annually' ? b.amount / 12 : b.amount;
                comparison = aMonthly - bMonthly;
            } else {
                // Alphabetical sort by tenant
                comparison = a.tenant.localeCompare(b.tenant);
            }
            return sortOrder === "desc" ? -comparison : comparison;
        });

        return processed;
    }, [allSubscriptions, searchQuery, planFilter, statusFilter, sortBy, sortOrder]);

    const visibleItems = processedSubscriptions.slice(0, visibleCount);

    // 5. Dynamic KPI Calculations
    const kpiStats = useMemo(() => {
        const activeSubs = processedSubscriptions.filter(s => s.status === 'active' || s.status === 'trialing');
        
        // Calculate MRR (Monthly Recurring Revenue)
        const totalMRR = activeSubs.reduce((acc, curr) => {
            return acc + (curr.cycle === 'Annually' ? curr.amount / 12 : curr.amount);
        }, 0);

        const pastDueAmount = processedSubscriptions.filter(s => s.status === 'past_due').reduce((acc, curr) => acc + curr.amount, 0);
        const pastDueCount = processedSubscriptions.filter(s => s.status === 'past_due').length;
        
        const trialCount = processedSubscriptions.filter(s => s.status === 'trialing').length;

        return [
            { label: "Total MRR", value: `₦${totalMRR.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, trend: "Filtered", color: "#5cac7d" },
            { label: "Active Subscriptions", value: activeSubs.length.toLocaleString(), trend: "Filtered", color: "blue.400" },
            { label: "Past Due / Failed", value: `₦${pastDueAmount.toLocaleString()}`, trend: `${pastDueCount} shops`, color: "red.400" },
            { label: "Active Trials", value: trialCount.toString(), trend: "Filtered", color: "purple.400" },
        ];
    }, [processedSubscriptions]);

    // 6. Infinite Scroll Observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && visibleCount < processedSubscriptions.length && !isLoadingMore) {
                setIsLoadingMore(true);
                setTimeout(() => {
                    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, processedSubscriptions.length));
                    setIsLoadingMore(false);
                }, 600);
            }
        }, { threshold: 0.1 });

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [visibleCount, processedSubscriptions.length, isLoadingMore]);

    return {
        searchQuery, planFilter, statusFilter, sortBy, sortOrder,
        handleSearch, handlePlanFilter, handleStatusFilter, handleSortBy, handleSortOrder,
        visibleItems, processedCount: processedSubscriptions.length, totalLimit: TOTAL_SUBSCRIPTIONS,
        visibleCount, isLoadingMore, loaderRef,
        kpiStats,
        handleAddSubscription // 🚀 Exported the new handler here
    };
};
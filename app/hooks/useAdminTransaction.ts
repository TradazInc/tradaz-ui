import { useState, useEffect, useRef, useMemo } from "react";

// --- TYPES ---
export type TxType = 'order_payment' | 'payout' | 'subscription' | 'refund';
export type TxStatus = 'completed' | 'pending' | 'failed';

export interface Transaction {
    id: string;
    date: string;
    type: TxType;
    amount: number;
    platformFee: number;
    netAmount: number;
    tenant: string;
    customer: string;
    method: string;
    status: TxStatus;
}

const BASE_TRANSACTIONS: Transaction[] = [
    { id: "TRX-90214", date: "Today, 14:30", type: "order_payment", amount: 150000, platformFee: 3750, netAmount: 146250, tenant: "Urban Kicks NG", customer: "Michael T.", method: "Card ending ****4242", status: "completed" },
    { id: "TRX-90213", date: "Today, 10:15", type: "payout", amount: 500000, platformFee: 0, netAmount: 500000, tenant: "Minimalist Hub", customer: "N/A", method: "Bank Transfer", status: "pending" },
    { id: "TRX-90212", date: "Yesterday, 09:00", type: "subscription", amount: 25000, platformFee: 25000, netAmount: 0, tenant: "Tech Gadgets Pro", customer: "John Doe", method: "Wallet Balance", status: "completed" },
    { id: "TRX-90211", date: "Oct 22, 18:45", type: "refund", amount: 45000, platformFee: -1125, netAmount: -43875, tenant: "Lagos Streetwear Co.", customer: "Sarah K.", method: "Original Payment Method", status: "failed" },
];

// Generate extended data for infinite scroll
const generateExtendedTransactions = (count: number): Transaction[] => {
    return Array.from({ length: count }).map((_, i) => {
        const base = BASE_TRANSACTIONS[i % BASE_TRANSACTIONS.length];
        return {
            ...base,
            id: `TRX-${90214 + i}`,
            amount: base.amount + (i * 500), // Add slight variance
        };
    });
};

const TOTAL_TRANSACTIONS = 65;
const ITEMS_PER_PAGE = 12;

export const useAdminTransactions = () => {
    //  Data State
    const [allTransactions] = useState<Transaction[]>(() => generateExtendedTransactions(TOTAL_TRANSACTIONS));
    
    //  Search & Sort State
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [sortBy, setSortBy] = useState("date"); 
    const [sortOrder, setSortOrder] = useState("desc");

    //  Infinite Scroll State
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    // Handlers
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleTypeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => { setTypeFilter(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortOrder(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };

    //  Search & Sort Engine
    const processedTransactions = useMemo(() => {
        let processed = [...allTransactions];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            processed = processed.filter(tx => 
                tx.id.toLowerCase().includes(q) || 
                tx.tenant.toLowerCase().includes(q) ||
                tx.customer.toLowerCase().includes(q)
            );
        }

        if (typeFilter !== "all") {
            processed = processed.filter(tx => tx.type === typeFilter);
        }

        processed.sort((a, b) => {
            let comparison = 0;
            if (sortBy === "amount") {
                comparison = a.amount - b.amount;
            } else if (sortBy === "fee") {
                comparison = a.platformFee - b.platformFee;
            } else {
                // Approximate date sorting by ID for mock data
                comparison = b.id.localeCompare(a.id);
            }
            return sortOrder === "desc" ? -comparison : comparison;
        });

        return processed;
    }, [allTransactions, searchQuery, typeFilter, sortBy, sortOrder]);

    const visibleItems = processedTransactions.slice(0, visibleCount);

    //  Dynamic KPI Calculations (Updates based on search/filters)
    const kpiStats = useMemo(() => {
        const totalVolume = processedTransactions.filter(t => t.type === 'order_payment' && t.status === 'completed').reduce((acc, curr) => acc + curr.amount, 0);
        const feesCollected = processedTransactions.filter(t => t.status === 'completed').reduce((acc, curr) => acc + curr.platformFee, 0);
        
        const pendingPayoutTx = processedTransactions.filter(t => t.type === 'payout' && t.status === 'pending');
        const pendingPayoutAmount = pendingPayoutTx.reduce((acc, curr) => acc + curr.amount, 0);
        
        return [
            { label: "Total Volume", value: `₦${totalVolume.toLocaleString()}`, trend: "Filtered" },
            { label: "Platform Fees Collected", value: `₦${feesCollected.toLocaleString()}`, trend: "Filtered" },
            { label: "Pending Payouts", value: `₦${pendingPayoutAmount.toLocaleString()}`, trend: `${pendingPayoutTx.length} pending` },
        ];
    }, [processedTransactions]);

    // 6. Infinite Scroll Observer
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
        searchQuery, typeFilter, sortBy, sortOrder,
        handleSearch, handleTypeFilter, handleSortBy, handleSortOrder,
        visibleItems, processedCount: processedTransactions.length, totalLimit: TOTAL_TRANSACTIONS,
        visibleCount, isLoadingMore, loaderRef,
        kpiStats
    };
};
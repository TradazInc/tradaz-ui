import { useState, useEffect, useRef, useMemo } from "react";
import { generateDummyCustomers } from "./../data/data";
import { Customer } from "./../types/definitions";

const TOTAL_CUSTOMERS = 150;
const ITEMS_PER_PAGE = 10;

export const useCustomers = () => {
    // Note: To make delete/suspend actually remove items from the UI in this session, 
    // we use setAllCustomers instead of just grabbing the initial state.
    const [allCustomers, setAllCustomers] = useState<Customer[]>(() => generateDummyCustomers(TOTAL_CUSTOMERS, 0));
    
    // --- FILTER & SORT STATE ---
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("spend"); 
    const [sortOrder, setSortOrder] = useState("desc"); 

    // --- PAGINATION STATE ---
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    // --- UI VIEW/MODAL STATE ---
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [actionModal, setActionModal] = useState<{isOpen: boolean, action: string, customer: Customer | null}>({ 
        isOpen: false, action: '', customer: null 
    });

    // --- INPUT HANDLERS ---
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => { setStatusFilter(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortOrder(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };

    // --- ACTION BUTTON HANDLERS ---
    const handleQuickAction = (action: string, customer: Customer) => {
        if (action === 'edit') {
            // Note: In a real app, you might set a different state here like `setEditingCustomer(customer)` 
            // to open an Edit Modal, or route them to `/admin/customers/${customer.id}/edit`
            console.log("Opening edit interface for:", customer.name);
            alert(`Opening edit interface for ${customer.name}`);
        } else if (action === 'suspend' || action === 'delete') {
            setActionModal({ isOpen: true, action, customer });
        }
    };

    const closeActionModal = () => {
        setActionModal({ isOpen: false, action: '', customer: null });
    };

    const executeAction = () => {
        const { action, customer } = actionModal;
        if (!customer) return;

        if (action === 'delete') {
            // Remove the customer from the main list
            setAllCustomers(prev => prev.filter(c => c.id !== customer.id));
            console.log("Deleted", customer.name);
        } else if (action === 'suspend') {
            // Toggle the customer's status between Active and Inactive
            setAllCustomers(prev => prev.map(c => 
                c.id === customer.id 
                    ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } 
                    : c
            ));
            console.log("Suspended/Un-suspended", customer.name);
        }
        
        closeActionModal();
    };

    // --- DATA PROCESSING (Memoized) ---
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

    // --- INFINITE SCROLL LOGIC ---
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

    // --- EXPORT TO COMPONENT ---
    return {
        // State & Derived Data
        searchQuery, 
        statusFilter, 
        sortBy, 
        sortOrder,
        visibleItems, 
        processedCustomersLength: processedCustomers.length,
        visibleCount, 
        isLoadingMore, 
        loaderRef,
        
        // View Modal State
        selectedCustomer, 
        setSelectedCustomer, 
        
        // Action Modal State
        actionModal,
        closeActionModal,
        executeAction,
        
        // Handlers
        handleSearch, 
        handleStatusFilter, 
        handleSortBy, 
        handleSortOrder,
        handleQuickAction
    };
};
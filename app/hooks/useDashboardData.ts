import { useState, useEffect } from "react";

export type Store = { id: string; name: string; address: string };
export type Business = { id: string; name: string; category: string };

const DEFAULT_BUSINESSES: Business[] = [
    { id: "b1", name: "OGTech", category: "Phones & Accessories" },
    { id: "b2", name: "OGVenture", category: "Clothing & Apparel" }
];

const DEFAULT_STORES: Record<string, Store[]> = {
    "b1": [{ id: "s1", name: "OGTech Main", address: "Wuse Zone 2" }],
    "b2": [{ id: "s4", name: "OGVenture HQ", address: "Garki Area 11" }]
};

export const useDashboardData = () => {
    const [dbBusinesses, setDbBusinesses] = useState<Business[]>(DEFAULT_BUSINESSES);
    const [dbStores, setDbStores] = useState<Record<string, Store[]>>(DEFAULT_STORES);
    const [activeBusinessId, setActiveBusinessId] = useState<string>("b1");
    const [activeStoreId, setActiveStoreId] = useState<string>("s1");
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFreshData = () => {
            const savedBiz = localStorage.getItem("tradaz_businesses");
            const savedStores = localStorage.getItem("tradaz_stores");
            
            if (savedBiz) setDbBusinesses(JSON.parse(savedBiz));
            if (savedStores) setDbStores(JSON.parse(savedStores));
            
            setTimeout(() => setIsLoading(false), 800);
        };

        fetchFreshData();
        window.addEventListener('focus', fetchFreshData);
        return () => window.removeEventListener('focus', fetchFreshData);
    }, []);

    // Derived State
    const activeBusiness = dbBusinesses.find(b => b.id === activeBusinessId) || dbBusinesses[0];
    const availableStores = dbStores[activeBusiness?.id] || [];
    const activeStore = availableStores.find((s: Store) => s.id === activeStoreId) || availableStores[0];

    // Return exactly what the UI needs to render
    return {
        isLoading,
        activeBusiness,
        activeStore,
        availableStores,
        setActiveBusinessId,
        setActiveStoreId
    };
};
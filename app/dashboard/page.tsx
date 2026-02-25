"use client";

import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";

import { DashboardMetrics } from "../ui/dashboard/DashboardMetrics";
import { Analytics } from "../ui/dashboard/Analytics";
import { RecentActivity } from "../ui/dashboard/RecentActivity";

type Store = { id: string; name: string; address: string };
type Business = { id: string; name: string; category: string };

const DEFAULT_BUSINESSES: Business[] = [
    { id: "b1", name: "OGTech", category: "Phones & Accessories" },
    { id: "b2", name: "OGVenture", category: "Clothing & Apparel" }
];

const DEFAULT_STORES: Record<string, Store[]> = {
    "b1": [{ id: "s1", name: "OGTech Main", address: "Wuse Zone 2" }],
    "b2": [{ id: "s4", name: "OGVenture HQ", address: "Garki Area 11" }]
};

export default function DashboardPage() {
    const [dbBusinesses, setDbBusinesses] = useState<Business[]>(DEFAULT_BUSINESSES);
    const [dbStores, setDbStores] = useState<Record<string, Store[]>>(DEFAULT_STORES);
    const [activeBusinessId] = useState<string>("b1");
    const [activeStoreId] = useState<string>("s1");

    useEffect(() => {
        const fetchFreshData = () => {
            const savedBiz = localStorage.getItem("tradaz_businesses");
            const savedStores = localStorage.getItem("tradaz_stores");
            if (savedBiz) setDbBusinesses(JSON.parse(savedBiz));
            if (savedStores) setDbStores(JSON.parse(savedStores));
        };

        fetchFreshData();
        window.addEventListener('focus', fetchFreshData);
        return () => window.removeEventListener('focus', fetchFreshData);
    }, []);

    const activeBusiness = dbBusinesses.find(b => b.id === activeBusinessId) || dbBusinesses[0];
    const availableStores = dbStores[activeBusiness?.id] || [];
    const activeStore = availableStores.find((s: Store) => s.id === activeStoreId) || availableStores[0];

    return (
       
        <Box w="full">
            <Text color="#5cac7d" fontWeight="bold" mb={6} fontSize="xl">
                Overview: {activeBusiness?.name} {activeStore ? `> ${activeStore.name}` : ''}
            </Text>
            
            <DashboardMetrics />
            
            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6}>
                <Box gridColumn={{ lg: "span 2" }}>
                    <Analytics />
                </Box>
                <RecentActivity />
            </SimpleGrid>
        </Box>
    );
}
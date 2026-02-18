"use client";

import React, { useState, useEffect } from "react";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";


import { Sidebar } from "../ui/dashboard/Sidebar";
import { DashboardHeader } from "../ui/dashboard/DashboardHeader";
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    
    const [dbBusinesses, setDbBusinesses] = useState<Business[]>(DEFAULT_BUSINESSES);
    const [dbStores, setDbStores] = useState<Record<string, Store[]>>(DEFAULT_STORES);
    const [activeBusinessId, setActiveBusinessId] = useState<string>("b1");
    const [activeStoreId, setActiveStoreId] = useState<string>("s1");

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

    const handleBusinessChange = (bizId: string) => {
        setActiveBusinessId(bizId);
        const firstStore = dbStores[bizId]?.[0];
        setActiveStoreId(firstStore ? firstStore.id : "");
    };

    return (
        <Flex minH="100vh" bg="#121212">
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)}
                activeBusiness={activeBusiness}
                availableStores={availableStores}
                activeStoreId={activeStore?.id || ""}
                onStoreChange={(id: string) => setActiveStoreId(id)} 
            />

            <Flex flex="1" direction="column" h="100vh" overflow="hidden">
                <DashboardHeader 
                    businesses={dbBusinesses}
                    activeBusiness={activeBusiness}
                    onBusinessChange={handleBusinessChange}
                    onOpenSidebar={() => setIsSidebarOpen(true)}
                />

                <Box flex="1" overflowY="auto" p={{ base: 4, md: 8 }}>
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
            </Flex>
        </Flex>
    );
}
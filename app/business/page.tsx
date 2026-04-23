"use client";

import React from "react";
import { Box, SimpleGrid, Text, Skeleton } from "@chakra-ui/react";

import { DashboardMetrics } from "../ui/dashboard/DashboardMetrics";
import { Analytics } from "../ui/dashboard/Analytics";
import { RecentActivity } from "../ui/dashboard/RecentActivity";
import { useDashboardData } from "@/app/hooks/useDashboardData"; 

export default function DashboardPage() {
    const { isLoading, activeBusiness, activeStore } = useDashboardData();

    if (isLoading) {
        return (
          
            <Box w="full" minH="100vh" bg="#000000" p={{ base: 4, md: 8 }} animation="fade-in 0.3s ease">
                <Skeleton height="28px" width="250px" mb={6} rounded="md" bg="#111111" />
                
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={8}>
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} height="120px" rounded="lg" bg="#0A0A0A" border="1px solid #1A1A1A" />
                    ))}
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, lg: 3 }} gap={4}>
                    <Box gridColumn={{ lg: "span 2" }}>
                        <Skeleton height="400px" rounded="lg" bg="#0A0A0A" border="1px solid #1A1A1A" />
                    </Box>
                    <Skeleton height="400px" rounded="lg" bg="#0A0A0A" border="1px solid #1A1A1A" />
                </SimpleGrid>
            </Box>
        );
    }

    return (
        
        <Box w="full" minH="100vh" bg="#000000" p={{ base: 4, md: 8 }} animation="fade-in 0.3s ease">
            
            
            <Box mb={8}>
                <DashboardMetrics />
            </Box>
            
            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={4}>
                <Box gridColumn={{ lg: "span 2" }}>
                    <Analytics />
                </Box>
                <RecentActivity />
            </SimpleGrid>
        </Box>
    );
}
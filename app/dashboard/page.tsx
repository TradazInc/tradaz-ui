"use client";

import React from "react";
import { Box, SimpleGrid, Text, Skeleton } from "@chakra-ui/react";

import { DashboardMetrics } from "../ui/dashboard/DashboardMetrics";
import { Analytics } from "../ui/dashboard/Analytics";
import { RecentActivity } from "../ui/dashboard/RecentActivity";
import { useDashboardData } from "@/app/hooks/useDashboardData"; 

export default function DashboardPage() {
    //  All logic is destructured cleanly from the hook
    const { isLoading, activeBusiness, activeStore } = useDashboardData();

    if (isLoading) {
        return (
            <Box w="full" animation="fade-in 0.3s ease">
                <Skeleton height="28px" width="250px" mb={6} rounded="md" bg="whiteAlpha.100" />
                
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} height="120px" rounded="2xl" bg="whiteAlpha.100" />
                    ))}
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6}>
                    <Box gridColumn={{ lg: "span 2" }}>
                        <Skeleton height="400px" rounded="2xl" bg="whiteAlpha.100" />
                    </Box>
                    <Skeleton height="400px" rounded="2xl" bg="whiteAlpha.100" />
                </SimpleGrid>
            </Box>
        );
    }

    return (
        <Box w="full" animation="fade-in 0.3s ease">
            <Text color="#5cac7d" fontWeight="bold" mb={6} fontSize="xl">
                Overview: {activeBusiness?.name} {activeStore ? `> ${activeStore.name}` : ''}
            </Text>
            
            <Box mb={8}>
                <DashboardMetrics />
            </Box>
            
            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6}>
                <Box gridColumn={{ lg: "span 2" }}>
                    <Analytics />
                </Box>
                <RecentActivity />
            </SimpleGrid>
        </Box>
    );
}
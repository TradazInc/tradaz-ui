"use client";
import React from "react";
import { SimpleGrid, Box, Text, Flex, Icon } from "@chakra-ui/react";
import { LuTrendingUp, LuUsers, LuPackage, LuDollarSign } from "react-icons/lu";

const METRICS = [
    { label: "Total Revenue", value: "₦4,250,000", trend: "+12.5%", icon: LuDollarSign, color: "blue.400" },
    { label: "Total Orders", value: "1,240", trend: "+8.2%", icon: LuPackage, color: "orange.400" },
    { label: "Customers", value: "892", trend: "+5.1%", icon: LuUsers, color: "purple.400" },
    { label: "Conversion Rate", value: "3.2%", trend: "+1.2%", icon: LuTrendingUp, color: "green.400" }
];

export const DashboardMetrics = () => {
    return (
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6} mb={8}>
            {METRICS.map((metric, idx) => (
                <Box key={idx} bg="#1e1e20" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Flex justify="space-between" align="start" mb={4}>
                        <Box p={2} bg="whiteAlpha.50" rounded="lg">
                            <Icon as={metric.icon} boxSize={5} color={metric.color} />
                        </Box>
                        <Text fontSize="xs" fontWeight="bold" color="#5cac7d" bg="rgba(92, 172, 125, 0.1)" px={2} py={1} rounded="md">
                            {metric.trend}
                        </Text>
                    </Flex>
                    <Text fontSize="sm" color="gray.400" fontWeight="medium" mb={1}>{metric.label}</Text>
                    <Text fontSize="2xl" color="white" fontWeight="bold">{metric.value}</Text>
                </Box>
            ))}
        </SimpleGrid>
    );
};
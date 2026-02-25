"use client";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react"; 

export const AnalyticsSkeleton = () => {
    return (
        <Box w="full" animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite">
            {/* Header Skeleton */}
            <Skeleton h="28px" w="200px" mb={6} rounded="md" bg="whiteAlpha.100" />

            {/* Top Metrics Skeleton */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                {[1, 2, 3].map((i) => (
                    <Box key={i} p={6} bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Skeleton h="16px" w="100px" mb={4} rounded="sm" bg="whiteAlpha.100" />
                        <Skeleton h="36px" w="150px" rounded="md" bg="whiteAlpha.200" />
                    </Box>
                ))}
            </SimpleGrid>

            {/* Main Chart Area Skeleton */}
            <Box w="full" h="400px" bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6}>
                 <Skeleton h="24px" w="180px" mb={6} rounded="md" bg="whiteAlpha.100" />
                 <Skeleton h="300px" w="full" rounded="xl" bg="whiteAlpha.50" />
            </Box>
        </Box>
    );
};
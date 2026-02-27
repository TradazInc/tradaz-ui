"use client";
import { Box, Flex, SimpleGrid, Skeleton } from "@chakra-ui/react";

export default function Loading() {
    return (
        <Box w="full" animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite">
            
            {/* Header Skeleton */}
            <Flex justify="space-between" align="end" mb={6}>
                <Box>
                    <Skeleton h="30px" w="180px" rounded="md" mb={2} bg="whiteAlpha.100" />
                    <Skeleton h="16px" w="280px" rounded="sm" bg="whiteAlpha.50" />
                </Box>
                <Skeleton h="44px" w="140px" rounded="lg" bg="whiteAlpha.50" />
            </Flex>

            {/* Filter Toolbar Skeleton */}
            <Flex gap={3} mb={8} direction={{ base: "column", md: "row" }}>
                <Skeleton h="44px" flex={1} rounded="lg" bg="whiteAlpha.50" />
                <Skeleton h="44px" w="140px" rounded="lg" bg="whiteAlpha.50" />
                <Skeleton h="44px" w="140px" rounded="lg" bg="whiteAlpha.50" />
            </Flex>

            {/* Revenue Summary Cards Skeleton */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                {/* Highlighted Gross Revenue Card Skeleton */}
                <Skeleton h="140px" rounded="2xl" bg="rgba(92, 172, 125, 0.1)" border="1px solid" borderColor="rgba(92, 172, 125, 0.3)" />
                {/* Standard Cards */}
                <Skeleton h="140px" rounded="2xl" bg="whiteAlpha.50" />
                <Skeleton h="140px" rounded="2xl" bg="whiteAlpha.50" />
            </SimpleGrid>

            {/* Table Skeleton */}
            <Box bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={4}>
                {/* Table Header */}
                <Flex borderBottom="1px solid" borderColor="whiteAlpha.100" pb={4} mb={4} gap={4}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={`th-${i}`} h="16px" flex={1} bg="whiteAlpha.100" rounded="sm" />
                    ))}
                </Flex>
                
                {/* Table Rows */}
                {[1, 2, 3, 4, 5, 6].map((row) => (
                    <Flex key={`tr-${row}`} py={4} borderBottom="1px solid" borderColor="whiteAlpha.50" gap={4} align="center">
                        <Box flex={1}>
                            <Skeleton h="16px" w="70%" mb={2} bg="whiteAlpha.100" rounded="sm" />
                            <Skeleton h="12px" w="40%" bg="whiteAlpha.50" rounded="sm" />
                        </Box>
                        <Skeleton h="24px" flex={1} bg="whiteAlpha.100" rounded="md" />
                        <Skeleton h="20px" flex={1} bg="whiteAlpha.100" rounded="sm" />
                        <Skeleton h="16px" flex={1} bg="whiteAlpha.100" rounded="sm" />
                        <Skeleton h="24px" flex={1} bg="whiteAlpha.100" rounded="full" />
                        <Skeleton h="32px" w="60px" bg="whiteAlpha.100" rounded="md" />
                    </Flex>
                ))}
            </Box>

        </Box>
    );
}
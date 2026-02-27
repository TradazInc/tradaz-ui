"use client";
import { Box, Flex, SimpleGrid, Skeleton } from "@chakra-ui/react";

export default function Loading() {
    return (
        <Box w="full" animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite">
            {/* Header Skeleton */}
            <Flex justify="space-between" align="end" mb={6}>
                <Box>
                    <Skeleton h="30px" w="150px" rounded="md" mb={2} bg="whiteAlpha.100" />
                    <Skeleton h="16px" w="250px" rounded="sm" bg="whiteAlpha.50" />
                </Box>
                <Skeleton h="44px" w="160px" rounded="lg" bg="#5cac7d" opacity={0.3} />
            </Flex>

            {/* Filter Skeleton */}
            <Flex gap={3} mb={8}>
                <Skeleton h="44px" flex={1} rounded="lg" bg="whiteAlpha.50" />
                <Skeleton h="44px" w="120px" rounded="lg" bg="whiteAlpha.50" />
                <Skeleton h="44px" w="120px" rounded="lg" bg="whiteAlpha.50" />
            </Flex>

            {/* Summary Cards Skeleton */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                <Skeleton h="140px" rounded="2xl" bg="whiteAlpha.50" />
                <Skeleton h="140px" rounded="2xl" bg="whiteAlpha.50" />
                <Skeleton h="140px" rounded="2xl" bg="red.900" opacity={0.2} />
            </SimpleGrid>

            {/* Table Skeleton */}
            <Skeleton h="400px" w="full" rounded="2xl" bg="whiteAlpha.50" />
        </Box>
    );
}
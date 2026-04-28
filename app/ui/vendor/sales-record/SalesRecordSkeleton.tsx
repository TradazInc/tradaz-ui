"use client";
import { Box, Flex, Skeleton } from "@chakra-ui/react";

export const SalesRecordSkeleton = () => {
    return (
        <Box w="full" animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" bg="#000000">
            {/* Header & Top KPIs */}
            <Flex justify="space-between" align="end" mb={6} wrap="wrap" gap={4}>
                <Box>
                    <Skeleton h="28px" w="200px" mb={2} rounded="none" bg="#1A1A1A" />
                    <Skeleton h="16px" w="300px" rounded="none" bg="#111111" />
                </Box>
                <Flex gap={3}>
                    <Skeleton h="60px" w="150px" rounded="none" bg="#111111" />
                    <Skeleton h="60px" w="100px" rounded="none" bg="#111111" />
                </Flex>
            </Flex>

            {/* Filters */}
            <Flex gap={3} mb={6} wrap="wrap">
                <Skeleton h="44px" flex={1} minW="250px" rounded="none" bg="#111111" />
                <Skeleton h="44px" w="180px" rounded="none" bg="#111111" />
                <Skeleton h="44px" w="180px" rounded="none" bg="#111111" />
            </Flex>

            {/* Table Area */}
            <Box w="full" bg="#0A0A0A" rounded="none" border="1px solid #1A1A1A" mb={6}>
                {/* Table Header */}
                <Flex px={6} py={4} borderBottom="1px solid #333333" bg="#111111">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} h="14px" flex={1} mx={2} rounded="none" bg="#1A1A1A" />
                    ))}
                </Flex>
                {/* Table Rows */}
                {[1, 2, 3, 4, 5].map((row) => (
                    <Flex key={row} px={6} py={5} borderBottom="1px solid #1A1A1A">
                        <Skeleton h="16px" flex={1} mx={2} rounded="none" bg="#111111" />
                        <Skeleton h="16px" flex={1} mx={2} rounded="none" bg="#111111" />
                        <Skeleton h="16px" flex={1} mx={2} rounded="none" bg="#111111" />
                        <Skeleton h="16px" flex={1} mx={2} rounded="none" bg="#111111" />
                        <Skeleton h="16px" flex={1} mx={2} rounded="none" bg="#111111" />
                        <Skeleton h="16px" flex={1} mx={2} rounded="none" bg="#111111" />
                    </Flex>
                ))}
            </Box>

            {/* Bottom Summary Card */}
            <Skeleton h="160px" w="full" rounded="none" bg="#0A0A0A" border="1px solid #1A1A1A" />
        </Box>
    );
};
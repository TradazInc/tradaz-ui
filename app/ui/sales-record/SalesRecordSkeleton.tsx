"use client";
import { Box, Flex, Skeleton } from "@chakra-ui/react";

export const SalesRecordSkeleton = () => {
    return (
        <Box w="full" animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite">
            {/* Header & Top KPIs */}
            <Flex justify="space-between" align="end" mb={6}>
                <Box>
                    <Skeleton h="28px" w="200px" mb={2} rounded="md" bg="whiteAlpha.100" />
                    <Skeleton h="16px" w="300px" rounded="md" bg="whiteAlpha.50" />
                </Box>
                <Flex gap={4}>
                    <Skeleton h="60px" w="150px" rounded="xl" bg="whiteAlpha.50" />
                    <Skeleton h="60px" w="100px" rounded="xl" bg="whiteAlpha.50" />
                </Flex>
            </Flex>

            {/* Filters */}
            <Flex gap={4} mb={6}>
                <Skeleton h="40px" flex={1} rounded="lg" bg="whiteAlpha.50" />
                <Skeleton h="40px" w="150px" rounded="lg" bg="whiteAlpha.50" />
                <Skeleton h="40px" w="150px" rounded="lg" bg="whiteAlpha.50" />
            </Flex>

            {/* Table Area */}
            <Box w="full" bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={2} mb={6}>
                {/* Table Header */}
                <Flex px={4} py={3} borderBottom="1px solid" borderColor="whiteAlpha.100">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} h="16px" flex={1} mx={2} rounded="sm" bg="whiteAlpha.100" />
                    ))}
                </Flex>
                {/* Table Rows */}
                {[1, 2, 3, 4, 5, 6, 7].map((row) => (
                    <Flex key={row} px={4} py={4} borderBottom="1px solid" borderColor="whiteAlpha.50">
                        <Skeleton h="20px" flex={1} mx={2} rounded="md" bg="whiteAlpha.50" />
                        <Skeleton h="20px" flex={1} mx={2} rounded="md" bg="whiteAlpha.50" />
                        <Skeleton h="20px" flex={1} mx={2} rounded="md" bg="whiteAlpha.50" />
                        <Skeleton h="20px" flex={1} mx={2} rounded="md" bg="whiteAlpha.50" />
                        <Skeleton h="20px" flex={1} mx={2} rounded="md" bg="whiteAlpha.50" />
                        <Skeleton h="20px" flex={1} mx={2} rounded="md" bg="whiteAlpha.50" />
                    </Flex>
                ))}
            </Box>

            {/* Bottom Summary Card */}
            <Skeleton h="120px" w="full" rounded="2xl" bg="whiteAlpha.50" />
        </Box>
    );
};
"use client";
import { Box, Flex, SimpleGrid, Skeleton } from "@chakra-ui/react";

export const CustomersSkeleton = () => {
    return (
        <Box w="full" animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite">
            {/* Header Skeleton */}
            <Box mb={6}>
                <Skeleton h="28px" w="200px" mb={2} rounded="md" bg="whiteAlpha.100" />
                <Skeleton h="16px" w="300px" rounded="md" bg="whiteAlpha.50" />
            </Box>

            {/* Filters Area Skeleton */}
            <Box mb={8} bg="whiteAlpha.50" p={4} rounded="xl" border="1px solid" borderColor="whiteAlpha.100">
                <Skeleton h="20px" w="150px" mb={4} rounded="sm" bg="whiteAlpha.100" />
                <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} gap={4}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} h="40px" w="full" rounded="lg" bg="whiteAlpha.50" />
                    ))}
                </SimpleGrid>
            </Box>

            {/* Table Area Skeleton */}
            <Box w="full" bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={2}>
                <Flex px={4} py={3} borderBottom="1px solid" borderColor="whiteAlpha.100">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} h="16px" flex={1} mx={2} rounded="sm" bg="whiteAlpha.100" />
                    ))}
                </Flex>
                {[1, 2, 3, 4, 5, 6, 7].map((row) => (
                    <Flex key={row} px={4} py={5} borderBottom="1px solid" borderColor="whiteAlpha.50">
                        <Box flex={1.5} mx={2}>
                            <Skeleton h="16px" w="80%" mb={2} rounded="sm" bg="whiteAlpha.50" />
                            <Skeleton h="12px" w="40%" rounded="sm" bg="whiteAlpha.50" />
                        </Box>
                        {[1, 2, 3, 4, 5].map((col) => (
                            <Skeleton key={col} h="20px" flex={1} mx={2} rounded="md" bg="whiteAlpha.50" />
                        ))}
                    </Flex>
                ))}
            </Box>
        </Box>
    );
};
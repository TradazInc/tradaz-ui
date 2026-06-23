"use client";
import { Box, Flex, SimpleGrid, Skeleton } from "@chakra-ui/react";

export const AddProductSkeleton = () => {
    return (
        <Box w="full" animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite">
            {/* Page Header */}
            <Skeleton h="32px" w="250px" mb={6} rounded="md" bg="whiteAlpha.100" />

            {/* Completion Guide Skeleton */}
            <Box bg="whiteAlpha.50" p={4} rounded="xl" mb={8} border="1px solid" borderColor="whiteAlpha.100">
                <Flex justify="space-between" mb={4}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Flex key={i} align="center" gap={2}>
                            <Skeleton boxSize="16px" rounded="full" bg="whiteAlpha.100" />
                            <Skeleton h="16px" w="60px" rounded="md" bg="whiteAlpha.100" />
                        </Flex>
                    ))}
                </Flex>
                <Skeleton h="40px" w="full" rounded="lg" bg="red.400" opacity={0.2} />
            </Box>

            {/* Media Section Skeleton */}
            <Box bg="whiteAlpha.50" p={6} rounded="2xl" mb={8} border="1px solid" borderColor="whiteAlpha.100">
                <Skeleton h="24px" w="150px" mb={6} rounded="md" bg="whiteAlpha.100" />
                <Skeleton h="200px" w="full" rounded="xl" bg="whiteAlpha.50" />
            </Box>

            {/* Basic Info Section Skeleton */}
            <Box bg="whiteAlpha.50" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                <Skeleton h="24px" w="150px" mb={6} rounded="md" bg="whiteAlpha.100" />
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Box key={i}>
                            <Skeleton h="16px" w="100px" mb={2} rounded="sm" bg="whiteAlpha.100" />
                            <Skeleton h="45px" w="full" rounded="lg" bg="whiteAlpha.50" />
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
};
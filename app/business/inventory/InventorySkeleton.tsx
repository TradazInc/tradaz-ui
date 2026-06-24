"use client";
import { Box, Flex, SimpleGrid, Skeleton } from "@chakra-ui/react";

export const InventorySkeleton = () => {
    return (
        <Box w="full" animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite">
            {/* Header & Toolbar */}
            <Flex justify="space-between" align="end" mb={6} wrap="wrap" gap={4}>
                <Box>
                    <Skeleton h="28px" w="150px" mb={2} rounded="md" bg="whiteAlpha.100" />
                    <Skeleton h="16px" w="200px" rounded="md" bg="whiteAlpha.50" />
                </Box>
                <Flex gap={3} w={{ base: "full", md: "auto" }}>
                    <Skeleton h="40px" w={{ base: "full", md: "250px" }} rounded="lg" bg="whiteAlpha.50" />
                    <Skeleton h="40px" w="100px" rounded="lg" bg="whiteAlpha.50" />
                </Flex>
            </Flex>

            {/* Grid Area */}
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={6} mb={8}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Box key={i} bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden">
                        {/* Image Placeholder */}
                        <Skeleton h="250px" w="full" bg="whiteAlpha.100" />
                        
                        {/* Content Placeholder */}
                        <Box p={4}>
                            <Flex justify="space-between" mb={3}>
                                <Skeleton h="20px" w="60%" rounded="sm" bg="whiteAlpha.100" />
                                <Skeleton boxSize="20px" rounded="full" bg="whiteAlpha.100" />
                            </Flex>
                            <Skeleton h="14px" w="40%" mb={2} rounded="sm" bg="whiteAlpha.50" />
                            <Skeleton h="14px" w="80%" mb={2} rounded="sm" bg="whiteAlpha.50" />
                            <Skeleton h="14px" w="70%" mb={4} rounded="sm" bg="whiteAlpha.50" />
                            
                            {/* Buttons Placeholder */}
                            <Flex gap={2} mt={4}>
                                <Skeleton h="32px" flex={1} rounded="md" bg="whiteAlpha.100" />
                                <Skeleton h="32px" flex={1} rounded="md" bg="whiteAlpha.100" />
                                <Skeleton h="32px" flex={1} rounded="md" bg="whiteAlpha.100" />
                            </Flex>
                        </Box>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};
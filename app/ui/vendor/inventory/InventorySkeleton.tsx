"use client";
import { Box, Flex, SimpleGrid, Skeleton } from "@chakra-ui/react";

export const InventorySkeleton = () => {
    return (
        <Box w="full" animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" bg="#000000">
            {/* Header & Toolbar */}
            <Flex justify="space-between" align="end" mb={6} wrap="wrap" gap={4} pt={2}>
                <Box>
                    <Skeleton h="36px" w="200px" mb={2} rounded="none" bg="#1A1A1A" />
                    <Skeleton h="16px" w="150px" rounded="none" bg="#111111" />
                </Box>
            </Flex>

            <Box mb={6} pb={3} borderBottom="1px solid #1A1A1A">
                <Flex gap={3} w={{ base: "full", md: "auto" }} justify="space-between">
                    <Skeleton h="44px" w={{ base: "full", md: "400px" }} rounded="none" bg="#111111" />
                    <Flex gap={3}>
                        <Skeleton h="44px" w="180px" rounded="none" bg="#111111" display={{ base: "none", md: "block" }} />
                        <Skeleton h="44px" w="180px" rounded="none" bg="#111111" display={{ base: "none", md: "block" }} />
                    </Flex>
                </Flex>
            </Box>

            {/* Grid Area */}
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={6} mb={8}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Box key={i} bg="#0A0A0A" rounded="none" border="1px solid #1A1A1A" overflow="hidden" display="flex" flexDirection="column">
                        {/* Image Placeholder */}
                        <Skeleton h="280px" w="full" bg="#111111" rounded="none" />
                        
                        {/* Content Placeholder */}
                        <Box p={5} flex={1} display="flex" flexDirection="column">
                            <Flex justify="space-between" mb={4} align="start">
                                <Skeleton h="24px" w="70%" rounded="none" bg="#1A1A1A" />
                                <Skeleton boxSize="18px" rounded="none" bg="#1A1A1A" />
                            </Flex>
                            
                            <Skeleton h="14px" w="40%" mb={3} rounded="none" bg="#111111" />
                            
                            <Flex justify="space-between" align="center" mb={6}>
                                <Box w="50%">
                                    <Skeleton h="12px" w="80%" mb={1} rounded="none" bg="#111111" />
                                    <Skeleton h="12px" w="60%" rounded="none" bg="#111111" />
                                </Box>
                                <Skeleton h="28px" w="30%" rounded="none" bg="#1A1A1A" />
                            </Flex>
                            
                            {/* Buttons Placeholder */}
                            <Flex gap={2} mt="auto">
                                <Skeleton h="36px" flex={1} rounded="none" bg="#111111" />
                                <Skeleton h="36px" flex={1} rounded="none" bg="#111111" />
                                <Skeleton h="36px" flex={1} rounded="none" bg="#111111" />
                            </Flex>
                        </Box>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};
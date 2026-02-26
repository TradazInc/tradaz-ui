"use client";
import { Box, Flex, Skeleton} from "@chakra-ui/react";

export const PosSkeleton = () => {
    return (
        <Flex gap={6} direction={{ base: "column", xl: "row" }} w="full" animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite">
            
            {/* Left Column: Cart Area */}
            <Box flex={1} display="flex" flexDirection="column" gap={6}>
                {/* Search Bar Skeleton */}
                <Flex gap={4}>
                    <Skeleton h="56px" flex={1} rounded="xl" bg="whiteAlpha.100" />
                    <Skeleton h="56px" w="120px" rounded="xl" bg="whiteAlpha.50" />
                </Flex>

                {/* Table Skeleton */}
                <Box bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={4} minH="500px">
                    <Flex borderBottom="1px solid" borderColor="whiteAlpha.100" pb={4} mb={4}>
                        <Skeleton h="16px" w="40%" rounded="sm" bg="whiteAlpha.100" />
                    </Flex>
                    {[1, 2, 3, 4].map((i) => (
                        <Flex key={i} justify="space-between" align="center" py={4} borderBottom="1px solid" borderColor="whiteAlpha.50">
                            <Box flex={1}>
                                <Skeleton h="16px" w="60%" mb={2} rounded="sm" bg="whiteAlpha.100" />
                                <Skeleton h="12px" w="30%" rounded="sm" bg="whiteAlpha.50" />
                            </Box>
                            <Skeleton h="30px" w="100px" rounded="md" bg="whiteAlpha.50" />
                            <Skeleton h="30px" w="80px" ml={6} rounded="md" bg="whiteAlpha.50" />
                        </Flex>
                    ))}
                </Box>
            </Box>

            {/* Right Column: Checkout Summary Skeleton */}
            <Box w={{ base: "full", xl: "400px" }}>
                <Box bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6} position="sticky" top="85px">
                    <Skeleton h="24px" w="150px" mb={6} rounded="md" bg="whiteAlpha.100" />
                    
                    <Skeleton h="16px" w="full" mb={4} rounded="sm" bg="whiteAlpha.50" />
                    <Skeleton h="16px" w="full" mb={4} rounded="sm" bg="whiteAlpha.50" />
                    <Skeleton h="24px" w="full" mb={8} rounded="md" bg="whiteAlpha.100" />

                    <Skeleton h="48px" w="full" mb={4} rounded="lg" bg="whiteAlpha.50" />
                    <Skeleton h="48px" w="full" mb={4} rounded="lg" bg="whiteAlpha.50" />
                    <Skeleton h="64px" w="full" mt={8} rounded="xl" bg="#5cac7d" opacity={0.3} />
                </Box>
            </Box>
            
        </Flex>
    );
};
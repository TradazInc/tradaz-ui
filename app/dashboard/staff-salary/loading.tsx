"use client";
import { Box, SimpleGrid, Skeleton } from "@chakra-ui/react";

export default function Loading() {
    return (
        <Box w="full" animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite">
            <Skeleton h="80px" w="full" rounded="xl" mb={6} bg="whiteAlpha.50" />
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                <Skeleton h="120px" rounded="2xl" bg="whiteAlpha.50" />
                <Skeleton h="120px" rounded="2xl" bg="whiteAlpha.50" />
                <Skeleton h="120px" rounded="2xl" bg="whiteAlpha.50" />
            </SimpleGrid>
            <Skeleton h="400px" w="full" rounded="2xl" bg="whiteAlpha.50" />
        </Box>
    );
}
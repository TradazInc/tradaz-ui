"use client";
import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

export const Analytics = () => {
    return (
        <Box bg="#1e1e20" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" h="full" minH="350px">
            <Flex justify="space-between" align="center" mb={6}>
                <Text fontSize="lg" color="white" fontWeight="bold">Revenue Overview</Text>
                <Button size="sm" variant="ghost" color="gray.400" _hover={{ bg: "whiteAlpha.100" }}>This Week</Button>
            </Flex>
            <Flex w="full" h="250px" bg="whiteAlpha.50" rounded="xl" border="1px dashed" borderColor="whiteAlpha.200" align="center" justify="center">
                <Text color="gray.500" fontSize="sm">Chart Placeholder (Integrate Recharts or Chart.js here)</Text>
            </Flex>
        </Box>
    );
};
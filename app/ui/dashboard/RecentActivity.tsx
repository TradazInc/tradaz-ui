"use client";
import React from "react";
import { Box, Text, VStack, Flex, Circle } from "@chakra-ui/react";

const ACTIVITIES = [
    { id: 1, title: "New order #1042", time: "2 mins ago", color: "green.400" },
    { id: 2, title: "Payment of ₦15,000 received", time: "1 hour ago", color: "blue.400" },
    { id: 3, title: "Customer 'John Doe' registered", time: "3 hours ago", color: "purple.400" },
    { id: 4, title: "Inventory low for 'Nike Air'", time: "5 hours ago", color: "orange.400" },
];

export const RecentActivity = () => {
    return (
        <Box bg="#1e1e20" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" h="full">
            <Text fontSize="lg" color="white" fontWeight="bold" mb={6}>Recent Activity</Text>
            <VStack align="stretch" gap={5}>
                {ACTIVITIES.map((activity) => (
                    <Flex key={activity.id} gap={4} align="flex-start">
                        <Circle size="10px" bg={activity.color} mt={1.5} boxShadow={`0 0 10px var(--chakra-colors-${activity.color.replace('.', '-')})`} />
                        <Box>
                            <Text fontSize="sm" color="white" fontWeight="medium">{activity.title}</Text>
                            <Text fontSize="xs" color="gray.500">{activity.time}</Text>
                        </Box>
                    </Flex>
                ))}
            </VStack>
        </Box>
    );
};
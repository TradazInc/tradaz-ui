"use client";
import React from "react";
import { Box, Text, VStack, Flex, Circle } from "@chakra-ui/react";

// 🚀 Stripped the vibrant colors to enforce the monochrome aesthetic
const ACTIVITIES = [
    { id: 1, title: "New order #1042", time: "2 mins ago" },
    { id: 2, title: "Payment of ₦15,000 received", time: "1 hour ago" },
    { id: 3, title: "Customer 'John Doe' registered", time: "3 hours ago" },
    { id: 4, title: "Inventory low for 'Nike Air'", time: "5 hours ago" },
];

export const RecentActivity = () => {
    return (
        <Box 
            bg="#0A0A0A" 
            p={6} 
            border="1px solid #1A1A1A" 
            h="full"
            position="relative"
            overflow="hidden"
        >
            
            <Box
                position="absolute"
                inset={0}
                opacity={0.3}
                backgroundImage="linear-gradient(to right, #27272A 1px, transparent 1px), linear-gradient(to bottom, #27272A 1px, transparent 1px)"
                backgroundSize="24px 24px"
                zIndex={0}
                style={{
                
                    maskImage: "radial-gradient(ellipse at top right, black 10%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(ellipse at top right, black 10%, transparent 70%)"
                }}
            />

            {/* 🚀 Content Layer */}
            <Box position="relative" zIndex={1}>
                <Text fontSize="md" color="white" fontWeight="600" mb={6} letterSpacing="tight">
                    Recent Activity
                </Text>
                
                <VStack align="stretch" gap={5}>
                    {ACTIVITIES.map((activity) => (
                        <Flex key={activity.id} gap={4} align="flex-start">
                        
                            <Circle 
                                size="8px" 
                                bg="white" 
                                mt={1.5} 
                                boxShadow="0 0 0 4px #1A1A1A" 
                            />
                            <Box>
                                <Text fontSize="13px" color="white" fontWeight="500">
                                    {activity.title}
                                </Text>
                                <Text fontSize="12px" color="#888888" mt={0.5}>
                                    {activity.time}
                                </Text>
                            </Box>
                        </Flex>
                    ))}
                </VStack>
            </Box>
        </Box>
    );
};
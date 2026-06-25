"use client";
import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

export const Analytics = () => {
    return (
        <Box 
            bg="#0A0A0A" 
            p={6} 
            border="1px solid #1A1A1A" 
            h="full" 
            minH="350px"
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
                    
                    maskImage: "radial-gradient(ellipse at top, black 10%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(ellipse at top, black 10%, transparent 70%)"
                }}
            />

            {/* Content Layer */}
            <Box position="relative" zIndex={1} h="full" display="flex" flexDirection="column">
                <Flex justify="space-between" align="center" mb={6}>
                    <Text fontSize="md" color="white" fontWeight="600" letterSpacing="tight">
                        Revenue Overview
                    </Text>
                    
                    
                    <Button 
                        size="sm" 
                        h="28px"
                        bg="transparent" 
                        border="1px solid #1A1A1A"
                        color="#888888" 
                        fontSize="12px"
                        fontWeight="500"
                        _hover={{ bg: "#1A1A1A", color: "white" }}
                        transition="all 0.2s"
                    >
                        This Week
                    </Button>
                </Flex>
                
                <Flex 
                    w="full" 
                    flex={1}
                    minH="250px" 
                    bg="#000000" 
                    border="1px dashed #1A1A1A" 
                    align="center" 
                    justify="center"
                >
                    <Text color="#52525B" fontSize="13px" fontWeight="500">
                        Chart Placeholder (Integrate Recharts or Chart.js here)
                    </Text>
                </Flex>
            </Box>
        </Box>
    );
};
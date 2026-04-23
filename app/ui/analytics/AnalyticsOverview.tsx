"use client";

import React from "react";
import { SimpleGrid, Flex, Text, Icon, Box, BoxProps } from "@chakra-ui/react";

import { LuTrendingUp, LuDollarSign, LuShoppingCart } from "react-icons/lu";
import { MetricCardProps } from '@/app/lib/definitions';


const GridCard = ({ children, ...rest }: { children: React.ReactNode } & BoxProps) => {
  return (
    <Box
      bg="#0A0A0A"
      border="1px solid #1A1A1A"
      p={6}
      position="relative"
      overflow="hidden"
      _hover={{ borderColor: "#333333" }}
      transition="all 0.2s ease"
      {...rest}
    >
      {/* Background Grid Pattern */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.3}
        backgroundImage="linear-gradient(to right, #27272A 1px, transparent 1px), linear-gradient(to bottom, #27272A 1px, transparent 1px)"
        backgroundSize="24px 24px"
        zIndex={0}
        style={{
          maskImage: "radial-gradient(ellipse at top left, black 10%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at top left, black 10%, transparent 70%)",
        }}
      />

      {/* Content Wrapper */}
      <Box position="relative" zIndex={1} w="full" h="full">
        {children}
      </Box>
    </Box>
  );
};


const MetricCard = ({ title, value, trend, icon, isNegative = false }: MetricCardProps) => (
    <GridCard>
        <Flex justify="space-between" align="center" mb={4}>
            <Text color="white" fontWeight="600" fontSize="md" letterSpacing="tight">
                {title}
            </Text>
            <Icon 
                as={icon} 
                boxSize={5} 
                color="white" 
                style={{ strokeWidth: "2.5" }} 
            />
        </Flex>
        
        <Text fontSize="2xl" color="white" fontWeight="bold" mb={2} letterSpacing="tight">
            {value}
        </Text>
        
        <Flex align="center" gap={2}>
            <Text 
                fontSize="xs" 
                fontWeight="600" 
                color={isNegative ? "red.400" : "green.400"} 
                bg="#1A1A1A" 
                px={2} 
                py={0.5} 
                border="1px solid #27272A"
            >
                {trend}
            </Text>
            <Text fontSize="xs" color="#888888">
                vs last month
            </Text>
        </Flex>
    </GridCard>
);


export const AnalyticsOverview = () => {
    return (
        <Box w="full" animation="fade-in 0.3s ease">
            <Text color="white" fontWeight="bold" mb={6} fontSize="xl" letterSpacing="tight">
                Analytics & Performance
            </Text>

            {/* Metrics Cards */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                <MetricCard title="Total Revenue" value="₦4,520,000" trend="+12.5%" icon={LuDollarSign} />
                <MetricCard title="Total Orders" value="1,245" trend="+8.2%" icon={LuShoppingCart} />
                <MetricCard title="Conversion Rate" value="3.4%" trend="-1.1%" icon={LuTrendingUp} isNegative />
            </SimpleGrid>

            {/* Chart Placeholder wrapped in the local GridCard */}
            <GridCard h="400px" display="flex" alignItems="center" justifyContent="center" flexDirection="column" p={6}>
                <Flex direction="column" align="center" justify="center" h="full" w="full">
                    
                    <Icon as={LuTrendingUp} boxSize="40px" color="#333333" mb={4} />
                    <Text fontSize="lg" color="white" fontWeight="bold" mb={2} letterSpacing="tight">
                        Revenue Over Time
                    </Text>
                    <Text color="#888888" fontSize="sm">
                        Your interactive chart will render here.
                    </Text>
                </Flex>
            </GridCard>
        </Box>
    );
};
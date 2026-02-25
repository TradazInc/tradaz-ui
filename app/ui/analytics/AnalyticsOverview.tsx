"use client";

import { Box, SimpleGrid, Flex, Text, Icon } from "@chakra-ui/react";
import { LuTrendingUp, LuDollarSign, LuShoppingCart, LuTrendingDown } from "react-icons/lu";

import { MetricCardProps } from '@/app/lib/definitions';


const MetricCard = ({ title, value, trend, icon, isNegative = false }: MetricCardProps) => (
    <Box p={6} bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
        <Flex justify="space-between" align="center" mb={4}>
            <Text color="gray.400" fontSize="sm" fontWeight="medium">{title}</Text>
            <Flex justify="center" align="center" w="32px" h="32px" bg="whiteAlpha.100" rounded="lg">
                <Icon as={icon} color="#5cac7d" />
            </Flex>
        </Flex>
        <Text fontSize="3xl" fontWeight="bold" color="white" mb={2}>{value}</Text>
        <Flex align="center" gap={1}>
            <Icon as={isNegative ? LuTrendingDown : LuTrendingUp} color={isNegative ? "red.400" : "#5cac7d"} boxSize="12px" />
            <Text fontSize="xs" color={isNegative ? "red.400" : "#5cac7d"} fontWeight="medium">
                {trend} from last month
            </Text>
        </Flex>
    </Box>
);

export const AnalyticsOverview = () => {
    return (
        <Box w="full">
            <Text color="#5cac7d" fontWeight="bold" mb={6} fontSize="xl">
                Analytics & Performance
            </Text>

            {/* Metrics Cards */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                <MetricCard title="Total Revenue" value="₦4,520,000" trend="+12.5%" icon={LuDollarSign} />
                <MetricCard title="Total Orders" value="1,245" trend="+8.2%" icon={LuShoppingCart} />
                <MetricCard title="Conversion Rate" value="3.4%" trend="-1.1%" icon={LuTrendingUp} isNegative />
            </SimpleGrid>

            {/* Chart Placeholder*/}
            <Box w="full" h="400px" bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6} display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <Icon as={LuTrendingUp} boxSize="40px" color="whiteAlpha.200" mb={4} />
                <Text fontSize="lg" color="white" fontWeight="bold" mb={2}>Revenue Over Time</Text>
                <Text color="gray.500" fontSize="sm">Your interactive chart will render here.</Text>
            </Box>
        </Box>
    );
};
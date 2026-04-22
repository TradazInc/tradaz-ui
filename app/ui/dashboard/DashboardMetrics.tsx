"use client";
import React from "react";
import { SimpleGrid, Box, Text, Flex, Icon } from "@chakra-ui/react";
import { LuTrendingUp, LuUsers, LuPackage, LuDollarSign } from "react-icons/lu";

const METRICS = [
  {
    label: "Total Revenue",
    value: "₦4,250,000",
    trend: "+12.5%",
    icon: LuDollarSign,
    color: "green.400",
  },
  {
    label: "Total Orders",
    value: "1,240",
    trend: "+8.2%",
    icon: LuPackage,
    color: "yellow.400",
  },
  {
    label: "Customers",
    value: "892",
    trend: "+5.1%",
    icon: LuUsers,
    color: "blue.400",
  },
  {
    label: "Conversion Rate",
    value: "3.2%",
    trend: "-1.2%",
    icon: LuTrendingUp,
    color: "green.400",
  },
];

const MetricCard = ({ metric }: { metric: (typeof METRICS)[0] }) => {
 
  const isNegative = metric.trend.startsWith("-");

  return (
    <Box
      bg="#0A0A0A"
      border="1px solid #1A1A1A"
      p={5}
      position="relative"
      overflow="hidden"
      _hover={{ borderColor: "#333333" }}
      transition="all 0.2s ease"
    >
      <Box
        position="absolute"
        inset={0}
        opacity={0.3}
        backgroundImage="linear-gradient(to right, #27272A 1px, transparent 1px), linear-gradient(to bottom, #27272A 1px, transparent 1px)"
        backgroundSize="24px 24px"
        zIndex={0}
        style={{
          maskImage:
            "radial-gradient(ellipse at top left, black 10%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at top left, black 10%, transparent 70%)",
        }}
      />

      <Box position="relative" zIndex={1}>
        <Flex justify="space-between" align="center" mb={4}>
          <Text
            color="white"
            fontWeight="600"
            fontSize="md"
            letterSpacing="tight"
          >
            {metric.label}
          </Text>
          {/* Icons  */}
          <Icon
            as={metric.icon}
            boxSize={5}
            color={metric.color}
            style={{ strokeWidth: "2.5" }}
          />
        </Flex>

        <Text
          fontSize="2xl"
          color="white"
          fontWeight="bold"
          mb={2}
          letterSpacing="tight"
        >
          {metric.value}
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
            {metric.trend}
          </Text>
          <Text fontSize="xs" color="#888888">
            vs last month
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export const DashboardMetrics = () => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4} mb={8}>
      {METRICS.map((metric, idx) => (
        <MetricCard key={idx} metric={metric} />
      ))}
    </SimpleGrid>
  );
};
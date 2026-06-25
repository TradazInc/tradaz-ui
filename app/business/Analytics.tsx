"use client";

import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { DashboardCard } from "@/app/components/DashboardCard";

export const Analytics = () => {
  return (
    <DashboardCard h="full" minH="350px" maskPosition="top">
      {/* Header Section */}
      <Flex justify="space-between" align="center" mb={6}>
        <Text
          fontSize="md"
          color="white"
          fontWeight="600"
          letterSpacing="tight"
        >
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

      {/* Chart Section */}
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
    </DashboardCard>
  );
};

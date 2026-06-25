"use client";

import React from "react";
import { Box, Text, Flex, Icon } from "@chakra-ui/react";

export interface MetricCardProps {
  label: string;
  value: string | number;
  trend: string;
  icon: React.ElementType;
  color: string;
  trendLabel?: string;
}

export const MetricCard = ({
  label,
  value,
  trend,
  icon,
  color,
  trendLabel = "vs last month",
}: MetricCardProps) => {
  const isNegative = trend.startsWith("-");

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
      {/* Cool Grid Background Pattern */}
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
            {label}
          </Text>
          <Icon
            as={icon}
            boxSize={5}
            color={color}
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
            {trendLabel}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

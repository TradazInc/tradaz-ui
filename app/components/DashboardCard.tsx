"use client";

import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface DashboardCardProps extends BoxProps {
  children: React.ReactNode;
  maskPosition?: string;
}

export const DashboardCard = ({
  children,
  maskPosition = "top",
  ...props
}: DashboardCardProps) => {
  return (
    <Box
      bg="#0A0A0A"
      p={6}
      border="1px solid #1A1A1A"
      position="relative"
      overflow="hidden"
      {...props}
    >
      {/* Grid Background Pattern */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.3}
        backgroundImage="linear-gradient(to right, #27272A 1px, transparent 1px), linear-gradient(to bottom, #27272A 1px, transparent 1px)"
        backgroundSize="24px 24px"
        zIndex={0}
        style={{
          maskImage: `radial-gradient(ellipse at ${maskPosition}, black 10%, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(ellipse at ${maskPosition}, black 10%, transparent 70%)`,
        }}
      />

      {/* Content Layer */}
      <Box
        position="relative"
        zIndex={1}
        h="full"
        display="flex"
        flexDirection="column"
      >
        {children}
      </Box>
    </Box>
  );
};

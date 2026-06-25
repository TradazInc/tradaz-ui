"use client";

import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { LuTrendingUp, LuUsers, LuPackage, LuDollarSign } from "react-icons/lu";
import { MetricCard } from "@/app/components/MetricCard";

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

export const DashboardMetrics = () => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4} mb={8}>
      {METRICS.map((metric, idx) => (
        <MetricCard
          key={idx}
          label={metric.label}
          value={metric.value}
          trend={metric.trend}
          icon={metric.icon}
          color={metric.color}
          trendLabel="vs last week"
        />
      ))}
    </SimpleGrid>
  );
};

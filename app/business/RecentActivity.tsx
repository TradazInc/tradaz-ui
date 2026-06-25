"use client";

import React from "react";
import { Box, Text, VStack, Flex, Circle } from "@chakra-ui/react";
import { DashboardCard } from "@/app/components/DashboardCard";

const ACTIVITIES = [
  { id: 1, title: "New order #1042", time: "2 mins ago" },
  { id: 2, title: "Payment of ₦15,000 received", time: "1 hour ago" },
  { id: 3, title: "Customer 'John Doe' registered", time: "3 hours ago" },
  { id: 4, title: "Inventory low for 'Nike Air'", time: "5 hours ago" },
];

export const RecentActivity = () => {
  return (
    <DashboardCard h="full" maskPosition="top right">
      <Text
        fontSize="md"
        color="white"
        fontWeight="600"
        mb={6}
        letterSpacing="tight"
      >
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
    </DashboardCard>
  );
};

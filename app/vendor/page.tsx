"use client";
import React from "react";
import { Box, SimpleGrid, Skeleton, Text, Flex, Icon, VStack, Circle, Button } from "@chakra-ui/react";
import { LuTrendingUp, LuTrendingDown, LuPackage, LuWallet, LuEye, LuShoppingBag } from "react-icons/lu";
import { useDashboardData } from "@/app/hooks/useDashboardData"; 


const VENDOR_METRICS = [
  {
    label: "Available Balance",
    value: "₦145,000",
    trend: "+12.5%",
    icon: LuWallet,
    color: "green.400",
  },
  {
    label: "Total Orders",
    value: "124",
    trend: "+8.2%",
    icon: LuPackage,
    color: "blue.400",
  },
  {
    label: "Store Views",
    value: "1,892",
    trend: "+5.1%",
    icon: LuEye,
    color: "purple.400",
  },
  {
    label: "Active Products",
    value: "45",
    trend: "-1.2%",
    icon: LuShoppingBag,
    color: "orange.400",
  },
];

const MetricCard = ({ metric }: { metric: (typeof VENDOR_METRICS)[0] }) => {
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
          maskImage: "radial-gradient(ellipse at top left, black 10%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at top left, black 10%, transparent 70%)",
        }}
      />

      <Box position="relative" zIndex={1}>
        <Flex justify="space-between" align="center" mb={4}>
          <Text color="white" fontWeight="600" fontSize="md" letterSpacing="tight">
            {metric.label}
          </Text>
          <Icon as={metric.icon} boxSize={5} color={metric.color} style={{ strokeWidth: "2.5" }} />
        </Flex>

        <Text fontSize="2xl" color="white" fontWeight="bold" mb={2} letterSpacing="tight">
          {metric.value}
        </Text>

        <Flex align="center" gap={2}>
          <Flex 
            align="center" 
            gap={1} 
            fontSize="xs" 
            fontWeight="bold" 
            color={isNegative ? "red.400" : "green.400"} 
            bg="#111111" 
            px={2} py={0.5} 
            border="1px solid #1A1A1A"
          >
            <Icon as={isNegative ? LuTrendingDown : LuTrendingUp} strokeWidth="3" />
            {metric.trend}
          </Flex>
          <Text fontSize="xs" color="#888888">vs last month</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export const DashboardMetrics = () => (
  <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4} mb={8}>
    {VENDOR_METRICS.map((metric, idx) => (
      <MetricCard key={idx} metric={metric} />
    ))}
  </SimpleGrid>
);



export const Analytics = () => (
  <Box bg="#0A0A0A" p={6} border="1px solid #1A1A1A" h="full" minH="350px" position="relative" overflow="hidden">
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

    <Box position="relative" zIndex={1} h="full" display="flex" flexDirection="column">
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="md" color="white" fontWeight="600" letterSpacing="tight">Store Revenue</Text>
        <Button 
          size="sm" h="28px" bg="transparent" border="1px solid #333333" rounded="none"
          color="#888888" fontSize="12px" fontWeight="500" _hover={{ bg: "#1A1A1A", color: "white" }} transition="all 0.2s"
        >
          This Week
        </Button>
      </Flex>
      
      <Flex w="full" flex={1} minH="250px" bg="#000000" border="1px dashed #1A1A1A" align="center" justify="center">
        <Text color="#52525B" fontSize="13px" fontWeight="500">Chart Placeholder (Integrate Recharts)</Text>
      </Flex>
    </Box>
  </Box>
);



const VENDOR_ACTIVITIES = [
  { id: 1, title: "New order #ORD-009 received", time: "10 mins ago" },
  { id: 2, title: "Payout of ₦45,000 processed", time: "2 hours ago" },
  { id: 3, title: "Product 'Denim Jacket' approved by Admin", time: "5 hours ago" },
  { id: 4, title: "Low stock alert: 'Suede Loafers'", time: "1 day ago" },
];

export const RecentActivity = () => (
  <Box bg="#0A0A0A" p={6} border="1px solid #1A1A1A" h="full" position="relative" overflow="hidden">
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

    <Box position="relative" zIndex={1}>
      <Text fontSize="md" color="white" fontWeight="600" mb={6} letterSpacing="tight">Store Activity</Text>
      <VStack align="stretch" gap={5}>
        {VENDOR_ACTIVITIES.map((activity) => (
          <Flex key={activity.id} gap={4} align="flex-start">
            <Circle size="8px" bg="white" mt={1.5} boxShadow="0 0 0 4px #1A1A1A" />
            <Box>
              <Text fontSize="13px" color="white" fontWeight="500">{activity.title}</Text>
              <Text fontSize="12px" color="#888888" mt={0.5}>{activity.time}</Text>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  </Box>
);



export default function VendorDashboardPage() {
  const { isLoading } = useDashboardData();

  if (isLoading) {
    return (
      <Box w="full" minH="100vh" bg="#000000" p={{ base: 4, md: 8 }} animation="fade-in 0.3s ease">
        <Skeleton height="28px" width="250px" mb={6} rounded="none" bg="#111111" />
        
        <SimpleGrid columns={{ base: 1, md: 4 }} gap={4} mb={8}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height="140px" rounded="none" bg="#0A0A0A" border="1px solid #1A1A1A" />
          ))}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 3 }} gap={4}>
          <Box gridColumn={{ lg: "span 2" }}>
            <Skeleton height="400px" rounded="none" bg="#0A0A0A" border="1px solid #1A1A1A" />
          </Box>
          <Skeleton height="400px" rounded="none" bg="#0A0A0A" border="1px solid #1A1A1A" />
        </SimpleGrid>
      </Box>
    );
  }

  return (
    <Box w="full" minH="100vh" bg="#000000" p={{ base: 4, md: 8 }} animation="fade-in 0.3s ease">
      <Box mb={8}>
        <DashboardMetrics />
      </Box>
      
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={4}>
        <Box gridColumn={{ lg: "span 2" }}>
          <Analytics />
        </Box>
        <RecentActivity />
      </SimpleGrid>
    </Box>
  );
}
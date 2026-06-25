import { Box, SimpleGrid } from "@chakra-ui/react";
import { Analytics } from "./Analytics";
import { DashboardMetrics } from "./DashboardMetrics";
import { RecentActivity } from "./RecentActivity";

export default async function DashboardPage() {
  return (
    <Box
      w="full"
      minH="100vh"
      bg="#000000"
      p={{ base: 4, md: 8 }}
      animation="fade-in 0.3s ease"
    >
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

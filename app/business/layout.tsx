import { Flex, Box } from "@chakra-ui/react";
import { LuLayoutDashboard } from "react-icons/lu";

import { Sidebar } from "@/app/components/Sidebar";
import { BusinessHeader } from "@/app/business/BusinessHeader";

import { sideBarItems } from "@/data/sidebarItems";

const businessNavItems = [
  { label: "Overview", icon: LuLayoutDashboard, path: "/business" },
  ...sideBarItems,
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex direction="column" h="100vh" w="full" bg="#000000" overflow="hidden">
      <BusinessHeader navItems={businessNavItems} basePath="/business" />

      {/* MAIN CONTENT AREA */}
      <Flex
        flex={1}
        position="relative"
        bg="#000000"
        alignItems="stretch"
        minH={0}
        overflow="hidden"
      >
        <Box display={{ base: "none", md: "block" }} h="full">
          <Sidebar items={businessNavItems} basePath="/business" />
        </Box>

        <Box
          flex={1}
          overflowY="auto"
          overflowX="hidden"
          scrollbarGutter="stable"
          as="main"
          p={{ base: 4, md: 8 }}
          minH={0}
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}

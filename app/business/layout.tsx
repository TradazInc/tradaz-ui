"use client";
import { useState } from "react";
import { Flex, Box, IconButton, Icon, Text, Breadcrumb } from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";
import { Sidebar } from "@/app/ui/dashboard/Sidebar";
import { DashboardHeader } from "@/app/ui/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Only store state remains 
  const [availableStores] = useState([
    { id: "1", name: "Downtown Outlet", address: "Lagos" },
    { id: "2", name: "Island Branch", address: "Lagos" },
  ]);
  const [activeStoreId, setActiveStoreId] = useState("1");

  return (
    <Flex direction="column" h="100vh" w="full" bg="#000000" overflow="hidden">
      {/* HEADER */}
      <Flex
        h="50px"
        w="full"
        align="center"
        bg="#000000"
        position="relative"
        zIndex={100}
        flexShrink={0}
        pl={6}
        pr={{ base: 4, md: 8 }}
        gap={3}
      >
        {/* MOBILE MENU */}
        <IconButton
          aria-label="Open Menu"
          variant="ghost"
          display={{ base: "flex", md: "none" }}
          onClick={() => setSidebarOpen(true)}
          color="#888888"
          _hover={{ color: "white", bg: "#111111" }}
          size="sm"
          rounded="none"
        >
          <Icon as={LuMenu} boxSize="22px" strokeWidth="2.5" />
        </IconButton>

        <Breadcrumb.Root>
          <Breadcrumb.List gap={3}>
            {/* LOGO */}
            <Breadcrumb.Item>
              <Text
                fontSize="xl"
                fontWeight="extrabold"
                color="white"
                letterSpacing="tight"
                userSelect="none"
              >
                Tradaz<Text as="span" color="#888888">.</Text>
              </Text>
            </Breadcrumb.Item>

            {/* BREADCRUMB SEPARATOR */}
            <Breadcrumb.Separator
              color="gray.600"
              fontSize="xl"
              display={{ base: "none", md: "block" }}
            >
              /
            </Breadcrumb.Separator>
          </Breadcrumb.List>
        </Breadcrumb.Root>

        {/* RIGHT SECTION (DashboardHeader) */}
        <Flex
          flex={1}
          h="full"
          align="center"
          overflow="visible"
          position="relative"
          zIndex={2}
        >
          <DashboardHeader
            availableStores={availableStores}
            activeStoreId={activeStoreId}
            onStoreChange={setActiveStoreId}
          />
        </Flex>

        {/* UNBREAKABLE LINE */}
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          h="1px"
          bg="#1A1A1A"
          zIndex={10}
          pointerEvents="none"
        />
      </Flex>

      {/* MAIN CONTENT AREA */}
      <Flex
        flex={1}
        position="relative"
        bg="#000000"
        alignItems="stretch"
        minH={0}
        overflow="hidden"
      >
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

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
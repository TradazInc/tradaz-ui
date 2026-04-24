"use client";
import { useState } from "react";
import { Flex, Box, IconButton, Icon, Text } from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu"; 
import { Sidebar } from "@/app/ui/dashboard/Sidebar"; 
import { DashboardHeader } from "@/app/ui/dashboard/DashboardHeader"; 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [businesses] = useState([
    { id: "1", name: "Tradaz Fashion", category: "Retail" },
    { id: "2", name: "Wada Tech", category: "Software" }
  ]);
  const [activeBusinessId, setActiveBusinessId] = useState("1");
  
  const [availableStores] = useState([
    { id: "1", name: "Downtown Outlet", address: "Lagos" },
    { id: "2", name: "Island Branch", address: "Lagos" }
  ]);
  const [activeStoreId, setActiveStoreId] = useState("1");

  const activeBusiness =
    businesses.find((b) => b.id === activeBusinessId) || businesses[0];

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

        {/* LOGO (Extrabold) */}
        <Text
          fontSize="xl"
          fontWeight="extrabold" 
          color="white"
          letterSpacing="tight"
          userSelect="none"
        >
          Tradaz<Text as="span" color="#888888">.</Text>
        </Text>

        {/* FIRST BREADCRUMB SEPARATOR */}
        <Text 
            color="gray.600" 
            fontSize="xl" 
            display={{ base: "none", md: "block" }}
        >
            /
        </Text>

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
            businesses={businesses}
            activeBusiness={activeBusiness}
            onBusinessChange={setActiveBusinessId}
            availableStores={availableStores}
            activeStoreId={activeStoreId}
            onStoreChange={setActiveStoreId}
            onOpenSidebar={() => setSidebarOpen(true)}
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
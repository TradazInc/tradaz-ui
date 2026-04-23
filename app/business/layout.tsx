"use client";
import { useState } from "react";
import { Flex, Box, IconButton, Icon } from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu"; 
import { Sidebar } from "@/app/ui/dashboard/Sidebar"; 
import { DashboardHeader } from "@/app/ui/dashboard/DashboardHeader"; 
import TradazHeader from "../ui/TradazHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Placeholder Data
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

  const activeBusiness = businesses.find(b => b.id === activeBusinessId) || businesses[0];

  return (
    <Flex h="100vh" w="full" bg="#000000" overflow="hidden" direction="column">
      
      
      <Flex 
        w="full" 
        align="center" 
        bg="rgba(0, 0, 0, 0.85)" 
        backdropFilter="blur(12px)"
        borderBottom="1px solid #1A1A1A" 
        zIndex={100}
        h="65px" 
      >
         
         <Flex 
            w={{ base: "auto", lg: "280px" }} 
            px={{ base: 4, md: 8 }} 
            align="center" 
            gap={4} 
            borderRight={{ lg: "1px solid #1A1A1A" }} 
            h="full" 
            flexShrink={0}
         >
            {/* Hamburger  on mobile */}
            <IconButton 
                aria-label="Open Menu"
                variant="ghost" 
                display={{ base: "flex", lg: "none" }} 
                onClick={() => setSidebarOpen(true)} 
                color="#888888" 
                _hover={{ color: "white", bg: "#111111" }} 
                size="sm"
                rounded="none"
                px={0} 
            >
                <Icon as={LuMenu} boxSize="22px" strokeWidth="2.5" />
            </IconButton>

            <TradazHeader />
         </Flex>

         {/* The rest of the Header (Breadcrumbs & Profile) */}
         <Box flex={1} overflow="hidden">
            <DashboardHeader 
                businesses={businesses}
                activeBusiness={activeBusiness}
                onBusinessChange={setActiveBusinessId}
                availableStores={availableStores}
                activeStoreId={activeStoreId}
                onStoreChange={setActiveStoreId}
                onOpenSidebar={() => setSidebarOpen(true)}
            />
         </Box>
      </Flex>

      <Flex flex={1} overflow="hidden" position="relative">
         
         {/* SIDEBAR */}
         <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setSidebarOpen(false)}
         />

         {/* CONTENT AREA */}
         <Box flex={1} overflowY="auto" as="main" p={{ base: 4, md: 8 }}>
            {children}
         </Box>

      </Flex>
    </Flex>
  );
}
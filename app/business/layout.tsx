"use client";
import { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
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
      >
         {/* Fixed width to align precisely with the sidebar below it */}
         <Flex w={{ base: "auto", lg: "280px" }} px={{ base: 4, md: 8 }} align="center" borderRight={{ lg: "1px solid #1A1A1A" }} h="40px" flexShrink={0}>
            <TradazHeader />
         </Flex>

         {/* The rest of the Header */}
         <Box flex={1}>
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
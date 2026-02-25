"use client";
import { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { Sidebar } from "@/app/ui/dashboard/Sidebar"; 
import { DashboardHeader } from "@/app/ui/dashboard/DashboardHeader"; 

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
    <Flex h="100vh" w="full" bg="#0B0D14" overflow="hidden">
      
      {/* SIDEBAR */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeBusiness={activeBusiness}
        availableStores={availableStores}
        activeStoreId={activeStoreId}
        onStoreChange={setActiveStoreId}
      />

      {/* CONTENT AREA */}
      <Box flex={1} h="100vh" overflowY="auto" position="relative" display="flex" flexDirection="column">
        
        {/*HEADER */}
        <DashboardHeader 
            businesses={businesses}
            activeBusiness={activeBusiness}
            onBusinessChange={setActiveBusinessId}
            onOpenSidebar={() => setSidebarOpen(true)}
        />

        
        <Box as="main" p={{ base: 4, md: 8 }} flex={1}>
          {children}
        </Box>

      </Box>
    </Flex>
  );
}
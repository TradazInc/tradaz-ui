"use client";
import { useState } from "react";
import { Flex, Box, IconButton, Icon, Text, Avatar, AvatarGroup } from "@chakra-ui/react";
import { LuMenu, LuBell, LuBuilding2, LuStore, LuUser} from "react-icons/lu"; 
import { Sidebar } from "@/app/ui/dashboard/Sidebar"; 

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // to be fetched from the Vendor's session/token
  const vendorContext = {
    businessName: "Tradaz Fashion",
    storeName: "Downtown Outlet",
    role: "Vendor"
  };

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

        {/* LOGO */}
        <Text
          fontSize="xl"
          fontWeight="extrabold" 
          color="white"
          letterSpacing="tight"
          userSelect="none"
        >
          Tradaz<Text as="span" color="#888888">.</Text>
        </Text>

      
        <Text color="gray.600" fontSize="xl" display={{ base: "none", md: "block" }}>
            /
        </Text>

        {/* STATIC BUSINESS NAME */}
        <Flex align="center" gap={2} display={{ base: "none", md: "flex" }}>
            <Icon as={LuBuilding2} boxSize="18px" color="#888888" strokeWidth="2.5" />
            <Text fontSize="xl" fontWeight="300" color="white" lineClamp={1}>
                {vendorContext.businessName}
            </Text>
        </Flex>

       
        <Text color="gray.600" fontSize="xl" display={{ base: "none", md: "block" }}>
            /
        </Text>

        {/* STATIC STORE NAME */}
        <Flex align="center" gap={2} display={{ base: "none", md: "flex" }}>
            <Icon as={LuStore} boxSize="18px" color="#888888" strokeWidth="2.5" />
            <Text fontSize="xl" fontWeight="300" color="white" lineClamp={1}>
                {vendorContext.storeName}
            </Text>
        </Flex>

        <Text color="gray.600" fontSize="xl" display={{ base: "none", md: "block" }}>
            /
        </Text>

        {/* VENDOR ROLE BADGE */}
        <Flex align="center" gap={2} display={{ base: "none", md: "flex" }}>
            <Icon as={LuUser} boxSize="18px" color="gray.400" strokeWidth="2.5" />
            <Text fontSize="xl" fontWeight="300" color="white" lineClamp={1}>
                {vendorContext.role}
            </Text>
        </Flex>

        {/* Notifications & Profile */}
        <Flex gap={6} align="center" ml="auto" zIndex={2}>
           
            <Box position="relative" cursor="pointer">
                <Icon as={LuBell} color="white" boxSize="20px" _hover={{ color: "gray.300" }} transition="color 0.2s" mt={1} strokeWidth="2.5" />
                <Box position="absolute" top="2px" right="-2px" boxSize="8px" bg="red.500" rounded="none" border="1px solid #000000" />
            </Box>

           
            <Box cursor="pointer">
                <AvatarGroup>
                    <Avatar.Root size="sm" border="1px solid" rounded="full" borderColor="#333333" transition="all 0.2s" _hover={{ borderColor: "white" }}>
                        <Avatar.Fallback bg="#1A1A1A" rounded="full" color="white" fontSize="11px" fontWeight="bold">VN</Avatar.Fallback>
                    </Avatar.Root>
                </AvatarGroup>
            </Box>
        </Flex>

      
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
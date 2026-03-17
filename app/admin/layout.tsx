"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Icon, IconButton, Input 
} from "@chakra-ui/react";
import { 
    LuMenu, LuBell, LuSearch 
} from "react-icons/lu";

// ✅ Import the new modular Sidebar component
import { AdminSidebar } from "@/app/ui/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const brandColor = "#5cac7d";
    
    // Desktop collapse state & Mobile drawer state
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <Flex h="100vh" bg="#0A0A0B" overflow="hidden">
            
            {/* --- DESKTOP SIDEBAR --- */}
            <Box 
                display={{ base: "none", lg: "flex" }} w={isCollapsed ? "80px" : "260px"} 
                bg="#121212" borderRight="1px solid" borderColor="whiteAlpha.100" 
                flexDirection="column" py={6} px={isCollapsed ? 3 : 5} transition="width 0.3s cubic-bezier(0.4, 0, 0.2, 1)" zIndex={100}
                flexShrink={0}
            >
                <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} setIsMobileOpen={setIsMobileOpen} />
            </Box>

            {/* --- MOBILE SIDEBAR DRAWER --- */}
            <Box display={{ base: "block", lg: "none" }}>
                {/* Backdrop */}
                <Box 
                    position="fixed" inset={0} bg="blackAlpha.800" backdropFilter="blur(4px)" zIndex={999}
                    opacity={isMobileOpen ? 1 : 0} pointerEvents={isMobileOpen ? "auto" : "none"} transition="opacity 0.3s"
                    onClick={() => setIsMobileOpen(false)}
                />
                {/* Drawer */}
                <Box 
                    position="fixed" top={0} left={0} h="100vh" w="260px" bg="#121212" zIndex={1000}
                    borderRight="1px solid" borderColor="whiteAlpha.100" flexDirection="column" py={6} px={5}
                    transform={isMobileOpen ? "translateX(0)" : "translateX(-100%)"} transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                    <AdminSidebar isCollapsed={false} setIsCollapsed={setIsCollapsed} setIsMobileOpen={setIsMobileOpen} />
                </Box>
            </Box>

            {/* --- MAIN CONTENT AREA --- */}
            <Flex flex={1} direction="column" overflow="hidden">
                
                {/* Admin Header */}
                <Flex 
                    h="70px" bg="#121212" borderBottom="1px solid" borderColor="whiteAlpha.100" 
                    align="center" justify="space-between" px={{ base: 4, lg: 8 }} flexShrink={0}
                >
                    <Flex align="center" gap={4}>
                        <IconButton 
                            aria-label="Open Menu" variant="ghost" color="white" display={{ base: "flex", lg: "none" }}
                            onClick={() => setIsMobileOpen(true)}
                        >
                            <LuMenu />
                        </IconButton>
                        <Text display={{ base: "none", sm: "block" }} color="gray.400" fontSize="sm" fontWeight="medium">
                            Welcome back, Admin
                        </Text>
                    </Flex>

                    <Flex align="center" gap={4}>
                        {/* Global Search */}
                        <Flex display={{ base: "none", md: "flex" }} align="center" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" rounded="full" px={4} h="40px" w="300px" _focusWithin={{ borderColor: brandColor }}>
                            <Icon as={LuSearch} color="gray.500" boxSize="14px" />
                            <Input placeholder="Search orders, users..." border="none" color="white" fontSize="sm" _focus={{ boxShadow: "none", outline: "none" }} />
                        </Flex>

                        {/* Notifications */}
                        <IconButton aria-label="Notifications" variant="ghost" color="gray.400" rounded="full" position="relative" _hover={{ bg: "whiteAlpha.100", color: "white" }}>
                            <LuBell />
                            <Box position="absolute" top="8px" right="8px" boxSize="8px" bg="red.500" rounded="full" border="2px solid #121212" />
                        </IconButton>
                    </Flex>
                </Flex>

                {/* Page Content */}
                <Box flex={1} overflowY="auto" id="admin-scroll-container">
                    {children}
                </Box>
            </Flex>
            
        </Flex>
    );
}
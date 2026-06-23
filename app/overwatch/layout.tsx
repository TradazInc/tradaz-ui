"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, IconButton, 
} from "@chakra-ui/react";
import { 
    LuMenu, LuBell,
} from "react-icons/lu";

import { AdminSidebar } from "@/app/overwatch/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
   
    
    // Desktop collapse state & Mobile drawer state
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    
    // Notification Dropdown State
    const [isNotifOpen, setIsNotifOpen] = useState(false);

    return (
        <Flex h={{ base: "100dvh", lg: "100vh" }} bg="#000" overflow="hidden">
            
            {/* --- DESKTOP SIDEBAR --- */}
            <Box 
                display={{ base: "none", lg: "flex" }} w={isCollapsed ? "80px" : "260px"} 
                bg="#000" borderRight="1px solid" borderColor="whiteAlpha.100" 
                flexDirection="column" transition="width 0.3s cubic-bezier(0.4, 0, 0.2, 1)" zIndex={100}
                flexShrink={0}
            >
                <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} setIsMobileOpen={setIsMobileOpen} />
            </Box>

            {/* --- MOBILE SIDEBAR DRAWER --- */}
            <Box display={{ base: "block", lg: "none" }}>
                
                <Box 
                    position="fixed" inset={0} bg="blackAlpha.800" backdropFilter="blur(4px)" zIndex={999}
                    opacity={isMobileOpen ? 1 : 0} pointerEvents={isMobileOpen ? "auto" : "none"} transition="opacity 0.3s"
                    onClick={() => setIsMobileOpen(false)}
                />
                
                
                <Flex 
                    position="fixed" top={0} left={0} h="100dvh" w="280px" bg="#000000" zIndex={1000}
                    borderRight="1px solid" borderColor="whiteAlpha.100" flexDirection="column"
                    transform={isMobileOpen ? "translateX(0)" : "translateX(-100%)"} transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                    <AdminSidebar isCollapsed={false} setIsCollapsed={setIsCollapsed} setIsMobileOpen={setIsMobileOpen} isMobileOpen={isMobileOpen} />
                </Flex>
            </Box>

            {/* --- MAIN CONTENT AREA --- */}
            <Flex flex={1} direction="column" overflow="hidden">
                
                
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
                            Welcome back, System Ops
                        </Text>
                    </Flex>

                    <Flex align="center" gap={4}>
                        {/* Notifications Wrapper */}
                        <Box position="relative">
                            
                           
                            {isNotifOpen && (
                                <Box position="fixed" inset={0} zIndex={998} onClick={() => setIsNotifOpen(false)} />
                            )}

                            <IconButton 
                                aria-label="Notifications" variant="ghost" color="gray.400" rounded="none" 
                                position="relative" _hover={{ bg: "#1A1A1A", color: "white" }}
                                onClick={() => setIsNotifOpen(!isNotifOpen)}
                            >
                                <LuBell strokeWidth="2.5"  />
                                <Box position="absolute" top="8px" right="8px" boxSize="8px" bg="red.500" rounded="full" border="2px solid #121212" />
                            </IconButton>

                            {/* Notification Dropdown Box */}
                            {isNotifOpen && (
                                <Box 
                                    position="absolute" top="100%" right={0} mt={2} w="320px" 
                                    bg="#0A0A0A" border="1px solid #333333" zIndex={999}
                                    boxShadow="0 10px 40px rgba(0,0,0,0.8)" animation="fade-in 0.2s ease"
                                >
                                    <Flex justify="space-between" align="center" p={4} borderBottom="1px solid #1A1A1A">
                                        <Text color="white" fontWeight="bold" fontSize="sm" letterSpacing="tight">Alerts</Text>
                                        <Text color="#5cac7d" fontSize="xs" fontWeight="bold" cursor="pointer" _hover={{ textDecoration: "underline" }}>Mark read</Text>
                                    </Flex>
                                    
                                    <Box maxH="300px" overflowY="auto" css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: '#333333' } }}>
                                        <Box p={4} borderBottom="1px solid #1A1A1A" _hover={{ bg: "#111111" }} cursor="pointer" transition="all 0.2s">
                                            <Text color="white" fontSize="sm" fontWeight="bold" mb={1} letterSpacing="tight">New Merchant Application</Text>
                                            <Text color="#888888" fontSize="xs">Gadget World has submitted KYC documents for review.</Text>
                                            <Text color="#555555" fontSize="10px" mt={2} fontFamily="monospace">2 mins ago</Text>
                                        </Box>
                                        <Box p={4} borderBottom="1px solid #1A1A1A" _hover={{ bg: "#111111" }} cursor="pointer" transition="all 0.2s">
                                            <Text color="red.400" fontSize="sm" fontWeight="bold" mb={1} letterSpacing="tight">High Dispute Alert</Text>
                                            <Text color="#888888" fontSize="xs">Urban Kicks NG has 3 new disputes escalated to Admin.</Text>
                                            <Text color="#555555" fontSize="10px" mt={2} fontFamily="monospace">1 hour ago</Text>
                                        </Box>
                                        <Box p={4} _hover={{ bg: "#111111" }} cursor="pointer" transition="all 0.2s">
                                            <Text color="white" fontSize="sm" fontWeight="bold" mb={1} letterSpacing="tight">Payout Batch Processed</Text>
                                            <Text color="#888888" fontSize="xs">14 pending merchant settlements were successfully disbursed.</Text>
                                            <Text color="#555555" fontSize="10px" mt={2} fontFamily="monospace">3 hours ago</Text>
                                        </Box>
                                    </Box>
                                    
                                    <Flex p={3} justify="center" borderTop="1px solid #1A1A1A" bg="#111111" _hover={{ bg: "#1A1A1A" }} cursor="pointer" transition="all 0.2s">
                                        <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">View All Activity</Text>
                                    </Flex>
                                </Box>
                            )}
                        </Box>
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
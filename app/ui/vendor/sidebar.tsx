"use client";
import React, { useState } from "react";
import { Box, VStack, Text, Icon, Flex, Button, ScrollArea } from "@chakra-ui/react";
import Link from "next/link";
import { 
    LuLayoutDashboard, LuFile, LuLogOut,LuPackage, LuPlus
} from "react-icons/lu";
import { SidebarProps } from "@/app/lib/definitions";


const VENDOR_NAV_ITEMS = [
    { label: "Dashboard", icon: LuLayoutDashboard, path: "/business/vendor" },
    { label: "Add Product", icon: LuPlus, path: "/business/vendor/add-product" },
    { label: "Inventory", icon: LuPackage, path: "/business/vendor/inventory" },
    { label: "Sales record", icon: LuFile, path: "/business/vendor/sales-record" },
    // { label: "Settings", icon: LuSettings, path: "/business/vendor/settings" },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const [isCollapsed] = useState(false);
    
   
    const [activeItem, setActiveItem] = useState("Dashboard");

    const hoverStyle = { bg: "#111111", color: "white" };
    const iconStyle = { strokeWidth: "2.5", boxSize: "18px", flexShrink: 0 }; 

    return (
        <Box
            w={{ base: "280px", md: isCollapsed ? "80px" : "280px" }} 
            minW={{ base: "280px", md: isCollapsed ? "80px" : "280px" }} 
            maxW={{ base: "280px", md: isCollapsed ? "80px" : "280px" }} 
            h={{ base: "100%", md: "calc(100vh - 65px)" }} 
            bg="#000000" 
            borderRight="1px solid #1A1A1A" 
            position={{ base: "absolute", md: "static" }} 
            top={0} left={0}
            transform={{ base: isOpen ? "translateX(0)" : "translateX(-100%)", md: "translateX(0)" }}
            zIndex={10} display="flex" flexDirection="column" 
            px={0} 
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            color="white"
            flexShrink={0}
        >
            <ScrollArea.Root flex={1} display="flex" flexDirection="column" overflow="hidden">
                <ScrollArea.Viewport flex={1}>
                    <Box pt={4} pb={4} css={{ '& [data-part="indicator"]': { display: isCollapsed ? 'none' : 'block' } }}>
                        <VStack align="start" gap={1}>
                            {VENDOR_NAV_ITEMS.map((item, idx) => {
                                const isActive = activeItem === item.label;
                                return (
                                    <Link 
                                        key={idx} 
                                        href={item.path} 
                                        style={{ width: '100%', textDecoration: 'none' }} 
                                        onClick={() => { 
                                            setActiveItem(item.label); 
                                            if (isOpen) onClose?.(); 
                                        }}
                                    >
                                        <Flex 
                                            align="center" 
                                            justify={isCollapsed ? "center" : "flex-start"} 
                                            gap={3} 
                                            py={3} 
                                            px={isCollapsed ? 0 : 6} 
                                            w="full"
                                            color={isActive ? "white" : "#A1A1AA"} 
                                            bg={isActive ? "#111111" : "transparent"}
                                            borderRight={isActive && !isCollapsed ? "2px solid white" : "2px solid transparent"}
                                            _hover={hoverStyle} 
                                            cursor="pointer" 
                                            transition="all 0.2s"
                                        >
                                            <Icon as={item.icon} css={iconStyle} />
                                            {!isCollapsed && <Text fontSize="14px" fontWeight="500" whiteSpace="nowrap">{item.label}</Text>}
                                        </Flex>
                                    </Link>
                                );
                            })}
                        </VStack>
                    </Box>
                </ScrollArea.Viewport>
                
       
                <ScrollArea.Scrollbar bg="#000000" w="6px" p={0}>
                    <ScrollArea.Thumb bg="#1A1A1A" rounded="none" _hover={{ bg: "#333333" }} />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>

            {/* --- BOTTOM SECTION (PINNED & PERMANENTLY VISIBLE) --- */}
            <Box px={isCollapsed ? 2 : 6} pt={4} pb={4} mt="auto" flexShrink={0} borderTop="1px solid #1A1A1A" bg="#000000">
                {!isCollapsed ? (
                    <Box>
                        <Box p={3} bg="#0A0A0A" border="1px solid #1A1A1A" rounded="none" mb={3}>
                            <Flex align="center" justify="space-between" mb={3}>
                                <Text fontSize="13px" fontWeight="500" color="#A1A1AA" whiteSpace="nowrap">
                                    Storage: 45%
                                </Text>
                            </Flex>
                            <Button h="32px" fontSize="13px" fontWeight="bold" w="full" bg="white" color="black" _hover={{ bg: "#E5E5E5" }} transition="all 0.2s" border="none" rounded="none">
                                Upgrade Plan
                            </Button>
                        </Box>

                        <Flex align="center" gap={3} px={0} py={2} cursor="pointer" rounded="none" color="red.500" _hover={{ bg: "rgba(229, 62, 62, 0.1)" }} transition="all 0.2s">
                            <Icon as={LuLogOut} color="red.500" css={iconStyle} />
                            <Text fontSize="14px" fontWeight="600" whiteSpace="nowrap">Log Out</Text>
                        </Flex>
                    </Box>
                ) : (
                    <VStack gap={4} py={2}>
                        <Flex justify="center" align="center" cursor="pointer" color="red.500" _hover={{ bg: "rgba(229, 62, 62, 0.1)" }} p={2} rounded="none">
                            <Icon as={LuLogOut} color="red.500" css={iconStyle} />
                        </Flex>
                    </VStack>
                )}
            </Box>
        </Box>
    );
};
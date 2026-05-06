"use client";
import React, { useState } from "react";
import { Box, VStack, Text, Icon, Flex, Button, ScrollArea, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { 
    LuLayoutDashboard, LuFile, LuLogOut, LuPackage, LuPlus, LuX,
} from "react-icons/lu";
import { SidebarProps } from "@/app/lib/definitions";

const VENDOR_NAV_ITEMS = [
    { label: "Dashboard", icon: LuLayoutDashboard, path: "/vendor" },
    { label: "Add Product", icon: LuPlus, path: "/vendor/add-product" },
    { label: "Inventory", icon: LuPackage, path: "/vendor/inventory" },
    { label: "Sales record", icon: LuFile, path: "/vendor/sales-record" },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const [isCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState("Dashboard");

    const brandColor = "#5cac7d";
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
            position={{ base: "fixed", md: "static" }} 
            top={0} left={0}
            transform={{ base: isOpen ? "translateX(0)" : "translateX(-100%)", md: "translateX(0)" }}
            zIndex={999999} display="flex" flexDirection="column" 
            px={0} 
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            color="white"
            flexShrink={0}
        >
            {/* --- MOBILE CLOSE BUTTON & HEADER --- */}
            <Flex align="center" justify={isCollapsed ? "center" : "space-between"} pt={6} pb={6} px={isCollapsed ? 0 : 6} h="80px" borderBottom="1px solid #1A1A1A" mb={4}>
                {!isCollapsed && (
                    <Flex align="center" gap={3} overflow="hidden">
                      
                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight" whiteSpace="nowrap">
                            Tradaz <Text as="span" color="#888888">.</Text>
                        </Text>
                    </Flex>
                )}
                {/* Mobile specific close button */}
                <IconButton 
                    aria-label="Close Sidebar" variant="ghost" color="#888888" size="sm" rounded="none"
                    display={{ base: "flex", md: "none" }} onClick={onClose}
                    _hover={{ bg: "#111111", color: "white" }}
                >
                    <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                </IconButton>
            </Flex>

            <ScrollArea.Root flex={1} display="flex" flexDirection="column" overflow="hidden">
                <ScrollArea.Viewport flex={1}>
                    <Box pt={0} pb={4} css={{ '& [data-part="indicator"]': { display: isCollapsed ? 'none' : 'block' } }}>
                        <VStack align="start" gap={0}>
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
                                            py={4} 
                                            px={isCollapsed ? 0 : 6} 
                                            w="full"
                                            color={isActive ? "white" : "#888888"} 
                                            bg={isActive ? "#111111" : "transparent"}
                                            borderRight={isActive && !isCollapsed ? "2px solid white" : "2px solid transparent"}
                                            _hover={hoverStyle} 
                                            cursor="pointer" 
                                            transition="all 0.2s"
                                        >
                                            <Icon as={item.icon} css={iconStyle} color={isActive ? brandColor : "inherit"} />
                                            {!isCollapsed && <Text fontSize="14px" fontWeight="bold" letterSpacing="tight" whiteSpace="nowrap">{item.label}</Text>}
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
                                <Text fontSize="13px" fontWeight="bold" color="#888888" whiteSpace="nowrap">
                                    Storage: 45%
                                </Text>
                            </Flex>
                            <Button h="36px" fontSize="13px" fontWeight="bold" w="full" bg="white" color="black" _hover={{ bg: "#E5E5E5" }} transition="all 0.2s" border="none" rounded="none">
                                Upgrade Plan
                            </Button>
                        </Box>

                        <Flex align="center" gap={3} px={4} py={3} cursor="pointer" rounded="none" color="red.400" _hover={{ bg: "#111111" }} border="1px solid transparent"  transition="all 0.2s">
                            <Icon as={LuLogOut} color="red.400" css={iconStyle} />
                            <Text fontSize="14px" fontWeight="bold" whiteSpace="nowrap" letterSpacing="tight">Log Out</Text>
                        </Flex>
                    </Box>
                ) : (
                    <VStack gap={4} py={2}>
                        <Flex justify="center" align="center" cursor="pointer" color="red.400" _hover={{ bg: "#111111", borderColor: "#333333" }} p={3} rounded="none" border="1px solid transparent">
                            <Icon as={LuLogOut} color="red.400" css={iconStyle} />
                        </Flex>
                    </VStack>
                )}
            </Box>
        </Box>
    );
};
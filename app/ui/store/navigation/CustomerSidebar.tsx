"use client";
import React, { useState } from "react";
import { Box, VStack, Text, Icon, Flex, Badge, IconButton } from "@chakra-ui/react";
import Link from "next/link";

import { 
    LuHouse, LuHeart, LuShoppingCart, LuPackage, 
    LuMessageSquare, LuUser, LuX, LuMenu, LuStar, LuGift, LuTicket 
} from "react-icons/lu";
import { CustomerSidebarProps } from "@/app/lib/definitions";

const CUSTOMER_NAV_ITEMS = [
    { label: "Home", icon: LuHouse, path: "/store" },
    { label: "Review", icon: LuStar, path: "/store/review" },
    { label: "Saved Items", icon: LuHeart, path: "/store/saved" },
    { label: "My Cart", icon: LuShoppingCart, path: "/store/cart", badge: 2 },
    { label: "Gift Cards", icon: LuGift, path: "/store/gift-cards" }, 
    { label: "Coupons", icon: LuTicket, path: "/store/coupons" },     
];

const CUSTOMER_ACCOUNT_ITEMS = [
    { label: "My Orders", icon: LuPackage, path: "/account/orders" },
    { label: "Inbox & Support", icon: LuMessageSquare, path: "/account/inbox" },
    { label: "Profile Settings", icon: LuUser, path: "/account/settings" },
];

export const CustomerSidebar = ({ 
    activePath = "/", 
    brandColor = "#5cac7d", 
    storeName = "TRADAZ." 
}: CustomerSidebarProps) => {
    
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Box 
            display={{ base: "none", lg: "flex" }} 
            w={isCollapsed ? "80px" : "200px"} 
            h="100vh" bg="#121212" 
            borderRight="1px solid" borderColor="whiteAlpha.100" 
            position="sticky" top={0} left={0} 
            flexDirection="column" py={6} px={isCollapsed ? 3 : 4} zIndex={100}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            flexShrink={0}
        >
            {/* Header & Toggle */}
            <Flex align="center" justify={isCollapsed ? "center" : "space-between"} px={isCollapsed ? 0 : 2} mb={10} h="32px">
                {!isCollapsed && (
                    <Flex align="center" gap={3} overflow="hidden">
                        <Box boxSize="32px" bg={brandColor} rounded="lg" flexShrink={0} />
                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight" whiteSpace="nowrap">
                            {storeName}
                        </Text>
                    </Flex>
                )}
                <IconButton 
                    aria-label="Toggle Sidebar" variant="ghost" color="gray.400" size="sm" 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    _hover={{ bg: "whiteAlpha.100", color: "white" }}
                >
                    <Icon as={isCollapsed ? LuMenu : LuX} boxSize="20px" />
                </IconButton>
            </Flex>

            {/* Main Navigation */}
            <VStack align="stretch" gap={1} mb={8}>
                {CUSTOMER_NAV_ITEMS.map((item) => {
                    const isActive = activePath === item.path;
                    return (
                        <Link href={item.path} key={item.label} style={{ textDecoration: "none" }} title={isCollapsed ? item.label : ""}>
                            <Flex 
                                align="center" justify={isCollapsed ? "center" : "space-between"} 
                                px={isCollapsed ? 0 : 3} py={2.5} 
                                rounded="lg" cursor="pointer" transition="all 0.2s"
                                bg={isActive ? "whiteAlpha.100" : "transparent"}
                                color={isActive ? brandColor : "gray.400"}
                                _hover={{ bg: "whiteAlpha.100", color: isActive ? brandColor : "white" }}
                                position="relative"
                            >
                                <Flex align="center" justify="center" gap={3}>
                                    <Icon as={item.icon} fontSize="lg" />
                                    {!isCollapsed && <Text fontSize="sm" fontWeight={isActive ? "bold" : "medium"} whiteSpace="nowrap">{item.label}</Text>}
                                </Flex>
                                {!isCollapsed && item.badge && <Badge bg={brandColor} color="white" rounded="full" px={2} border="none">{item.badge}</Badge>}
                                {isCollapsed && item.badge && <Box position="absolute" top="8px" right="8px" boxSize="8px" bg={brandColor} rounded="full" />}
                            </Flex>
                        </Link>
                    );
                })}
            </VStack>

            {/* Account Navigation */}
            <VStack align="stretch" gap={1} flex={1}>
                {CUSTOMER_ACCOUNT_ITEMS.map((item) => {
                    const isActive = activePath === item.path;
                    return (
                        <Link href={item.path} key={item.label} style={{ textDecoration: "none" }} title={isCollapsed ? item.label : ""}>
                            <Flex 
                                align="center" justify={isCollapsed ? "center" : "flex-start"} 
                                px={isCollapsed ? 0 : 3} py={2.5} gap={3}
                                rounded="lg" cursor="pointer" transition="all 0.2s"
                                bg={isActive ? "whiteAlpha.100" : "transparent"}
                                color={isActive ? brandColor : "gray.400"} 
                                _hover={{ bg: "whiteAlpha.100", color: isActive ? brandColor : "white" }}
                            >
                                <Icon as={item.icon} fontSize="lg" />
                                {!isCollapsed && <Text fontSize="sm" fontWeight={isActive ? "bold" : "medium"} whiteSpace="nowrap">{item.label}</Text>}
                            </Flex>
                        </Link>
                    );
                })}
            </VStack>

            {/* User Profile Footer */}
            <Box mt="auto" p={isCollapsed ? 2 : 3} bg="whiteAlpha.50" rounded="xl" border="1px solid" borderColor="whiteAlpha.100" cursor="pointer" _hover={{ bg: "whiteAlpha.100" }} transition="all 0.2s">
                <Flex align="center" justify={isCollapsed ? "center" : "flex-start"} gap={3}>
                    <Flex justify="center" align="center" boxSize={isCollapsed ? "32px" : "36px"} bg={brandColor} color="white" rounded="full" fontWeight="bold" flexShrink={0}>W</Flex>
                    {!isCollapsed && (
                        <Box overflow="hidden">
                            <Text fontSize="sm" fontWeight="bold" color="white" whiteSpace="nowrap">Wada Gift</Text>
                            <Text fontSize="xs" color="gray.400" whiteSpace="nowrap">Customer</Text>
                        </Box>
                    )}
                </Flex>
            </Box>
        </Box>
    );
};
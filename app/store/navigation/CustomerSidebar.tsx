"use client";
import React from "react";
import { Box, VStack, Text, Icon, Flex, Badge } from "@chakra-ui/react";
import Link from "next/link";

import { 
    LuHouse, LuHeart, LuShoppingCart, LuPackage, 
    LuMessageSquare, LuUser, LuStar, LuTicket, LuLogOut 
} from "react-icons/lu";
import { CustomerSidebarProps } from "@/data/types";

const CUSTOMER_NAV_ITEMS = [
    { label: "Home", icon: LuHouse, path: "/store" },
    { label: "Review", icon: LuStar, path: "/store/review" },
    { label: "Saved Items", icon: LuHeart, path: "/store/saved" },
    { label: "My Cart", icon: LuShoppingCart, path: "/store/cart", badge: 2 },
   
    { label: "Coupons", icon: LuTicket, path: "/store/coupons" },     
];

const CUSTOMER_ACCOUNT_ITEMS = [
    { label: "My Orders", icon: LuPackage, path: "/store/orders" },
    { label: "Inbox & Support", icon: LuMessageSquare, path: "/store/inbox" },
    { label: "Profile Settings", icon: LuUser, path: "/store/settings" },
];

export const CustomerSidebar = ({ 
    activePath = "/", 
    brandColor = "#5cac7d", 
}: CustomerSidebarProps) => {

    return (
        <Box 
            w="220px" 
            h="full" 
            bg="#121212" 
    
            borderRight="1px solid" borderColor="whiteAlpha.100" 
            flexDirection="column" py={4} px={4} zIndex={100000000}
            flexShrink={0}
            display="flex"
            animation="slide-in-top 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        >
            {/* Main Navigation */}
            <VStack align="stretch" gap={1} mb={8}>
                {CUSTOMER_NAV_ITEMS.map((item) => {
                    const isActive = activePath === item.path;
                    return (
                        <Link href={item.path} key={item.label} style={{ textDecoration: "none" }}>
                            <Flex 
                                align="center" justify="space-between" 
                                px={3} py={2.5} 
                                rounded="lg" cursor="pointer" transition="all 0.2s"
                                bg={isActive ? "whiteAlpha.100" : "transparent"}
                                color={isActive ? brandColor : "gray.400"}
                                _hover={{ bg: "whiteAlpha.100", color: isActive ? brandColor : "white" }}
                                position="relative"
                            >
                                <Flex align="center" gap={3}>
                                    <Icon as={item.icon} fontSize="lg" />
                                    <Text fontSize="sm" fontWeight={isActive ? "bold" : "medium"} whiteSpace="nowrap">{item.label}</Text>
                                </Flex>
                                {item.badge && <Badge bg={brandColor} color="white" rounded="full" px={2} border="none">{item.badge}</Badge>}
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
                        <Link href={item.path} key={item.label} style={{ textDecoration: "none" }}>
                            <Flex 
                                align="center" justify="flex-start" 
                                px={3} py={2.5} gap={3}
                                rounded="lg" cursor="pointer" transition="all 0.2s"
                                bg={isActive ? "whiteAlpha.100" : "transparent"}
                                color={isActive ? brandColor : "gray.400"} 
                                _hover={{ bg: "whiteAlpha.100", color: isActive ? brandColor : "white" }}
                            >
                                <Icon as={item.icon} fontSize="lg" />
                                <Text fontSize="sm" fontWeight={isActive ? "bold" : "medium"} whiteSpace="nowrap">{item.label}</Text>
                            </Flex>
                        </Link>
                    );
                })}
            </VStack>

            {/* Bottom Log Out Section */}
            <Box mt="auto" pt={4} borderTop="1px solid" borderColor="whiteAlpha.100">
                <Flex 
                    align="center" justify="flex-start" 
                    px={3} py={2.5} gap={3}
                    rounded="lg" cursor="pointer" transition="all 0.2s"
                    color="red.400" 
                    _hover={{ bg: "rgba(245, 101, 101, 0.1)" }}
                >
                    <Icon as={LuLogOut} fontSize="lg" />
                    <Text fontSize="sm" fontWeight="bold" whiteSpace="nowrap">Log Out</Text>
                </Flex>
            </Box>
            
        </Box>
    );
};
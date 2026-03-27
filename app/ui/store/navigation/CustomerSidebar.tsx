"use client";
import React from "react";
import { Box, VStack, Text, Icon, Flex, Badge, Avatar } from "@chakra-ui/react";
import Link from "next/link";

import { 
    LuHouse, LuHeart, LuShoppingCart, LuPackage, 
    LuMessageSquare, LuUser, LuStar, LuGift, LuTicket 
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
    { label: "My Orders", icon: LuPackage, path: "/store/orders" },
    { label: "Inbox & Support", icon: LuMessageSquare, path: "/store/inbox" },
    { label: "Profile Settings", icon: LuUser, path: "/store/settings" },
];

export const CustomerSidebar = ({ 
    activePath = "/", 
    brandColor = "#5cac7d", 
    // storeName is intentionally ignored here since we removed the header block
}: CustomerSidebarProps) => {

    return (
        <Box 
            w="220px" 
            h="full" 
            bg="#121212" 
            borderRight="1px solid" borderColor="whiteAlpha.100" 
            flexDirection="column" py={4} px={4} zIndex={100}
            flexShrink={0}
            animation="slide-in-top 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        >
            {/* Main Navigation (Store Header removed) */}
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

            {/*User Profile Footer with Avatar */}
            <Box 
                mt="auto" 
                p={3} 
                bg="whiteAlpha.50" 
                rounded="xl" 
                border="1px solid" 
                borderColor="whiteAlpha.100" 
                cursor="pointer" 
                _hover={{ bg: "whiteAlpha.100" }} 
                transition="all 0.2s"
            >
                <Flex align="center" justify="flex-start" gap={3}>
                    <Avatar.Root size="sm">
                        <Avatar.Fallback name="Wada Gift" bg={brandColor} color="white" />
                        <Avatar.Image src="https://bit.ly/sage-adebayo" /> 
                    </Avatar.Root>
                    
                    <Box overflow="hidden">
                        <Text fontSize="sm" fontWeight="bold" color="white" whiteSpace="nowrap">
                            Wada Gift
                        </Text>
                        <Text fontSize="10px" color="gray.500" whiteSpace="nowrap" textTransform="uppercase" letterSpacing="wider">
                            Customer
                        </Text>
                    </Box>
                </Flex>
            </Box>

            
        </Box>
    );
};
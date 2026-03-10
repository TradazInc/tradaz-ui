"use client";
import React from "react";
import { Flex, Icon, Text, Box, Badge } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LuHouse, LuHeart, LuShoppingCart, LuMessageSquare, LuUser 
} from "react-icons/lu";

interface MobileBottomNavProps {
    brandColor?: string;
}

const MOBILE_NAV_ITEMS = [
    { label: "Home", icon: LuHouse, path: "/store" },
    { label: "Wishlist", icon: LuHeart, path: "/store/saved" },
    { label: "Cart", icon: LuShoppingCart, path: "/store/cart", badge: 2 },
    { label: "Chat", icon: LuMessageSquare, path: "/store/inbox" },
    { label: "Profile", icon: LuUser, path: "/store/settings" },
];

export const MobileBottomNav = ({ brandColor = "#5cac7d" }: MobileBottomNavProps) => {
    const pathname = usePathname();

    return (
        <Flex 
            display={{ base: "flex", lg: "none" }} 
            position="fixed" bottom={0} left={0} right={0} w="full"
            bg="#121212" h="70px" borderTop="1px solid" borderColor="whiteAlpha.100"
            justify="space-evenly" align="center" zIndex={100}
            shadow="0px -4px 20px rgba(0, 0, 0, 0.4)" 
            px={1} pb={2} 
            boxSizing="border-box"
            overflowX="hidden" 
        >
            {MOBILE_NAV_ITEMS.map((item) => {
                
                const isActive = pathname === item.path || (item.path !== '/store' && pathname?.startsWith(item.path));

                return (
                    
                    <Link href={item.path} key={item.label} style={{ textDecoration: "none", flex: 1, display: "flex", justifyContent: "center" }}>
                        <Flex 
                            direction="column" justify="center" align="center" 
                            color={isActive ? brandColor : "gray.500"} 
                            position="relative" py={2} w="full"
                            transition="all 0.2s"
                        >
                            {/* Active Top Indicator */}
                            {isActive && (
                                <Box position="absolute" top="-8px" w="24px" h="3px" bg={brandColor} borderBottomRadius="md" />
                            )}

                            <Box position="relative">
                                <Icon as={item.icon} boxSize="22px" mb={1} />
                                {/* Notification Badge */}
                                {item.badge && (
                                    <Badge 
                                        position="absolute" top="-6px" right="-8px" 
                                        bg="red.500" color="white" rounded="full" 
                                        fontSize="9px" boxSize="16px" 
                                        display="flex" alignItems="center" justifyContent="center"
                                        border="2px solid #121212" 
                                    >
                                        {item.badge}
                                    </Badge>
                                )}
                            </Box>
                            
                            <Text fontSize="10px" fontWeight={isActive ? "bold" : "medium"}>
                                {item.label}
                            </Text>
                        </Flex>
                    </Link>
                );
            })}
        </Flex>
    );
};
"use client";
import React, { useState } from "react";
import { Flex, Icon, Text, Box, Badge } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LuHouse, LuHeart, LuShoppingCart, LuBell, LuUser, LuPackage, LuCircleCheck 
} from "react-icons/lu";

interface MobileBottomNavProps {
    brandColor?: string;
}

const MOBILE_NAV_ITEMS = [
    { label: "Home", icon: LuHouse, path: "/store" },
    { label: "Wishlist", icon: LuHeart, path: "/store/saved" },
    { label: "Cart", icon: LuShoppingCart, path: "/store/cart", badge: 2 },
    // 🚀 Added Bell explicitly as a nav item so it fits perfectly in the row
    { label: "Alerts", icon: LuBell, path: "#notifications", badge: 5 }, 
    { label: "Profile", icon: LuUser, path: "/store/settings" },
];

export const MobileBottomNav = ({ brandColor = "#5cac7d" }: MobileBottomNavProps) => {
    const pathname = usePathname();
    
    // State to track if the mobile notification panel is open
    const [isNotifOpen, setIsNotifOpen] = useState(false);

    return (
        <>
            {/* Mobile Notification Overlay Panel */}
            {isNotifOpen && (
                <>
                    <Box position="fixed" inset={0} zIndex={98} bg="blackAlpha.600" onClick={() => setIsNotifOpen(false)} />
                    <Box 
                        position="fixed" bottom="70px" left={0} right={0} zIndex={99} 
                        bg="#1A1C23" borderTopRadius="2xl" borderTop="1px solid" borderColor="whiteAlpha.200" 
                        p={4} shadow="dark-lg" animation="slide-up 0.3s ease-out"
                        maxH="60vh" display="flex" flexDirection="column"
                    >
                        <Flex justify="space-between" align="center" mb={4} pb={3} borderBottom="1px solid" borderColor="whiteAlpha.100">
                            <Text fontSize="md" fontWeight="bold" color="white">Notifications (5)</Text>
                            <Text fontSize="xs" color={brandColor} fontWeight="bold" onClick={() => setIsNotifOpen(false)} cursor="pointer">Close</Text>
                        </Flex>
                        
                        <Flex direction="column" overflowY="auto" gap={2} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                            {/* Dummy Notification 1 */}
                            <Flex align="start" gap={3} p={3} bg="whiteAlpha.50" rounded="xl">
                                <Flex bg="rgba(92, 172, 125, 0.15)" p={2} rounded="full" color={brandColor} flexShrink={0}>
                                    <Icon as={LuPackage} />
                                </Flex>
                                <Box>
                                    <Text fontSize="sm" fontWeight="bold" color="white">New Order Placed</Text>
                                    <Text fontSize="xs" color="gray.400" mt={0.5}>Order #1024 has been placed successfully.</Text>
                                    <Text fontSize="xs" color="gray.500" mt={1}>2 mins ago</Text>
                                </Box>
                            </Flex>
                            
                            {/* Dummy Notification 2 */}
                            <Flex align="start" gap={3} p={3} bg="whiteAlpha.50" rounded="xl">
                                <Flex bg="rgba(66, 153, 225, 0.15)" p={2} rounded="full" color="blue.500" flexShrink={0}>
                                    <Icon as={LuCircleCheck} />
                                </Flex>
                                <Box>
                                    <Text fontSize="sm" fontWeight="bold" color="white">Payment Verified</Text>
                                    <Text fontSize="xs" color="gray.400" mt={0.5}>Payment for Order #1023 was verified.</Text>
                                    <Text fontSize="xs" color="gray.500" mt={1}>1 hour ago</Text>
                                </Box>
                            </Flex>
                        </Flex>
                    </Box>
                </>
            )}

            {/* Mobile Bottom Nav Bar */}
            <Flex 
                display={{ base: "flex", lg: "none" }} 
                position="fixed" bottom={0} left={0} right={0} w="full"
                bg="#121212" h="70px" borderTop="1px solid" borderColor="whiteAlpha.100"
                justify="space-evenly" align="center" zIndex={100}
                shadow="0px -4px 20px rgba(0, 0, 0, 0.4)" 
                px={1} pb={2} boxSizing="border-box" overflowX="hidden" 
            >
                {MOBILE_NAV_ITEMS.map((item) => {
                    
                   
                    const isBell = item.path === "#notifications";
                    
                    // A tab is active if its path matches the URL, OR if it is the Bell and the panel is open
                    const isActive = isBell ? isNotifOpen : (pathname === item.path || (item.path !== '/store' && pathname?.startsWith(item.path)));

                    const content = (
                        <Flex 
                            direction="column" justify="center" align="center" 
                            color={isActive ? brandColor : "gray.500"} 
                            position="relative" py={2} w="full" transition="all 0.2s"
                        >
                            {isActive && (
                                <Box position="absolute" top="-8px" w="24px" h="3px" bg={brandColor} borderBottomRadius="md" />
                            )}

                            <Box position="relative">
                                <Icon as={item.icon} boxSize="22px" mb={1} />
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
                            <Text fontSize="10px" fontWeight={isActive ? "bold" : "medium"}>{item.label}</Text>
                        </Flex>
                    );

                    // 🚀 If it's the Bell, render it as a clickable Box instead of a Link
                    if (isBell) {
                        return (
                            <Box key={item.label} flex={1} display="flex" justifyContent="center" cursor="pointer" onClick={() => setIsNotifOpen(!isNotifOpen)}>
                                {content}
                            </Box>
                        );
                    }

                    // Otherwise, render the standard Next.js Link
                    return (
                        <Link href={item.path} key={item.label} style={{ textDecoration: "none", flex: 1, display: "flex", justifyContent: "center" }} onClick={() => setIsNotifOpen(false)}>
                            {content}
                        </Link>
                    );
                })}
            </Flex>
        </>
    );
};
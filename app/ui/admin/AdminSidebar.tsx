"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
    Box, Flex, Text, Icon, IconButton, VStack, Avatar, Badge 
} from "@chakra-ui/react";
import { 
    LuLayoutDashboard, LuStore, LuUsers, LuActivity, LuWallet, 
    LuGlobe, LuSettings, LuMenu, LuX 
} from "react-icons/lu";

// 🔥 UPGRADED FOR MULTI-TENANT SUPER ADMIN 🔥
const SUPER_ADMIN_NAV_ITEMS = [
    { label: "Platform Overview", icon: LuLayoutDashboard, path: "/admin" },
    { label: "Shops & Tenants", icon: LuStore, path: "/admin/shops", badge: 3 }, // Pending shop approvals
    { label: "Global Users", icon: LuUsers, path: "/admin/users" },
    { label: "Global Transactions", icon: LuActivity, path: "/admin/transactions" },
    { label: "Platform Finance", icon: LuWallet, path: "/admin/finance" },
    { label: "Marketing & SEO", icon: LuGlobe, path: "/admin/marketing" },
    { label: "System Settings", icon: LuSettings, path: "/admin/settings" },
];

interface AdminSidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (val: boolean) => void;
    setIsMobileOpen: (val: boolean) => void;
}

export const AdminSidebar = ({ isCollapsed, setIsCollapsed, setIsMobileOpen }: AdminSidebarProps) => {
    const brandColor = "#5cac7d";
    const pathname = usePathname() || "";

    return (
        <Flex direction="column" h="full" w="full">
            <Flex align="center" justify={isCollapsed ? "center" : "space-between"} mb={10} px={isCollapsed ? 0 : 2} h="32px">
                {!isCollapsed && (
                    <Flex align="center" gap={3} overflow="hidden">
                        <Box boxSize="32px" bg={brandColor} rounded="lg" flexShrink={0} />
                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight" whiteSpace="nowrap">
                            TRADAZ <Text as="span" color={brandColor}>HQ</Text>
                        </Text>
                    </Flex>
                )}
                <IconButton 
                    aria-label="Toggle Sidebar" variant="ghost" color="gray.400" size="sm" 
                    display={{ base: "none", lg: "flex" }} onClick={() => setIsCollapsed(!isCollapsed)}
                    _hover={{ bg: "whiteAlpha.100", color: "white" }}
                >
                    <Icon as={isCollapsed ? LuMenu : LuX} boxSize="20px" />
                </IconButton>
                <IconButton 
                    aria-label="Close Sidebar" variant="ghost" color="gray.400" size="sm" 
                    display={{ base: "flex", lg: "none" }} onClick={() => setIsMobileOpen(false)}
                >
                    <Icon as={LuX} boxSize="20px" />
                </IconButton>
            </Flex>

            <VStack align="stretch" gap={1} flex={1}>
                {SUPER_ADMIN_NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(`${item.path}/`));
                    return (
                        <Link href={item.path} key={item.label} style={{ textDecoration: "none" }} onClick={() => setIsMobileOpen(false)} title={isCollapsed ? item.label : ""}>
                            <Flex 
                                align="center" justify={isCollapsed ? "center" : "space-between"} 
                                px={isCollapsed ? 0 : 3} py={3} rounded="lg" transition="all 0.2s"
                                bg={isActive ? "rgba(92, 172, 125, 0.1)" : "transparent"}
                                color={isActive ? brandColor : "gray.400"}
                                border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.2)" : "transparent"}
                                _hover={{ bg: isActive ? "rgba(92, 172, 125, 0.15)" : "whiteAlpha.50", color: isActive ? brandColor : "white" }}
                            >
                                <Flex align="center" gap={3}>
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

            <Box mt="auto" pt={6} borderTop="1px solid" borderColor="whiteAlpha.100">
                <Flex align="center" justify={isCollapsed ? "center" : "flex-start"} gap={3}>
                    <Avatar.Root size="sm">
                        <Avatar.Fallback name="Super Admin" bg="purple.600" color="white" />
                    </Avatar.Root>
                    {!isCollapsed && (
                        <Box overflow="hidden">
                            <Text fontSize="sm" fontWeight="bold" color="white" whiteSpace="nowrap">Super Admin</Text>
                            <Text fontSize="10px" color="gray.500" textTransform="uppercase" letterSpacing="widest" whiteSpace="nowrap">Platform Owner</Text>
                        </Box>
                    )}
                </Flex>
            </Box>
        </Flex>
    );
};
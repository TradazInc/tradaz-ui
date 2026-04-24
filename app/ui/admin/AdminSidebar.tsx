"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
    Box, Flex, Text, Icon, IconButton, VStack, Avatar, 
} from "@chakra-ui/react";
import { 
    LuLayoutDashboard, LuStore, LuUsers, LuActivity, 
    LuSettings, LuMenu, LuX, LuCreditCard,
    LuChevronDown, LuChevronRight, LuBriefcase, LuBuilding2,
    LuWallet, LuGlobe, LuLogOut 
} from "react-icons/lu";


const SUPER_ADMIN_NAV_ITEMS = [
    { label: "Platform Overview", icon: LuLayoutDashboard, path: "/overwatch" },
    { 
        label: "Our Tradaz", 
        icon: LuStore, 
        children: [
            { label: "All Businesses", icon: LuBriefcase, path: "/overwatch/businesses" },
            { label: "Live Shops", icon: LuBuilding2, path: "/overwatch/shops" },
        ]
    }, 
    { label: "Transactions", icon: LuActivity, path: "/overwatch/transactions" },
    { label: "Subscriptions", icon: LuCreditCard, path: "/overwatch/subscriptions" }, 
    { label: "Payouts & Finance", icon: LuWallet, path: "/overwatch/finance" }, 
    { label: "Marketing & SEO", icon: LuGlobe, path: "/overwatch/marketing" }, 
    { label: "Admin Staff", icon: LuUsers, path: "/overwatch/users" },
    { label: "System Settings", icon: LuSettings, path: "/overwatch/settings" },
];

interface AdminSidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (val: boolean) => void;
    setIsMobileOpen: (val: boolean) => void;
}

export const AdminSidebar = ({ isCollapsed, setIsCollapsed, setIsMobileOpen }: AdminSidebarProps) => {
    const brandColor = "#5cac7d";
    const pathname = usePathname() || "";

    // State to track which accordions are open
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({ "Our Tradaz": true });

    const handleToggleMenu = (label: string) => {
        if (isCollapsed) setIsCollapsed(false); // Auto-expand sidebar if it was minimized
        setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
    };

    return (
        <Flex direction="column" h="full" w="full">
            {/* --- HEADER LOGO --- */}
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

            {/* --- MAIN NAVIGATION --- */}
            <VStack align="stretch" gap={1} flex={1} overflowY="auto" css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                {SUPER_ADMIN_NAV_ITEMS.map((item) => {
                    const isParentActive = pathname.startsWith(item.path || "some-unmatchable-string") || 
                                           item.children?.some(child => pathname.startsWith(child.path));
                    
                    // --- RENDER ACCORDION IF ITEM HAS CHILDREN ---
                    if (item.children) {
                        const isOpen = openMenus[item.label];
                        return (
                            <Box key={item.label}>
                                <Flex 
                                    align="center" justify={isCollapsed ? "center" : "space-between"} 
                                    px={isCollapsed ? 0 : 3} py={3} rounded="lg" transition="all 0.2s"
                                    bg={isParentActive && !isOpen ? "rgba(92, 172, 125, 0.05)" : "transparent"}
                                    color={isParentActive ? brandColor : "gray.400"}
                                    cursor="pointer"
                                    _hover={{ bg: "whiteAlpha.50", color: brandColor }}
                                    onClick={() => handleToggleMenu(item.label)}
                                    title={isCollapsed ? item.label : ""}
                                >
                                    <Flex align="center" gap={3}>
                                        <Icon as={item.icon} fontSize="lg" />
                                        {!isCollapsed && <Text fontSize="sm" fontWeight={isParentActive ? "bold" : "medium"} whiteSpace="nowrap">{item.label}</Text>}
                                    </Flex>
                                    
                                    {!isCollapsed && (
                                        <Flex align="center" gap={2}>
                                            <Icon as={isOpen ? LuChevronDown : LuChevronRight} boxSize="16px" />
                                        </Flex>
                                    )}
                                </Flex>

                                {/* Child Links Dropdown */}
                                {!isCollapsed && isOpen && (
                                    <VStack align="stretch" pl={9} pr={3} mt={1} gap={1} animation="fade-in 0.2s ease">
                                        {item.children.map(child => {
                                            const isChildActive = pathname === child.path || pathname.startsWith(`${child.path}/`);
                                            return (
                                                <Link href={child.path} key={child.label} style={{ textDecoration: "none" }} onClick={() => setIsMobileOpen(false)}>
                                                    <Flex 
                                                        align="center" py={2.5} px={3} rounded="lg" transition="all 0.2s"
                                                        bg={isChildActive ? "rgba(92, 172, 125, 0.1)" : "transparent"}
                                                        color={isChildActive ? brandColor : "gray.500"}
                                                        borderLeft="2px solid" borderColor={isChildActive ? brandColor : "transparent"}
                                                        _hover={{ color: "white", bg: "whiteAlpha.50" }}
                                                    >
                                                        <Flex align="center" gap={2.5}>
                                                            <Icon as={child.icon} fontSize="md" />
                                                            <Text fontSize="sm" fontWeight={isChildActive ? "bold" : "medium"}>{child.label}</Text>
                                                        </Flex>
                                                    </Flex>
                                                </Link>
                                            );
                                        })}
                                    </VStack>
                                )}
                            </Box>
                        );
                    }

                    // ---  LINK FOR ITEMS ---
                    
                    const isActive = pathname === item.path || (item.path !== '/overwatch' && pathname.startsWith(`${item.path}/`));
                    return (
                        <Link href={item.path} key={item.label} style={{ textDecoration: "none" }} onClick={() => setIsMobileOpen(false)} title={isCollapsed ? item.label : ""}>
                            <Flex 
                                align="center" justify={isCollapsed ? "center" : "space-between"} 
                                px={isCollapsed ? 0 : 3} py={3} rounded="lg" transition="all 0.2s"
                                bg={isActive ? "rgba(92, 172, 125, 0.1)" : "transparent"}
                                color={isActive ? brandColor : "gray.400"}
                                border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.2)" : "transparent"}
                                _hover={{ bg: isActive ? "rgba(92, 172, 125, 0.15)" : "whiteAlpha.50", color: isActive ? brandColor : "white" }}
                                position="relative"
                            >
                                <Flex align="center" gap={3}>
                                    <Icon as={item.icon} fontSize="lg" />
                                    {!isCollapsed && <Text fontSize="sm" fontWeight={isActive ? "bold" : "medium"} whiteSpace="nowrap">{item.label}</Text>}
                                </Flex>
                            </Flex>
                        </Link>
                    );
                })}
            </VStack>

            {/* --- BOTTOM PROFILE & LOGOUT --- */}
            <Box mt="auto" pt={6} borderTop="1px solid" borderColor="whiteAlpha.100" flexShrink={0}>
                <Flex align="center" justify={isCollapsed ? "center" : "space-between"} gap={3}>
                    <Flex align="center" gap={3}>
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
                    
                    {/*Logout Button for Admins */}
                    {!isCollapsed && (
                        <IconButton 
                            aria-label="Logout" variant="ghost" color="red.400" size="sm"
                            _hover={{ bg: "red.400", color: "white" }} transition="all 0.2s"
                        >
                            <Icon as={LuLogOut} boxSize="18px" />
                        </IconButton>
                    )}
                </Flex>
            </Box>
        </Flex>
    );
};
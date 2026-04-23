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

// 🚀 Updated paths from /admin to /overwatch
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
    // 🚀 Switched to monochrome highlight
    const brandColor = "white"; 
    const pathname = usePathname() || "";

    // State to track which accordions are open
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({ "Our Tradaz": true });

    const handleToggleMenu = (label: string) => {
        if (isCollapsed) setIsCollapsed(false); 
        setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
    };

    return (
        <Flex direction="column" h="full" w="full">
            {/* --- HEADER LOGO --- */}
            <Flex align="center" justify={isCollapsed ? "center" : "space-between"} mb={10} px={isCollapsed ? 0 : 2} h="32px">
                {!isCollapsed && (
                    <Flex align="center" gap={3} overflow="hidden">
                        <Box boxSize="32px" bg="white" rounded="none" flexShrink={0} />
                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight" whiteSpace="nowrap">
                            TRADAZ <Text as="span" color="#888888">HQ</Text>
                        </Text>
                    </Flex>
                )}
                <IconButton 
                    aria-label="Toggle Sidebar" variant="ghost" color="#888888" size="sm" rounded="none"
                    display={{ base: "none", lg: "flex" }} onClick={() => setIsCollapsed(!isCollapsed)}
                    _hover={{ bg: "#111111", color: "white" }}
                >
                    <Icon as={isCollapsed ? LuMenu : LuX} boxSize="20px" strokeWidth="2.5" />
                </IconButton>
                <IconButton 
                    aria-label="Close Sidebar" variant="ghost" color="#888888" size="sm" rounded="none"
                    display={{ base: "flex", lg: "none" }} onClick={() => setIsMobileOpen(false)}
                    _hover={{ bg: "#111111", color: "white" }}
                >
                    <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
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
                                    px={isCollapsed ? 0 : 3} py={3} rounded="none" transition="all 0.2s"
                                    bg={isParentActive && !isOpen ? "#111111" : "transparent"}
                                    color={isParentActive ? brandColor : "#888888"}
                                    cursor="pointer"
                                    _hover={{ bg: "#111111", color: brandColor }}
                                    onClick={() => handleToggleMenu(item.label)}
                                    title={isCollapsed ? item.label : ""}
                                >
                                    <Flex align="center" gap={3}>
                                        <Icon as={item.icon} fontSize="lg" strokeWidth={isParentActive ? "2.5" : "2"} />
                                        {!isCollapsed && <Text fontSize="sm" fontWeight={isParentActive ? "bold" : "medium"} whiteSpace="nowrap">{item.label}</Text>}
                                    </Flex>
                                    
                                    {!isCollapsed && (
                                        <Flex align="center" gap={2}>
                                            <Icon as={isOpen ? LuChevronDown : LuChevronRight} boxSize="16px" strokeWidth="2.5" />
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
                                                        align="center" py={2.5} px={3} rounded="none" transition="all 0.2s"
                                                        bg={isChildActive ? "#111111" : "transparent"}
                                                        color={isChildActive ? brandColor : "#888888"}
                                                        borderLeft="2px solid" borderColor={isChildActive ? brandColor : "transparent"}
                                                        _hover={{ color: "white", bg: "#1A1A1A" }}
                                                    >
                                                        <Flex align="center" gap={2.5}>
                                                            <Icon as={child.icon} fontSize="md" strokeWidth={isChildActive ? "2.5" : "2"} />
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
                                px={isCollapsed ? 0 : 3} py={3} rounded="none" transition="all 0.2s"
                                bg={isActive ? "#111111" : "transparent"}
                                color={isActive ? brandColor : "#888888"}
                                border="1px solid" borderColor={isActive ? "#333333" : "transparent"}
                                _hover={{ bg: isActive ? "#111111" : "#1A1A1A", color: "white" }}
                                position="relative"
                            >
                                <Flex align="center" gap={3}>
                                    <Icon as={item.icon} fontSize="lg" strokeWidth={isActive ? "2.5" : "2"} />
                                    {!isCollapsed && <Text fontSize="sm" fontWeight={isActive ? "bold" : "medium"} whiteSpace="nowrap">{item.label}</Text>}
                                </Flex>
                            </Flex>
                        </Link>
                    );
                })}
            </VStack>

            {/* --- BOTTOM PROFILE & LOGOUT --- */}
            <Box mt="auto" pt={6} borderTop="1px solid" borderColor="#1A1A1A" flexShrink={0}>
                <Flex align="center" justify={isCollapsed ? "center" : "space-between"} gap={3}>
                    <Flex align="center" gap={3}>
                        <Avatar.Root size="sm" rounded="none" border="1px solid #333333">
                            <Avatar.Fallback name="Super Admin" bg="#111111" color="white" />
                        </Avatar.Root>
                        {!isCollapsed && (
                            <Box overflow="hidden">
                                <Text fontSize="sm" fontWeight="bold" color="white" whiteSpace="nowrap" letterSpacing="tight">Super Admin</Text>
                                <Text fontSize="10px" color="#888888" textTransform="uppercase" letterSpacing="widest" whiteSpace="nowrap">Platform Owner</Text>
                            </Box>
                        )}
                    </Flex>
                    
                    {/* Logout Button for Admins */}
                    {!isCollapsed && (
                        <IconButton 
                            aria-label="Logout" variant="ghost" color="red.500" size="sm" rounded="none"
                            _hover={{ bg: "rgba(229, 62, 62, 0.1)", color: "red.500" }} transition="all 0.2s"
                        >
                            <Icon as={LuLogOut} boxSize="18px" strokeWidth="2.5" />
                        </IconButton>
                    )}
                </Flex>
            </Box>
        </Flex>
    );
};
"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
    Box, Flex, Text, Icon, IconButton, VStack, Avatar, ScrollArea
} from "@chakra-ui/react";
import { 
    LuLayoutDashboard, LuStore, LuBriefcase, LuCheck, LuTrendingUp,
    LuUsers, LuUser, LuMessageSquare, LuWallet, LuCreditCard, LuLandmark, 
    LuRefreshCw, LuShield, LuScale, LuUndo, LuFileText,  
    LuSettings, LuMenu, LuX, LuZap, LuServer, LuShieldCheck,
    LuChevronDown, LuChevronRight, LuLogOut
} from "react-icons/lu";

// --- THE NEW CONTROL PLANE TAXONOMY ---
const SUPER_ADMIN_NAV_ITEMS = [
    { 
        label: "Overview", 
        icon: LuLayoutDashboard, 
        path: "/overwatch" 
    },
    { 
        label: "Businesses", 
        icon: LuStore, 
        children: [
            { label: "All Businesses", icon: LuBriefcase, path: "/overwatch/businesses" },
            { label: "All Shops", icon: LuStore, path: "/overwatch/shops" },
            { label: "Pending Approvals", icon: LuCheck, path: "/overwatch/approvals" },
            { label: "Shop Performance", icon: LuTrendingUp, path: "/overwatch/performance" },
        ]
    }, 
    { 
        label: "Users", 
        icon: LuUsers, 
        children: [
            { label: "All Users", icon: LuUser, path: "/overwatch/users" },
            { label: "Reviews & Feedback", icon: LuMessageSquare, path: "/overwatch/reviews" },
        ]
    },
    { 
        label: "Finances", 
        icon: LuWallet, 
        children: [
            { label: "Transactions", icon: LuCreditCard, path: "/overwatch/finance" },
            { label: "Payouts", icon: LuLandmark, path: "/overwatch/payouts" },
            { label: "Subscriptions", icon: LuRefreshCw, path: "/overwatch/subscriptions" },
        ]
    }, 
    { 
        label: "Disputes & Security", 
        icon: LuShield, 
        children: [
            { label: "Active Disputes", icon: LuScale, path: "/overwatch/disputes" },
            { label: "Refunds", icon: LuUndo, path: "/overwatch/refunds" },
            { label: "Flagged Accounts", icon: LuFileText, path: "/overwatch/flagged" },
        ]
    }, 
    {
        label: "System Ops",
        icon: LuServer,
        children: [
            { label: "Automation Engine", icon: LuZap, path: "/overwatch/automation" },
            { label: "API & Health", icon: LuServer, path: "/overwatch/health" },
            { label: "Staff Roles (RBAC)", icon: LuShieldCheck, path: "/overwatch/staff" }
        ]
    },
    { 
        label: "Settings", 
        icon: LuSettings, 
        children: [
            { label: "General Settings", icon: LuSettings, path: "/overwatch/settings" },
            { label: "Staff Accounts", icon: LuUsers, path: "/overwatch/staff" },
            { label: "Activity Logs", icon: LuFileText, path: "/overwatch/logs" },
        ]
    },
];

interface AdminSidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (val: boolean) => void;
    setIsMobileOpen: (val: boolean) => void;
    isMobileOpen?: boolean;
}

export const AdminSidebar = ({ isCollapsed, setIsCollapsed, setIsMobileOpen, isMobileOpen }: AdminSidebarProps) => {
    const brandColor = "#f1f1f1";
    const pathname = usePathname() || "";

    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

    const handleToggleMenu = (label: string) => {
        if (isCollapsed) setIsCollapsed(false);
        setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
    };

    return (
        <>
            {/* --- MOBILE BACKDROP OVERLAY --- */}
            <Box 
                display={{ base: "block", lg: "none" }}
                position="fixed"
                inset={0}
                bg="rgba(0, 0, 0, 0.7)"
                zIndex={999998}
                opacity={isMobileOpen ? 1 : 0}
                pointerEvents={isMobileOpen ? "auto" : "none"}
                transition="opacity 0.3s ease"
                onClick={() => setIsMobileOpen(false)}
            />

            {/* --- MAIN SIDEBAR WRAPPER --- */}
            <Box
                w={{ base: "280px", lg: isCollapsed ? "80px" : "280px" }} 
                minW={{ base: "280px", lg: isCollapsed ? "80px" : "280px" }} 
                maxW={{ base: "280px", lg: isCollapsed ? "80px" : "280px" }} 
                h={{ base: "100dvh", lg: "100vh" }} 
                bg="#000000" 
                borderRight="1px solid #1A1A1A" 
                position={{ base: "fixed", lg: "static" }} 
                top={0} left={0}
                transform={{ base: isMobileOpen ? "translateX(0)" : "translateX(-100%)", lg: "translateX(0)" }}
                zIndex={999999} 
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                flexShrink={0}
            >
                <Flex direction="column" h="full" w="full" bg="#000000" pt={5} pb={6} px={4}>
                    
                    {/* --- HEADER LOGO --- */}
                    <Flex align="center" justify={isCollapsed ? "center" : "space-between"} mb={10} px={isCollapsed ? 0 : 2} h="32px" flexShrink={0}>
                        {!isCollapsed && (
                            <Flex align="center" gap={3} overflow="hidden">
                                <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight" whiteSpace="nowrap">
                                    OVERWATCH<Text as="span" color="#888888"> .</Text>
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
                    <ScrollArea.Root flex={1} display="flex" flexDirection="column" overflow="hidden">
                        <ScrollArea.Viewport flex={1} pr={3}>
                            <VStack align="stretch" gap={1} pb={4}>
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
                                                    color={isParentActive ? "white" : "#888888"}
                                                    border="1px solid" borderColor={isParentActive && !isOpen ? "#333333" : "transparent"}
                                                    cursor="pointer"
                                                    _hover={{ bg: "#1A1A1A", color: "white" }}
                                                    onClick={() => handleToggleMenu(item.label)}
                                                    title={isCollapsed ? item.label : ""}
                                                >
                                                    <Flex align="center" gap={3}>
                                                        <Icon as={item.icon} fontSize="lg" color={isParentActive ? brandColor : "inherit"} strokeWidth="2.5" />
                                                        {!isCollapsed && <Text fontSize="sm" fontWeight={isParentActive ? "bold" : "medium"} whiteSpace="nowrap" letterSpacing="tight">{item.label}</Text>}
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
                                                                        color={isChildActive ? "white" : "#888888"}
                                                                        border="1px solid" borderColor={isChildActive ? "#333333" : "transparent"}
                                                                        _hover={{ color: "white", bg: "#1A1A1A" }}
                                                                    >
                                                                        <Flex align="center" gap={2.5}>
                                                                            <Icon as={child.icon} fontSize="md" color={isChildActive ? brandColor : "inherit"} strokeWidth="2.5" />
                                                                            <Text fontSize="sm" fontWeight={isChildActive ? "bold" : "medium"} letterSpacing="tight">{child.label}</Text>
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

                                    // --- LINK FOR NORMAL ITEMS ---
                                    const isActive = pathname === item.path || (item.path !== '/overwatch' && pathname.startsWith(`${item.path}/`));
                                    return (
                                        <Link href={item.path} key={item.label} style={{ textDecoration: "none" }} onClick={() => setIsMobileOpen(false)} title={isCollapsed ? item.label : ""}>
                                            <Flex 
                                                align="center" justify={isCollapsed ? "center" : "space-between"} 
                                                px={isCollapsed ? 0 : 3} py={3} rounded="none" transition="all 0.2s"
                                                bg={isActive ? "#111111" : "transparent"}
                                                color={isActive ? "white" : "#888888"}
                                                border="1px solid" borderColor={isActive ? "#333333" : "transparent"}
                                                _hover={{ bg: "#1A1A1A", color: "white" }}
                                                position="relative"
                                            >
                                                <Flex align="center" gap={3}>
                                                    <Icon as={item.icon} fontSize="lg" color={isActive ? brandColor : "inherit"} strokeWidth="2.5" />
                                                    {!isCollapsed && <Text fontSize="sm" fontWeight={isActive ? "bold" : "medium"} whiteSpace="nowrap" letterSpacing="tight">{item.label}</Text>}
                                                </Flex>
                                            </Flex>
                                        </Link>
                                    );
                                })}
                            </VStack>
                        </ScrollArea.Viewport>

                        <ScrollArea.Scrollbar bg="#000000" w="6px" p={0}>
                            <ScrollArea.Thumb bg="#1A1A1A" rounded="full" _hover={{ bg: "#333333" }} />
                        </ScrollArea.Scrollbar>
                    </ScrollArea.Root>

                    {/* --- BOTTOM PROFILE & LOGOUT --- */}
                    <Box mt="auto" pt={4} pb={6} mb={2} borderTop="1px solid" borderColor="#1A1A1A" flexShrink={0}>
                        <Flex align="center" justify={isCollapsed ? "center" : "space-between"} gap={3}>
                            <Flex align="center" gap={3}>
                                <Avatar.Root size="sm" rounded="full">
                                    <Avatar.Fallback name="Command Center" bg="#111111" color="white" border="1px solid #333333" rounded="none" />
                                </Avatar.Root>
                                {!isCollapsed && (
                                    <Box overflow="hidden">
                                        <Text fontSize="sm" fontWeight="bold" color="white" whiteSpace="nowrap" letterSpacing="tight">System Ops</Text>
                                        
                                    </Box>
                                )}
                            </Flex>
                            
                            {!isCollapsed && (
                                <IconButton 
                                    aria-label="Logout" variant="ghost" rounded="none" size="sm"
                                    _hover={{ bg: "#111111" }} transition="all 0.2s"
                                >
                                    <Icon as={LuLogOut} color="red.400" boxSize="18px" strokeWidth="2.5" />
                                </IconButton>
                            )}
                        </Flex>
                    </Box>

                </Flex>
            </Box>
        </>
    );
};
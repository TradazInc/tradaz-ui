"use client";
import React, { useState } from "react";
import { Box, VStack, Text, Accordion, Icon, Flex, IconButton, Button } from "@chakra-ui/react";
import Link from "next/link";
import { 
    // Main Icons
    LuLayoutDashboard, LuShoppingBag, LuUsers, LuSettings, LuLogOut, 
    LuStore, LuX, LuPlus, LuScale, LuLandmark, LuTicketPercent,
    LuZap, LuUserPlus, LuGift, LuScanLine, LuChevronDown,
    // Sub-nav Icons
    LuActivity, LuFileText, LuShoppingCart, LuTerminal,
    LuPackage, LuStar, LuWallet, LuTrendingDown, LuTrendingUp, LuCalculator,
    LuMessageSquare, LuRefreshCw, LuUndo, LuCheck, LuMegaphone,
    LuLayoutGrid, LuImage, LuHeart, LuTicket, LuTag, LuUser, LuTruck,
    LuPercent, LuShield, LuPalette
} from "react-icons/lu";
import TradazHeader from "../TradazHeader";
import { SidebarProps } from "@/app/lib/definitions";

// --- RESTRUCTURED NAV ITEMS WITH SPECIFIC SUB-ICONS ---
const OTHER_NAV_ITEMS = [
    { label: "Point of Sale", icon: LuScanLine, children: [{ label: "POS", icon: LuTerminal }] }, 
    { label: "Products", icon: LuShoppingBag, children: [{ label: "Add Product", icon: LuPlus }, { label: "Inventory", icon: LuPackage }] },
    { label: "Customers", icon: LuUsers, children: [{ label: "Customer List", icon: LuUsers }, { label: "Reviews", icon: LuStar }] },
    { label: "Finance", icon: LuLandmark, children: [{ label: "Sales Record", icon: LuFileText }, { label: "Staff Salary", icon: LuWallet }, { label: "Expenses", icon: LuTrendingDown }, { label: "Revenue", icon: LuTrendingUp }, { label: "Tax Calculation", icon: LuCalculator }] },
    { label: "Dispute Resolution", icon: LuScale, children: [{ label: "Customers Chats", icon: LuMessageSquare }, { label: "Products exchange", icon: LuRefreshCw }, { label: "Customers Refund", icon: LuUndo }, { label: "Sales Reconciliation", icon: LuCheck }] },
    { label: "Marketing & Promos", icon: LuTicketPercent, children: [{ label: "Promotions", icon: LuMegaphone }, { label: "Pop up", icon: LuLayoutGrid }, { label: "Promo Banners", icon: LuImage }] },
    { label: "Loyalty & Rewards", icon: LuGift, children: [{ label: "Loyalty", icon: LuHeart }, { label: "Vouchers", icon: LuTicket }, { label: "Set Coupon", icon: LuTag }] }, 
    { label: "Staff", icon: LuUserPlus, children: [{ label: "Staff List", icon: LuUser }] }, 
    { label: "Settings", icon: LuSettings, children: [{ label: "Logistics", icon: LuTruck }, { label: "VAT", icon: LuPercent }, { label: "Terms", icon: LuFileText }, { label: "Conditions & Policies", icon: LuShield }, { label: "UI config", icon: LuPalette }] },
];

const DASHBOARD_CHILDREN = [
    { label: "Overview", icon: LuActivity },
    { label: "Analytics", icon: LuTrendingUp }, 
    { label: "Sales record", icon: LuFileText },
    { label: "Online Orders", icon: LuShoppingCart }
];

export const Sidebar = ({ 
    isOpen, 
    onClose 
}: SidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [openMenus, setOpenMenus] = useState<string[]>([]);
    const isMenuExpanded = openMenus.length > 0; 

    // --- EDGE-TO-EDGE HOVER STYLING ---
    const triggerHoverStyle = { bg: "#111111", color: "white" };
    const subItemHoverStyle = { bg: "#111111", color: "white" };
    const iconStyle = { strokeWidth: "2.5", boxSize: "18px" }; 
    const subIconStyle = { strokeWidth: "2.5", boxSize: "14px", flexShrink: 0 };

    return (
        <Box
            w={{ base: "280px", lg: isCollapsed ? "80px" : "280px" }} 
            h="100vh" 
            bg="#000000" 
            borderRight="1px solid" 
            borderColor="#1A1A1A" 
            position={{ base: "fixed", lg: "sticky" }} top={0} left={0}
            transform={{ base: isOpen ? "translateX(0)" : "translateX(-100%)", lg: "translateX(0)" }}
            zIndex={1000} display="flex" flexDirection="column" 
            px={0} 
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            color="white"
        >
            {/* --- HEADER --- */}
            <Flex justify={isCollapsed ? "center" : "space-between"} align="center" px={isCollapsed ? 2 : 4} h="65px" borderBottom="1px solid #1A1A1A" overflow="hidden" flexShrink={0}>
                {!isCollapsed ? (
                    <Link href='/'>
                        <TradazHeader/>
                    </Link>
                ) : (
                    <Icon as={LuStore} color="white" css={{ strokeWidth: "2.5", boxSize: "22px" }} /> 
                )}
                <IconButton aria-label="Close" variant="ghost" display={{ base: "flex", lg: "none" }} onClick={onClose} color="#888888" size="sm" _hover={{ color: "white", bg: "#1A1A1A" }}>
                    <Icon as={LuX} />
                </IconButton>
            </Flex>

            {/* --- SCROLLABLE MENU SECTION --- */}
            <Box 
                flex={1} overflowY="auto" overflowX="hidden" pt={2}
                css={{ 
                    '&::-webkit-scrollbar': { width: '4px' }, 
                    '&::-webkit-scrollbar-track': { background: 'transparent' },
                    '&::-webkit-scrollbar-thumb': { background: '#27272A', borderRadius: '4px' },
                    '&::-webkit-scrollbar-thumb:hover': { background: '#3F3F46' },
                    '& [data-part="indicator"]': { display: isCollapsed ? 'none' : 'block' } 
                }} 
                pb={2} 
            >
                <Accordion.Root 
                    collapsible 
                    variant="plain"
                    value={openMenus}
                    onValueChange={(e) => setOpenMenus(e.value)}
                >
                    {/* Dashboard */}
                    <Accordion.Item value="Dashboard" border="none" borderBottom="1px solid #1A1A1A" mb={0}>
                        <Accordion.ItemTrigger 
                            _hover={triggerHoverStyle} py={3} px={isCollapsed ? 0 : 4} rounded="none" cursor="pointer"
                            w="full" display="flex" justifyContent={isCollapsed ? "center" : "space-between"}
                            onClick={() => { if(isCollapsed) setIsCollapsed(false); }}
                            color={openMenus.includes("Dashboard") ? "white" : "#A1A1AA"}
                            transition="all 0.2s"
                        >
                            <Flex align="center" justify={isCollapsed ? "center" : "flex-start"} gap={3}>
                                <Icon as={LuLayoutDashboard} css={iconStyle} />
                                {!isCollapsed && <Text fontSize="14px" fontWeight="500" whiteSpace="nowrap">Dashboard</Text>}
                            </Flex>
                            {!isCollapsed && <Accordion.ItemIndicator><Icon as={LuChevronDown} color="#666666" css={{ strokeWidth: 2 }} /></Accordion.ItemIndicator>}
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent p={0} pb={1} display={isCollapsed ? "none" : "block"}>
                            <VStack align="start" gap={0}>
                                {DASHBOARD_CHILDREN.map((child, cIdx) => {
                                    const path = child.label === "Overview" ? "/business" : `/business/${child.label.toLowerCase().replace(/\s+/g, '-')}`;
                                    return (
                                        <Link key={cIdx} href={path} style={{ width: '100%', textDecoration: 'none' }} onClick={onClose}>
                                            <Flex align="center" gap={3} color="#888888" cursor="pointer" _hover={subItemHoverStyle} py={2.5} pl={isCollapsed ? 0 : 10} pr={4} rounded="none" w="full" transition="all 0.2s">
                                                <Icon as={child.icon} css={subIconStyle} />
                                                <Text fontSize="13px" whiteSpace="nowrap">{child.label}</Text>
                                            </Flex>
                                        </Link>
                                    );
                                })}
                            </VStack>
                        </Accordion.ItemContent>
                    </Accordion.Item>

                    {/* Dynamic Nav Items */}
                    {OTHER_NAV_ITEMS.map((item, idx) => {
                        const isActive = openMenus.includes(item.label);
                        return (
                        <Accordion.Item key={idx} value={item.label} border="none" borderBottom="1px solid #1A1A1A" mb={0}>
                            <Accordion.ItemTrigger 
                                _hover={triggerHoverStyle} py={3} px={isCollapsed ? 0 : 4} rounded="none" cursor="pointer"
                                w="full" display="flex" justifyContent={isCollapsed ? "center" : "space-between"}
                                onClick={() => { if(isCollapsed) setIsCollapsed(false); }}
                                color={isActive ? "white" : "#A1A1AA"}
                                transition="all 0.2s"
                            >
                                <Flex align="center" justify={isCollapsed ? "center" : "flex-start"} gap={3}>
                                    <Icon as={item.icon} css={iconStyle} />
                                    {!isCollapsed && <Text fontSize="14px" fontWeight="500" whiteSpace="nowrap">{item.label}</Text>}
                                </Flex>
                                {!isCollapsed && <Accordion.ItemIndicator><Icon as={LuChevronDown} color="#666666" css={{ strokeWidth: 2 }} /></Accordion.ItemIndicator>}
                            </Accordion.ItemTrigger>
                            <Accordion.ItemContent p={0} pb={1} display={isCollapsed ? "none" : "block"}>
                                <VStack align="start" gap={0}>
                                    {item.children.map((child, cIdx) => {
                                        const path = `/business/${child.label.toLowerCase().replace(/\s+/g, '-')}`;
                                        return (
                                            <Link key={cIdx} href={path} style={{ width: '100%', textDecoration: 'none' }} onClick={onClose}>
                                                <Flex align="center" gap={3} color="#888888" cursor="pointer" _hover={subItemHoverStyle} py={2.5} pl={isCollapsed ? 0 : 10} pr={4} rounded="none" w="full" transition="all 0.2s">
                                                    <Icon as={child.icon} css={subIconStyle} />
                                                    <Text fontSize="13px" whiteSpace="nowrap">{child.label}</Text>
                                                </Flex>
                                            </Link>
                                        );
                                    })}
                                </VStack>
                            </Accordion.ItemContent>
                        </Accordion.Item>
                    )})}
                </Accordion.Root>
            </Box>

            {/* --- SMART DYNAMIC BOTTOM SECTION --- */}
            <Box px={isCollapsed ? 2 : 4} pt={4} pb={4} mt="auto" flexShrink={0}>
                {!isCollapsed ? (
                    <Box position="relative">
                        {/* (Visible when NO menus are open) */}
                        <Box 
                            maxH={isMenuExpanded ? "0px" : "150px"} 
                            opacity={isMenuExpanded ? 0 : 1} 
                            overflow="hidden" 
                            transition="all 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
                            mb={isMenuExpanded ? 0 : 3}
                        >
                            <Box p={3} bg="#0A0A0A" border="1px solid #1A1A1A" rounded="none">
                                <Flex align="center" justify="space-between" mb={3}>
                                    <Text fontSize="13px" fontWeight="500" color="#A1A1AA" whiteSpace="nowrap">
                                        Storage: 45%
                                    </Text>
                                </Flex>
                                <Button h="32px" fontSize="13px" fontWeight="bold" w="full" bg="white" color="black" _hover={{ bg: "#E5E5E5" }} transition="all 0.2s" border="none" rounded="none">
                                    Upgrade Plan
                                </Button>
                            </Box>
                        </Box>

                        {/* (Visible when ANY menu is open) */}
                        <Box 
                            maxH={isMenuExpanded ? "50px" : "0px"} 
                            opacity={isMenuExpanded ? 1 : 0} 
                            overflow="hidden" 
                            transition="all 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
                            mb={isMenuExpanded ? 2 : 0}
                        >
                            <Flex align="center" justify="space-between" bg="#0A0A0A" p={2.5} rounded="none" border="1px solid #1A1A1A">
                                <Text fontSize="13px" color="#A1A1AA" whiteSpace="nowrap">45% Storage</Text>
                                <Flex align="center" gap={1} color="white" cursor="pointer" _hover={{ opacity: 0.8 }}>
                                    <Text fontSize="12px" fontWeight="500">Upgrade</Text>
                                    <Icon as={LuZap} css={subIconStyle} />
                                </Flex>
                            </Flex>
                        </Box>

                        {/* LOGOUT BUTTON */}
                        <Flex align="center" gap={3} px={3} py={2} cursor="pointer" rounded="none" color="red.500" _hover={{ bg: "rgba(229, 62, 62, 0.1)" }} transition="all 0.2s">
                    
                            <Icon as={LuLogOut} color="red.500" css={iconStyle} />
                            <Text fontSize="14px" fontWeight="600" whiteSpace="nowrap">Log Out</Text>
                        </Flex>
                    </Box>
                ) : (
                    /* COLLAPSED ICONS */
                    <VStack gap={4} py={2}>
                        <Flex justify="center" align="center" cursor="pointer" color="red.500" _hover={{ bg: "rgba(229, 62, 62, 0.1)" }} p={2} rounded="none">
                        
                            <Icon as={LuLogOut} color="red.500" css={iconStyle} />
                        </Flex>
                    </VStack>
                )}
            </Box>
        </Box>
    );
};
"use client";
import React, { useState } from "react";
import { Box, VStack, Text, Accordion, Icon, Flex, IconButton, Button } from "@chakra-ui/react";
import Link from "next/link";
import { 
    LuLayoutDashboard, LuShoppingBag, LuUsers, LuSettings, LuLogOut, 
    LuStore, LuX, LuPlus, LuScale, LuLandmark, LuTicketPercent,
    LuChevronLeft, LuChevronRight, LuZap, LuUserPlus, LuGift, LuScanLine 
} from "react-icons/lu";
import TradazHeader from "../TradazHeader";
import { SidebarProps, Store } from "@/app/lib/definitions";
import { AddStoreModal } from "../onboarding/AddStoreModal";

// OTHER_NAV_ITEMS array
const OTHER_NAV_ITEMS = [
    { label: "Point of Sale", icon: LuScanLine, children: ["POS"] }, 
    { label: "Products", icon: LuShoppingBag, children: ["Add Product", "Inventory"] },
    { label: "Customers", icon: LuUsers, children: ["Customer List", "Reviews"] },
    { label: "Finance", icon: LuLandmark, children: ["Sales Record", "Staff Salary", "Expenses", "Revenue", "Tax Calculation"] },
    { label: "Dispute Resolution", icon: LuScale, children: ["Customers Chats", "Products exchange", "Customers Refund", "Sales Reconciliation"] },
    { label: "Marketing & Promos", icon: LuTicketPercent, children: ["Promotions", "Set Coupon", "Pop up", "Vouchers", "Promo Banners"] },
    { label: "Loyalty & Rewards", icon: LuGift, children: ["Loyalty"] }, 
    { label: "Staff", icon: LuUserPlus, children: ["Staff List"] }, 
    { label: "Settings", icon: LuSettings, children: ["Logistics", "VAT", "Terms", "Conditions & Policies", "UI config"] },
];

export const Sidebar = ({ 
    isOpen, 
    onClose, 
    activeBusiness, 
    availableStores, 
    activeStoreId, 
    onStoreChange 
}: SidebarProps) => {
    const [isAddStoreOpen, setIsAddStoreOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    // --- THE SENIOR DEV MAGIC: Tracking open menus ---
    const [openMenus, setOpenMenus] = useState<string[]>([]);
    const isMenuExpanded = openMenus.length > 0; 

    return (
        <>
        <Box
            w={{ base: "280px", lg: isCollapsed ? "80px" : "280px" }} 
            h="100vh" bg="#121212" borderRight="1px solid" borderColor="whiteAlpha.100"
            position={{ base: "fixed", lg: "sticky" }} top={0} left={0}
            transform={{ base: isOpen ? "translateX(0)" : "translateX(-100%)", lg: "translateX(0)" }}
            zIndex={1000} display="flex" flexDirection="column" 
            py={4} px={isCollapsed ? 2 : 5} 
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        >
            {/* --- PREMIUM COLLAPSE TOGGLE --- */}
            <IconButton 
                aria-label="Toggle Sidebar"
                position="absolute" right="-15px" top="32px"
                boxSize="30px" rounded="full" bg="#121212" color="gray.400"
                border="1px solid" borderColor="whiteAlpha.200"
                boxShadow="0 4px 12px rgba(0, 0, 0, 0.6)" 
                display={{ base: "none", lg: "flex" }}
                onClick={() => setIsCollapsed(!isCollapsed)}
                _hover={{ bg: "#5cac7d", color: "white", borderColor: "#5cac7d", transform: "scale(1.15)" }}
                transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                zIndex={1001}
            >
                <Icon as={isCollapsed ? LuChevronRight : LuChevronLeft} boxSize="16px" ml={isCollapsed ? "2px" : "-2px"} />
            </IconButton>

            {/* --- HEADER --- */}
            <Flex justify={isCollapsed ? "center" : "space-between"} align="center" mb={4} h="32px" overflow="hidden" flexShrink={0}>
                {!isCollapsed ? (
                    <Link href='/'>
                        <TradazHeader/>
                    </Link>
                ) : (
                    <Icon as={LuStore} color="#5cac7d" boxSize="24px" /> 
                )}
                <IconButton aria-label="Close" variant="ghost" display={{ base: "flex", lg: "none" }} onClick={onClose} color="gray.400" size="sm">
                    <Icon as={LuX} />
                </IconButton>
            </Flex>

            {/* --- SCROLLABLE MENU SECTION --- */}
            <Box 
                flex={1} overflowY="auto" overflowX="hidden"
                css={{ 
                    '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none',
                    '& [data-part="indicator"]': { display: isCollapsed ? 'none' : 'block' } 
                }} 
                pb={2}
            >
                <Box h="18px" mb={2} overflow="hidden" whiteSpace="nowrap">
                    {!isCollapsed && (
                        <Text fontSize="10px" fontWeight="bold" color="gray.500" px={3} opacity={isCollapsed ? 0 : 1} transition="opacity 0.2s">
                            MANAGING: {activeBusiness?.name}
                        </Text>
                    )}
                </Box>
                
                <Accordion.Root 
                    collapsible 
                    variant="plain"
                    value={openMenus}
                    onValueChange={(e) => setOpenMenus(e.value)}
                >
                    
                    {/* Dashboard */}
                    <Accordion.Item value="Dashboard" border="none" mb={0}>
                        <Accordion.ItemTrigger 
                            _hover={{ bg: "whiteAlpha.100" }} py={1.5} px={isCollapsed ? 0 : 3} rounded="md" cursor="pointer"
                            justifyContent={isCollapsed ? "center" : "space-between"}
                            onClick={() => { if(isCollapsed) setIsCollapsed(false); }}
                        >
                            <Flex align="center" justify={isCollapsed ? "center" : "flex-start"} gap={3} w={isCollapsed ? "full" : "auto"}>
                                <Icon as={LuLayoutDashboard} fontSize="lg" color={isCollapsed ? "gray.400" : "white"} _hover={{ color: "#5cac7d" }} />
                                {!isCollapsed && <Text fontSize="sm" whiteSpace="nowrap">Dashboard</Text>}
                            </Flex>
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent pl={9} display={isCollapsed ? "none" : "block"}>
                            <VStack align="start" gap={0} pt={0} pb={1}>
                                
                                {["Overview", "Analytics", "Sales record", "Online Orders"].map((child, cIdx) => {
                                    const path = child === "Overview" ? "/dashboard" : `/dashboard/${child.toLowerCase().replace(/\s+/g, '-')}`;
                                    return (
                                        <Link key={cIdx} href={path} style={{ width: '100%', textDecoration: 'none' }} onClick={onClose}>
                                            <Text fontSize="sm" color="gray.500" cursor="pointer" _hover={{ color: "#5cac7d" }} py={1.5} display="block" w="full" whiteSpace="nowrap">
                                                {child}
                                            </Text>
                                        </Link>
                                    );
                                })}
                            </VStack>
                        </Accordion.ItemContent>
                    </Accordion.Item>

                    {/* Stores */}
                    <Accordion.Item value="Stores" border="none" mb={0}>
                        <Accordion.ItemTrigger 
                            _hover={{ bg: "whiteAlpha.100" }} py={1.5} px={isCollapsed ? 0 : 3} rounded="md" cursor="pointer"
                            justifyContent={isCollapsed ? "center" : "space-between"}
                            onClick={() => { if(isCollapsed) setIsCollapsed(false); }}
                        >
                            <Flex align="center" justify={isCollapsed ? "center" : "flex-start"} gap={3} w={isCollapsed ? "full" : "auto"}>
                                <Icon as={LuStore} color={availableStores?.length > 0 ? "#5cac7d" : "gray.400"} fontSize="lg" />
                                {!isCollapsed && <Text fontSize="sm" whiteSpace="nowrap">Stores ({availableStores?.length || 0})</Text>}
                            </Flex>
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent pl={9} display={isCollapsed ? "none" : "block"}>
                            <VStack align="start" gap={0} pt={0} pb={1}>
                                {availableStores?.map((s: Store) => (
                                    <Text 
                                        key={s.id} fontSize="sm" cursor="pointer" whiteSpace="nowrap" py={1.5}
                                        color={s.id === activeStoreId ? "#5cac7d" : "gray.500"} 
                                        fontWeight={s.id === activeStoreId ? "bold" : "normal"}
                                        _hover={{ color: "#5cac7d" }}
                                        onClick={() => { onStoreChange(s.id); onClose(); }}
                                    >
                                        {s.name}
                                    </Text>
                                ))}
                               <Flex onClick={() => setIsAddStoreOpen(true)} align="center" gap={2} py={1.5} color="orange.400" cursor="pointer" _hover={{ color: "orange.300" }} whiteSpace="nowrap">
                                    <Icon as={LuPlus} boxSize="14px" />
                                    <Text fontSize="xs" fontWeight="bold">Add New Store</Text>
                                </Flex>
                            </VStack>
                        </Accordion.ItemContent>
                    </Accordion.Item>

                    {/* Dynamic Nav Items */}
                    {OTHER_NAV_ITEMS.map((item, idx) => (
                        <Accordion.Item key={idx} value={item.label} border="none" mb={0}>
                            <Accordion.ItemTrigger 
                                _hover={{ bg: "whiteAlpha.100" }} py={1.5} px={isCollapsed ? 0 : 3} rounded="md" cursor="pointer"
                                justifyContent={isCollapsed ? "center" : "space-between"}
                                onClick={() => { if(isCollapsed) setIsCollapsed(false); }}
                            >
                                <Flex align="center" justify={isCollapsed ? "center" : "flex-start"} gap={3} w={isCollapsed ? "full" : "auto"}>
                                    <Icon as={item.icon} fontSize="lg" color={isCollapsed ? "gray.400" : "white"} _hover={{ color: "#5cac7d" }} />
                                    {!isCollapsed && <Text fontSize="sm" whiteSpace="nowrap">{item.label}</Text>}
                                </Flex>
                            </Accordion.ItemTrigger>
                            <Accordion.ItemContent pl={9} display={isCollapsed ? "none" : "block"}>
                                <VStack align="start" gap={0} pt={0} pb={1}>
                                    {item.children.map((child, cIdx) => {
                                        const path = `/dashboard/${child.toLowerCase().replace(/\s+/g, '-')}`;
                                        return (
                                            <Link key={cIdx} href={path} style={{ width: '100%', textDecoration: 'none' }} onClick={onClose}>
                                                <Text fontSize="sm" color="gray.500" cursor="pointer" _hover={{ color: "#5cac7d" }} py={1.5} display="block" w="full" whiteSpace="nowrap">
                                                    {child}
                                                </Text>
                                            </Link>
                                        );
                                    })}
                                </VStack>
                            </Accordion.ItemContent>
                        </Accordion.Item>
                    ))}
                </Accordion.Root>
            </Box>

            {/* --- SMART DYNAMIC BOTTOM SECTION --- */}
            <Box pt={2} borderTop="1px solid" borderColor="whiteAlpha.100" flexShrink={0}>
                {!isCollapsed ? (
                    <Box position="relative">
                        
                        {/*  (Visible when NO menus are open) */}
                        <Box 
                            maxH={isMenuExpanded ? "0px" : "150px"} 
                            opacity={isMenuExpanded ? 0 : 1} 
                            overflow="hidden" 
                            transition="all 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
                            mb={isMenuExpanded ? 0 : 2}
                        >
                            <Box p={3} bg="whiteAlpha.50" border="1px solid" borderColor="whiteAlpha.100" rounded="xl">
                                <Flex align="center" justify="space-between" mb={3}>
                                    <Flex align="center" gap={2}>  
                                        <Flex justify="center" align="center" w="32px" h="32px" rounded="full" border="2px solid" borderColor="#5cac7d" borderTopColor="whiteAlpha.300" transform="rotate(-45deg)" flexShrink={0}>
                                            <Text fontSize="10px" fontWeight="bold" color="#5cac7d" transform="rotate(45deg)">
                                                45%
                                            </Text>
                                        </Flex>
                                        <Text fontSize="xs" fontWeight="bold" color="white" whiteSpace="nowrap">
                                            Used capacity
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Button h="30px" fontSize="xs" w="full" bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} transition="all 0.2s" border="none">
                                    Upgrade plan
                                </Button>
                            </Box>
                        </Box>

                        {/*  (Visible when ANY menu is open) */}
                        <Box 
                            maxH={isMenuExpanded ? "50px" : "0px"} 
                            opacity={isMenuExpanded ? 1 : 0} 
                            overflow="hidden" 
                            transition="all 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
                            mb={isMenuExpanded ? 2 : 0}
                        >
                            <Flex align="center" justify="space-between" bg="whiteAlpha.50" p={2} rounded="lg" border="1px solid" borderColor="whiteAlpha.100">
                                <Flex align="center" gap={2}>
                                    <Flex justify="center" align="center" boxSize="18px" rounded="full" border="2px solid" borderColor="#5cac7d" borderTopColor="whiteAlpha.300" transform="rotate(-45deg)"></Flex>
                                    <Text fontSize="xs" color="gray.300" whiteSpace="nowrap">45% Storage</Text>
                                </Flex>
                                <Flex align="center" gap={1} color="#5cac7d" cursor="pointer" _hover={{ color: "#4a9c6d" }}>
                                    <Text fontSize="xs" fontWeight="bold">Upgrade</Text>
                                    <Icon as={LuZap} boxSize="12px" />
                                </Flex>
                            </Flex>
                        </Box>

                        {/* LOGOUT BUTTON */}
                        <Flex align="center" gap={2} px={2} py={1.5} cursor="pointer" rounded="md" color="red.400" _hover={{ bg: "whiteAlpha.50" }} transition="all 0.2s">
                            <Icon as={LuLogOut} fontSize="md" />
                            <Text fontSize="sm" fontWeight="medium" whiteSpace="nowrap">Log Out</Text>
                        </Flex>
                    </Box>
                ) : (
                    /* COLLAPSED ICONS */
                    <VStack gap={4} py={2}>
                        <Flex justify="center" align="center" cursor="pointer" onClick={() => setIsCollapsed(false)} title="45% Storage Used - Upgrade">
                            <Flex justify="center" align="center" boxSize="20px" rounded="full" border="2px solid" borderColor="#5cac7d" borderTopColor="whiteAlpha.300" transform="rotate(-45deg)" />
                        </Flex>
                        <Flex justify="center" align="center" cursor="pointer" color="red.400" _hover={{ bg: "whiteAlpha.50" }} p={1.5} rounded="md">
                            <Icon as={LuLogOut} fontSize="lg" />
                        </Flex>
                    </VStack>
                )}
            </Box>
        </Box>
        
        <AddStoreModal 
            isOpen={isAddStoreOpen} 
            onClose={() => setIsAddStoreOpen(false)} 
        />
        </>
    );
};
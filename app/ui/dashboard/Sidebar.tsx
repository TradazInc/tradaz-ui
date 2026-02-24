"use client";
import React, { useState } from "react";
import { Box, VStack, Text, Accordion, Icon, Flex, IconButton, Button } from "@chakra-ui/react";
import Link from "next/link";
import { 
    LuLayoutDashboard, LuShoppingBag, LuUsers, LuSettings, LuLogOut, 
    LuStore, LuX, LuPlus, LuCreditCard, LuPackage, LuScale, LuLandmark, LuTicketPercent 
} from "react-icons/lu";
import TradazHeader from "../TradazHeader";
import { SidebarProps, Store } from "@/app/lib/definitions";
import { AddStoreModal } from "../onboarding/AddStoreModal";

const OTHER_NAV_ITEMS = [
    { label: "Products", icon: LuShoppingBag, children: ["Inventory", "Categories", "Collections"] },
    { label: "Customers", icon: LuUsers, children: ["Customer List", "Segments", "Reviews"] },
    { label: "POS", icon: LuCreditCard, children: ["POS"] },
    { label: "Online Orders", icon: LuPackage, children: ["Online Orders"] },
    { label: "Finance", icon: LuLandmark, children: ["Sales Record", "Staff Salary", "Expenses", "Revenue", "Tax Calculation"] },
    { label: "Dispute Resolution", icon: LuScale, children: ["Customers Chats", "Products exchange", "Customers Refund", "Sales Reconciliation"] },
    { label: "Marketing & Promos", icon: LuTicketPercent, children: ["Promotions", "Set Coupon", "Pop up", "Vouchers", "Promo Banners"] },
    { label: "Settings", icon: LuSettings, children: ["Logistics", "Loyalty Point Rules", "VAT", "Terms", "Conditions & Policies"] },
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
    
    return (
        <>
        <Box
            w="280px" h="100vh" bg="#121212" borderRight="1px solid" borderColor="whiteAlpha.100"
            position={{ base: "fixed", lg: "sticky" }} top={0} left={0}
            transform={{ base: isOpen ? "translateX(0)" : "translateX(-100%)", lg: "translateX(0)" }}
            // ✅ Reduced vertical padding from 6 (24px) to 4 (16px) to save space
            zIndex={1000} display="flex" flexDirection="column" py={4} px={6} transition="transform 0.3s ease"
        >
            {/* HEADER (Fixed at top) */}
            {/* ✅ Reduced margin bottom from 8 to 5 */}
            <Flex justify="space-between" align="center" mb={5}>
                <Link href='/'>
                    <TradazHeader/>
                </Link>
                <IconButton aria-label="Close" variant="ghost" display={{ base: "flex", lg: "none" }} onClick={onClose} color="gray.400">
                    <Icon as={LuX} />
                </IconButton>
            </Flex>

            {/* SCROLLABLE MENU SECTION */}
            <VStack align="stretch" gap={1} flex={1} overflowY="auto" css={{ '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }} pb={2}>
                <Text fontSize="10px" fontWeight="bold" color="gray.500" px={3} mb={1}>
                    MANAGING: {activeBusiness?.name}
                </Text>
                
                <Accordion.Root collapsible defaultValue={["Dashboard"]} variant="plain">
                    <Accordion.Item value="Dashboard" border="none" mb={0}>
                        <Accordion.ItemTrigger _hover={{ bg: "whiteAlpha.100" }} py={2} px={3} rounded="lg" cursor="pointer">
                            <Flex align="center" gap={3}>
                                <Icon as={LuLayoutDashboard} fontSize="md" />
                                <Text fontSize="sm">Dashboard</Text>
                            </Flex>
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent pl={9}>
                            <VStack align="start" gap={2} pt={1} pb={2}>
                                {["Overview", "Analytics", "Sales record"].map((child, cIdx) => (
                                    <Text key={cIdx} fontSize="sm" color="gray.500" cursor="pointer" _hover={{ color: "#5cac7d" }} onClick={onClose}>
                                        {child}
                                    </Text>
                                ))}
                            </VStack>
                        </Accordion.ItemContent>
                    </Accordion.Item>

                    <Accordion.Item value="Stores" border="none" mb={0}>
                        <Accordion.ItemTrigger _hover={{ bg: "whiteAlpha.100" }} py={2} px={3} rounded="lg" cursor="pointer">
                            <Flex align="center" gap={3}>
                                <Icon as={LuStore} color={availableStores?.length > 0 ? "#5cac7d" : "gray.400"} fontSize="md" />
                                <Text fontSize="sm">Stores ({availableStores?.length || 0})</Text>
                            </Flex>
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent pl={9}>
                            <VStack align="start" gap={2} pt={1} pb={2}>
                                {availableStores?.map((s: Store) => (
                                    <Text 
                                        key={s.id} fontSize="sm" cursor="pointer"
                                        color={s.id === activeStoreId ? "#5cac7d" : "gray.500"} 
                                        fontWeight={s.id === activeStoreId ? "bold" : "normal"}
                                        _hover={{ color: "#5cac7d" }}
                                        onClick={() => { onStoreChange(s.id); onClose(); }}
                                    >
                                        {s.name}
                                    </Text>
                                ))}
                                
                               <Flex 
                                    onClick={() => setIsAddStoreOpen(true)} 
                                    align="center" gap={2} mt={1} color="orange.400" cursor="pointer" _hover={{ color: "orange.300" }}
                                >
                                    <Icon as={LuPlus} boxSize="14px" />
                                    <Text fontSize="xs" fontWeight="bold">Add New Store</Text>
                                </Flex>
                            </VStack>
                        </Accordion.ItemContent>
                    </Accordion.Item>

                    {OTHER_NAV_ITEMS.map((item, idx) => (
                        <Accordion.Item key={idx} value={item.label} border="none" mb={0}>
                            <Accordion.ItemTrigger _hover={{ bg: "whiteAlpha.100" }} py={2} px={3} rounded="lg" cursor="pointer">
                                <Flex align="center" gap={3}>
                                    <Icon as={item.icon} fontSize="md" />
                                    <Text fontSize="sm">{item.label}</Text>
                                </Flex>
                            </Accordion.ItemTrigger>
                            <Accordion.ItemContent pl={9}>
                                <VStack align="start" gap={2} pt={1} pb={2}>
                                    {item.children.map((child, cIdx) => (
                                        <Text key={cIdx} fontSize="sm" color="gray.500" cursor="pointer" _hover={{ color: "#5cac7d" }} onClick={onClose}>
                                            {child}
                                        </Text>
                                    ))}
                                </VStack>
                            </Accordion.ItemContent>
                        </Accordion.Item>
                    ))}
                </Accordion.Root>
            </VStack>

            {/* FIXED BOTTOM SECTION (Always visible) */}
            {/* ✅ Reduced margin top from 4 to 2 */}
            <Box mt={2}>
                {/* Subscription / Used Capacity Card */}
                {/* ✅ Reduced padding, margins, and tightened layout */}
                <Box p={3} bg="whiteAlpha.50" border="1px solid" borderColor="whiteAlpha.100" rounded="xl" mb={2}>
                    <Flex align="center" justify="space-between" mb={2}>
                        <Flex align="center" gap={2}>
                            {/* ✅ Shrunk circle from 42px to 32px */}
                            <Flex justify="center" align="center" w="32px" h="32px" rounded="full" border="2px solid" borderColor="#5cac7d" borderTopColor="whiteAlpha.300" transform="rotate(-45deg)">
                                <Text fontSize="10px" fontWeight="bold" color="#5cac7d" transform="rotate(45deg)">
                                    45%
                                </Text>
                            </Flex>
                            <Text fontSize="xs" fontWeight="bold" color="white">
                                Used capacity
                            </Text>
                        </Flex>
                    </Flex>
                    
                    {/* ✅ Used a smaller button to save vertical space */}
                    <Button h="30px" fontSize="xs" w="full" bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} transition="all 0.2s" border="none">
                        Upgrade plan
                    </Button>
                </Box>

                {/* Log Out Button */}
                <Flex align="center" gap={2} px={3} py={2} cursor="pointer" rounded="lg" color="red.400" _hover={{ bg: "whiteAlpha.50" }} transition="all 0.2s">
                    <Icon as={LuLogOut} fontSize="md" />
                    <Text fontSize="sm" fontWeight="medium">Log Out</Text>
                </Flex>
            </Box>
        </Box>
        <AddStoreModal 
                isOpen={isAddStoreOpen} 
                onClose={() => setIsAddStoreOpen(false)} 
            />
            </>
    );
};
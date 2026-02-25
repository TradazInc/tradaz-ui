"use client";
import React, { useState } from "react";
import { Box, VStack, Text, Accordion, Icon, Flex, IconButton, Button } from "@chakra-ui/react";
import Link from "next/link";
import { 
    LuLayoutDashboard, LuShoppingBag, LuUsers, LuSettings, LuLogOut, 
    LuStore, LuX, LuPlus, LuScale, LuLandmark, LuTicketPercent 
} from "react-icons/lu";
import TradazHeader from "../TradazHeader";
import { SidebarProps, Store } from "@/app/lib/definitions";
import { AddStoreModal } from "../onboarding/AddStoreModal";

const OTHER_NAV_ITEMS = [
    { label: "Products", icon: LuShoppingBag, children: ["Add Product", "Inventory", "Collections"] },
    { label: "Customers", icon: LuUsers, children: ["Customer List", "Segments", "Reviews"] },
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
            zIndex={1000} display="flex" flexDirection="column" py={4} px={6} transition="transform 0.3s ease"
        >
            {/* HEADER (Fixed at top) */}
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
                                {["Overview", "Analytics", "Sales record", "POS", "Online Orders"].map((child, cIdx) => {
                                    
                                    //  "/dashboard". Otherwise, generate the slug.
                                    const path = child === "Overview" 
                                        ? "/dashboard" 
                                        : `/dashboard/${child.toLowerCase().replace(/\s+/g, '-')}`;
                                        
                                    return (
                                        <Link key={cIdx} href={path} style={{ width: '100%', textDecoration: 'none' }} onClick={onClose}>
                                            <Text fontSize="sm" color="gray.500" cursor="pointer" _hover={{ color: "#5cac7d" }} display="block" w="full">
                                                {child}
                                            </Text>
                                        </Link>
                                    );
                                })}
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
                                    {item.children.map((child, cIdx) => {
                                        // Auto-generate the URL slug for all other items
                                        const path = `/dashboard/${child.toLowerCase().replace(/\s+/g, '-')}`;
                                        return (
                                            <Link key={cIdx} href={path} style={{ width: '100%', textDecoration: 'none' }} onClick={onClose}>
                                                <Text fontSize="sm" color="gray.500" cursor="pointer" _hover={{ color: "#5cac7d" }} display="block" w="full">
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
            </VStack>

            <Box mt={2}>
                {/* Subscription / Used Capacity Card */}
                <Box p={3} bg="whiteAlpha.50" border="1px solid" borderColor="whiteAlpha.100" rounded="xl" mb={2}>
                    <Flex align="center" justify="space-between" mb={2}>
                        <Flex align="center" gap={2}>  
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
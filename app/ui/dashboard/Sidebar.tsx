"use client";
import React from "react";
import { Box, VStack, Text, Accordion, Icon, Flex, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { LuLayoutDashboard, LuShoppingBag, LuUsers, LuSettings, LuLogOut, LuStore, LuX, LuPlus } from "react-icons/lu";
import TradazHeader from "../TradazHeader";



interface Business {
    id: string;
    name: string;
    category: string;
}

interface Store {
    id: string;
    name: string;
    address: string;
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    activeBusiness: Business;
    availableStores: Store[];
    activeStoreId: string;
    onStoreChange: (id: string) => void;
}

const OTHER_NAV_ITEMS = [
    { label: "Products", icon: LuShoppingBag, children: ["Inventory", "Categories", "Collections"] },
    { label: "Customers", icon: LuUsers, children: ["Customer List", "Segments", "Reviews"] },
    { label: "Settings", icon: LuSettings, children: ["Profile", "Billing", "Notifications"] },
];

export const Sidebar = ({ 
    isOpen, 
    onClose, 
    activeBusiness, 
    availableStores, 
    activeStoreId, 
    onStoreChange 
}: SidebarProps) => {
    return (
        <Box
            w="280px" h="100vh" bg="#121212" borderRight="1px solid" borderColor="whiteAlpha.100"
            position={{ base: "fixed", lg: "sticky" }} top={0} left={0}
            transform={{ base: isOpen ? "translateX(0)" : "translateX(-100%)", lg: "translateX(0)" }}
            zIndex={1000} display="flex" flexDirection="column" p={6} transition="transform 0.3s ease"
        >
            <Flex justify="space-between" align="center" mb={10}>
                <TradazHeader/>
                <IconButton aria-label="Close" variant="ghost" display={{ base: "flex", lg: "none" }} onClick={onClose} color="gray.400">
                    <Icon as={LuX} />
                </IconButton>
            </Flex>

    
            <VStack align="stretch" gap={2} flex={1} overflowY="auto" css={{ '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}>
                <Text fontSize="xs" fontWeight="bold" color="gray.500" px={3} mb={2}>
                    MANAGING: {activeBusiness?.name}
                </Text>
                
                <Accordion.Root collapsible defaultValue={["Dashboard"]} variant="plain">
                    <Accordion.Item value="Dashboard" border="none" mb={2}>
                        <Accordion.ItemTrigger _hover={{ bg: "whiteAlpha.100" }} py={3} px={3} rounded="lg" cursor="pointer">
                            <Flex align="center" gap={3}>
                                <Icon as={LuLayoutDashboard} fontSize="lg" />
                                <Text fontSize="sm">Dashboard</Text>
                            </Flex>
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent pl={9}>
                            <VStack align="start" gap={2}>
                                {["Overview", "Updates", "Reports"].map((child, cIdx) => (
                                    <Text key={cIdx} fontSize="sm" color="gray.500" cursor="pointer" _hover={{ color: "#5cac7d" }} onClick={onClose}>
                                        {child}
                                    </Text>
                                ))}
                            </VStack>
                        </Accordion.ItemContent>
                    </Accordion.Item>

                    <Accordion.Item value="Stores" border="none" mb={2}>
                        <Accordion.ItemTrigger _hover={{ bg: "whiteAlpha.100" }} py={3} px={3} rounded="lg" cursor="pointer">
                            <Flex align="center" gap={3}>
                                <Icon as={LuStore} color={availableStores.length > 0 ? "#5cac7d" : "gray.400"} fontSize="lg" />
                                <Text fontSize="sm">Stores ({availableStores.length})</Text>
                            </Flex>
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent pl={9}>
                            <VStack align="start" gap={3}>
                                
                                {availableStores.map((s: Store) => (
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
                                
                        
                                <Link href="/onboarding" style={{ textDecoration: 'none' }}>
                                    <Flex align="center" gap={2} mt={2} color="orange.400" cursor="pointer" _hover={{ color: "orange.300" }}>
                                        <Icon as={LuPlus} boxSize="14px" />
                                        <Text fontSize="xs" fontWeight="bold">Add New Store</Text>
                                    </Flex>
                                </Link>
                            </VStack>
                        </Accordion.ItemContent>
                    </Accordion.Item>

                    {OTHER_NAV_ITEMS.map((item, idx) => (
                        <Accordion.Item key={idx} value={item.label} border="none" mb={2}>
                            <Accordion.ItemTrigger _hover={{ bg: "whiteAlpha.100" }} py={3} px={3} rounded="lg" cursor="pointer">
                                <Flex align="center" gap={3}>
                                    <Icon as={item.icon} fontSize="lg" />
                                    <Text fontSize="sm">{item.label}</Text>
                                </Flex>
                            </Accordion.ItemTrigger>
                            <Accordion.ItemContent pl={9}>
                                <VStack align="start" gap={2}>
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

            
            <Flex align="center" gap={3} p={3} cursor="pointer" rounded="lg" color="red.400" _hover={{ bg: "whiteAlpha.50" }} mt="auto">
                <Icon as={LuLogOut} />
                <Text fontSize="sm" fontWeight="medium">Log Out</Text>
            </Flex>
        </Box>
    );
};
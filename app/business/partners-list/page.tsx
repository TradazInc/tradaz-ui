"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, IconButton, Avatar, Grid, VStack } from "@chakra-ui/react";
import {
    LuSearch, LuRefreshCw, LuStore, LuCheck,
    LuBan, LuClock, LuMail, LuSend, LuEye, LuEllipsisVertical
} from "react-icons/lu";

const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };

export interface PartnerRecord {
    id: string;
    businessName: string;
    contactName: string;
    email: string;
    productsCount: number;
    totalSales: number;
    status: "Active" | "Pending Invite" | "Suspended";
    joinedDate: string;
}

// Simulated Database
const MOCK_PARTNERS: PartnerRecord[] = [
    { id: "PTN-001", businessName: "AO Leather", contactName: "Aba O.", email: "david@nyashii.com", productsCount: 45, totalSales: 1250000, status: "Active", joinedDate: "Jan 12, 2025" },
    { id: "PTN-002", businessName: "Luxe Shoes", contactName: "Bello K.", email: "hello@luxeshoes.ng", productsCount: 12, totalSales: 450000, status: "Active", joinedDate: "Feb 05, 2025" },
    { id: "PTN-003", businessName: "Dap Threads", contactName: "Michael B.", email: "mike@urbanthreads.co", productsCount: 0, totalSales: 0, status: "Pending Invite", joinedDate: "Apr 28, 2026" },
    { id: "PTN-004", businessName: "Sharp Kicks", contactName: "John D.", email: "john@shadykicks.com", productsCount: 3, totalSales: 15000, status: "Suspended", joinedDate: "Mar 10, 2025" },
    { id: "PTN-005", businessName: "Bee Boutique", contactName: "Bella W.", email: "admin@boutiquebella.com", productsCount: 0, totalSales: 0, status: "Pending Invite", joinedDate: "Apr 25, 2026" },
];

const TABS = [
    { id: "All", label: "All Partners", count: 5 },
    { id: "Active", label: "Active", count: 2 },
    { id: "Pending Invite", label: "Pending Invites", count: 2 },
    { id: "Suspended", label: "Suspended", count: 1 },
];

export default function PartnersListPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("All");

    // Filter Logic
    const visibleItems = MOCK_PARTNERS.filter(partner => {
        const matchesSearch = partner.businessName.toLowerCase().includes(searchQuery.toLowerCase()) || partner.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = activeTab === "All" || partner.status === activeTab;
        return matchesSearch && matchesStatus;
    });

    const getStatusIconProps = (status: string) => {
        switch(status) {
            case "Active": return { icon: LuCheck, color: "#5cac7d" };
            case "Pending Invite": return { icon: LuClock, color: "orange.400" };
            case "Suspended": return { icon: LuBan, color: "red.400" };
            default: return { icon: LuStore, color: "#888888" };
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1300px" mx="auto" animation="fade-in 0.3s ease" position="relative" bg="#000000" minH="100vh">
            
            {/* --- COMBINED STICKY HEADER & TOOLBAR --- */}
            <Box 
                position="sticky" top="-16px" mt="-16px" zIndex={30} 
                bg="#000000" 
                mx={{ base: "-16px", lg: "-32px" }} px={{ base: "16px", lg: "32px" }}
                pt={{ base: 4, lg: 8 }} pb={6} mb={8} 
                borderBottom="1px solid #1A1A1A"
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} gap={4}>
                    <Box>
                        <Flex align="center" gap={3} mb={1}>
                            <Text color="white" fontWeight="black" fontSize="3xl" letterSpacing="tight">Partner Directory</Text>
                            <Button size="sm" variant="ghost" color="#888888" border="1px solid #1A1A1A" rounded="none" _hover={{ color: "white", bg: "#111111" }} h="32px">
                                <Icon as={LuRefreshCw} mr={2} strokeWidth="2.5" /> Refresh
                            </Button>
                        </Flex>
                        <Text color="#888888" fontSize="sm">Manage your partner network, track performance, and onboard new vendors.</Text>
                    </Box>
                    <Button bg="white" color="black" h="44px" rounded="none" fontWeight="bold" _hover={{ bg: "#E5E5E5" }} border="none" px={6}>
                        <Icon as={LuSend} mr={2} strokeWidth="2.5" /> Invite Partner
                    </Button>
                </Flex>
            </Box>

            {/* KPI CARDS */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4} mb={8}>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="10px" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Total Partners</Text>
                        <Icon as={LuStore} color="blue.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">5</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="10px" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Active</Text>
                        <Icon as={LuCheck} color="#5cac7d" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">2</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="10px" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Pending Invites</Text>
                        <Icon as={LuClock} color="orange.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">2</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="10px" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Suspended</Text>
                        <Icon as={LuBan} color="red.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">1</Text>
                </Box>
            </SimpleGrid>

            {/* TABS */}
            <Flex borderBottom="1px solid #1A1A1A" mb={6} overflowX="auto" css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                {TABS.map((tab) => (
                    <Box 
                        key={tab.id}
                        px={4} py={3} cursor="pointer"
                        borderBottom="2px solid"
                        borderColor={activeTab === tab.id ? "white" : "transparent"}
                        onClick={() => setActiveTab(tab.id)}
                        _hover={{ color: "white" }}
                        transition="all 0.2s"
                    >
                        <Text fontSize="sm" fontWeight={activeTab === tab.id ? "bold" : "500"} color={activeTab === tab.id ? "white" : "#888888"} whiteSpace="nowrap">
                            {tab.label} ({tab.count})
                        </Text>
                    </Box>
                ))}
            </Flex>

            {/* SEARCH */}
            <Flex align="center" {...controlStyles} mb={6} bg="#0A0A0A" w={{ base: "full", md: "400px" }}>
                <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                <Input placeholder="Search partners or emails..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} px={0} w="full" />
            </Flex>

            {/* PARTNERS GRID TABLE */}
            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column" border="1px dashed #1A1A1A" bg="#0A0A0A">
                    <Text color="#888888" fontSize="lg" fontWeight="bold">No partners found.</Text>
                </Flex>
            ) : (
                <Box bg="#0A0A0A" rounded="none" border="1px solid #1A1A1A" mb={8} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                    <Box minW="1000px">
                        
                        {/* Table Header */}
                        <Grid templateColumns="2fr 1.5fr 1fr 1fr 1fr 100px" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid" borderColor="#333333">
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Partner Details</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Contact Info</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Performance</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Joined</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Status</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Actions</Text>
                        </Grid>

                        {/* Table Rows */}
                        <VStack align="stretch" gap={0}>
                            {visibleItems.map((partner) => {
                                const statusProps = getStatusIconProps(partner.status);

                                return (
                                    <Grid 
                                        key={partner.id} 
                                        templateColumns="2fr 1.5fr 1fr 1fr 1fr 100px" gap={4} px={6} py={4} 
                                        borderBottom="1px solid #1A1A1A" 
                                        alignItems="center" 
                                        _hover={{ bg: "#111111" }} transition="background 0.2s" 
                                        opacity={partner.status === "Suspended" ? 0.6 : 1}
                                    >
                                        {/* Partner Details */}
                                        <Flex align="center" gap={3}>
                                            <Avatar.Root size="sm" rounded="full">
                                                <Avatar.Fallback bg="#111111" border="1px solid #333333" color="white" rounded="none" fontSize="10px" fontWeight="bold">
                                                    {partner.businessName.substring(0, 2).toUpperCase()}
                                                </Avatar.Fallback>
                                            </Avatar.Root>
                                            <Box>
                                                <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight" textDecoration={partner.status === "Suspended" ? "line-through" : "none"}>
                                                    {partner.businessName}
                                                </Text>
                                                <Text color="#888888" fontSize="xs" fontFamily="monospace" mt={0.5}>{partner.id}</Text>
                                            </Box>
                                        </Flex>

                                        {/* Contact Info */}
                                        <Box>
                                            <Text color="white" fontSize="sm" fontWeight="bold">{partner.contactName}</Text>
                                            <Flex align="center" gap={1.5} mt={0.5} color="#888888">
                                                <Icon as={LuMail} boxSize="12px" strokeWidth="2.5" />
                                                <Text fontSize="xs" fontWeight="bold">{partner.email}</Text>
                                            </Flex>
                                        </Box>

                                        {/* Performance */}
                                        <Box>
                                            <Text color="white" fontSize="sm" fontWeight="black" letterSpacing="tight">₦{partner.totalSales.toLocaleString()}</Text>
                                            <Text color="#888888" fontSize="xs" mt={0.5} fontWeight="bold">{partner.productsCount} products</Text>
                                        </Box>

                                        {/* Joined */}
                                        <Text color="#888888" fontSize="sm" fontWeight="bold">
                                            {partner.status === "Pending Invite" ? "—" : partner.joinedDate}
                                        </Text>

                                        {/* Status */}
                                        <Box>
                                            <Flex align="center" gap={1.5} bg="#111111" color="white" px={2.5} py={1} border="1px solid #333333" rounded="none" display="inline-flex">
                                                <Icon as={statusProps.icon} color={statusProps.color} boxSize="12px" strokeWidth="3" />
                                                <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{partner.status}</Text>
                                            </Flex>
                                        </Box>
                                        
                                        {/* Actions */}
                                        <Flex gap={2} align="center" justify="flex-end">
                                            {partner.status === "Pending Invite" ? (
                                                <Button size="sm" h="32px" bg="#111111" border="1px solid #333333" color="white" rounded="none" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" _hover={{ bg: "#1A1A1A" }}>
                                                    <Icon as={LuSend} mr={1.5} strokeWidth="2.5" /> Resend
                                                </Button>
                                            ) : (
                                                <Button size="sm" h="32px" bg="#111111" border="1px solid #333333" color="white" rounded="none" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" _hover={{ bg: "#1A1A1A" }}>
                                                    <Icon as={LuEye} mr={1.5} strokeWidth="2.5" /> View
                                                </Button>
                                            )}
                                            
                                            <IconButton aria-label="More options" size="sm" h="32px" variant="ghost" rounded="none" color="#888888" _hover={{ color: "white", bg: "#1A1A1A" }}>
                                                <Icon as={LuEllipsisVertical} strokeWidth="2.5" />
                                            </IconButton>
                                        </Flex>

                                    </Grid>
                                );
                            })}
                        </VStack>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
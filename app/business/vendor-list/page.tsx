"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, IconButton, Avatar, AvatarGroup } from "@chakra-ui/react";
import {
    LuSearch, LuRefreshCw, LuStore, LuCheck,
    LuBan, LuClock, LuMail, LuSend, LuEye, LuEllipsisVertical
} from "react-icons/lu";


const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };

export interface VendorRecord {
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
const MOCK_VENDORS: VendorRecord[] = [
    { id: "VND-001", businessName: "AO Leather", contactName: "Aba O.", email: "david@nyashii.com", productsCount: 45, totalSales: 1250000, status: "Active", joinedDate: "Jan 12, 2025" },
    { id: "VND-002", businessName: "Luxe Shoes", contactName: "Bello K.", email: "hello@luxeshoes.ng", productsCount: 12, totalSales: 450000, status: "Active", joinedDate: "Feb 05, 2025" },
    { id: "VND-003", businessName: "Dap Threads", contactName: "Michael B.", email: "mike@urbanthreads.co", productsCount: 0, totalSales: 0, status: "Pending Invite", joinedDate: "Apr 28, 2026" },
    { id: "VND-004", businessName: "sharp Kicks", contactName: "John D.", email: "john@shadykicks.com", productsCount: 3, totalSales: 15000, status: "Suspended", joinedDate: "Mar 10, 2025" },
    { id: "VND-005", businessName: "Bee Boutique", contactName: "Bella W.", email: "admin@boutiquebella.com", productsCount: 0, totalSales: 0, status: "Pending Invite", joinedDate: "Apr 25, 2026" },
];

const TABS = [
    { id: "All", label: "All Vendors", count: 5 },
    { id: "Active", label: "Active", count: 2 },
    { id: "Pending Invite", label: "Pending Invites", count: 2 },
    { id: "Suspended", label: "Suspended", count: 1 },
];

export default function Page() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("All");

    // Filter Logic
    const visibleItems = MOCK_VENDORS.filter(vendor => {
        const matchesSearch = vendor.businessName.toLowerCase().includes(searchQuery.toLowerCase()) || vendor.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = activeTab === "All" || vendor.status === activeTab;
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
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000">
            
            {/* Header */}
            <Flex justify="space-between" align="flex-start" mb={6} wrap="wrap" gap={4} pt={2}>
                <Box>
                    <Flex align="center" gap={3} mb={1}>
                        <Text color="white" fontWeight="bold" fontSize="2xl" letterSpacing="tight">Vendor Directory</Text>
                        <Button size="sm" variant="ghost" color="#888888" border="1px solid #1A1A1A" rounded="none" _hover={{ color: "white", bg: "#111111" }}>
                            <Icon as={LuRefreshCw} mr={2} strokeWidth="2.5" /> Refresh
                        </Button>
                    </Flex>
                    <Text color="#888888" fontSize="sm">Manage your partner network, track performance, and onboard new vendors.</Text>
                </Box>
                
                {/* SEND INVITE */}
                <Button bg="white" color="black" h="44px" rounded="none" fontWeight="bold" _hover={{ bg: "#E5E5E5" }} border="none" px={6}>
                    <Icon as={LuSend} mr={2} strokeWidth="2.5" /> Invite Vendor
                </Button>
            </Flex>

        
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4} mb={8}>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Total Vendors</Text>
                        <Icon as={LuStore} color="blue.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">5</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Active</Text>
                        <Icon as={LuCheck} color="#5cac7d" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">2</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Pending Invites</Text>
                        <Icon as={LuClock} color="orange.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">2</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Suspended</Text>
                        <Icon as={LuBan} color="red.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">1</Text>
                </Box>
            </SimpleGrid>

           
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

            {/* Search Bar */}
            <Flex align="center" {...controlStyles} mb={6} bg="#0A0A0A" w={{ base: "full", md: "400px" }}>
                <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                <Input placeholder="Search vendors or emails..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} px={0} w="full" />
            </Flex>

            {/* Vendor Table */}
            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column" border="1px dashed #1A1A1A" bg="#0A0A0A">
                    <Text color="#888888" fontSize="lg" fontWeight="bold">No vendors found.</Text>
                </Flex>
            ) : (
                <Box bg="#0A0A0A" rounded="none" border="1px solid #1A1A1A" mb={8} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#1A1A1A', borderRadius: '0px' } }}>
                    <Box as="table" w="full" minW="1000px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                        <Box as="thead" bg="#111111" borderBottom="1px solid #1A1A1A">
                            <Box as="tr">
                                {["Vendor Details", "Contact Info", "Performance", "Joined", "Status", "Actions"].map((head) => (
                                    <Box as="th" key={head} py={4} px={6} color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{head}</Box>
                                ))}
                            </Box>
                        </Box>
                        <Box as="tbody">
                            {visibleItems.map((vendor) => {
                                const statusProps = getStatusIconProps(vendor.status);

                                return (
                                    <Box as="tr" key={vendor.id} borderBottom="1px solid #1A1A1A" _hover={{ bg: "#111111" }} transition="background 0.2s" opacity={vendor.status === "Suspended" ? 0.6 : 1}>
                                        
                                        {/* Vendor Details */}
                                        <Box as="td" py={4} px={6}>
                                            <Flex align="center" gap={3}>
                                                <AvatarGroup>
                                                    <Avatar.Root size="sm" rounded="full" border="1px solid #333333">
                                                        <Avatar.Fallback bg="#111111" color="white" rounded="none" fontSize="10px" fontWeight="bold">
                                                            {vendor.businessName.substring(0, 2).toUpperCase()}
                                                        </Avatar.Fallback>
                                                    </Avatar.Root>
                                                </AvatarGroup>
                                                <Box>
                                                    <Text color="white" fontSize="sm" fontWeight="bold" textDecoration={vendor.status === "Suspended" ? "line-through" : "none"}>{vendor.businessName}</Text>
                                                    <Text color="gray.500" fontSize="xs" fontFamily="monospace" mt={0.5}>{vendor.id}</Text>
                                                </Box>
                                            </Flex>
                                        </Box>

                                        {/* Contact Info */}
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="500">{vendor.contactName}</Text>
                                            <Flex align="center" gap={1.5} mt={0.5} color="gray.500">
                                                <Icon as={LuMail} boxSize="12px" />
                                                <Text fontSize="xs">{vendor.email}</Text>
                                            </Flex>
                                        </Box>

                                        {/* Performance */}
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="bold">₦{vendor.totalSales.toLocaleString()}</Text>
                                            <Text color="gray.500" fontSize="xs" mt={0.5}>{vendor.productsCount} active products</Text>
                                        </Box>

                                        {/* Joined */}
                                        <Box as="td" py={4} px={6}>
                                            <Text color="gray.400" fontSize="sm">{vendor.status === "Pending Invite" ? "—" : vendor.joinedDate}</Text>
                                        </Box>

                                        {/* Status */}
                                        <Box as="td" py={4} px={6}>
                                            <Flex align="center" gap={1.5} bg="#111111" color="white" px={2} py={0.5} border="1px solid #333333" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" display="inline-flex">
                                                <Icon as={statusProps.icon} color={statusProps.color} boxSize="12px" strokeWidth="3" />
                                                {vendor.status}
                                            </Flex>
                                        </Box>
                                        
                                        {/* Actions */}
                                        <Box as="td" py={4} px={6}>
                                            <Flex gap={2} align="center">
                                                {vendor.status === "Pending Invite" ? (
                                                    <Button size="sm" h="32px" bg="#111111" border="1px solid #333333" color="white" rounded="none" fontSize="12px" _hover={{ bg: "#1A1A1A" }}>
                                                        <Icon as={LuSend} mr={1.5} /> Resend
                                                    </Button>
                                                ) : (
                                                    <Button size="sm" h="32px" bg="#111111" border="1px solid #333333" color="white" rounded="none" fontSize="12px" _hover={{ bg: "#1A1A1A" }}>
                                                        <Icon as={LuEye} mr={1.5} /> View
                                                    </Button>
                                                )}
                                                
                                                <IconButton aria-label="More options" size="sm" h="32px" variant="ghost" rounded="none" color="gray.400" _hover={{ color: "white", bg: "#1A1A1A" }}>
                                                    <Icon as={LuEllipsisVertical} strokeWidth="2.5" />
                                                </IconButton>
                                            </Flex>
                                        </Box>

                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
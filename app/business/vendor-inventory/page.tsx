"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button } from "@chakra-ui/react";
import { 
    LuSearch, LuRefreshCw, LuBox, LuCheck, 
    LuX, LuClock, LuUser, LuEye, LuImage
} from "react-icons/lu";


const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };

export interface VendorProduct {
    id: string;
    name: string;
    brand: string;
    vendorName: string;
    price: number;
    stock: number;
    status: "Pending" | "Approved" | "Rejected" | "Edited" | "Deleted";
    created: string;
    updated: string;
}

// Simulated Database
const MOCK_VENDOR_PRODUCTS: VendorProduct[] = [
    { id: "VPRD-801", name: "NY Suede Loafers", brand: "nyashii leather", vendorName: "Og Leather", price: 45000, stock: 1, status: "Pending", created: "12/13/2025", updated: "12/13/2025" },
    { id: "VPRD-802", name: "NY DiagCross", brand: "nyashii leather", vendorName: "og Leather", price: 32000, stock: 1, status: "Pending", created: "12/13/2025", updated: "12/13/2025" },
    { id: "VPRD-803", name: "Commando", brand: "nyashii leather", vendorName: "Ny Leather", price: 55000, stock: 1, status: "Pending", created: "12/13/2025", updated: "12/13/2025" },
    { id: "VPRD-804", name: "Classic Oxfords", brand: "luxe shoes", vendorName: "chrida Shoes", price: 60000, stock: 5, status: "Approved", created: "11/10/2025", updated: "11/15/2025" },
    { id: "VPRD-805", name: "Faux Leather Boots", brand: "shady kicks", vendorName: "OG dior", price: 15000, stock: 0, status: "Rejected", created: "10/05/2025", updated: "10/06/2025" },
];

const TABS = [
    { id: "Pending", label: "New", count: 5 },
    { id: "Approved", label: "Approved", count: 289 },
    { id: "Rejected", label: "Rejected", count: 13 },
    { id: "Edited", label: "Edit", count: 15 },
    { id: "Deleted", label: "Delete", count: 4 },
];

export default function Page() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("Pending");

    // Filter Logic
    const visibleItems = MOCK_VENDOR_PRODUCTS.filter(prod => {
        const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || prod.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = prod.status === activeTab;
        return matchesSearch && matchesStatus;
    });

    // Helper for strict icon colors
    const getStatusIconProps = (status: string) => {
        switch(status) {
            case "Approved": return { icon: LuCheck, color: "#5cac7d" };
            case "Pending": return { icon: LuClock, color: "orange.400" };
            case "Rejected": return { icon: LuX, color: "red.400" };
            case "Edited": return { icon: LuRefreshCw, color: "blue.400" };
            default: return { icon: LuBox, color: "#888888" };
        }
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000">
            
            {/* Header */}
            <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4} pt={2}>
                <Text color="white" fontWeight="bold" fontSize="2xl" letterSpacing="tight">Vendor Inventory Review</Text>
                <Flex gap={3}>
                    <Button size="sm" variant="ghost" color="#888888" border="1px solid #1A1A1A" rounded="none" _hover={{ color: "white", bg: "#111111" }}>
                        <Icon as={LuRefreshCw} mr={2} strokeWidth="2.5" /> Refresh
                    </Button>
                    <Button size="sm" variant="ghost" color="#888888" border="1px solid #1A1A1A" rounded="none" _hover={{ color: "white", bg: "#111111" }}>
                        <Icon as={LuBox} mr={2} strokeWidth="2.5" /> 5 products
                    </Button>
                </Flex>
            </Flex>

            {/* Inventory Summary  */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4} mb={8}>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Total Products</Text>
                        <Icon as={LuBox} color="blue.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">307</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Pending Review</Text>
                        <Icon as={LuClock} color="orange.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">5</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Approved</Text>
                        <Icon as={LuCheck} color="#5cac7d" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">289</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Rejected</Text>
                        <Icon as={LuX} color="red.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">13</Text>
                </Box>
            </SimpleGrid>

            {/* Navigation Tabs - STRICTLY MONOCHROME */}
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
            <Flex align="center" {...controlStyles} mb={8} bg="#0A0A0A">
                <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                <Input placeholder="Search products, brands, or vendors..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} px={0} w="full" />
            </Flex>

            {/* Product Grid */}
            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column" border="1px dashed #1A1A1A" bg="#0A0A0A">
                    <Text color="#888888" fontSize="lg" fontWeight="bold">No products found in {activeTab}.</Text>
                </Flex>
            ) : (
                <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6} mb={8}>
                    {visibleItems.map((prod) => {
                        const statusProps = getStatusIconProps(prod.status);
                        
                        return (
                            <Box key={prod.id} bg="#0A0A0A" border="1px solid #1A1A1A" rounded="none" overflow="hidden" display="flex" flexDirection="column">
                                
                                {/* Image Placeholder */}
                                <Flex h="220px" bg="#111111" borderBottom="1px solid #1A1A1A" align="center" justify="center">
                                    <Icon as={LuImage} boxSize="40px" color="#333333" />
                                </Flex>

                                {/* Card Body */}
                                <Box p={5} flex={1} display="flex" flexDirection="column">
                                    
                                    
                                    <Flex justify="space-between" align="flex-start" mb={2} gap={2}>
                                        <Text color="white" fontWeight="bold" fontSize="md" lineClamp={1}>{prod.name}</Text>
                                        <Flex align="center" gap={1.5} bg="#111111" color="white" px={2} py={0.5} border="1px solid #333333" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" flexShrink={0}>
                                            <Icon as={statusProps.icon} color={statusProps.color} boxSize="12px" strokeWidth="3" />
                                            {prod.status}
                                        </Flex>
                                    </Flex>

                                    {/* Brand Row */}
                                    <Text color="#888888" fontSize="xs" mb={4}>{prod.brand}</Text>

                                    {/* Price / Stock Row */}
                                    <Flex justify="space-between" align="center" mb={4}>
                                        <Text color="white" fontSize="sm" fontWeight="bold" fontFamily="monospace">₦{prod.price.toLocaleString()}</Text>
                                        <Text color="#888888" fontSize="xs">{prod.stock} in stock</Text>
                                    </Flex>

                                    {/* Vendor Name Row */}
                                    <Flex align="center" gap={2} mb={3}>
                                        <Icon as={LuUser} color="#888888" boxSize="14px" />
                                        <Text color="#888888" fontSize="xs">{prod.vendorName}</Text>
                                    </Flex>

                                    {/* Dates Row */}
                                    <Flex wrap="wrap" gap={1} fontSize="10px" color="#555555" mb={6} mt="auto">
                                        <Text>Created: {prod.created}</Text>
                                        <Text>•</Text>
                                        <Text>Updated: {prod.updated}</Text>
                                    </Flex>

                                    {/* Action Buttons Row - Hides Approve/Reject when Approved */}
                                    <SimpleGrid columns={prod.status === "Approved" ? 1 : 3} gap={2} mt="auto">
                                        <Button size="sm" h="36px" bg="#111111" border="1px solid #333333" color="white" rounded="none" fontSize="12px" _hover={{ bg: "#1A1A1A" }}>
                                            <Icon as={LuEye} mr={1.5} /> Details
                                        </Button>
                                        
                                        {prod.status !== "Approved" && (
                                            <>
                                                <Button size="sm" h="36px" bg="#111111" color="white" border="1px solid #333333" rounded="none" fontSize="12px" _hover={{ bg: "#1A1A1A" }}>
                                                    <Icon as={LuCheck} color="#5cac7d" mr={1.5} strokeWidth="3" /> Approve
                                                </Button>
                                                
                                                <Button size="sm" h="36px" bg="#111111" color="white" border="1px solid #333333" rounded="none" fontSize="12px" _hover={{ bg: "#1A1A1A" }}>
                                                    <Icon as={LuX} color="red.400" mr={1.5} strokeWidth="3" /> Reject
                                                </Button>
                                            </>
                                        )}
                                    </SimpleGrid>
                                </Box>
                            </Box>
                        );
                    })}
                </SimpleGrid>
            )}
        </Box>
    );
}
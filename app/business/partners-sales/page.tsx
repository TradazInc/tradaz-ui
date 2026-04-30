"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, Grid, VStack } from "@chakra-ui/react";
import {
    LuSearch, LuEye, LuTrendingUp, LuWallet, LuUsers, LuTag
} from "react-icons/lu";

// --- MOCK DATA (SANITIZED / FICTIONAL) ---
export interface PartnershipSalesRecord {
    id: string;
    brand: string;
    commissionStr: string;
    discountStr: string;
    minCart: string;
    partnerName: string;
    email: string;
    couponCode: string;
    orders: number;
    revenue: number;
    commissionEarned: number;
}

const MOCK_SALES: PartnershipSalesRecord[] = [
    { id: "PS-001", brand: "Zenith Wear", commissionStr: "10% commission", discountStr: "10% discount", minCart: "₦20,000", partnerName: "Wada Gift", email: "wada.a@example.com", couponCode: "ZENITH-CHIN10", orders: 0, revenue: 0, commissionEarned: 0 },
    { id: "PS-002", brand: "Terra Tech", commissionStr: "5% commission", discountStr: "Free Shipping", minCart: "₦50,000", partnerName: "Aisha Mohammed", email: "aisha.m@example.com", couponCode: "TERRA-AM", orders: 54, revenue: 2700000, commissionEarned: 135000 },
    { id: "PS-003", brand: "Bloom Cosmetics", commissionStr: "15% commission", discountStr: "15% discount", minCart: "₦15,000", partnerName: "Emmanuel Obi", email: "emma.o@example.com", couponCode: "BLOOM-EO", orders: 27, revenue: 540000, commissionEarned: 81000 },
];

const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px" };

export default function PartnershipSalesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortByMetric, setSortByMetric] = useState("revenue");
    const [sortOrder, setSortOrder] = useState("desc");

    // Filter Logic
    const visibleItems = MOCK_SALES.filter(sale => {
        const query = searchQuery.toLowerCase();
        return sale.brand.toLowerCase().includes(query) || 
               sale.couponCode.toLowerCase().includes(query) || 
               sale.partnerName.toLowerCase().includes(query);
    });

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease" position="relative" bg="#000000" minH="100vh">
            
            {/* --- COMBINED STICKY HEADER --- */}
            <Box 
                position="sticky" top="0" zIndex={30} 
                bg="#000000" 
                mx={{ base: "-16px", lg: "-32px" }} px={{ base: "16px", lg: "32px" }}
                pt={{ base: 4, lg: 8 }} pb={6} mb={8} 
                borderBottom="1px solid #1A1A1A"
            >
                <Flex justify="space-between" align={{ base: "flex-start", xl: "center" }} direction={{ base: "column", xl: "row" }} gap={6}>
                    <Box>
                        <Text color="white" fontWeight="black" fontSize="3xl" letterSpacing="tight" mb={1}>Partnership Sales</Text>
                        <Text color="#888888" fontSize="sm">View orders completed using partnership coupon codes.</Text>
                    </Box>
                    
                    {/* Header KPIs */}
                    <Flex gap={4} wrap="wrap">
                        <Box bg="#0A0A0A" border="1px solid #1A1A1A" p={4} minW="160px">
                            <Text fontSize="10px" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Total Revenue</Text>
                            <Flex align="center" gap={2}>
                                <Icon as={LuTrendingUp} color="#5cac7d" strokeWidth="2.5" />
                                <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">₦3,240,000</Text>
                            </Flex>
                        </Box>
                        <Box bg="#0A0A0A" border="1px solid #1A1A1A" p={4} minW="160px">
                            <Text fontSize="10px" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Commission Earned</Text>
                            <Flex align="center" gap={2}>
                                <Icon as={LuWallet} color="purple.400" strokeWidth="2.5" />
                                <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">₦216,000</Text>
                            </Flex>
                        </Box>
                        <Box bg="#0A0A0A" border="1px solid #1A1A1A" p={4} minW="160px">
                            <Text fontSize="10px" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Active Partnerships</Text>
                            <Flex align="center" gap={2}>
                                <Icon as={LuUsers} color="blue.400" strokeWidth="2.5" />
                                <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">3</Text>
                            </Flex>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* --- TOOLBAR (SEARCH & SORT) --- */}
            <Box bg="#0A0A0A" border="1px solid #1A1A1A" p={5} mb={8}>
                <Flex align="center" gap={2} mb={4}>
                    <Icon as={LuSearch} color="white" strokeWidth="2.5" />
                    <Text color="white" fontWeight="bold" fontSize="lg" letterSpacing="tight">Search & Sort Partnerships</Text>
                </Flex>
                <Flex direction={{ base: "column", md: "row" }} gap={4} w="full">
                    <Flex flex={1} align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input 
                            placeholder="Search by brand name, coupon code, or partner..." 
                            border="none" color="white" h="full" px={0} 
                            _focus={{ boxShadow: "none", outline: "none" }} 
                            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                    </Flex>
                    
                    <Flex gap={4} w={{ base: "full", md: "auto" }}>
                        <Box w={{ base: "full", md: "200px" }}>
                            <select value={sortByMetric} onChange={(e) => setSortByMetric(e.target.value)} style={nativeSelectStyle}>
                                <option value="revenue" style={{ background: "#000000" }}>Total Revenue</option>
                                <option value="commission" style={{ background: "#000000" }}>Commission Earned</option>
                                <option value="orders" style={{ background: "#000000" }}>Total Orders</option>
                            </select>
                        </Box>
                        <Box w={{ base: "full", md: "160px" }}>
                            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={nativeSelectStyle}>
                                <option value="desc" style={{ background: "#000000" }}>Highest First</option>
                                <option value="asc" style={{ background: "#000000" }}>Lowest First</option>
                            </select>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* --- TABLE SECTION --- */}
            <Box bg="#0A0A0A" border="1px solid #1A1A1A" overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                
                {/* Table Section Header */}
                <Box p={6} borderBottom="1px solid #1A1A1A" bg="#0A0A0A">
                    <Text color="white" fontWeight="bold" fontSize="lg" letterSpacing="tight" mb={1}>Partnerships ({visibleItems.length})</Text>
                    <Text color="#888888" fontSize="sm">All approved partnerships with their order performance using coupon codes</Text>
                </Box>

                <Box minW="1100px">
                    {/* Columns Header */}
                    <Grid templateColumns="2fr 1.5fr 1.5fr 1fr 1fr 1fr 120px" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid #333333">
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Partnership</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Partner</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Coupon Code</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Orders</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Revenue</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Commission</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Actions</Text>
                    </Grid>

                    {/* Table Rows */}
                    {visibleItems.length === 0 ? (
                        <Flex justify="center" align="center" py={16} direction="column">
                            <Text color="#888888" fontSize="lg" fontWeight="bold">No partnerships found.</Text>
                        </Flex>
                    ) : (
                        <VStack align="stretch" gap={0}>
                            {visibleItems.map((sale) => (
                                <Grid 
                                    key={sale.id} 
                                    templateColumns="2fr 1.5fr 1.5fr 1fr 1fr 1fr 120px" gap={4} px={6} py={5} 
                                    borderBottom="1px solid #1A1A1A" 
                                    alignItems="center" 
                                    _hover={{ bg: "#111111" }} transition="background 0.2s"
                                >
                                    {/* Partnership / Brand Details */}
                                    <Box>
                                        <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight" mb={1}>{sale.brand}</Text>
                                        <Text color="#888888" fontSize="xs" fontWeight="bold">{sale.commissionStr} • {sale.discountStr}</Text>
                                        <Text color="#555555" fontSize="10px" textTransform="uppercase" letterSpacing="wider" mt={1}>Min. cart: {sale.minCart}</Text>
                                    </Box>

                                    {/* Partner Info */}
                                    <Box>
                                        <Text color="white" fontSize="sm" fontWeight="bold">{sale.partnerName}</Text>
                                        <Text color="#888888" fontSize="xs" mt={0.5}>{sale.email}</Text>
                                    </Box>

                                    {/* Coupon Code */}
                                    <Box>
                                        <Flex align="center" gap={2} bg="#111111" border="1px solid #333333" px={3} py={1.5} display="inline-flex">
                                            <Icon as={LuTag} color="#888888" boxSize="12px" strokeWidth="2.5" />
                                            <Text color="white" fontSize="xs" fontFamily="monospace" fontWeight="bold" letterSpacing="widest">{sale.couponCode}</Text>
                                        </Flex>
                                    </Box>

                                    {/* Orders */}
                                    <Box>
                                        <Text color="white" fontSize="sm" fontWeight="black">{sale.orders}</Text>
                                        <Text color="#888888" fontSize="10px" textTransform="uppercase" letterSpacing="wider" mt={0.5}>Orders</Text>
                                    </Box>

                                    {/* Revenue */}
                                    <Box>
                                        <Text color="#5cac7d" fontSize="sm" fontWeight="black">
                                            {sale.revenue === 0 ? "₦0" : `₦${sale.revenue.toLocaleString()}`}
                                        </Text>
                                    </Box>

                                    {/* Commission */}
                                    <Box>
                                        <Text color="purple.400" fontSize="sm" fontWeight="black">
                                            {sale.commissionEarned === 0 ? "₦0" : `₦${sale.commissionEarned.toLocaleString()}`}
                                        </Text>
                                    </Box>
                                    
                                    {/* Actions */}
                                    <Flex justify="flex-end">
                                        <Button size="sm" h="36px" bg="#111111" border="1px solid #333333" color="white" rounded="none" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" _hover={{ bg: "#1A1A1A", borderColor: "white" }}>
                                            <Icon as={LuEye} mr={2} strokeWidth="2.5" /> View Orders
                                        </Button>
                                    </Flex>

                                </Grid>
                            ))}
                        </VStack>
                    )}
                </Box>
            </Box>

        </Box>
    );
}
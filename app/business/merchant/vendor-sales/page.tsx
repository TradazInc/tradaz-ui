"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, IconButton } from "@chakra-ui/react";
import { 
    LuSearch, LuRefreshCw, LuDownload, LuStore, 
    LuCheck, LuClock, LuUndo, LuEye, LuTrendingUp, 
    LuWallet, LuReceipt, LuChevronDown
} from "react-icons/lu";


const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px" };

export interface VendorSale {
    id: string;
    vendorName: string;
    customerName: string;
    date: string;
    totalAmount: number;
    commission: number; 
    status: "Completed" | "Pending" | "Refunded";
}

// Simulated Database
const MOCK_VENDOR_SALES: VendorSale[] = [
    { id: "ORD-99281", vendorName: "OG dior", customerName: "Walk-in Customer", date: "Apr 28, 2026 - 10:23 AM", totalAmount: 45000, commission: 2250, status: "Completed" },
    { id: "ORD-99282", vendorName: "OG Dior", customerName: "Sarah Jenkins", date: "Apr 28, 2026 - 11:05 AM", totalAmount: 120000, commission: 6000, status: "Completed" },
    { id: "ORD-99283", vendorName: "ahL Leather", customerName: "Michael B.", date: "Apr 27, 2026 - 02:15 PM", totalAmount: 32000, commission: 1600, status: "Pending" },
    { id: "ORD-99284", vendorName: "OG Kicks", customerName: "Anonymous", date: "Apr 26, 2026 - 09:45 AM", totalAmount: 15000, commission: 750, status: "Refunded" },
    { id: "ORD-99285", vendorName: "OG Threads", customerName: "David O.", date: "Apr 25, 2026 - 04:30 PM", totalAmount: 25000, commission: 1250, status: "Completed" },
];

export default function VendorSalesOverview() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // Filter Logic
    const visibleItems = MOCK_VENDOR_SALES.filter(sale => {
        const matchesSearch = sale.id.toLowerCase().includes(searchQuery.toLowerCase()) || sale.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || sale.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Helper for strict monochrome badges with colored icons
    const getStatusIconProps = (status: string) => {
        switch(status) {
            case "Completed": return { icon: LuCheck, color: "#5cac7d" };
            case "Pending": return { icon: LuClock, color: "orange.400" };
            case "Refunded": return { icon: LuUndo, color: "red.400" };
            default: return { icon: LuReceipt, color: "#888888" };
        }
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000">
            
            {/* Header */}
            <Flex justify="space-between" align="flex-start" mb={6} wrap="wrap" gap={4} pt={2}>
                <Box>
                    <Flex align="center" gap={3} mb={1}>
                        <Text color="white" fontWeight="bold" fontSize="2xl" letterSpacing="tight">Vendor Sales Record</Text>
                        <Button size="sm" variant="ghost" color="#888888" border="1px solid #1A1A1A" rounded="none" _hover={{ color: "white", bg: "#111111" }}>
                            <Icon as={LuRefreshCw} mr={2} strokeWidth="2.5" /> Refresh
                        </Button>
                    </Flex>
                    <Text color="#888888" fontSize="sm">Track multi-vendor transaction volumes and calculate your platform commissions.</Text>
                </Box>
                
                {/* Export Action */}
                <Button bg="white" color="black" h="44px" rounded="none" fontWeight="bold" _hover={{ bg: "#E5E5E5" }} border="none" px={6}>
                    <Icon as={LuDownload} mr={2} strokeWidth="2.5" /> Export Report
                </Button>
            </Flex>

            {/* KPI Summary Cards - STRICTLY MONOCHROME WITH COLORED ICONS */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4} mb={8}>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Gross Vendor Volume</Text>
                        <Icon as={LuTrendingUp} color="blue.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">₦237,000</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Platform Commission</Text>
                        <Icon as={LuWallet} color="#5cac7d" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">₦11,850</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Total Orders</Text>
                        <Icon as={LuReceipt} color="gray.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">5</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Pending Settlements</Text>
                        <Icon as={LuClock} color="orange.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">₦32,000</Text>
                </Box>
            </SimpleGrid>

            {/* Sticky Toolbar */}
            <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)" py={3} mb={6} borderBottom="1px solid" borderColor="#1A1A1A" w="full">
                <Flex gap={3} wrap="wrap">
                    <Flex flex={1} minW="250px" align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input placeholder="Search by Order ID or Vendor..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} px={0} w="full" />
                    </Flex>
                    <Box w={{ base: "full", md: "auto" }}>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={nativeSelectStyle}>
                            <option value="All" style={{ background: "#0A0A0A" }}>All Statuses</option>
                            <option value="Completed" style={{ background: "#0A0A0A" }}>Completed</option>
                            <option value="Pending" style={{ background: "#0A0A0A" }}>Pending</option>
                            <option value="Refunded" style={{ background: "#0A0A0A" }}>Refunded</option>
                        </select>
                    </Box>
                </Flex>
            </Box>

            {/* Sales Data Table */}
            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column" border="1px dashed #1A1A1A" bg="#0A0A0A">
                    <Text color="#888888" fontSize="lg" fontWeight="bold">No vendor sales found.</Text>
                </Flex>
            ) : (
                <Box bg="#0A0A0A" rounded="none" border="1px solid #1A1A1A" mb={8} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#1A1A1A', borderRadius: '0px' } }}>
                    <Box as="table" w="full" minW="1000px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                        <Box as="thead" bg="#111111" borderBottom="1px solid #1A1A1A">
                            <Box as="tr">
                                {["Order ID & Date", "Vendor", "Total Amount", "Commission (5%)", "Status", "Actions"].map((head) => (
                                    <Box as="th" key={head} py={4} px={6} color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{head}</Box>
                                ))}
                            </Box>
                        </Box>
                        <Box as="tbody">
                            {visibleItems.map((sale) => {
                                const statusProps = getStatusIconProps(sale.status);
                                const isRefunded = sale.status === "Refunded";

                                return (
                                    <Box as="tr" key={sale.id} borderBottom="1px solid #1A1A1A" _hover={{ bg: "#111111" }} transition="background 0.2s" opacity={isRefunded ? 0.6 : 1}>
                                        
                                        {/* Order ID & Date */}
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="bold" textDecoration={isRefunded ? "line-through" : "none"}>{sale.id}</Text>
                                            <Text color="gray.500" fontSize="xs" mt={0.5}>{sale.date}</Text>
                                        </Box>

                                        {/* Vendor Details */}
                                        <Box as="td" py={4} px={6}>
                                            <Flex align="center" gap={2}>
                                                <Icon as={LuStore} color="gray.500" boxSize="14px" />
                                                <Box>
                                                    <Text color="white" fontSize="sm" fontWeight="500">{sale.vendorName}</Text>
                                                    <Text color="gray.500" fontSize="xs" mt={0.5}>Customer: {sale.customerName}</Text>
                                                </Box>
                                            </Flex>
                                        </Box>

                                        {/* Total Amount */}
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="md" fontWeight="bold" fontFamily="monospace" letterSpacing="tight">
                                                {isRefunded ? "-" : ""}₦{sale.totalAmount.toLocaleString()}
                                            </Text>
                                        </Box>

                                        {/* Commission */}
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="bold" fontFamily="monospace">
                                                {isRefunded ? "₦0" : `₦${sale.commission.toLocaleString()}`}
                                            </Text>
                                        </Box>

                                        {/* Status */}
                                        <Box as="td" py={4} px={6}>
                                            <Flex align="center" gap={1.5} bg="#111111" color="white" px={2} py={0.5} border="1px solid #333333" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" display="inline-flex">
                                                <Icon as={statusProps.icon} color={statusProps.color} boxSize="12px" strokeWidth="3" />
                                                {sale.status}
                                            </Flex>
                                        </Box>
                                        
                                        {/* Actions */}
                                        <Box as="td" py={4} px={6}>
                                            <Flex gap={2} align="center">
                                                <Button size="sm" h="32px" bg="#111111" border="1px solid #333333" color="white" rounded="none" fontSize="12px" _hover={{ bg: "#1A1A1A" }}>
                                                    <Icon as={LuEye} mr={1.5} /> Receipt
                                                </Button>
                                                
                                                <IconButton aria-label="More options" size="sm" h="32px" variant="ghost" rounded="none" color="gray.400" _hover={{ color: "white", bg: "#1A1A1A" }}>
                                                    <Icon as={LuChevronDown} strokeWidth="2.5" />
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
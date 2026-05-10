"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Grid, SimpleGrid, Icon, Badge, Button, Avatar, Input, IconButton, VStack, ScrollArea
} from "@chakra-ui/react";
import { 
    LuSearch, LuFilter, LuUndo, LuCheck, LuX, LuEye, LuClock, 
    LuShieldAlert, LuInfo, LuDownload, LuBanknote, LuArrowUpRight
} from "react-icons/lu";

// --- REUSABLE STYLES ---
const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px", minWidth: "160px" };

// --- MOCK DATA ---
const REFUND_KPIs = [
    { label: "Total Processed (30d)", value: "₦12,450,000", trend: "145 Refunds", icon: LuBanknote, iconColor: "#5cac7d" },
    { label: "Pending Approval", value: "₦1,200,000", trend: "14 Requests", icon: LuClock, iconColor: "yellow.400" },
    { label: "Dispute Reversals", value: "28", trend: "Admin Enforced", icon: LuUndo, iconColor: "blue.400" },
    { label: "Flagged / High-Risk", value: "5", trend: "Suspicious Activity", icon: LuShieldAlert, iconColor: "red.400" },
];

interface RefundRecord {
    id: string;
    orderId: string;
    customerName: string;
    shopName: string;
    amount: number;
    reason: string;
    status: "Processed" | "Pending" | "Rejected" | "Requires Action";
    date: string;
}

const MOCK_REFUNDS: RefundRecord[] = [
    { id: "RFD-9091", orderId: "ORD-1234", customerName: "Sarah Connor", shopName: "Tech Haven Hub", amount: 45000, reason: "Item profoundly damaged", status: "Pending", date: "Today, 09:12 AM" },
    { id: "RFD-9092", orderId: "ORD-1235", customerName: "Chuka Obi", shopName: "Urban Kicks NG", amount: 125000, reason: "Order never delivered", status: "Processed", date: "Yesterday, 14:30 PM" },
    { id: "RFD-9093", orderId: "ORD-1236", customerName: "Grace Okafor", shopName: "Minimalist Hub", amount: 15000, reason: "Wrong item color received", status: "Rejected", date: "Oct 22, 11:00 AM" },
    { id: "RFD-9094", orderId: "ORD-1237", customerName: "Wada Gift", shopName: "Glow Beauty Cosmetics", amount: 85000, reason: "Suspected payment fraud", status: "Requires Action", date: "Oct 20, 16:45 PM" },
    { id: "RFD-9095", orderId: "ORD-1238", customerName: "Aisha Bello", shopName: "Lagos Streetwear", amount: 25000, reason: "Size mismatch", status: "Processed", date: "Oct 18, 08:20 AM" },
    { id: "RFD-9096", orderId: "ORD-1239", customerName: "John Doe", shopName: "Mama's Kitchen Spices", amount: 8500, reason: "Expired items delivered", status: "Processed", date: "Oct 15, 12:10 PM" },
];

export default function RefundsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // Filter Logic
    const filteredRefunds = MOCK_REFUNDS.filter(refund => {
        const matchesSearch = refund.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              refund.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              refund.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              refund.orderId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || refund.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Requires Action": return { bg: "rgba(229, 62, 62, 0.1)", color: "red.400", border: "1px solid var(--chakra-colors-red-400)", icon: LuShieldAlert };
            case "Pending": return { bg: "rgba(236, 201, 75, 0.1)", color: "yellow.400", border: "1px solid var(--chakra-colors-yellow-400)", icon: LuClock };
            case "Processed": return { bg: "rgba(92, 172, 125, 0.1)", color: "#5cac7d", border: "1px solid #5cac7d", icon: LuCheck };
            case "Rejected": return { bg: "#111111", color: "#888888", border: "1px solid #333333", icon: LuX };
            default: return { bg: "#111111", color: "#888888", border: "1px solid #333333", icon: LuInfo };
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} direction={{ base: "column", md: "row" }} gap={4} mb={8}>
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight" mb={1}>
                        Platform Refunds
                    </Text>
                    <Text color="#888888" fontSize="sm">Manage customer chargebacks, order cancellations, and merchant debits.</Text>
                </Box>
                
                <Button display={{ base: "none", sm: "flex" }} bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A" }} gap={2} h="44px" px={6} fontWeight="bold">
                    <Icon as={LuDownload} color="#888888" strokeWidth="2.5" /> Export Ledger
                </Button>
            </Flex>

            {/* --- KPI GRID --- */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6} mb={8}>
                {REFUND_KPIs.map((kpi, idx) => (
                    <Box key={idx} bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex justify="space-between" align="start" mb={4}>
                            <Flex boxSize="40px" bg="#111111" border="1px solid #333333" rounded="none" align="center" justify="center">
                                <Icon as={kpi.icon} color={kpi.iconColor} boxSize="20px" strokeWidth="2.5" />
                            </Flex>
                            <Badge bg="#111111" color="#888888" border="1px solid #333333" rounded="none" px={2} py={1} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                {kpi.trend}
                            </Badge>
                        </Flex>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>{kpi.label}</Text>
                        <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{kpi.value}</Text>
                    </Box>
                ))}
            </SimpleGrid>

            {/* --- TOOLBAR (SEARCH & FILTERS) --- */}
            <Box bg="#0A0A0A" border="1px solid #1A1A1A" p={5} mb={8}>
                <Flex direction={{ base: "column", md: "row" }} gap={4} w="full" justify="space-between">
                    {/* Search */}
                    <Flex flex={1} maxW={{ md: "450px" }} align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input 
                            placeholder="Search by ID, Order, Customer, or Shop..." 
                            border="none" color="white" h="full" px={0} 
                            _focus={{ boxShadow: "none", outline: "none" }} 
                            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                    </Flex>
                    
                    {/* Filters */}
                    <Flex gap={4} w={{ base: "full", md: "auto" }} wrap={{ base: "wrap", sm: "nowrap" }}>
                        <Flex align="center" bg="#111111" border="1px solid #333333" px={3} h="44px" flexShrink={0} display={{ base: "none", sm: "flex" }}>
                            <Icon as={LuFilter} color="#888888" strokeWidth="2.5" />
                        </Flex>
                        <select style={nativeSelectStyle}>
                            <option value="30d" style={{ background: "#000000" }}>Last 30 Days</option>
                            <option value="7d" style={{ background: "#000000" }}>Last 7 Days</option>
                        </select>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={nativeSelectStyle}>
                            <option value="All" style={{ background: "#000000" }}>All Statuses</option>
                            <option value="Pending" style={{ background: "#000000" }}>Pending Approval</option>
                            <option value="Requires Action" style={{ background: "#000000" }}>Requires Action</option>
                            <option value="Processed" style={{ background: "#000000" }}>Processed</option>
                            <option value="Rejected" style={{ background: "#000000" }}>Rejected</option>
                        </select>
                    </Flex>
                </Flex>
            </Box>

            {/* --- REFUNDS LEDGER TABLE --- */}
            <Box bg="#0A0A0A" border="1px solid #1A1A1A" mb={8}>
                <ScrollArea.Root maxW="full">
                    <ScrollArea.Viewport pb={4}>
                        <Box minW="1100px">
                            
                            {/* Columns Header */}
                            <Grid templateColumns="1.2fr 1.5fr 1.5fr 1fr 1.2fr 100px" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid #333333">
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Refund ID & Date</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Customer & Order</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Debited Shop & Reason</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Amount</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Status</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Actions</Text>
                            </Grid>

                            {/* Table Rows */}
                            {filteredRefunds.length === 0 ? (
                                <Flex justify="center" align="center" py={16} direction="column">
                                    <Icon as={LuUndo} color="#333333" boxSize="40px" mb={4} strokeWidth="1.5" />
                                    <Text color="#888888" fontSize="lg" fontWeight="bold">No refund records found.</Text>
                                </Flex>
                            ) : (
                                <VStack align="stretch" gap={0}>
                                    {filteredRefunds.map((refund) => {
                                        const statusStyle = getStatusStyle(refund.status);
                                        
                                        return (
                                            <Grid 
                                                key={refund.id} 
                                                templateColumns="1.2fr 1.5fr 1.5fr 1fr 1.2fr 100px" gap={4} px={6} py={5} 
                                                borderBottom="1px solid #1A1A1A" 
                                                alignItems="start" 
                                                _hover={{ bg: "#111111" }} transition="background 0.2s"
                                            >
                                                {/* ID & Date */}
                                                <Box pt={1}>
                                                    <Text color="white" fontSize="sm" fontWeight="bold" mb={0.5} letterSpacing="tight">{refund.id}</Text>
                                                    <Text color="#888888" fontSize="xs">{refund.date}</Text>
                                                </Box>

                                                {/* Customer & Order */}
                                                <Flex align="center" gap={3}>
                                                    <Avatar.Root size="sm" rounded="full">
                                                        <Avatar.Fallback name={refund.customerName} bg="#111111" border="1px solid #333333" color="white" rounded="none" fontWeight="black" />
                                                    </Avatar.Root>
                                                    <Box>
                                                        <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight">{refund.customerName}</Text>
                                                        <Text color="#555555" fontSize="10px" fontFamily="monospace" mt={0.5}>{refund.orderId}</Text>
                                                    </Box>
                                                </Flex>

                                                {/* Shop & Reason */}
                                                <Box>
                                                    <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight" mb={1}>{refund.shopName}</Text>
                                                    <Text color="#A1A1AA" fontSize="xs"  fontStyle="italic">{refund.reason}</Text>
                                                </Box>

                                                {/* Amount */}
                                                <Box pt={1}>
                                                    <Text color="white" fontSize="md" fontWeight="black" letterSpacing="tight">
                                                        ₦{refund.amount.toLocaleString()}
                                                    </Text>
                                                </Box>

                                                {/* Status */}
                                                <Box pt={1}>
                                                    <Badge {...statusStyle} px={2.5} py={1} rounded="none" fontSize="9px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" display="inline-flex" alignItems="center" gap={1.5}>
                                                        <Icon as={statusStyle.icon} boxSize="10px" strokeWidth="3" />
                                                        {refund.status}
                                                    </Badge>
                                                </Box>
                                                
                                                {/* Actions */}
                                                <Flex justify="flex-end" gap={2} pt={1}>
                                                    <IconButton aria-label="Review Request" title="Review Details" size="sm" h="32px" w="32px" bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                                        <Icon as={LuEye} strokeWidth="2.5" boxSize="14px" />
                                                    </IconButton>
                                                    
                                                    {refund.status === "Pending" || refund.status === "Requires Action" ? (
                                                        <IconButton aria-label="Approve Refund" title="Approve & Process" size="sm" h="32px" w="32px" bg="rgba(92, 172, 125, 0.1)" border="1px solid var(--chakra-colors-green-400)" color="#5cac7d" rounded="none" _hover={{ bg: "#5cac7d", color: "black" }}>
                                                            <Icon as={LuCheck} strokeWidth="3" boxSize="14px" />
                                                        </IconButton>
                                                    ) : (
                                                        <IconButton aria-label="Audit Transaction" title="View Transaction Ledger" size="sm" h="32px" w="32px" variant="outline" borderColor="#333333" color="#888888" rounded="none" _hover={{ bg: "#111111", color: "white" }}>
                                                            <Icon as={LuArrowUpRight} strokeWidth="2.5" boxSize="14px" />
                                                        </IconButton>
                                                    )}
                                                </Flex>

                                            </Grid>
                                        );
                                    })}
                                </VStack>
                            )}
                        </Box>
                    </ScrollArea.Viewport>
                    
                    {/* Horizontal Scrollbar */}
                    <ScrollArea.Scrollbar orientation="horizontal" bg="#0A0A0A" h="6px" p={0}>
                        <ScrollArea.Thumb bg="#1A1A1A" rounded="none" _hover={{ bg: "#333333" }} />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </Box>

        </Box>
    );
}
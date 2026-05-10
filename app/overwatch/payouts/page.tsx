"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Grid, SimpleGrid, Icon, Badge, Button, Avatar, Input, IconButton, VStack, ScrollArea
} from "@chakra-ui/react";
import { 
    LuSearch, LuFilter, LuWallet, LuLandmark, LuClock, 
    LuCheck, LuInfo, LuRefreshCw, LuEye, LuEllipsisVertical, LuDownload
} from "react-icons/lu";

// --- REUSABLE STYLES ---
const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px", minWidth: "160px" };

// --- MOCK DATA ---
const PAYOUT_KPIs = [
    { label: "Total Disbursed (30d)", value: "₦412,500,000", trend: "Successful", icon: LuLandmark, iconColor: "#5cac7d" },
    { label: "Pending Settlements", value: "₦18,200,000", trend: "12 Merchants", icon: LuClock, iconColor: "yellow.400" },
    { label: "Failed Transfers", value: "₦3,400,000", trend: "3 Requires Action", icon: LuInfo, iconColor: "red.400" },
    { label: "Next Batch Payout", value: "Today, 4:00 PM", trend: "Automated", icon: LuRefreshCw, iconColor: "blue.400" },
];

interface PayoutRecord {
    id: string;
    merchantName: string;
    amount: number;
    destination: string;
    accountName: string;
    status: "Completed" | "Pending" | "Processing" | "Failed";
    date: string;
    reference: string;
}

const MOCK_PAYOUTS: PayoutRecord[] = [
    { id: "PAY-9041", merchantName: "Urban Kicks NG", amount: 4500000, destination: "GTBank •••• 4921", accountName: "Urban Kicks Ltd", status: "Completed", date: "Today, 10:24 AM", reference: "REF-UK-091" },
    { id: "PAY-9042", merchantName: "Lagos Streetwear", amount: 1200000, destination: "Zenith •••• 1102", accountName: "Chuka Obi", status: "Pending", date: "Today, 09:15 AM", reference: "REF-LS-092" },
    { id: "PAY-9043", merchantName: "Minimalist Hub", amount: 850000, destination: "Access •••• 9921", accountName: "Minimalist Hub Int.", status: "Processing", date: "Yesterday, 04:30 PM", reference: "REF-MH-093" },
    { id: "PAY-9044", merchantName: "Tech Haven", amount: 3400000, destination: "UBA •••• 3322", accountName: "Tech Haven Global", status: "Failed", date: "Yesterday, 02:11 PM", reference: "REF-TH-094" },
    { id: "PAY-9045", merchantName: "Mama's Kitchen", amount: 210000, destination: "FirstBank •••• 0019", accountName: "Grace Okafor", status: "Completed", date: "Oct 24, 08:00 AM", reference: "REF-MK-095" },
    { id: "PAY-9046", merchantName: "Glow Cosmetics", amount: 1150000, destination: "Moniepoint •••• 8821", accountName: "Glow Beauty", status: "Completed", date: "Oct 24, 08:00 AM", reference: "REF-GC-096" },
];

export default function PayoutsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // Filter Logic
    const filteredPayouts = MOCK_PAYOUTS.filter(payout => {
        const matchesSearch = payout.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              payout.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              payout.reference.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || payout.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Completed": return { bg: "rgba(92, 172, 125, 0.1)", color: "#5cac7d", border: "1px solid #5cac7d", icon: LuCheck };
            case "Pending": return { bg: "rgba(236, 201, 75, 0.1)", color: "yellow.400", border: "1px solid var(--chakra-colors-yellow-400)", icon: LuClock };
            case "Processing": return { bg: "rgba(66, 153, 225, 0.1)", color: "blue.400", border: "1px solid var(--chakra-colors-blue-400)", icon: LuRefreshCw };
            case "Failed": return { bg: "rgba(229, 62, 62, 0.1)", color: "red.400", border: "1px solid var(--chakra-colors-red-400)", icon: LuInfo };
            default: return { bg: "#111111", color: "#888888", border: "1px solid #333333", icon: LuWallet };
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} direction={{ base: "column", md: "row" }} gap={4} mb={8}>
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight" mb={1}>
                        Financial Settlements
                    </Text>
                    <Text color="#888888" fontSize="sm">Manage merchant payouts, review failed bank transfers, and audit escrow releases.</Text>
                </Box>
                
                <Flex gap={3}>
                    <Button bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A" }} gap={2} h="44px" px={6} fontWeight="bold">
                        <Icon as={LuDownload} color="#888888" strokeWidth="2.5" /> Export CSV
                    </Button>
                    <Button bg="white" color="black" rounded="none" border="none" _hover={{ bg: "#E5E5E5" }} gap={2} h="44px" px={6} fontWeight="bold">
                        <Icon as={LuCheck} strokeWidth="3" /> Process Pending
                    </Button>
                </Flex>
            </Flex>

            {/* --- KPI GRID --- */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6} mb={8}>
                {PAYOUT_KPIs.map((kpi, idx) => (
                    <Box key={idx} bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex justify="space-between" align="start" mb={4}>
                            <Flex boxSize="40px" bg="#111111" border="1px solid #333333" rounded="none" align="center" justify="center">
                                <Icon as={kpi.icon} color={kpi.iconColor} boxSize="20px" strokeWidth="2.5" />
                            </Flex>
                            <Badge bg="#111111" color={kpi.iconColor} border="1px solid #333333" rounded="none" px={2} py={1} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
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
                            placeholder="Search by merchant, payout ID, or reference..." 
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
                            <option value="24h" style={{ background: "#000000" }}>Last 24 Hours</option>
                        </select>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={nativeSelectStyle}>
                            <option value="All" style={{ background: "#000000" }}>All Statuses</option>
                            <option value="Completed" style={{ background: "#000000" }}>Completed</option>
                            <option value="Pending" style={{ background: "#000000" }}>Pending</option>
                            <option value="Processing" style={{ background: "#000000" }}>Processing</option>
                            <option value="Failed" style={{ background: "#000000" }}>Failed / Retrying</option>
                        </select>
                    </Flex>
                </Flex>
            </Box>

            {/* --- SETTLEMENTS LEDGER TABLE --- */}
            <Box bg="#0A0A0A" border="1px solid #1A1A1A" mb={8}>
                <ScrollArea.Root maxW="full">
                    <ScrollArea.Viewport pb={4}>
                        <Box minW="1100px">
                            
                            {/* Columns Header */}
                            <Grid templateColumns="2fr 1.5fr 2fr 1.5fr 1fr 100px" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid #333333">
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Merchant Details</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Payout Info</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Destination Bank</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Settlement Amount</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Status</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Actions</Text>
                            </Grid>

                            {/* Table Rows */}
                            {filteredPayouts.length === 0 ? (
                                <Flex justify="center" align="center" py={16} direction="column">
                                    <Icon as={LuLandmark} color="#333333" boxSize="40px" mb={4} strokeWidth="1.5" />
                                    <Text color="#888888" fontSize="lg" fontWeight="bold">No payout records found.</Text>
                                </Flex>
                            ) : (
                                <VStack align="stretch" gap={0}>
                                    {filteredPayouts.map((payout) => {
                                        const statusStyle = getStatusStyle(payout.status);
                                        
                                        return (
                                            <Grid 
                                                key={payout.id} 
                                                templateColumns="2fr 1.5fr 2fr 1.5fr 1fr 100px" gap={4} px={6} py={5} 
                                                borderBottom="1px solid #1A1A1A" 
                                                alignItems="center" 
                                                _hover={{ bg: "#111111" }} transition="background 0.2s"
                                            >
                                                {/* Merchant */}
                                                <Flex align="center" gap={4}>
                                                    <Avatar.Root size="md" rounded="full">
                                                        <Avatar.Fallback name={payout.merchantName} bg="#111111" border="1px solid #333333" color="white" rounded="full" fontWeight="black" />
                                                    </Avatar.Root>
                                                    <Box>
                                                        <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight" mb={0.5}>{payout.merchantName}</Text>
                                                        <Text color="#555555" fontSize="10px" fontFamily="monospace" mt={1}>MERCH: {payout.merchantName.substring(0,3).toUpperCase()}-{payout.id.split('-')[1]}</Text>
                                                    </Box>
                                                </Flex>

                                                {/* Payout Info */}
                                                <Box>
                                                    <Text color="white" fontSize="sm" fontWeight="bold" mb={1}>{payout.id}</Text>
                                                    <Text color="#888888" fontSize="xs">{payout.date}</Text>
                                                    <Text color="#555555" fontSize="10px" fontFamily="monospace" mt={1}>{payout.reference}</Text>
                                                </Box>

                                                {/* Destination */}
                                                <Box>
                                                    <Flex align="center" gap={2} mb={1}>
                                                        <Icon as={LuLandmark} color="#888888" boxSize="14px" />
                                                        <Text color="white" fontSize="sm" fontWeight="bold">{payout.destination}</Text>
                                                    </Flex>
                                                    <Text color="#888888" fontSize="xs">{payout.accountName}</Text>
                                                </Box>

                                                {/* Amount */}
                                                <Box>
                                                    <Text color="white" fontSize="md" fontWeight="black" letterSpacing="tight">
                                                        ₦{payout.amount.toLocaleString()}
                                                    </Text>
                                                </Box>

                                                {/* Status */}
                                                <Box>
                                                    <Flex align="center" gap={2} {...statusStyle} px={2.5} py={1.5} rounded="none" display="inline-flex">
                                                        <Icon as={statusStyle.icon} boxSize="12px" strokeWidth="3" />
                                                        <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{payout.status}</Text>
                                                    </Flex>
                                                </Box>
                                                
                                                {/* Actions */}
                                                <Flex justify="flex-end" gap={2}>
                                                    <IconButton aria-label="View Receipt" title="View Details" size="sm" h="36px" w="36px" bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                                        <Icon as={LuEye} strokeWidth="2.5" />
                                                    </IconButton>
                                                    {payout.status === "Failed" ? (
                                                        <IconButton aria-label="Retry Payout" title="Retry Failed Transfer" size="sm" h="36px" w="36px" bg="rgba(229, 62, 62, 0.1)" border="1px solid var(--chakra-colors-red-400)" color="red.400" rounded="none" _hover={{ bg: "red.400", color: "black" }}>
                                                            <Icon as={LuRefreshCw} strokeWidth="2.5" />
                                                        </IconButton>
                                                    ) : (
                                                        <IconButton aria-label="More Actions" size="sm" h="36px" w="36px" variant="outline" borderColor="#333333" color="#888888" rounded="none" _hover={{ bg: "#111111", color: "white" }}>
                                                            <Icon as={LuEllipsisVertical} strokeWidth="2.5" />
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
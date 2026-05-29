"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Grid, SimpleGrid, Icon, Badge, Button, Avatar, Input, IconButton, VStack, ScrollArea, Textarea
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LuSearch, LuFilter, LuScale, LuShieldAlert, LuMessageSquare, 
    LuClock, LuCheck, LuEye, LuDownload, LuArrowUpRight, LuInfo, LuX
} from "react-icons/lu";

// --- REUSABLE STYLES ---
const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px", minWidth: "160px" };

// --- MOCK DATA ---
const DISPUTE_KPIs = [
    { label: "Active Disputes", value: "34", trend: "Needs arbitration", icon: LuScale, iconColor: "blue.400" },
    { label: "Escalated to Admin", value: "8", trend: "High priority", icon: LuShieldAlert, iconColor: "red.400" },
    { label: "Funds on Hold (Escrow)", value: "₦2,450,000", trend: "Locked pending resolution", icon: LuClock, iconColor: "yellow.400" },
    { label: "Avg. Resolution Time", value: "3.2 Days", trend: "-12 hrs vs last month", icon: LuCheck, iconColor: "#5cac7d" },
];

interface DisputeRecord {
    id: string;
    buyerName: string;
    shopName: string;
    orderId: string;
    amount: number;
    reason: string;
    status: "Escalated" | "Awaiting Merchant" | "Awaiting Buyer" | "Resolved";
    filedAt: string;
}

const INITIAL_DISPUTES: DisputeRecord[] = [
    { id: "DSP-8801", buyerName: "Sarah Connor", shopName: "Tech Haven Hub", orderId: "ORD-9912", amount: 245000, reason: "Item profoundly damaged on arrival", status: "Escalated", filedAt: "Today, 09:12 AM" },
    { id: "DSP-8802", buyerName: "Chuka Obi", shopName: "Urban Kicks NG", orderId: "ORD-9984", amount: 85000, reason: "Wrong shoe size delivered", status: "Awaiting Merchant", filedAt: "Yesterday, 14:30 PM" },
    { id: "DSP-8803", buyerName: "Grace Okafor", shopName: "Minimalist Hub", orderId: "ORD-9921", amount: 120000, reason: "Never received the package", status: "Escalated", filedAt: "Oct 22, 11:00 AM" },
    { id: "DSP-8804", buyerName: "Wada Gift", shopName: "Glow Beauty Cosmetics", orderId: "ORD-9905", amount: 15500, reason: "Fake / Counterfeit product", status: "Awaiting Buyer", filedAt: "Oct 20, 16:45 PM" },
    { id: "DSP-8805", buyerName: "Aisha Bello", shopName: "Lagos Streetwear", orderId: "ORD-9888", amount: 45000, reason: "Quality not as described", status: "Resolved", filedAt: "Oct 18, 08:20 AM" },
    { id: "DSP-8806", buyerName: "John Doe", shopName: "Mama's Kitchen Spices", orderId: "ORD-9811", amount: 8500, reason: "Expired items delivered", status: "Resolved", filedAt: "Oct 15, 12:10 PM" },
];

const getStatusStyle = (status: string) => {
    switch (status) {
        case "Escalated": return { bg: "rgba(229, 62, 62, 0.1)", color: "red.400", border: "1px solid var(--chakra-colors-red-400)", icon: LuShieldAlert };
        case "Awaiting Merchant": return { bg: "rgba(236, 201, 75, 0.1)", color: "yellow.400", border: "1px solid var(--chakra-colors-yellow-400)", icon: LuClock };
        case "Awaiting Buyer": return { bg: "rgba(66, 153, 225, 0.1)", color: "blue.400", border: "1px solid var(--chakra-colors-blue-400)", icon: LuMessageSquare };
        case "Resolved": return { bg: "rgba(92, 172, 125, 0.1)", color: "#5cac7d", border: "1px solid #5cac7d", icon: LuCheck };
        default: return { bg: "#111111", color: "#888888", border: "1px solid #333333", icon: LuInfo };
    }
};

// --- DISPUTE DETAILS DRAWER ---
const DisputeDetailsDrawer = ({ 
    dispute, onClose, onResolve 
}: { 
    dispute: DisputeRecord | null; onClose: () => void; onResolve: (id: string) => void 
}) => {
    const [isResolving, setIsResolving] = useState(false);
    const [message, setMessage] = useState("");
    const [isMessaging, setIsMessaging] = useState(false);

    if (!dispute) return null;
    const statusStyle = getStatusStyle(dispute.status);

    const handleResolve = () => {
        setIsResolving(true);
        setTimeout(() => {
            onResolve(dispute.id);
            setIsResolving(false);
            onClose();
        }, 1000);
    };

    const handleSendMessage = () => {
        if (!message.trim()) return;
        setIsMessaging(true);
        setTimeout(() => {
            setIsMessaging(false);
            setMessage("");
            // In a real app, this would append to a chat log
        }, 800);
    };

    return (
        <AnimatePresence>
            {dispute && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
                        onClick={onClose}
                    />
                    <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "450px" }} pointerEvents="none">
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
                        >
                            <Box w="100%" h="100%" bg="#0A0A0A" borderLeft="1px solid" borderColor="#1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                                
                                {/* Header */}
                                <Flex justify="space-between" align="center" px={6} pt={8} pb={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#111111">
                                    <Box>
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Dispute Arbitration</Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">{dispute.id}</Text>
                                    </Box>
                                    <IconButton aria-label="Close" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                {/* Content */}
                                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <VStack w="full" gap={6} align="stretch">
                                        
                                        {/* Status & Escrow Amount */}
                                        <Flex justify="space-between" align="center" bg="#111111" p={4} border="1px solid #1A1A1A">
                                            <Box>
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Escrow Amount</Text>
                                                <Text color="white" fontSize="2xl" fontWeight="black" fontFamily="monospace" letterSpacing="tight">₦{dispute.amount.toLocaleString()}</Text>
                                            </Box>
                                            <Flex align="center" gap={2} {...statusStyle} px={2.5} py={1.5} rounded="none">
                                                <Icon as={statusStyle.icon} boxSize="14px" strokeWidth="3" />
                                                <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{dispute.status}</Text>
                                            </Flex>
                                        </Flex>

                                        {/* Parties */}
                                        <Grid templateColumns="1fr 1fr" gap={4}>
                                            <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Complainant</Text>
                                                <Text color="white" fontWeight="bold" fontSize="sm">{dispute.buyerName}</Text>
                                                <Text color="#555555" fontSize="xs" mt={1}>Buyer</Text>
                                            </Box>
                                            <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Defendant</Text>
                                                <Text color="white" fontWeight="bold" fontSize="sm">{dispute.shopName}</Text>
                                                <Text color="#555555" fontSize="xs" mt={1}>Merchant</Text>
                                            </Box>
                                        </Grid>

                                        {/* Issue Details */}
                                        <Box bg="#111111" p={5} border="1px solid #1A1A1A">
                                            <Flex justify="space-between" mb={4} pb={4} borderBottom="1px dashed #333333">
                                                <Text color="#888888" fontSize="sm">Order ID</Text>
                                                <Text color="white" fontWeight="bold" fontFamily="monospace">{dispute.orderId}</Text>
                                            </Flex>
                                            <Text color="#888888" fontSize="sm" mb={1}>Stated Reason</Text>
                                           <Text color="white" fontWeight="bold" fontStyle="italic">&quot;{dispute.reason}&quot;</Text>
                                            <Text color="#555555" fontSize="xs" mt={4} textAlign="right">Filed: {dispute.filedAt}</Text>
                                        </Box>

                                        {/* Admin Action Box (If not resolved) */}
                                        {dispute.status !== "Resolved" && (
                                            <Box>
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Message Parties</Text>
                                                <Textarea 
                                                    placeholder="Add an admin note or message to both parties..." 
                                                    bg="#111111" border="1px solid #333333" color="white" rounded="none" p={3} minH="100px"
                                                    _focus={{ borderColor: "white", outline: "none" }}
                                                    value={message} onChange={(e) => setMessage(e.target.value)}
                                                />
                                                <Button 
                                                    mt={2} w="full" size="sm" variant="outline" borderColor="#333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A" }}
                                                    onClick={handleSendMessage} loading={isMessaging} disabled={!message.trim()}
                                                >
                                                    <Icon as={LuMessageSquare} mr={2} /> Send Admin Message
                                                </Button>
                                            </Box>
                                        )}
                                    </VStack>
                                </Box>

                                {/* Footer Actions */}
                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                                    <Button variant="outline" borderColor="#333333" onClick={onClose} h="44px" rounded="none" color="#888888" bg="#0A0A0A" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        Close
                                    </Button>
                                    <Button 
                                        flex="1" h="44px" bg={dispute.status === "Resolved" ? "#333333" : "white"} color={dispute.status === "Resolved" ? "#888888" : "black"} 
                                        rounded="none" fontWeight="bold" _hover={{ bg: dispute.status === "Resolved" ? "#333333" : "#E5E5E5" }}
                                        onClick={handleResolve} loading={isResolving} loadingText="Resolving..."
                                        disabled={dispute.status === "Resolved"}
                                    >
                                        {dispute.status === "Resolved" ? "Case Closed" : "Force Resolve Case"}
                                    </Button>
                                </Flex>

                            </Box>
                        </motion.div>
                    </Box>
                </>
            )}
        </AnimatePresence>
    );
};

export default function DisputesPage() {
    // --- STATE ---
    const [disputes, setDisputes] = useState<DisputeRecord[]>(INITIAL_DISPUTES);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // Modal & Loading States
    const [selectedDispute, setSelectedDispute] = useState<DisputeRecord | null>(null);
    const [isExporting, setIsExporting] = useState(false);

    // --- ACTIONS ---
    const handleExportLedger = () => {
        setIsExporting(true);
        setTimeout(() => {
            const headers = ["Dispute ID", "Buyer", "Shop", "Order ID", "Amount", "Reason", "Status", "Date Filed"];
            const csvRows = filteredDisputes.map(d => 
                [d.id, `"${d.buyerName}"`, `"${d.shopName}"`, d.orderId, d.amount, `"${d.reason}"`, d.status, `"${d.filedAt}"`].join(",")
            );
            const csvString = [headers.join(","), ...csvRows].join("\n");
            
            const blob = new Blob([csvString], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', 'dispute_ledger.csv');
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            setIsExporting(false);
        }, 800);
    };

    const handleResolveDispute = (id: string) => {
        setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: "Resolved" } : d));
    };

    // --- FILTER LOGIC ---
   const filteredDisputes = disputes.filter(dispute => {
        const matchesSearch = dispute.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              dispute.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              dispute.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              dispute.orderId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || dispute.status.includes(statusFilter);
        return matchesSearch && matchesStatus;
    });
   

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} direction={{ base: "column", md: "row" }} gap={4} mb={8}>
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight" mb={1}>
                        Dispute Arbitration
                    </Text>
                    <Text color="#888888" fontSize="sm">Mediate buyer-merchant conflicts, review evidence, and manage escrow releases.</Text>
                </Box>
                
                <Button 
                    onClick={handleExportLedger} loading={isExporting} loadingText="Exporting..."
                    display={{ base: "none", sm: "flex" }} bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A" }} gap={2} h="44px" px={6} fontWeight="bold"
                >
                    <Icon as={LuDownload} color="#888888" strokeWidth="2.5" /> Export Ledger
                </Button>
            </Flex>

            {/* --- KPI GRID --- */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6} mb={8}>
                {DISPUTE_KPIs.map((kpi, idx) => (
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
                            placeholder="Search by ID, Order, Buyer, or Merchant..." 
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
                            <option value="Escalated" style={{ background: "#000000" }}>Escalated to Admin</option>
                            <option value="Awaiting" style={{ background: "#000000" }}>Awaiting Parties</option>
                            <option value="Resolved" style={{ background: "#000000" }}>Resolved</option>
                        </select>
                    </Flex>
                </Flex>
            </Box>

            {/* --- DISPUTES LEDGER TABLE --- */}
            <Box bg="#0A0A0A" border="1px solid #1A1A1A" mb={8}>
                <ScrollArea.Root maxW="full">
                    <ScrollArea.Viewport pb={4}>
                        <Box minW="1100px">
                            
                            {/* Columns Header */}
                            <Grid templateColumns="1.5fr 1.5fr 1.5fr 2fr 1.2fr 100px" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid #333333">
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Dispute ID & Date</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Complainant (Buyer)</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Defendant (Shop)</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Dispute Reason & Value</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Arbitration Status</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Actions</Text>
                            </Grid>

                            {/* Table Rows */}
                            {filteredDisputes.length === 0 ? (
                                <Flex justify="center" align="center" py={16} direction="column">
                                    <Icon as={LuScale} color="#333333" boxSize="40px" mb={4} strokeWidth="1.5" />
                                    <Text color="#888888" fontSize="lg" fontWeight="bold">No active disputes found.</Text>
                                </Flex>
                            ) : (
                                <VStack align="stretch" gap={0}>
                                    {filteredDisputes.map((dispute) => {
                                        const statusStyle = getStatusStyle(dispute.status);
                                        
                                        return (
                                            <Grid 
                                                onClick={() => setSelectedDispute(dispute)}
                                                key={dispute.id} 
                                                templateColumns="1.5fr 1.5fr 1.5fr 2fr 1.2fr 100px" gap={4} px={6} py={5} 
                                                borderBottom="1px solid #1A1A1A" 
                                                alignItems="start" cursor="pointer"
                                                _hover={{ bg: "#111111" }} transition="background 0.2s"
                                            >
                                                {/* ID & Date */}
                                                <Box pt={1}>
                                                    <Text color="white" fontSize="sm" fontWeight="bold" mb={0.5}>{dispute.id}</Text>
                                                    <Text color="#888888" fontSize="xs">{dispute.filedAt}</Text>
                                                </Box>

                                                {/* Complainant (Buyer) */}
                                                <Flex align="center" gap={3}>
                                                    <Avatar.Root size="sm" rounded="full">
                                                        <Avatar.Fallback name={dispute.buyerName} bg="#111111" border="1px solid #333333" color="white" rounded="none" fontWeight="black" />
                                                    </Avatar.Root>
                                                    <Box>
                                                        <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight">{dispute.buyerName}</Text>
                                                        <Text color="#555555" fontSize="10px" fontFamily="monospace" mt={0.5}>Customer</Text>
                                                    </Box>
                                                </Flex>

                                                {/* Defendant (Shop) */}
                                                <Flex align="center" gap={3}>
                                                    <Avatar.Root size="sm" rounded="full">
                                                        <Avatar.Fallback name={dispute.shopName} bg="#111111" border="1px solid #333333" color="white" rounded="none" fontWeight="black" />
                                                    </Avatar.Root>
                                                    <Box>
                                                        <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight" >{dispute.shopName}</Text>
                                                        <Text color="#555555" fontSize="10px" fontFamily="monospace" mt={0.5}>Merchant</Text>
                                                    </Box>
                                                </Flex>

                                                {/* Reason & Value */}
                                                <Box>
                                                    <Text color="white" fontSize="sm" fontWeight="black" letterSpacing="tight" mb={1}>
                                                        ₦{dispute.amount.toLocaleString()} <Text as="span" color="#888888" fontSize="10px" fontWeight="bold" ml={1}>({dispute.orderId})</Text>
                                                    </Text>
                                                    <Text color="#A1A1AA" fontSize="xs"  fontStyle="italic">{dispute.reason}</Text>
                                                </Box>

                                                {/* Status */}
                                                <Box pt={1}>
                                                    <Badge {...statusStyle} px={2.5} py={1} rounded="none" fontSize="9px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" display="inline-flex" alignItems="center" gap={1.5}>
                                                        <Icon as={statusStyle.icon} boxSize="10px" strokeWidth="3" />
                                                        {dispute.status}
                                                    </Badge>
                                                </Box>
                                                
                                                {/* Actions */}
                                                <Flex justify="flex-end" gap={2} pt={1}>
                                                    <IconButton aria-label="Review Evidence" title="Review Case" size="sm" h="32px" w="32px" bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                                        <Icon as={LuEye} strokeWidth="2.5" boxSize="14px" />
                                                    </IconButton>
                                                    {dispute.status === "Escalated" ? (
                                                        <IconButton aria-label="Intervene" title="Admin Intervention" size="sm" h="32px" w="32px" bg="rgba(229, 62, 62, 0.1)" border="1px solid var(--chakra-colors-red-400)" color="red.400" rounded="none" _hover={{ bg: "red.400", color: "black" }}>
                                                            <Icon as={LuArrowUpRight} strokeWidth="3" boxSize="14px" />
                                                        </IconButton>
                                                    ) : dispute.status !== "Resolved" ? (
                                                        <IconButton aria-label="Send Message" title="Message Parties" size="sm" h="32px" w="32px" variant="outline" borderColor="#333333" color="#888888" rounded="none" _hover={{ bg: "#111111", color: "white" }}>
                                                            <Icon as={LuMessageSquare} strokeWidth="2.5" boxSize="14px" />
                                                        </IconButton>
                                                    ) : (
                                                        <IconButton aria-label="Archived" title="Case Closed" size="sm" h="32px" w="32px" variant="ghost" color="#555555" rounded="none" cursor="not-allowed">
                                                            <Icon as={LuCheck} strokeWidth="2.5" boxSize="14px" />
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

            {/* --- Modals --- */}
            <DisputeDetailsDrawer 
                dispute={selectedDispute} 
                onClose={() => setSelectedDispute(null)} 
                onResolve={handleResolveDispute} 
            />

        </Box>
    );
}
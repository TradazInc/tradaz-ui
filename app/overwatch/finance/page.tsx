"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Button, Icon, Grid, Badge, VStack, SimpleGrid, 
    Input, IconButton
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LuWallet, LuTrendingUp, LuArrowDownRight, LuArrowUpRight, 
    LuDownload, LuSearch, LuClock, LuCheck, LuX 
} from "react-icons/lu";

// --- MOCK FINANCE DATA ---
const KPI_DATA = [
    { label: "Total Processed (GMV)", value: "₦45,250,000", trend: "+12.5%", isPositive: true, icon: LuTrendingUp },
    { label: "Platform Revenue (3%)", value: "₦1,357,500", trend: "+15.2%", isPositive: true, icon: LuWallet },
    { label: "Pending Payouts", value: "₦4,850,000", trend: "-2.4%", isPositive: false, icon: LuClock },
];

export interface PayoutRecord {
    id: string;
    store: string;
    owner: string;
    amount: string;
    fee: string;
    status: "pending" | "completed" | "failed";
    date: string;
    type: "payouts" | "platform_fees" | "refunds";
}

const INITIAL_PAYOUTS: PayoutRecord[] = [
    { id: "TRX-8923", store: "Urban Kicks", owner: "Wada Gift", amount: "₦1,250,000", fee: "₦37,500", status: "pending", date: "Today, 10:45 AM", type: "payouts" },
    { id: "TRX-8922", store: "OGDior", owner: "David O.", amount: "₦850,000", fee: "₦25,500", status: "completed", date: "Yesterday, 04:20 PM", type: "payouts" },
    { id: "TRX-8921", store: "Tech Haven", owner: "Sarah C.", amount: "₦3,400,000", fee: "₦102,000", status: "completed", date: "Mar 28, 09:15 AM", type: "payouts" },
    { id: "TRX-8920", store: "Glamour Beauty", owner: "Amina Y.", amount: "₦120,000", fee: "₦3,600", status: "failed", date: "Mar 27, 02:30 PM", type: "refunds" },
    { id: "TRX-8919", store: "Urban Kicks", owner: "Wada Gift", amount: "₦950,000", fee: "₦28,500", status: "completed", date: "Mar 25, 11:00 AM", type: "platform_fees" },
];

const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px" };
const inputStyles = { bg: "#000000", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 4, _focus: { outline: "none", borderColor: "white", boxShadow: "none" }, _hover: { borderColor: "#555555" } };
const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };


// --- DETAILS MODAL ---
const TransactionDetailsModal = ({ trx, onClose }: { trx: PayoutRecord | null; onClose: () => void }) => {
    return (
        <AnimatePresence>
            {trx && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
                        onClick={onClose}
                    />
                    <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "400px" }} pointerEvents="none">
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
                        >
                            <Box w="100%" h="100%" bg="#0A0A0A" borderLeft="1px solid" borderColor="#1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                                <Flex justify="space-between" align="center" px={6} pt={8} pb={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#111111">
                                    <Box>
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Transaction Details</Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">{trx.id}</Text>
                                    </Box>
                                    <IconButton aria-label="Close" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <VStack w="full" gap={6} align="stretch">
                                        <Box bg="#111111" p={5} border="1px solid #1A1A1A" textAlign="center">
                                            <Text color="#888888" fontSize="xs" textTransform="uppercase" fontWeight="bold" letterSpacing="wider" mb={1}>Gross Amount</Text>
                                            <Text color="white" fontSize="3xl" fontWeight="black" fontFamily="monospace">{trx.amount}</Text>
                                            <Badge mt={3} bg={trx.status === "completed" ? "rgba(92, 172, 125, 0.1)" : trx.status === "pending" ? "rgba(236, 201, 75, 0.1)" : "rgba(229, 62, 62, 0.1)"} color={trx.status === "completed" ? "#5cac7d" : trx.status === "pending" ? "orange.400" : "red.400"} border={`1px solid ${trx.status === "completed" ? "#5cac7d" : trx.status === "pending" ? "var(--chakra-colors-orange-400)" : "var(--chakra-colors-red-400)"}`} rounded="none" px={2} py={1} textTransform="uppercase">
                                                {trx.status}
                                            </Badge>
                                        </Box>

                                        <Box bg="#111111" p={5} border="1px solid #1A1A1A">
                                            <VStack align="stretch" gap={4}>
                                                <Box>
                                                    <Text color="#888888" fontSize="xs" mb={1}>Store</Text>
                                                    <Text color="white" fontWeight="bold">{trx.store}</Text>
                                                </Box>
                                                <Box>
                                                    <Text color="#888888" fontSize="xs" mb={1}>Store Owner</Text>
                                                    <Text color="white" fontWeight="bold">{trx.owner}</Text>
                                                </Box>
                                                <Box>
                                                    <Text color="#888888" fontSize="xs" mb={1}>Platform Fee Deducted</Text>
                                                    <Text color="white" fontWeight="bold" fontFamily="monospace">{trx.fee}</Text>
                                                </Box>
                                                <Box>
                                                    <Text color="#888888" fontSize="xs" mb={1}>Timestamp</Text>
                                                    <Text color="white" fontWeight="bold">{trx.date}</Text>
                                                </Box>
                                            </VStack>
                                        </Box>
                                    </VStack>
                                </Box>
                                
                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" bg="#111111">
                                    <Button w="full" bg="white" color="black" rounded="none" fontWeight="bold" onClick={onClose} _hover={{ bg: "#E5E5E5" }}>
                                        Close Details
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

// --- MANUAL PAYOUT MODAL ---
const ManualPayoutModal = ({ 
    isOpen, 
    onClose, 
    onSubmit 
}: { 
    isOpen: boolean; 
    onClose: () => void; 
    onSubmit: (data: { store: string; owner: string; amount: string }) => void 
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ store: '', owner: '', amount: '' });

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            onSubmit(formData);
            setIsLoading(false);
            setFormData({ store: '', owner: '', amount: '' });
            onClose();
        }, 800);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
                        onClick={onClose}
                    />
                    <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "400px", md: "450px" }} pointerEvents="none">
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
                        >
                            <Box w="100%" h="100%" bg="#0A0A0A" borderLeft="1px solid" borderColor="#1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                                <Flex justify="space-between" align="center" px={6} pt={8} pb={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#111111">
                                    <Box>
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Manual Action</Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">Initiate Payout</Text>
                                    </Box>
                                    <IconButton aria-label="Close" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <VStack w="full" gap={6} align="stretch">
                                        <Box>
                                            <Text as="label" {...labelStyles}>Store Name <Text as="span" color="red.400">*</Text></Text>
                                            <Input placeholder="e.g. Urban Kicks" value={formData.store} onChange={e => setFormData({...formData, store: e.target.value})} {...inputStyles} />
                                        </Box>
                                        <Box>
                                            <Text as="label" {...labelStyles}>Owner Name <Text as="span" color="red.400">*</Text></Text>
                                            <Input placeholder="e.g. David O." value={formData.owner} onChange={e => setFormData({...formData, owner: e.target.value})} {...inputStyles} />
                                        </Box>
                                        <Box>
                                            <Text as="label" {...labelStyles}>Amount (₦) <Text as="span" color="red.400">*</Text></Text>
                                            <Input type="number" placeholder="0.00" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} {...inputStyles} />
                                        </Box>
                                    </VStack>
                                </Box>

                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                                    <Button variant="outline" borderColor="#333333" onClick={onClose} h="44px" rounded="none" color="#888888" bg="#0A0A0A" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        Cancel
                                    </Button>
                                    <Button flex="1" h="44px" bg="white" color="black" rounded="none" fontWeight="bold" onClick={handleSave} loading={isLoading} loadingText="Processing..." disabled={!formData.store || !formData.amount} _hover={{ bg: "#E5E5E5" }}>
                                        Transfer Funds
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

export default function SuperAdminFinancePage() {
    // --- STATE ---
    const [transactions, setTransactions] = useState<PayoutRecord[]>(INITIAL_PAYOUTS);
    const [activeTab, setActiveTab] = useState("payouts");
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [sortBy, setSortBy] = useState("amount");
    const [sortOrder, setSortOrder] = useState("desc");

    // Modals & Action States
    const [isExporting, setIsExporting] = useState(false);
    const [isProcessingBulk, setIsProcessingBulk] = useState(false);
    const [viewingTrx, setViewingTrx] = useState<PayoutRecord | null>(null);
    const [isManualModalOpen, setIsManualModalOpen] = useState(false);

    // --- ACTIONS ---
    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            const headers = ["TRX ID", "Store", "Owner", "Amount", "Fee", "Status", "Date", "Type"];
            const csvRows = processedPayouts.map(t => 
                [t.id, `"${t.store}"`, `"${t.owner}"`, `"${t.amount}"`, `"${t.fee}"`, t.status, `"${t.date}"`, t.type].join(",")
            );
            const csvString = [headers.join(","), ...csvRows].join("\n");
            
            const blob = new Blob([csvString], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `financial_report_${activeTab}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            setIsExporting(false);
        }, 800);
    };

    const handleProcessBulk = () => {
        setIsProcessingBulk(true);
        setTimeout(() => {
            setTransactions(prev => prev.map(t => t.status === "pending" ? { ...t, status: "completed" } : t));
            setIsProcessingBulk(false);
        }, 1200);
    };

    const handleManualPayoutSubmit = (data: { store: string; owner: string; amount: string }) => {
        const newTrx: PayoutRecord = {
            id: `TRX-${Math.floor(Math.random() * 9000) + 1000}`,
            store: data.store,
            owner: data.owner,
            amount: `₦${Number(data.amount).toLocaleString()}`,
            fee: `₦${(Number(data.amount) * 0.03).toLocaleString()}`,
            status: "completed",
            date: "Just now",
            type: "payouts"
        };
        setTransactions([newTrx, ...transactions]);
        setActiveTab("payouts"); // Switch back to see it
    };

    const getStatusUI = (status: string) => {
        switch (status) {
            case "completed": return { iconColor: "#5cac7d", icon: LuCheck }; 
            case "pending": return { iconColor: "orange.400", icon: LuClock };
            case "failed": return { iconColor: "red.400", icon: LuX }; 
            default: return { iconColor: "gray.500", icon: LuClock };
        }
    };

    const parseAmount = (amountStr: string) => Number(amountStr.replace(/[^0-9.-]+/g, ""));

    // --- FILTERING LOGIC ---
    const processedPayouts = transactions.filter(payout => {
        const matchesSearch = payout.store.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              payout.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              payout.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === "all" || payout.status === filterStatus;
        const matchesType = payout.type === activeTab;
        
        return matchesSearch && matchesStatus && matchesType;
    }).sort((a, b) => {
        const valA: string | number = sortBy === "amount" ? parseAmount(a.amount) : a.store.toLowerCase();
        const valB: string | number = sortBy === "amount" ? parseAmount(b.amount) : b.store.toLowerCase();
        
        return sortOrder === "asc" ? (valA < valB ? -1 : 1) : (valA > valB ? -1 : 1);
    });

    const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* --- COMBINED STICKY HEADER & TOOLBAR --- */}
            <Box 
                position="sticky" top="0" zIndex={30} 
                bg="#000000" 
                mx={{ base: "-16px", lg: "-32px" }} px={{ base: "16px", lg: "32px" }}
                pt={{ base: 2, lg: 8 }} pb={{ base: 4, lg: 6 }} mb={{ base: 4, lg: 8 }} 
                borderBottom="1px solid #1A1A1A"
            >
                {/* Title & Actions */}
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={4} gap={4}>
                    <Box>
                        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight">Financial Overview</Text>
                        <Text color="#888888" fontSize="sm" display={{ base: "none", md: "block" }}>Track platform revenue, GMV, and manage merchant settlements.</Text>
                    </Box>
                    <Flex gap={3} w={{ base: "full", sm: "auto" }}>
                        <Button onClick={handleExport} loading={isExporting} loadingText="Exporting" flex={{ base: 1, sm: "auto" }} bg="#111111" border="1px solid #333333" color="white" rounded="none" h="44px" px={6} _hover={{ bg: "#1A1A1A", borderColor: "white" }} display="flex" gap={2} fontWeight="bold">
                            <Icon as={LuDownload} color="#888888" strokeWidth="2.5" /> <Text display={{ base: "none", sm: "inline" }}>Export CSV</Text>
                        </Button>
                        <Button onClick={handleProcessBulk} loading={isProcessingBulk} loadingText="Processing..." flex={{ base: 1, sm: "auto" }} bg="white" color="black" border="none" rounded="none" h="44px" px={6} _hover={{ bg: "#E5E5E5" }} fontWeight="bold">
                            Process Payouts
                        </Button>
                    </Flex>
                </Flex>

                {/* Filters & Search */}
                <Flex direction={{ base: "column", xl: "row" }} gap={3} w="full">
                    <Flex flex={1} minW="0" align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input 
                            placeholder="Search store, owner, or TRX ID..." border="none" color="white" h="full" px={0} 
                            _focus={{ boxShadow: "none", outline: "none" }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Flex>
                    
                    <Flex gap={3} w={{ base: "full", xl: "auto" }} wrap="wrap">
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "140px" }}>
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={nativeSelectStyle}>
                                <option value="all" style={{ background: "#0A0A0A" }}>All Statuses</option>
                                <option value="completed" style={{ background: "#0A0A0A" }}>Completed</option>
                                <option value="pending" style={{ background: "#0A0A0A" }}>Pending</option>
                                <option value="failed" style={{ background: "#0A0A0A" }}>Failed</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "140px" }}>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={nativeSelectStyle}>
                                <option value="amount" style={{ background: "#0A0A0A" }}>Sort by Amount</option>
                                <option value="store" style={{ background: "#0A0A0A" }}>Sort by Store</option>
                                <option value="id" style={{ background: "#0A0A0A" }}>Sort by TRX ID</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "140px" }}>
                            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={nativeSelectStyle}>
                                <option value="desc" style={{ background: "#0A0A0A" }}>Descending</option>
                                <option value="asc" style={{ background: "#0A0A0A" }}>Ascending</option>
                            </select>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* --- KPI CARDS --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                {KPI_DATA.map((kpi, idx) => (
                    <Box key={idx} bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A" position="relative" overflow="hidden">
                        <Flex justify="space-between" align="flex-start" mb={4}>
                            <Flex align="center" justify="center" boxSize="40px" rounded="none" bg="#111111" border="1px solid #333333" color="white">
                                <Icon as={kpi.icon} fontSize="lg" strokeWidth="2.5" />
                            </Flex>
                            <Badge 
                                bg="#111111" 
                                color={kpi.isPositive ? "green.400" : "red.400"} 
                                border="1px solid #333333"
                                px={2} py={1} rounded="none" display="flex" alignItems="center" gap={1} fontSize="10px" fontWeight="bold" textTransform="uppercase"
                            >
                                <Icon as={kpi.isPositive ? LuArrowUpRight : LuArrowDownRight} strokeWidth="2.5" />
                                {kpi.trend}
                            </Badge>
                        </Flex>
                        <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>{kpi.label}</Text>
                        <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{kpi.value}</Text>
                    </Box>
                ))}
            </SimpleGrid>

            {/* --- TABLE AREA --- */}
            <Box bg="#0A0A0A" rounded="none" border="1px solid #1A1A1A" overflowX="auto">
                <Flex bg="#111111" borderBottom="1px solid #333333" px={4} py={3} gap={2}>
                    {["payouts", "platform_fees", "refunds"].map((tab) => (
                        <Button 
                            key={tab} size="sm" variant="ghost" rounded="none" 
                            bg={activeTab === tab ? "#000000" : "transparent"} 
                            color={activeTab === tab ? "white" : "#888888"}
                            border={activeTab === tab ? "1px solid #333333" : "1px solid transparent"}
                            onClick={() => setActiveTab(tab)}
                            _hover={{ bg: "#000000", color: "white" }}
                            fontWeight="bold" textTransform="uppercase" fontSize="10px" letterSpacing="wider"
                        >
                            {tab.replace("_", " ")}
                        </Button>
                    ))}
                </Flex>
                <Box p={6} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                    <Box minW="800px">
                        <Grid templateColumns="1.5fr 1.5fr 1fr 1fr 1fr 100px" gap={4} py={4} borderBottom="1px solid" borderColor="#1A1A1A">
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Transaction ID</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Store Details</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Gross Amount</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Platform Fee</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Status</Text>
                            <Text></Text>
                        </Grid>
                        
                        {processedPayouts.length === 0 ? (
                            <Flex justify="center" align="center" py={10} direction="column">
                                <Text color="#888888" fontSize="lg" fontWeight="bold">No transactions found.</Text>
                            </Flex>
                        ) : (
                            <VStack align="stretch" gap={0}>
                                {processedPayouts.map((trx, idx) => {
                                    const statusUI = getStatusUI(trx.status);
                                    return (
                                        <Grid templateColumns="1.5fr 1.5fr 1fr 1fr 1fr 100px" key={idx} py={4} borderBottom="1px solid #1A1A1A" alignItems="center" _hover={{ bg: "#111111" }} cursor="pointer" onClick={() => setViewingTrx(trx)}>
                                            <Box>
                                                <Text color="white" fontWeight="bold" fontSize="sm">{trx.id}</Text>
                                                <Text color="#888888" fontSize="xs" fontFamily="monospace">{trx.date}</Text>
                                            </Box>
                                            <Box>
                                                <Text color="white" fontWeight="bold" fontSize="sm">{trx.store}</Text>
                                                <Text color="#888888" fontSize="xs">{trx.owner}</Text>
                                            </Box>
                                            <Text color="white" fontWeight="bold" fontSize="sm">{trx.amount}</Text>
                                            <Text color="white" fontWeight="bold" fontSize="sm">{trx.fee}</Text>
                                            <Flex align="center" gap={2}>
                                                <Icon as={statusUI.icon} color={statusUI.iconColor} /> 
                                                <Text color={statusUI.iconColor} fontSize="xs" fontWeight="bold" textTransform="uppercase">{trx.status}</Text>
                                            </Flex>
                                            <Button size="xs" variant="outline" borderColor="#333333" color="#888888" rounded="none" _hover={{ bg: "#1A1A1A", color: "white" }} onClick={(e) => { e.stopPropagation(); setViewingTrx(trx); }}>
                                                View
                                            </Button>
                                        </Grid>
                                    );
                                })}
                            </VStack>
                        )}
                    </Box>
                </Box>
            </Box>

            <TransactionDetailsModal trx={viewingTrx} onClose={() => setViewingTrx(null)} />
            <ManualPayoutModal isOpen={isManualModalOpen} onClose={() => setIsManualModalOpen(false)} onSubmit={handleManualPayoutSubmit} />
        </Box>
    );
}
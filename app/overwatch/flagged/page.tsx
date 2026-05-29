"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Grid, SimpleGrid, Icon, Badge, Button, Avatar, Input, IconButton, VStack, ScrollArea, Spinner, Textarea
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LuSearch, LuFilter, LuShieldAlert, LuBan, LuEye, 
    LuUserX, LuClock, LuDownload, LuInfo, LuCheck, LuLock, LuX
} from "react-icons/lu";

// --- REUSABLE STYLES ---
const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px", minWidth: "160px" };
const scrollbarStyles = { '&::-webkit-scrollbar': { height: '6px', width: '6px' }, '&::-webkit-scrollbar-track': { background: 'transparent' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' }, '&::-webkit-scrollbar-thumb:hover': { background: '#555555' } };

// --- MOCK DATA ---
const FLAGGED_KPIs = [
    { label: "Active Flags", value: "142", trend: "Needs review", icon: LuShieldAlert, iconColor: "yellow.400" },
    { label: "Critical Risk", value: "15", trend: "Immediate action", icon: LuInfo, iconColor: "red.400" },
    { label: "Accounts Suspended", value: "34", trend: "Temporarily locked", icon: LuClock, iconColor: "blue.400" },
    { label: "Permanent Bans", value: "12", trend: "This month", icon: LuBan, iconColor: "#888888" },
];

export interface FlaggedAccount {
    id: string;
    accountName: string;
    email: string;
    role: "Buyer" | "Merchant";
    violation: string;
    severity: "High" | "Medium" | "Low";
    status: "Under Review" | "Suspended" | "Banned" | "Resolved";
    flaggedAt: string;
}

const INITIAL_ACCOUNTS: FlaggedAccount[] = [
    { id: "FLG-2041", accountName: "Gadget World", email: "support@gadgetworld.io", role: "Merchant", violation: "Unusually high refund rate (14.2%)", severity: "High", status: "Suspended", flaggedAt: "2 hours ago" },
    { id: "FLG-2042", accountName: "Unknown User", email: "fraud.test@tempmail.com", role: "Buyer", violation: "Multiple failed payment attempts", severity: "High", status: "Banned", flaggedAt: "5 hours ago" },
    { id: "FLG-2043", accountName: "Chuka Obi", email: "chuka@example.com", role: "Buyer", violation: "Abusive language in disputes", severity: "Medium", status: "Under Review", flaggedAt: "1 day ago" },
    { id: "FLG-2044", accountName: "Sneaker Headz", email: "sales@sneakerheadz.ng", role: "Merchant", violation: "Fulfillment delays exceeding SLA", severity: "Medium", status: "Under Review", flaggedAt: "2 days ago" },
    { id: "FLG-2045", accountName: "Sarah Connor", email: "sarah.c@example.com", role: "Buyer", violation: "Unusual login location detected", severity: "Low", status: "Resolved", flaggedAt: "3 days ago" },
    { id: "FLG-2046", accountName: "Bad Actor", email: "scammer99@fakemail.io", role: "Merchant", violation: "Suspected counterfeit products", severity: "High", status: "Banned", flaggedAt: "1 week ago" },
];

const getSeverityStyle = (severity: string) => {
    switch (severity) {
        case "High": return { color: "red.400" };
        case "Medium": return { color: "yellow.400" };
        case "Low": return { color: "blue.400" };
        default: return { color: "#888888" };
    }
};

const getStatusStyle = (status: string) => {
    switch (status) {
        case "Under Review": return { bg: "rgba(236, 201, 75, 0.1)", color: "yellow.400", border: "1px solid var(--chakra-colors-yellow-400)", icon: LuClock };
        case "Suspended": return { bg: "rgba(229, 62, 62, 0.1)", color: "red.400", border: "1px solid var(--chakra-colors-red-400)", icon: LuUserX };
        case "Banned": return { bg: "#111111", color: "#888888", border: "1px solid #333333", icon: LuBan };
        case "Resolved": return { bg: "rgba(92, 172, 125, 0.1)", color: "#5cac7d", border: "1px solid #5cac7d", icon: LuCheck };
        default: return { bg: "#111111", color: "#888888", border: "1px solid #333333", icon: LuInfo };
    }
};

// --- ACCOUNT DETAILS DRAWER ---
const AccountDetailsDrawer = ({ 
    account, onClose, onUpdateStatus 
}: { 
    account: FlaggedAccount | null; onClose: () => void; onUpdateStatus: (id: string, status: FlaggedAccount["status"]) => void 
}) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [note, setNote] = useState("");

    if (!account) return null;
    const statusStyle = getStatusStyle(account.status);
    const severityStyle = getSeverityStyle(account.severity);

    const handleAction = (status: FlaggedAccount["status"]) => {
        setIsUpdating(true);
        setTimeout(() => {
            onUpdateStatus(account.id, status);
            setIsUpdating(false);
            setNote("");
            onClose();
        }, 1000); // Simulate API call
    };

    return (
        <AnimatePresence>
            {account && (
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
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Account Audit</Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">{account.id}</Text>
                                    </Box>
                                    <IconButton aria-label="Close" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                {/* Content */}
                                <Box flex={1} overflowY="auto" px={6} py={8} css={scrollbarStyles}>
                                    <VStack w="full" gap={6} align="stretch">
                                        
                                        {/* Status & Severity */}
                                        <Flex justify="space-between" align="center" bg="#111111" p={4} border="1px solid #1A1A1A">
                                            <Box>
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Risk Severity</Text>
                                                <Flex align="center" gap={2}>
                                                    <Icon as={LuShieldAlert} color={severityStyle.color} boxSize="18px" />
                                                    <Text color={severityStyle.color} fontSize="lg" fontWeight="black" letterSpacing="tight">{account.severity}</Text>
                                                </Flex>
                                            </Box>
                                            <Flex align="center" gap={2} {...statusStyle} px={2.5} py={1.5} rounded="none">
                                                <Icon as={statusStyle.icon} boxSize="14px" strokeWidth="3" />
                                                <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{account.status}</Text>
                                            </Flex>
                                        </Flex>

                                        {/* Profile */}
                                        <Box bg="#111111" p={5} border="1px solid #1A1A1A">
                                            <Flex justify="space-between" mb={4} pb={4} borderBottom="1px dashed #333333">
                                                <Text color="#888888" fontSize="sm">Account Role</Text>
                                                <Text color="white" fontWeight="bold" fontFamily="monospace">{account.role}</Text>
                                            </Flex>
                                            <Flex align="center" justify="space-between" mb={4}>
                                                <Text color="#888888" fontSize="sm">Account Name</Text>
                                                <Text color="white" fontWeight="bold">{account.accountName}</Text>
                                            </Flex>
                                            <Flex align="center" justify="space-between">
                                                <Text color="#888888" fontSize="sm">Email Address</Text>
                                                <Text color="white" fontWeight="bold">{account.email}</Text>
                                            </Flex>
                                        </Box>

                                        {/* Reason */}
                                        <Box bg="#111111" p={5} border="1px solid #1A1A1A">
                                            <Text color="#888888" fontSize="sm" mb={1}>Violation Description</Text>
                                            <Text color="white" fontWeight="bold" fontStyle="italic">&quot;{account.violation}&quot;</Text>
                                            <Text color="#555555" fontSize="xs" mt={4} textAlign="right">Flagged: {account.flaggedAt}</Text>
                                        </Box>

                                        {/* Admin Note Box */}
                                        {account.status !== "Resolved" && (
                                            <Box>
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Enforcement Notes</Text>
                                                <Textarea 
                                                    placeholder="Add an internal note before enforcing an action..." 
                                                    bg="#111111" border="1px solid #333333" color="white" rounded="none" p={3} minH="100px"
                                                    _focus={{ borderColor: "white", outline: "none", boxShadow: "none" }}
                                                    value={note} onChange={(e) => setNote(e.target.value)}
                                                />
                                            </Box>
                                        )}
                                    </VStack>
                                </Box>

                                {/* Footer Actions */}
                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                                    {(account.status === "Banned" || account.status === "Suspended") ? (
                                        <>
                                            <Button 
                                                flex="1" bg="white" color="black" rounded="none" fontWeight="bold" _hover={{ bg: "#E5E5E5" }}
                                                onClick={() => handleAction("Resolved")} loading={isUpdating}
                                            >
                                                <Icon as={LuCheck} mr={2} strokeWidth="3" /> Restore Account
                                            </Button>
                                        </>
                                    ) : account.status === "Under Review" ? (
                                        <>
                                            <Button 
                                                flex="1" variant="outline" borderColor="yellow.400" color="yellow.400" rounded="none" fontWeight="bold" _hover={{ bg: "rgba(236, 201, 75, 0.1)" }}
                                                onClick={() => handleAction("Suspended")} loading={isUpdating}
                                            >
                                                <Icon as={LuUserX} mr={2} strokeWidth="3" /> Suspend
                                            </Button>
                                            <Button 
                                                flex="1" bg="red.500" color="white" rounded="none" fontWeight="bold" _hover={{ bg: "red.600" }}
                                                onClick={() => handleAction("Banned")} loading={isUpdating}
                                            >
                                                <Icon as={LuBan} mr={2} strokeWidth="3" /> Ban
                                            </Button>
                                        </>
                                    ) : (
                                        <Button w="full" variant="outline" borderColor="#333333" color="white" rounded="none" onClick={onClose} _hover={{ bg: "#1A1A1A" }}>
                                            Close Details
                                        </Button>
                                    )}
                                </Flex>

                            </Box>
                        </motion.div>
                    </Box>
                </>
            )}
        </AnimatePresence>
    );
};

export default function FlaggedAccountsPage() {
    // --- STATE ---
    const [accounts, setAccounts] = useState<FlaggedAccount[]>(INITIAL_ACCOUNTS);
    const [searchQuery, setSearchQuery] = useState("");
    const [severityFilter, setSeverityFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    // Modal & Action States
    const [selectedAccount, setSelectedAccount] = useState<FlaggedAccount | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [inlineProcessingId, setInlineProcessingId] = useState<string | null>(null);

    // --- ACTIONS ---
    const handleUpdateStatus = (id: string, newStatus: FlaggedAccount["status"]) => {
        setAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, status: newStatus } : acc));
    };

    const handleInlineAction = (e: React.MouseEvent, id: string, newStatus: FlaggedAccount["status"]) => {
        e.stopPropagation();
        setInlineProcessingId(id);
        setTimeout(() => {
            handleUpdateStatus(id, newStatus);
            setInlineProcessingId(null);
        }, 800);
    };

    const handleExportAuditLog = () => {
        setIsExporting(true);
        setTimeout(() => {
            const headers = ["ID", "Account Name", "Email", "Role", "Violation", "Severity", "Status", "Flagged At"];
            const csvRows = filteredAccounts.map(a => 
                [a.id, `"${a.accountName}"`, `"${a.email}"`, a.role, `"${a.violation}"`, a.severity, a.status, `"${a.flaggedAt}"`].join(",")
            );
            const csvString = [headers.join(","), ...csvRows].join("\n");
            
            const blob = new Blob([csvString], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', 'flagged_accounts_audit.csv');
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            setIsExporting(false);
        }, 800);
    };

    // --- FILTER LOGIC ---
    const filteredAccounts = accounts.filter(account => {
        const matchesSearch = account.accountName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              account.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              account.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSeverity = severityFilter === "All" || account.severity === severityFilter;
        const matchesStatus = statusFilter === "All" || account.status === statusFilter;
        return matchesSearch && matchesSeverity && matchesStatus;
    });

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} direction={{ base: "column", md: "row" }} gap={4} mb={8}>
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight" mb={1}>
                        Flagged Accounts
                    </Text>
                    <Text color="#888888" fontSize="sm">Investigate policy violations, suspend risky accounts, and enforce platform bans.</Text>
                </Box>
                
                <Button 
                    onClick={handleExportAuditLog} loading={isExporting} loadingText="Exporting..."
                    display={{ base: "none", sm: "flex" }} bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A" }} gap={2} h="44px" px={6} fontWeight="bold"
                >
                    <Icon as={LuDownload} color="#888888" strokeWidth="2.5" /> Export Audit Log
                </Button>
            </Flex>

            {/* --- KPI GRID --- */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6} mb={8}>
                {FLAGGED_KPIs.map((kpi, idx) => (
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
                            placeholder="Search by account name, email, or ID..." 
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
                        <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} style={nativeSelectStyle}>
                            <option value="All" style={{ background: "#000000" }}>All Severities</option>
                            <option value="High" style={{ background: "#000000" }}>High Risk</option>
                            <option value="Medium" style={{ background: "#000000" }}>Medium Risk</option>
                            <option value="Low" style={{ background: "#000000" }}>Low Risk</option>
                        </select>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={nativeSelectStyle}>
                            <option value="All" style={{ background: "#000000" }}>All Statuses</option>
                            <option value="Under Review" style={{ background: "#000000" }}>Under Review</option>
                            <option value="Suspended" style={{ background: "#000000" }}>Suspended</option>
                            <option value="Banned" style={{ background: "#000000" }}>Banned</option>
                            <option value="Resolved" style={{ background: "#000000" }}>Resolved</option>
                        </select>
                    </Flex>
                </Flex>
            </Box>

            {/* --- FLAGGED ACCOUNTS LEDGER TABLE --- */}
            <Box bg="#0A0A0A" border="1px solid #1A1A1A" mb={8}>
                <ScrollArea.Root maxW="full">
                    <ScrollArea.Viewport pb={4}>
                        <Box minW="1100px">
                            
                            {/* Columns Header */}
                            <Grid templateColumns="1.5fr 2.5fr 1fr 1.2fr 120px" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid #333333">
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Account Identity</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Violation Details & Date</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Risk Severity</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Action Status</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Quick Actions</Text>
                            </Grid>

                            {/* Table Rows */}
                            {filteredAccounts.length === 0 ? (
                                <Flex justify="center" align="center" py={16} direction="column">
                                    <Icon as={LuShieldAlert} color="#333333" boxSize="40px" mb={4} strokeWidth="1.5" />
                                    <Text color="#888888" fontSize="lg" fontWeight="bold">No flagged accounts found.</Text>
                                </Flex>
                            ) : (
                                <VStack align="stretch" gap={0}>
                                    {filteredAccounts.map((account) => {
                                        const severityStyle = getSeverityStyle(account.severity);
                                        const statusStyle = getStatusStyle(account.status);
                                        const isProcessingInline = inlineProcessingId === account.id;
                                        
                                        return (
                                            <Grid 
                                                onClick={() => setSelectedAccount(account)}
                                                key={account.id} 
                                                templateColumns="1.5fr 2.5fr 1fr 1.2fr 120px" gap={4} px={6} py={5} 
                                                borderBottom="1px solid #1A1A1A" 
                                                alignItems="start" cursor="pointer"
                                                _hover={{ bg: "#111111" }} transition="background 0.2s"
                                            >
                                                {/* Account Identity */}
                                                <Flex align="center" gap={4}>
                                                    <Avatar.Root size="md" rounded="full">
                                                        <Avatar.Fallback name={account.accountName} bg="#111111" border="1px solid #333333" color="white" rounded="none" fontWeight="black" />
                                                    </Avatar.Root>
                                                    <Box>
                                                        <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight" mb={0.5}>{account.accountName}</Text>
                                                        <Text color="#888888" fontSize="xs" mb={0.5}>{account.email}</Text>
                                                        <Text color="#555555" fontSize="10px" fontFamily="monospace">ROLE: {account.role.toUpperCase()}</Text>
                                                    </Box>
                                                </Flex>

                                                {/* Violation Details */}
                                                <Box pt={1}>
                                                    <Text color="white" fontSize="sm" fontWeight="bold" mb={1}>{account.violation}</Text>
                                                    <Text color="#888888" fontSize="xs">Flagged: {account.flaggedAt}</Text>
                                                    <Text color="#555555" fontSize="10px" fontFamily="monospace" mt={1}>REF: {account.id}</Text>
                                                </Box>

                                                {/* Severity */}
                                                <Box pt={1}>
                                                    <Flex align="center" gap={2}>
                                                        <Icon as={LuShieldAlert} color={severityStyle.color} boxSize="14px" />
                                                        <Text color={severityStyle.color} fontSize="sm" fontWeight="bold">{account.severity}</Text>
                                                    </Flex>
                                                </Box>

                                                {/* Status */}
                                                <Box pt={1}>
                                                    <Badge {...statusStyle} px={2.5} py={1.5} rounded="none" fontSize="9px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" display="inline-flex" alignItems="center" gap={1.5}>
                                                        <Icon as={statusStyle.icon} boxSize="12px" strokeWidth="3" />
                                                        {account.status}
                                                    </Badge>
                                                </Box>
                                                
                                                {/* Actions */}
                                                <Flex justify="flex-end" gap={2} pt={1}>
                                                    <IconButton aria-label="Review Evidence" title="Review Case" size="sm" h="32px" w="32px" bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                                        <Icon as={LuEye} strokeWidth="2.5" boxSize="14px" />
                                                    </IconButton>

                                                    {account.status === "Banned" || account.status === "Suspended" ? (
                                                        <IconButton 
                                                            onClick={(e) => handleInlineAction(e, account.id, "Resolved")} disabled={isProcessingInline}
                                                            aria-label="Restore Account" title="Restore Access" size="sm" h="32px" w="32px" bg="rgba(92, 172, 125, 0.1)" border="1px solid #5cac7d" color="#5cac7d" rounded="none" _hover={{ bg: "#5cac7d", color: "black" }}
                                                        >
                                                            {isProcessingInline ? <Spinner size="xs" color="currentColor" /> : <Icon as={LuLock} strokeWidth="2.5" boxSize="14px" />}
                                                        </IconButton>
                                                    ) : account.status === "Under Review" ? (
                                                        <IconButton 
                                                            onClick={(e) => handleInlineAction(e, account.id, "Suspended")} disabled={isProcessingInline}
                                                            aria-label="Suspend Account" title="Suspend / Ban" size="sm" h="32px" w="32px" bg="rgba(229, 62, 62, 0.1)" border="1px solid var(--chakra-colors-red-400)" color="red.400" rounded="none" _hover={{ bg: "red.400", color: "black" }}
                                                        >
                                                            {isProcessingInline ? <Spinner size="xs" color="currentColor" /> : <Icon as={LuBan} strokeWidth="2.5" boxSize="14px" />}
                                                        </IconButton>
                                                    ) : (
                                                        <IconButton aria-label="Resolved" title="Resolved" size="sm" h="32px" w="32px" variant="ghost" color="#555555" rounded="none" cursor="not-allowed">
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
            <AccountDetailsDrawer 
                account={selectedAccount} 
                onClose={() => setSelectedAccount(null)} 
                onUpdateStatus={handleUpdateStatus} 
            />

        </Box>
    );
}
"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Grid, SimpleGrid, Icon, Badge, Button, Input, VStack, ScrollArea 
} from "@chakra-ui/react";
import { 
    LuSearch, LuFilter, LuDownload, LuTerminal, LuShieldAlert, 
    LuInfo, LuCheck, LuClock, LuActivity
} from "react-icons/lu";

// --- REUSABLE STYLES ---
const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px", minWidth: "160px" };

// --- MOCK DATA ---
const LOG_KPIs = [
    { label: "Events Logged (24h)", value: "14,092", trend: "Normal volume", icon: LuActivity, iconColor: "blue.400" },
    { label: "Critical Alerts", value: "3", trend: "Requires attention", icon: LuShieldAlert, iconColor: "red.400" },
    { label: "Admin Actions", value: "42", trend: "Secure perimeter", icon: LuTerminal, iconColor: "#5cac7d" },
    { label: "Failed Auth Attempts", value: "18", trend: "Elevated risk", icon: LuClock, iconColor: "yellow.400" },
];

interface LogEvent {
    id: string;
    timestamp: string;
    severity: "Info" | "Success" | "Warning" | "Critical";
    action: string;
    actor: string;
    target: string;
    ipAddress: string;
}

const MOCK_LOGS: LogEvent[] = [
    { id: "EVT-909281", timestamp: "2026-05-07 08:52:14", severity: "Critical", action: "Multiple Failed Logins", actor: "Unknown", target: "System Ops (Admin)", ipAddress: "192.168.1.45" },
    { id: "EVT-909280", timestamp: "2026-05-07 08:41:02", severity: "Warning", action: "High Refund Rate Detected", actor: "System Checker", target: "Gadget World (SHP-88)", ipAddress: "10.0.0.1" },
    { id: "EVT-909279", timestamp: "2026-05-07 08:30:00", severity: "Success", action: "Payout Batch Processed", actor: "Automated Cron", target: "14 Merchants", ipAddress: "127.0.0.1" },
    { id: "EVT-909278", timestamp: "2026-05-07 08:15:22", severity: "Info", action: "Settings Updated (2FA Required)", actor: "System Ops", target: "Global Policy", ipAddress: "105.112.45.19" },
    { id: "EVT-909277", timestamp: "2026-05-07 07:45:10", severity: "Success", action: "Account KYC Approved", actor: "Jane Doe (Staff)", target: "Urban Kicks NG", ipAddress: "192.168.1.112" },
    { id: "EVT-909276", timestamp: "2026-05-07 06:12:05", severity: "Critical", action: "Escrow Release Blocked", actor: "System Guard", target: "Sneaker Headz", ipAddress: "10.0.0.1" },
    { id: "EVT-909275", timestamp: "2026-05-07 05:00:10", severity: "Info", action: "Database Backup Completed", actor: "System", target: "AWS S3 /backup", ipAddress: "127.0.0.1" },
];

export default function ActivityLogsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [severityFilter, setSeverityFilter] = useState("All");

    // Filter Logic
    const filteredLogs = MOCK_LOGS.filter(log => {
        const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              log.ipAddress.includes(searchQuery);
        const matchesSeverity = severityFilter === "All" || log.severity === severityFilter;
        return matchesSearch && matchesSeverity;
    });

    const getSeverityStyle = (severity: string) => {
        switch (severity) {
            case "Critical": return { color: "red.400", icon: LuShieldAlert, bg: "rgba(229, 62, 62, 0.1)", border: "red.400" };
            case "Warning": return { color: "yellow.400", icon: LuInfo, bg: "rgba(236, 201, 75, 0.1)", border: "var(--chakra-colors-yellow-400)" };
            case "Success": return { color: "#5cac7d", icon: LuCheck, bg: "rgba(92, 172, 125, 0.1)", border: "#5cac7d" };
            default: return { color: "#888888", icon: LuInfo, bg: "#111111", border: "#333333" }; // Info
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} direction={{ base: "column", md: "row" }} gap={4} mb={8}>
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight" mb={1}>
                        System Activity Logs
                    </Text>
                    <Text color="#888888" fontSize="sm">Immutable ledger of all admin actions, automated system events, and security flags.</Text>
                </Box>
                
                <Flex gap={3}>
                    <Button bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A" }} gap={2} h="44px" px={6} fontWeight="bold">
                        <Icon as={LuDownload} color="#888888" strokeWidth="2.5" /> Export Logs (.csv)
                    </Button>
                </Flex>
            </Flex>

            {/* --- KPI GRID --- */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6} mb={8}>
                {LOG_KPIs.map((kpi, idx) => (
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
                    <Flex flex={1} maxW={{ md: "500px" }} align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input 
                            placeholder="Search by action, actor, or IP address..." 
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
                            <option value="24h" style={{ background: "#000000" }}>Last 24 Hours</option>
                            <option value="7d" style={{ background: "#000000" }}>Last 7 Days</option>
                            <option value="30d" style={{ background: "#000000" }}>Last 30 Days</option>
                        </select>
                        <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} style={nativeSelectStyle}>
                            <option value="All" style={{ background: "#000000" }}>All Severities</option>
                            <option value="Info" style={{ background: "#000000" }}>Info</option>
                            <option value="Success" style={{ background: "#000000" }}>Success</option>
                            <option value="Warning" style={{ background: "#000000" }}>Warning</option>
                            <option value="Critical" style={{ background: "#000000" }}>Critical</option>
                        </select>
                    </Flex>
                </Flex>
            </Box>

            {/* --- LOG LEDGER TABLE --- */}
            <Box bg="#0A0A0A" border="1px solid #1A1A1A" mb={8}>
                <ScrollArea.Root maxW="full">
                    <ScrollArea.Viewport pb={4}>
                        <Box minW="1100px">
                            
                            {/* Columns Header */}
                            <Grid templateColumns="180px 120px 2.5fr 1.5fr 1.5fr" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid #333333">
                                <Flex align="center" gap={2}>
                                    <Icon as={LuClock} color="#888888" boxSize="12px" />
                                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Timestamp</Text>
                                </Flex>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Severity</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Event Action</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Actor & IP</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Target</Text>
                            </Grid>

                            {/* Table Rows */}
                            {filteredLogs.length === 0 ? (
                                <Flex justify="center" align="center" py={16} direction="column">
                                    <Icon as={LuTerminal} color="#333333" boxSize="40px" mb={4} strokeWidth="1.5" />
                                    <Text color="#888888" fontSize="lg" fontWeight="bold">No logs matched your filters.</Text>
                                </Flex>
                            ) : (
                                <VStack align="stretch" gap={0}>
                                    {filteredLogs.map((log) => {
                                        const style = getSeverityStyle(log.severity);
                                        
                                        return (
                                            <Grid 
                                                key={log.id} 
                                                templateColumns="180px 120px 2.5fr 1.5fr 1.5fr" gap={4} px={6} py={4} 
                                                borderBottom="1px solid #1A1A1A" 
                                                alignItems="center" 
                                                _hover={{ bg: "#111111" }} transition="background 0.2s"
                                            >
                                                {/* Timestamp (Monospace for server feel) */}
                                                <Text color="#888888" fontSize="12px" fontFamily="monospace" letterSpacing="tight">
                                                    {log.timestamp}
                                                </Text>

                                                {/* Severity */}
                                                <Box>
                                                    <Flex align="center" gap={2} bg={style.bg} color={style.color} border="1px solid" borderColor={style.border} px={2} py={1} rounded="none" display="inline-flex">
                                                        <Icon as={style.icon} boxSize="10px" strokeWidth="3" />
                                                        <Text fontSize="9px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{log.severity}</Text>
                                                    </Flex>
                                                </Box>

                                                {/* Action / Event */}
                                                <Box>
                                                    <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight" mb={0.5}>{log.action}</Text>
                                                    <Text color="#555555" fontSize="10px" fontFamily="monospace">ID: {log.id}</Text>
                                                </Box>

                                                {/* Actor & IP */}
                                                <Box>
                                                    <Text color="white" fontSize="sm" fontWeight="medium" mb={0.5}>{log.actor}</Text>
                                                    <Text color="#888888" fontSize="11px" fontFamily="monospace">{log.ipAddress}</Text>
                                                </Box>

                                                {/* Target */}
                                                <Box>
                                                    <Text color="#A1A1AA" fontSize="sm">{log.target}</Text>
                                                </Box>
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
"use client";
import React, { useState} from "react";
import { 
    Box, Flex, Text, Grid, SimpleGrid, Icon, Badge, Button, Input, VStack, Progress
} from "@chakra-ui/react";
import { 
    LuServer, LuActivity, LuClock, LuCheck, LuCircleAlert, LuRefreshCw, 
    LuDatabase, LuGlobe, LuMail, LuCreditCard, LuSearch, LuTerminal, LuFilter
} from "react-icons/lu";

// --- REUSABLE STYLES ---
const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };

// --- MOCK DATA ---
const KPI_STATS = [
    { label: "Global Uptime", value: "99.98%", trend: "Stable", isPositive: true, icon: LuServer, iconColor: "#5cac7d" },
    { label: "Avg API Latency", value: "124ms", trend: "-12ms", isPositive: true, icon: LuClock, iconColor: "blue.400" },
    { label: "Error Rate (5xx)", value: "0.12%", trend: "+0.02%", isPositive: false, icon: LuActivity, iconColor: "orange.400" },
    { label: "Failed Webhooks", value: "3", trend: "-5", isPositive: true, icon: LuCircleAlert, iconColor: "red.400" },
];

const SERVICES = [
    { name: "Core Database (PostgreSQL)", type: "Infrastructure", status: "Operational", latency: "12ms", uptime: "99.99%", icon: LuDatabase, statusColor: "#5cac7d" },
    { name: "Payment Gateway API", type: "Integration", status: "Degraded", latency: "840ms", uptime: "98.50%", icon: LuCreditCard, statusColor: "orange.400" },
    { name: "Global Search Index", type: "Infrastructure", status: "Operational", latency: "45ms", uptime: "100%", icon: LuSearch, statusColor: "#5cac7d" },
    { name: "Email Delivery Service", type: "Integration", status: "Operational", latency: "110ms", uptime: "99.95%", icon: LuMail, statusColor: "#5cac7d" },
    { name: "Content Delivery Network", type: "Infrastructure", status: "Operational", latency: "18ms", uptime: "100%", icon: LuGlobe, statusColor: "#5cac7d" },
];

const ERROR_LOGS = [
    { id: "ERR-8091", time: "10:45:12 AM", service: "Payment Gateway API", endpoint: "POST /v1/charge", code: "502 Bad Gateway", message: "Upstream timeout connecting to provider.", status: "Investigating" },
    { id: "ERR-8090", time: "10:42:05 AM", service: "Webhook Delivery", endpoint: "POST /webhooks/logistics", code: "408 Request Timeout", message: "Logistics partner failed to acknowledge receipt in 5000ms.", status: "Retrying" },
    { id: "ERR-8089", time: "09:15:33 AM", service: "Core Database", endpoint: "Query Execution", code: "Slow Query", message: "Transaction blocked for 12s on table 'orders'.", status: "Resolved" },
    { id: "ERR-8088", time: "08:01:20 AM", service: "Email Delivery Service", endpoint: "POST /v3/mail/send", code: "429 Too Many Requests", message: "Rate limit exceeded for promotional bulk send.", status: "Resolved" },
];

export default function SystemHealthPage() {
    const brandColor = "#f5f5f5";
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"Services" | "Logs">("Services");
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 800);
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1600px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} direction={{ base: "column", md: "row" }} gap={4} mb={8}>
                <Box>
                    <Flex align="center" gap={3} mb={1}>
                        <Icon as={LuServer} color={brandColor} boxSize="24px" strokeWidth="2.5" />
                        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight">
                            API & System Health
                        </Text>
                    </Flex>
                    <Text color="#888888" fontSize="sm">Monitor infrastructure uptime, API latencies, and service degradation.</Text>
                </Box>
                
                <Flex align="center" gap={3}>
                    <Text color="#555555" fontSize="xs" fontWeight="bold" fontFamily="monospace">LAST UPDATED: JUST NOW</Text>
                    <Button 
                        onClick={handleRefresh} 
                        bg="#111111" border="1px solid #333333" color="white" h="44px" px={6} rounded="none" 
                        _hover={{ bg: "#1A1A1A" }} display="flex" gap={2}
                        
                    >
                        <Icon as={LuRefreshCw} color={brandColor} strokeWidth="2.5" animation={isRefreshing ? "spin 1s linear infinite" : "none"} /> 
                        Run Diagnostics
                    </Button>
                </Flex>
            </Flex>

            {/* --- KPI GRID --- */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6} mb={8}>
                {KPI_STATS.map((kpi, idx) => (
                    <Box key={idx} bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex justify="space-between" align="start" mb={4}>
                            <Flex boxSize="40px" bg="#111111" border="1px solid #333333" rounded="none" align="center" justify="center">
                                {/* Colored Icon */}
                                <Icon as={kpi.icon} color={kpi.iconColor} boxSize="20px" strokeWidth="2.5" />
                            </Flex>
                        </Flex>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>{kpi.label}</Text>
                        <Flex align="baseline" gap={3}>
                            <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{kpi.value}</Text>
                        </Flex>
                    </Box>
                ))}
            </SimpleGrid>

            {/* --- TABS & CONTROLS --- */}
            <Flex borderBottom="1px solid #1A1A1A" mb={6} gap={6}>
                <Text 
                    color={activeTab === "Services" ? "white" : "#888888"} fontWeight="bold" pb={3} cursor="pointer"
                    borderBottom="2px solid" borderColor={activeTab === "Services" ? "white" : "transparent"}
                    onClick={() => setActiveTab("Services")} transition="all 0.2s"
                >
                    Service Status
                </Text>
                <Text 
                    color={activeTab === "Logs" ? "white" : "#888888"} fontWeight="bold" pb={3} cursor="pointer"
                    borderBottom="2px solid" borderColor={activeTab === "Logs" ? "white" : "transparent"}
                    onClick={() => setActiveTab("Logs")} transition="all 0.2s"
                >
                    Incident Logs
                </Text>
            </Flex>

            <Flex direction={{ base: "column", md: "row" }} gap={4} mb={6} justify="space-between">
                <Flex flex={1} maxW="500px" align="center" {...controlStyles} bg="#0A0A0A">
                    <Icon as={LuSearch} color={brandColor} mr={2} strokeWidth="2.5" />
                    <Input 
                        placeholder={activeTab === "Services" ? "Search services or endpoints..." : "Search logs by trace ID or message..."} 
                        border="none" color="white" h="full" px={0} 
                        _focus={{ boxShadow: "none", outline: "none" }} 
                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                </Flex>
                <Flex gap={3}>
                    <Button size="sm" h="44px" px={6} variant="outline" borderColor="#333333" bg="#0A0A0A" color="white" rounded="none" _hover={{ bg: "#111111" }} display="flex" gap={2}>
                        <Icon as={LuFilter} color={brandColor} strokeWidth="2.5" /> Filter
                    </Button>
                </Flex>
            </Flex>

            {/* --- TAB CONTENT --- */}
            {activeTab === "Services" ? (
                <Box bg="#0A0A0A" border="1px solid #1A1A1A" overflowX="auto">
                    <Box minW="900px">
                        <Grid templateColumns="2.5fr 1fr 1fr 1fr 1fr" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid #333333">
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Service Name</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Type</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Current Status</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Latency</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Uptime (30d)</Text>
                        </Grid>

                        <VStack align="stretch" gap={0}>
                            {SERVICES.map((service, idx) => (
                                <Grid 
                                    key={idx} templateColumns="2.5fr 1fr 1fr 1fr 1fr" gap={4} px={6} py={5} 
                                    borderBottom="1px solid #1A1A1A" alignItems="center" 
                                    _hover={{ bg: "#111111" }} transition="background 0.2s"
                                >
                                    <Flex align="center" gap={4}>
                                        <Flex boxSize="36px" bg="#111111" border="1px solid #333333" align="center" justify="center" rounded="none">
                                            
                                            <Icon as={service.icon} color={brandColor} boxSize="18px" />
                                        </Flex>
                                        <Text color="white" fontSize="sm" fontWeight="bold">{service.name}</Text>
                                    </Flex>
                                    
                                    <Text color="#888888" fontSize="sm">{service.type}</Text>
                                    
                                    <Flex align="center" gap={2}>
                                        <Icon 
                                            as={service.status === "Operational" ? LuCheck : LuActivity} 
                                            color={service.statusColor} boxSize="14px" strokeWidth="3" 
                                        />
                                        <Text color="white" fontSize="sm" fontWeight="bold">{service.status}</Text>
                                    </Flex>

                                    <Box>
                                        <Text color="white" fontSize="sm" fontWeight="bold" fontFamily="monospace" mb={1}>{service.latency}</Text>
                                        <Progress.Root value={parseInt(service.latency) / 10} h="2px" w="60%">
                                            <Progress.Track bg="#333333">
                                                
                                                <Progress.Range bg={parseInt(service.latency) > 500 ? "orange.400" : brandColor} />
                                            </Progress.Track>
                                        </Progress.Root>
                                    </Box>

                                    <Text color="white" fontSize="sm" fontWeight="bold" textAlign="right" fontFamily="monospace">{service.uptime}</Text>
                                </Grid>
                            ))}
                        </VStack>
                    </Box>
                </Box>
            ) : (
                /* --- TERMINAL LOGS TABLE --- */
                <Box bg="#0A0A0A" border="1px solid #1A1A1A" overflowX="auto">
                    <Box minW="1000px">
                        <Grid templateColumns="1fr 2fr 1.5fr 3fr 1fr" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid #333333">
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Trace ID / Time</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Service</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Error Code</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Message</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Status</Text>
                        </Grid>

                        <VStack align="stretch" gap={0}>
                            {ERROR_LOGS.map((log) => (
                                <Grid 
                                    key={log.id} templateColumns="1fr 2fr 1.5fr 3fr 1fr" gap={4} px={6} py={4} 
                                    borderBottom="1px solid #1A1A1A" alignItems="start" 
                                    _hover={{ bg: "#111111" }} transition="background 0.2s"
                                >
                                    <Box>
                                        <Flex align="center" gap={2} mb={1}>
                                            <Icon as={LuTerminal} color="#555555" boxSize="12px" />
                                            <Text color="#888888" fontSize="11px" fontFamily="monospace">{log.id}</Text>
                                        </Flex>
                                        <Text color="white" fontSize="xs" fontWeight="bold">{log.time}</Text>
                                    </Box>
                                    
                                    <Box>
                                        <Text color="white" fontSize="sm" fontWeight="bold" mb={0.5}>{log.service}</Text>
                                        <Text color="#555555" fontSize="11px" fontFamily="monospace">{log.endpoint}</Text>
                                    </Box>

                                    <Box>
                                        <Badge bg="#111111" color={log.code.includes("5") || log.code.includes("4") ? "orange.400" : brandColor} border="1px solid #333333" rounded="none" px={2} py={0.5} fontSize="10px" fontWeight="bold" textTransform="uppercase">
                                            {log.code}
                                        </Badge>
                                    </Box>

                                    <Text color="#888888" fontSize="sm" fontFamily="monospace">{log.message}</Text>

                                    <Flex justify="flex-end">
                                        <Badge 
                                            bg="#111111" 
                                            color={log.status === "Resolved" ? "white" : "orange.400"} 
                                            border="1px solid #333333" 
                                            rounded="none" px={2} py={1} fontSize="10px" fontWeight="bold" textTransform="uppercase"
                                        >
                                            {log.status}
                                        </Badge>
                                    </Flex>
                                </Grid>
                            ))}
                        </VStack>
                    </Box>
                </Box>
            )}

        </Box>
    );
}
"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Grid, SimpleGrid, Icon, Badge, Button, Input, VStack, HStack, IconButton
} from "@chakra-ui/react";
import { 
    LuZap, LuPlus, LuSearch, LuFilter, LuActivity, LuCircleAlert, LuMoveHorizontal,
    LuClock, LuCheck, LuPlay, LuPause, 
} from "react-icons/lu";


const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };

// --- MOCK DATA ---
const KPI_STATS = [
    { label: "Active Rules", value: "14", trend: "+2", isPositive: true, icon: LuZap, iconColor: "#5cac7d" },
    { label: "Triggers (24h)", value: "3,402", trend: "+12%", isPositive: true, icon: LuActivity, iconColor: "blue.400" },
    { label: "Auto-Actions Taken", value: "89", trend: "-5%", isPositive: false, icon: LuCheck, iconColor: "purple.400" },
    { label: "System Failures", value: "0", trend: "0%", isPositive: true, icon: LuCircleAlert, iconColor: "red.400" },
];

const INITIAL_AUTOMATION_RULES = [
    { 
        id: "RUL-001", 
        name: "High Refund Rate Guard", 
        category: "Risk & Fraud",
        condition: "IF shop.refund_rate > 15% AND timeframe = 7d", 
        action: "THEN Auto-pause store AND Alert Risk Team",
        status: "Active",
        lastTriggered: "12 mins ago",
        triggers24h: 4
    },
    { 
        id: "RUL-002", 
        name: "Velocity Fraud Spike", 
        category: "Security",
        condition: "IF user.purchases > 5 AND timeframe < 10m", 
        action: "THEN Block account AND Flag for manual review",
        status: "Active",
        lastTriggered: "1 hour ago",
        triggers24h: 12
    },
    { 
        id: "RUL-003", 
        name: "Inventory Depletion Warning", 
        category: "Commerce",
        condition: "IF product.stock < 5 AND product.sales_velocity == 'High'", 
        action: "THEN Send Email to Merchant AND Add 'Low Stock' badge",
        status: "Paused",
        lastTriggered: "2 days ago",
        triggers24h: 0
    },
    { 
        id: "RUL-004", 
        name: "New Seller Probation Lift", 
        category: "Operations",
        condition: "IF shop.age > 30d AND shop.disputes == 0 AND shop.gmv > ₦500k", 
        action: "THEN Upgrade tier to 'Verified' AND Unlock instant payouts",
        status: "Active",
        lastTriggered: "4 hours ago",
        triggers24h: 31
    }
];

const EXECUTION_LOGS = [
    { id: "LOG-992", time: "10:42 AM", rule: "High Refund Rate Guard", target: "Shop: Gadget World", action: "Store Paused", status: "Success" },
    { id: "LOG-991", time: "09:15 AM", rule: "Velocity Fraud Spike", target: "User: USR-8812A", action: "Account Blocked", status: "Success" },
    { id: "LOG-990", time: "08:30 AM", rule: "New Seller Probation Lift", target: "Shop: Urban Kicks NG", action: "Tier Upgraded", status: "Success" },
    { id: "LOG-989", time: "08:12 AM", rule: "High Refund Rate Guard", target: "Shop: Sneaker Headz", action: "Risk Alert Sent", status: "Success" },
];

export default function AutomationEnginePage() {
    const brandColor = "#5cac7d";
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"Rules" | "Logs">("Rules");

    // --- STATE FOR ADDING RULES ---
    const [rules, setRules] = useState(INITIAL_AUTOMATION_RULES);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newRule, setNewRule] = useState({ name: "", category: "Security", condition: "", action: "" });

    // --- ADD RULE LOGIC ---
    const handleAddRule = () => {
        if (!newRule.name.trim() || !newRule.condition.trim() || !newRule.action.trim()) return;

        const ruleToAdd = {
            id: `RUL-00${rules.length + 1}`,
            name: newRule.name,
            category: newRule.category,
            condition: `IF ${newRule.condition}`,
            action: `THEN ${newRule.action}`,
            status: "Active",
            lastTriggered: "Never",
            triggers24h: 0
        };

        setRules([ruleToAdd, ...rules]);
        setIsAddModalOpen(false);
        setNewRule({ name: "", category: "Security", condition: "", action: "" }); // Reset form
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1600px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* --- ADD RULE MODAL --- */}
            {isAddModalOpen && (
                <Box position="fixed" inset={0} zIndex={9999} bg="blackAlpha.800" backdropFilter="blur(4px)" display="flex" alignItems="center" justifyContent="center" p={4}>
                    <Box bg="#0A0A0A" border="1px solid #333333" rounded="none" w="full" maxW="500px" p={6} shadow="2xl">
                        <Text fontSize="xl" fontWeight="black" color="white" mb={6} letterSpacing="tight">Create New Rule</Text>
                        
                        <VStack gap={5} align="stretch">
                            <Box>
                                <Text color="#888888" fontSize="xs" fontWeight="bold" mb={2} textTransform="uppercase" letterSpacing="wider">Rule Name</Text>
                                <Input value={newRule.name} onChange={(e) => setNewRule({...newRule, name: e.target.value})} bg="#111111" border="1px solid #333333" color="white" rounded="none" _focus={{ borderColor: "white", outline: "none", boxShadow: "none" }} placeholder="e.g., Bulk Order Flag" />
                            </Box>
                            <Box>
                                <Text color="#888888" fontSize="xs" fontWeight="bold" mb={2} textTransform="uppercase" letterSpacing="wider">Category</Text>
                                <select 
                                    style={{ width: '100%', height: '40px', padding: '0 12px', background: '#111111', border: '1px solid #333333', color: 'white', outline: 'none', cursor: 'pointer' }} 
                                    value={newRule.category} onChange={(e) => setNewRule({...newRule, category: e.target.value})}
                                >
                                    <option value="Security">Security</option>
                                    <option value="Risk & Fraud">Risk & Fraud</option>
                                    <option value="Commerce">Commerce</option>
                                    <option value="Operations">Operations</option>
                                </select>
                            </Box>
                            <Box>
                                <Text color="#888888" fontSize="xs" fontWeight="bold" mb={2} textTransform="uppercase" letterSpacing="wider">Condition (IF)</Text>
                                <Input value={newRule.condition} onChange={(e) => setNewRule({...newRule, condition: e.target.value})} bg="#111111" border="1px solid #333333" color="white" rounded="none" _focus={{ borderColor: "white", outline: "none", boxShadow: "none" }} placeholder="e.g., order.amount > 500000" />
                            </Box>
                            <Box>
                                <Text color="#888888" fontSize="xs" fontWeight="bold" mb={2} textTransform="uppercase" letterSpacing="wider">Action (THEN)</Text>
                                <Input value={newRule.action} onChange={(e) => setNewRule({...newRule, action: e.target.value})} bg="#111111" border="1px solid #333333" color="white" rounded="none" _focus={{ borderColor: "white", outline: "none", boxShadow: "none" }} placeholder="e.g., Flag for manual review" />
                            </Box>
                        </VStack>

                        <Flex justify="flex-end" gap={3} mt={8}>
                            <Button onClick={() => setIsAddModalOpen(false)} variant="ghost" color="#888888" _hover={{ color: "white", bg: "#111111" }} rounded="none">Cancel</Button>
                            <Button onClick={handleAddRule} bg="white" color="black" rounded="none" _hover={{ bg: "#e0e0e0" }}>Save Rule</Button>
                        </Flex>
                    </Box>
                </Box>
            )}

            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} direction={{ base: "column", md: "row" }} gap={4} mb={8}>
                <Box>
                    <Flex align="center" gap={3} mb={1}>
                        <Icon as={LuZap} color={brandColor} boxSize="24px" strokeWidth="2.5" />
                        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight">
                            Automation Engine
                        </Text>
                    </Flex>
                    <Text color="#888888" fontSize="sm">Manage system-wide triggers, conditional logic, and automated actions.</Text>
                </Box>
                
                <Button onClick={() => setIsAddModalOpen(true)} bg="#111111" border="1px solid #333333" color="white" h="44px" px={6} rounded="none" _hover={{ bg: "#1A1A1A" }} display="flex" gap={2}>
                    <Icon as={LuPlus} color={brandColor} strokeWidth="2.5" /> New Rule
                </Button>
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
                    color={activeTab === "Rules" ? "white" : "#888888"} fontWeight="bold" pb={3} cursor="pointer"
                    borderBottom="2px solid" borderColor={activeTab === "Rules" ? "white" : "transparent"}
                    onClick={() => setActiveTab("Rules")} transition="all 0.2s"
                >
                    Active Rules
                </Text>
                <Text 
                    color={activeTab === "Logs" ? "white" : "#888888"} fontWeight="bold" pb={3} cursor="pointer"
                    borderBottom="2px solid" borderColor={activeTab === "Logs" ? "white" : "transparent"}
                    onClick={() => setActiveTab("Logs")} transition="all 0.2s"
                >
                    Execution Logs
                </Text>
            </Flex>

            <Flex direction={{ base: "column", md: "row" }} gap={4} mb={6} justify="space-between">
                <Flex flex={1} maxW="500px" align="center" {...controlStyles} bg="#0A0A0A">
                   
                    <Icon as={LuSearch} color={brandColor} mr={2} strokeWidth="2.5" />
                    <Input 
                        placeholder={activeTab === "Rules" ? "Search rules by name or category..." : "Search logs by target or rule..."} 
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
            {activeTab === "Rules" ? (
                <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
                   
                    {rules.map((rule) => (
                        <Box key={rule.id} bg="#0A0A0A" border="1px solid" borderColor={rule.status === "Active" ? "#333333" : "#1A1A1A"} p={6} rounded="none" position="relative" overflow="hidden" _hover={{ borderColor: "#555555" }} transition="all 0.2s">
                            
                            {rule.status === "Paused" && <Box position="absolute" top={0} left={0} w="4px" h="full" bg="#333333" />}
                          
                            {rule.status === "Active" && <Box position="absolute" top={0} left={0} w="4px" h="full" bg="white" />}

                            <Flex justify="space-between" align="start" mb={6}>
                                <Box>
                                    <Badge bg="#111111" color="white" border="1px solid #333333" rounded="none" px={2} py={0.5} fontSize="9px" mb={3} textTransform="uppercase">
                                        {rule.category}
                                    </Badge>
                                    <Text color={rule.status === "Active" ? "white" : "#888888"} fontSize="lg" fontWeight="black" letterSpacing="tight">{rule.name}</Text>
                                </Box>
                                <HStack gap={2}>
                                    <Badge bg="#111111" color={rule.status === "Active" ? "white" : "#555555"} border="1px solid #333333" px={3} py={1} rounded="none" textTransform="uppercase" fontSize="10px">
                                        {rule.status}
                                    </Badge>
                                    <IconButton aria-label="Options" variant="ghost" color="#888888" size="sm" _hover={{ color: "white", bg: "#111111" }}>
                                        
                                        <Icon as={LuMoveHorizontal} color={brandColor} />
                                    </IconButton>
                                </HStack>
                            </Flex>

                            {/* LOGIC BLOCK */}
                            <Box bg="#111111" border="1px solid #1A1A1A" p={4} rounded="none" mb={6}>
                                <Text fontSize="sm" color="white" fontWeight="bold" fontFamily="monospace" mb={2}>
                                    <Text as="span" color="#888888" mr={2}>IF</Text> {rule.condition.replace("IF ", "")}
                                </Text>
                                <Text fontSize="sm" color="white" fontWeight="bold" fontFamily="monospace">
                                    <Text as="span" color="#888888" mr={2}>THEN</Text> {rule.action.replace("THEN ", "")}
                                </Text>
                            </Box>

                            <Flex justify="space-between" align="center" borderTop="1px solid #1A1A1A" pt={4}>
                                <HStack gap={6}>
                                    <Flex align="center" gap={2} color="#888888">
                                       
                                        <Icon as={LuClock} color="orange.400" boxSize="14px" />
                                        <Text fontSize="xs" fontWeight="bold">{rule.lastTriggered}</Text>
                                    </Flex>
                                    <Flex align="center" gap={2} color="#888888">
                                       
                                        <Icon as={LuActivity} color="blue.400" boxSize="14px" />
                                        <Text fontSize="xs" fontWeight="bold">{rule.triggers24h} triggers (24h)</Text>
                                    </Flex>
                                </HStack>
                                <Button 
                                    size="sm" variant="ghost" color="white" _hover={{ bg: "#111111" }} display="flex" gap={2}
                                    onClick={() => {
                                        setRules(rules.map(r => r.id === rule.id ? { ...r, status: r.status === "Active" ? "Paused" : "Active" } : r));
                                    }}
                                >
                                    <Icon as={rule.status === "Active" ? LuPause : LuPlay} color={rule.status === "Active" ? "red.400" : brandColor} />
                                    {rule.status === "Active" ? "Pause Rule" : "Activate"}
                                </Button>
                            </Flex>
                        </Box>
                    ))}
                </Grid>
            ) : (
                /* --- LOGS TABLE --- */
                <Box bg="#0A0A0A" border="1px solid #1A1A1A" overflowX="auto">
                    <Box minW="900px">
                        <Grid templateColumns="1fr 2fr 2fr 1.5fr 1fr" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid #333333">
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Time / ID</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Rule Triggered</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Target</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Action Taken</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Status</Text>
                        </Grid>

                        <VStack align="stretch" gap={0}>
                            {EXECUTION_LOGS.map((log) => (
                                <Grid 
                                    key={log.id} templateColumns="1fr 2fr 2fr 1.5fr 1fr" gap={4} px={6} py={4} 
                                    borderBottom="1px solid #1A1A1A" alignItems="center" 
                                    _hover={{ bg: "#111111" }} transition="background 0.2s"
                                >
                                    <Box>
                                        <Text color="white" fontSize="sm" fontWeight="bold">{log.time}</Text>
                                        <Text color="#555555" fontSize="11px" fontFamily="monospace">{log.id}</Text>
                                    </Box>
                                    <Text color="white" fontSize="sm" fontWeight="medium">{log.rule}</Text>
                                    <Text color="#888888" fontSize="sm" fontFamily="monospace">{log.target}</Text>
                                    <Text color="white" fontSize="sm" fontWeight="bold">{log.action}</Text>
                                    <Flex justify="flex-end">
                                        <Badge bg="#111111" color="white" border="1px solid #333333" rounded="none" px={2} py={1} fontSize="10px" fontWeight="bold" textTransform="uppercase">
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
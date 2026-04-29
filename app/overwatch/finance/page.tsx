"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Button, Icon, Grid, Badge, VStack, SimpleGrid, 
    Input, IconButton, Avatar
} from "@chakra-ui/react";
import { 
    LuWallet, LuTrendingUp, LuArrowDownRight, LuArrowUpRight, 
    LuDownload, LuSearch, LuFilter, LuClock, LuCheck, LuX 
} from "react-icons/lu";

// --- MOCK FINANCE DATA ---
const KPI_DATA = [
    { label: "Total Processed (GMV)", value: "₦45,250,000", trend: "+12.5%", isPositive: true, icon: LuTrendingUp },
    { label: "Platform Revenue (3%)", value: "₦1,357,500", trend: "+15.2%", isPositive: true, icon: LuWallet },
    { label: "Pending Payouts", value: "₦4,850,000", trend: "-2.4%", isPositive: false, icon: LuClock },
];

const MOCK_PAYOUTS = [
    { id: "TRX-8923", store: "Urban Kicks", owner: "Wada Gift", amount: "₦1,250,000", fee: "₦37,500", status: "pending", date: "Today, 10:45 AM" },
    { id: "TRX-8922", store: "OGDior", owner: "David O.", amount: "₦850,000", fee: "₦25,500", status: "completed", date: "Yesterday, 04:20 PM" },
    { id: "TRX-8921", store: "Tech Haven", owner: "Sarah C.", amount: "₦3,400,000", fee: "₦102,000", status: "completed", date: "Mar 28, 09:15 AM" },
    { id: "TRX-8920", store: "Glamour Beauty", owner: "Amina Y.", amount: "₦120,000", fee: "₦3,600", status: "failed", date: "Mar 27, 02:30 PM" },
    { id: "TRX-8919", store: "Urban Kicks", owner: "Wada Gift", amount: "₦950,000", fee: "₦28,500", status: "completed", date: "Mar 25, 11:00 AM" },
];

// Mock Data for the CSS Bar Chart
const CHART_DATA = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100];

export default function SuperAdminFinancePage() {
    const brandColor = "#5cac7d";
    const [activeTab, setActiveTab] = useState("payouts");
    


   
    const getStatusUI = (status: string) => {
        switch (status) {
            case "completed": return { iconColor: "#5cac7d", icon: LuCheck }; 
            case "pending": return { iconColor: "orange.400", icon: LuClock };
            case "failed": return { iconColor: "red.400", icon: LuX }; 
            default: return { iconColor: "gray.500", icon: LuClock };
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* --- COMBINED STICKY HEADER & TOOLBAR --- */}
            <Box 
                position="sticky" top="0" zIndex={30} 
                bg="#000000" 
                mx={{ base: "-16px", lg: "-32px" }} px={{ base: "16px", lg: "32px" }}
                pt={{ base: 4, lg: 8 }} pb={6} mb={8} 
                borderBottom="1px solid #1A1A1A"
            >
                {/* Title & Actions */}
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={6} gap={4}>
                    <Box>
                        <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">Financial Overview</Text>
                        <Text color="#888888" fontSize="sm">Track platform revenue, GMV, and manage merchant settlements.</Text>
                    </Box>
                    <Flex gap={3} w={{ base: "full", sm: "auto" }}>
                        <Button flex={1} bg="#111111" border="1px solid #333333" color="white" rounded="none" h="44px" px={6} _hover={{ bg: "#1A1A1A", borderColor: "white" }} display="flex" gap={2} fontWeight="bold">
                            <Icon as={LuDownload} color="#888888" strokeWidth="2.5" /> Export CSV
                        </Button>
                        <Button flex={1} bg="white" color="black" border="none" rounded="none" h="44px" px={6} _hover={{ bg: "#E5E5E5" }} fontWeight="bold">
                            Process Payouts
                        </Button>
                    </Flex>
                </Flex>

                {/* Filters & Search */}
                <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
                    <Flex flex={1} minW="300px" align="center" bg="#0A0A0A" border="1px solid #333333" rounded="none" px={4} h="44px" _focusWithin={{ borderColor: "white" }}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input 
                            placeholder="Search store, owner, or TRX ID..." border="none" color="white" h="full" px={0} 
                            _focus={{ boxShadow: "none", outline: "none" }}
                        />
                    </Flex>
                    
                    <Flex gap={3} w={{ base: "full", md: "auto" }}>
                        <IconButton aria-label="Filter" bg="#111111" border="1px solid #333333" color="white" rounded="none" h="44px" w="44px" _hover={{ bg: "#1A1A1A" }}>
                            <Icon as={LuFilter} strokeWidth="2.5" />
                        </IconButton>
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

            {/* --- CHARTS & TABS AREA --- */}
            <Grid templateColumns={{ base: "1fr", xl: "1fr 350px" }} gap={8} mb={8}>
                
                {/* Left: Interactive Ledger */}
                <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" overflow="hidden">
                    
                    {/* Tabs Header */}
                    <Flex bg="#111111" borderBottom="1px solid" borderColor="#333333" px={4} py={3}>
                        <Flex bg="#000000" border="1px solid #333333" p={1} rounded="none" gap={1}>
                            {["payouts", "platform_fees", "refunds"].map((tab) => (
                                <Button 
                                    key={tab} size="sm" variant="ghost" rounded="none" px={4} h="32px"
                                    bg={activeTab === tab ? "#111111" : "transparent"} 
                                    color={activeTab === tab ? "white" : "#888888"}
                                    border={activeTab === tab ? "1px solid #333333" : "1px solid transparent"}
                                    _hover={{ bg: "#111111", color: "white" }} onClick={() => setActiveTab(tab)}
                                    fontWeight="bold" textTransform="uppercase" fontSize="10px" letterSpacing="wider"
                                >
                                    {tab.replace("_", " ")}
                                </Button>
                            ))}
                        </Flex>
                    </Flex>

                    {/* Table Data */}
                    <Box overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                        <Box minW="800px">
                            <Grid templateColumns="1.5fr 1.5fr 1fr 1fr 1fr 50px" gap={4} px={6} py={4} bg="#0A0A0A" borderBottom="1px solid" borderColor="#1A1A1A">
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Transaction ID</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Store Details</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Gross Amount</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Platform Fee</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="center">Status</Text>
                            </Grid>

                            <VStack align="stretch" gap={0}>
                                {MOCK_PAYOUTS.map((trx, idx) => {
                                    const statusUI = getStatusUI(trx.status);
                                    return (
                                        <Grid 
                                            key={idx} templateColumns="1.5fr 1.5fr 1fr 1fr 1fr 50px" gap={4} px={6} py={4} 
                                            borderBottom="1px solid" borderColor="#1A1A1A" alignItems="center"
                                            _hover={{ bg: "#111111" }} transition="all 0.2s" cursor="pointer"
                                        >
                                            <Box>
                                                <Text color="white" fontWeight="bold" fontSize="sm" letterSpacing="tight">{trx.id}</Text>
                                                <Text color="#888888" fontSize="xs" fontFamily="monospace" mt={0.5}>{trx.date}</Text>
                                            </Box>
                                            
                                            <Flex align="center" gap={3}>
                                                <Avatar.Root size="sm" rounded="full">
                                                    <Avatar.Fallback name={trx.store} bg="#111111" border="1px solid #333333" color="white" rounded="none" fontWeight="bold" />
                                                </Avatar.Root>
                                                <Box>
                                                    <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1} letterSpacing="tight">{trx.store}</Text>
                                                    <Text color="#888888" fontSize="xs" lineClamp={1}>{trx.owner}</Text>
                                                </Box>
                                            </Flex>

                                            <Text color="white" fontWeight="black" fontSize="sm" textAlign="right" letterSpacing="tight">{trx.amount}</Text>
                                            <Text color="white" fontWeight="bold" fontSize="sm" textAlign="right" letterSpacing="tight">-{trx.fee}</Text>

                                            <Flex justify="center">
                                                <Flex align="center" gap={1.5} px={2} py={1} bg="#111111" border="1px solid #333333" rounded="none" display="inline-flex">
                                                    <Icon as={statusUI.icon} color={statusUI.iconColor} strokeWidth="3" boxSize="12px" />
                                                    <Text color="white" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                                        {trx.status}
                                                    </Text>
                                                </Flex>
                                            </Flex>

                                            <Flex justify="flex-end">
                                                <Button size="xs" variant="ghost" rounded="none" color="#888888" _hover={{ color: "white", bg: "#1A1A1A" }} fontWeight="bold" textTransform="uppercase" letterSpacing="wider">View</Button>
                                            </Flex>
                                        </Grid>
                                    );
                                })}
                            </VStack>
                        </Box>
                    </Box>
                </Box>

                {/* Right: Revenue Chart & Quick Actions */}
                <VStack gap={8} align="stretch">
                    
                    <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Text color="white" fontSize="lg" fontWeight="bold" letterSpacing="tight" mb={1}>Revenue History</Text>
                        <Text color="#888888" fontSize="sm" mb={8}>Platform fees over the last 12 months</Text>
                        
                        <Flex h="150px" align="flex-end" justify="space-between" gap={2} mb={4}>
                            {CHART_DATA.map((val, i) => (
                                <Flex key={i} direction="column" align="center" gap={2} flex={1}>
                                    <Box w="full" maxW="20px" h={`${val}%`} bg={i === CHART_DATA.length - 1 ? brandColor : "#333333"} rounded="none" transition="all 0.2s" _hover={{ bg: "white" }} cursor="pointer" />
                                </Flex>
                            ))}
                        </Flex>
                        <Flex justify="space-between" color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                            <Text>Jan</Text>
                            <Text>Jun</Text>
                            <Text>Dec</Text>
                        </Flex>
                    </Box>

                    {/* Quick Transfer Action */}
                    <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex align="center" justify="center" boxSize="48px" bg="#111111" border="1px solid #333333" color="white" rounded="none" mb={5}>
                            <Icon as={LuWallet} fontSize="xl" strokeWidth="2.5" />
                        </Flex>
                        <Text color="white" fontSize="lg" fontWeight="bold" letterSpacing="tight" mb={2}>Manual Payout</Text>
                        <Text color="#888888" fontSize="sm" mb={6}>Force a manual settlement to a specific merchant account outside of the automated schedule.</Text>
                        <Button w="full" bg="#111111" border="1px solid #333333" color="white" rounded="none" h="44px" fontWeight="bold" _hover={{ bg: "#1A1A1A", borderColor: "white" }}>
                            Initiate Transfer
                        </Button>
                    </Box>
                </VStack>

            </Grid>
        </Box>
    );
}
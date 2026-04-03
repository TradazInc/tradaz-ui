
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
            case "completed": return { color: "green.400", bg: "rgba(72, 187, 120, 0.15)", icon: LuCheck }; 
            case "pending": return { color: "yellow.400", bg: "rgba(236, 201, 75, 0.15)", icon: LuClock };
            case "failed": return { color: "red.400", bg: "rgba(229, 62, 62, 0.15)", icon: LuX }; 
            default: return { color: "gray.400", bg: "whiteAlpha.100", icon: LuClock };
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={8} gap={4}>
                <Box>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">Financial Overview</Text>
                    <Text color="gray.400" fontSize="sm">Track platform revenue, GMV, and manage merchant settlements.</Text>
                </Box>
                <Flex gap={3}>
                    <Button bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.200" color="white" rounded="lg" h="45px" px={6} _hover={{ bg: "whiteAlpha.50" }} display="flex" gap={2}>
                        <Icon as={LuDownload} /> Export CSV
                    </Button>
                    <Button bg={brandColor} color="white" rounded="lg" h="45px" px={6} _hover={{ filter: "brightness(1.1)" }}>
                        Process Payouts
                    </Button>
                </Flex>
            </Flex>

            {/* --- KPI CARDS --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                {KPI_DATA.map((kpi, idx) => (
                    <Box key={idx} bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" position="relative" overflow="hidden">
                        
                        {idx === 1 && <Box position="absolute" top="-20px" right="-20px" boxSize="100px" bg={brandColor} filter="blur(50px)" opacity={0.3} borderRadius="full" />}
                        
                        <Flex justify="space-between" align="flex-start" mb={4}>
                            <Flex align="center" justify="center" boxSize="40px" rounded="lg" bg={idx === 1 ? "rgba(92, 172, 125, 0.15)" : "whiteAlpha.100"} color={idx === 1 ? brandColor : "gray.400"}>
                                <Icon as={kpi.icon} fontSize="xl" />
                            </Flex>
                            <Badge 
                                bg={kpi.isPositive ? "rgba(72, 187, 120, 0.1)" : "rgba(229, 62, 62, 0.1)"} 
                                color={kpi.isPositive ? "green.400" : "red.400"} 
                                px={2} py={1} rounded="md" display="flex" alignItems="center" gap={1}
                            >
                                <Icon as={kpi.isPositive ? LuArrowUpRight : LuArrowDownRight} />
                                {kpi.trend}
                            </Badge>
                        </Flex>
                        <Text color="gray.500" fontSize="sm" fontWeight="bold" textTransform="uppercase" mb={1}>{kpi.label}</Text>
                        <Text color="white" fontSize="3xl" fontWeight="black">{kpi.value}</Text>
                    </Box>
                ))}
            </SimpleGrid>

            {/* --- CHARTS & TABS AREA --- */}
            <Grid templateColumns={{ base: "1fr", xl: "1fr 350px" }} gap={8} mb={8}>
                
                {/* Left: Interactive Ledger */}
                <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden">
                    
                    {/* Tabs & Filters Header */}
                    <Flex justify="space-between" align="center" p={6} borderBottom="1px solid" borderColor="whiteAlpha.100" flexWrap="wrap" gap={4}>
                        <Flex bg="blackAlpha.400" p={1} rounded="lg" border="1px solid" borderColor="whiteAlpha.100">
                            {["payouts", "platform_fees", "refunds"].map((tab) => (
                                <Button 
                                    key={tab} size="sm" variant="ghost" rounded="md" px={4} textTransform="capitalize"
                                    bg={activeTab === tab ? "whiteAlpha.200" : "transparent"} 
                                    color={activeTab === tab ? "white" : "gray.500"}
                                    _hover={{ color: "white" }} onClick={() => setActiveTab(tab)}
                                >
                                    {tab.replace("_", " ")}
                                </Button>
                            ))}
                        </Flex>

                        <Flex gap={3}>
                            <Flex align="center" bg="#121212" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" px={3} h="36px">
                                <Icon as={LuSearch} color="gray.500" />
                                <Input placeholder="Search store or TRX ID..." border="none" color="white" h="full" _focus={{ boxShadow: "none" }} fontSize="sm" w="200px" />
                            </Flex>
                            <IconButton aria-label="Filter" bg="#121212" border="1px solid" borderColor="whiteAlpha.200" color="gray.400" rounded="lg" h="36px" _hover={{ bg: "whiteAlpha.100" }}>
                                <Icon as={LuFilter} />
                            </IconButton>
                        </Flex>
                    </Flex>

                    {/* Table Data */}
                    <Box overflowX="auto">
                        <Box minW="800px">
                            <Grid templateColumns="1.5fr 1.5fr 1fr 1fr 1fr 50px" gap={4} px={6} py={4} bg="blackAlpha.200" borderBottom="1px solid" borderColor="whiteAlpha.50">
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Transaction ID</Text>
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Store Details</Text>
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="right">Gross Amount</Text>
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="right">Platform Fee</Text>
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="center">Status</Text>
                            </Grid>

                            <VStack align="stretch" gap={0}>
                                {MOCK_PAYOUTS.map((trx, idx) => {
                                    const statusUI = getStatusUI(trx.status);
                                    return (
                                        <Grid 
                                            key={idx} templateColumns="1.5fr 1.5fr 1fr 1fr 1fr 50px" gap={4} px={6} py={4} 
                                            borderBottom="1px solid" borderColor="whiteAlpha.50" alignItems="center"
                                            _hover={{ bg: "whiteAlpha.50" }} transition="all 0.2s" cursor="pointer"
                                        >
                                            <Box>
                                                <Text color="white" fontWeight="bold" fontSize="sm">{trx.id}</Text>
                                                <Text color="gray.500" fontSize="xs">{trx.date}</Text>
                                            </Box>
                                            
                                            <Flex align="center" gap={3}>
                                                <Avatar.Root size="sm" rounded="md">
                                                    <Avatar.Fallback name={trx.store} bg={brandColor} color="white" />
                                                </Avatar.Root>
                                                <Box>
                                                    <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1}>{trx.store}</Text>
                                                    <Text color="gray.500" fontSize="xs" lineClamp={1}>{trx.owner}</Text>
                                                </Box>
                                            </Flex>

                                            <Text color="white" fontWeight="bold" fontSize="sm" textAlign="right">{trx.amount}</Text>
                                            <Text color={brandColor} fontWeight="bold" fontSize="sm" textAlign="right">-{trx.fee}</Text>

                                            <Flex justify="center">
                                                <Badge bg={statusUI.bg} color={statusUI.color} px={2.5} py={1} rounded="md" textTransform="capitalize" display="flex" alignItems="center" gap={1.5}>
                                                    <Icon as={statusUI.icon} boxSize="12px" />
                                                    {trx.status}
                                                </Badge>
                                            </Flex>

                                            <Flex justify="flex-end">
                                                <Button size="xs" variant="ghost" color="gray.400" _hover={{ color: "white" }}>View</Button>
                                            </Flex>
                                        </Grid>
                                    );
                                })}
                            </VStack>
                        </Box>
                    </Box>
                </Box>

                {/* Right: Revenue Chart & Quick Actions */}
                <VStack gap={6} align="stretch">
                    
                
                    <Box bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Text color="white" fontSize="lg" fontWeight="bold" mb={1}>Revenue History</Text>
                        <Text color="gray.500" fontSize="sm" mb={8}>Platform fees over the last 12 months</Text>
                        
                        <Flex h="150px" align="flex-end" justify="space-between" gap={2} mb={4}>
                            {CHART_DATA.map((val, i) => (
                                <Flex key={i} direction="column" align="center" gap={2} flex={1}>
                                    <Box w="full" maxW="20px" h={`${val}%`} bg={i === CHART_DATA.length - 1 ? brandColor : "whiteAlpha.200"} roundedTop="md" transition="all 0.2s" _hover={{ bg: brandColor }} cursor="pointer" />
                                </Flex>
                            ))}
                        </Flex>
                        <Flex justify="space-between" color="gray.600" fontSize="xs" fontWeight="bold" textTransform="uppercase">
                            <Text>Jan</Text>
                            <Text>Jun</Text>
                            <Text>Dec</Text>
                        </Flex>
                    </Box>

                    {/* Quick Transfer Action */}
                    <Box bgGradient="linear(to-br, #1A1C23, #121212)" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Flex align="center" justify="center" boxSize="48px" bg="rgba(92, 172, 125, 0.15)" color={brandColor} rounded="xl" mb={4}>
                            <Icon as={LuWallet} fontSize="2xl" />
                        </Flex>
                        <Text color="white" fontSize="lg" fontWeight="bold" mb={2}>Manual Payout</Text>
                        <Text color="gray.500" fontSize="sm" mb={6}>Force a manual settlement to a specific merchant account outside of the automated schedule.</Text>
                        <Button w="full" bg="whiteAlpha.100" color="white" _hover={{ bg: "whiteAlpha.200" }} h="45px">
                            Initiate Transfer
                        </Button>
                    </Box>
                </VStack>

            </Grid>
        </Box>
    );
}
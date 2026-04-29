"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Button, Icon, Grid, VStack, SimpleGrid, 
    Input, IconButton, Avatar
} from "@chakra-ui/react";
import { 
    LuMegaphone, LuTicket, LuSearch, LuFilter, LuPlus, LuGlobe, 
    LuMail, LuTrendingUp, LuCheck, LuInfo, LuImage, LuMousePointerClick,
    LuClock, LuBan
} from "react-icons/lu";

// --- MOCK MARKETING DATA ---
const KPI_DATA = [
    { label: "Active Campaigns", value: "3", subtext: "Platform homepage banners", icon: LuMegaphone, iconColor: "blue.400" },
    { label: "Voucher Usage", value: "2,450", subtext: "Platform-funded discounts claimed", icon: LuTicket, iconColor: "#5cac7d" },
    { label: "Avg. Tenant SEO", value: "68/100", subtext: "Needs improvement", icon: LuGlobe, iconColor: "orange.400" },
];

const CAMPAIGNS = [
    { id: "CMP-01", title: "Black Friday 2026 Early Access", status: "active", clicks: "14.2k", conversions: "1,205", dates: "Nov 15 - Nov 30" },
    { id: "CMP-02", title: "Summer Sneaker Blowout", status: "scheduled", clicks: "0", conversions: "0", dates: "Jun 01 - Jun 14" },
    { id: "CMP-03", title: "Welcome to Tradaz 10% Off", status: "active", clicks: "45.8k", conversions: "8,940", dates: "Ongoing" },
];

const VOUCHERS = [
    { code: "TRADAZ2026", discount: "10% OFF", type: "percentage", used: 1450, limit: 5000, status: "active" },
    { code: "FREESHIP", discount: "Free Shipping", type: "fixed", used: 500, limit: 500, status: "depleted" },
    { code: "FLASH50", discount: "₦5,000 OFF", type: "fixed", used: 120, limit: 200, status: "active" },
];

const SEO_HEALTH = [
    { store: "Tech Haven", owner: "Sarah C.", score: 92, issues: 0, status: "excellent" },
    { store: "Urban Kicks", owner: "Wada Gift", score: 75, issues: 2, status: "fair" },
    { store: "Glamour Beauty", owner: "Amina Y.", score: 45, issues: 5, status: "poor" },
    { store: "OGDior", owner: "David O.", score: 60, issues: 3, status: "fair" },
];

export default function SuperAdminMarketingPage() {
 
    const [activeTab, setActiveTab] = useState("campaigns");

   
    const getCampaignStatusUI = (status: string) => {
        switch (status) {
            case "active": return { iconColor: "#5cac7d", icon: LuCheck };
            case "scheduled": return { iconColor: "orange.400", icon: LuClock };
            default: return { iconColor: "gray.500", icon: LuBan };
        }
    };

    const getVoucherStatusUI = (status: string) => {
        switch (status) {
            case "active": return { iconColor: "#5cac7d", icon: LuCheck };
            case "depleted": return { iconColor: "red.400", icon: LuBan };
            default: return { iconColor: "gray.500", icon: LuBan };
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
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} gap={4}>
                    <Box>
                        <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">Marketing & SEO</Text>
                        <Text color="#888888" fontSize="sm">Manage global marketplace campaigns, platform vouchers, and tenant SEO.</Text>
                    </Box>
                    <Button bg="#111111" border="1px solid #333333" color="white" rounded="none" h="44px" px={6} _hover={{ bg: "#1A1A1A", borderColor: "white" }} display="flex" gap={2} fontWeight="bold">
                        <Icon as={LuPlus} color="#5cac7d" strokeWidth="2.5" /> Create Asset
                    </Button>
                </Flex>
            </Box>

            {/* --- KPI CARDS --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                {KPI_DATA.map((kpi, idx) => (
                    <Box key={idx} bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex justify="space-between" align="flex-start" mb={4}>
                            <Flex align="center" justify="center" boxSize="40px" rounded="none" bg="#111111" border="1px solid #333333" color="white">
                                <Icon as={kpi.icon} fontSize="lg" color={kpi.iconColor} strokeWidth="2.5" />
                            </Flex>
                        </Flex>
                        <Text color="white" fontSize="3xl" fontWeight="black" mb={1} letterSpacing="tight">{kpi.value}</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{kpi.label}</Text>
                        <Text color="#555555" fontSize="xs" mt={2} fontWeight="bold">{kpi.subtext}</Text>
                    </Box>
                ))}
            </SimpleGrid>

            {/* --- MAIN CONTENT AREA --- */}
            <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" overflow="hidden" minH="500px">
                
                {/* Tabs Header */}
                <Flex justify="space-between" align="center" p={6} borderBottom="1px solid" borderColor="#1A1A1A" flexWrap="wrap" gap={4}>
                    <Flex bg="#000000" p={1} rounded="none" border="1px solid #333333" gap={1}>
                        {[
                            { id: "campaigns", label: "Global Campaigns", icon: LuMegaphone },
                            { id: "vouchers", label: "Platform Vouchers", icon: LuTicket },
                            { id: "seo", label: "Tenant SEO Health", icon: LuGlobe }
                        ].map((tab) => (
                            <Button 
                                key={tab.id} size="sm" variant="ghost" rounded="none" px={4} h="32px"
                                bg={activeTab === tab.id ? "#111111" : "transparent"} 
                                color={activeTab === tab.id ? "white" : "#888888"}
                                border={activeTab === tab.id ? "1px solid #333333" : "1px solid transparent"}
                                _hover={{ bg: "#111111", color: "white" }} onClick={() => setActiveTab(tab.id)}
                                display="flex" gap={2} fontWeight="bold" textTransform="uppercase" fontSize="10px" letterSpacing="wider"
                            >
                                <Icon as={tab.icon} strokeWidth="2.5" />
                                <Text display={{ base: "none", md: "block" }}>{tab.label}</Text>
                            </Button>
                        ))}
                    </Flex>

                    <Flex gap={3}>
                        <Flex align="center" bg="#111111" border="1px solid" borderColor="#333333" rounded="none" px={3} h="40px" _focusWithin={{ borderColor: "white" }}>
                            <Icon as={LuSearch} color="#888888" strokeWidth="2.5" />
                            <Input placeholder="Search..." border="none" color="white" h="full" _focus={{ boxShadow: "none" }} fontSize="sm" w={{ base: "100px", md: "200px" }} px={2} />
                        </Flex>
                        <IconButton aria-label="Filter" bg="#111111" border="1px solid" borderColor="#333333" color="white" rounded="none" h="40px" w="40px" _hover={{ bg: "#1A1A1A" }}>
                            <Icon as={LuFilter} strokeWidth="2.5" />
                        </IconButton>
                    </Flex>
                </Flex>

                {/* --- TAB CONTENT: CAMPAIGNS --- */}
                {activeTab === "campaigns" && (
                    <Box overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                        <Box minW="900px">
                            <Grid templateColumns="2fr 1fr 1fr 1fr 100px" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid" borderColor="#333333">
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Campaign / Banner</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Status</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Performance</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Duration</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Actions</Text>
                            </Grid>
                            <VStack align="stretch" gap={0}>
                                {CAMPAIGNS.map((camp, idx) => {
                                    const statusUI = getCampaignStatusUI(camp.status);
                                    return (
                                        <Grid key={idx} templateColumns="2fr 1fr 1fr 1fr 100px" gap={4} px={6} py={5} borderBottom="1px solid" borderColor="#1A1A1A" alignItems="center" _hover={{ bg: "#111111" }} transition="background 0.2s">
                                            <Flex align="center" gap={4}>
                                                <Flex align="center" justify="center" w="80px" h="45px" bg="#111111" border="1px solid #333333" rounded="none" color="#888888">
                                                    <Icon as={LuImage} strokeWidth="2.5" />
                                                </Flex>
                                                <Box>
                                                    <Text color="white" fontWeight="bold" fontSize="sm" letterSpacing="tight">{camp.title}</Text>
                                                    <Text color="#888888" fontSize="xs" fontFamily="monospace" mt={0.5}>ID: {camp.id}</Text>
                                                </Box>
                                            </Flex>
                                            <Box>
                                                <Flex align="center" gap={1.5} px={2.5} py={1} bg="#111111" border="1px solid #333333" rounded="none" display="inline-flex">
                                                    <Icon as={statusUI.icon} color={statusUI.iconColor} strokeWidth="3" boxSize="12px" />
                                                    <Text color="white" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                                        {camp.status}
                                                    </Text>
                                                </Flex>
                                            </Box>
                                            <Box>
                                                <Flex align="center" gap={2} mb={1.5}>
                                                    <Icon as={LuMousePointerClick} color="#5cac7d" boxSize="14px" strokeWidth="2.5" />
                                                    <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight">{camp.clicks} <Text as="span" color="#888888" fontWeight="bold" fontSize="xs" textTransform="uppercase" letterSpacing="wider">clicks</Text></Text>
                                                </Flex>
                                                <Flex align="center" gap={2}>
                                                    <Icon as={LuTrendingUp} color="blue.400" boxSize="14px" strokeWidth="2.5" />
                                                    <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight">{camp.conversions} <Text as="span" color="#888888" fontWeight="bold" fontSize="xs" textTransform="uppercase" letterSpacing="wider">conv.</Text></Text>
                                                </Flex>
                                            </Box>
                                            <Text color="#888888" fontSize="sm" fontWeight="bold">{camp.dates}</Text>
                                            <Flex justify="flex-end">
                                                <Button size="xs" variant="ghost" rounded="none" color="#888888" _hover={{ color: "white", bg: "#1A1A1A" }} fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Edit</Button>
                                            </Flex>
                                        </Grid>
                                    );
                                })}
                            </VStack>
                        </Box>
                    </Box>
                )}

                {/* --- TAB CONTENT: VOUCHERS --- */}
                {activeTab === "vouchers" && (
                    <Box overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                        <Box minW="800px">
                            <Grid templateColumns="1.5fr 1fr 2fr 1fr 100px" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid" borderColor="#333333">
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Voucher Code</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Discount</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Usage Limit</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Status</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Actions</Text>
                            </Grid>
                            <VStack align="stretch" gap={0}>
                                {VOUCHERS.map((v, idx) => {
                                    const percentUsed = (v.used / v.limit) * 100;
                                    const statusUI = getVoucherStatusUI(v.status);
                                    return (
                                        <Grid key={idx} templateColumns="1.5fr 1fr 2fr 1fr 100px" gap={4} px={6} py={5} borderBottom="1px solid" borderColor="#1A1A1A" alignItems="center" _hover={{ bg: "#111111" }} transition="background 0.2s">
                                            <Box>
                                                <Text color="white" fontFamily="monospace" fontWeight="black" fontSize="lg" letterSpacing="widest">{v.code}</Text>
                                            </Box>
                                            <Text color="white" fontWeight="bold" fontSize="sm" letterSpacing="tight">{v.discount}</Text>
                                            <Box pr={8}>
                                                <Flex justify="space-between" mb={2}>
                                                    <Text color="#888888" fontSize="xs" fontWeight="bold">{v.used} used</Text>
                                                    <Text color="#888888" fontSize="xs" fontWeight="bold">{v.limit} total</Text>
                                                </Flex>
                                                {/* Strict Monochrome Progress Bar */}
                                                <Box w="full" h="6px" bg="#1A1A1A" rounded="none" overflow="hidden">
                                                    <Box 
                                                        h="full" 
                                                        w={`${Math.min(percentUsed, 100)}%`} 
                                                        bg={percentUsed >= 100 ? "red.400" : "white"} 
                                                        transition="width 0.3s ease" 
                                                    />
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Flex align="center" gap={1.5} px={2.5} py={1} bg="#111111" border="1px solid #333333" rounded="none" display="inline-flex">
                                                    <Icon as={statusUI.icon} color={statusUI.iconColor} strokeWidth="3" boxSize="12px" />
                                                    <Text color="white" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                                        {v.status}
                                                    </Text>
                                                </Flex>
                                            </Box>
                                            <Flex justify="flex-end">
                                                <Button size="xs" variant="ghost" rounded="none" color="#888888" _hover={{ color: "white", bg: "#1A1A1A" }} fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Edit</Button>
                                            </Flex>
                                        </Grid>
                                    );
                                })}
                            </VStack>
                        </Box>
                    </Box>
                )}

                {/* --- TAB CONTENT: SEO HEALTH --- */}
                {activeTab === "seo" && (
                    <Box overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                        <Box minW="800px">
                            <Grid templateColumns="1.5fr 1fr 2fr 150px" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid" borderColor="#333333">
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Store Details</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">SEO Score</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Detected Issues</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Actions</Text>
                            </Grid>
                            <VStack align="stretch" gap={0}>
                                {SEO_HEALTH.map((seo, idx) => {
                                    const scoreColor = seo.score > 80 ? "green.400" : seo.score > 50 ? "orange.400" : "red.400";
                                    return (
                                        <Grid key={idx} templateColumns="1.5fr 1fr 2fr 150px" gap={4} px={6} py={5} borderBottom="1px solid" borderColor="#1A1A1A" alignItems="center" _hover={{ bg: "#111111" }} transition="background 0.2s">
                                            <Flex align="center" gap={4}>
                                                <Avatar.Root size="sm" rounded="full">
                                                    <Avatar.Fallback name={seo.store} bg="#111111" border="1px solid #333333" color="white" rounded="none" fontWeight="bold" />
                                                </Avatar.Root>
                                                <Box>
                                                    <Text color="white" fontWeight="bold" fontSize="sm" letterSpacing="tight">{seo.store}</Text>
                                                    <Text color="#888888" fontSize="xs" fontWeight="bold">{seo.owner}</Text>
                                                </Box>
                                            </Flex>
                                            
                                            <Flex align="center" gap={2}>
                                                <Text color="white" fontSize="xl" fontWeight="black">{seo.score}</Text>
                                                <Text color="#888888" fontSize="xs" fontWeight="bold">/ 100</Text>
                                            </Flex>

                                            <Box>
                                                {seo.issues === 0 ? (
                                                    <Flex align="center" gap={2}>
                                                        <Icon as={LuCheck} color="green.400" strokeWidth="3" />
                                                        <Text color="white" fontSize="sm" fontWeight="bold">Fully Optimized</Text>
                                                    </Flex>
                                                ) : (
                                                    <Flex align="center" gap={2}>
                                                        <Icon as={LuInfo} color={scoreColor} strokeWidth="3" />
                                                        <Text color="white" fontSize="sm" fontWeight="bold">{seo.issues} Missing Meta Tags / Descriptions</Text>
                                                    </Flex>
                                                )}
                                            </Box>

                                            <Flex justify="flex-end">
                                                <Button 
                                                    size="sm" bg={seo.issues > 0 ? "#111111" : "transparent"} 
                                                    border={seo.issues > 0 ? "1px solid #333333" : "none"}
                                                    color={seo.issues > 0 ? "white" : "#888888"} 
                                                    rounded="none"
                                                    _hover={seo.issues > 0 ? { bg: "#1A1A1A", borderColor: "white" } : undefined} 
                                                    display="flex" gap={2} fontWeight="bold"
                                                    disabled={seo.issues === 0} 
                                                    opacity={seo.issues === 0 ? 0.5 : 1}
                                                    cursor={seo.issues === 0 ? "not-allowed" : "pointer"}
                                                >
                                                    <Icon as={LuMail} strokeWidth="2.5" /> Nudge Tenant
                                                </Button>
                                            </Flex>
                                        </Grid>
                                    );
                                })}
                            </VStack>
                        </Box>
                    </Box>
                )}

            </Box>
        </Box>
    );
}
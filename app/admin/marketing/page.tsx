"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Button, Icon, Grid, Badge, VStack, SimpleGrid, 
    Input, IconButton, Avatar
} from "@chakra-ui/react";
import { 
    LuMegaphone, LuTicket, LuSearch, LuFilter, LuPlus, LuGlobe, 
    LuMail, LuTrendingUp, LuCheck, LuInfo, LuImage, LuMousePointerClick // ✅ Swapped to LuInfo
} from "react-icons/lu";

// --- MOCK MARKETING DATA ---
const KPI_DATA = [
    { label: "Active Campaigns", value: "3", subtext: "Platform homepage banners", icon: LuMegaphone, color: "blue.400" },
    { label: "Voucher Usage", value: "2,450", subtext: "Platform-funded discounts claimed", icon: LuTicket, color: "#5cac7d" },
    { label: "Avg. Tenant SEO", value: "68/100", subtext: "Needs improvement", icon: LuGlobe, color: "orange.400" },
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
    const brandColor = "#5cac7d";
    const [activeTab, setActiveTab] = useState("campaigns");

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={8} gap={4}>
                <Box>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">Marketing & SEO</Text>
                    <Text color="gray.400" fontSize="sm">Manage global marketplace campaigns, platform vouchers, and tenant SEO.</Text>
                </Box>
                <Button bg={brandColor} color="white" rounded="lg" h="45px" px={6} _hover={{ filter: "brightness(1.1)" }} display="flex" gap={2}>
                    <Icon as={LuPlus} /> Create Asset
                </Button>
            </Flex>

            {/* --- KPI CARDS --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                {KPI_DATA.map((kpi, idx) => (
                    <Box key={idx} bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Flex justify="space-between" align="flex-start" mb={4}>
                            <Flex align="center" justify="center" boxSize="40px" rounded="lg" bg="whiteAlpha.100" color={kpi.color}>
                                <Icon as={kpi.icon} fontSize="xl" />
                            </Flex>
                        </Flex>
                        <Text color="white" fontSize="3xl" fontWeight="black" mb={1}>{kpi.value}</Text>
                        <Text color="gray.400" fontSize="sm" fontWeight="bold">{kpi.label}</Text>
                        <Text color="gray.500" fontSize="xs" mt={1}>{kpi.subtext}</Text>
                    </Box>
                ))}
            </SimpleGrid>

            {/* --- MAIN CONTENT AREA --- */}
            <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden" minH="500px">
                
                {/* Tabs Header */}
                <Flex justify="space-between" align="center" p={6} borderBottom="1px solid" borderColor="whiteAlpha.100" flexWrap="wrap" gap={4}>
                    <Flex bg="blackAlpha.400" p={1} rounded="lg" border="1px solid" borderColor="whiteAlpha.100">
                        {[
                            { id: "campaigns", label: "Global Campaigns", icon: LuMegaphone },
                            { id: "vouchers", label: "Platform Vouchers", icon: LuTicket },
                            { id: "seo", label: "Tenant SEO Health", icon: LuGlobe }
                        ].map((tab) => (
                            <Button 
                                key={tab.id} size="sm" variant="ghost" rounded="md" px={4} 
                                bg={activeTab === tab.id ? "whiteAlpha.200" : "transparent"} 
                                color={activeTab === tab.id ? "white" : "gray.500"}
                                _hover={{ color: "white" }} onClick={() => setActiveTab(tab.id)}
                                display="flex" gap={2}
                            >
                                <Icon as={tab.icon} />
                                <Text display={{ base: "none", md: "block" }}>{tab.label}</Text>
                            </Button>
                        ))}
                    </Flex>

                    <Flex gap={3}>
                        <Flex align="center" bg="#121212" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" px={3} h="36px">
                            <Icon as={LuSearch} color="gray.500" />
                            <Input placeholder="Search..." border="none" color="white" h="full" _focus={{ boxShadow: "none" }} fontSize="sm" w={{ base: "100px", md: "200px" }} />
                        </Flex>
                        <IconButton aria-label="Filter" bg="#121212" border="1px solid" borderColor="whiteAlpha.200" color="gray.400" rounded="lg" h="36px" _hover={{ bg: "whiteAlpha.100" }}>
                            <Icon as={LuFilter} />
                        </IconButton>
                    </Flex>
                </Flex>

                {/* --- TAB CONTENT: CAMPAIGNS --- */}
                {activeTab === "campaigns" && (
                    <Box overflowX="auto">
                        <Box minW="900px">
                            <Grid templateColumns="2fr 1fr 1fr 1fr 100px" gap={4} px={6} py={4} bg="blackAlpha.200" borderBottom="1px solid" borderColor="whiteAlpha.50">
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Campaign / Banner</Text>
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Status</Text>
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Performance</Text>
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Duration</Text>
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="right">Actions</Text>
                            </Grid>
                            <VStack align="stretch" gap={0}>
                                {CAMPAIGNS.map((camp, idx) => (
                                    <Grid key={idx} templateColumns="2fr 1fr 1fr 1fr 100px" gap={4} px={6} py={4} borderBottom="1px solid" borderColor="whiteAlpha.50" alignItems="center" _hover={{ bg: "whiteAlpha.50" }}>
                                        <Flex align="center" gap={4}>
                                            <Flex align="center" justify="center" w="80px" h="45px" bg="whiteAlpha.100" rounded="md" color="gray.500">
                                                <Icon as={LuImage} />
                                            </Flex>
                                            <Box>
                                                <Text color="white" fontWeight="bold" fontSize="sm">{camp.title}</Text>
                                                <Text color="gray.500" fontSize="xs">ID: {camp.id}</Text>
                                            </Box>
                                        </Flex>
                                        <Box>
                                            <Badge bg={camp.status === 'active' ? "rgba(72, 187, 120, 0.15)" : "rgba(236, 201, 75, 0.15)"} color={camp.status === 'active' ? "green.400" : "yellow.400"} px={2.5} py={1} rounded="md" textTransform="capitalize">
                                                {camp.status}
                                            </Badge>
                                        </Box>
                                        <Box>
                                            <Flex align="center" gap={2} mb={1}>
                                                <Icon as={LuMousePointerClick} color="gray.400" boxSize="12px" />
                                                <Text color="white" fontSize="sm" fontWeight="bold">{camp.clicks} <Text as="span" color="gray.500" fontWeight="normal" fontSize="xs">clicks</Text></Text>
                                            </Flex>
                                            <Flex align="center" gap={2}>
                                                <Icon as={LuTrendingUp} color="gray.400" boxSize="12px" />
                                                <Text color="white" fontSize="sm" fontWeight="bold">{camp.conversions} <Text as="span" color="gray.500" fontWeight="normal" fontSize="xs">conv.</Text></Text>
                                            </Flex>
                                        </Box>
                                        <Text color="gray.400" fontSize="sm">{camp.dates}</Text>
                                        <Flex justify="flex-end">
                                            <Button size="xs" variant="ghost" color="gray.400" _hover={{ color: "white" }}>Edit</Button>
                                        </Flex>
                                    </Grid>
                                ))}
                            </VStack>
                        </Box>
                    </Box>
                )}

                {/* --- TAB CONTENT: VOUCHERS --- */}
                {activeTab === "vouchers" && (
                    <Box overflowX="auto">
                        <Box minW="800px">
                            <Grid templateColumns="1.5fr 1fr 2fr 1fr 100px" gap={4} px={6} py={4} bg="blackAlpha.200" borderBottom="1px solid" borderColor="whiteAlpha.50">
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Voucher Code</Text>
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Discount</Text>
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Usage Limit</Text>
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Status</Text>
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="right">Actions</Text>
                            </Grid>
                            <VStack align="stretch" gap={0}>
                                {VOUCHERS.map((v, idx) => {
                                    const percentUsed = (v.used / v.limit) * 100;
                                    return (
                                        <Grid key={idx} templateColumns="1.5fr 1fr 2fr 1fr 100px" gap={4} px={6} py={4} borderBottom="1px solid" borderColor="whiteAlpha.50" alignItems="center" _hover={{ bg: "whiteAlpha.50" }}>
                                            <Box>
                                                <Text color={brandColor} fontFamily="monospace" fontWeight="black" fontSize="md" letterSpacing="widest">{v.code}</Text>
                                            </Box>
                                            <Text color="white" fontWeight="bold" fontSize="sm">{v.discount}</Text>
                                            <Box pr={8}>
                                                <Flex justify="space-between" mb={2}>
                                                    <Text color="gray.400" fontSize="xs">{v.used} used</Text>
                                                    <Text color="gray.500" fontSize="xs">{v.limit} total</Text>
                                                </Flex>
                                                {/* ✅ Bulletproof Custom Progress Bar */}
                                                <Box w="full" h="6px" bg="whiteAlpha.100" rounded="full" overflow="hidden">
                                                    <Box 
                                                        h="full" 
                                                        w={`${Math.min(percentUsed, 100)}%`} 
                                                        bg={percentUsed >= 100 ? "red.400" : "green.400"} 
                                                        transition="width 0.3s ease" 
                                                    />
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Badge bg={v.status === 'active' ? "rgba(72, 187, 120, 0.15)" : "rgba(229, 62, 62, 0.15)"} color={v.status === 'active' ? "green.400" : "red.400"} px={2.5} py={1} rounded="md" textTransform="capitalize">
                                                    {v.status}
                                                </Badge>
                                            </Box>
                                            <Flex justify="flex-end">
                                                <Button size="xs" variant="ghost" color="gray.400" _hover={{ color: "white" }}>Edit</Button>
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
                    <Box overflowX="auto">
                        <Box minW="800px">
                            <Grid templateColumns="1.5fr 1fr 2fr 150px" gap={4} px={6} py={4} bg="blackAlpha.200" borderBottom="1px solid" borderColor="whiteAlpha.50">
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Store Details</Text>
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">SEO Score</Text>
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Detected Issues</Text>
                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="right">Actions</Text>
                            </Grid>
                            <VStack align="stretch" gap={0}>
                                {SEO_HEALTH.map((seo, idx) => {
                                    const scoreColor = seo.score > 80 ? "green.400" : seo.score > 50 ? "yellow.400" : "red.400";
                                    return (
                                        <Grid key={idx} templateColumns="1.5fr 1fr 2fr 150px" gap={4} px={6} py={5} borderBottom="1px solid" borderColor="whiteAlpha.50" alignItems="center" _hover={{ bg: "whiteAlpha.50" }}>
                                            <Flex align="center" gap={3}>
                                                <Avatar.Root size="sm" rounded="md">
                                                    <Avatar.Fallback name={seo.store} bg={brandColor} color="white" />
                                                </Avatar.Root>
                                                <Box>
                                                    <Text color="white" fontWeight="bold" fontSize="sm">{seo.store}</Text>
                                                    <Text color="gray.500" fontSize="xs">{seo.owner}</Text>
                                                </Box>
                                            </Flex>
                                            
                                            <Flex align="center" gap={2}>
                                                <Text color={scoreColor} fontSize="xl" fontWeight="black">{seo.score}</Text>
                                                <Text color="gray.500" fontSize="xs">/ 100</Text>
                                            </Flex>

                                            <Box>
                                                {seo.issues === 0 ? (
                                                    <Flex align="center" gap={2} color="green.400">
                                                        <Icon as={LuCheck} />
                                                        <Text fontSize="sm">Fully Optimized</Text>
                                                    </Flex>
                                                ) : (
                                                    <Flex align="center" gap={2} color={scoreColor}>
                                                        <Icon as={LuInfo} />
                                                        <Text fontSize="sm">{seo.issues} Missing Meta Tags / Descriptions</Text>
                                                    </Flex>
                                                )}
                                            </Box>

                                            <Flex justify="flex-end">
                                                <Button 
                                                    size="sm" bg={seo.issues > 0 ? "whiteAlpha.200" : "transparent"} 
                                                    color={seo.issues > 0 ? "white" : "gray.500"} 
                                                    _hover={seo.issues > 0 ? { bg: "whiteAlpha.300" } : undefined} 
                                                    display="flex" gap={2}
                                                    disabled={seo.issues === 0} // ✅ Fixed to standard HTML prop
                                                    opacity={seo.issues === 0 ? 0.5 : 1}
                                                    cursor={seo.issues === 0 ? "not-allowed" : "pointer"}
                                                >
                                                    <Icon as={LuMail} /> Nudge Tenant
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
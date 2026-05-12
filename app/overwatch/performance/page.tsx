"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Grid, SimpleGrid, Icon, Badge, Avatar, Input, VStack
} from "@chakra-ui/react";
import { 
    LuActivity, LuTrendingUp, LuCircle, 
    LuSearch, LuArrowUpRight, LuArrowDownRight, LuShoppingBag, LuPercent, LuSquareActivity
} from "react-icons/lu";

// --- REUSABLE STYLES ---
const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px", minWidth: "140px" };
const scrollbarStyles = { '&::-webkit-scrollbar': { height: '6px', width: '6px' }, '&::-webkit-scrollbar-track': { background: 'transparent' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' }, '&::-webkit-scrollbar-thumb:hover': { background: '#555555' } };

// --- MOCK DATA ---
const PERFORMANCE_KPIs = [
    { label: "Aggregate GMV (30d)", value: "₦142,500,000", trend: "+8.4%", isPositive: true, icon: LuTrendingUp },
    { label: "Total Orders", value: "12,491", trend: "+12.1%", isPositive: true, icon: LuShoppingBag },
    { label: "Average Order Value", value: "₦11,408", trend: "-2.3%", isPositive: false, icon: LuActivity },
    { label: "Platform Refund Rate", value: "2.8%", trend: "-0.5%", isPositive: true, icon: LuPercent },
];

// Mock Chart Data
const MONTHLY_TRENDS = [
    { month: "Jan", value: 85, label: "₦85M" },
    { month: "Feb", value: 92, label: "₦92M" },
    { month: "Mar", value: 88, label: "₦88M" },
    { month: "Apr", value: 110, label: "₦110M" },
    { month: "May", value: 125, label: "₦125M" },
    { month: "Jun", value: 142, label: "₦142M" },
];
const MAX_TREND_VALUE = Math.max(...MONTHLY_TRENDS.map(t => t.value));

const TOP_PERFORMERS = [
    { id: "SHP-1", name: "Urban Kicks NG", gmv: "₦12.5M", growth: "+24%", orders: 840 },
    { id: "SHP-2", name: "Minimalist Hub", gmv: "₦8.2M", growth: "+18%", orders: 512 },
    { id: "SHP-3", name: "Lagos Streetwear", gmv: "₦7.4M", growth: "+12%", orders: 490 },
];

const AT_RISK_SHOPS = [
    { id: "SHP-88", name: "Gadget World", issue: "High Refund Rate", value: "14.2%", severity: "Critical" },
    { id: "SHP-89", name: "Sneaker Headz", issue: "Declining Sales", value: "-42%", severity: "Warning" },
    { id: "SHP-90", name: "Beauty Empire", issue: "Fulfillment Delays", value: "Avg 6 days", severity: "Warning" },
];

const ALL_SHOPS_DATA = [
    { id: "SHP-1", name: "Urban Kicks NG", category: "Fashion", gmv: 12500000, orders: 840, refundRate: 1.2, health: "Excellent" },
    { id: "SHP-2", name: "Minimalist Hub", category: "Home", gmv: 8200000, orders: 512, refundRate: 2.1, health: "Good" },
    { id: "SHP-3", name: "Lagos Streetwear", category: "Fashion", gmv: 7400000, orders: 490, refundRate: 3.5, health: "Good" },
    { id: "SHP-4", name: "Gadget World", category: "Electronics", gmv: 4100000, orders: 120, refundRate: 14.2, health: "Poor" },
    { id: "SHP-5", name: "Sneaker Headz", category: "Fashion", gmv: 1200000, orders: 45, refundRate: 5.0, health: "Fair" },
];

export default function ShopPerformancePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [timeFilter, setTimeFilter] = useState("30d");
    
    // --- SORTING STATE ---
    const [sortBy, setSortBy] = useState("gmv");
    const [sortOrder, setSortOrder] = useState("desc");

    // --- FILTER & SORT LOGIC ---
    const processedShops = [...ALL_SHOPS_DATA]
        .filter(shop => 
            shop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            shop.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            let valA: number | string;
            let valB: number | string;

            if (sortBy === "orders") {
                valA = a.orders;
                valB = b.orders;
            } else if (sortBy === "refunds") {
                valA = a.refundRate;
                valB = b.refundRate;
            } else if (sortBy === "name") {
                valA = a.name.toLowerCase();
                valB = b.name.toLowerCase();
            } else {
                // Default GMV
                valA = a.gmv;
                valB = b.gmv;
            }

            if (valA < valB) return sortOrder === "asc" ? -1 : 1;
            if (valA > valB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} direction={{ base: "column", md: "row" }} gap={4} mb={8}>
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight" mb={1}>
                        Shop Performance
                    </Text>
                    <Text color="#888888" fontSize="sm">Track GMV, volume, and health metrics across all active businesses.</Text>
                </Box>
                
                <Flex gap={3}>
                    <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} style={nativeSelectStyle}>
                        <option value="7d" style={{ background: "#000000" }}>Last 7 Days</option>
                        <option value="30d" style={{ background: "#000000" }}>Last 30 Days</option>
                        <option value="90d" style={{ background: "#000000" }}>Last 90 Days</option>
                        <option value="ytd" style={{ background: "#000000" }}>Year to Date</option>
                    </select>
                </Flex>
            </Flex>

            {/* --- KPI GRID --- */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6} mb={8}>
                {PERFORMANCE_KPIs.map((kpi, idx) => (
                    <Box key={idx} bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex justify="space-between" align="start" mb={4}>
                            <Flex boxSize="40px" bg="#111111" border="1px solid #333333" rounded="none" align="center" justify="center">
                                <Icon as={kpi.icon} color="#888888" boxSize="20px" strokeWidth="2.5" />
                            </Flex>
                            <Flex align="center" gap={1} bg={kpi.isPositive ? "rgba(92, 172, 125, 0.1)" : "rgba(229, 62, 62, 0.1)"} px={2} py={1} border="1px solid" borderColor={kpi.isPositive ? "#5cac7d" : "red.500"}>
                                <Icon as={kpi.isPositive ? LuArrowUpRight : LuArrowDownRight} color={kpi.isPositive ? "#5cac7d" : "red.400"} boxSize="12px" strokeWidth="3" />
                                <Text color={kpi.isPositive ? "#5cac7d" : "red.400"} fontSize="10px" fontWeight="bold">{kpi.trend}</Text>
                            </Flex>
                        </Flex>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>{kpi.label}</Text>
                        <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{kpi.value}</Text>
                    </Box>
                ))}
            </SimpleGrid>

            {/* --- NATIVE CSS ANALYTICS CHART --- */}
            <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A" mb={8}>
                <Flex justify="space-between" align="center" mb={10}>
                    <Flex align="center" gap={2}>
                        <Icon as={LuSquareActivity} color="#5cac7d" boxSize="20px" strokeWidth="2.5" />
                        <Text color="white" fontSize="lg" fontWeight="bold" letterSpacing="tight">Platform Growth Trend (GMV)</Text>
                    </Flex>
                    <Badge bg="#111111" color="#5cac7d" border="1px solid #333333" rounded="none" px={2} py={1} fontSize="10px">+24% YoY</Badge>
                </Flex>

                {/* Chart Container */}
                <Flex h="200px" align="flex-end" gap={{ base: 2, md: 6 }} position="relative" mt={6}>
                    {/* Background Grid Lines */}
                    <Box position="absolute" w="full" h="1px" bg="#1A1A1A" bottom="50%" zIndex={0} />
                    <Box position="absolute" w="full" h="1px" bg="#1A1A1A" bottom="100%" zIndex={0} />

                    {MONTHLY_TRENDS.map((data, idx) => {
                        const heightPercent = (data.value / MAX_TREND_VALUE) * 100;
                        return (
                            <Flex key={idx} flex={1} direction="column" align="center" gap={3} zIndex={1} css={{ '&:hover .bar-value': { color: 'white' }, '&:hover .bar-fill': { background: '#5cac7d', borderColor: 'white' } }} cursor="pointer">
                                {/* Hover Data Value */}
                                <Text className="bar-value" color="#555555" fontSize="10px" fontWeight="black" transition="color 0.2s">
                                    {data.label}
                                </Text>
                                {/* Bar Fill */}
                                <Box 
                                    className="bar-fill"
                                    w="full" maxW="60px"
                                    h={`${heightPercent}%`} 
                                    bg="#1A1A1A" 
                                    borderTop="2px solid" borderColor="#333333"
                                    transition="all 0.2s"
                                />
                                {/* X-Axis Label */}
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                    {data.month}
                                </Text>
                            </Flex>
                        );
                    })}
                </Flex>
            </Box>

           
            <Grid templateColumns={{ base: "1fr", xl: "1fr 1fr" }} gap={6} mb={8}>
                
                {/* Top Performers */}
                <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Flex justify="space-between" align="center" mb={6}>
                        <Flex align="center" gap={2}>
                            <Icon as={LuTrendingUp} color="#5cac7d" boxSize="20px" strokeWidth="2.5" />
                            <Text color="white" fontSize="lg" fontWeight="bold" letterSpacing="tight">Top Performers</Text>
                        </Flex>
                    </Flex>
                    
                    <VStack align="stretch" gap={4}>
                        {TOP_PERFORMERS.map((shop, idx) => (
                            <Flex key={shop.id} justify="space-between" align="center" p={4} bg="#111111" border="1px solid #1A1A1A" _hover={{ borderColor: "#333333" }} transition="all 0.2s">
                                <Flex align="center" gap={4}>
                                    <Text color="#555555" fontWeight="black" fontSize="lg" w="20px">0{idx + 1}</Text>
                                    <Avatar.Root size="sm" rounded="full">
                                        <Avatar.Fallback name={shop.name} bg="#1A1A1A" color="white" border="1px solid #333333" rounded="none" />
                                    </Avatar.Root>
                                    <Box>
                                        <Text color="white" fontWeight="bold" fontSize="sm" letterSpacing="tight">{shop.name}</Text>
                                        <Text color="#888888" fontSize="xs">{shop.orders} Orders</Text>
                                    </Box>
                                </Flex>
                                <Box textAlign="right">
                                    <Text color="white" fontWeight="black" fontSize="md" letterSpacing="tight">{shop.gmv}</Text>
                                    <Text color="#5cac7d" fontSize="xs" fontWeight="bold">{shop.growth}</Text>
                                </Box>
                            </Flex>
                        ))}
                    </VStack>
                </Box>

                {/* At-Risk Shops */}
                <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Flex justify="space-between" align="center" mb={6}>
                        <Flex align="center" gap={2}>
                            <Icon as={LuCircle} color="red.400" boxSize="20px" strokeWidth="2.5" />
                            <Text color="white" fontSize="lg" fontWeight="bold" letterSpacing="tight">At-Risk Shops</Text>
                        </Flex>
                        <Badge bg="#111111" color="#888888" border="1px solid #333333" rounded="none" px={2} py={1} fontSize="10px">Needs Attention</Badge>
                    </Flex>
                    
                    <VStack align="stretch" gap={4}>
                        {AT_RISK_SHOPS.map((shop) => (
                            <Flex key={shop.id} justify="space-between" align="center" p={4} bg="#111111" border="1px solid" borderColor={shop.severity === "Critical" ? "rgba(229, 62, 62, 0.3)" : "#1A1A1A"}>
                                <Flex align="center" gap={4}>
                                    <Box>
                                        <Text color="white" fontWeight="bold" fontSize="sm" letterSpacing="tight">{shop.name}</Text>
                                        <Flex align="center" gap={2} mt={1}>
                                            <Badge bg="transparent" color={shop.severity === "Critical" ? "red.400" : "yellow.400"} border="1px solid" borderColor={shop.severity === "Critical" ? "red.400" : "yellow.400"} rounded="none" px={1.5} py={0.5} fontSize="9px" textTransform="uppercase">
                                                {shop.issue}
                                            </Badge>
                                        </Flex>
                                    </Box>
                                </Flex>
                                <Box textAlign="right">
                                    <Text color={shop.severity === "Critical" ? "red.400" : "yellow.400"} fontWeight="black" fontSize="md" letterSpacing="tight">{shop.value}</Text>
                                    <Text color="#555555" fontSize="10px" textTransform="uppercase" letterSpacing="wider" mt={1}>Metric</Text>
                                </Box>
                            </Flex>
                        ))}
                    </VStack>
                </Box>

            </Grid>

            {/* --- DETAILED PERFORMANCE TABLE --- */}
            <Box bg="#0A0A0A" border="1px solid #1A1A1A" mb={8}>
                
                {/* Table Toolbar */}
                <Flex direction={{ base: "column", md: "row" }} gap={4} p={5} borderBottom="1px solid #1A1A1A" justify="space-between" align={{ base: "stretch", md: "center" }}>
                    <Flex flex={1} maxW="400px" align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input 
                            placeholder="Search shop by name or category..." 
                            border="none" color="white" h="full" px={0} 
                            _focus={{ boxShadow: "none", outline: "none" }} 
                            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                    </Flex>
                    <Flex gap={3} w={{ base: "full", md: "auto" }}>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ ...nativeSelectStyle, width: "160px" }}>
                            <option value="gmv" style={{ background: "#0A0A0A" }}>Sort by GMV</option>
                            <option value="orders" style={{ background: "#0A0A0A" }}>Sort by Orders</option>
                            <option value="refunds" style={{ background: "#0A0A0A" }}>Sort by Refunds</option>
                            <option value="name" style={{ background: "#0A0A0A" }}>Sort by Name</option>
                        </select>
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ ...nativeSelectStyle, width: "160px" }}>
                            <option value="desc" style={{ background: "#0A0A0A" }}>Highest / Z-A</option>
                            <option value="asc" style={{ background: "#0A0A0A" }}>Lowest / A-Z</option>
                        </select>
                    </Flex>
                </Flex>

                {/* Table Area */}
                <Box overflowX="auto" css={scrollbarStyles}>
                    <Box minW="900px">
                        <Grid templateColumns="2fr 1.5fr 1fr 1fr 1fr" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid #333333">
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Shop & Category</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Total GMV</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Orders</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Refund Rate</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Health Status</Text>
                        </Grid>

                        {processedShops.length === 0 ? (
                            <Flex justify="center" align="center" py={16} direction="column">
                                <Text color="#888888" fontSize="lg" fontWeight="bold">No shops found matching your search.</Text>
                            </Flex>
                        ) : (
                            <VStack align="stretch" gap={0}>
                                {processedShops.map((shop) => (
                                    <Grid 
                                        key={shop.id} 
                                        templateColumns="2fr 1.5fr 1fr 1fr 1fr" gap={4} px={6} py={5} 
                                        borderBottom="1px solid #1A1A1A" 
                                        alignItems="center" 
                                        _hover={{ bg: "#111111" }} transition="background 0.2s"
                                    >
                                        <Box>
                                            <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight">{shop.name}</Text>
                                            <Text color="#888888" fontSize="xs">{shop.category}</Text>
                                        </Box>
                                        <Text color="white" fontSize="sm" fontWeight="black" letterSpacing="tight">₦{shop.gmv.toLocaleString()}</Text>
                                        <Text color="white" fontSize="sm" fontWeight="bold">{shop.orders}</Text>
                                        <Box>
                                            <Text color={shop.refundRate > 5 ? "red.400" : (shop.refundRate > 2 ? "yellow.400" : "#5cac7d")} fontSize="sm" fontWeight="bold">
                                                {shop.refundRate}%
                                            </Text>
                                        </Box>
                                        <Flex justify="flex-end">
                                            <Badge 
                                                bg={shop.health === "Excellent" ? "rgba(92, 172, 125, 0.1)" : shop.health === "Good" ? "rgba(255, 255, 255, 0.05)" : shop.health === "Fair" ? "rgba(236, 201, 75, 0.1)" : "rgba(229, 62, 62, 0.1)"} 
                                                color={shop.health === "Excellent" ? "#5cac7d" : shop.health === "Good" ? "white" : shop.health === "Fair" ? "yellow.400" : "red.400"} 
                                                border="1px solid" 
                                                borderColor={shop.health === "Excellent" ? "#5cac7d" : shop.health === "Good" ? "#333333" : shop.health === "Fair" ? "yellow.400" : "red.400"} 
                                                rounded="none" px={2} py={1} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider"
                                            >
                                                {shop.health}
                                            </Badge>
                                        </Flex>
                                    </Grid>
                                ))}
                            </VStack>
                        )}
                    </Box>
                </Box>
            </Box>

        </Box>
    );
}
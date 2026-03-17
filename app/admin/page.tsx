"use client";
import React from "react";
import { 
    Box, Flex, Text, Grid, SimpleGrid, Icon, Badge, Button, Avatar
} from "@chakra-ui/react";
import { 
    LuTrendingUp, LuStore, LuUsers, LuWallet, LuArrowUpRight, LuEllipsisVertical, LuCheck
} from "react-icons/lu";

// --- MOCK PLATFORM DATA ---
const PLATFORM_STATS = [
    { label: "Total Platform GMV", value: "₦452,500,000", trend: "+12.5%", icon: LuTrendingUp, color: "green.400" },
    { label: "Platform Revenue (Fees)", value: "₦11,312,500", trend: "+15.2%", icon: LuWallet, color: "#5cac7d" },
    { label: "Active Shops", value: "142", trend: "+5 this week", icon: LuStore, color: "blue.400" },
    { label: "Total Global Users", value: "45,291", trend: "+1,200", icon: LuUsers, color: "purple.400" },
];

const TOP_SHOPS = [
    { id: "SHP-01", name: "Urban Kicks NG", owner: "Wada Gift", gmv: "₦12,500,000", status: "active" },
    { id: "SHP-02", name: "Minimalist Hub", owner: "Sarah Connor", gmv: "₦8,200,000", status: "active" },
    { id: "SHP-03", name: "Tech Gadgets Pro", owner: "John Doe", gmv: "₦5,100,000", status: "active" },
];

const PENDING_APPROVALS = [
    { id: "REQ-99", name: "Lagos Streetwear", date: "2 hours ago", type: "New Shop" },
    { id: "REQ-98", name: "Beauty Empire", date: "5 hours ago", type: "KYC Verification" },
];

export default function SuperAdminDashboard() {
    const brandColor = "#5cac7d";

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease">
            
            <Flex justify="space-between" align="flex-end" mb={8}>
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight">
                        Platform Overview
                    </Text>
                    <Text color="gray.400" fontSize="sm">Real-time metrics across all Tradaz tenants and users.</Text>
                </Box>
            
                <Button display={{ base: "none", sm: "flex" }} bg="whiteAlpha.100" color="white" _hover={{ bg: "whiteAlpha.200" }} gap={2}>
                    <Icon as={LuArrowUpRight} /> Export Report
                </Button>
            </Flex>

            {/* HIGH LEVEL METRICS */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6} mb={8}>
                {PLATFORM_STATS.map((stat, idx) => (
                    <Box key={idx} bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Flex justify="space-between" align="start" mb={4}>
                            <Flex boxSize="40px" bg="whiteAlpha.50" rounded="lg" align="center" justify="center">
                                <Icon as={stat.icon} color={stat.color} boxSize="20px" />
                            </Flex>
                            <Badge bg="rgba(92, 172, 125, 0.1)" color={brandColor} rounded="full" px={2} py={0.5}>
                                {stat.trend}
                            </Badge>
                        </Flex>
                        <Text color="gray.400" fontSize="sm" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>
                            {stat.label}
                        </Text>
                        <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">
                            {stat.value}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>

            <Grid templateColumns={{ base: "1fr", xl: "2fr 1fr" }} gap={8}>
                
                {/* LEFT: Top Performing Shops */}
                <Box bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Flex justify="space-between" align="center" mb={6}>
                        <Text color="white" fontSize="lg" fontWeight="bold">Top Performing Shops</Text>
                        <Button size="sm" variant="ghost" color={brandColor}>View All</Button>
                    </Flex>
                    
                    <Box overflowX="auto">
                        <Grid templateColumns="2fr 1.5fr 1fr 50px" gap={4} pb={2} borderBottom="1px solid" borderColor="whiteAlpha.100" mb={4} minW="500px">
                            <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Shop Name</Text>
                            <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Owner</Text>
                            <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="right">30-Day GMV</Text>
                        </Grid>
                        
                        {TOP_SHOPS.map((shop) => (
                            <Grid key={shop.id} templateColumns="2fr 1.5fr 1fr 50px" gap={4} py={3} alignItems="center" borderBottom="1px solid" borderColor="whiteAlpha.50" minW="500px">
                                <Flex align="center" gap={3}>
                                    <Avatar.Root size="sm">
                                        <Avatar.Fallback name={shop.name} bg="whiteAlpha.200" color="white" />
                                    </Avatar.Root>
                                    <Text color="white" fontWeight="bold" fontSize="sm">{shop.name}</Text>
                                </Flex>
                                <Text color="gray.400" fontSize="sm">{shop.owner}</Text>
                                <Text color="white" fontWeight="black" textAlign="right">{shop.gmv}</Text>
                                <Flex justify="flex-end">
                                    
                                    <Icon as={LuEllipsisVertical} color="gray.500" cursor="pointer" />
                                </Flex>
                            </Grid>
                        ))}
                    </Box>
                </Box>

                {/* RIGHT: Action Center (Pending Approvals) */}
                <Box bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Flex justify="space-between" align="center" mb={6}>
                        <Text color="white" fontSize="lg" fontWeight="bold">Action Center</Text>
                        <Badge bg="red.500" color="white" rounded="full">2 Pending</Badge>
                    </Flex>

                    <Flex direction="column" gap={4}>
                        {PENDING_APPROVALS.map((req) => (
                            <Box key={req.id} p={4} bg="#121212" rounded="xl" border="1px solid" borderColor="whiteAlpha.50">
                                <Flex justify="space-between" align="start" mb={3}>
                                    <Box>
                                        <Text color="white" fontWeight="bold" fontSize="sm" mb={1}>{req.name}</Text>
                                        <Badge bg="whiteAlpha.200" color="gray.300" fontSize="10px">{req.type}</Badge>
                                    </Box>
                                    <Text color="gray.500" fontSize="xs">{req.date}</Text>
                                </Flex>
                                <Flex gap={2}>
                                    
                                    <Button flex={1} size="sm" bg={brandColor} color="white" _hover={{ filter: "brightness(1.1)" }} display="flex" gap={2}>
                                        <Icon as={LuCheck
                                        } /> Approve
                                    </Button>
                                    <Button flex={1} size="sm" variant="outline" borderColor="red.900" color="red.400" _hover={{ bg: "red.900" }}>
                                        Reject
                                    </Button>
                                </Flex>
                            </Box>
                        ))}
                    </Flex>
                </Box>
            </Grid>

        </Box>
    );
}
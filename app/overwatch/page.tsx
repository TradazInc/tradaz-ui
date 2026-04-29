"use client";
import React from "react";
import { 
    Box, Flex, Text, Grid, SimpleGrid, Icon, Badge, Button, Avatar
} from "@chakra-ui/react";
import { 
    LuTrendingUp, LuStore, LuUsers, LuWallet, LuArrowUpRight, LuEllipsisVertical, LuCheck, LuBriefcase, LuX
} from "react-icons/lu";

// --- MOCK PLATFORM DATA ---
const PLATFORM_STATS = [
    { label: "Total Platform GMV", value: "₦452,500,000", trend: "+12.5%", icon: LuTrendingUp, iconColor: "green.400" },
    { label: "Platform Revenue (Fees)", value: "₦11,312,500", trend: "+15.2%", icon: LuWallet, iconColor: "#5cac7d" },
    { label: "Active Shops", value: "142", trend: "+5 this week", icon: LuStore, iconColor: "blue.400" },
    { label: "Total Users", value: "45,291", trend: "+1,200", icon: LuUsers, iconColor: "purple.400" },
];

const TOP_BUSINESSES = [
    { id: "BIZ-901", name: "Wada Group Ltd.", shopCount: 3, gmv: "₦45,500,000" },
    { id: "BIZ-902", name: "Lagos Streetwear Co.", shopCount: 2, gmv: "₦12,400,000" },
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
    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            <Flex justify="space-between" align="flex-end" mb={8}>
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight" mb={1}>
                        Platform Overview
                    </Text>
                    <Text color="#888888" fontSize="sm">Real-time metrics across all Tradaz tenants and users.</Text>
                </Box>
            
                <Button display={{ base: "none", sm: "flex" }} bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A" }} gap={2} h="44px" px={6} fontWeight="bold">
                    <Icon as={LuArrowUpRight} color="#888888" strokeWidth="2.5" /> Export Report
                </Button>
            </Flex>

            {/* HIGH LEVEL METRICS */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6} mb={8}>
                {PLATFORM_STATS.map((stat, idx) => (
                    <Box key={idx} bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex justify="space-between" align="start" mb={4}>
                            <Flex boxSize="40px" bg="#111111" border="1px solid #333333" rounded="none" align="center" justify="center">
                                <Icon as={stat.icon} color={stat.iconColor} boxSize="20px" strokeWidth="2.5" />
                            </Flex>
                            <Badge bg="#111111" color="white" border="1px solid #333333" rounded="none" px={2} py={1} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                {stat.trend}
                            </Badge>
                        </Flex>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>
                            {stat.label}
                        </Text>
                        <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">
                            {stat.value}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>

            <Grid templateColumns={{ base: "1fr", xl: "2fr 1fr" }} gap={8}>
                
                {/* LEFT COLUMN: Tables */}
                <Flex direction="column" gap={8}>
                    
                    {/* Top Parent Businesses */}
                    <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex justify="space-between" align="center" mb={6}>
                            <Flex align="center" gap={2}>
                                <Icon as={LuBriefcase} color="#5cac7d" boxSize="20px" strokeWidth="2.5" />
                                <Text color="white" fontSize="lg" fontWeight="bold" letterSpacing="tight">Top Parent Businesses</Text>
                            </Flex>
                            <Button size="sm" h="36px" variant="outline" borderColor="#333333" color="white" rounded="none" _hover={{ bg: "#111111" }}>View All</Button>
                        </Flex>
                        
                        <Box overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                            <Grid templateColumns="2fr 1fr 1.5fr 50px" gap={4} pb={4} borderBottom="1px solid" borderColor="#333333" mb={2} minW="500px">
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Business Entity</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Active Shops</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Aggregated GMV</Text>
                            </Grid>
                            
                            {TOP_BUSINESSES.map((biz) => (
                                <Grid key={biz.id} templateColumns="2fr 1fr 1.5fr 50px" gap={4} py={4} alignItems="center" borderBottom="1px solid" borderColor="#1A1A1A" minW="500px" _hover={{ bg: "#111111" }} transition="background 0.2s" px={2} mx={-2}>
                                    <Flex align="center" gap={3}>
                                        <Avatar.Root size="sm" rounded="full">
                                            <Avatar.Fallback name={biz.name} bg="#111111" border="1px solid #333333" color="white" rounded="none" fontWeight="bold" />
                                        </Avatar.Root>
                                        <Text color="white" fontWeight="bold" fontSize="sm" letterSpacing="tight">{biz.name}</Text>
                                    </Flex>
                                    <Text color="#888888" fontSize="sm" fontWeight="bold">{biz.shopCount} Shops</Text>
                                    <Text color="white" fontWeight="black" textAlign="right" letterSpacing="tight">{biz.gmv}</Text>
                                    <Flex justify="flex-end">
                                        <Icon as={LuEllipsisVertical} color="#888888" cursor="pointer" _hover={{ color: "white" }} strokeWidth="2.5" />
                                    </Flex>
                                </Grid>
                            ))}
                        </Box>
                    </Box>

                    {/* Top Performing Shops */}
                    <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex justify="space-between" align="center" mb={6}>
                            <Flex align="center" gap={2}>
                                <Icon as={LuStore} color="blue.400" boxSize="20px" strokeWidth="2.5" />
                                <Text color="white" fontSize="lg" fontWeight="bold" letterSpacing="tight">Top Performing Shops</Text>
                            </Flex>
                            <Button size="sm" h="36px" variant="outline" borderColor="#333333" color="white" rounded="none" _hover={{ bg: "#111111" }}>View All</Button>
                        </Flex>
                        
                        <Box overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                            <Grid templateColumns="2fr 1.5fr 1fr 50px" gap={4} pb={4} borderBottom="1px solid" borderColor="#333333" mb={2} minW="500px">
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Shop Name</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Owner</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">30-Day GMV</Text>
                            </Grid>
                            
                            {TOP_SHOPS.map((shop) => (
                                <Grid key={shop.id} templateColumns="2fr 1.5fr 1fr 50px" gap={4} py={4} alignItems="center" borderBottom="1px solid" borderColor="#1A1A1A" minW="500px" _hover={{ bg: "#111111" }} transition="background 0.2s" px={2} mx={-2}>
                                    <Flex align="center" gap={3}>
                                        <Avatar.Root size="sm" rounded="full">
                                            <Avatar.Fallback name={shop.name} bg="#111111" border="1px solid #333333" color="white" rounded="none" fontWeight="bold" />
                                        </Avatar.Root>
                                        <Text color="white" fontWeight="bold" fontSize="sm" letterSpacing="tight">{shop.name}</Text>
                                    </Flex>
                                    <Text color="#888888" fontSize="sm" fontWeight="bold">{shop.owner}</Text>
                                    <Text color="white" fontWeight="black" textAlign="right" letterSpacing="tight">{shop.gmv}</Text>
                                    <Flex justify="flex-end">
                                        <Icon as={LuEllipsisVertical} color="#888888" cursor="pointer" _hover={{ color: "white" }} strokeWidth="2.5" />
                                    </Flex>
                                </Grid>
                            ))}
                        </Box>
                    </Box>

                </Flex>

                {/* RIGHT COLUMN: Action Center (Pending Approvals) */}
                <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A" h="fit-content">
                    <Flex justify="space-between" align="center" mb={6}>
                        <Text color="white" fontSize="lg" fontWeight="bold" letterSpacing="tight">Action Center</Text>
                        <Badge bg="#111111" color="red.400" border="1px solid #333333" rounded="none" px={2} py={1} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">2 Pending</Badge>
                    </Flex>

                    <Flex direction="column" gap={4}>
                        {PENDING_APPROVALS.map((req) => (
                            <Box key={req.id} p={5} bg="#111111" rounded="none" border="1px solid" borderColor="#333333">
                                <Flex justify="space-between" align="start" mb={4}>
                                    <Box>
                                        <Text color="white" fontWeight="bold" fontSize="md" mb={2} letterSpacing="tight">{req.name}</Text>
                                        <Badge bg="#000000" color="#888888" border="1px solid #333333" rounded="none" px={2} py={0.5} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{req.type}</Badge>
                                    </Box>
                                    <Text color="#888888" fontSize="xs" fontWeight="bold">{req.date}</Text>
                                </Flex>
                                <Flex gap={3}>
                                    <Button flex={1} size="sm" h="36px" bg="white" color="black" rounded="none" fontWeight="bold" border="none" _hover={{ bg: "#E5E5E5" }} display="flex" gap={2}>
                                        <Icon as={LuCheck} color="#5cac7d" strokeWidth="3" /> Approve
                                    </Button>
                                    <Button flex={1} size="sm" h="36px" variant="outline" borderColor="#333333" bg="#0A0A0A" color="white" rounded="none" fontWeight="bold" _hover={{ bg: "#1A1A1A" }} display="flex" gap={2}>
                                        <Icon as={LuX} color="red.400" strokeWidth="3" /> Reject
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
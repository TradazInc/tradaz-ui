"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid, Badge, VStack, Avatar, IconButton, SimpleGrid
} from "@chakra-ui/react";
import { 
    LuSearch, LuFilter, LuCreditCard, LuArrowUpRight, LuLoaderCircle, 
    LuClock, LuEllipsisVertical, LuX, LuDownload, LuZap, LuBan
} from "react-icons/lu";

// --- MOCK SUBSCRIPTION DATA ---
type PlanTier = 'Basic' | 'Pro' | 'Enterprise';
type SubStatus = 'active' | 'past_due' | 'canceled' | 'trialing';

interface Subscription {
    id: string;
    tenant: string;
    owner: string;
    plan: PlanTier;
    cycle: 'Monthly' | 'Annually';
    amount: number;
    status: SubStatus;
    nextBilling: string;
    startedAt: string;
}

const MOCK_SUBSCRIPTIONS: Subscription[] = [
    { id: "SUB-8812", tenant: "Urban Kicks NG", owner: "Wada Gift", plan: "Pro", cycle: "Monthly", amount: 45000, status: "active", nextBilling: "Nov 12, 2026", startedAt: "Oct 12, 2024" },
    { id: "SUB-8813", tenant: "Minimalist Hub", owner: "Sarah Connor", plan: "Enterprise", cycle: "Annually", amount: 1500000, status: "active", nextBilling: "Jan 01, 2027", startedAt: "Jan 01, 2024" },
    { id: "SUB-8814", tenant: "Lagos Streetwear", owner: "Tobi O.", plan: "Basic", cycle: "Monthly", amount: 15000, status: "past_due", nextBilling: "Overdue by 3 days", startedAt: "Mar 15, 2025" },
    { id: "SUB-8815", tenant: "Tech Gadgets Pro", owner: "John Doe", plan: "Pro", cycle: "Monthly", amount: 45000, status: "trialing", nextBilling: "Trial ends in 5 days", startedAt: "Oct 25, 2026" },
];

const KPI_STATS = [
    { label: "Total MRR", value: "₦4,250,000", trend: "+12.5%", color: "#5cac7d" },
    { label: "Active Subscriptions", value: "1,245", trend: "+42 this month", color: "blue.400" },
    { label: "Past Due / Failed", value: "₦315,000", trend: "18 shops", color: "red.400" },
    { label: "Active Trials", value: "84", trend: "Converting at 68%", color: "purple.400" },
];

export default function AdminSubscriptionsPage() {
    const brandColor = "#5cac7d";
    
    const [searchQuery, setSearchQuery] = useState("");
    const [subscriptions] = useState<Subscription[]>(MOCK_SUBSCRIPTIONS);
    const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);

    const getStatusUI = (status: SubStatus) => {
        switch (status) {
            case "active": return { color: brandColor, bg: "rgba(92, 172, 125, 0.15)", icon: LuCreditCard };
            case "past_due": return { color: "red.400", bg: "rgba(229, 62, 62, 0.15)", icon: LuLoaderCircle };
            case "trialing": return { color: "purple.400", bg: "rgba(159, 122, 234, 0.15)", icon: LuClock };
            case "canceled": return { color: "gray.400", bg: "whiteAlpha.100", icon: LuBan };
        }
    };

    const getPlanColor = (plan: PlanTier) => {
        switch (plan) {
            case "Basic": return "gray.300";
            case "Pro": return "blue.400";
            case "Enterprise": return "purple.400";
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1300px" mx="auto" animation="fade-in 0.3s ease">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={8} gap={4}>
                <Box>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">SaaS Subscriptions</Text>
                    <Text color="gray.400" fontSize="sm">Track MRR, manage tenant billing plans, and handle failed payments.</Text>
                </Box>
                <Button bg={brandColor} color="white" rounded="lg" h="45px" px={6} _hover={{ filter: "brightness(1.1)" }} display="flex" gap={2}>
                    <Icon as={LuArrowUpRight} /> Create Custom Plan
                </Button>
            </Flex>

            {/* --- KPI CARDS --- */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6} mb={8}>
                {KPI_STATS.map((stat, idx) => (
                    <Box key={idx} bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Flex justify="space-between" align="start" mb={2}>
                            <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">{stat.label}</Text>
                            <Badge bg="rgba(255, 255, 255, 0.05)" color={stat.color} rounded="full" px={2} py={0.5}>{stat.trend}</Badge>
                        </Flex>
                        <Text color="white" fontSize="2xl" fontWeight="black" letterSpacing="tight">{stat.value}</Text>
                    </Box>
                ))}
            </SimpleGrid>

            {/* --- FILTERS --- */}
            <Flex gap={4} mb={6}>
                <Flex flex={1} align="center" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" rounded="xl" px={4} _focusWithin={{ borderColor: brandColor }}>
                    <Icon as={LuSearch} color="gray.500" />
                    <Input 
                        placeholder="Search by Tenant, Owner, or Sub ID..." border="none" color="white" h="50px" 
                        _focus={{ boxShadow: "none", outline: "none" }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Flex>
                <Button h="50px" px={6} bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" color="white" rounded="xl" _hover={{ bg: "whiteAlpha.50" }} display="flex" gap={2}>
                    <Icon as={LuFilter} /> <Text display={{ base: "none", sm: "block" }}>Filter Plan</Text>
                </Button>
            </Flex>

            {/* --- SUBSCRIPTIONS GRID --- */}
            <VStack align="stretch" gap={3}>
                <Grid templateColumns="1.5fr 1fr 1fr 1fr 1.5fr 50px" gap={4} px={6} py={2} display={{ base: "none", xl: "grid" }}>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Tenant (Shop)</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Plan Tier</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Billing</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Status</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="right">Next Invoice</Text>
                </Grid>

                {subscriptions.map((sub) => {
                    const statusUI = getStatusUI(sub.status);
                    return (
                        <Grid 
                            key={sub.id} 
                            templateColumns={{ base: "1fr", md: "1.5fr 1fr 1fr", xl: "1.5fr 1fr 1fr 1fr 1.5fr 50px" }} 
                            gap={4} p={4} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor={sub.status === 'past_due' ? "rgba(229, 62, 62, 0.3)" : "whiteAlpha.50"}
                            alignItems="center" cursor="pointer" transition="all 0.2s"
                            _hover={{ borderColor: brandColor, transform: "translateY(-2px)", shadow: "lg" }}
                            onClick={() => setSelectedSub(sub)}
                        >
                            {/* Tenant Info */}
                            <Flex align="center" gap={3}>
                                <Avatar.Root size="sm"><Avatar.Fallback name={sub.tenant} bg="whiteAlpha.200" color="white" /></Avatar.Root>
                                <Box overflow="hidden">
                                    <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1}>{sub.tenant}</Text>
                                    <Text color="gray.500" fontSize="xs" lineClamp={1}>{sub.id}</Text>
                                </Box>
                            </Flex>

                            {/* Plan Tier */}
                            <Text color={getPlanColor(sub.plan)} fontWeight="bold" fontSize="sm" display={{ base: "none", md: "block" }}>
                                {sub.plan}
                            </Text>

                            {/* Amount & Cycle */}
                            <Box display={{ base: "none", xl: "block" }}>
                                <Text color="white" fontWeight="bold" fontSize="sm">₦{sub.amount.toLocaleString()}</Text>
                                <Text color="gray.500" fontSize="xs">{sub.cycle}</Text>
                            </Box>

                            {/* Status */}
                            <Flex display={{ base: "none", md: "flex" }}>
                                <Badge bg={statusUI.bg} color={statusUI.color} px={2.5} py={1} rounded="md" display="flex" alignItems="center" gap={1.5} textTransform="uppercase">
                                    <Icon as={statusUI.icon} /> {sub.status.replace('_', ' ')}
                                </Badge>
                            </Flex>

                            {/* Next Billing */}
                            <Text color={sub.status === 'past_due' ? "red.400" : "gray.300"} fontWeight={sub.status === 'past_due' ? "bold" : "medium"} fontSize="sm" display={{ base: "none", xl: "block" }} textAlign="right">
                                {sub.nextBilling}
                            </Text>

                            {/* Actions Icon */}
                            <Flex justify="flex-end" display={{ base: "none", xl: "flex" }}>
                                <Icon as={LuEllipsisVertical} color="gray.500" />
                            </Flex>
                        </Grid>
                    );
                })}
            </VStack>

            {/* --- SUBSCRIPTION DETAILS DRAWER --- */}
            <Box position="fixed" inset={0} zIndex={9999} pointerEvents={selectedSub ? "auto" : "none"}>
                <Box position="absolute" inset={0} bg="blackAlpha.700" backdropFilter="blur(4px)" opacity={selectedSub ? 1 : 0} transition="opacity 0.3s ease" onClick={() => setSelectedSub(null)} />
                
                <Flex 
                    position="absolute" top={0} right={0} h="100vh" w={{ base: "full", sm: "450px" }}
                    bg="#121212" borderLeft="1px solid" borderColor="whiteAlpha.100" direction="column" shadow="2xl"
                    transform={selectedSub ? "translateX(0)" : "translateX(100%)"} transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                    {selectedSub && (
                        <>
                            <Flex align="center" justify="space-between" p={6} borderBottom="1px solid" borderColor="whiteAlpha.100" bg="#1A1C23">
                                <Text fontSize="lg" fontWeight="bold" color="white">Subscription Management</Text>
                                <IconButton aria-label="Close" variant="ghost" color="gray.400" rounded="full" onClick={() => setSelectedSub(null)}>
                                    <LuX />
                                </IconButton>
                            </Flex>

                            <Box flex={1} overflowY="auto" p={6} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                
                                {/* Header Info */}
                                <Flex direction="column" align="center" textAlign="center" mb={8}>
                                    <Avatar.Root size="xl" mb={4}><Avatar.Fallback name={selectedSub.tenant} bg="whiteAlpha.200" color="white" /></Avatar.Root>
                                    <Text color="white" fontSize="xl" fontWeight="black">{selectedSub.tenant}</Text>
                                    <Text color="gray.400" fontSize="sm" mb={3}>Owner: {selectedSub.owner}</Text>
                                    <Badge bg={getStatusUI(selectedSub.status).bg} color={getStatusUI(selectedSub.status).color} px={3} py={1} rounded="md" textTransform="uppercase">
                                        {selectedSub.status.replace('_', ' ')}
                                    </Badge>
                                </Flex>

                                {/* Current Plan Card */}
                                <Text color="white" fontWeight="bold" mb={4} fontSize="sm" textTransform="uppercase" letterSpacing="wider">Current Plan</Text>
                                <Box bg="#1A1C23" border="1px solid" borderColor={selectedSub.status === 'past_due' ? "red.900" : "whiteAlpha.100"} rounded="xl" p={5} mb={8}>
                                    <Flex justify="space-between" align="center" mb={4}>
                                        <Box>
                                            <Text color={getPlanColor(selectedSub.plan)} fontSize="xl" fontWeight="black">{selectedSub.plan} Tier</Text>
                                            <Text color="gray.500" fontSize="sm">{selectedSub.cycle} Billing</Text>
                                        </Box>
                                        <Text color="white" fontSize="2xl" fontWeight="black">₦{selectedSub.amount.toLocaleString()}</Text>
                                    </Flex>
                                    
                                    <Flex align="center" justify="space-between" pt={4} borderTop="1px dashed" borderColor="whiteAlpha.200">
                                        <Text color="gray.400" fontSize="sm">Next Invoice Date:</Text>
                                        <Text color={selectedSub.status === 'past_due' ? "red.400" : "white"} fontWeight="bold">{selectedSub.nextBilling}</Text>
                                    </Flex>
                                </Box>

                                {/* Quick Actions */}
                                <Text color="white" fontWeight="bold" mb={4} fontSize="sm" textTransform="uppercase" letterSpacing="wider">Plan Actions</Text>
                                <SimpleGrid columns={2} gap={3} mb={8}>
                                    <Button variant="outline" borderColor="whiteAlpha.200" color="white" h="45px" display="flex" gap={2} _hover={{ bg: "whiteAlpha.100" }}>
                                        <Icon as={LuZap} color="yellow.400" /> Upgrade Plan
                                    </Button>
                                    <Button variant="outline" borderColor="whiteAlpha.200" color="white" h="45px" display="flex" gap={2} _hover={{ bg: "whiteAlpha.100" }}>
                                        <Icon as={LuCreditCard} color={brandColor} /> Apply Credit
                                    </Button>
                                </SimpleGrid>

                                {/* Invoice History (Mock) */}
                                <Text color="white" fontWeight="bold" mb={4} fontSize="sm" textTransform="uppercase" letterSpacing="wider">Recent Invoices</Text>
                                <VStack gap={3} align="stretch" mb={8}>
                                    {[1, 2].map((i) => (
                                        <Flex key={i} justify="space-between" align="center" p={3} bg="#1A1C23" rounded="lg" border="1px solid" borderColor="whiteAlpha.50">
                                            <Box>
                                                <Text color="white" fontSize="sm" fontWeight="bold">INV-00{i}9X</Text>
                                                <Text color="gray.500" fontSize="xs">Oct {12 - i}, 2026</Text>
                                            </Box>
                                            <Flex gap={3} align="center">
                                                <Text color="white" fontSize="sm" fontWeight="bold">₦{selectedSub.amount.toLocaleString()}</Text>
                                                <IconButton aria-label="Download" size="xs" variant="ghost" color="gray.400">
                                                    <LuDownload />
                                                </IconButton>
                                            </Flex>
                                        </Flex>
                                    ))}
                                </VStack>

                                {/* Danger Zone */}
                                <Text color="red.400" fontWeight="bold" mb={4} fontSize="sm" textTransform="uppercase" letterSpacing="wider">Danger Zone</Text>
                                <VStack gap={3} align="stretch">
                                    {selectedSub.status === 'past_due' && (
                                        <Button bg="red.500" color="white" h="50px" rounded="lg" display="flex" justifyItems="flex-start" px={4} gap={3} _hover={{ bg: "red.600" }}>
                                            <Icon as={LuBan} /> Suspend Shop Access
                                        </Button>
                                    )}
                                    <Button variant="outline" borderColor="red.900" color="red.500" h="50px" rounded="lg" display="flex" justifyItems="flex-start" px={4} gap={3} _hover={{ bg: "red.900", color: "white" }}>
                                        Cancel Subscription Immediately
                                    </Button>
                                </VStack>

                            </Box>
                        </>
                    )}
                </Flex>
            </Box>

        </Box>
    );
}
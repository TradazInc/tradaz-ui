"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid, Badge, VStack, Avatar, IconButton, SimpleGrid, Spinner
} from "@chakra-ui/react";
import { 
    LuSearch, LuCreditCard, LuArrowUpRight, LuLoaderCircle, 
    LuClock, LuEllipsisVertical, LuX, LuDownload, LuZap, LuBan
} from "react-icons/lu";

import { useAdminSubscriptions, Subscription, PlanTier, SubStatus } from "@/app/hooks/useAdminSubscriptions";

import { CreateCustomPlanForm } from "../../ui/admin/subscriptions/CreateCustomPlanForm";

const controlStyles = { bg: "#121214", border: "1px solid", borderColor: "whiteAlpha.200", color: "white", h: "44px", rounded: "lg", px: 3, _focus: { outline: "none", borderColor: "#5cac7d" }, _hover: { bg: "whiteAlpha.50" } };
const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#121214", color: "white", height: "44px", borderRadius: "8px", padding: "0 12px", border: "1px solid rgba(255, 255, 255, 0.2)", outline: "none", cursor: "pointer", fontSize: "14px" };

export default function AdminSubscriptionsPage() {
    const brandColor = "#5cac7d";
    

    const [isCreating, setIsCreating] = useState(false);

    // handleAddSubscription from the hook
    const {
        searchQuery, planFilter, statusFilter, sortBy, sortOrder,
        handleSearch, handlePlanFilter, handleStatusFilter, handleSortBy, handleSortOrder,
        visibleItems, processedCount, totalLimit,
        visibleCount, isLoadingMore, loaderRef,
        kpiStats, handleAddSubscription
    } = useAdminSubscriptions();

    const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);

    //  Form submission handler
    const onFormSubmit = (newSub: Subscription) => {
        handleAddSubscription(newSub);
        setIsCreating(false); // Close form automatically
    };

    const getStatusUI = (status: SubStatus) => {
        switch (status) {
            case "active": return { color: brandColor, bg: "rgba(92, 172, 125, 0.15)", icon: LuCreditCard };
            case "past_due": return { color: "red.400", bg: "rgba(229, 62, 62, 0.15)", icon: LuLoaderCircle };
            case "trialing": return { color: "purple.400", bg: "rgba(159, 122, 234, 0.15)", icon: LuClock };
            case "canceled": return { color: "gray.400", bg: "whiteAlpha.100", icon: LuBan };
            default: return { color: "gray.400", bg: "whiteAlpha.100", icon: LuBan };
        }
    };

    const getPlanColor = (plan: PlanTier) => {
        switch (plan) {
            case "Basic": return "gray.300";
            case "Pro": return "blue.400";
            case "Enterprise": return "purple.400";
            default: return "gray.300";
        }
    };

    // Intercept the render to show the form
    if (isCreating) {
        return (
            <Box p={{ base: 4, lg: 8 }} maxW="1300px" mx="auto">
                <CreateCustomPlanForm onBack={() => setIsCreating(false)} onSubmit={onFormSubmit} />
            </Box>
        );
    }

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1300px" mx="auto" animation="fade-in 0.3s ease" position="relative">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={6} pt={2} gap={4}>
                <Box>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">SaaS Subscriptions ({totalLimit})</Text>
                    <Text color="gray.400" fontSize="sm">Track MRR, manage tenant billing plans, and handle failed payments.</Text>
                </Box>
                {/*  Wire up the button */}
                <Button onClick={() => setIsCreating(true)} bg={brandColor} color="white" rounded="lg" h="45px" px={6} _hover={{ filter: "brightness(1.1)" }} display="flex" gap={2}>
                    <Icon as={LuArrowUpRight} /> Create Custom Plan
                </Button>
            </Flex>

            {/* --- STICKY TOOLBAR --- */}
            <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)" py={3} mb={6} mx={{ base: -4, lg: 0 }} px={{ base: 4, lg: 0 }} borderBottom="1px solid" borderColor="whiteAlpha.100">
                <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
                    <Flex flex={1} minW="300px" align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="gray.500" mr={2} />
                        <Input 
                            placeholder="Search by Tenant, Owner, or Sub ID..." border="none" color="white" h="full" px={0} 
                            _focus={{ boxShadow: "none", outline: "none" }} value={searchQuery} onChange={handleSearch}
                        />
                    </Flex>
                    
                    <Flex gap={3} w={{ base: "full", md: "auto" }} wrap="wrap">
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "140px" }}>
                            <select value={statusFilter} onChange={handleStatusFilter} style={nativeSelectStyle}>
                                <option value="all" style={{ background: "#1A1C23" }}>All Statuses</option>
                                <option value="active" style={{ background: "#1A1C23" }}>Active</option>
                                <option value="trialing" style={{ background: "#1A1C23" }}>Trialing</option>
                                <option value="past_due" style={{ background: "#1A1C23" }}>Past Due</option>
                                <option value="canceled" style={{ background: "#1A1C23" }}>Canceled</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "140px" }}>
                            <select value={planFilter} onChange={handlePlanFilter} style={nativeSelectStyle}>
                                <option value="all" style={{ background: "#1A1C23" }}>All Plans</option>
                                <option value="Basic" style={{ background: "#1A1C23" }}>Basic</option>
                                <option value="Pro" style={{ background: "#1A1C23" }}>Pro</option>
                                <option value="Enterprise" style={{ background: "#1A1C23" }}>Enterprise</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortBy} onChange={handleSortBy} style={nativeSelectStyle}>
                                <option value="amount" style={{ background: "#1A1C23" }}>Sort: MRR</option>
                                <option value="tenant" style={{ background: "#1A1C23" }}>Sort: Tenant Name</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortOrder} onChange={handleSortOrder} style={nativeSelectStyle}>
                                <option value="desc" style={{ background: "#1A1C23" }}>Highest / Z-A</option>
                                <option value="asc" style={{ background: "#1A1C23" }}>Lowest / A-Z</option>
                            </select>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* --- KPI CARDS --- */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6} mb={8}>
                {kpiStats.map((stat: { label: string; value: string; trend: string; color: string }, idx: number) => (
                    <Box key={idx} bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Flex justify="space-between" align="start" mb={2}>
                            <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">{stat.label}</Text>
                            <Badge bg="rgba(255, 255, 255, 0.05)" color={stat.color} rounded="full" px={2} py={0.5}>{stat.trend}</Badge>
                        </Flex>
                        <Text color="white" fontSize="2xl" fontWeight="black" letterSpacing="tight">{stat.value}</Text>
                    </Box>
                ))}
            </SimpleGrid>

            {/* --- SUBSCRIPTIONS GRID --- */}
            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column">
                    <Text color="gray.400" fontSize="lg" fontWeight="bold">No subscriptions found.</Text>
                </Flex>
            ) : (
                <VStack align="stretch" gap={3}>
                    <Grid templateColumns="1.5fr 1fr 1fr 1fr 1.5fr 50px" gap={4} px={6} py={2} display={{ base: "none", xl: "grid" }}>
                        <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Tenant (Shop)</Text>
                        <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Plan Tier</Text>
                        <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Billing</Text>
                        <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Status</Text>
                        <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="right">Next Invoice</Text>
                    </Grid>

                    {visibleItems.map((sub: Subscription) => {
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
                                <Flex align="center" gap={3}>
                                    <Avatar.Root size="sm"><Avatar.Fallback name={sub.tenant} bg="whiteAlpha.200" color="white" /></Avatar.Root>
                                    <Box overflow="hidden">
                                        <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1}>{sub.tenant}</Text>
                                        <Text color="gray.500" fontSize="xs" lineClamp={1}>{sub.id}</Text>
                                    </Box>
                                </Flex>

                                <Text color={getPlanColor(sub.plan)} fontWeight="bold" fontSize="sm" display={{ base: "none", md: "block" }}>
                                    {sub.plan}
                                </Text>

                                <Box display={{ base: "none", xl: "block" }}>
                                    <Text color="white" fontWeight="bold" fontSize="sm">₦{sub.amount.toLocaleString()}</Text>
                                    <Text color="gray.500" fontSize="xs">{sub.cycle}</Text>
                                </Box>

                                <Flex display={{ base: "none", md: "flex" }}>
                                    <Badge bg={statusUI.bg} color={statusUI.color} px={2.5} py={1} rounded="md" display="flex" alignItems="center" gap={1.5} textTransform="uppercase">
                                        <Icon as={statusUI.icon} /> {sub.status.replace('_', ' ')}
                                    </Badge>
                                </Flex>

                                <Text color={sub.status === 'past_due' ? "red.400" : "gray.300"} fontWeight={sub.status === 'past_due' ? "bold" : "medium"} fontSize="sm" display={{ base: "none", xl: "block" }} textAlign="right">
                                    {sub.nextBilling}
                                </Text>

                                <Flex justify="flex-end" display={{ base: "none", xl: "flex" }}>
                                    <Icon as={LuEllipsisVertical} color="gray.500" />
                                </Flex>
                            </Grid>
                        );
                    })}

                    {visibleCount < processedCount && (
                        <Flex ref={loaderRef} justify="center" align="center" py={8} h="80px">
                            {isLoadingMore && <Spinner color="#5cac7d" size="md" />}
                        </Flex>
                    )}
                </VStack>
            )}

            {/* --- SUBSCRIPTION DETAILS DRAWER (Remains Unchanged) --- */}
            
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
                                
                                <Flex direction="column" align="center" textAlign="center" mb={8}>
                                    <Avatar.Root size="xl" mb={4}><Avatar.Fallback name={selectedSub.tenant} bg="whiteAlpha.200" color="white" /></Avatar.Root>
                                    <Text color="white" fontSize="xl" fontWeight="black">{selectedSub.tenant}</Text>
                                    <Text color="gray.400" fontSize="sm" mb={3}>Owner: {selectedSub.owner}</Text>
                                    <Badge bg={getStatusUI(selectedSub.status).bg} color={getStatusUI(selectedSub.status).color} px={3} py={1} rounded="md" textTransform="uppercase">
                                        {selectedSub.status.replace('_', ' ')}
                                    </Badge>
                                </Flex>

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

                                <Text color="white" fontWeight="bold" mb={4} fontSize="sm" textTransform="uppercase" letterSpacing="wider">Plan Actions</Text>
                                <SimpleGrid columns={2} gap={3} mb={8}>
                                    <Button variant="outline" borderColor="whiteAlpha.200" color="white" h="45px" display="flex" gap={2} _hover={{ bg: "whiteAlpha.100" }}>
                                        <Icon as={LuZap} color="yellow.400" /> Upgrade Plan
                                    </Button>
                                    <Button variant="outline" borderColor="whiteAlpha.200" color="white" h="45px" display="flex" gap={2} _hover={{ bg: "whiteAlpha.100" }}>
                                        <Icon as={LuCreditCard} color={brandColor} /> Apply Credit
                                    </Button>
                                </SimpleGrid>

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
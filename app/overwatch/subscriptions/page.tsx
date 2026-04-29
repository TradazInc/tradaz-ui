"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid, Badge, VStack, IconButton, SimpleGrid, Avatar, Spinner
} from "@chakra-ui/react";
import { 
    LuSearch, LuCreditCard, LuArrowUpRight, LuLoaderCircle, 
    LuClock, LuEllipsisVertical, LuX, LuDownload, LuZap, LuBan
} from "react-icons/lu";

import { useAdminSubscriptions, Subscription,  SubStatus } from "@/app/hooks/useAdminSubscriptions";

import { CreateCustomPlanForm } from "../../ui/admin/subscriptions/CreateCustomPlanForm";

const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px" };

export default function AdminSubscriptionsPage() {
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
            case "active": return { iconColor: "#5cac7d", icon: LuCreditCard };
            case "past_due": return { iconColor: "red.400", icon: LuLoaderCircle };
            case "trialing": return { iconColor: "purple.400", icon: LuClock };
            case "canceled": return { iconColor: "gray.500", icon: LuBan };
            default: return { iconColor: "gray.500", icon: LuBan };
        }
    };

    // Intercept the render to show the form
    if (isCreating) {
        return (
            <Box p={{ base: 4, lg: 8 }} maxW="1300px" mx="auto" bg="#000000" minH="100vh">
                <CreateCustomPlanForm onBack={() => setIsCreating(false)} onSubmit={onFormSubmit} />
            </Box>
        );
    }

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1300px" mx="auto" animation="fade-in 0.3s ease" position="relative" bg="#000000" minH="100vh">
            
            {/* --- COMBINED STICKY HEADER & TOOLBAR --- */}
            <Box 
                position="sticky" zIndex={30} 
                mt="-16px"
                top="-16px"
                bg="#000000" 
                mx={{ base: "-16px", lg: "-32px" }} px={{ base: "16px", lg: "32px" }}
                pt={{ base: 4, lg: 8 }} pb={6} mb={8} 
                borderBottom="1px solid #1A1A1A"
            >
                {/* Title & Action */}
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={6} gap={4}>
                    <Box>
                        <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">SaaS Subscriptions ({totalLimit})</Text>
                        <Text color="#888888" fontSize="sm">Track MRR, manage tenant billing plans, and handle failed payments.</Text>
                    </Box>
                    <Button onClick={() => setIsCreating(true)} bg="#111111" border="1px solid #333333" color="white" rounded="none" h="44px" px={6} _hover={{ bg: "#1A1A1A", borderColor: "white" }} display="flex" gap={2} fontWeight="bold">
                        <Icon as={LuArrowUpRight} color="#5cac7d" strokeWidth="2.5" /> Create Custom Plan
                    </Button>
                </Flex>

                {/* Filters & Search */}
                <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
                    <Flex flex={1} minW="300px" align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input 
                            placeholder="Search by Tenant, Owner, or Sub ID..." border="none" color="white" h="full" px={0} 
                            _focus={{ boxShadow: "none", outline: "none" }} value={searchQuery} onChange={handleSearch}
                        />
                    </Flex>
                    
                    <Flex gap={3} w={{ base: "full", md: "auto" }} wrap="wrap">
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "140px" }}>
                            <select value={statusFilter} onChange={handleStatusFilter} style={nativeSelectStyle}>
                                <option value="all" style={{ background: "#000000" }}>All Statuses</option>
                                <option value="active" style={{ background: "#000000" }}>Active</option>
                                <option value="trialing" style={{ background: "#000000" }}>Trialing</option>
                                <option value="past_due" style={{ background: "#000000" }}>Past Due</option>
                                <option value="canceled" style={{ background: "#000000" }}>Canceled</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "140px" }}>
                            <select value={planFilter} onChange={handlePlanFilter} style={nativeSelectStyle}>
                                <option value="all" style={{ background: "#000000" }}>All Plans</option>
                                <option value="Basic" style={{ background: "#000000" }}>Basic</option>
                                <option value="Pro" style={{ background: "#000000" }}>Pro</option>
                                <option value="Enterprise" style={{ background: "#000000" }}>Enterprise</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortBy} onChange={handleSortBy} style={nativeSelectStyle}>
                                <option value="amount" style={{ background: "#000000" }}>Sort: MRR</option>
                                <option value="tenant" style={{ background: "#000000" }}>Sort: Tenant Name</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortOrder} onChange={handleSortOrder} style={nativeSelectStyle}>
                                <option value="desc" style={{ background: "#000000" }}>Highest / Z-A</option>
                                <option value="asc" style={{ background: "#000000" }}>Lowest / A-Z</option>
                            </select>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* --- KPI CARDS --- */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6} mb={8}>
                {kpiStats.map((stat: { label: string; value: string; trend: string; color: string }, idx: number) => (
                    <Box key={idx} bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex justify="space-between" align="start" mb={2}>
                            <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{stat.label}</Text>
                            <Badge bg="#111111" color="white" border="1px solid #333333" rounded="none" px={2} py={0.5} fontSize="10px" fontWeight="bold" textTransform="uppercase">{stat.trend}</Badge>
                        </Flex>
                        <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{stat.value}</Text>
                    </Box>
                ))}
            </SimpleGrid>

            {/* --- SUBSCRIPTIONS GRID --- */}
            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column" bg="#0A0A0A" border="1px dashed #1A1A1A">
                    <Text color="#888888" fontSize="lg" fontWeight="bold">No subscriptions found.</Text>
                </Flex>
            ) : (
                <VStack align="stretch" gap={3}>
                    <Grid templateColumns="1.5fr 1fr 1fr 1fr 1.5fr 50px" gap={4} px={6} py={2} display={{ base: "none", xl: "grid" }}>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Tenant (Shop)</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Plan Tier</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Billing</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Status</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Next Invoice</Text>
                        <Text></Text>
                    </Grid>

                    {visibleItems.map((sub: Subscription) => {
                        const statusUI = getStatusUI(sub.status);
                        return (
                            <Grid 
                                key={sub.id} 
                                templateColumns={{ base: "1fr", md: "1.5fr 1fr 1fr", xl: "1.5fr 1fr 1fr 1fr 1.5fr 50px" }} 
                                gap={4} p={4} bg="#0A0A0A" rounded="none" border="1px solid" borderColor={sub.status === 'past_due' ? "rgba(229, 62, 62, 0.4)" : "#1A1A1A"}
                                alignItems="center" cursor="pointer" transition="all 0.2s"
                                _hover={{ bg: "#111111", borderColor: "#333333" }}
                                onClick={() => setSelectedSub(sub)}
                            >
                                <Flex align="center" gap={3}>
                                    <Avatar.Root size="sm" rounded="full">
                                        <Avatar.Fallback name={sub.tenant} bg="#111111" border="1px solid #333333" color="white" rounded="none" fontWeight="bold" />
                                    </Avatar.Root>
                                    <Box overflow="hidden">
                                        <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1} letterSpacing="tight">{sub.tenant}</Text>
                                        <Text color="#888888" fontSize="xs" lineClamp={1} fontFamily="monospace">{sub.id}</Text>
                                    </Box>
                                </Flex>

                                <Text color="white" fontWeight="bold" fontSize="sm" display={{ base: "none", md: "block" }}>
                                    {sub.plan}
                                </Text>

                                <Box display={{ base: "none", xl: "block" }}>
                                    <Text color="white" fontWeight="bold" fontSize="sm" letterSpacing="tight">₦{sub.amount.toLocaleString()}</Text>
                                    <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{sub.cycle}</Text>
                                </Box>

                                <Flex display={{ base: "none", md: "flex" }}>
                                    <Flex bg="#111111" border="1px solid #333333" px={2.5} py={1} rounded="none" align="center" gap={1.5}>
                                        <Icon as={statusUI.icon} color={statusUI.iconColor} strokeWidth="2.5" boxSize="14px" />
                                        <Text color="white" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                            {sub.status.replace('_', ' ')}
                                        </Text>
                                    </Flex>
                                </Flex>

                                <Text color={sub.status === 'past_due' ? "white" : "#888888"} fontWeight={sub.status === 'past_due' ? "bold" : "medium"} fontSize="sm" display={{ base: "none", xl: "block" }} textAlign="right">
                                    {sub.nextBilling}
                                </Text>

                                <Flex justify="flex-end" display={{ base: "none", xl: "flex" }}>
                                    <Icon as={LuEllipsisVertical} color="#888888" strokeWidth="2.5" _hover={{ color: "white" }} />
                                </Flex>
                            </Grid>
                        );
                    })}

                    {visibleCount < processedCount && (
                        <Flex ref={loaderRef} justify="center" align="center" py={8} h="80px">
                            {isLoadingMore && <Spinner color="white" size="md" />}
                        </Flex>
                    )}
                </VStack>
            )}

            {/* --- SUBSCRIPTION DETAILS DRAWER --- */}
            <Box position="fixed" inset={0} zIndex={9999} pointerEvents={selectedSub ? "auto" : "none"}>
                <Box position="absolute" inset={0} bg="rgba(0,0,0,0.85)" backdropFilter="blur(4px)" opacity={selectedSub ? 1 : 0} transition="opacity 0.3s ease" onClick={() => setSelectedSub(null)} />
                
                <Flex 
                    position="absolute" top={0} right={0} h="100vh" w={{ base: "full", sm: "450px" }}
                    bg="#000000" borderLeft="1px solid" borderColor="#1A1A1A" direction="column" shadow="2xl"
                    transform={selectedSub ? "translateX(0)" : "translateX(100%)"} transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                    {selectedSub && (
                        <>
                            <Flex align="center" justify="space-between" p={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#0A0A0A">
                                <Text fontSize="lg" fontWeight="bold" color="white" letterSpacing="tight">Subscription Management</Text>
                                <IconButton aria-label="Close" variant="ghost" color="#888888" rounded="none" onClick={() => setSelectedSub(null)} _hover={{ bg: "#111111", color: "white" }}>
                                    <LuX strokeWidth="2.5" />
                                </IconButton>
                            </Flex>

                            <Box flex={1} overflowY="auto" p={6} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                
                                <Flex direction="column" align="center" textAlign="center" mb={8}>
                                    <Avatar.Root size="xl" rounded="full" mb={4}>
                                        <Avatar.Fallback name={selectedSub.tenant} bg="#111111" border="1px solid #333333" color="white" rounded="none" />
                                    </Avatar.Root>
                                    <Text color="white" fontSize="xl" fontWeight="black" letterSpacing="tight">{selectedSub.tenant}</Text>
                                    <Text color="#888888" fontSize="sm" mb={4} fontWeight="bold">Owner: {selectedSub.owner}</Text>
                                    
                                    <Flex align="center" gap={2} px={3} py={1.5} bg="#111111" border="1px solid #333333" rounded="none">
                                        <Icon as={getStatusUI(selectedSub.status).icon} color={getStatusUI(selectedSub.status).iconColor} strokeWidth="2.5" boxSize="14px" />
                                        <Text color="white" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                            {selectedSub.status.replace('_', ' ')}
                                        </Text>
                                    </Flex>
                                </Flex>

                                <Text color="#888888" fontWeight="bold" mb={3} fontSize="10px" textTransform="uppercase" letterSpacing="wider">Current Plan</Text>
                                <Box bg="#0A0A0A" border="1px solid" borderColor={selectedSub.status === 'past_due' ? "rgba(229, 62, 62, 0.4)" : "#1A1A1A"} rounded="none" p={5} mb={8}>
                                    <Flex justify="space-between" align="center" mb={4}>
                                        <Box>
                                            <Text color="white" fontSize="xl" fontWeight="black" letterSpacing="tight">{selectedSub.plan} Tier</Text>
                                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{selectedSub.cycle} Billing</Text>
                                        </Box>
                                        <Text color="white" fontSize="2xl" fontWeight="black" letterSpacing="tight">₦{selectedSub.amount.toLocaleString()}</Text>
                                    </Flex>
                                    
                                    <Flex align="center" justify="space-between" pt={4} borderTop="1px dashed" borderColor="#333333">
                                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Next Invoice Date:</Text>
                                        <Text color={selectedSub.status === 'past_due' ? "white" : "white"} fontWeight="bold" fontSize="sm">{selectedSub.nextBilling}</Text>
                                    </Flex>
                                </Box>

                                <Text color="#888888" fontWeight="bold" mb={3} fontSize="10px" textTransform="uppercase" letterSpacing="wider">Plan Actions</Text>
                                <SimpleGrid columns={2} gap={3} mb={8}>
                                    <Button variant="outline" borderColor="#333333" bg="#111111" color="white" h="44px" rounded="none" display="flex" gap={2} _hover={{ bg: "#1A1A1A" }}>
                                        <Icon as={LuZap} color="yellow.400" strokeWidth="2.5" /> Upgrade Plan
                                    </Button>
                                    <Button variant="outline" borderColor="#333333" bg="#111111" color="white" h="44px" rounded="none" display="flex" gap={2} _hover={{ bg: "#1A1A1A" }}>
                                        <Icon as={LuCreditCard} color="blue.400" strokeWidth="2.5" /> Apply Credit
                                    </Button>
                                </SimpleGrid>

                                <Text color="#888888" fontWeight="bold" mb={3} fontSize="10px" textTransform="uppercase" letterSpacing="wider">Recent Invoices</Text>
                                <VStack gap={3} align="stretch" mb={8}>
                                    {[1, 2].map((i) => (
                                        <Flex key={i} justify="space-between" align="center" p={4} bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A">
                                            <Box>
                                                <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight">INV-00{i}9X</Text>
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Oct {12 - i}, 2026</Text>
                                            </Box>
                                            <Flex gap={3} align="center">
                                                <Text color="white" fontSize="sm" fontWeight="bold">₦{selectedSub.amount.toLocaleString()}</Text>
                                                <IconButton aria-label="Download" size="xs" variant="ghost" color="#888888" rounded="none" _hover={{ color: "white", bg: "#111111" }}>
                                                    <LuDownload strokeWidth="2.5" />
                                                </IconButton>
                                            </Flex>
                                        </Flex>
                                    ))}
                                </VStack>

                                <Text color="red.400" fontWeight="bold" mb={3} fontSize="10px" textTransform="uppercase" letterSpacing="wider">Danger Zone</Text>
                                <VStack gap={3} align="stretch">
                                    {selectedSub.status === 'past_due' && (
                                        <Button bg="#111111" border="1px solid #333333" color="white" h="44px" rounded="none" display="flex" justifyContent="flex-start" px={4} gap={3} _hover={{ bg: "#1A1A1A" }}>
                                            <Icon as={LuBan} color="red.400" strokeWidth="2.5" /> Suspend Shop Access
                                        </Button>
                                    )}
                                    <Button variant="outline" borderColor="#333333" bg="#111111" color="white" h="44px" rounded="none" display="flex" justifyContent="flex-start" px={4} gap={3} _hover={{ bg: "#1A1A1A" }}>
                                        <Icon as={LuX} color="red.400" strokeWidth="2.5" /> Cancel Subscription Immediately
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
"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, HStack, VStack, SimpleGrid } from "@chakra-ui/react";
import { 
    LuMegaphone, LuSearch, LuPlus, LuCalendarClock, 
    LuTrendingUp, LuPause, LuPlay, LuTrash2, LuPackageOpen, LuTruck
} from "react-icons/lu";

import { generateDummyPromotions } from "@/app/lib/data";
import { PromotionCampaign } from "@/app/lib/definitions";

export const PromotionManager = () => {
    const [promotions, setPromotions] = useState<PromotionCampaign[]>(generateDummyPromotions());
    const [searchTerm, setSearchTerm] = useState("");

    // --- ACTIONS ---
    const togglePause = (id: string, currentStatus: string) => {
        setPromotions(prev => prev.map(promo => {
            if (promo.id === id) {
                const newStatus = currentStatus === "Active" ? "Paused" : "Active";
                return { ...promo, status: newStatus as "Active" | "Paused" };
            }
            return promo;
        }));
    };

    const deletePromo = (id: string) => {
        setPromotions(prev => prev.filter(p => p.id !== id));
    };

    // --- FILTERING ---
    const filteredPromos = promotions.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- STATS ---
    const activeCampaigns = promotions.filter(p => p.status === "Active").length;
    const totalPromoRevenue = promotions.reduce((acc, curr) => acc + curr.revenueGenerated, 0);

    const getIconForType = (type: string) => {
        switch (type) {
            case "Store-wide": return LuMegaphone;
            case "Category Discount": return LuPackageOpen;
            case "Free Shipping": return LuTruck;
            default: return LuTrendingUp;
        }
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* --- Sticky Header (Now slimmed down for mobile!) --- */}
            <Box 
                position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} 
                bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} mx={-4} px={4} 
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4}>
                    <Box>
                        <Text color="#5cac7d" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2}>
                            <Icon as={LuMegaphone} /> Promotions & Campaigns
                        </Text>
                        <Text color="gray.400" fontSize="sm">Schedule automated store-wide sales, BOGO offers, and category discounts.</Text>
                    </Box>
                    
                    <Button bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} h="44px" px={6}>
                        <Icon as={LuPlus} mr={2} /> Create Campaign
                    </Button>
                </Flex>
            </Box>

            {/* --- STATS & SEARCH (Moved outside sticky header to scroll away) --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
                <Box bg="#1A1C23" p={4} rounded="xl" border="1px solid" borderColor="rgba(92, 172, 125, 0.3)">
                    <Text color="#5cac7d" fontSize="xs" fontWeight="bold" textTransform="uppercase">Active Campaigns</Text>
                    <Text color="white" fontSize="2xl" fontWeight="black">{activeCampaigns}</Text>
                </Box>
                <Box bg="#1A1C23" p={4} rounded="xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Total Revenue Driven</Text>
                    <Text color="white" fontSize="2xl" fontWeight="black">₦{totalPromoRevenue.toLocaleString()}</Text>
                </Box>
                <Flex align="center" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="xl" px={4} _focusWithin={{ borderColor: "#5cac7d" }}>
                    <Icon as={LuSearch} color="gray.400" />
                    <Input 
                        placeholder="Search campaigns..." 
                        border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" py={3}
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Flex>
            </SimpleGrid>

            {/* --- PROMOTIONS LIST --- */}
            <VStack gap={4} align="stretch" mb={8}>
                {filteredPromos.length === 0 ? (
                    <Flex justify="center" py={12} color="gray.500" bg="whiteAlpha.50" rounded="2xl" border="1px dashed" borderColor="whiteAlpha.200">
                        No campaigns found. Start building some hype!
                    </Flex>
                ) : (
                    filteredPromos.map((promo) => {
                        const isActive = promo.status === "Active";
                        const isScheduled = promo.status === "Scheduled";
                        const isPaused = promo.status === "Paused";
                        const isEnded = promo.status === "Ended";
                        const PromoIcon = getIconForType(promo.type);

                        return (
                            <Box key={promo.id} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.3)" : isScheduled ? "rgba(66, 153, 225, 0.3)" : "whiteAlpha.100"} p={{ base: 4, md: 6 }} shadow="sm" transition="all 0.2s" opacity={isEnded ? 0.5 : 1}>
                                <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "center" }} gap={6}>
                                    
                                    {/* Left: Campaign Details */}
                                    <VStack align="start" flex={1} gap={2}>
                                        <HStack gap={3}>
                                            <Flex align="center" justify="center" bg="whiteAlpha.100" p={2} rounded="md">
                                                <Icon as={PromoIcon} color={isActive ? "#5cac7d" : "gray.300"} boxSize="18px" />
                                            </Flex>
                                            <Box>
                                                <Text color="white" fontWeight="bold" fontSize="lg">{promo.title}</Text>
                                                <Text color="gray.400" fontSize="xs" display="flex" alignItems="center" gap={1}>
                                                    <Icon as={LuCalendarClock} /> {promo.startDate} to {promo.endDate}
                                                </Text>
                                            </Box>
                                        </HStack>

                                        <Flex align="center" gap={2} mt={2}>
                                            <Flex align="center" px={2.5} py={0.5} rounded="full" bg={isActive ? "rgba(92, 172, 125, 0.15)" : isScheduled ? "rgba(66, 153, 225, 0.15)" : isPaused ? "rgba(237, 137, 54, 0.15)" : "whiteAlpha.100"}>
                                                <Box boxSize="6px" rounded="full" mr={2} bg={isActive ? "#5cac7d" : isScheduled ? "blue.400" : isPaused ? "orange.400" : "gray.400"} />
                                                <Text color={isActive ? "#5cac7d" : isScheduled ? "blue.400" : isPaused ? "orange.400" : "gray.400"} fontSize="xs" fontWeight="bold">
                                                    {promo.status}
                                                </Text>
                                            </Flex>
                                            <Text color="gray.500" fontSize="sm">• {promo.type}</Text>
                                        </Flex>
                                    </VStack>

                                    {/* Middle: Rules & Performance */}
                                    <VStack align="start" flex={1} w="full" minW={{ md: "250px" }} maxW={{ md: "350px" }} gap={3} bg="whiteAlpha.50" p={4} rounded="lg" border="1px solid" borderColor="whiteAlpha.100">
                                        <Flex justify="space-between" w="full">
                                            <VStack align="start" gap={0}>
                                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Target</Text>
                                                <Text color="gray.300" fontSize="sm">{promo.target}</Text>
                                            </VStack>
                                            <VStack align="end" gap={0}>
                                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Discount</Text>
                                                <Text color="orange.400" fontSize="sm" fontWeight="bold">{promo.discountValue}</Text>
                                            </VStack>
                                        </Flex>
                                        <Box w="full" h="1px" bg="whiteAlpha.100" />
                                        <Flex justify="space-between" w="full" align="center">
                                            <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Revenue Driven</Text>
                                            <Text color={promo.revenueGenerated > 0 ? "#5cac7d" : "gray.400"} fontSize="md" fontWeight="black">
                                                ₦{promo.revenueGenerated.toLocaleString()}
                                            </Text>
                                        </Flex>
                                    </VStack>

                                    {/* Right: Actions */}
                                    <Flex direction="column" gap={2} minW="140px" justify="flex-end" w={{ base: "full", md: "auto" }}>
                                        {!isEnded && !isScheduled && (
                                            <Button size="sm" onClick={() => togglePause(promo.id, promo.status)} variant="outline" borderColor="whiteAlpha.200" color={isActive ? "orange.400" : "#5cac7d"} _hover={{ bg: "whiteAlpha.50" }} justifyContent="flex-start">
                                                <Icon as={isActive ? LuPause : LuPlay} mr={2} /> {isActive ? "Pause" : "Resume"}
                                            </Button>
                                        )}
                                        <Button size="sm" onClick={() => deletePromo(promo.id)} variant="ghost" color="red.400" _hover={{ bg: "red.900", color: "white" }} justifyContent="flex-start">
                                            <Icon as={LuTrash2} mr={2} /> Delete
                                        </Button>
                                    </Flex>

                                </Flex>
                            </Box>
                        );
                    })
                )}
            </VStack>

        </Box>
    );
};
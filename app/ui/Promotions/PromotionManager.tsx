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
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000">
            
            {/* --- Sticky Header --- */}
            <Box 
                position="sticky" top={{ base: "-16px", md: "-32px" }} mx={{ base: "-16px", md: "-32px" }} px={{ base: "16px", md: "32px" }} 
                zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} borderBottom="1px solid #1A1A1A"
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4}>
                    <Box>
                        <Text color="white" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2} letterSpacing="tight">
                            <Icon as={LuMegaphone} color="#5cac7d" strokeWidth="2.5" /> Promotions & Campaigns
                        </Text>
                        <Text color="#888888" fontSize="sm">Schedule automated store-wide sales, BOGO offers, and category discounts.</Text>
                    </Box>
                    
                    <Button bg="white" color="black" rounded="none" _hover={{ bg: "#E5E5E5" }} h="44px" px={6} fontWeight="bold" border="none">
                        <Icon as={LuPlus} mr={2} strokeWidth="2.5" /> Create Campaign
                    </Button>
                </Flex>
            </Box>

            {/* --- STATS & SEARCH --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#5cac7d" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Active Campaigns</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{activeCampaigns}</Text>
                </Box>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Total Revenue Driven</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{totalPromoRevenue.toLocaleString()}</Text>
                </Box>
                <Flex align="center" bg="#0A0A0A" border="1px solid" borderColor="#333333" rounded="none" px={4} _focusWithin={{ borderColor: "white" }}>
                    <Icon as={LuSearch} color="#888888" strokeWidth="2.5" />
                    <Input 
                        placeholder="Search campaigns..." 
                        border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" py={3} ml={2} px={0}
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Flex>
            </SimpleGrid>

            {/* --- PROMOTIONS LIST --- */}
            <VStack gap={4} align="stretch" mb={8}>
                {filteredPromos.length === 0 ? (
                    <Flex justify="center" py={12} color="#888888" bg="#0A0A0A" rounded="none" border="1px dashed" borderColor="#1A1A1A" fontWeight="bold">
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
                            <Box key={promo.id} bg="#0A0A0A" rounded="none" border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.3)" : isScheduled ? "rgba(66, 153, 225, 0.3)" : "#1A1A1A"} p={{ base: 4, md: 6 }} transition="all 0.2s" opacity={isEnded ? 0.5 : 1} _hover={{ bg: "#111111" }}>
                                <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "center" }} gap={6}>
                                    
                                    {/* Left: Campaign Details */}
                                    <VStack align="start" flex={1} gap={2}>
                                        <HStack gap={3}>
                                            <Flex align="center" justify="center" bg="#111111" border="1px solid #333333" p={3} rounded="none">
                                                <Icon as={PromoIcon} color={isActive ? "white" : "#888888"} boxSize="20px" strokeWidth="2.5" />
                                            </Flex>
                                            <Box>
                                                <Text color="white" fontWeight="bold" fontSize="xl" letterSpacing="tight">{promo.title}</Text>
                                                <Text color="#888888" fontSize="xs" display="flex" alignItems="center" gap={1} mt={1}>
                                                    <Icon as={LuCalendarClock} /> {promo.startDate} to {promo.endDate}
                                                </Text>
                                            </Box>
                                        </HStack>

                                        <Flex align="center" gap={2} mt={2}>
                                            <Flex align="center" px={2} py={1} rounded="none" border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.3)" : isScheduled ? "rgba(66, 153, 225, 0.3)" : isPaused ? "rgba(237, 137, 54, 0.3)" : "#333333"} bg={isActive ? "rgba(92, 172, 125, 0.1)" : isScheduled ? "rgba(66, 153, 225, 0.1)" : isPaused ? "rgba(237, 137, 54, 0.1)" : "#111111"}>
                                                <Box boxSize="6px" rounded="none" mr={2} bg={isActive ? "#5cac7d" : isScheduled ? "blue.400" : isPaused ? "orange.400" : "gray.400"} />
                                                <Text color={isActive ? "#5cac7d" : isScheduled ? "blue.400" : isPaused ? "orange.400" : "#888888"} fontSize="10px" textTransform="uppercase" letterSpacing="wider" fontWeight="bold">
                                                    {promo.status}
                                                </Text>
                                            </Flex>
                                            <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">• {promo.type}</Text>
                                        </Flex>
                                    </VStack>

                                    {/* Middle: Rules & Performance */}
                                    <VStack align="start" flex={1} w="full" minW={{ md: "250px" }} maxW={{ md: "350px" }} gap={4} bg="#111111" p={4} rounded="none" border="1px solid" borderColor="#1A1A1A">
                                        <Flex justify="space-between" w="full">
                                            <VStack align="start" gap={0}>
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Target</Text>
                                                <Text color="white" fontSize="sm" fontWeight="bold">{promo.target}</Text>
                                            </VStack>
                                            <VStack align="end" gap={0}>
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Discount</Text>
                                                <Text color="orange.400" fontSize="sm" fontWeight="bold">{promo.discountValue}</Text>
                                            </VStack>
                                        </Flex>
                                        <Box w="full" h="1px" bg="#1A1A1A" />
                                        <Flex justify="space-between" w="full" align="center">
                                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Revenue Driven</Text>
                                            <Text color={promo.revenueGenerated > 0 ? "#5cac7d" : "gray.400"} fontSize="lg" fontWeight="black" letterSpacing="tight">
                                                ₦{promo.revenueGenerated.toLocaleString()}
                                            </Text>
                                        </Flex>
                                    </VStack>

                                    {/* Right: Actions */}
                                    <Flex direction="column" gap={2} minW="140px" justify="flex-end" w={{ base: "full", md: "auto" }}>
                                        {!isEnded && !isScheduled && (
                                            <Button size="sm" h="36px" onClick={() => togglePause(promo.id, promo.status)} variant="outline" borderColor="#333333" color={isActive ? "orange.400" : "white"} _hover={{ bg: "#111111" }} rounded="none" justifyContent="flex-start">
                                                <Icon as={isActive ? LuPause : LuPlay} mr={2} strokeWidth="2.5" /> {isActive ? "Pause" : "Resume"}
                                            </Button>
                                        )}
                                        <Button size="sm" h="36px" onClick={() => deletePromo(promo.id)} variant="ghost" color="red.400" _hover={{ bg: "red.900", color: "white" }} rounded="none" justifyContent="flex-start">
                                            <Icon as={LuTrash2} mr={2} strokeWidth="2.5" /> Delete
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
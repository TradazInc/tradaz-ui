"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, HStack, VStack, SimpleGrid, IconButton } from "@chakra-ui/react";
import { 
    LuAward, LuCoins, LuStar, LuGift, 
    LuPower, LuPowerOff, LuSave, LuPlus, LuTrash2, LuTrendingUp
} from "react-icons/lu";

import { generateDummyEarningRules, generateDummyRedemptionRules } from "@/app/lib/data";
import { EarningRule, RedemptionRule } from "@/app/lib/definitions";

export const LoyaltyManager = () => {
    const [earningRules, setEarningRules] = useState<EarningRule[]>(generateDummyEarningRules());
    const [redemptionRules, setRedemptionRules] = useState<RedemptionRule[]>(generateDummyRedemptionRules());
    
    // Base conversion: e.g., Spend ₦100 = Earn 1 Point
    const [baseSpendConfig, setBaseSpendConfig] = useState("100");

    // --- ACTIONS: EARNING ---
    const toggleEarningStatus = (id: string, currentStatus: string) => {
        setEarningRules(prev => prev.map(rule => 
            rule.id === id ? { ...rule, status: currentStatus === "Active" ? "Disabled" : "Active" } : rule
        ));
    };

    const updateEarningPoints = (id: string, newPoints: string) => {
        const parsed = parseInt(newPoints) || 0;
        setEarningRules(prev => prev.map(rule => rule.id === id ? { ...rule, pointsAwarded: parsed } : rule));
    };

    // --- ACTIONS: REDEMPTION ---
    const toggleRedemptionStatus = (id: string, currentStatus: string) => {
        setRedemptionRules(prev => prev.map(rule => 
            rule.id === id ? { ...rule, status: currentStatus === "Active" ? "Disabled" : "Active" } : rule
        ));
    };

    const deleteRedemptionRule = (id: string) => {
        setRedemptionRules(prev => prev.filter(r => r.id !== id));
    };

    // --- STATS (Mock Data for Dashboard) ---
    const totalPointsIssued = 452000;
    const totalPointsRedeemed = 128000;
    const outstandingPoints = totalPointsIssued - totalPointsRedeemed;
    
    // Estimate liability based on the base 1 point = ₦1 redemption value
    const estimatedLiability = outstandingPoints * 1; 

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* --- Sticky Header (Mobile Optimized) --- */}
            <Box 
                position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} 
                bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} mx={-4} px={4} 
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4}>
                    <Box>
                        <Text color="#5cac7d" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2}>
                            <Icon as={LuAward} /> Loyalty & Rewards
                        </Text>
                        <Text color="gray.400" fontSize="sm">Configure how customers earn points and what they can spend them on.</Text>
                    </Box>
                    <Button bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} h="44px" px={6}>
                        <Icon as={LuSave} mr={2} /> Save Changes
                    </Button>
                </Flex>
            </Box>

            {/* --- STATS OVERVIEW --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={8}>
                <Box bg="#1A1C23" p={5} rounded="xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Flex align="center" gap={2} mb={2} color="gray.400">
                        <Icon as={LuTrendingUp} />
                        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">Total Points Issued</Text>
                    </Flex>
                    <Text color="white" fontSize="2xl" fontWeight="black">{totalPointsIssued.toLocaleString()} pts</Text>
                </Box>
                <Box bg="#1A1C23" p={5} rounded="xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Flex align="center" gap={2} mb={2} color="gray.400">
                        <Icon as={LuGift} />
                        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">Total Points Redeemed</Text>
                    </Flex>
                    <Text color="white" fontSize="2xl" fontWeight="black">{totalPointsRedeemed.toLocaleString()} pts</Text>
                </Box>
                <Box bg="#1A1C23" p={5} rounded="xl" border="1px solid" borderColor="rgba(237, 137, 54, 0.3)">
                    <Flex align="center" gap={2} mb={2} color="orange.400">
                        <Icon as={LuCoins} />
                        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">Outstanding Liability</Text>
                    </Flex>
                    <Text color="orange.400" fontSize="2xl" fontWeight="black">~ ₦{estimatedLiability.toLocaleString()}</Text>
                </Box>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, xl: 2 }} gap={8} mb={8} alignItems="start">
                
               
                {/* EARNING RULES */}
           
                <Box bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6}>
                    <Flex align="center" gap={2} color="white" mb={6}>
                        <Icon as={LuStar} color="orange.400" boxSize="20px" />
                        <Text fontSize="lg" fontWeight="bold">Earning Rules</Text>
                    </Flex>

                    {/* Global Spend Rule */}
                    <Box bg="#1A1C23" rounded="xl" p={5} border="1px solid" borderColor="#5cac7d" mb={6}>
                        <Text color="#5cac7d" fontSize="sm" fontWeight="bold" mb={3}>Base Purchase Rule</Text>
                        <Flex align="center" gap={3} wrap="wrap">
                            <Text color="gray.300" fontSize="sm">Customers earn</Text>
                            <Box bg="rgba(92, 172, 125, 0.15)" color="#5cac7d" px={3} py={1.5} rounded="md" fontWeight="bold" fontSize="sm">
                                1 Point
                            </Box>
                            <Text color="gray.300" fontSize="sm">for every</Text>
                            <Flex align="center" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="md" px={2} h="36px" w="100px">
                                <Text color="gray.500" fontSize="sm" mr={1}>₦</Text>
                                <Input type="number" value={baseSpendConfig} onChange={(e) => setBaseSpendConfig(e.target.value)} border="none" _focus={{ boxShadow: "none" }} color="white" h="full" px={0} fontSize="sm" fontWeight="bold" />
                            </Flex>
                            <Text color="gray.300" fontSize="sm">spent.</Text>
                        </Flex>
                    </Box>

                    {/* Custom Action Rules */}
                    <VStack gap={3} align="stretch">
                        <Text color="gray.400" fontSize="sm" fontWeight="bold" mb={1}>Custom Actions</Text>
                        {earningRules.map(rule => {
                            const isActive = rule.status === "Active";
                            return (
                                <Flex key={rule.id} bg="#1A1C23" rounded="lg" p={4} border="1px solid" borderColor={isActive ? "rgba(237, 137, 54, 0.2)" : "whiteAlpha.100"} align="center" justify="space-between" opacity={!isActive ? 0.6 : 1} transition="all 0.2s">
                                    <Box flex={1}>
                                        <HStack gap={2} mb={1}>
                                            <Box boxSize="6px" rounded="full" bg={isActive ? "orange.400" : "gray.500"} />
                                            <Text color="white" fontWeight="bold" fontSize="sm">{rule.action}</Text>
                                        </HStack>
                                        <Text color="gray.500" fontSize="xs" ml={3.5}>{rule.description}</Text>
                                    </Box>

                                    <HStack gap={4}>
                                        <Flex align="center" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="md" px={2} h="36px" w="100px">
                                            <Input type="number" value={rule.pointsAwarded} onChange={(e) => updateEarningPoints(rule.id, e.target.value)} border="none" _focus={{ boxShadow: "none" }} color="white" h="full" px={0} fontSize="sm" fontWeight="bold" textAlign="right" mr={1} />
                                            <Text color="gray.500" fontSize="xs">pts</Text>
                                        </Flex>
                                        <IconButton aria-label="Toggle" size="sm" onClick={() => toggleEarningStatus(rule.id, rule.status)} variant="ghost" color={isActive ? "orange.400" : "gray.400"} _hover={{ bg: "whiteAlpha.100" }}>
                                            <Icon as={isActive ? LuPowerOff : LuPower} />
                                        </IconButton>
                                    </HStack>
                                </Flex>
                            );
                        })}
                    </VStack>
                </Box>

               
                {/*  REDEMPTION RULES */}
              
                <Box bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6}>
                    <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
                        <Flex align="center" gap={2} color="white">
                            <Icon as={LuGift} color="#5cac7d" boxSize="20px" />
                            <Text fontSize="lg" fontWeight="bold">Spending Rules (Rewards)</Text>
                        </Flex>
                        <Button size="sm" bg="rgba(92, 172, 125, 0.15)" color="#5cac7d" _hover={{ bg: "#5cac7d", color: "white" }}>
                            <Icon as={LuPlus} mr={2} /> Add Reward
                        </Button>
                    </Flex>

                    <VStack gap={3} align="stretch">
                        {redemptionRules.map(rule => {
                            const isActive = rule.status === "Active";
                            return (
                                <Box key={rule.id} bg="#1A1C23" rounded="xl" p={4} border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.3)" : "whiteAlpha.100"} opacity={!isActive ? 0.6 : 1}>
                                    <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
                                        <VStack align="start" gap={1}>
                                            <Flex align="center" gap={2}>
                                                <Text color="white" fontWeight="bold">{rule.title}</Text>
                                                <Box px={2} py={0.5} rounded="full" bg={isActive ? "rgba(92, 172, 125, 0.15)" : "whiteAlpha.100"} color={isActive ? "#5cac7d" : "gray.400"} fontSize="xs" fontWeight="bold">
                                                    {rule.status}
                                                </Box>
                                            </Flex>
                                            <Flex align="center" gap={1.5} color="gray.400" fontSize="sm">
                                                <Icon as={LuCoins} boxSize="14px" /> Costs {rule.pointsRequired.toLocaleString()} Points
                                            </Flex>
                                        </VStack>

                                        <Flex align="center" gap={4}>
                                            <VStack align="end" gap={0}>
                                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Value</Text>
                                                <Text color="white" fontWeight="black">₦{rule.discountValue.toLocaleString()}</Text>
                                            </VStack>
                                            <Box w="1px" h="30px" bg="whiteAlpha.200" />
                                            <Flex gap={1}>
                                                <IconButton aria-label="Toggle" size="sm" onClick={() => toggleRedemptionStatus(rule.id, rule.status)} variant="ghost" color={isActive ? "orange.400" : "#5cac7d"} _hover={{ bg: "whiteAlpha.100" }}>
                                                    <Icon as={isActive ? LuPowerOff : LuPower} />
                                                </IconButton>
                                                <IconButton aria-label="Delete" size="sm" onClick={() => deleteRedemptionRule(rule.id)} variant="ghost" color="red.400" _hover={{ bg: "red.900", color: "white" }}>
                                                    <Icon as={LuTrash2} />
                                                </IconButton>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Box>
                            );
                        })}
                    </VStack>
                </Box>
            </SimpleGrid>
        </Box>
    );
};
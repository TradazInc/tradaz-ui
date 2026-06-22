"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, HStack, VStack, SimpleGrid, IconButton } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LuAward, LuCoins, LuStar, LuGift, 
    LuPower, LuPowerOff, LuSave, LuPlus, LuTrash2, LuTrendingUp, LuX
} from "react-icons/lu";

import { generateDummyEarningRules, generateDummyRedemptionRules } from "@/data/data";
import { EarningRule, RedemptionRule } from "@/types/definitions";

// --- REUSABLE STYLES ---
const inputStyles = { bg: "#000000", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 4, _focus: { outline: "none", borderColor: "white", boxShadow: "none" }, _hover: { borderColor: "#555555" } };
const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };

// --- ADD REWARD MODAL ---
interface AddRewardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (reward: RedemptionRule) => void;
}

const AddRewardModal = ({ isOpen, onClose, onSave }: AddRewardModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        pointsRequired: "",
        discountValue: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            const newReward: RedemptionRule = {
                id: `RDM-${Math.floor(Math.random() * 90000) + 10000}`,
                title: formData.title,
                pointsRequired: parseInt(formData.pointsRequired) || 0,
                discountValue: parseInt(formData.discountValue) || 0,
                status: "Active"
            };
            onSave(newReward);
            setIsLoading(false);
            setFormData({ title: "", pointsRequired: "", discountValue: "" });
            onClose();
        }, 600);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
                        onClick={onClose}
                    />

                    <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "400px", md: "450px" }} pointerEvents="none">
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
                        >
                            <Box w="100%" h="100%" bg="#0A0A0A" borderLeft="1px solid" borderColor="#1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                                
                                <Flex justify="space-between" align="center" px={6} pt={8} pb={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#111111">
                                    <Box>
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>
                                            Loyalty Engine
                                        </Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">
                                            Create Reward Rule
                                        </Text>
                                    </Box>
                                    <IconButton aria-label="Close modal" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <VStack w="full" gap={6} align="stretch">
                                        <Box>
                                            <Text as="label" {...labelStyles}>Reward Title <Text as="span" color="red.400">*</Text></Text>
                                            <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. ₦1,000 Off Your Order" {...inputStyles} />
                                        </Box>

                                        <SimpleGrid columns={2} gap={4}>
                                            <Box>
                                                <Text as="label" {...labelStyles}>Points Required <Text as="span" color="red.400">*</Text></Text>
                                                <Input type="number" name="pointsRequired" value={formData.pointsRequired} onChange={handleChange} placeholder="e.g. 1000" {...inputStyles} />
                                            </Box>
                                            <Box>
                                                <Text as="label" {...labelStyles}>Discount Value (₦) <Text as="span" color="red.400">*</Text></Text>
                                                <Input type="number" name="discountValue" value={formData.discountValue} onChange={handleChange} placeholder="e.g. 1000" {...inputStyles} />
                                            </Box>
                                        </SimpleGrid>

                                        <Box p={4} bg="#111111" border="1px dashed #333333" mt={2}>
                                            <Text color="#888888" fontSize="xs" fontWeight="bold" mb={2}>Preview Rule:</Text>
                                            <Text color="white" fontSize="sm">
                                                Customer spends <Text as="span" fontWeight="black" color="orange.400">{formData.pointsRequired || "X"} points</Text> to receive <Text as="span" fontWeight="black" color="#5cac7d">₦{formData.discountValue || "Y"}</Text> off their purchase.
                                            </Text>
                                        </Box>
                                    </VStack>
                                </Box>

                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                                    <Button variant="outline" borderColor="#333333" onClick={onClose} h="44px" rounded="none" color="#888888" bg="#0A0A0A" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        flex="1" h="44px" bg="white" color="black" rounded="none" fontWeight="bold" onClick={handleSave} 
                                        disabled={!formData.title || !formData.pointsRequired || !formData.discountValue}
                                        _hover={{ bg: "#E5E5E5" }} 
                                        _disabled={{ opacity: 0.5, cursor: "not-allowed", bg: "#333333", color: "#888888" }} 
                                        transition="all 0.2s ease"
                                    >
                                        {isLoading ? "Saving..." : "Create Reward"}
                                    </Button>
                                </Flex>

                            </Box>
                        </motion.div>
                    </Box>
                </>
            )}
        </AnimatePresence>
    );
};

// --- MAIN LOYALTY MANAGER ---
export const LoyaltyManager = () => {
    const [earningRules, setEarningRules] = useState<EarningRule[]>(generateDummyEarningRules());
    const [redemptionRules, setRedemptionRules] = useState<RedemptionRule[]>(generateDummyRedemptionRules());
    
    // Base conversion: e.g., Spend ₦100 = Earn 1 Point
    const [baseSpendConfig, setBaseSpendConfig] = useState("100");

    // Modal State
    const [isAddRewardModalOpen, setIsAddRewardModalOpen] = useState(false);

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

    const handleCreateReward = (newReward: RedemptionRule) => {
        setRedemptionRules(prev => [newReward, ...prev]);
    };

    // --- STATS (Mock Data for Dashboard) ---
    const totalPointsIssued = 452000;
    const totalPointsRedeemed = 128000;
    const outstandingPoints = totalPointsIssued - totalPointsRedeemed;
    
    // Estimate liability based on the base 1 point = ₦1 redemption value
    const estimatedLiability = outstandingPoints * 1; 

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
                            <Icon as={LuAward} color="#5cac7d" strokeWidth="2.5" /> Loyalty & Rewards
                        </Text>
                        <Text color="#888888" fontSize="sm">Configure how customers earn points and what they can spend them on.</Text>
                    </Box>
                    <Button bg="white" color="black" _hover={{ bg: "#E5E5E5" }} h="44px" px={6} rounded="none" border="none" fontWeight="bold">
                        <Icon as={LuSave} mr={2} strokeWidth="2.5" /> Save Changes
                    </Button>
                </Flex>
            </Box>

            {/* --- STATS OVERVIEW --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={8}>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Flex align="center" gap={2} mb={2} color="#888888">
                        <Icon as={LuTrendingUp} color="#5cac7d" strokeWidth="2.5" />
                        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Total Points Issued</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{totalPointsIssued.toLocaleString()} pts</Text>
                </Box>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Flex align="center" gap={2} mb={2} color="#888888">
                        <Icon as={LuGift} color="blue.400" strokeWidth="2.5" />
                        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Total Points Redeemed</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{totalPointsRedeemed.toLocaleString()} pts</Text>
                </Box>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Flex align="center" gap={2} mb={2} color="#888888">
                        <Icon as={LuCoins} color="orange.400" strokeWidth="2.5" />
                        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Outstanding Liability</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">~ ₦{estimatedLiability.toLocaleString()}</Text>
                </Box>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, xl: 2 }} gap={8} mb={8} alignItems="start">
                
                {/* EARNING RULES */}
                <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" p={6}>
                    <Flex align="center" gap={2} color="white" mb={6}>
                        <Icon as={LuStar} color="orange.400" boxSize="20px" strokeWidth="2.5" />
                        <Text fontSize="lg" fontWeight="bold" letterSpacing="tight">Earning Rules</Text>
                    </Flex>

                    {/* Global Spend Rule */}
                    <Box bg="#111111" rounded="none" p={5} border="1px solid" borderColor="#333333" mb={6}>
                        <Text color="white" fontSize="sm" fontWeight="bold" mb={3} textTransform="uppercase" letterSpacing="wider">Base Purchase Rule</Text>
                        <Flex align="center" gap={3} wrap="wrap">
                            <Text color="#888888" fontSize="sm" fontWeight="bold">Customers earn</Text>
                            <Box bg="#000000" color="white" border="1px solid #333333" px={3} py={1.5} rounded="none" fontWeight="bold" fontSize="sm">
                                1 Point
                            </Box>
                            <Text color="#888888" fontSize="sm" fontWeight="bold">for every</Text>
                            <Flex align="center" bg="#0A0A0A" border="1px solid" borderColor="#333333" rounded="none" px={2} h="36px" w="100px" _focusWithin={{ borderColor: "white" }}>
                                <Text color="#888888" fontSize="sm" mr={1} fontWeight="bold">₦</Text>
                                <Input type="number" value={baseSpendConfig} onChange={(e) => setBaseSpendConfig(e.target.value)} border="none" _focus={{ boxShadow: "none" }} color="white" h="full" px={0} fontSize="sm" fontWeight="bold" />
                            </Flex>
                            <Text color="#888888" fontSize="sm" fontWeight="bold">spent.</Text>
                        </Flex>
                    </Box>

                    {/* Custom Action Rules */}
                    <VStack gap={3} align="stretch">
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Custom Actions</Text>
                        {earningRules.map(rule => {
                            const isActive = rule.status === "Active";
                            return (
                                <Flex key={rule.id} bg="#111111" rounded="none" p={4} border="1px solid" borderColor="#1A1A1A" align="center" justify="space-between" opacity={!isActive ? 0.6 : 1} transition="all 0.2s">
                                    <Box flex={1}>
                                        <HStack gap={2} mb={1}>
                                            <Box boxSize="6px" rounded="none" bg={isActive ? "white" : "#333333"} />
                                            <Text color="white" fontWeight="bold" fontSize="sm" letterSpacing="tight">{rule.action}</Text>
                                        </HStack>
                                        <Text color="#888888" fontSize="xs" ml={3.5}>{rule.description}</Text>
                                    </Box>

                                    <HStack gap={4}>
                                        <Flex align="center" bg="#0A0A0A" border="1px solid" borderColor="#333333" rounded="none" px={2} h="36px" w="100px" _focusWithin={{ borderColor: "white" }}>
                                            <Input type="number" value={rule.pointsAwarded} onChange={(e) => updateEarningPoints(rule.id, e.target.value)} border="none" _focus={{ boxShadow: "none" }} color="white" h="full" px={0} fontSize="sm" fontWeight="bold" textAlign="right" mr={1} />
                                            <Text color="#888888" fontSize="xs" fontWeight="bold">pts</Text>
                                        </Flex>
                                        <IconButton aria-label="Toggle" size="sm" onClick={() => toggleEarningStatus(rule.id, rule.status)} variant="ghost" color={isActive ? "#5cac7d" : "#555555"} rounded="none" _hover={{ bg: "#1A1A1A" }}>
                                            <Icon as={isActive ? LuPowerOff : LuPower} strokeWidth="2.5" />
                                        </IconButton>
                                    </HStack>
                                </Flex>
                            );
                        })}
                    </VStack>
                </Box>

                
                {/* REDEMPTION RULES */}
              
                <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" p={6}>
                    <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
                        <Flex align="center" gap={2} color="white">
                            <Icon as={LuGift} color="blue.400" boxSize="20px" strokeWidth="2.5" />
                            <Text fontSize="lg" fontWeight="bold" letterSpacing="tight">Spending Rules (Rewards)</Text>
                        </Flex>
                        
                        {/* TRIGGER MODAL HERE */}
                        <Button onClick={() => setIsAddRewardModalOpen(true)} size="sm" bg="white" color="black" _hover={{ bg: "#E5E5E5" }} rounded="none" fontWeight="bold">
                            <Icon as={LuPlus} mr={2} strokeWidth="2.5" /> Add Reward
                        </Button>
                    </Flex>

                    <VStack gap={3} align="stretch">
                        {redemptionRules.length === 0 && (
                            <Flex justify="center" py={8} color="#888888" bg="#111111" rounded="none" border="1px dashed" borderColor="#333333" fontWeight="bold">
                                No rewards created yet. Add one to incentivize your customers!
                            </Flex>
                        )}
                        {redemptionRules.map(rule => {
                            const isActive = rule.status === "Active";
                            return (
                                <Box key={rule.id} bg="#111111" rounded="none" p={4} border="1px solid" borderColor="#1A1A1A" opacity={!isActive ? 0.6 : 1}>
                                    <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
                                        <VStack align="start" gap={1}>
                                            <Flex align="center" gap={2}>
                                                <Text color="white" fontWeight="bold" letterSpacing="tight">{rule.title}</Text>
                                                <Box px={2} py={0.5} rounded="none" bg="#0A0A0A" border="1px solid" borderColor="#333333" color={isActive ? "white" : "#555555"} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                                    {rule.status}
                                                </Box>
                                            </Flex>
                                            <Flex align="center" gap={1.5} color="#888888" fontSize="sm" fontWeight="bold">
                                                <Icon as={LuCoins} color="orange.400" boxSize="14px" strokeWidth="2.5" /> Costs {rule.pointsRequired.toLocaleString()} Points
                                            </Flex>
                                        </VStack>

                                        <Flex align="center" gap={4}>
                                            <VStack align="end" gap={0}>
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Value</Text>
                                                <Text color="white" fontWeight="black" fontSize="lg" letterSpacing="tight">₦{rule.discountValue.toLocaleString()}</Text>
                                            </VStack>
                                            <Box w="1px" h="30px" bg="#1A1A1A" />
                                            <Flex gap={1}>
                                                <IconButton aria-label="Toggle" size="sm" onClick={() => toggleRedemptionStatus(rule.id, rule.status)} variant="ghost" color={isActive ? "#5cac7d" : "#555555"} rounded="none" _hover={{ bg: "#1A1A1A" }}>
                                                    <Icon as={isActive ? LuPowerOff : LuPower} strokeWidth="2.5" />
                                                </IconButton>
                                                <IconButton aria-label="Delete" size="sm" onClick={() => deleteRedemptionRule(rule.id)} variant="ghost" color="red.400" rounded="none" _hover={{ bg: "#1A1A1A" }}>
                                                    <Icon as={LuTrash2} strokeWidth="2.5" />
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

            {/* MOUNT MODAL */}
            <AddRewardModal isOpen={isAddRewardModalOpen} onClose={() => setIsAddRewardModalOpen(false)} onSave={handleCreateReward} />
        </Box>
    );
};
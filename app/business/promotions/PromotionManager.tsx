"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, HStack, VStack, SimpleGrid, IconButton } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LuMegaphone, LuSearch, LuPlus, LuCalendarClock, 
    LuTrendingUp, LuPause, LuPlay, LuTrash2, LuPackageOpen, LuTruck, LuX
} from "react-icons/lu";

import { generateDummyPromotions } from "@/data/data";
import { PromotionCampaign } from "@/data/types";

// --- REUSABLE STYLES ---
const inputStyles = { bg: "#000000", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 4, _focus: { outline: "none", borderColor: "white", boxShadow: "none" }, _hover: { borderColor: "#555555" } };
const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#000000", color: "white", height: "44px", borderRadius: "0px", padding: "0 16px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px" };
const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };

// --- CREATE PROMO MODAL ---
interface CreatePromoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (promo: PromotionCampaign) => void;
}

const CreatePromoModal = ({ isOpen, onClose, onSave }: CreatePromoModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        type: "Store-wide",
        target: "All Products",
        discountValue: "",
        startDate: "",
        endDate: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            const newPromo: PromotionCampaign = {
                id: `PRM-${Math.floor(Math.random() * 90000) + 10000}`,
                title: formData.title,
              type: formData.type as PromotionCampaign["type"],
                target: formData.target,
                discountValue: formData.discountValue,
                startDate: formData.startDate || "Today",
                endDate: formData.endDate || "TBD",
                status: "Scheduled", 
                revenueGenerated: 0
            };
            onSave(newPromo);
            setIsLoading(false);
            setFormData({ title: "", type: "Store-wide", target: "All Products", discountValue: "", startDate: "", endDate: "" });
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
                                            Campaign Manager
                                        </Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">
                                            Create Promotion
                                        </Text>
                                    </Box>
                                    <IconButton aria-label="Close modal" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <VStack w="full" gap={6} align="stretch">
                                        <Box>
                                            <Text as="label" {...labelStyles}>Campaign Title <Text as="span" color="red.400">*</Text></Text>
                                            <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Black Friday Sale" {...inputStyles} />
                                        </Box>

                                        <Box>
                                            <Text as="label" {...labelStyles}>Promotion Type</Text>
                                            <select name="type" value={formData.type} onChange={handleChange} style={nativeSelectStyle}>
                                                <option value="Store-wide" style={{ background: "#000000" }}>Store-wide Discount</option>
                                                <option value="Category Discount" style={{ background: "#000000" }}>Category Discount</option>
                                                <option value="Free Shipping" style={{ background: "#000000" }}>Free Shipping</option>
                                                <option value="BOGO" style={{ background: "#000000" }}>Buy One Get One (BOGO)</option>
                                            </select>
                                        </Box>

                                        <Box>
                                            <Text as="label" {...labelStyles}>Target Audience / Items</Text>
                                            <Input name="target" value={formData.target} onChange={handleChange} placeholder="e.g. All Products, VIP Customers, Sneakers" {...inputStyles} />
                                        </Box>

                                        <Box>
                                            <Text as="label" {...labelStyles}>Discount Value <Text as="span" color="red.400">*</Text></Text>
                                            <Input name="discountValue" value={formData.discountValue} onChange={handleChange} placeholder="e.g. 20% OFF, ₦5000 OFF" {...inputStyles} />
                                        </Box>

                                        <SimpleGrid columns={2} gap={4}>
                                            <Box>
                                                <Text as="label" {...labelStyles}>Start Date</Text>
                                                <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} {...inputStyles} css={{ '::-webkit-calendar-picker-indicator': { filter: 'invert(1)' } }} />
                                            </Box>
                                            <Box>
                                                <Text as="label" {...labelStyles}>End Date</Text>
                                                <Input type="date" name="endDate" value={formData.endDate} onChange={handleChange} {...inputStyles} css={{ '::-webkit-calendar-picker-indicator': { filter: 'invert(1)' } }} />
                                            </Box>
                                        </SimpleGrid>
                                    </VStack>
                                </Box>

                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                                    <Button variant="outline" borderColor="#333333" onClick={onClose} h="44px" rounded="none" color="#888888" bg="#0A0A0A" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        flex="1" h="44px" bg="white" color="black" rounded="none" fontWeight="bold" onClick={handleSave} 
                                        disabled={!formData.title || !formData.discountValue}
                                        _hover={{ bg: "#E5E5E5" }} 
                                        _disabled={{ opacity: 0.5, cursor: "not-allowed", bg: "#333333", color: "#888888" }} 
                                        transition="all 0.2s ease"
                                    >
                                        {isLoading ? "Saving..." : "Launch Campaign"}
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

// --- MAIN PROMOTION MANAGER ---
export const PromotionManager = () => {
    const [promotions, setPromotions] = useState<PromotionCampaign[]>(generateDummyPromotions());
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

    const handleCreatePromo = (newPromo: PromotionCampaign) => {
        setPromotions(prev => [newPromo, ...prev]);
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
                    
                    {/* CREATE CAMPAIGN TRIGGER */}
                    <Button onClick={() => setIsCreateModalOpen(true)} bg="white" color="black" rounded="none" _hover={{ bg: "#E5E5E5" }} h="44px" px={6} fontWeight="bold" border="none">
                        <Icon as={LuPlus} mr={2} strokeWidth="2.5" /> Create Campaign
                    </Button>
                </Flex>
            </Box>

         
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={6}>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#5cac7d" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Active Campaigns</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{activeCampaigns}</Text>
                </Box>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Total Revenue Driven</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{totalPromoRevenue.toLocaleString()}</Text>
                </Box>
            </SimpleGrid>

            {/* --- UTILITY TOOLBAR (Search isolated here) --- */}
            <Flex mb={6} w="full">
                <Flex align="center" bg="#0A0A0A" border="1px solid" borderColor="#333333" rounded="none" px={4} h="44px" w={{ base: "full", md: "350px" }} _focusWithin={{ borderColor: "white" }}>
                    <Icon as={LuSearch} color="#888888" strokeWidth="2.5" />
                    <Input 
                        placeholder="Search campaigns..." 
                        border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" ml={2} px={0}
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Flex>
            </Flex>

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

            {/* --- MOUNT MODAL --- */}
            <CreatePromoModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
                onSave={handleCreatePromo}
            />
        </Box>
    );
};
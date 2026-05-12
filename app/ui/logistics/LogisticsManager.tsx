"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, HStack, VStack, SimpleGrid, IconButton } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LuTruck, LuMapPin, LuPlus, LuPackage, 
    LuPower, LuPowerOff, LuTrash2, LuSearch, LuClock, LuX
} from "react-icons/lu";

import { generateDummyShippingTiers, generateDummyShippingZones } from "@/app/lib/data";
import { ShippingTier, ShippingZone } from "@/app/lib/definitions";

// --- REUSABLE STYLES ---
const inputStyles = { bg: "#000000", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 4, _focus: { outline: "none", borderColor: "white", boxShadow: "none" }, _hover: { borderColor: "#555555" } };
const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };

// --- CREATE TIER MODAL ---
interface CreateTierModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (tier: ShippingTier) => void;
}

const CreateTierModal = ({ isOpen, onClose, onSave }: CreateTierModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ name: "", estimatedTime: "", flatRate: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            const newTier: ShippingTier = {
                id: `TIR-${Math.floor(Math.random() * 90000) + 10000}`,
                name: formData.name,
                estimatedTime: formData.estimatedTime,
                flatRate: Number(formData.flatRate) || 0,
                status: "Active"
            };
            onSave(newTier);
            setIsLoading(false);
            setFormData({ name: "", estimatedTime: "", flatRate: "" });
            onClose();
        }, 600);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }} onClick={onClose} />
                    <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "400px", md: "450px" }} pointerEvents="none">
                        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
                            <Box w="100%" h="100%" bg="#0A0A0A" borderLeft="1px solid" borderColor="#1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                                <Flex justify="space-between" align="center" px={6} pt={8} pb={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#111111">
                                    <Box>
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Delivery Tiers</Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">Create New Tier</Text>
                                    </Box>
                                    <IconButton aria-label="Close modal" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>
                                <Box flex={1} overflowY="auto" px={6} py={8}>
                                    <VStack w="full" gap={6} align="stretch">
                                        <Box>
                                            <Text as="label" {...labelStyles}>Tier Name <Text as="span" color="red.400">*</Text></Text>
                                            <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Same Day Delivery" {...inputStyles} />
                                        </Box>
                                        <Box>
                                            <Text as="label" {...labelStyles}>Estimated Time <Text as="span" color="red.400">*</Text></Text>
                                            <Input name="estimatedTime" value={formData.estimatedTime} onChange={handleChange} placeholder="e.g. 2-4 Hours" {...inputStyles} />
                                        </Box>
                                        <Box>
                                            <Text as="label" {...labelStyles}>Extra Flat Rate Fee (₦)</Text>
                                            <Input type="number" name="flatRate" value={formData.flatRate} onChange={handleChange} placeholder="e.g. 5000 (Leave blank for base price)" {...inputStyles} />
                                        </Box>
                                    </VStack>
                                </Box>
                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                                    <Button variant="outline" borderColor="#333333" onClick={onClose} h="44px" rounded="none" color="#888888" bg="#0A0A0A" _hover={{ bg: "#1A1A1A", color: "white" }}>Cancel</Button>
                                    <Button flex="1" h="44px" bg="white" color="black" rounded="none" fontWeight="bold" onClick={handleSave} disabled={!formData.name || !formData.estimatedTime} _hover={{ bg: "#E5E5E5" }} _disabled={{ opacity: 0.5, cursor: "not-allowed", bg: "#333333", color: "#888888" }} transition="all 0.2s ease">
                                        {isLoading ? "Saving..." : "Create Tier"}
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

// --- CREATE ZONE MODAL ---
interface CreateZoneModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (zone: ShippingZone) => void;
}

const CreateZoneModal = ({ isOpen, onClose, onSave }: CreateZoneModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ stateName: "", basePrice: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            const newZone: ShippingZone = {
                id: `ZON-${Math.floor(Math.random() * 90000) + 10000}`,
                stateName: formData.stateName,
                basePrice: Number(formData.basePrice) || 0,
                status: "Active"
            };
            onSave(newZone);
            setIsLoading(false);
            setFormData({ stateName: "", basePrice: "" });
            onClose();
        }, 600);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }} onClick={onClose} />
                    <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "400px", md: "450px" }} pointerEvents="none">
                        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
                            <Box w="100%" h="100%" bg="#0A0A0A" borderLeft="1px solid" borderColor="#1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                                <Flex justify="space-between" align="center" px={6} pt={8} pb={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#111111">
                                    <Box>
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>State Pricing Zones</Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">Add New State</Text>
                                    </Box>
                                    <IconButton aria-label="Close modal" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>
                                <Box flex={1} overflowY="auto" px={6} py={8}>
                                    <VStack w="full" gap={6} align="stretch">
                                        <Box>
                                            <Text as="label" {...labelStyles}>State / Region Name <Text as="span" color="red.400">*</Text></Text>
                                            <Input name="stateName" value={formData.stateName} onChange={handleChange} placeholder="e.g. Lagos" {...inputStyles} />
                                        </Box>
                                        <Box>
                                            <Text as="label" {...labelStyles}>Base Shipping Price (₦) <Text as="span" color="red.400">*</Text></Text>
                                            <Input type="number" name="basePrice" value={formData.basePrice} onChange={handleChange} placeholder="e.g. 2500" {...inputStyles} />
                                        </Box>
                                    </VStack>
                                </Box>
                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                                    <Button variant="outline" borderColor="#333333" onClick={onClose} h="44px" rounded="none" color="#888888" bg="#0A0A0A" _hover={{ bg: "#1A1A1A", color: "white" }}>Cancel</Button>
                                    <Button flex="1" h="44px" bg="white" color="black" rounded="none" fontWeight="bold" onClick={handleSave} disabled={!formData.stateName || !formData.basePrice} _hover={{ bg: "#E5E5E5" }} _disabled={{ opacity: 0.5, cursor: "not-allowed", bg: "#333333", color: "#888888" }} transition="all 0.2s ease">
                                        {isLoading ? "Saving..." : "Add State"}
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

// --- MAIN LOGISTICS MANAGER ---
export const LogisticsManager = () => {
    const [tiers, setTiers] = useState<ShippingTier[]>(generateDummyShippingTiers());
    const [zones, setZones] = useState<ShippingZone[]>(generateDummyShippingZones());
    const [searchZone, setSearchZone] = useState("");
    
    // Modal States
    const [isCreateTierOpen, setIsCreateTierOpen] = useState(false);
    const [isCreateZoneOpen, setIsCreateZoneOpen] = useState(false);

    // --- ACTIONS: TIERS ---
    const toggleTierStatus = (id: string, currentStatus: string) => {
        setTiers(prev => prev.map(tier => 
            tier.id === id ? { ...tier, status: currentStatus === "Active" ? "Disabled" : "Active" } : tier
        ));
    };

    const deleteTier = (id: string) => {
        setTiers(prev => prev.filter(t => t.id !== id));
    };

    const handleAddTier = (newTier: ShippingTier) => {
        setTiers(prev => [newTier, ...prev]);
    };

    // --- ACTIONS: ZONES ---
    const toggleZoneStatus = (id: string, currentStatus: string) => {
        setZones(prev => prev.map(zone => 
            zone.id === id ? { ...zone, status: currentStatus === "Active" ? "Disabled" : "Active" } : zone
        ));
    };

    const deleteZone = (id: string) => {
        setZones(prev => prev.filter(z => z.id !== id));
    };

    const updateZonePrice = (id: string, newPrice: string) => {
        const parsed = parseInt(newPrice) || 0;
        setZones(prev => prev.map(zone => zone.id === id ? { ...zone, basePrice: parsed } : zone));
    };

    const handleAddZone = (newZone: ShippingZone) => {
        setZones(prev => [newZone, ...prev]);
    };

    // --- STATS ---
    const activeStates = zones.filter(z => z.status === "Active").length;
    const avgShippingCost = zones.length > 0 ? zones.reduce((acc, curr) => acc + curr.basePrice, 0) / zones.length : 0;

    const filteredZones = zones.filter(z => z.stateName.toLowerCase().includes(searchZone.toLowerCase()));

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000" minH="100vh">
            
            {/* --- Sticky Header --- */}
            <Box 
                position="sticky" top={{ base: "-16px", md: "-32px" }} mx={{ base: "-16px", md: "-32px" }} px={{ base: "16px", md: "32px" }} 
                zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} borderBottom="1px solid #1A1A1A"
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4}>
                    <Box>
                        <Text color="white" fontWeight="black" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2} letterSpacing="tight">
                            <Icon as={LuTruck} color="#5cac7d" strokeWidth="2.5" /> Logistics & Shipping
                        </Text>
                        <Text color="#888888" fontSize="sm">Manage delivery tiers and state-based pricing rules.</Text>
                    </Box>
                    <HStack gap={6}>
                        <VStack align="flex-end" gap={0}>
                            <Text color="white" fontWeight="black" fontSize="xl" letterSpacing="tight">{activeStates}</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Active States</Text>
                        </VStack>
                        <Box h="40px" w="1px" bg="#333333" />
                        <VStack align="flex-end" gap={0}>
                            <Text color="white" fontWeight="black" fontSize="xl" letterSpacing="tight">₦{avgShippingCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Avg Base Price</Text>
                        </VStack>
                    </HStack>
                </Flex>
            </Box>

            <SimpleGrid columns={{ base: 1, xl: 2 }} gap={8} mb={8} alignItems="start">
                
                {/* SECTION: DELIVERY TIERS (SPEEDS) */}
                <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" p={6}>
                    <Flex justify="space-between" align="center" mb={6}>
                        <Flex align="center" gap={2} color="white">
                            <Icon as={LuPackage} color="#5cac7d" boxSize="20px" strokeWidth="2.5" />
                            <Text fontSize="lg" fontWeight="black" letterSpacing="tight">Delivery Tiers</Text>
                        </Flex>
                        <Button onClick={() => setIsCreateTierOpen(true)} size="sm" bg="white" color="black" border="none" rounded="none" _hover={{ bg: "#E5E5E5" }} fontWeight="bold" h="36px" px={4}>
                            <Icon as={LuPlus} mr={2} strokeWidth="2.5" /> Add Tier
                        </Button>
                    </Flex>

                    <VStack gap={3} align="stretch">
                        {tiers.length === 0 && (
                            <Text color="#888888" fontSize="sm" fontWeight="bold" textAlign="center" py={8} border="1px dashed #1A1A1A">No delivery tiers configured.</Text>
                        )}
                        {tiers.map(tier => {
                            const isActive = tier.status === "Active";
                            return (
                                <Box key={tier.id} bg="#111111" rounded="none" p={4} border="1px solid" borderColor={isActive ? "#333333" : "#1A1A1A"} opacity={!isActive ? 0.6 : 1} _hover={{ bg: "#1A1A1A" }} transition="all 0.2s">
                                    <Flex justify="space-between" align="flex-start" wrap="wrap" gap={4}>
                                        <VStack align="start" gap={1}>
                                            <Flex align="center" gap={2}>
                                                <Text color="white" fontWeight="bold" letterSpacing="tight">{tier.name}</Text>
                                                <Box px={2} py={0.5} rounded="none" bg="#000000" border="1px solid #333333" color={isActive ? "white" : "#888888"} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                                    {tier.status}
                                                </Box>
                                            </Flex>
                                            <Flex align="center" gap={1.5} color="#888888" fontSize="sm" fontWeight="bold">
                                                <Icon as={LuClock} color="#888888" boxSize="14px" strokeWidth="2.5" /> {tier.estimatedTime}
                                            </Flex>
                                        </VStack>

                                        <Flex align="center" gap={4}>
                                            <VStack align="end" gap={0}>
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Extra Fee</Text>
                                                <Text color="white" fontWeight="black" letterSpacing="tight">{tier.flatRate > 0 ? `+ ₦${tier.flatRate.toLocaleString()}` : "Base Price"}</Text>
                                            </VStack>
                                            <Box w="1px" h="30px" bg="#333333" />
                                            <Flex gap={1}>
                                                <IconButton aria-label="Toggle" size="sm" onClick={() => toggleTierStatus(tier.id, tier.status)} variant="ghost" rounded="none" _hover={{ bg: "#1A1A1A" }}>
                                                    <Icon as={isActive ? LuPowerOff : LuPower} color={isActive ? "orange.400" : "#5cac7d"} strokeWidth="2.5" />
                                                </IconButton>
                                                <IconButton aria-label="Delete" size="sm" onClick={() => deleteTier(tier.id)} variant="ghost" rounded="none" _hover={{ bg: "#1A1A1A" }}>
                                                    <Icon as={LuTrash2} color="red.400" strokeWidth="2.5" />
                                                </IconButton>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Box>
                            );
                        })}
                    </VStack>
                </Box>

                {/* SECTION: STATE PRICING ZONES */}
                <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" p={6}>
                    <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
                        <Flex align="center" gap={2} color="white">
                            <Icon as={LuMapPin} color="blue.400" boxSize="20px" strokeWidth="2.5" />
                            <Text fontSize="lg" fontWeight="black" letterSpacing="tight">State Pricing Zones</Text>
                        </Flex>
                        <Flex gap={2}>
                            <Flex align="center" bg="#111111" border="1px solid" borderColor="#333333" rounded="none" px={3} h="36px" _focusWithin={{ borderColor: "white" }}>
                                <Icon as={LuSearch} color="#888888" boxSize="14px" mr={2} strokeWidth="2.5" />
                                <Input placeholder="Search state..." border="none" _focus={{ boxShadow: "none", outline: "none" }} color="white" h="full" fontSize="sm" px={0} w="120px" value={searchZone} onChange={(e) => setSearchZone(e.target.value)} />
                            </Flex>
                            <Button onClick={() => setIsCreateZoneOpen(true)} size="sm" h="36px" bg="white" color="black" border="none" rounded="none" _hover={{ bg: "#E5E5E5" }} fontWeight="bold" px={4}>
                                <Icon as={LuPlus} mr={2} strokeWidth="2.5" /> Add State
                            </Button>
                        </Flex>
                    </Flex>

                    <VStack gap={2} align="stretch" maxH="500px" overflowY="auto" css={{ '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }} pr={2}>
                        {filteredZones.map(zone => {
                            const isActive = zone.status === "Active";
                            return (
                                <Flex key={zone.id} bg="#111111" rounded="none" p={3} border="1px solid" borderColor={isActive ? "#333333" : "#1A1A1A"} align="center" justify="space-between" opacity={!isActive ? 0.6 : 1} transition="all 0.2s" _hover={{ bg: "#1A1A1A" }}>
                                    <HStack gap={3}>
                                        <Box boxSize="8px" rounded="none" bg={isActive ? "white" : "#333333"} />
                                        <Text color="white" fontWeight="bold" fontSize="sm" w="100px" letterSpacing="tight">{zone.stateName}</Text>
                                    </HStack>

                                    <HStack gap={4}>
                                        <Flex align="center" bg="#0A0A0A" border="1px solid" borderColor="#333333" rounded="none" px={2} h="36px" w="120px" _focusWithin={{ borderColor: "white" }}>
                                            <Text color="#888888" fontSize="sm" mr={1} fontWeight="bold">₦</Text>
                                            <Input type="number" value={zone.basePrice} onChange={(e) => updateZonePrice(zone.id, e.target.value)} border="none" _focus={{ boxShadow: "none", outline: "none" }} color="white" h="full" px={0} fontSize="sm" fontWeight="bold" />
                                        </Flex>

                                        <Flex gap={1}>
                                            <IconButton aria-label="Toggle" size="sm" onClick={() => toggleZoneStatus(zone.id, zone.status)} variant="ghost" rounded="none" _hover={{ bg: "#1A1A1A" }}>
                                                <Icon as={isActive ? LuPowerOff : LuPower} color={isActive ? "orange.400" : "#5cac7d"} strokeWidth="2.5" />
                                            </IconButton>
                                            <IconButton aria-label="Delete" size="sm" onClick={() => deleteZone(zone.id)} variant="ghost" rounded="none" _hover={{ bg: "#1A1A1A" }}>
                                                <Icon as={LuTrash2} color="red.400" strokeWidth="2.5" />
                                            </IconButton>
                                        </Flex>
                                    </HStack>
                                </Flex>
                            );
                        })}
                        {filteredZones.length === 0 && (
                            <Text color="#888888" fontSize="sm" fontWeight="bold" textAlign="center" py={8} border="1px dashed #1A1A1A">No states match your search.</Text>
                        )}
                    </VStack>
                </Box>
            </SimpleGrid>
            
            {/* --- MOUNT MODALS --- */}
            <CreateTierModal isOpen={isCreateTierOpen} onClose={() => setIsCreateTierOpen(false)} onSave={handleAddTier} />
            <CreateZoneModal isOpen={isCreateZoneOpen} onClose={() => setIsCreateZoneOpen(false)} onSave={handleAddZone} />
        </Box>
    );
};
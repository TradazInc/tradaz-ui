"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, HStack, VStack, SimpleGrid, IconButton } from "@chakra-ui/react";
import { 
    LuTruck, LuMapPin, LuPlus, LuPackage, 
    LuPower, LuPowerOff, LuTrash2, LuSearch, LuClock
} from "react-icons/lu";

import { generateDummyShippingTiers, generateDummyShippingZones } from "@/app/lib/data";
import { ShippingTier, ShippingZone } from "@/app/lib/definitions";

export const LogisticsManager = () => {
    const [tiers, setTiers] = useState<ShippingTier[]>(generateDummyShippingTiers());
    const [zones, setZones] = useState<ShippingZone[]>(generateDummyShippingZones());
    const [searchZone, setSearchZone] = useState("");

    // --- ACTIONS: TIERS ---
    const toggleTierStatus = (id: string, currentStatus: string) => {
        setTiers(prev => prev.map(tier => 
            tier.id === id ? { ...tier, status: currentStatus === "Active" ? "Disabled" : "Active" } : tier
        ));
    };

    const deleteTier = (id: string) => {
        setTiers(prev => prev.filter(t => t.id !== id));
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

    // --- STATS ---
    const activeStates = zones.filter(z => z.status === "Active").length;
    const avgShippingCost = zones.length > 0 ? zones.reduce((acc, curr) => acc + curr.basePrice, 0) / zones.length : 0;

    const filteredZones = zones.filter(z => z.stateName.toLowerCase().includes(searchZone.toLowerCase()));

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
                            <Icon as={LuTruck} color="#5cac7d" strokeWidth="2.5" /> Logistics & Shipping
                        </Text>
                        <Text color="#888888" fontSize="sm">Manage delivery tiers and state-based pricing rules.</Text>
                    </Box>
                    <HStack gap={4}>
                        <VStack align="flex-end" gap={0}>
                            <Text color="white" fontWeight="black" fontSize="xl" letterSpacing="tight">{activeStates}</Text>
                            <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Active States</Text>
                        </VStack>
                        <Box h="40px" w="1px" bg="#333333" />
                        <VStack align="flex-end" gap={0}>
                            <Text color="white" fontWeight="black" fontSize="xl" letterSpacing="tight">₦{avgShippingCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
                            <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Avg Base Price</Text>
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
                            <Text fontSize="lg" fontWeight="bold" letterSpacing="tight">Delivery Tiers</Text>
                        </Flex>
                        <Button size="sm" bg="#111111" color="white" border="1px solid #333333" rounded="none" _hover={{ bg: "#1A1A1A" }} fontWeight="bold">
                            <Icon as={LuPlus} color="#5cac7d" mr={2} strokeWidth="2.5" /> Add Tier
                        </Button>
                    </Flex>

                    <VStack gap={3} align="stretch">
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
                            <Text fontSize="lg" fontWeight="bold" letterSpacing="tight">State Pricing Zones</Text>
                        </Flex>
                        <Flex gap={2}>
                            <Flex align="center" bg="#111111" border="1px solid" borderColor="#333333" rounded="none" px={3} h="36px" _focusWithin={{ borderColor: "white" }}>
                                <Icon as={LuSearch} color="#888888" boxSize="14px" mr={2} strokeWidth="2.5" />
                                <Input placeholder="Search state..." border="none" _focus={{ boxShadow: "none" }} color="white" h="full" fontSize="sm" px={0} w="120px" value={searchZone} onChange={(e) => setSearchZone(e.target.value)} />
                            </Flex>
                            <Button size="sm" h="36px" bg="#111111" color="white" border="1px solid #333333" rounded="none" _hover={{ bg: "#1A1A1A" }} fontWeight="bold">
                                <Icon as={LuPlus} color="blue.400" mr={2} strokeWidth="2.5" /> Add State
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
                                            <Input type="number" value={zone.basePrice} onChange={(e) => updateZonePrice(zone.id, e.target.value)} border="none" _focus={{ boxShadow: "none" }} color="white" h="full" px={0} fontSize="sm" fontWeight="bold" />
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
        </Box>
    );
};
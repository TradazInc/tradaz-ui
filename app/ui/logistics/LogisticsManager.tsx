"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, HStack, VStack, SimpleGrid, IconButton } from "@chakra-ui/react";
import { 
    LuTruck, LuMapPin, LuPlus, LuPackage, 
    LuPower, LuPowerOff, LuTrash2, LuSave, LuClock
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
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* --- Sticky Header --- */}
            <Box 
                position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} 
                bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} mx={-4} px={4} 
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4} mb={6}>
                    <Box>
                        <Text color="#5cac7d" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2}>
                            <Icon as={LuTruck} /> Logistics & Shipping
                        </Text>
                        <Text color="gray.400" fontSize="sm">Manage delivery tiers and state-based pricing rules.</Text>
                    </Box>
                    <HStack gap={4}>
                        <VStack align="flex-end" gap={0}>
                            <Text color="white" fontWeight="bold" fontSize="lg">{activeStates}</Text>
                            <Text color="gray.500" fontSize="xs">Active States</Text>
                        </VStack>
                        <Box h="40px" w="1px" bg="whiteAlpha.200" />
                        <VStack align="flex-end" gap={0}>
                            <Text color="orange.400" fontWeight="bold" fontSize="lg">₦{avgShippingCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
                            <Text color="gray.500" fontSize="xs">Avg Base Price</Text>
                        </VStack>
                    </HStack>
                </Flex>
            </Box>

            <SimpleGrid columns={{ base: 1, xl: 2 }} gap={8} mb={8} alignItems="start">
                
             
                {/* SECTION  DELIVERY TIERS (SPEEDS) */}
              
                <Box bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6}>
                    <Flex justify="space-between" align="center" mb={6}>
                        <Flex align="center" gap={2} color="white">
                            <Icon as={LuPackage} color="#5cac7d" boxSize="20px" />
                            <Text fontSize="lg" fontWeight="bold">Delivery Tiers</Text>
                        </Flex>
                        <Button size="sm" bg="rgba(92, 172, 125, 0.15)" color="#5cac7d" _hover={{ bg: "#5cac7d", color: "white" }}>
                            <Icon as={LuPlus} mr={2} /> Add Tier
                        </Button>
                    </Flex>

                    <VStack gap={3} align="stretch">
                        {tiers.map(tier => {
                            const isActive = tier.status === "Active";
                            return (
                                <Box key={tier.id} bg="#1A1C23" rounded="xl" p={4} border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.3)" : "whiteAlpha.100"} opacity={!isActive ? 0.6 : 1}>
                                    <Flex justify="space-between" align="flex-start" wrap="wrap" gap={4}>
                                        <VStack align="start" gap={1}>
                                            <Flex align="center" gap={2}>
                                                <Text color="white" fontWeight="bold">{tier.name}</Text>
                                                <Box px={2} py={0.5} rounded="full" bg={isActive ? "rgba(92, 172, 125, 0.15)" : "whiteAlpha.100"} color={isActive ? "#5cac7d" : "gray.400"} fontSize="xs" fontWeight="bold">
                                                    {tier.status}
                                                </Box>
                                            </Flex>
                                            <Flex align="center" gap={1.5} color="gray.400" fontSize="sm">
                                                <Icon as={LuClock} boxSize="14px" /> {tier.estimatedTime}
                                            </Flex>
                                        </VStack>

                                        <Flex align="center" gap={4}>
                                            <VStack align="end" gap={0}>
                                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Extra Fee</Text>
                                                <Text color="white" fontWeight="black">{tier.flatRate > 0 ? `+ ₦${tier.flatRate.toLocaleString()}` : "Base Price"}</Text>
                                            </VStack>
                                            <Box w="1px" h="30px" bg="whiteAlpha.200" />
                                            <Flex gap={1}>
                                                <IconButton aria-label="Toggle" size="sm" onClick={() => toggleTierStatus(tier.id, tier.status)} variant="ghost" color={isActive ? "orange.400" : "#5cac7d"} _hover={{ bg: "whiteAlpha.100" }}>
                                                    <Icon as={isActive ? LuPowerOff : LuPower} />
                                                </IconButton>
                                                <IconButton aria-label="Delete" size="sm" onClick={() => deleteTier(tier.id)} variant="ghost" color="red.400" _hover={{ bg: "red.900", color: "white" }}>
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

               
                <Box bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6}>
                    <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
                        <Flex align="center" gap={2} color="white">
                            <Icon as={LuMapPin} color="blue.400" boxSize="20px" />
                            <Text fontSize="lg" fontWeight="bold">State Pricing Zones</Text>
                        </Flex>
                        <Flex gap={2}>
                            <Flex align="center" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="md" px={3} h="32px">
                                <Icon as={LuSave} color="gray.400" boxSize="14px" mr={2} />
                                <Input placeholder="Search state..." border="none" _focus={{ boxShadow: "none" }} color="white" h="full" fontSize="sm" px={0} w="120px" value={searchZone} onChange={(e) => setSearchZone(e.target.value)} />
                            </Flex>
                            <Button size="sm" bg="rgba(66, 153, 225, 0.15)" color="blue.400" _hover={{ bg: "blue.400", color: "white" }}>
                                <Icon as={LuPlus} mr={2} /> Add State
                            </Button>
                        </Flex>
                    </Flex>

                    <VStack gap={2} align="stretch" maxH="500px" overflowY="auto" css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)' } }} pr={2}>
                        {filteredZones.map(zone => {
                            const isActive = zone.status === "Active";
                            return (
                                <Flex key={zone.id} bg="#1A1C23" rounded="lg" p={3} border="1px solid" borderColor={isActive ? "rgba(66, 153, 225, 0.2)" : "whiteAlpha.100"} align="center" justify="space-between" opacity={!isActive ? 0.6 : 1} transition="all 0.2s">
                                    <HStack gap={3}>
                                        <Box boxSize="8px" rounded="full" bg={isActive ? "blue.400" : "gray.500"} />
                                        <Text color="white" fontWeight="bold" fontSize="sm" w="100px">{zone.stateName}</Text>
                                    </HStack>

                                    <HStack gap={4}>
                                        <Flex align="center" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="md" px={2} h="36px" w="120px">
                                            <Text color="gray.500" fontSize="sm" mr={1}>₦</Text>
                                            <Input type="number" value={zone.basePrice} onChange={(e) => updateZonePrice(zone.id, e.target.value)} border="none" _focus={{ boxShadow: "none" }} color="white" h="full" px={0} fontSize="sm" fontWeight="bold" />
                                        </Flex>

                                        <Flex gap={1}>
                                            <IconButton aria-label="Toggle" size="sm" onClick={() => toggleZoneStatus(zone.id, zone.status)} variant="ghost" color={isActive ? "orange.400" : "#5cac7d"} _hover={{ bg: "whiteAlpha.100" }}>
                                                <Icon as={isActive ? LuPowerOff : LuPower} />
                                            </IconButton>
                                            <IconButton aria-label="Delete" size="sm" onClick={() => deleteZone(zone.id)} variant="ghost" color="red.400" _hover={{ bg: "red.900", color: "white" }}>
                                                <Icon as={LuTrash2} />
                                            </IconButton>
                                        </Flex>
                                    </HStack>
                                </Flex>
                            );
                        })}
                        {filteredZones.length === 0 && (
                            <Text color="gray.500" fontSize="sm" textAlign="center" py={4}>No states match your search.</Text>
                        )}
                    </VStack>
                </Box>
            </SimpleGrid>
        </Box>
    );
};
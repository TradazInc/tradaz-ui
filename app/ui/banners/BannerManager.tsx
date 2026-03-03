"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Button, HStack, VStack, SimpleGrid } from "@chakra-ui/react";
import { 
    LuLayoutTemplate, LuPlus, LuType, LuLink, 
    LuPower, LuPowerOff, LuSquare, LuTrash2, LuMonitorSmartphone
} from "react-icons/lu";

import { generateDummyBanners } from "@/app/lib/data";
import { PromoBanner } from "@/app/lib/definitions";

export const BannerManager = () => {
    const [banners, setBanners] = useState<PromoBanner[]>(generateDummyBanners());

    // --- ACTIONS ---
    const toggleStatus = (id: string, currentStatus: string) => {
        setBanners(prev => prev.map(banner => 
            banner.id === id ? { ...banner, status: currentStatus === "Active" ? "Draft" : "Active" } : banner
        ));
    };

    const deleteBanner = (id: string) => {
        setBanners(prev => prev.filter(b => b.id !== id));
    };

    // --- STATS ---
    const activeCount = banners.filter(b => b.status === "Active").length;
    const topBarActive = banners.some(b => b.position === "Top Announcement Bar" && b.status === "Active");

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* --- Sticky Header (Slimmed down for mobile!) --- */}
            <Box 
                position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} 
                bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} mx={-4} px={4} 
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4}>
                    <Box>
                        <Text color="#5cac7d" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2}>
                            <Icon as={LuLayoutTemplate} /> Promo Banners
                        </Text>
                        <Text color="gray.400" fontSize="sm">Manage announcement bars, hero sliders, and checkout warnings.</Text>
                    </Box>
                    
                    <Button bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} h="44px" px={6}>
                        <Icon as={LuPlus} mr={2} /> Create Banner
                    </Button>
                </Flex>
            </Box>

            {/* --- STATS & SEARCH (Moved outside sticky header to scroll away) --- */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={6}>
                <Box bg="#1A1C23" p={4} rounded="xl" border="1px solid" borderColor="rgba(92, 172, 125, 0.3)">
                    <Text color="#5cac7d" fontSize="xs" fontWeight="bold" textTransform="uppercase">Active Banners</Text>
                    <Text color="white" fontSize="2xl" fontWeight="black">{activeCount}</Text>
                </Box>
                <Box bg="#1A1C23" p={4} rounded="xl" border="1px solid" borderColor={topBarActive ? "rgba(66, 153, 225, 0.3)" : "whiteAlpha.100"}>
                    <Text color={topBarActive ? "blue.400" : "gray.500"} fontSize="xs" fontWeight="bold" textTransform="uppercase">Top Bar Status</Text>
                    <Flex align="center" gap={2} mt={1}>
                        <Box boxSize="8px" rounded="full" bg={topBarActive ? "blue.400" : "gray.500"} />
                        <Text color="white" fontSize="lg" fontWeight="bold">{topBarActive ? "Currently Displaying" : "Empty / Hidden"}</Text>
                    </Flex>
                </Box>
            </SimpleGrid>

            {/* --- BANNERS LIST --- */}
            <VStack gap={4} align="stretch" mb={8}>
                {banners.length === 0 ? (
                    <Flex justify="center" py={12} color="gray.500" bg="whiteAlpha.50" rounded="2xl" border="1px dashed" borderColor="whiteAlpha.200">
                        No banners created yet. Add one to announce your next big sale!
                    </Flex>
                ) : (
                    banners.map((banner) => {
                        const isActive = banner.status === "Active";
                        const isDraft = banner.status === "Draft";

                        return (
                            <Box key={banner.id} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.3)" : "whiteAlpha.100"} p={{ base: 4, md: 6 }} shadow="sm" transition="all 0.2s" opacity={isDraft ? 0.6 : 1}>
                                <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "center" }} gap={6}>
                                    
                                    {/* Left: Banner Info */}
                                    <VStack align="start" flex={1} gap={2}>
                                        <HStack gap={3}>
                                            <Flex align="center" justify="center" bg="whiteAlpha.100" p={2} rounded="md">
                                                <Icon as={LuMonitorSmartphone} color={isActive ? "#5cac7d" : "gray.300"} boxSize="18px" />
                                            </Flex>
                                            <Box>
                                                <Text color="white" fontWeight="bold" fontSize="lg">{banner.name}</Text>
                                                <Text color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">{banner.position}</Text>
                                            </Box>
                                        </HStack>

                                        <Flex align="center" mt={2}>
                                            <Flex align="center" px={2.5} py={0.5} rounded="full" bg={isActive ? "rgba(92, 172, 125, 0.15)" : "whiteAlpha.100"}>
                                                <Box boxSize="6px" rounded="full" mr={2} bg={isActive ? "#5cac7d" : "gray.400"} />
                                                <Text color={isActive ? "#5cac7d" : "gray.400"} fontSize="xs" fontWeight="bold">
                                                    {banner.status}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </VStack>

                                    {/* Middle: Live Visual Preview */}
                                    <VStack align="start" flex={2} w="full" gap={2} bg="whiteAlpha.50" p={4} rounded="lg" border="1px solid" borderColor="whiteAlpha.100">
                                        <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Live Preview</Text>
                                        
                                        {/* THE ACTUAL MINI-BANNER PREVIEW */}
                                        <Flex 
                                            w="full" p={3} rounded="md" justify="center" align="center" gap={4} 
                                            bg={banner.bgColor} color={banner.textColor} 
                                            boxShadow="inset 0 0 10px rgba(0,0,0,0.1)"
                                            direction={{ base: "column", md: "row" }}
                                            textAlign="center"
                                        >
                                            <Flex align="center" gap={2}>
                                                <Icon as={LuType} boxSize="14px" opacity={0.7} />
                                                <Text fontSize="sm" fontWeight="medium">{banner.message}</Text>
                                            </Flex>
                                            {banner.ctaText && (
                                                <Button size="xs" bg={banner.textColor} color={banner.bgColor} _hover={{ opacity: 0.8 }} rounded="full" px={4}>
                                                    {banner.ctaText}
                                                </Button>
                                            )}
                                        </Flex>
                                        
                                        <Flex align="center" gap={1.5} color="gray.500" mt={1}>
                                            <Icon as={LuLink} boxSize="12px" />
                                            <Text fontSize="xs">Links to: {banner.ctaLink}</Text>
                                        </Flex>
                                    </VStack>

                                    {/* Right: Actions */}
                                    <Flex direction="column" gap={2} minW="140px" justify="flex-end" w={{ base: "full", md: "auto" }}>
                                        <Button size="sm" variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }} justifyContent="flex-start">
                                            <Icon as={LuSquare} mr={2} /> Edit Banner
                                        </Button>
                                        <Button size="sm" onClick={() => toggleStatus(banner.id, banner.status)} variant="outline" borderColor="whiteAlpha.200" color={isActive ? "orange.400" : "#5cac7d"} _hover={{ bg: "whiteAlpha.50" }} justifyContent="flex-start">
                                            <Icon as={isActive ? LuPowerOff : LuPower} mr={2} /> {isActive ? "Deactivate" : "Activate"}
                                        </Button>
                                        <Box w="full" h="1px" bg="whiteAlpha.100" my={1} display={{ base: "none", md: "block" }} />
                                        <Button size="sm" onClick={() => deleteBanner(banner.id)} variant="ghost" color="red.400" _hover={{ bg: "red.900", color: "white" }} justifyContent="flex-start">
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
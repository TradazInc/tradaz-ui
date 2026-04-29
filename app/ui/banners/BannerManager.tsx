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
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000">
            
            {/* --- Sticky Header (Slimmed down for mobile!) --- */}
            <Box 
                position="sticky" top={{ base: "-16px", md: "-32px" }} mx={{ base: "-16px", md: "-32px" }} px={{ base: "16px", md: "32px" }}
                zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} borderBottom="1px solid #1A1A1A"
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4}>
                    <Box>
                        <Text color="white" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2} letterSpacing="tight">
                            <Icon as={LuLayoutTemplate} color="#5cac7d" strokeWidth="2.5" /> Promo Banners
                        </Text>
                        <Text color="#888888" fontSize="sm">Manage announcement bars, hero sliders, and checkout warnings.</Text>
                    </Box>
                    
                    <Button bg="white" color="black" _hover={{ bg: "#E5E5E5" }} h="44px" px={6} rounded="none" fontWeight="bold" border="none">
                        <Icon as={LuPlus} mr={2} strokeWidth="2.5" /> Create Banner
                    </Button>
                </Flex>
            </Box>

            {/* --- STATS --- */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={8}>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#5cac7d" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Active Banners</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{activeCount}</Text>
                </Box>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color={topBarActive ? "blue.400" : "#888888"} fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Top Bar Status</Text>
                    <Flex align="center" gap={2}>
                        <Box boxSize="8px" rounded="none" bg={topBarActive ? "blue.400" : "gray.500"} />
                        <Text color="white" fontSize="2xl" fontWeight="black" letterSpacing="tight">{topBarActive ? "Currently Displaying" : "Empty / Hidden"}</Text>
                    </Flex>
                </Box>
            </SimpleGrid>

            {/* --- BANNERS LIST --- */}
            <VStack gap={4} align="stretch" mb={8}>
                {banners.length === 0 ? (
                    <Flex justify="center" py={12} color="#888888" bg="#0A0A0A" rounded="none" border="1px dashed" borderColor="#1A1A1A" fontWeight="bold">
                        No banners created yet. Add one to announce your next big sale!
                    </Flex>
                ) : (
                    banners.map((banner) => {
                        const isActive = banner.status === "Active";
                        const isDraft = banner.status === "Draft";

                        return (
                            <Box key={banner.id} bg="#0A0A0A" rounded="none" border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.3)" : "#1A1A1A"} p={{ base: 4, md: 6 }} transition="all 0.2s" opacity={isDraft ? 0.6 : 1} _hover={{ bg: "#111111" }}>
                                <Flex direction={{ base: "column", xl: "row" }} justify="space-between" align={{ base: "flex-start", xl: "center" }} gap={6}>
                                    
                                    {/* Left: Banner Info */}
                                    <VStack align="start" flex={1} gap={2} minW="200px">
                                        <HStack gap={3}>
                                            <Flex align="center" justify="center" bg="#111111" p={3} rounded="none" border="1px solid #333333">
                                                <Icon as={LuMonitorSmartphone} color={isActive ? "white" : "#888888"} boxSize="20px" strokeWidth="2.5" />
                                            </Flex>
                                            <Box>
                                                <Text color="white" fontWeight="bold" fontSize="xl" letterSpacing="tight">{banner.name}</Text>
                                                <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mt={1}>{banner.position}</Text>
                                            </Box>
                                        </HStack>

                                        <Flex align="center" mt={2}>
                                            <Flex align="center" px={2} py={1} rounded="none" border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.3)" : "#333333"} bg={isActive ? "rgba(92, 172, 125, 0.1)" : "#111111"}>
                                                <Box boxSize="6px" rounded="none" mr={2} bg={isActive ? "#5cac7d" : "gray.500"} />
                                                <Text color={isActive ? "#5cac7d" : "gray.500"} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                                    {banner.status}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </VStack>

                                    {/* Middle: Live Visual Preview */}
                                    <VStack align="start" flex={2} w="full" gap={3} bg="#111111" p={4} rounded="none" border="1px solid" borderColor="#1A1A1A">
                                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Live Preview</Text>
                                        
                                        {/* THE ACTUAL MINI-BANNER PREVIEW */}
                                        <Flex 
                                            w="full" p={3} rounded="none" justify="center" align="center" gap={4} 
                                            bg={banner.bgColor} color={banner.textColor} 
                                            boxShadow="inset 0 0 10px rgba(0,0,0,0.1)"
                                            direction={{ base: "column", md: "row" }}
                                            textAlign="center"
                                        >
                                            <Flex align="center" gap={2}>
                                                <Icon as={LuType} boxSize="14px" strokeWidth="2.5" opacity={0.7} />
                                                <Text fontSize="sm" fontWeight="bold">{banner.message}</Text>
                                            </Flex>
                                            {banner.ctaText && (
                                                <Button size="xs" bg={banner.textColor} color={banner.bgColor} _hover={{ opacity: 0.8 }} rounded="none" px={4} fontWeight="black" textTransform="uppercase" letterSpacing="wider">
                                                    {banner.ctaText}
                                                </Button>
                                            )}
                                        </Flex>
                                        
                                        <Flex align="center" gap={1.5} color="#888888" mt={1}>
                                            <Icon as={LuLink} boxSize="12px" strokeWidth="2.5" />
                                            <Text fontSize="xs" fontWeight="bold">Links to: {banner.ctaLink}</Text>
                                        </Flex>
                                    </VStack>

                                    {/* Right: Actions */}
                                    <Flex direction="column" gap={2} minW="140px" justify="flex-end" w={{ base: "full", xl: "auto" }}>
                                        <Button size="sm" h="36px" variant="outline" borderColor="#333333" color="white" _hover={{ bg: "#111111" }} rounded="none" justifyContent="flex-start">
                                            <Icon as={LuSquare} mr={2} strokeWidth="2.5" /> Edit Banner
                                        </Button>
                                        <Button size="sm" h="36px" onClick={() => toggleStatus(banner.id, banner.status)} variant="outline" borderColor="#333333" color={isActive ? "orange.400" : "#5cac7d"} _hover={{ bg: "#111111" }} rounded="none" justifyContent="flex-start">
                                            <Icon as={isActive ? LuPowerOff : LuPower} mr={2} strokeWidth="2.5" /> {isActive ? "Deactivate" : "Activate"}
                                        </Button>
                                        <Box w="full" h="1px" bg="#1A1A1A" my={1} display={{ base: "none", xl: "block" }} />
                                        <Button size="sm" h="36px" onClick={() => deleteBanner(banner.id)} variant="ghost" color="red.400" _hover={{ bg: "red.900", color: "white" }} rounded="none" justifyContent="flex-start">
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
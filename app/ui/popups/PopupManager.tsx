"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Button, HStack, VStack, SimpleGrid } from "@chakra-ui/react";
import { 
    LuAppWindow, LuPlus, LuMail, 
    LuMegaphone, LuMousePointerClick, LuPower, LuPowerOff,
    LuEye, LuTarget, LuSquare, LuTrash2
} from "react-icons/lu";

import { generateDummyPopups } from "@/app/lib/data";
import { PopupCampaign } from "@/app/lib/definitions";

export const PopupManager = () => {
    const [popups, setPopups] = useState<PopupCampaign[]>(generateDummyPopups());

    // --- ACTIONS ---
    const toggleStatus = (id: string, currentStatus: string) => {
        setPopups(prev => prev.map(popup => 
            popup.id === id ? { ...popup, status: currentStatus === "Active" ? "Paused" : "Active" } : popup
        ));
    };

    const deletePopup = (id: string) => {
        setPopups(prev => prev.filter(p => p.id !== id));
    };

    // --- STATS ---
    const activeCount = popups.filter(p => p.status === "Active").length;
    const totalViews = popups.reduce((acc, curr) => acc + curr.views, 0);
    const totalConversions = popups.reduce((acc, curr) => acc + curr.conversions, 0);
    const avgConversionRate = totalViews > 0 ? ((totalConversions / totalViews) * 100).toFixed(1) : "0.0";

    const getIconForType = (type: string) => {
        switch (type) {
            case "Email Capture": return LuMail;
            case "Announcement": return LuMegaphone;
            case "Discount Offer": return LuAppWindow;
            case "Exit Intent": return LuMousePointerClick;
            default: return LuAppWindow;
        }
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* --- Sticky Header & Filters --- */}
            <Box 
                position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} 
                bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} mx={-4} px={4} 
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4} mb={6}>
                    <Box>
                        <Text color="#5cac7d" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2}>
                            <Icon as={LuAppWindow} /> Website Pop-ups
                        </Text>
                        <Text color="gray.400" fontSize="sm">Capture leads, announce sales, and reduce cart abandonment.</Text>
                    </Box>
                    
                    <Button bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} h="44px" px={6}>
                        <Icon as={LuPlus} mr={2} /> Create Pop-up
                    </Button>
                </Flex>

                <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
                    <Box bg="#1A1C23" p={4} rounded="xl" border="1px solid" borderColor="rgba(92, 172, 125, 0.3)">
                        <Text color="#5cac7d" fontSize="xs" fontWeight="bold" textTransform="uppercase">Active Pop-ups</Text>
                        <Text color="white" fontSize="2xl" fontWeight="black">{activeCount}</Text>
                    </Box>
                    <Box bg="#1A1C23" p={4} rounded="xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Total Views</Text>
                        <Text color="white" fontSize="2xl" fontWeight="black">{totalViews.toLocaleString()}</Text>
                    </Box>
                    <Box bg="#1A1C23" p={4} rounded="xl" border="1px solid" borderColor="rgba(237, 137, 54, 0.3)">
                        <Text color="orange.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">Avg Conversion Rate</Text>
                        <Text color="orange.400" fontSize="2xl" fontWeight="black">{avgConversionRate}%</Text>
                    </Box>
                </SimpleGrid>
            </Box>

            {/* --- POP-UPS LIST --- */}
            <VStack gap={4} align="stretch" mb={8}>
                {popups.length === 0 ? (
                    <Flex justify="center" py={12} color="gray.500" bg="whiteAlpha.50" rounded="2xl" border="1px dashed" borderColor="whiteAlpha.200">
                        No pop-ups created yet. Build one to capture more leads!
                    </Flex>
                ) : (
                    popups.map((popup) => {
                        const isActive = popup.status === "Active";
                        const PopupIcon = getIconForType(popup.type);
                        const conversionRate = ((popup.conversions / popup.views) * 100).toFixed(1);

                        return (
                            <Box key={popup.id} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.3)" : "whiteAlpha.100"} p={{ base: 4, md: 6 }} shadow="sm" transition="all 0.2s" opacity={!isActive ? 0.6 : 1}>
                                <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "center" }} gap={6}>
                                    
                                    {/* Left: Pop-up Details */}
                                    <VStack align="start" flex={1} gap={2}>
                                        <HStack gap={3}>
                                            <Flex align="center" justify="center" bg="whiteAlpha.100" p={2} rounded="md">
                                                <Icon as={PopupIcon} color={isActive ? "#5cac7d" : "gray.300"} boxSize="18px" />
                                            </Flex>
                                            <Box>
                                                <Text color="white" fontWeight="bold" fontSize="lg">{popup.name}</Text>
                                                <Text color="gray.400" fontSize="xs">{popup.type} • Trigger: {popup.trigger}</Text>
                                            </Box>
                                        </HStack>

                                        <Flex align="center" mt={2}>
                                            <Flex align="center" px={2.5} py={0.5} rounded="full" bg={isActive ? "rgba(92, 172, 125, 0.15)" : "whiteAlpha.100"}>
                                                <Box boxSize="6px" rounded="full" mr={2} bg={isActive ? "#5cac7d" : "gray.400"} />
                                                <Text color={isActive ? "#5cac7d" : "gray.400"} fontSize="xs" fontWeight="bold">
                                                    {popup.status}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </VStack>

                                    {/* Middle: Performance Metrics */}
                                    <VStack align="start" flex={1} w="full" minW={{ md: "250px" }} maxW={{ md: "400px" }} gap={3} bg="whiteAlpha.50" p={4} rounded="lg" border="1px solid" borderColor="whiteAlpha.100">
                                        <Flex justify="space-between" w="full" align="center">
                                            <VStack align="start" gap={1}>
                                                <Flex align="center" gap={1.5} color="gray.500">
                                                    <Icon as={LuEye} boxSize="14px" />
                                                    <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">Views</Text>
                                                </Flex>
                                                <Text color="white" fontSize="md" fontWeight="bold">{popup.views.toLocaleString()}</Text>
                                            </VStack>
                                            
                                            <Box h="30px" w="1px" bg="whiteAlpha.200" />
                                            
                                            <VStack align="start" gap={1}>
                                                <Flex align="center" gap={1.5} color="gray.500">
                                                    <Icon as={LuTarget} boxSize="14px" />
                                                    <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">Clicks/Emails</Text>
                                                </Flex>
                                                <Text color="white" fontSize="md" fontWeight="bold">{popup.conversions.toLocaleString()}</Text>
                                            </VStack>

                                            <Box h="30px" w="1px" bg="whiteAlpha.200" />

                                            <VStack align="end" gap={1}>
                                                <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Conv. Rate</Text>
                                                <Text color={parseFloat(conversionRate) > 5 ? "#5cac7d" : "orange.400"} fontSize="md" fontWeight="black">
                                                    {conversionRate}%
                                                </Text>
                                            </VStack>
                                        </Flex>
                                    </VStack>

                                    {/* Right: Actions */}
                                    <Flex direction="column" gap={2} minW="140px" justify="flex-end" w={{ base: "full", md: "auto" }}>
                                        <Button size="sm" variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }} justifyContent="flex-start">
                                            <Icon as={LuSquare} mr={2} /> Edit Design
                                        </Button>
                                        <Button size="sm" onClick={() => toggleStatus(popup.id, popup.status)} variant="outline" borderColor="whiteAlpha.200" color={isActive ? "orange.400" : "#5cac7d"} _hover={{ bg: "whiteAlpha.50" }} justifyContent="flex-start">
                                            <Icon as={isActive ? LuPowerOff : LuPower} mr={2} /> {isActive ? "Pause" : "Activate"}
                                        </Button>
                                        <Box w="full" h="1px" bg="whiteAlpha.100" my={1} display={{ base: "none", md: "block" }} />
                                        <Button size="sm" onClick={() => deletePopup(popup.id)} variant="ghost" color="red.400" _hover={{ bg: "red.900", color: "white" }} justifyContent="flex-start">
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
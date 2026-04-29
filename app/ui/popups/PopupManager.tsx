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
                            <Icon as={LuAppWindow} color="#5cac7d" strokeWidth="2.5" /> Website Pop-ups
                        </Text>
                        <Text color="#888888" fontSize="sm">Capture leads, announce sales, and reduce cart abandonment.</Text>
                    </Box>
                    
                    <Button bg="white" color="black" _hover={{ bg: "#E5E5E5" }} h="44px" px={6} rounded="none" fontWeight="bold" border="none">
                        <Icon as={LuPlus} mr={2} strokeWidth="2.5" /> Create Pop-up
                    </Button>
                </Flex>
            </Box>

            {/* --- STATS --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={8}>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#5cac7d" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Active Pop-ups</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{activeCount}</Text>
                </Box>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Total Views</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{totalViews.toLocaleString()}</Text>
                </Box>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="orange.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Avg Conversion Rate</Text>
                    <Text color="orange.400" fontSize="3xl" fontWeight="black" letterSpacing="tight">{avgConversionRate}%</Text>
                </Box>
            </SimpleGrid>

            {/* --- POP-UPS LIST --- */}
            <VStack gap={4} align="stretch" mb={8}>
                {popups.length === 0 ? (
                    <Flex justify="center" py={12} color="#888888" bg="#0A0A0A" rounded="none" border="1px dashed" borderColor="#1A1A1A" fontWeight="bold">
                        No pop-ups created yet. Build one to capture more leads!
                    </Flex>
                ) : (
                    popups.map((popup) => {
                        const isActive = popup.status === "Active";
                        const PopupIcon = getIconForType(popup.type);
                        const conversionRate = ((popup.conversions / popup.views) * 100).toFixed(1);

                        return (
                            <Box key={popup.id} bg="#0A0A0A" rounded="none" border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.3)" : "#1A1A1A"} p={{ base: 4, md: 6 }} transition="all 0.2s" opacity={!isActive ? 0.6 : 1} _hover={{ bg: "#111111" }}>
                                <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "center" }} gap={6}>
                                    
                                    {/* Left: Pop-up Details */}
                                    <VStack align="start" flex={1} gap={2}>
                                        <HStack gap={3}>
                                            <Flex align="center" justify="center" bg="#111111" p={3} rounded="none" border="1px solid #333333">
                                                <Icon as={PopupIcon} color={isActive ? "white" : "#888888"} boxSize="20px" strokeWidth="2.5" />
                                            </Flex>
                                            <Box>
                                                <Text color="white" fontWeight="bold" fontSize="xl" letterSpacing="tight">{popup.name}</Text>
                                                <Text color="#888888" fontSize="xs" mt={1}>{popup.type} • Trigger: {popup.trigger}</Text>
                                            </Box>
                                        </HStack>

                                        <Flex align="center" mt={2}>
                                            <Flex align="center" px={2} py={1} rounded="none" bg={isActive ? "rgba(92, 172, 125, 0.1)" : "#111111"} border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.3)" : "#333333"}>
                                                <Box boxSize="6px" rounded="none" mr={2} bg={isActive ? "#5cac7d" : "gray.500"} />
                                                <Text color={isActive ? "#5cac7d" : "gray.500"} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                                    {popup.status}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </VStack>

                                    {/* Middle: Performance Metrics */}
                                    <VStack align="start" flex={1} w="full" minW={{ md: "250px" }} maxW={{ md: "400px" }} gap={3} bg="#111111" p={4} rounded="none" border="1px solid" borderColor="#1A1A1A">
                                        <Flex justify="space-between" w="full" align="center">
                                            <VStack align="start" gap={1}>
                                                <Flex align="center" gap={1.5} color="#888888">
                                                    <Icon as={LuEye} boxSize="14px" strokeWidth="2.5" />
                                                    <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Views</Text>
                                                </Flex>
                                                <Text color="white" fontSize="md" fontWeight="bold">{popup.views.toLocaleString()}</Text>
                                            </VStack>
                                            
                                            <Box h="30px" w="1px" bg="#1A1A1A" />
                                            
                                            <VStack align="start" gap={1}>
                                                <Flex align="center" gap={1.5} color="#888888">
                                                    <Icon as={LuTarget} boxSize="14px" strokeWidth="2.5" />
                                                    <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Clicks/Emails</Text>
                                                </Flex>
                                                <Text color="white" fontSize="md" fontWeight="bold">{popup.conversions.toLocaleString()}</Text>
                                            </VStack>

                                            <Box h="30px" w="1px" bg="#1A1A1A" />

                                            <VStack align="end" gap={1}>
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Conv. Rate</Text>
                                                <Text color={parseFloat(conversionRate) > 5 ? "#5cac7d" : "orange.400"} fontSize="md" fontWeight="black">
                                                    {conversionRate}%
                                                </Text>
                                            </VStack>
                                        </Flex>
                                    </VStack>

                                    {/* Right: Actions */}
                                    <Flex direction="column" gap={2} minW="140px" justify="flex-end" w={{ base: "full", md: "auto" }}>
                                        <Button size="sm" h="36px" variant="outline" borderColor="#333333" color="white" _hover={{ bg: "#111111" }} rounded="none" justifyContent="flex-start">
                                            <Icon as={LuSquare} mr={2} strokeWidth="2.5" /> Edit Design
                                        </Button>
                                        <Button size="sm" h="36px" onClick={() => toggleStatus(popup.id, popup.status)} variant="outline" borderColor="#333333" color={isActive ? "orange.400" : "#5cac7d"} _hover={{ bg: "#111111" }} rounded="none" justifyContent="flex-start">
                                            <Icon as={isActive ? LuPowerOff : LuPower} mr={2} strokeWidth="2.5" /> {isActive ? "Pause" : "Activate"}
                                        </Button>
                                        <Box w="full" h="1px" bg="#1A1A1A" my={1} display={{ base: "none", md: "block" }} />
                                        <Button size="sm" h="36px" onClick={() => deletePopup(popup.id)} variant="ghost" color="red.400" _hover={{ bg: "red.900", color: "white" }} rounded="none" justifyContent="flex-start">
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
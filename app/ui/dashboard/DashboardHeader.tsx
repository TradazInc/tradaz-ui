"use client";
import React, { useState } from "react";
import { Flex, Box, Text, Icon, IconButton } from "@chakra-ui/react";
import { LuBell, LuChevronDown, LuBuilding2, LuCheck, LuMenu, LuPlus } from "react-icons/lu";
import { OnboardingModal } from "../onboarding/OnboardingModel"; 
import {  DashboardHeaderProps } from "@/app/lib/definitions";

export const DashboardHeader = ({ 
    businesses, 
    activeBusiness, 
    onBusinessChange, 
    onOpenSidebar 
}: DashboardHeaderProps) => {
    const [isBizOpen, setIsBizOpen] = useState(false);
    const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

    return (
        <>
            <Flex as="header" position="sticky" top={0} zIndex={100} justify="space-between" align="center" wrap="nowrap" w="full" bg="rgba(30, 30, 32, 0.85)" backdropFilter="blur(12px)" px={{ base: 3, md: 8 }} py={3} borderBottom="1px solid" borderColor="whiteAlpha.100" gap={{ base: 2, md: 4 }}>
                
                <IconButton aria-label="Menu" variant="ghost" display={{ base: "flex", lg: "none" }} onClick={onOpenSidebar} color="white" size="sm">
                    <Icon as={LuMenu} boxSize="22px" />
                </IconButton>
                
                <Flex align="center" gap={4}>
                    {/* The Dropdown */}
                    <Box position="relative">
                        <Flex onClick={() => setIsBizOpen(!isBizOpen)} align="center" gap={2} px={3} py={1.5} bg="#171923" rounded="lg" border="1px solid" borderColor="whiteAlpha.100" cursor="pointer" w={{ base: "110px", md: "200px" }}>
                            <Icon as={LuBuilding2} color="orange.500" display={{ base: "none", md: "block" }} />
                            
                            <Text fontSize="xs" color="white" fontWeight="bold" lineClamp={1}>
                                {activeBusiness?.name}
                            </Text>
                            
                            <Icon as={LuChevronDown} color="gray.400" ml="auto" transition="transform 0.2s" transform={isBizOpen ? "rotate(180deg)" : "none"} />
                        </Flex>
                        
                        {isBizOpen && (
                            <>
                
                                <Box 
                                    position="fixed" 
                                    top={0} left={0} w="100vw" h="100vh" 
                                    zIndex={40} 
                                    onClick={() => setIsBizOpen(false)} 
                                />
                                
                                <Box position="absolute" top="100%" left={0} mt={2} w="220px" bg="#1e1e20" border="1px solid" borderColor="whiteAlpha.100" rounded="xl" py={2} zIndex={50} shadow="xl" maxH="300px" overflowY="auto" css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' } }}>
                                    {businesses.map((biz) => (
                                        <Flex key={biz.id} onClick={() => { onBusinessChange(biz.id); setIsBizOpen(false); }} align="center" justify="space-between" px={4} py={3} cursor="pointer" _hover={{ bg: "whiteAlpha.50" }}>
                                            <Text fontSize="sm" color={biz.id === activeBusiness?.id ? "#5cac7d" : "white"} fontWeight={biz.id === activeBusiness?.id ? "bold" : "normal"}>{biz.name}</Text>
                                            {biz.id === activeBusiness?.id && <Icon as={LuCheck} color="#5cac7d" />}
                                        </Flex>
                                    ))}
                                </Box>
                            </>
                        )}
                    </Box>

                    {/* Add Business Button */}
                    <Flex 
                        onClick={() => setIsOnboardingOpen(true)} //  TRIGGER
                        align="center" justify="center" gap={2}
                        bg="#171923" border="1px solid" borderColor="orange.400" 
                        rounded="lg" px={4} py={1.5} cursor="pointer"
                        _hover={{ bg: "whiteAlpha.50", borderColor: "orange.300", color: "orange.300" }}
                        color="orange.400" transition="all 0.2s"
                    >
                        <Icon as={LuPlus} boxSize="18px" />
                        <Text fontSize="sm" fontWeight="semibold" display={{ base: "none", sm: "block" }}>
                            Add Business
                        </Text>
                    </Flex>
                </Flex>

                {/* Right Side: Notification & Avatar */}
                <Flex gap={3} align="center" ml="auto">
                    <Icon as={LuBell} color="gray.400" display={{ base: "none", sm: "block" }} cursor="pointer" _hover={{ color: "white" }} transition="color 0.2s" />
                    <Box w="32px" h="32px" bg="#5cac7d" rounded="full" display="flex" alignItems="center" justifyContent="center" color="white" fontSize="xs" fontWeight="bold" cursor="pointer" boxShadow="0 2px 10px rgba(92, 172, 125, 0.4)">
                        GW
                    </Box>
                </Flex>
            </Flex>

            {/* RENDER THE MODAL HERE */}
            <OnboardingModal 
                isOpen={isOnboardingOpen} 
                onClose={() => setIsOnboardingOpen(false)} 
            />
        </>
    );
};
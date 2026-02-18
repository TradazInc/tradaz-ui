"use client";
import React, { useState } from "react";
import { Flex, Box, Text, Icon, chakra, IconButton } from "@chakra-ui/react";
import { LuSearch, LuBell, LuChevronDown, LuBuilding2, LuCheck, LuMenu } from "react-icons/lu";


interface Business {
    id: string;
    name: string;
    category: string;
}

interface DashboardHeaderProps {
    businesses: Business[];
    activeBusiness: Business;
    onBusinessChange: (id: string) => void;
    onOpenSidebar: () => void;
}

export const DashboardHeader = ({ 
    businesses, 
    activeBusiness, 
    onBusinessChange, 
    onOpenSidebar 
}: DashboardHeaderProps) => {
    const [isBizOpen, setIsBizOpen] = useState(false);

    return (
        <Flex as="header" position="sticky" top={0} zIndex={100} justify="space-between" align="center" wrap="nowrap" w="full" bg="rgba(30, 30, 32, 0.85)" backdropFilter="blur(12px)" px={{ base: 3, md: 8 }} py={3} borderBottom="1px solid" borderColor="whiteAlpha.100" gap={{ base: 2, md: 4 }}>
            
            <IconButton aria-label="Menu" variant="ghost" display={{ base: "flex", lg: "none" }} onClick={onOpenSidebar} color="white" size="sm">
                
                <Icon as={LuMenu} boxSize="22px" />
            </IconButton>
            
            <Box position="relative" onMouseLeave={() => setIsBizOpen(false)}>
                <Flex onClick={() => setIsBizOpen(!isBizOpen)} align="center" gap={2} px={3} py={1.5} bg="#171923" rounded="lg" border="1px solid" borderColor="whiteAlpha.100" cursor="pointer" w={{ base: "110px", md: "200px" }}>
                    <Icon as={LuBuilding2} color="orange.500" display={{ base: "none", md: "block" }} />
                    
            
                    <Text fontSize="xs" color="white" fontWeight="bold" lineClamp={1}>
                        {activeBusiness?.name}
                    </Text>
                    
                    <Icon as={LuChevronDown} color="gray.400" />
                </Flex>
                
                {isBizOpen && (
                    <Box position="absolute" top="100%" left={0} mt={2} w="220px" bg="#1e1e20" border="1px solid" borderColor="whiteAlpha.100" rounded="xl" py={2} zIndex={50}>
                        
                        {businesses.map((biz) => (
                            <Flex key={biz.id} onClick={() => { onBusinessChange(biz.id); setIsBizOpen(false); }} align="center" justify="space-between" px={4} py={2} cursor="pointer" _hover={{ bg: "whiteAlpha.50" }}>
                                <Text fontSize="sm" color={biz.id === activeBusiness.id ? "#5cac7d" : "white"}>{biz.name}</Text>
                                {biz.id === activeBusiness.id && <Icon as={LuCheck} color="#5cac7d" />}
                            </Flex>
                        ))}
                    </Box>
                )}
            </Box>

            <Flex align="center" bg="#171923" border="1px solid" borderColor="whiteAlpha.100" rounded="full" px={4} py={1.5} flex={1} maxW="400px">
                <Icon as={LuSearch} color="gray.400" mr={2} />
                <chakra.input placeholder="Search..." bg="transparent" border="none" outline="none" color="white" fontSize="xs" w="full" />
            </Flex>

            <Flex gap={3} align="center">
                <Icon as={LuBell} color="gray.400" display={{ base: "none", sm: "block" }} />
                <Box w="32px" h="32px" bg="#5cac7d" rounded="full" display="flex" alignItems="center" justifyContent="center" color="white" fontSize="xs" fontWeight="bold">GW</Box>
            </Flex>
        </Flex>
    );
};
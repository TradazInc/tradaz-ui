"use client";
import React, { useState } from "react";
import { Flex, Box, Text, Icon, IconButton, Button, Avatar, AvatarGroup } from "@chakra-ui/react";
import { 
    LuBell, LuChevronDown, LuBuilding2, LuCheck, LuMenu, LuPlus, 
    LuImage, LuSettings, LuLogOut, LuUser, LuShoppingBag
} from "react-icons/lu";
import { OnboardingModal } from "../onboarding/OnboardingModel"; 
import { DashboardHeaderProps } from "@/app/lib/definitions";

export const DashboardHeader = ({ 
    businesses, 
    activeBusiness, 
    onBusinessChange, 
    onOpenSidebar 
}: DashboardHeaderProps) => {
    const [activeDropdown, setActiveDropdown] = useState<"biz" | "notif" | "profile" | null>(null);
    const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

    const toggleDropdown = (dropdown: "biz" | "notif" | "profile") => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const closeAll = () => setActiveDropdown(null);

    const iconStyle = { strokeWidth: "2.5" };

    return (
        <>
            {/* --- GLOBAL OVERLAY TO CLOSE DROPDOWNS --- */}
            {activeDropdown && (
                <Box position="fixed" inset={0} zIndex={40} onClick={closeAll} />
            )}

            <Flex as="header" position="sticky" top={0} zIndex={100} justify="space-between" align="center" wrap="nowrap" w="full" bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)" px={{ base: 3, md: 8 }} py={3} borderBottom="1px solid #1A1A1A" gap={{ base: 2, md: 4 }}>
                
                <IconButton aria-label="Menu" variant="ghost" display={{ base: "flex", lg: "none" }} onClick={onOpenSidebar} color="#888888" _hover={{ color: "white" }} size="sm">
                    <Icon as={LuMenu} boxSize="22px" css={iconStyle} />
                </IconButton>
                
                <Flex align="center" gap={4}>
                    {/* --- BUSINESS DROPDOWN --- */}
                    <Box position="relative">
                        <Flex onClick={() => toggleDropdown("biz")} align="center" gap={2} px={3} py={1.5} bg="#0A0A0A" rounded="lg" border="1px solid #1A1A1A" cursor="pointer" w={{ base: "110px", md: "200px" }} _hover={{ borderColor: "#333" }} transition="all 0.2s">
                            <Icon as={LuBuilding2} color="#888888" display={{ base: "none", md: "block" }} css={iconStyle} />
                            
                            <Text fontSize="13px" color="white" fontWeight="500" lineClamp={1}>
                                {activeBusiness?.name}
                            </Text>
                            
                            <Icon as={LuChevronDown} color="#888888" ml="auto" transition="transform 0.2s" transform={activeDropdown === "biz" ? "rotate(180deg)" : "none"} css={iconStyle} />
                        </Flex>
                        
                        {activeDropdown === "biz" && (
                            <Box position="absolute" top="100%" left={0} mt={2} w="220px" bg="#0A0A0A" border="1px solid #1A1A1A" rounded="none" py={2} zIndex={50} shadow="2xl" maxH="300px" overflowY="auto" css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: '#27272A', borderRadius: '4px' } }}>
                                {businesses.map((biz) => (
                                    <Flex key={biz.id} onClick={() => { onBusinessChange(biz.id); closeAll(); }} align="center" justify="space-between" px={4} py={2.5} cursor="pointer" _hover={{ bg: "#111111" }}>
                                        <Text fontSize="13px" color={biz.id === activeBusiness?.id ? "white" : "#888888"} fontWeight={biz.id === activeBusiness?.id ? "600" : "400"}>{biz.name}</Text>
                                        {biz.id === activeBusiness?.id && <Icon as={LuCheck} color="white" css={iconStyle} />}
                                    </Flex>
                                ))}
                            </Box>
                        )}
                    </Box>

                   
                    <Button 
                        onClick={() => setIsOnboardingOpen(true)} 
                        bg="white" 
                        color="black"
                        rounded="none" 
                        fontWeight="bold"
                        fontSize="13px"
                        h="32px"
                        px={4}
                        _hover={{ bg: "#E5E5E5" }}
                        transition="all 0.2s"
                    >
                        <Icon as={LuPlus} boxSize="16px" css={iconStyle} mr={1.5} />
                        <Text display={{ base: "none", sm: "block" }}>
                            Add Business
                        </Text>
                    </Button>
                </Flex>

                {/* Right Side: Notification & Avatar */}
                <Flex gap={4} align="center" ml="auto">
                    
                    {/* --- NOTIFICATIONS DROPDOWN --- */}
                    <Box position="relative">
                        <Box position="relative" cursor="pointer" onClick={() => toggleDropdown("notif")}>
                            <Icon as={LuBell} color="#888888" boxSize="20px" _hover={{ color: "white" }} transition="color 0.2s" mt={1} css={iconStyle} />
                            <Box position="absolute" top="2px" right="-2px" boxSize="8px" bg="white" rounded="full" border="2px solid #000000" />
                        </Box>

                        {activeDropdown === "notif" && (
                            <Box position="absolute" top="100%" right={0} mt={3} w="320px" bg="#0A0A0A" border="1px solid #1A1A1A" rounded="xl" py={2} zIndex={50} shadow="2xl">
                                <Flex px={4} py={2} justify="space-between" align="center" borderBottom="1px solid #1A1A1A" mb={1}>
                                    <Text fontSize="13px" fontWeight="600" color="white">Notifications</Text>
                                    <Text fontSize="12px" color="#888888" cursor="pointer" _hover={{ color: "white" }}>Mark all read</Text>
                                </Flex>
                                
                                <Box maxH="300px" overflowY="auto" css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <Flex px={4} py={3} gap={3} _hover={{ bg: "#111111" }} cursor="pointer" borderBottom="1px solid #1A1A1A">
                                        <Flex align="center" justify="center" boxSize="32px" bg="#1A1A1A" color="white" border="1px solid #333" rounded="full" flexShrink={0}>
                                            <Icon as={LuShoppingBag} boxSize="14px" css={iconStyle} />
                                        </Flex>
                                        <Box>
                                            <Text fontSize="13px" color="white" fontWeight="500">New order received!</Text>
                                            <Text fontSize="12px" color="#888888" mt={0.5}>Order #POS-8829 needs fulfillment.</Text>
                                            <Text fontSize="10px" color="#555555" mt={1}>10 mins ago</Text>
                                        </Box>
                                    </Flex>

                                    <Flex px={4} py={3} gap={3} _hover={{ bg: "#111111" }} cursor="pointer">
                                        <Flex align="center" justify="center" boxSize="32px" bg="#1A1A1A" color="white" border="1px solid #333" rounded="full" flexShrink={0}>
                                            <Icon as={LuUser} boxSize="14px" css={iconStyle} />
                                        </Flex>
                                        <Box>
                                            <Text fontSize="13px" color="white" fontWeight="500">New Staff Invite Accepted</Text>
                                            <Text fontSize="12px" color="#888888" mt={0.5}>David O. joined your store.</Text>
                                            <Text fontSize="10px" color="#555555" mt={1}>2 hours ago</Text>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Box px={3} pt={2} pb={1}>
                                 
                                    <Button 
                                        w="full" 
                                        bg="white" 
                                        color="black"
                                        rounded="none" 
                                        fontWeight="bold"
                                        fontSize="12px"
                                        size="sm"
                                        _hover={{ bg: "#E5E5E5" }}
                                    >
                                        View All
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Box>

                    {/* --- PROFILE AVATAR DROPDOWN --- */}
                    <Box position="relative">
                        <Box onClick={() => toggleDropdown("profile")} cursor="pointer">
                           
                            <AvatarGroup>
                                <Avatar.Root 
                                    size="sm" 
                                  
                                    border="1px solid" 
                                    borderColor={activeDropdown === "profile" ? "white" : "#333333"} 
                                    transition="all 0.2s"
                                    _hover={{ borderColor: "white" }}
                                >
                                    <Avatar.Fallback bg="#1A1A1A" color="white" fontSize="11px" fontWeight="bold">GW</Avatar.Fallback>
                                    <Avatar.Image />
                                </Avatar.Root>
                            </AvatarGroup>
                        </Box>

                        {activeDropdown === "profile" && (
                            <Box position="absolute" top="100%" right={0} mt={3} w="260px" bg="#0A0A0A" border="1px solid #1A1A1A" rounded="xl" py={2} zIndex={50} shadow="2xl">
                                {/* Profile Header */}
                                <Flex px={4} py={3} gap={3} align="center" borderBottom="1px solid #1A1A1A" mb={2}>
                                    {/*  Inner Avatar for the profile details */}
                                    <AvatarGroup>
                                        <Avatar.Root size="md">
                                            <Avatar.Fallback bg="#1A1A1A" color="white" fontSize="13px" fontWeight="bold">GW</Avatar.Fallback>
                                            <Avatar.Image />
                                        </Avatar.Root>
                                    </AvatarGroup>
                                    
                                    <Box overflow="hidden">
                                        <Text fontSize="13px" fontWeight="600" color="white" lineClamp={1}>Wada Gift</Text>
                                        <Text fontSize="12px" color="#888888" lineClamp={1}>gift.wada@yahoo.com</Text>
                                    </Box>
                                </Flex>

                                {/* Profile Actions */}
                                <Flex px={4} py={2.5} align="center" gap={3} cursor="pointer" _hover={{ bg: "#111111", color: "white" }} color="#888888" transition="all 0.2s">
                                    <Icon as={LuImage} boxSize="16px" css={iconStyle} />
                                    <Text fontSize="13px" fontWeight="500">Change Profile Image</Text>
                                </Flex>
                                <Flex px={4} py={2.5} align="center" gap={3} cursor="pointer" _hover={{ bg: "#111111", color: "white" }} color="#888888" transition="all 0.2s">
                                    <Icon as={LuSettings} boxSize="16px" css={iconStyle} />
                                    <Text fontSize="13px" fontWeight="500">Account Settings</Text>
                                </Flex>
                                
                                <Box my={1} borderBottom="1px solid #1A1A1A" />
                                
                                <Flex px={4} py={2.5} align="center" gap={3} cursor="pointer" _hover={{ bg: "#1A1A1A", color: "white" }} color="#A1A1AA" transition="all 0.2s">
                                    <Icon as={LuLogOut} boxSize="16px" css={iconStyle} />
                                    <Text fontSize="13px" fontWeight="500">Log Out</Text>
                                </Flex>
                            </Box>
                        )}
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
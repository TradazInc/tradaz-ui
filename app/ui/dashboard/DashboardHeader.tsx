"use client";
import React, { useState } from "react";
import { Flex, Box, Text, Icon, IconButton, Button } from "@chakra-ui/react";
import { 
    LuBell, LuChevronDown, LuBuilding2, LuCheck, LuMenu, LuPlus, 
    LuImage, LuSettings, LuLogOut, LuUser, LuShoppingBag
} from "react-icons/lu";
import { OnboardingModal } from "../onboarding/OnboardingModel"; 
import {  DashboardHeaderProps } from "@/app/lib/definitions";

export const DashboardHeader = ({ 
    businesses, 
    activeBusiness, 
    onBusinessChange, 
    onOpenSidebar 
}: DashboardHeaderProps) => {
    // State to track which dropdown is currently active
    const [activeDropdown, setActiveDropdown] = useState<"biz" | "notif" | "profile" | null>(null);
    const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

    const toggleDropdown = (dropdown: "biz" | "notif" | "profile") => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const closeAll = () => setActiveDropdown(null);

    return (
        <>
            {/* --- GLOBAL OVERLAY TO CLOSE DROPDOWNS --- */}
            {activeDropdown && (
                <Box position="fixed" inset={0} zIndex={40} onClick={closeAll} />
            )}

            <Flex as="header" position="sticky" top={0} zIndex={100} justify="space-between" align="center" wrap="nowrap" w="full" bg="rgba(30, 30, 32, 0.85)" backdropFilter="blur(12px)" px={{ base: 3, md: 8 }} py={3} borderBottom="1px solid" borderColor="whiteAlpha.100" gap={{ base: 2, md: 4 }}>
                
                <IconButton aria-label="Menu" variant="ghost" display={{ base: "flex", lg: "none" }} onClick={onOpenSidebar} color="white" size="sm">
                    <Icon as={LuMenu} boxSize="22px" />
                </IconButton>
                
                <Flex align="center" gap={4}>
                    {/* --- BUSINESS DROPDOWN --- */}
                    <Box position="relative">
                        <Flex onClick={() => toggleDropdown("biz")} align="center" gap={2} px={3} py={1.5} bg="#171923" rounded="lg" border="1px solid" borderColor="whiteAlpha.100" cursor="pointer" w={{ base: "110px", md: "200px" }}>
                            <Icon as={LuBuilding2} color="orange.500" display={{ base: "none", md: "block" }} />
                            
                            <Text fontSize="xs" color="white" fontWeight="bold" lineClamp={1}>
                                {activeBusiness?.name}
                            </Text>
                            
                            <Icon as={LuChevronDown} color="gray.400" ml="auto" transition="transform 0.2s" transform={activeDropdown === "biz" ? "rotate(180deg)" : "none"} />
                        </Flex>
                        
                        {activeDropdown === "biz" && (
                            <Box position="absolute" top="100%" left={0} mt={2} w="220px" bg="#1e1e20" border="1px solid" borderColor="whiteAlpha.100" rounded="xl" py={2} zIndex={50} shadow="xl" maxH="300px" overflowY="auto" css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' } }}>
                                {businesses.map((biz) => (
                                    <Flex key={biz.id} onClick={() => { onBusinessChange(biz.id); closeAll(); }} align="center" justify="space-between" px={4} py={3} cursor="pointer" _hover={{ bg: "whiteAlpha.50" }}>
                                        <Text fontSize="sm" color={biz.id === activeBusiness?.id ? "#5cac7d" : "white"} fontWeight={biz.id === activeBusiness?.id ? "bold" : "normal"}>{biz.name}</Text>
                                        {biz.id === activeBusiness?.id && <Icon as={LuCheck} color="#5cac7d" />}
                                    </Flex>
                                ))}
                            </Box>
                        )}
                    </Box>

                    {/* Add Business Button */}
                    <Flex 
                        onClick={() => setIsOnboardingOpen(true)} 
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
                <Flex gap={4} align="center" ml="auto">
                    
                    {/* --- NOTIFICATIONS DROPDOWN --- */}
                    <Box position="relative">
                        <Box position="relative" cursor="pointer" onClick={() => toggleDropdown("notif")}>
                            <Icon as={LuBell} color="gray.400" boxSize="20px" _hover={{ color: "white" }} transition="color 0.2s" mt={1} />
                            {/* Unread Badge */}
                            <Box position="absolute" top="2px" right="-2px" boxSize="8px" bg="red.500" rounded="full" border="2px solid #1e1e20" />
                        </Box>

                        {activeDropdown === "notif" && (
                            <Box position="absolute" top="100%" right={0} mt={3} w="320px" bg="#1e1e20" border="1px solid" borderColor="whiteAlpha.100" rounded="xl" py={2} zIndex={50} shadow="2xl">
                                <Flex px={4} py={2} justify="space-between" align="center" borderBottom="1px solid" borderColor="whiteAlpha.100">
                                    <Text fontSize="sm" fontWeight="bold" color="white">Notifications</Text>
                                    <Text fontSize="xs" color="#5cac7d" cursor="pointer" _hover={{ textDecoration: "underline" }}>Mark all read</Text>
                                </Flex>
                                
                                <Box maxH="300px" overflowY="auto" css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    {/* Mock Notification 1 */}
                                    <Flex px={4} py={3} gap={3} _hover={{ bg: "whiteAlpha.50" }} cursor="pointer" borderBottom="1px solid" borderColor="whiteAlpha.50">
                                        <Flex align="center" justify="center" boxSize="32px" bg="rgba(92, 172, 125, 0.15)" color="#5cac7d" rounded="full" flexShrink={0}>
                                            <Icon as={LuShoppingBag} boxSize="14px" />
                                        </Flex>
                                        <Box>
                                            <Text fontSize="sm" color="white" fontWeight="medium">New order received!</Text>
                                            <Text fontSize="xs" color="gray.500" mt={0.5}>Order #POS-8829 needs fulfillment.</Text>
                                            <Text fontSize="10px" color="gray.600" mt={1}>10 mins ago</Text>
                                        </Box>
                                    </Flex>

                                    {/* Mock Notification 2 */}
                                    <Flex px={4} py={3} gap={3} _hover={{ bg: "whiteAlpha.50" }} cursor="pointer">
                                        <Flex align="center" justify="center" boxSize="32px" bg="rgba(237, 137, 54, 0.15)" color="orange.400" rounded="full" flexShrink={0}>
                                            <Icon as={LuUser} boxSize="14px" />
                                        </Flex>
                                        <Box>
                                            <Text fontSize="sm" color="white" fontWeight="medium">New Staff Invite Accepted</Text>
                                            <Text fontSize="xs" color="gray.500" mt={0.5}>David O. joined your store.</Text>
                                            <Text fontSize="10px" color="gray.600" mt={1}>2 hours ago</Text>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Button w="full" variant="ghost" size="sm" mt={1} color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.50" }}>View All</Button>
                            </Box>
                        )}
                    </Box>

                    {/* --- PROFILE AVATAR DROPDOWN --- */}
                    <Box position="relative">
                        <Box 
                            w="32px" h="32px" bg="#5cac7d" rounded="full" display="flex" alignItems="center" justifyContent="center" 
                            color="white" fontSize="xs" fontWeight="bold" cursor="pointer" 
                            boxShadow={activeDropdown === "profile" ? "0 0 0 2px rgba(92, 172, 125, 0.5)" : "0 2px 10px rgba(92, 172, 125, 0.4)"}
                            transition="all 0.2s" onClick={() => toggleDropdown("profile")}
                        >
                            GW
                        </Box>

                        {activeDropdown === "profile" && (
                            <Box position="absolute" top="100%" right={0} mt={3} w="260px" bg="#1e1e20" border="1px solid" borderColor="whiteAlpha.100" rounded="xl" py={2} zIndex={50} shadow="2xl">
                                {/* Profile Header */}
                                <Flex px={4} py={3} gap={3} align="center" borderBottom="1px solid" borderColor="whiteAlpha.100" mb={2}>
                                    <Box w="40px" h="40px" bg="#5cac7d" rounded="full" display="flex" alignItems="center" justifyContent="center" color="white" fontWeight="bold">
                                        GW
                                    </Box>
                                    <Box overflow="hidden">
                                        <Text fontSize="sm" fontWeight="bold" color="white" lineClamp={1}>Wada Gift</Text>
                                        <Text fontSize="xs" color="gray.500" lineClamp={1}>gift.wada@yahoo.com</Text>
                                    </Box>
                                </Flex>

                                {/* Profile Actions */}
                                <Flex px={4} py={2.5} align="center" gap={3} cursor="pointer" _hover={{ bg: "whiteAlpha.50" }} color="gray.300" transition="background 0.2s">
                                    <Icon as={LuImage} boxSize="16px" />
                                    <Text fontSize="sm">Change Profile Image</Text>
                                </Flex>
                                <Flex px={4} py={2.5} align="center" gap={3} cursor="pointer" _hover={{ bg: "whiteAlpha.50" }} color="gray.300" transition="background 0.2s">
                                    <Icon as={LuSettings} boxSize="16px" />
                                    <Text fontSize="sm">Account Settings</Text>
                                </Flex>
                                
                                <Box my={1} borderBottom="1px solid" borderColor="whiteAlpha.100" />
                                
                                <Flex px={4} py={2.5} align="center" gap={3} cursor="pointer" _hover={{ bg: "rgba(245, 101, 101, 0.1)" }} color="red.400" transition="background 0.2s">
                                    <Icon as={LuLogOut} boxSize="16px" />
                                    <Text fontSize="sm">Log Out</Text>
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
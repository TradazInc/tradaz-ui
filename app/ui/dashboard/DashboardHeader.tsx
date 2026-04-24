"use client";
import React, { useState } from "react";
import { Flex, Box, Text, Icon, Button, Avatar, AvatarGroup } from "@chakra-ui/react";
import { 
    LuBell, LuChevronDown, LuCheck,  LuPlus, 
    LuImage, LuSettings, LuLogOut, LuShoppingBag,
    LuBuilding2, LuStore 
} from "react-icons/lu";
import { OnboardingModal } from "../onboarding/OnboardingModel"; 
import { AddStoreModal } from "../onboarding/AddStoreModal"; 
import { DashboardHeaderProps, Store } from "@/app/lib/definitions"; 



interface ExtendedHeaderProps extends DashboardHeaderProps {
    availableStores?: Store[];
    activeStoreId?: string;
    onStoreChange?: (id: string) => void;
}

export const DashboardHeader = ({ 
    businesses, 
    activeBusiness, 
    onBusinessChange,
    availableStores = [],
    activeStoreId,
    onStoreChange,
    
}: ExtendedHeaderProps) => {
    const [activeDropdown, setActiveDropdown] = useState<"biz" | "store" | "notif" | "profile" | null>(null);
    const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
    const [isAddStoreOpen, setIsAddStoreOpen] = useState(false);

    const toggleDropdown = (dropdown: "biz" | "store" | "notif" | "profile") => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const closeAll = () => {
        setActiveDropdown(null);
    };

    const iconStyle = { strokeWidth: "2.5" };

    const activeStoreName = availableStores?.find((s: Store) => s.id === activeStoreId)?.name || "Select Store";

    return (
        <>
    
            {/* --- GLOBAL OVERLAY TO CLOSE DROPDOWNS --- */}
            {activeDropdown && (
                <Box position="fixed" inset={0} zIndex={40} onClick={closeAll} />
            )}

            <Flex as="header" position="sticky" top={0} zIndex={100} justify="space-between" align="center" wrap="nowrap" w="full" bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)" px={{ base: 3, md: 8 }} h="80px"  gap={{ base: 2, md: 4 }}>
                
                
                <Flex align="center" gap={4}>
                    {/* --- BREADCRUMB NAVIGATION --- */}
                    <Flex align="center" gap={2} px={3} py={1.5} bg="transparent" rounded="none">
                        
                        {/* BUSINESS BREADCRUMB */}
                        <Box position="relative">
                            <Flex onClick={() => toggleDropdown("biz")} align="center" gap={2} cursor="pointer" color="#888888" _hover={{ color: "white" }} transition="all 0.2s" px={2} py={1} rounded="md">
                               
                                <Icon as={LuBuilding2} boxSize="16px" css={iconStyle} />
                                <Text fontSize="13px" fontWeight="500" lineClamp={1} color="white">
                                    {activeBusiness?.name || "Select Business"}
                                </Text>
                                <Icon as={LuChevronDown} boxSize="14px" transition="transform 0.2s" transform={activeDropdown === "biz" ? "rotate(180deg)" : "none"} css={iconStyle} />
                            </Flex>
                            
                            {activeDropdown === "biz" && (
                                <Box position="absolute" top="100%" left={0} mt={2} w="260px" bg="#111111" border="1px solid #333333" rounded="md" shadow="2xl" zIndex={50} overflow="hidden">
                                    <Box maxH="250px" overflowY="auto" py={1} css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: '#27272A', borderRadius: '4px' } }}>
                                        {businesses?.map((biz) => (
                                            <Flex key={biz.id} onClick={() => { onBusinessChange(biz.id); closeAll(); }} align="center" justify="space-between" px={3} py={2} cursor="pointer" _hover={{ bg: "#1A1A1A" }}>
                                                <Text fontSize="13px" color={biz.id === activeBusiness?.id ? "white" : "#888888"} fontWeight={biz.id === activeBusiness?.id ? "500" : "400"}>{biz.name}</Text>
                                                {biz.id === activeBusiness?.id && <Icon as={LuCheck} color="white" css={iconStyle} boxSize="14px" />}
                                            </Flex>
                                        ))}
                                        {(!businesses || businesses.length === 0) && (
                                            <Text fontSize="12px" color="#666666" px={3} py={2}>No businesses found.</Text>
                                        )}
                                    </Box>
                                    
                                    <Box borderTop="1px solid #27272A" p={1} bg="#0A0A0A">
                                        <Flex onClick={() => { setIsOnboardingOpen(true); closeAll(); }} align="center" gap={2} px={2} py={2} cursor="pointer" color="#888888" rounded="sm" _hover={{ bg: "#1A1A1A", color: "white" }} transition="all 0.2s">
                                            <Icon as={LuPlus} boxSize="14px" css={iconStyle} />
                                            <Text fontSize="13px" fontWeight="500">New business</Text>
                                        </Flex>
                                    </Box>
                                </Box>
                            )}
                        </Box>

                        <Text color="#333333" userSelect="none" fontSize="16px" fontWeight="300" transform="rotate(15deg)">/</Text>

                        {/* STORE BREADCRUMB */}
                        <Box position="relative">
                            <Flex onClick={() => toggleDropdown("store")} align="center" gap={2} cursor="pointer" color="#888888" _hover={{ color: "white" }} transition="all 0.2s" px={2} py={1} rounded="md">
                                
                                <Icon as={LuStore} boxSize="16px" css={iconStyle} />
                                <Text fontSize="13px" fontWeight="500" lineClamp={1} color="white">
                                    {activeStoreName}
                                </Text>
                                <Icon as={LuChevronDown} boxSize="14px" transition="transform 0.2s" transform={activeDropdown === "store" ? "rotate(180deg)" : "none"} css={iconStyle} />
                            </Flex>
                            
                            {activeDropdown === "store" && (
                                <Box position="absolute" top="100%" left={0} mt={2} w="260px" bg="#111111" border="1px solid #333333" rounded="md" shadow="2xl" zIndex={50} overflow="hidden">
                                    <Box maxH="250px" overflowY="auto" py={1} css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: '#27272A', borderRadius: '4px' } }}>
                                        {availableStores?.map((s: Store) => (
                                            <Flex key={s.id} onClick={() => { onStoreChange?.(s.id); closeAll(); }} align="center" justify="space-between" px={3} py={2} cursor="pointer" _hover={{ bg: "#1A1A1A" }}>
                                                <Text fontSize="13px" color={s.id === activeStoreId ? "white" : "#888888"} fontWeight={s.id === activeStoreId ? "500" : "400"}>{s.name}</Text>
                                                {s.id === activeStoreId && <Icon as={LuCheck} color="white" css={iconStyle} boxSize="14px" />}
                                            </Flex>
                                        ))}
                                        {(!availableStores || availableStores.length === 0) && (
                                            <Text fontSize="12px" color="#666666" px={3} py={2}>No stores found.</Text>
                                        )}
                                    </Box>

                                    <Box borderTop="1px solid #27272A" p={1} bg="#0A0A0A">
                                        <Flex onClick={() => { setIsAddStoreOpen(true); closeAll(); }} align="center" gap={2} px={2} py={2} cursor="pointer" color="#888888" rounded="sm" _hover={{ bg: "#1A1A1A", color: "white" }} transition="all 0.2s">
                                            <Icon as={LuPlus} boxSize="14px" css={iconStyle} />
                                            <Text fontSize="13px" fontWeight="500">New store</Text>
                                        </Flex>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Flex>
                </Flex>

                {/* Right Side: Notification & Avatar */}
                <Flex gap={4} align="center" ml="auto">
                    {/* --- NOTIFICATIONS DROPDOWN --- */}
                    <Box position="relative">
                        <Box position="relative" cursor="pointer" onClick={() => toggleDropdown("notif")}>
                            <Icon as={LuBell} color="#888888" boxSize="20px" _hover={{ color: "white" }} transition="color 0.2s" mt={1} css={iconStyle} />
                           
                            <Box position="absolute" top="2px" right="-2px" boxSize="8px" bg="red.500" rounded="full" border="2px solid #000000" />
                        </Box>

                        {activeDropdown === "notif" && (
                            <Box position="absolute" top="100%" right={0} mt={4} w="320px" bg="#0A0A0A" border="1px solid #1A1A1A" rounded="md" shadow="2xl" zIndex={50} overflow="hidden">
                                <Flex px={4} py={3} justify="space-between" align="center" borderBottom="1px solid #1A1A1A" bg="#111111">
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
                                </Box>
                                <Box p={2}>
                                    <Button w="full" bg="#111111" color="white" rounded="sm" fontWeight="500" fontSize="12px" size="sm" _hover={{ bg: "#1A1A1A" }}>
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
                                <Avatar.Root size="sm" border="1px solid" borderColor={activeDropdown === "profile" ? "white" : "#333333"} transition="all 0.2s" _hover={{ borderColor: "white" }}>
                                    <Avatar.Fallback bg="#1A1A1A" color="white" fontSize="11px" fontWeight="bold">GW</Avatar.Fallback>
                                    <Avatar.Image />
                                </Avatar.Root>
                            </AvatarGroup>
                        </Box>

                        {activeDropdown === "profile" && (
                            <Box position="absolute" top="100%" right={0} mt={4} w="260px" bg="#0A0A0A" border="1px solid #333333" rounded="md" py={2} zIndex={50} shadow="2xl">
                                <Flex px={4} py={3} gap={3} align="center" borderBottom="1px solid #1A1A1A" mb={2}>
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

                                <Flex px={4} py={2.5} align="center" gap={3} cursor="pointer" _hover={{ bg: "#111111", color: "white" }} color="#888888" transition="all 0.2s">
                                    <Icon as={LuImage} boxSize="16px" css={iconStyle} />
                                    <Text fontSize="13px" fontWeight="500">Change Profile Image</Text>
                                </Flex>
                                <Flex px={4} py={2.5} align="center" gap={3} cursor="pointer" _hover={{ bg: "#111111", color: "white" }} color="#888888" transition="all 0.2s">
                                    <Icon as={LuSettings} boxSize="16px" css={iconStyle} />
                                    <Text fontSize="13px" fontWeight="500">Account Settings</Text>
                                </Flex>
                                
                                <Box my={1} borderBottom="1px solid #1A1A1A" />
                                
                                <Flex px={4} py={2.5} align="center" gap={3} cursor="pointer" _hover={{ bg: "rgba(229, 62, 62, 0.1)", color: "red.500" }} color="red.400" transition="all 0.2s">
                                    <Icon as={LuLogOut} boxSize="16px" css={iconStyle} />
                                    <Text fontSize="13px" fontWeight="500">Log Out</Text>
                                </Flex>
                            </Box>
                        )}
                    </Box>
                </Flex>
            </Flex>

            {/* MODALS NOW MOUNTED FROM HEADER */}
            <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />
            <AddStoreModal isOpen={isAddStoreOpen} onClose={() => setIsAddStoreOpen(false)} />
        </>
    );
};
"use client";
import React, { useState } from "react";
import { Flex, Box, Text, Icon, Button, Avatar, AvatarGroup, Breadcrumb, Menu, Portal } from "@chakra-ui/react";
import { 
    LuBell, LuChevronDown, LuCheck, 
    LuImage, LuSettings, LuLogOut, LuShoppingBag,
    LuBuilding2, LuStore 
} from "react-icons/lu";
import { OnboardingModal } from "../onboarding/OnboardingModel"; 
import { AddStoreModal } from "../onboarding/AddStoreModal"; 
import { DashboardHeaderProps, Store } from "@/app/lib/definitions"; 


interface BreadcrumbMenuItemProps {
    children: React.ReactNode;
    items: Array<{ id: string; name: string }>; 
    activeId?: string;
    onSelect: (value: string) => void;
}

const BreadcrumbMenuItem = ({ children, items, activeId, onSelect }: BreadcrumbMenuItemProps) => (
    <Breadcrumb.Item>
        <Menu.Root>
            <Menu.Trigger asChild>{children}</Menu.Trigger>
            <Portal>
                <Menu.Positioner zIndex={100}>
                    <Menu.Content bg="#0A0A0A" border="1px solid #1A1A1A" rounded="none" shadow="2xl" minW="260px" p={0}>
                        <Box maxH="250px" overflowY="auto" py={1} css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: '#1A1A1A', borderRadius: '0px' } }}>
                            {items.map((item) => (
                                <Menu.Item 
                                    key={item.id} 
                                    value={item.id} 
                                    onClick={() => onSelect(item.id)}
                                    px={4} py={3} cursor="pointer" bg="transparent" rounded="none"
                                    color={item.id === activeId ? "white" : "#888888"}
                                    fontWeight={item.id === activeId ? "bold" : "normal"}
                                    _hover={{ bg: "#111111", color: "white" }}
                                >
                                    <Flex justify="space-between" w="full" align="center">
                                        <Text fontSize="13px">{item.name}</Text>
                                        {item.id === activeId && <Icon as={LuCheck} color="white" boxSize="14px" strokeWidth="2.5" />}
                                    </Flex>
                                </Menu.Item>
                            ))}
                            {(!items || items.length === 0) && (
                                <Text fontSize="12px" color="#666666" px={4} py={3}>No items found.</Text>
                            )}
                        </Box>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    </Breadcrumb.Item>
);

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
   
    const [activeDropdown, setActiveDropdown] = useState<"notif" | "profile" | null>(null);
    const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
    const [isAddStoreOpen, setIsAddStoreOpen] = useState(false);

    const toggleDropdown = (dropdown: "notif" | "profile") => {
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

            <Flex w="full" justify="space-between" align="center">
                
                <Breadcrumb.Root>
                    <Breadcrumb.List gap={3}>
                        
                        
                        <BreadcrumbMenuItem 
                            items={businesses || []} 
                            activeId={activeBusiness?.id} 
                            onSelect={(id) => onBusinessChange(id)}
                        >
                            <Flex as="button" align="center" gap={2} cursor="pointer" color="#888888" _hover={{ color: "white" }} transition="all 0.2s" outline="none">
                                <Icon as={LuBuilding2} boxSize="18px" css={iconStyle} />
                                <Text fontSize="sm" fontWeight="300" lineClamp={1} color="white">
                                    {activeBusiness?.name || "Select Business"}
                                </Text>
                                <Icon as={LuChevronDown} boxSize="16px" css={iconStyle} />
                            </Flex>
                        </BreadcrumbMenuItem>

                        <Breadcrumb.Separator color="gray.600" fontSize="xl" display={{ base: "none", md: "block" }}>
                            /
                        </Breadcrumb.Separator>

                        {/* STORE BREADCRUMB */}
                        <BreadcrumbMenuItem 
                            items={availableStores} 
                            activeId={activeStoreId} 
                            onSelect={(id) => onStoreChange?.(id)}
                        >
                            <Flex as="button" align="center" gap={2} cursor="pointer" color="#888888" _hover={{ color: "white" }} transition="all 0.2s" outline="none">
                                <Icon as={LuStore} boxSize="18px" css={iconStyle} />
                                <Text fontSize="sm" fontWeight="300" lineClamp={1} color="white">
                                    {activeStoreName}
                                </Text>
                                <Icon as={LuChevronDown} boxSize="16px" css={iconStyle} />
                            </Flex>
                        </BreadcrumbMenuItem>

                    </Breadcrumb.List>
                </Breadcrumb.Root>

              
                <Flex gap={6} align="center" ml="auto">
                    {/* --- NOTIFICATIONS DROPDOWN --- */}
                    <Box position="relative">
                        <Box position="relative" cursor="pointer" onClick={() => toggleDropdown("notif")}>
                            <Icon as={LuBell} color="white" boxSize="20px" _hover={{ color: "gray.300" }} transition="color 0.2s" mt={1} css={iconStyle} />
                           
                            {/* Alert Badge */}
                            <Box position="absolute" top="2px" right="-2px" boxSize="8px" bg="red.500" rounded="none" border="1px solid #000000" />
                        </Box>

                        {activeDropdown === "notif" && (
                            <Box position="absolute" top="100%" right={0} mt={6} w="320px" bg="#0A0A0A" border="1px solid #1A1A1A" rounded="none" shadow="2xl" zIndex={50} overflow="hidden">
                                <Flex px={4} py={3} justify="space-between" align="center" borderBottom="1px solid #1A1A1A" bg="#111111">
                                    <Text fontSize="13px" fontWeight="bold" color="white">Notifications</Text>
                                    <Text fontSize="12px" color="#888888" cursor="pointer" _hover={{ color: "white" }}>Mark all read</Text>
                                </Flex>
                                
                                <Box maxH="300px" overflowY="auto" css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <Flex px={4} py={4} gap={4} _hover={{ bg: "#111111" }} cursor="pointer" borderBottom="1px solid #1A1A1A">
                                        <Flex align="center" justify="center" boxSize="32px" bg="#1A1A1A" color="white" border="1px solid #333" rounded="none" flexShrink={0}>
                                            <Icon as={LuShoppingBag} boxSize="14px" css={iconStyle} />
                                        </Flex>
                                        <Box>
                                            <Text fontSize="13px" color="white" fontWeight="bold">New order received!</Text>
                                            <Text fontSize="12px" color="#888888" mt={1}>Order #POS-8829 needs fulfillment.</Text>
                                            <Text fontSize="10px" color="#555555" mt={2} fontWeight="bold">10 MINS AGO</Text>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Box p={3}>
                                    <Button w="full" bg="#1A1A1A" color="white" rounded="none" border="1px solid #333" fontWeight="bold" fontSize="12px" size="sm" _hover={{ bg: "#333333" }}>
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
                                <Avatar.Root size="sm" border="1px solid" rounded="full" borderColor={activeDropdown === "profile" ? "white" : "#333333"} transition="all 0.2s" _hover={{ borderColor: "white" }}>
                                    <Avatar.Fallback bg="#1A1A1A" rounded="full" color="white" fontSize="11px" fontWeight="bold">GW</Avatar.Fallback>
                                    <Avatar.Image />
                                </Avatar.Root>
                            </AvatarGroup>
                        </Box>

                        {activeDropdown === "profile" && (
                            <Box position="absolute" top="100%" right={0} mt={6} w="260px" bg="#0A0A0A" border="1px solid #1A1A1A" rounded="none" py={2} zIndex={50} shadow="2xl">
                                <Flex px={4} py={3} gap={4} align="center" borderBottom="1px solid #1A1A1A" mb={2}>
                                    <AvatarGroup>
                                        <Avatar.Root size="md" rounded="full" border="1px solid #333333">
                                            <Avatar.Fallback bg="#1A1A1A" rounded="full" color="white" fontSize="13px" fontWeight="bold">GW</Avatar.Fallback>
                                            <Avatar.Image />
                                        </Avatar.Root>
                                    </AvatarGroup>
                                    <Box overflow="hidden">
                                        <Text fontSize="13px" fontWeight="bold" color="white" lineClamp={1}>Wada Gift</Text>
                                        <Text fontSize="12px" color="#888888" lineClamp={1}>gift.wada@yahoo.com</Text>
                                    </Box>
                                </Flex>

                                <Flex px={4} py={3} align="center" gap={3} cursor="pointer" _hover={{ bg: "#111111", color: "white" }} color="#888888" transition="all 0.2s">
                                    <Icon as={LuImage} boxSize="16px" css={iconStyle} />
                                    <Text fontSize="13px" fontWeight="bold">Change Profile Image</Text>
                                </Flex>
                                <Flex px={4} py={3} align="center" gap={3} cursor="pointer" _hover={{ bg: "#111111", color: "white" }} color="#888888" transition="all 0.2s">
                                    <Icon as={LuSettings} boxSize="16px" css={iconStyle} />
                                    <Text fontSize="13px" fontWeight="bold">Account Settings</Text>
                                </Flex>
                                
                                <Box my={2} borderBottom="1px solid #1A1A1A" />
                                
                                <Flex px={4} py={3} align="center" gap={3} cursor="pointer" _hover={{ bg: "#111111", color: "red.500" }} color="red.400" transition="all 0.2s">
                                    <Icon as={LuLogOut} boxSize="16px" css={iconStyle} />
                                    <Text fontSize="13px" fontWeight="bold">Log Out</Text>
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
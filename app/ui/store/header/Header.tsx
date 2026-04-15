"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { 
    Flex, Box, Input, IconButton, Icon, Text, Badge, Avatar  
} from "@chakra-ui/react";
import { 
    LuSearch, LuBell, LuChevronDown, LuMenu,
    LuLogOut, LuPackage, LuSettings, LuLayoutGrid, LuShoppingCart,
    LuCircleCheck
} from "react-icons/lu"; 
import Link from "next/link";
import { HeaderProps } from "@/app/lib/definitions";

import { CustomerSidebar } from "@/app/ui/store/navigation/CustomerSidebar"; 


export const Header = ({ 
    brandColor = "#5cac7d", 
    storeName = "TRADAZ." 
}: HeaderProps) => {
    
    const pathname = usePathname();
    const router = useRouter();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false); 
    const [isNotifOpen, setIsNotifOpen] = useState(false); 
    
    const categories = ["Categories", "Foot Wears", "Sport Wears", "Accessories", "Bags"];

    return (
        <Flex 
            as="header" h="70px" bg="#121212" borderBottom="1px solid" borderColor="whiteAlpha.100"
            align="center" justify="space-between" px={{ base: 4, lg: 8 }} 
            position="sticky" top={0} zIndex={90} shadow="sm" w="full"
        >
            
            {/* Mobile Logo & Categories */}
            <Flex align="center" gap={3} display={{ base: "flex", lg: "none" }}>
                <Box position="relative" w="40px" h="40px">
                    <Flex align="center" justify="center" w="full" h="full" rounded="md" color="gray.400" _hover={{ bg: "whiteAlpha.100" }} cursor="pointer">
                        <Icon as={LuLayoutGrid} boxSize="22px" />
                    </Flex>
                    <Box as="select" position="absolute" top={0} left={0} w="full" h="full" opacity={0} cursor="pointer">
                        {categories.map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                        ))}
                    </Box>
                </Box>

                <Flex align="center" gap={2}>
                    <Box boxSize="24px" bg={brandColor} rounded="md" />
                    <Text fontSize="lg" fontWeight="black" color="white" letterSpacing="tight">
                        {storeName}
                    </Text>
                </Flex>
            </Flex>

            {/* Desktop Logo, Search & Categories */}
            <Flex flex={1} display={{ base: "none", lg: "flex" }} align="center" gap={8}>
                <Link href="/store" style={{ textDecoration: "none" }}>
                    <Flex align="center" gap={3} cursor="pointer" transition="all 0.2s" _hover={{ opacity: 0.8 }}>
                        <Avatar.Root size="md">
                            <Avatar.Fallback name={storeName} bg={brandColor} color="white" fontWeight="bold" />
                        </Avatar.Root>
                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">
                            {storeName}
                        </Text>
                    </Flex>
                </Link>

                {/* Search Bar */}
                <Flex 
                    flex={1} maxW="600px" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.200" 
                    rounded="full" overflow="hidden" align="center"
                    _focusWithin={{ borderColor: brandColor }} transition="all 0.2s"
                >
                    <Box 
                        as="select" bg="whiteAlpha.50" h="40px" px={4} 
                        border="none" borderRight="1px solid" borderColor="whiteAlpha.200" 
                        fontSize="sm" color="white" outline="none" cursor="pointer" 
                        _hover={{ bg: "whiteAlpha.100" }}
                    >
                        {categories.map((cat, i) => (
                            <option key={i} value={cat} style={{ background: "#1A1C23", color: "white" }}>{cat}</option>
                        ))}
                    </Box>

                    <Flex align="center" px={3} flex={1}>
                        <Icon as={LuSearch} color="gray.400" />
                        <Input 
                            placeholder="Search products, brands, or SKUs..." 
                            border="none" bg="transparent" h="40px" px={3} w="full" color="white"
                            _focus={{ outline: "none", boxShadow: "none" }} fontSize="sm"
                            _placeholder={{ color: "gray.500" }}
                        />
                    </Flex>
                </Flex>
            </Flex>

            {/* Right Side Actions */}
            <Flex align="center" gap={{ base: 2, md: 4 }}>
                
                {/* Mobile Search Icon */}
                <IconButton aria-label="Search" variant="ghost" color="gray.400" rounded="full" display={{ base: "flex", lg: "none" }}>
                    <Icon as={LuSearch} boxSize="20px" />
                </IconButton>

                {/* Cart */}
                <Box position="relative" display={{ base: "none", lg: "block" }}>
                    <Flex 
                        as="button" 
                        onClick={() => router.push("/store/cart")}
                        align="center" justify="center" 
                        boxSize="40px" rounded="full" 
                        color="gray.400" _hover={{ bg: "whiteAlpha.100", color: "white" }} 
                        transition="all 0.2s" cursor="pointer"
                        border="none" bg="transparent" outline="none" 
                        position="relative" zIndex={10}
                    >
                        <Icon as={LuShoppingCart} boxSize="20px" pointerEvents="none" />
                    </Flex>
                    <Badge 
                        position="absolute" top="0px" right="0px" zIndex={11}
                        bg={brandColor} color="white" rounded="full" 
                        minW="18px" h="18px" 
                        display="flex" alignItems="center" justifyContent="center"
                        fontSize="10px" fontWeight="bold" border="2px solid #121212"
                        pointerEvents="none" 
                    >
                        2
                    </Badge>
                </Box>

                {/* Notifications */}
                <Box position="relative" display={{ base: "none", lg: "block" }}>
                    <Flex 
                        as="button" 
                        onClick={() => {
                            setIsNotifOpen(!isNotifOpen);
                            setIsProfileOpen(false); 
                            setIsNavOpen(false); 
                        }}
                        align="center" justify="center" 
                        boxSize="40px" rounded="full" 
                        color="gray.400" _hover={{ bg: "whiteAlpha.100", color: "white" }} 
                        transition="all 0.2s" cursor="pointer"
                        border="none" bg="transparent" outline="none"
                        position="relative" zIndex={10}
                    >
                        <Icon as={LuBell} boxSize="20px" pointerEvents="none" />
                    </Flex>
                    <Badge 
                        position="absolute" top="0px" right="0px" zIndex={11}
                        bg="red.500" color="white" rounded="full" 
                        minW="18px" h="18px" 
                        display="flex" alignItems="center" justifyContent="center"
                        fontSize="10px" fontWeight="bold" border="2px solid #121212"
                        pointerEvents="none" 
                    >
                        5
                    </Badge>

                    {/* Notification Dropdown Panel */}
                    {isNotifOpen && (
                        <>
                            <Box position="fixed" inset={0} zIndex={99} onClick={(e) => { e.stopPropagation(); setIsNotifOpen(false); }} cursor="default" />
                            <Box position="absolute" right={0} top="100%" mt={2} bg="white" shadow="xl" rounded="xl" border="1px solid" borderColor="gray.100" minW="320px" py={2} zIndex={100} cursor="default" onClick={(e) => e.stopPropagation()}>
                                <Box px={4} py={3} borderBottom="1px solid" borderColor="gray.100">
                                    <Text fontSize="sm" fontWeight="bold" color="gray.900">Notifications</Text>
                                </Box>
                                
                                <Flex direction="column" maxH="300px" overflowY="auto">
                                    <Flex align="start" gap={3} px={4} py={3} _hover={{ bg: "gray.50" }} cursor="pointer" borderBottom="1px solid" borderColor="gray.50">
                                        <Flex bg="rgba(92, 172, 125, 0.15)" p={2} rounded="full" color={brandColor} flexShrink={0}>
                                            <Icon as={LuPackage} />
                                        </Flex>
                                        <Box>
                                            <Text fontSize="sm" fontWeight="bold" color="gray.800">New Order Placed</Text>
                                            <Text fontSize="xs" color="gray.600" mt={0.5}>Order #1024 has been placed successfully.</Text>
                                            <Text fontSize="xs" color="gray.400" mt={1}>2 mins ago</Text>
                                        </Box>
                                    </Flex>
                                    
                                    <Flex align="start" gap={3} px={4} py={3} _hover={{ bg: "gray.50" }} cursor="pointer">
                                        <Flex bg="rgba(66, 153, 225, 0.15)" p={2} rounded="full" color="blue.500" flexShrink={0}>
                                            <Icon as={LuCircleCheck} />
                                        </Flex>
                                        <Box>
                                            <Text fontSize="sm" fontWeight="bold" color="gray.800">Payment Verified</Text>
                                            <Text fontSize="xs" color="gray.600" mt={0.5}>Payment for Order #1023 was verified.</Text>
                                            <Text fontSize="xs" color="gray.400" mt={1}>1 hour ago</Text>
                                        </Box>
                                    </Flex>
                                </Flex>

                                <Box px={4} pt={3} pb={1} borderTop="1px solid" borderColor="gray.100" textAlign="center">
                                    <Text fontSize="xs" fontWeight="bold" color={brandColor} cursor="pointer" _hover={{ textDecoration: "underline" }}>
                                        View all notifications
                                    </Text>
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>

               

                {/* Profile Dropdown */}
                <Box position="relative">
                    <Flex 
                        align="center" gap={2} p={1} rounded="full" 
                        _hover={{ bg: "whiteAlpha.50" }} transition="all 0.2s" cursor="pointer"
                        onClick={() => {
                            setIsProfileOpen(!isProfileOpen);
                            setIsNavOpen(false); 
                            setIsNotifOpen(false); 
                        }}
                    >
                        <Flex justify="center" align="center" boxSize="32px" bg={brandColor} color="white" rounded="full" fontWeight="bold" fontSize="sm">
                            <Avatar.Root size="sm">
                                <Avatar.Fallback name="Wada Gift" bg={brandColor} color="white" />
                                <Avatar.Image src="https://bit.ly/sage-adebayo" /> 
                            </Avatar.Root>
                        </Flex>
                        <Icon as={LuChevronDown} color="gray.400" display={{ base: "none", md: "block" }} />
                    </Flex>

                    {isProfileOpen && (
                        <>
                            <Box position="fixed" inset={0} zIndex={99} onClick={() => setIsProfileOpen(false)} />
                            <Box position="absolute" right={0} top="100%" mt={2} bg="white" shadow="xl" rounded="xl" border="1px solid" borderColor="gray.100" minW="220px" py={2} zIndex={100}>
                                <Box px={4} py={3} mb={1} bg="gray.50" borderBottom="1px solid" borderColor="gray.100">
                                    <Text fontSize="sm" fontWeight="bold" color="gray.900">Wada Gift</Text>
                                    <Text fontSize="xs" color="gray.500">wada.gift@example.com</Text>
                                </Box>
                                <Link href="/account/orders" style={{ textDecoration: "none" }} onClick={() => setIsProfileOpen(false)}>
                                    <Flex align="center" gap={3} px={4} py={2} _hover={{ bg: "gray.50", color: brandColor }} color="gray.700" cursor="pointer" transition="all 0.2s">
                                        <Icon as={LuPackage} fontSize="lg" />
                                        <Text fontSize="sm" fontWeight="medium">My Orders</Text>
                                    </Flex>
                                </Link>
                                <Link href="/account/settings" style={{ textDecoration: "none" }} onClick={() => setIsProfileOpen(false)}>
                                    <Flex align="center" gap={3} px={4} py={2} _hover={{ bg: "gray.50", color: brandColor }} color="gray.700" cursor="pointer" transition="all 0.2s">
                                        <Icon as={LuSettings} fontSize="lg" />
                                        <Text fontSize="sm" fontWeight="medium">Account Settings</Text>
                                    </Flex>
                                </Link>
                                <Box my={2} borderTop="1px solid" borderColor="gray.100" />
                                <Flex align="center" gap={3} px={4} py={2} _hover={{ bg: "red.50" }} color="red.500" cursor="pointer" transition="all 0.2s" onClick={() => setIsProfileOpen(false)}>
                                    <Icon as={LuLogOut} fontSize="lg" />
                                    <Text fontSize="sm" fontWeight="medium">Log Out</Text>
                                </Flex>
                            </Box>
                        </>
                    )}
                </Box>

                {/* Desktop Navigation Dropdown */}
                <Box position="relative" display={{ base: "none", lg: "block" }}>
                    <IconButton 
                        aria-label="Store Menu" variant="ghost" color="gray.400" rounded="full" _hover={{ bg: "whiteAlpha.100", color: "white" }}
                        onClick={() => {
                            setIsNavOpen(!isNavOpen);
                            setIsProfileOpen(false); 
                            setIsNotifOpen(false); 
                        }}
                    >
                        <Icon as={LuMenu} boxSize="22px" />
                    </IconButton>

                    {isNavOpen && (
                        <>
                            <Box position="fixed" inset={0} zIndex={99} onClick={() => setIsNavOpen(false)} />
                            
                            <Box 
                                position="absolute" right={0} top="100%" mt={3} 
                                bg="#1A1C23" shadow="2xl" rounded="xl" border="1px solid" borderColor="whiteAlpha.100" 
                                minW="260px" overflow="hidden" zIndex={100} animation="fade-in 0.2s ease"
                            >
                                <Box maxH="calc(100vh - 100px)" overflowY="auto" css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <CustomerSidebar 
                                        activePath={pathname || ""}
                                        brandColor={brandColor}
                                        storeName={storeName}
                                    />
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>

            </Flex>
        </Flex>
    );
};
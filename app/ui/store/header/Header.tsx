"use client";
import React, { useState } from "react";
import { 
    Flex, Box, Input, IconButton, Icon, Text, Badge 
} from "@chakra-ui/react";
import { 
    LuSearch, LuBell, LuChevronDown, 
    LuLogOut, LuPackage, LuSettings, LuLayoutGrid, LuShoppingCart
} from "react-icons/lu"; 
import Link from "next/link";
import { HeaderProps } from "@/app/lib/definitions";

export const Header = ({ 
    brandColor = "#5cac7d", 
    storeName = "TRADAZ." 
}: HeaderProps) => {
    
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const categories = ["Categories", "Foot Wears", "Sport Wears", "Accessories", "Bags"];

    return (
        <Flex 
            as="header" h="70px" bg="#121212" borderBottom="1px solid" borderColor="whiteAlpha.100"
            align="center" justify="space-between" px={{ base: 4, lg: 8 }} 
            position="sticky" top={0} zIndex={90} shadow="sm" w="full"
        >
            
            
            {/* Mobile Logo & Categories        */}
         
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

        
    
            {/* Desktop Search & Categories        */}
           
            <Flex flex={1} maxW="600px" display={{ base: "none", lg: "flex" }} align="center">
                <Flex 
                    w="full" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.200" 
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

            
            <Flex align="center" gap={{ base: 2, md: 4 }}>
                
                {/* Mobile Search Icon */}
                <IconButton aria-label="Search" variant="ghost" color="gray.400" rounded="full" display={{ base: "flex", lg: "none" }}>
                    <Icon as={LuSearch} boxSize="20px" />
                </IconButton>

    
                <Box position="relative" cursor="pointer" display={{ base: "none", lg: "block" }}>
                    <Link href="/store/cart">
                        <IconButton aria-label="Cart" variant="ghost" color="gray.400" rounded="full" _hover={{ bg: "whiteAlpha.100" }}>
                            <Icon as={LuShoppingCart} boxSize="20px" />
                        </IconButton>
                        <Badge 
                            position="absolute" top="2px" right="2px" 
                            bg={brandColor} color="white" rounded="full" 
                            minW="18px" h="18px" 
                            display="flex" alignItems="center" justifyContent="center"
                            fontSize="10px" fontWeight="bold" border="2px solid #121212"
                        >
                            2
                        </Badge>
                    </Link>
                </Box>

                
                <Box position="relative" cursor="pointer">
                    <IconButton aria-label="Notifications" variant="ghost" color="gray.400" rounded="full" _hover={{ bg: "whiteAlpha.100" }}>
                        <Icon as={LuBell} boxSize="20px" />
                    </IconButton>
                    <Badge 
                        position="absolute" top="2px" right="2px" 
                        bg="red.500" color="white" rounded="full" 
                        minW="18px" h="18px" 
                        display="flex" alignItems="center" justifyContent="center"
                        fontSize="10px" fontWeight="bold" border="2px solid #121212"
                    >
                        5
                    </Badge>
                </Box>

                {/* Profile Dropdown */}
                <Box position="relative">
                    <Flex 
                        align="center" gap={2} p={1} rounded="full" 
                        _hover={{ bg: "whiteAlpha.50" }} transition="all 0.2s" cursor="pointer"
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                        <Flex justify="center" align="center" boxSize="32px" bg={brandColor} color="white" rounded="full" fontWeight="bold" fontSize="sm">
                            W
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
            </Flex>
            
        </Flex>
    );
};
"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, Image } from "@chakra-ui/react";
import { 
    LuSearch, LuFilter, LuStar, LuPrinter, 
    LuPackagePlus, LuPencil, LuTrash2, LuLoaderCircle, LuChevronDown 
} from "react-icons/lu";

import { generateDummyInventory } from "@/app/lib/data";
import { InventoryProduct } from "@/app/lib/definitions";

export const InventoryOverview = () => {
    const TOTAL_PRODUCTS = 100;
    const ITEMS_PER_PAGE = 9; 
    
    const [inventory, setInventory] = useState<InventoryProduct[]>(generateDummyInventory(ITEMS_PER_PAGE, 0));
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Infinite scroll
    const handleLoadMore = () => {
        if (inventory.length >= TOTAL_PRODUCTS) return;
        
        setIsLoadingMore(true);
        setTimeout(() => {
            setInventory((prev) => [
                ...prev, 
                ...generateDummyInventory(ITEMS_PER_PAGE, prev.length)
            ]);
            setIsLoadingMore(false);
        }, 800);
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* --- Header & Toolbar --- */}
            <Box 
                position="sticky" 
                top={{ base: "70px", md: "85px" }} 
                zIndex={20} 
                bg="rgba(11, 13, 20, 0.85)" 
                backdropFilter="blur(12px)"
                py={4}
                mb={6}
                mx={-4} px={4} 
            >
                
                <Flex justify="space-between" align={{ base: "flex-start", lg: "flex-end" }} wrap="wrap" gap={4}>
                    <Box w={{ base: "full", lg: "auto" }}>
                        <Text color="#5cac7d" fontWeight="bold" fontSize="2xl" mb={1}>Inventory</Text>
                        <Text color="gray.400" fontSize="sm">
                            Showing <Text as="span" color="white" fontWeight="bold">{inventory.length}</Text> of <Text as="span" color="white" fontWeight="bold">{TOTAL_PRODUCTS}</Text> products
                        </Text>
                    </Box>
                    
                    
                    <Flex 
                        direction={{ base: "column", md: "row" }} 
                        gap={3} 
                        w={{ base: "full", lg: "auto" }}
                    >
                        {/* Search Bar */}
                        <Flex w="full" minW={{ md: "300px" }} align="center" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" px={3} _focusWithin={{ borderColor: "#5cac7d" }}>
                            <Icon as={LuSearch} color="gray.400" />
                            <Input placeholder="Search products..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="40px" />
                        </Flex>
                        
                        {/* Filter & Sort Buttons */}
                        <Flex gap={3} w="full">
                            <Button flex={1} variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }} h="40px" bg="#121214">
                                <Icon as={LuFilter} mr={2} /> Filters
                            </Button>
                            
                            <Button flex={1} variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }} h="40px" bg="#121214">
                                Sort <Icon as={LuChevronDown} ml={2} />
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>

            {/* --- Inventory Grid --- */}
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={8} mb={8}>
                {inventory.map((product) => (
                    <Box key={product.id} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden" _hover={{ borderColor: "whiteAlpha.300", shadow: "lg" }} transition="all 0.2s">
                        
                        {/* Image Area with Badges */}
                        <Box position="relative" h="280px" w="full" bg="#121214">
                            <Image src={product.image} alt={product.name} w="full" h="full" objectFit="cover" opacity={0.9} />
                            
                            {/* Featured Badge */}
                            {product.isFeatured && (
                                <Box position="absolute" top={3} right={3} bg="blackAlpha.800" color="white" fontSize="xs" fontWeight="bold" px={2} py={1} rounded="md" backdropFilter="blur(4px)">
                                    Featured
                                </Box>
                            )}
                        </Box>

                        {/* Product Details Area */}
                        <Box p={5}>
                            <Flex justify="space-between" align="start" mb={4}>
                                <Text color="white" fontWeight="bold" fontSize="lg" lineClamp={1} flex={1} pr={2}>
                                    {product.name}
                                </Text>
                                <Icon 
                                    as={LuStar} 
                                    color={product.isFavorite ? "orange.400" : "gray.600"} 
                                    fill={product.isFavorite ? "orange.400" : "transparent"} 
                                    boxSize="18px" 
                                    cursor="pointer" 
                                />
                            </Flex>
                            
                            <Flex justify="space-between" align="center" mb={3}>
                                <Text color="gray.400" fontSize="xs">SKU: <Text as="span" color="gray.300">{product.sku}</Text></Text>
                                <Icon as={LuPrinter} color="blue.400" cursor="pointer" _hover={{ color: "blue.300" }} boxSize="14px" />
                            </Flex>

                            <Text color="gray.400" fontSize="xs" mb={1}>Variations: <Text as="span" color="gray.300">{product.variations} variants</Text></Text>
                            <Text color="gray.400" fontSize="xs" mb={4}>Stock: <Text as="span" color={product.stock < 5 ? "red.400" : "gray.300"} fontWeight={product.stock < 5 ? "bold" : "normal"}>{product.stock} units</Text></Text>
                            
                            <Text color="white" fontWeight="bold" fontSize="lg" mb={5}>₦{product.price.toLocaleString()}</Text>

                            {/* --- Action Btns --- */}
                            <Flex gap={3}>
                                <Button flex={1} size="sm" bg="rgba(92, 172, 125, 0.15)" color="#5cac7d" _hover={{ bg: "rgba(92, 172, 125, 0.25)" }} border="none" fontSize="xs" px={0} transition="all 0.2s">
                                    <Icon as={LuPackagePlus} mr={1.5} boxSize="14px" /> Restock
                                </Button>
                                <Button flex={1} size="sm" bg="rgba(66, 153, 225, 0.15)" color="blue.300" _hover={{ bg: "rgba(66, 153, 225, 0.25)" }} border="none" fontSize="xs" px={0} transition="all 0.2s">
                                    <Icon as={LuPencil} mr={1.5} boxSize="14px" /> Edit
                                </Button>
                                <Button flex={1} size="sm" bg="rgba(245, 101, 101, 0.15)" color="red.400" _hover={{ bg: "rgba(245, 101, 101, 0.25)" }} border="none" fontSize="xs" px={0} transition="all 0.2s">
                                    <Icon as={LuTrash2} mr={1.5} boxSize="14px" /> Delete
                                </Button>
                            </Flex>
                        </Box>
                    </Box>
                ))}
            </SimpleGrid>

            {/* --- Load More Trigger --- */}
            {inventory.length < TOTAL_PRODUCTS && (
                <Flex justify="center" py={4} mb={8}>
                    <Button 
                        onClick={handleLoadMore} 
                        disabled={isLoadingMore} 
                        bg="whiteAlpha.100" 
                        color="white" 
                        border="1px solid" 
                        borderColor="whiteAlpha.200"
                        _hover={{ bg: "whiteAlpha.200" }} 
                        px={8}
                    >
                        {isLoadingMore ? <Icon as={LuLoaderCircle} animation="spin 1s linear infinite" /> : "Load More Products"}
                    </Button>
                </Flex>
            )}

        </Box>
    );
};
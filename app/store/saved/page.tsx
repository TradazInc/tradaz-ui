"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Image, Grid, Button, Icon, IconButton, Badge 
} from "@chakra-ui/react";
import { 
    LuHeart, LuShoppingCart, LuTrash2, LuStar
} from "react-icons/lu";
import Link from "next/link";

import { STORE_PRODUCTS } from "@/app/lib/data";

export default function SavedItemsPage() {
    const brandColor = "#5cac7d";
    

    // Simulating the user's saved items by taking a slice of the dummy products.
    // Later, i will swap this with  GET /api/wishlist
    const [savedItems, setSavedItems] = useState(STORE_PRODUCTS.slice(0, 5));

    // --- LOGIC HANDLERS ---
    const handleRemove = (id: string) => {
        // DELETE /api/wishlist/:id goes here
        setSavedItems(prev => prev.filter(item => item.id !== id));
    };

   const handleAddToCart = (item: typeof STORE_PRODUCTS[0]) => {
        // POST /api/cart goes here. 
        
        alert(`${item.name} has been moved to your cart!`);
    };

    // --- EMPTY STATE ---
    if (savedItems.length === 0) {
        return (
            <Box p={{ base: 4, lg: 8 }} maxW="1200px" mx="auto" minH="70vh" display="flex" alignItems="center" justifyContent="center">
                <Flex direction="column" align="center" justify="center" color="gray.500" gap={4} animation="fade-in 0.4s ease">
                    <Icon as={LuHeart} boxSize="80px" opacity={0.2} mb={4} />
                    <Text fontSize="2xl" fontWeight="black" color="white">Your Wishlist is Empty</Text>
                    <Text fontSize="md" textAlign="center" maxW="sm">
                        You haven&apos;t saved any items yet. Found something you like? Tap the heart icon to save it for later.
                    </Text>
                    <Link href="/store" style={{ textDecoration: 'none' }}>
                        <Button mt={6} px={8} h="50px" rounded="full" bg={brandColor} color="white" _hover={{ filter: "brightness(1.1)", transform: "translateY(-2px)" }} transition="all 0.2s">
                            Explore Products
                        </Button>
                    </Link>
                </Flex>
            </Box>
        );
    }

    // --- POPULATED STATE ---
    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1200px" mx="auto" animation="fade-in 0.3s ease">
            
            {/* Header Area */}
            <Flex align="center" justify="space-between" mb={8} wrap="wrap" gap={4}>
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight">
                        Saved Items
                    </Text>
                    <Text color="gray.400" fontSize="sm">{savedItems.length} items waiting for you</Text>
                </Box>
                <Link href="/store" style={{ textDecoration: 'none' }}>
                    <Button variant="outline" color="white" borderColor="whiteAlpha.200" _hover={{ bg: "whiteAlpha.100" }} px={6}>
                        Continue Shopping
                    </Button>
                </Link>
            </Flex>

            {/* The Grid */}
            <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gap={{ base: 4, lg: 6 }}>
                {savedItems.map((product, index) => (
                    <Box 
                        key={`saved-${product.id}-${index}`} 
                        role="group" bg="#1A1C23" p={3} rounded="2xl" 
                        border="1px solid" borderColor="whiteAlpha.100" 
                        transition="all 0.2s" _hover={{ borderColor: brandColor, transform: "translateY(-4px)", shadow: "xl" }}
                    >
                        {/* Image Container */}
                        <Box position="relative" rounded="xl" overflow="hidden" bg="#121212" mb={4} aspectRatio={1}>
                            <Badge position="absolute" top={2} left={2} bg="blackAlpha.800" color="white" rounded="sm" px={2} py={0.5} fontSize="9px" fontWeight="bold" zIndex={10} backdropFilter="blur(4px)">
                                {product.isNew ? "NEW" : "POPULAR"}
                            </Badge>
                            
                            {/* Remove from Wishlist Button */}
                            <IconButton 
                                position="absolute" top={2} right={2} zIndex={10}
                                aria-label="Remove from wishlist" size="sm" rounded="full" 
                                bg="blackAlpha.600" color="white" backdropFilter="blur(4px)" 
                                _hover={{ bg: "red.500", color: "white" }} transition="all 0.2s"
                                onClick={() => handleRemove(product.id)}
                            >
                                <Icon as={LuTrash2} boxSize="14px" />
                            </IconButton>

                            <Image src={product.image} alt={product.name} w="full" h="full" objectFit="cover" transition="transform 0.6s ease" _groupHover={{ transform: "scale(1.08)" }} />
                        </Box>
                        
                        {/* Information Layout */}
                        <Box px={1}>
                            <Text fontSize="10px" color={brandColor} fontWeight="bold" textTransform="uppercase" mb={1}>
                                {product.category}
                            </Text>
                            <Text fontSize="sm" fontWeight="bold" color="white" lineClamp={1} mb={1}>
                                {product.name}
                            </Text>

                            <Flex align="center" gap={1} mb={3}>
                                <Flex gap={0.5}>
                                    {[...Array(5)].map((_, i) => (
                                        <Icon key={i} as={LuStar} boxSize="10px" fill="yellow.400" color="yellow.400" />
                                    ))}
                                </Flex>
                                <Text fontSize="10px" color="gray.500">({product.reviews || 84})</Text>
                            </Flex>

                            <Text fontSize="lg" fontWeight="black" color="white" mb={4}>
                                ₦{product.price.toLocaleString()}
                            </Text>

                            {/* Move to Cart Action */}
                            <Button 
                                w="full" size="sm" bg="rgba(92, 172, 125, 0.15)" color={brandColor} rounded="lg" border="1px solid" borderColor="transparent"
                                _hover={{ bg: brandColor, color: "white" }} transition="all 0.2s"
                                display="flex" gap={2} onClick={() => handleAddToCart(product)}
                            >
                                <Icon as={LuShoppingCart} boxSize="14px" />
                                <Text fontSize="xs" fontWeight="bold">Move to Cart</Text>
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
}
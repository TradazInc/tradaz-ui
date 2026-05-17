"use client";
import React, { useState, useEffect } from "react";
import { 
    Box, Flex, Text, Image, Button, Icon, IconButton, VStack, Separator, SimpleGrid 
} from "@chakra-ui/react";
import { 
    LuTrash2, LuMinus, LuPlus, LuShoppingBag, LuArrowRight, LuArrowLeft, LuCheck
} from "react-icons/lu";
import Link from "next/link";

import { CheckoutDrawer } from "@/app/ui/store/CheckoutDrawer/CheckoutDrawer";

// Define the CartItem type to match what we saved in localStorage
type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    variation?: string;
    size?: string;
    color?: string;
};

export default function CartPage() {
    const brandColor = "#5cac7d";
    
    // --- LAZY INITIALIZATION ---
    // This safely reads from localStorage directly during the initial client-side render
    // completely avoiding the need to call setState inside a useEffect.
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window !== "undefined") {
            try {
                return JSON.parse(localStorage.getItem("tradaz_cart") || "[]");
            } catch (error) {
                console.error("Failed to load cart", error);
                return [];
            }
        }
        return [];
    });

    const [isCheckoutDrawerOpen, setIsCheckoutDrawerOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // --- HYDRATION SYNC ---
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    // --- UPDATE CART QUANTITY ---
    const updateQuantity = (id: string, variation: string | undefined, delta: number) => {
        setCartItems(prev => {
            const updatedCart = prev.map(item => {
                // Match by both ID and Variation to ensure we update the right specific item
                if (item.id === id && item.variation === variation) {
                    const newQuantity = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });

            // Save to local storage and trigger badge update
            localStorage.setItem('tradaz_cart', JSON.stringify(updatedCart));
            window.dispatchEvent(new Event('cartUpdated'));

            return updatedCart;
        });
    };

    // --- REMOVE ITEM FROM CART ---
    const removeItem = (id: string, variation: string | undefined) => {
        setCartItems(prev => {
            // Filter out the exact item + variation combo
            const updatedCart = prev.filter(item => !(item.id === id && item.variation === variation));
            
            // Save to local storage and trigger badge update
            localStorage.setItem('tradaz_cart', JSON.stringify(updatedCart));
            window.dispatchEvent(new Event('cartUpdated'));

            return updatedCart;
        });
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Prevent rendering until local storage is loaded to avoid hydration UI jumps
    if (!isMounted) return null;

    // Empty State
    if (cartItems.length === 0) {
        return (
            <Box p={{ base: 4, lg: 8 }} maxW="1200px" mx="auto" minH="70vh" display="flex" alignItems="center" justifyContent="center">
                <Flex direction="column" align="center" justify="center" color="gray.500" gap={4}>
                    <Icon as={LuShoppingBag} boxSize="80px" opacity={0.2} mb={4} />
                    <Text fontSize="2xl" fontWeight="black" color="white">Your cart is empty</Text>
                    <Text fontSize="md" textAlign="center" maxW="sm">Looks like you haven&apos;t added anything yet. Start exploring our collections!</Text>
                    <Link href="/store" style={{ textDecoration: 'none' }}>
                        <Button mt={6} px={8} h="50px" rounded="full" bg={brandColor} color="white" _hover={{ filter: "brightness(1.1)" }}>
                            Continue Shopping
                        </Button>
                    </Link>
                </Flex>
            </Box>
        );
    }

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1200px" mx="auto">
            
            <CheckoutDrawer 
                isOpen={isCheckoutDrawerOpen} 
                onClose={() => setIsCheckoutDrawerOpen(false)} 
                cartTotal={subtotal} 
                brandColor={brandColor} 
            />

            <Flex align="center" justify="space-between" mb={8}>
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight">Your Cart</Text>
                    <Text color="gray.400" fontSize="sm">{cartItems.length} items</Text>
                </Box>
                <Link href="/store" style={{ textDecoration: 'none' }}>
                    <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }} px={2}>
                        <Icon as={LuArrowLeft} mr={2} /> Continue Shopping
                    </Button>
                </Link>
            </Flex>

            <SimpleGrid columns={{ base: 1, lg: 12 }} gap={8}>
                {/* Left Side: Items */}
                <Box gridColumn={{ lg: "span 8" }}>
                    <VStack gap={4} align="stretch">
                        {cartItems.map((item, index) => (
                            <Box key={`${item.id}-${index}`} bg="#1A1C23" p={4} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                                <Flex gap={4} direction={{ base: "column", sm: "row" }}>
                                    <Box boxSize={{ base: "full", sm: "120px" }} h={{ base: "200px", sm: "120px" }} rounded="xl" overflow="hidden" bg="#121212" flexShrink={0}>
                                        <Image src={item.image} alt={item.name} w="full" h="full" objectFit="cover" />
                                    </Box>
                                    <Flex direction="column" justify="space-between" flex={1} py={1}>
                                        <Box mb={{ base: 4, sm: 0 }}>
                                            <Flex justify="space-between" align="start">
                                                <Text color="white" fontWeight="bold" fontSize="lg" lineClamp={2} pr={4}>{item.name}</Text>
                                                <IconButton 
                                                    aria-label="Remove item" size="sm" variant="ghost" color="gray.500" 
                                                    _hover={{ color: "red.400", bg: "rgba(245, 101, 101, 0.15)" }} 
                                                    onClick={() => removeItem(item.id, item.variation)} mt={-1} mr={-2}
                                                >
                                                    <Icon as={LuTrash2} boxSize="18px" />
                                                </IconButton>
                                            </Flex>
                                            <Flex gap={3} mt={2}>
                                                <Text color="gray.500" fontSize="sm" bg="whiteAlpha.50" px={2} py={0.5} rounded="md">
                                                    Size/Var: <Text as="span" color="white">{item.variation || item.size || "N/A"}</Text>
                                                </Text>
                                                {item.color && (
                                                    <Text color="gray.500" fontSize="sm" bg="whiteAlpha.50" px={2} py={0.5} rounded="md">
                                                        Color: <Text as="span" color="white">{item.color}</Text>
                                                    </Text>
                                                )}
                                            </Flex>
                                        </Box>
                                        <Flex justify="space-between" align="end">
                                            <Text color={brandColor} fontWeight="black" fontSize="xl">₦{(item.price * item.quantity).toLocaleString()}</Text>
                                            <Flex align="center" bg="#121212" rounded="lg" border="1px solid" borderColor="whiteAlpha.200" p={0.5}>
                                                <IconButton 
                                                    aria-label="Decrease" size="sm" variant="ghost" color="gray.400" 
                                                    _hover={{ color: "white", bg: "whiteAlpha.100" }} 
                                                    onClick={() => updateQuantity(item.id, item.variation, -1)}
                                                >
                                                    <Icon as={LuMinus} boxSize="14px" />
                                                </IconButton>
                                                <Text color="white" fontWeight="bold" fontSize="md" w="32px" textAlign="center">{item.quantity}</Text>
                                                <IconButton 
                                                    aria-label="Increase" size="sm" variant="ghost" color="gray.400" 
                                                    _hover={{ color: "white", bg: "whiteAlpha.100" }} 
                                                    onClick={() => updateQuantity(item.id, item.variation, 1)}
                                                >
                                                    <Icon as={LuPlus} boxSize="14px" />
                                                </IconButton>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Box>
                        ))}
                    </VStack>
                </Box>

                {/* Right Side: Summary */}
                <Box gridColumn={{ lg: "span 4" }}>
                    <Box position="sticky" top="100px" bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Text color="white" fontSize="xl" fontWeight="black" mb={6}>Order Summary</Text>
                        <VStack gap={4} align="stretch" mb={8}>
                            <Flex justify="space-between" align="center">
                                <Text color="gray.400">Subtotal</Text>
                                <Text color="white" fontWeight="bold" fontSize="lg">₦{subtotal.toLocaleString()}</Text>
                            </Flex>
                            <Separator borderColor="whiteAlpha.100" my={2} />
                            <Flex justify="space-between" align="center">
                                <Text color="white" fontSize="xl" fontWeight="black">Estimated Total</Text>
                                <Text color={brandColor} fontSize="2xl" fontWeight="black">₦{subtotal.toLocaleString()}</Text>
                            </Flex>
                            <Text fontSize="xs" color="gray.500" textAlign="right">Delivery calculated at checkout</Text>
                        </VStack>

                        <Button 
                            w="full" h="60px" bg={brandColor} color="white" rounded="xl" fontSize="lg" fontWeight="bold"
                            _hover={{ filter: "brightness(1.1)", transform: "translateY(-2px)" }} transition="all 0.2s" shadow="xl"
                            display="flex" gap={3} onClick={() => setIsCheckoutDrawerOpen(true)}
                        >
                            <Text>Proceed to Checkout</Text>
                            <Icon as={LuArrowRight} />
                        </Button>
                        
                        <Flex justify="center" mt={4} gap={2} align="center" color="gray.500" fontSize="xs">
                            <Icon as={LuCheck} color={brandColor} />
                            <Text>Secure & Encrypted Checkout</Text>
                        </Flex>
                    </Box>
                </Box>
            </SimpleGrid>
        </Box>
    );
}
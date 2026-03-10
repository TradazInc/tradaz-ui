"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Image, Button, Icon, Badge, IconButton, SimpleGrid, HStack, VStack 
} from "@chakra-ui/react";
import { 
    LuHeart, LuShoppingCart, LuStar, LuArrowLeft, LuTruck, LuShieldCheck, LuUndo2 
} from "react-icons/lu";

import { ProductDetailViewProps } from "@/app/lib/definitions";

export const ProductDetailView = ({ product, onBack, brandColor = "#5cac7d" }: ProductDetailViewProps) => {
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");

    // Mock detailed data (In a real app, you'd fetch this based on the ID)
    const mockImages = [
        product.image,
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=600&auto=format&fit=crop"
    ];

    return (
        <Box p={{ base: 4, lg: 8 }} w="full" maxW="1200px" mx="auto" animation="fade-in 0.3s ease">
            
            {/* Header / Back Button */}
            <Flex align="center" gap={3} mb={8}>
                <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }} onClick={onBack} px={2}>
                    <Icon as={LuArrowLeft} boxSize="20px" mr={2} />
                    Back to Store
                </Button>
            </Flex>

            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={12}>
                {/* Left: Interactive Image Gallery */}
                <Box>
                    <Box bg="#1A1C23" rounded="3xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden" mb={4} h={{ base: "400px", md: "500px" }} position="relative">
                        <Badge position="absolute" top={4} left={4} bg={brandColor} color="white" rounded="md" px={3} py={1} fontSize="xs" fontWeight="bold" zIndex={10}>
                            {product.isNew ? "NEW RELEASE" : "BEST SELLER"}
                        </Badge>
                        <Image src={mockImages[activeImageIdx]} alt={product.name} w="full" h="full" objectFit="cover" />
                    </Box>
                    <HStack gap={4} overflowX="auto" pb={2} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                        {mockImages.map((img, idx) => (
                            <Box 
                                key={idx} cursor="pointer" flexShrink={0}
                                w="100px" h="100px" rounded="xl" overflow="hidden" 
                                border="2px solid" borderColor={activeImageIdx === idx ? brandColor : "transparent"}
                                opacity={activeImageIdx === idx ? 1 : 0.6}
                                _hover={{ opacity: 1 }} transition="all 0.2s"
                                onClick={() => setActiveImageIdx(idx)}
                            >
                                <Image src={img} alt={`View ${idx + 1}`} w="full" h="full" objectFit="cover" />
                            </Box>
                        ))}
                    </HStack>
                </Box>

                {/* Right: Product Details & Add to Cart */}
                <Flex direction="column" justify="center">
                    <Text fontSize="sm" color={brandColor} fontWeight="bold" textTransform="uppercase" letterSpacing="widest" mb={2}>
                        {product.category}
                    </Text>
                    <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="black" color="white" lineHeight="1.1" mb={4}>
                        {product.name}
                    </Text>
                    
                    <Flex align="center" gap={3} mb={6}>
                        <Flex gap={1}>
                            {[...Array(5)].map((_, i) => (
                                <Icon key={i} as={LuStar} boxSize="16px" fill="yellow.400" color="yellow.400" />
                            ))}
                        </Flex>
                        <Text fontSize="sm" color="gray.400" textDecoration="underline" cursor="pointer">
                            Read {product.reviews || 120} Reviews
                        </Text>
                    </Flex>

                    <Text fontSize="4xl" fontWeight="black" color="white" mb={8}>
                        ₦{product.price.toLocaleString()}
                    </Text>

                    {/* Variants Selection */}
                    <Box mb={8}>
                        <Flex justify="space-between" mb={2}>
                            <Text color="white" fontWeight="bold">Select Size</Text>
                            <Text color="gray.500" fontSize="sm" textDecoration="underline" cursor="pointer">Size Guide</Text>
                        </Flex>
                        <SimpleGrid columns={4} gap={3}>
                            {["S", "M", "L", "XL"].map((size) => (
                                <Button 
                                    key={size} variant="outline" 
                                    borderColor={selectedSize === size ? brandColor : "whiteAlpha.200"} 
                                    color={selectedSize === size ? brandColor : "white"}
                                    bg={selectedSize === size ? "rgba(92, 172, 125, 0.1)" : "transparent"}
                                    _hover={{ borderColor: brandColor }}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </Button>
                            ))}
                        </SimpleGrid>
                    </Box>

                    {/* Actions */}
                    <Flex gap={4} mb={8}>
                        <Button 
                            flex={1} h="60px" bg={brandColor} color="white" rounded="full" fontSize="lg" fontWeight="bold"
                            _hover={{ filter: "brightness(1.1)", transform: "translateY(-2px)" }} transition="all 0.2s" shadow="xl"
                            display="flex" gap={3}
                        >
                            <Icon as={LuShoppingCart} boxSize="24px" /> Add to Cart
                        </Button>
                        <IconButton 
                            aria-label="Save for later" h="60px" w="60px" rounded="full" bg="#1A1C23" color="white" border="1px solid" borderColor="whiteAlpha.200"
                            _hover={{ bg: "red.500", borderColor: "red.500" }} transition="all 0.2s"
                        >
                            <Icon as={LuHeart} boxSize="24px" />
                        </IconButton>
                    </Flex>

                    {/* Trust Badges */}
                    <VStack align="stretch" gap={4} bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Flex align="center" gap={4}>
                            <Icon as={LuTruck} boxSize="24px" color={brandColor} />
                            <Box>
                                <Text color="white" fontWeight="bold" fontSize="sm">Free Delivery</Text>
                                <Text color="gray.500" fontSize="xs">Orders over ₦50,000</Text>
                            </Box>
                        </Flex>
                        <Flex align="center" gap={4}>
                            <Icon as={LuUndo2} boxSize="24px" color={brandColor} />
                            <Box>
                                <Text color="white" fontWeight="bold" fontSize="sm">Easy Returns</Text>
                                <Text color="gray.500" fontSize="xs">30-day return policy</Text>
                            </Box>
                        </Flex>
                        <Flex align="center" gap={4}>
                            <Icon as={LuShieldCheck} boxSize="24px" color={brandColor} />
                            <Box>
                                <Text color="white" fontWeight="bold" fontSize="sm">Secure Payment</Text>
                                <Text color="gray.500" fontSize="xs">100% safe & encrypted</Text>
                            </Box>
                        </Flex>
                    </VStack>

                </Flex>
            </SimpleGrid>
        </Box>
    );
};
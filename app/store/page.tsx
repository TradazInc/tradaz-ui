"use client";
import React, { useState, useEffect } from "react";
import { 
    Box, Flex, Text, Image, Grid, Button, Icon, Badge, IconButton, Spinner 
} from "@chakra-ui/react";
import { LuHeart, LuShoppingCart, LuArrowRight, LuStar } from "react-icons/lu";

import { STORE_BANNERS, STORE_PRODUCTS } from "@/app/lib/data";
import { ProductDetailView } from "../ui/store/productDetail/productDetail";



export default function StorefrontHomePage() {
    const brandColor = "#5cac7d"; 

    
    const [currentSlide, setCurrentSlide] = useState(0);
    const [feedProducts, setFeedProducts] = useState(STORE_PRODUCTS);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    
    // Detailed View State
    const [selectedProduct, setSelectedProduct] = useState<typeof STORE_PRODUCTS[0] | null>(null);

    // --- CAROUSEL LOGIC ---
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === STORE_BANNERS.length - 1 ? 0 : prev + 1));
        }, 5000); 
        return () => clearInterval(timer);
    }, []);

    // --- INFINITE SCROLL LOGIC ---
    useEffect(() => {
        const handleScroll = () => {
            if (selectedProduct) return; 

            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300) {
                if (!isLoadingMore) {
                    setIsLoadingMore(true);
                    setTimeout(() => {
                        setFeedProducts((prev) => [...prev, ...STORE_PRODUCTS]);
                        setIsLoadingMore(false);
                    }, 1000);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoadingMore, selectedProduct]);

    const featuredProducts = STORE_PRODUCTS.slice(0, 4);

    
    if (selectedProduct) {
        
        return (
            <ProductDetailView 
                product={selectedProduct} 
                onBack={() => setSelectedProduct(null)} 
                brandColor={brandColor} 
            />
        );
    }

    return (
        <Box p={{ base: 4, lg: 8 }} w="full" mx="auto">
            
            {/*  CAROUSEL */}
            <Box position="relative" w="full" h={{ base: "350px", md: "450px", lg: "550px" }} rounded="3xl" overflow="hidden" mb={12} shadow="2xl">
                {STORE_BANNERS.map((banner, index) => (
                    <Box key={banner.id} position="absolute" top={0} left={0} w="full" h="full" opacity={currentSlide === index ? 1 : 0} transition="opacity 0.8s ease-in-out" role="group">
                        <Box position="absolute" inset={0} bgGradient="linear(to-t, #0A0A0B 0%, transparent 70%)" zIndex={1} />
                        <Image src={banner.image} alt={banner.title} w="full" h="full" objectFit="cover" transition="transform 6s ease" _groupHover={{ transform: "scale(1.05)" }} />
                        <Flex position="absolute" bottom={0} left={0} zIndex={2} p={{ base: 6, lg: 12 }} direction="column" align="flex-start" w={{ base: "90%", lg: "60%" }}>
                            <Badge bg={brandColor} color="white" px={3} py={1} rounded="full" mb={4} fontSize="xs" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">Limited Time!</Badge>
                            <Text fontSize={{ base: "4xl", lg: "6xl" }} fontWeight="black" color="white" lineHeight="1.1" mb={4}>{banner.title}</Text>
                            <Text fontSize={{ base: "lg", lg: "xl" }} color="gray.300" mb={8} maxW="md">{banner.subtitle}</Text>
                            <Button display="flex" alignItems="center" gap={3} bg={brandColor} color="white" px={8} py={6} rounded="full" fontWeight="bold" transition="all 0.2s" _hover={{ filter: "brightness(1.1)", transform: "translateX(4px)" }}>
                                <Text>{banner.cta}</Text>
                                <Icon as={LuArrowRight} />
                            </Button>
                        </Flex>
                    </Box>
                ))}
                <Flex position="absolute" bottom={6} left="50%" transform="translateX(-50%)" gap={3} zIndex={10}>
                    {STORE_BANNERS.map((_, idx) => (
                        <Box key={idx} boxSize={currentSlide === idx ? "10px" : "8px"} bg={currentSlide === idx ? brandColor : "whiteAlpha.400"} rounded="full" cursor="pointer" transition="all 0.3s" onClick={() => setCurrentSlide(idx)} />
                    ))}
                </Flex>
            </Box>

            {/*  FEATURED GRID */}
            <Flex justify="space-between" align="flex-end" mb={6}>
                <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight">Featured Drops</Text>
            </Flex>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={4} mb={16} w="full">
                {featuredProducts.map((product) => (
                    <Box key={`feat-${product.id}`} onClick={() => setSelectedProduct(product)} role="group" position="relative" rounded="3xl" overflow="hidden" cursor="pointer" h={{ base: "400px", md: "500px", lg: "65vh" }}>
                        <Image src={product.image} alt={product.name} w="full" h="full" objectFit="cover" transition="transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)" _groupHover={{ transform: "scale(1.05)" }} />
                        <Box position="absolute" inset={0} bgGradient="linear(to-t, blackAlpha.900 0%, transparent 60%)" transition="all 0.3s" _groupHover={{ opacity: 0.8 }} />
                        <Flex position="absolute" bottom={0} left={0} right={0} p={6} direction="column" justify="flex-end">
                            <Text fontSize="xs" color={brandColor} textTransform="uppercase" fontWeight="bold" letterSpacing="widest" mb={1}>{product.category}</Text>
                            <Text fontSize="2xl" fontWeight="black" color="white" lineHeight="1.1" mb={2} lineClamp={2}>{product.name}</Text>
                            <Flex justify="space-between" align="center" mt={2}>
                                <Text fontSize="xl" fontWeight="bold" color="white">₦{product.price.toLocaleString()}</Text>
                                <Button size="sm" rounded="full" bg={brandColor} color="white" _hover={{ filter: "brightness(1.1)" }} display="flex" gap={2} onClick={(e) => e.stopPropagation()}>
                                    <Icon as={LuShoppingCart} />
                                    <Text>Add</Text>
                                </Button>
                            </Flex>
                        </Flex>
                    </Box>
                ))}
            </Grid>

            {/*  INFINITE CATALOG */}
            <Box borderTop="1px solid" borderColor="whiteAlpha.100" pt={10}>
                <Flex justify="space-between" align="flex-end" mb={8}>
                    <Box>
                        <Text fontSize="2xl" fontWeight="black" color="white" letterSpacing="tight">The Catalog</Text>
                        <Text fontSize="sm" color="gray.400">Scroll to explore more</Text>
                    </Box>
                </Flex>
                <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gap={{ base: 4, lg: 6 }}>
                    {feedProducts.map((product, index) => (
                        <Box key={`feed-${product.id}-${index}`} onClick={() => setSelectedProduct(product)} role="group" bg="#1A1C23" p={3} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" transition="all 0.2s" _hover={{ borderColor: brandColor, transform: "translateY(-4px)", shadow: "xl" }} cursor="pointer">
                            <Box position="relative" rounded="xl" overflow="hidden" bg="whiteAlpha.50" mb={4} aspectRatio={1}>
                                <Badge position="absolute" top={2} left={2} bg={brandColor} color="white" rounded="sm" px={2} py={0.5} fontSize="9px" fontWeight="bold" zIndex={10}>{product.isNew ? "NEW" : "TRENDING"}</Badge>
                                <IconButton position="absolute" top={2} right={2} zIndex={10} aria-label="Wishlist" size="sm" rounded="full" bg="blackAlpha.500" color="white" backdropFilter="blur(4px)" _hover={{ bg: "red.500", color: "white" }} onClick={(e) => e.stopPropagation()}>
                                    <Icon as={LuHeart} boxSize="14px" />
                                </IconButton>
                                <Image src={product.image} alt={product.name} w="full" h="full" objectFit="cover" transition="transform 0.6s ease" _groupHover={{ transform: "scale(1.08)" }} />
                            </Box>
                            <Box px={1}>
                                <Text fontSize="10px" color={brandColor} fontWeight="bold" textTransform="uppercase" mb={1}>{product.category}</Text>
                                <Text fontSize="sm" fontWeight="bold" color="white" lineClamp={1} mb={1}>{product.name}</Text>
                                <Flex align="center" gap={1} mb={3}>
                                    
                                    <Flex gap={0.5}>{[...Array(5)].map((_, i) => (<Icon key={i} as={LuStar} boxSize="10px" fill="yellow.400" color="yellow.400" />))}</Flex>
                                    <Text fontSize="10px" color="gray.500">({product.reviews || 120} reviews)</Text>
                                </Flex>
                                <Text fontSize="lg" fontWeight="black" color={brandColor} mb={4}>₦{product.price.toLocaleString()}</Text>
                                <Button w="full" size="sm" bg="whiteAlpha.100" color="white" rounded="lg" _hover={{ bg: brandColor, color: "white" }} display="flex" gap={2} onClick={(e) => e.stopPropagation()}>
                                    <Icon as={LuShoppingCart} boxSize="14px" />
                                    <Text fontSize="xs" fontWeight="bold">Add to Cart</Text>
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Grid>
                {isLoadingMore && (
                    <Flex justify="center" py={12}>
                        <Spinner size="xl" color={brandColor} />
                    </Flex>
                )}
            </Box>
            
        </Box>
    );
}
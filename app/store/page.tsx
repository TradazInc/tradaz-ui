
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
    Box, Flex, Text, Image, Grid, Button, Icon, Badge, IconButton, Spinner 
} from "@chakra-ui/react";
import { 
    LuHeart, LuShoppingCart, LuArrowRight, LuStar, LuCheck, LuX, LuMinus, LuPlus, LuMegaphone 
} from "react-icons/lu";

import { STORE_BANNERS, STORE_PRODUCTS } from "@/data/data";
import { ProductDetailView } from "../ui/store/productDetail/productDetail";


// --- TYPES ---
type ProductType = typeof STORE_PRODUCTS[0];
type CartItem = ProductType & { quantity: number; variation?: string };


interface PromoBanner {
    id: string;
    name: string;
    position: "Top Announcement Bar" | "Hero Slider" | "Checkout Warning";
    message: string;
    ctaText: string;
    ctaLink: string;
    bgColor: string;
    image?: string;
    textColor: string;
    status: "Active" | "Draft";
}

export default function StorefrontHomePage() {
    const brandColor = "#5cac7d"; 
    const router = useRouter();

    // --- ADMIN BANNERS STATE ---
    const [adminBanners, setAdminBanners] = useState<PromoBanner[]>([]);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [feedProducts, setFeedProducts] = useState(STORE_PRODUCTS);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    
    // Custom Toast State
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<"success" | "error">("success");
    
    // Detailed View State
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

    // --- QUICK ADD TO CART STATE ---
    const [quickAddProduct, setQuickAddProduct] = useState<ProductType | null>(null);
    const [selectedVariation, setSelectedVariation] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);

    const MOCK_VARIATIONS = ["S", "M", "L", "XL"];

    // --- HYDRATE ADMIN BANNERS ---
    useEffect(() => {
        try {
            const storedBanners = JSON.parse(localStorage.getItem('tradaz_banners') || '[]');
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setAdminBanners(storedBanners);
        } catch (error) {
            console.error("Could not load admin banners", error);
        }
    }, []);

    // Filter active banners by their intended position
    const topBarBanners = adminBanners.filter(b => b.status === "Active" && b.position === "Top Announcement Bar");
    const customHeroBanners = adminBanners.filter(b => b.status === "Active" && b.position === "Hero Slider");

    // Combine Admin Hero Banners with Default Banners
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const carouselItems: any[] = [
        ...customHeroBanners.map(b => ({
            id: b.id,
            isCustom: true,
            title: b.name,
            subtitle: b.message,
            cta: b.ctaText,
            bgColor: b.bgColor,
            textColor: b.textColor,
            image: b.image
        })),
        ...STORE_BANNERS.map(b => ({
            id: b.id,
            isCustom: false,
            image: b.image,
            title: b.title,
            subtitle: b.subtitle,
            cta: b.cta
        }))
    ];

    // --- CAROUSEL LOGIC ---
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
        }, 5000); 
        return () => clearInterval(timer);
    }, [carouselItems.length]);

    // --- INFINITE SCROLL LOGIC ---
    useEffect(() => {
        const handleScroll = () => {
            if (selectedProduct || quickAddProduct) return; 

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
    }, [isLoadingMore, selectedProduct, quickAddProduct]);

    // --- TRIGGER QUICK ADD MODAL ---
    const handleOpenQuickAdd = (e: React.MouseEvent, product: ProductType) => {
        e.stopPropagation(); 
        setQuickAddProduct(product);
        setSelectedVariation(""); 
        setQuantity(1); 
    };

    // --- CONFIRM ADD TO CART LOGIC ---
    const confirmAddToCart = () => {
        if (!quickAddProduct) return;

        if (!selectedVariation) {
            setToastType("error");
            setToastMessage("Please select a variation before adding to cart.");
            setTimeout(() => setToastMessage(null), 3000);
            return;
        }

        try {
            const existingCart: CartItem[] = JSON.parse(localStorage.getItem('tradaz_cart') || '[]');
            
            const existingItemIndex = existingCart.findIndex(
                (item: CartItem) => item.id === quickAddProduct.id && item.variation === selectedVariation
            );

            if (existingItemIndex >= 0) {
                existingCart[existingItemIndex].quantity += quantity;
            } else {
                existingCart.push({ ...quickAddProduct, quantity, variation: selectedVariation });
            }

            localStorage.setItem('tradaz_cart', JSON.stringify(existingCart));
            window.dispatchEvent(new Event('cartUpdated'));

            setToastType("success");
            setToastMessage(`${quantity}x ${quickAddProduct.name} (${selectedVariation}) added to cart!`);
            setTimeout(() => setToastMessage(null), 3000);

            setQuickAddProduct(null);

        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };

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
        <Box w="full" position="relative">
            
            {/* --- CUSTOM TOAST NOTIFICATION --- */}
            {toastMessage && (
                <Box 
                    position="fixed" bottom={8} right={8} zIndex={99999} 
                    bg="#1A1C23" border="1px solid" borderColor={toastType === "success" ? brandColor : "red.400"} shadow="2xl" 
                    px={6} py={4} rounded="xl" transition="all 0.3s ease" animation="slide-in-bottom 0.3s ease"
                >
                    <Flex align="center" gap={3}>
                        <Flex boxSize="24px" rounded="full" bg={toastType === "success" ? "rgba(92, 172, 125, 0.2)" : "rgba(245, 101, 101, 0.2)"} align="center" justify="center">
                            <Icon as={toastType === "success" ? LuCheck : LuX} color={toastType === "success" ? brandColor : "red.400"} boxSize="14px" strokeWidth="3" />
                        </Flex>
                        <Text color="white" fontWeight="bold" fontSize="sm">{toastMessage}</Text>
                    </Flex>
                </Box>
            )}

            {/* --- QUICK ADD TO CART MODAL --- */}
            {quickAddProduct && (
                <Box 
                    position="fixed" inset={0} zIndex={9999} bg="blackAlpha.800" backdropFilter="blur(4px)" 
                    display="flex" alignItems="center" justifyContent="center" p={4} 
                    onClick={() => setQuickAddProduct(null)}
                >
                    <Box 
                        bg="#0A0A0A" border="1px solid #333333" rounded="none" w="full" maxW="400px" p={6} shadow="2xl" 
                        onClick={e => e.stopPropagation()} animation="fade-in 0.2s ease"
                    >
                        {/* Header */}
                        <Flex justify="space-between" align="start" mb={6}>
                            <Flex gap={4}>
                                <Image src={quickAddProduct.image} alt={quickAddProduct.name} boxSize="64px" objectFit="cover" border="1px solid #333333" />
                                <Box>
                                    <Text color="white" fontWeight="bold" fontSize="md" lineClamp={1}>{quickAddProduct.name}</Text>
                                    <Text color={brandColor} fontWeight="black" fontSize="lg">₦{quickAddProduct.price.toLocaleString()}</Text>
                                </Box>
                            </Flex>
                            <IconButton aria-label="Close" variant="ghost" color="gray.500" size="sm" onClick={() => setQuickAddProduct(null)} _hover={{ color: "white", bg: "#111111" }} rounded="none">
                                <Icon as={LuX} boxSize="18px" />
                            </IconButton>
                        </Flex>

                        {/* Variation Selector */}
                        <Box mb={6}>
                            <Flex justify="space-between" align="center" mb={2}>
                                <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Select Size *</Text>
                            </Flex>
                            <Flex wrap="wrap" gap={2}>
                                {MOCK_VARIATIONS.map((size) => (
                                    <Button 
                                        key={size} size="sm" rounded="none" px={4}
                                        bg={selectedVariation === size ? "white" : "#111111"} 
                                        color={selectedVariation === size ? "black" : "white"} 
                                        border="1px solid" borderColor={selectedVariation === size ? "white" : "#333333"}
                                        onClick={() => setSelectedVariation(size)}
                                        _hover={{ bg: selectedVariation === size ? "white" : "#1A1A1A" }}
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </Flex>
                        </Box>

                        {/* Quantity Selector */}
                        <Box mb={8}>
                            <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Quantity</Text>
                            <Flex align="center" gap={4} bg="#111111" border="1px solid #333333" w="fit-content">
                                <IconButton 
                                    aria-label="Decrease" variant="ghost" rounded="none" color="white" h="40px" w="40px"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))} _hover={{ bg: "#1A1A1A" }}
                                >
                                    <Icon as={LuMinus}/>
                                </IconButton>
                                <Text color="white" fontWeight="bold" w="20px" textAlign="center">{quantity}</Text>
                                <IconButton 
                                    aria-label="Increase" variant="ghost" rounded="none" color="white" h="40px" w="40px"
                                    onClick={() => setQuantity(quantity + 1)} _hover={{ bg: "#1A1A1A" }}
                                >
                                    <Icon as={LuPlus}/>
                                </IconButton>
                            </Flex>
                        </Box>

                        {/* Action Buttons */}
                        <Flex gap={3}>
                            <Button flex={1} bg={brandColor} color="white" rounded="none" h="48px" _hover={{ filter: "brightness(1.1)" }} onClick={confirmAddToCart}>
                                Add to Cart
                            </Button>
                        </Flex>
                    </Box>
                </Box>
            )}

            {/* --- anouncement banner --- */}
            {topBarBanners.length > 0 && (
                <Box w="full" position="sticky" top="70px" zIndex={1}>
                    {topBarBanners.map(bar => (
                        <Flex 
                            key={bar.id} w="full" minH="36px" py={1.5} px={4} justify="center" align="center" gap={{ base: 2, sm: 4 }} 
                            bg={bar.bgColor} color={bar.textColor} 
                            direction={{ base: "column", sm: "row" }}
                            textAlign="center"
                            boxShadow="0 2px 10px rgba(0,0,0,0.2)"
                        >
                            <Flex align="center" gap={2} overflow="hidden">
                                <Icon as={LuMegaphone} boxSize="14px" strokeWidth="2.5" flexShrink={0} />
                                <Text fontSize={{ base: "xs", sm: "sm" }} fontWeight="bold" letterSpacing="wide" textTransform="uppercase" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                                    {bar.message}
                                </Text>
                            </Flex>
                            {bar.ctaText && (
                                <Button 
                                    size="xs" bg={bar.textColor} color={bar.bgColor} h="24px"
                                    _hover={{ opacity: 0.9, transform: "scale(1.02)" }} rounded="none" px={4} 
                                    fontWeight="black" textTransform="uppercase" letterSpacing="wider" transition="all 0.2s"
                                    flexShrink={0}
                                    onClick={() => {
                                        if (bar.ctaLink) router.push(bar.ctaLink);
                                    }}
                                >
                                    {bar.ctaText}
                                </Button>
                            )}
                        </Flex>
                    ))}
                </Box>
            )}

           
            <Box p={{ base: 4, lg: 8 }} w="full" mx="auto">

              
                {/* --- CAROUSEL HERO SECTION --- */}
            <Box position="relative" w="full" h="550px" rounded="none" overflow="hidden" mb={12} shadow="2xl">
                
                {/* Slides */}
                {carouselItems.map((banner, index) => (
                    <Box key={banner.id} position="absolute" top={0} left={0} w="full" h="full" opacity={currentSlide === index ? 1 : 0} transition="opacity 0.8s ease-in-out" role="group">
                        
                        {/* Render either the Image OR the Admin Background Color */}
                        {banner.image ? (
                            <>
                                <Box position="absolute" inset={0} bgGradient="linear(to-t, #0A0A0B 0%, transparent 70%)" zIndex={1} />
                                <Image src={banner.image} alt={banner.title} w="full" h="full" objectFit="cover" transition="transform 6s ease" _groupHover={{ transform: "scale(1.05)" }} />
                            </>
                        ) : (
                            <Box position="absolute" inset={0} bg={banner.bgColor || "#0A0A0A"} zIndex={0} />
                        )}
                        
                        {/* Overlay Text */}
                        <Flex position="absolute" bottom={0} left={0} zIndex={2} p={{ base: 6, lg: 12 }} direction="column" align="flex-start" w={{ base: "90%", lg: "60%" }}>
                            <Badge bg={banner.isCustom ? "white" : brandColor} color={banner.isCustom ? "black" : "white"} px={3} py={1} rounded="full" mb={4} fontSize="xs" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
                                {banner.isCustom ? "Announcement" : "Limited Time!"}
                            </Badge>
                            
                            <Text fontSize={{ base: "4xl", lg: "6xl" }} fontWeight="black" color={banner.isCustom ? banner.textColor : "white"} lineHeight="1.1" mb={4}>
                                {banner.title}
                            </Text>
                            
                            <Text fontSize={{ base: "lg", lg: "xl" }} color={banner.isCustom ? banner.textColor : "gray.300"} opacity={banner.isCustom ? 0.9 : 1} mb={8} maxW="md">
                                {banner.subtitle}
                            </Text>
                            
                            {banner.cta && (
                                <Button 
                                    display="flex" alignItems="center" gap={3} 
                                    bg={banner.isCustom ? banner.textColor : brandColor} 
                                    color={banner.isCustom ? banner.bgColor : "white"} 
                                    px={8} py={6} rounded="full" fontWeight="bold" transition="all 0.2s" 
                                    _hover={{ filter: "brightness(1.1)", transform: "translateX(4px)" }}
                                    onClick={() => {
                                        if (banner.ctaLink) router.push(banner.ctaLink);
                                    }}
                                >
                                    <Text>{banner.cta}</Text>
                                    <Icon as={LuArrowRight} />
                                </Button>
                            )}
                        </Flex>
                    </Box>
                ))}
                
                {/* Dots indicator */}
                <Flex position="absolute" bottom={6} left="50%" transform="translateX(-50%)" gap={3} zIndex={10}>
                    {carouselItems.map((_, idx) => (
                        <Box key={idx} boxSize={currentSlide === idx ? "10px" : "8px"} bg={currentSlide === idx ? "white" : "whiteAlpha.400"} rounded="full" cursor="pointer" transition="all 0.3s" onClick={() => setCurrentSlide(idx)} />
                    ))}
                </Flex>
            </Box>
                {/* --- FEATURED GRID --- */}
                <Flex justify="space-between" align="flex-end" mb={6}>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight">Featured Products</Text>
                </Flex>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={4} mb={16} w="full">
                    {featuredProducts.map((product) => (
                        <Flex 
                            key={`feat-${product.id}`} onClick={() => setSelectedProduct(product)} 
                            role="group" direction="column" rounded="none" overflow="hidden" cursor="pointer" 
                            h={{ base: "400px", md: "450px", lg: "55vh" }} 
                            border="1px solid" borderColor="#1A1A1A" bg="#111111"
                            transition="all 0.3s" _hover={{ borderColor: brandColor, transform: "translateY(-4px)" }}
                        >
                            
                            <Box flex={1} position="relative" overflow="hidden">
                                <Image src={product.image} alt={product.name} w="full" h="full" objectFit="cover" transition="transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)" _groupHover={{ transform: "scale(1.05)" }} />
                            </Box>
                            
                            <Flex p={5} direction="column" justify="flex-end" bg="#111111" zIndex={2}>
                                <Text fontSize="xs" color={brandColor} textTransform="uppercase" fontWeight="bold" letterSpacing="widest" mb={1}>{product.category}</Text>
                                <Text fontSize="xl" fontWeight="black" color="white" lineHeight="1.1" mb={3} lineClamp={1}>{product.name}</Text>
                                <Flex justify="space-between" align="center" mt="auto">
                                    <Text fontSize="lg" fontWeight="bold" color="white">₦{product.price.toLocaleString()}</Text>
                                    {/* OPEN QUICK ADD MODAL */}
                                    <Button 
                                        size="sm" rounded="full" bg={brandColor} color="white" 
                                        _hover={{ filter: "brightness(1.1)" }} display="flex" gap={2} 
                                        onClick={(e) => handleOpenQuickAdd(e, product)}
                                    >
                                        <Icon as={LuShoppingCart} />
                                        <Text>Add</Text>
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    ))}
                </Grid>

                {/* --- INFINITE CATALOG --- */}
                <Box borderTop="1px solid" borderColor="whiteAlpha.100" pt={10}>
                    <Flex justify="space-between" align="flex-end" mb={8}>
                        <Box>
                            <Text fontSize="2xl" fontWeight="black" color="white" letterSpacing="tight">The Catalog</Text>
                            <Text fontSize="sm" color="gray.400">Scroll to explore more</Text>
                        </Box>
                    </Flex>
                    <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gap={{ base: 4, lg: 6 }}>
                        {feedProducts.map((product, index) => (
                            <Flex 
                                key={`feed-${product.id}-${index}`} onClick={() => setSelectedProduct(product)} 
                                role="group" direction="column" bg="#111111" rounded="none" border="1px solid" borderColor="whiteAlpha.100" 
                                overflow="hidden" transition="all 0.2s" _hover={{ borderColor: brandColor, transform: "translateY(-4px)", shadow: "xl" }} 
                                cursor="pointer"
                            >
                                {/* Image Box */}
                                <Box position="relative" bg="whiteAlpha.50" aspectRatio={1} overflow="hidden">
                                    <Badge position="absolute" top={2} left={2} bg={brandColor} color="white" rounded="none" px={2} py={0.5} fontSize="9px" fontWeight="bold" zIndex={10}>{product.isNew ? "NEW" : "TRENDING"}</Badge>
                                    <IconButton position="absolute" top={2} right={2} zIndex={10} aria-label="Wishlist" size="sm" rounded="full" bg="blackAlpha.500" color="white" backdropFilter="blur(4px)" _hover={{ bg: "red.500", color: "white" }} onClick={(e) => e.stopPropagation()}>
                                        <Icon as={LuHeart} boxSize="14px" />
                                    </IconButton>
                                    <Image src={product.image} alt={product.name} w="full" h="full" objectFit="cover" transition="transform 0.6s ease" _groupHover={{ transform: "scale(1.08)" }} />
                                </Box>
                                
                                {/* Text Box */}
                                <Flex p={4} bg="#111111" flex={1} direction="column">
                                    <Text fontSize="10px" color={brandColor} fontWeight="bold" textTransform="uppercase" mb={1}>{product.category}</Text>
                                    <Text fontSize="sm" fontWeight="bold" color="white" lineClamp={1} mb={1}>{product.name}</Text>
                                    <Flex align="center" gap={1} mb={3}>
                                        <Flex gap={0.5}>{[...Array(5)].map((_, i) => (<Icon key={i} as={LuStar} boxSize="10px" fill="yellow.400" color="yellow.400" />))}</Flex>
                                        <Text fontSize="10px" color="gray.500">({product.reviews || 120})</Text>
                                    </Flex>
                                    <Text fontSize="lg" fontWeight="black" color="white" mb={4} mt="auto">₦{product.price.toLocaleString()}</Text>
                                    {/* OPEN QUICK ADD MODAL */}
                                    <Button 
                                        w="full" size="sm" bg="whiteAlpha.100" color="white" rounded="lg" 
                                        _hover={{ bg: brandColor, color: "white" }} display="flex" gap={2} 
                                        onClick={(e) => handleOpenQuickAdd(e, product)}
                                    >
                                        <Icon as={LuShoppingCart} boxSize="14px" />
                                        <Text fontSize="xs" fontWeight="bold">Add to Cart</Text>
                                    </Button>
                                </Flex>
                            </Flex>
                        ))}
                    </Grid>
                    {isLoadingMore && (
                        <Flex justify="center" py={12}>
                            <Spinner size="xl" color={brandColor} />
                        </Flex>
                    )}
                </Box>
            </Box>
        </Box>
    );
}


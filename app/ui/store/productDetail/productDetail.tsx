"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Image, Button, Icon, Badge, IconButton, HStack, VStack, Grid 
} from "@chakra-ui/react";
import { 
    LuHeart, LuShoppingCart, LuArrowLeft, LuTruck, LuShieldCheck, LuUndo2, LuCheck, LuX, LuMinus, LuPlus
} from "react-icons/lu";

import { ProductDetailViewProps } from "@/app/lib/definitions";

type CartItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    variation?: string;
    color?: string;
    [key: string]: unknown;
};

// Reusable native select style for dark mode
const selectStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "transparent",
    color: "white",
    height: "44px",
    borderRadius: "8px",
    padding: "0 16px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    outline: "none",
    cursor: "pointer",
    fontSize: "14px",
    appearance: "none", // hides default arrow to look cleaner
};

export const ProductDetailView = ({ product, onBack, brandColor = "#5cac7d" }: ProductDetailViewProps) => {
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    
    // I initialized state to 'Black' so it appears on load, consistent with standard e-comm behavior.
    const [selectedColor, setSelectedColor] = useState("Black"); 
    
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");

    // Custom Toast State
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<"success" | "error">("success");

    // Mock detailed data (In a real app, you'd fetch this based on the ID)
    const mockImages = [
        product.image,
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=600&auto=format&fit=crop"
    ];

    // --- ADD TO CART LOGIC ---
    const handleAddToCart = () => {
        if (!selectedSize) {
            setToastType("error");
            setToastMessage("Please select a size before adding to cart.");
            setTimeout(() => setToastMessage(null), 3000);
            return;
        }

        try {
            const existingCart: CartItem[] = JSON.parse(localStorage.getItem('tradaz_cart') || '[]');
            
            const existingItemIndex = existingCart.findIndex(
                (item: CartItem) => item.id === product.id && item.variation === selectedSize && item.color === selectedColor
            );

            if (existingItemIndex >= 0) {
                existingCart[existingItemIndex].quantity += quantity;
            } else {
                existingCart.push({ ...product, quantity: quantity, variation: selectedSize, color: selectedColor });
            }

            localStorage.setItem('tradaz_cart', JSON.stringify(existingCart));
            window.dispatchEvent(new Event('cartUpdated'));

            // Show success message
            setToastType("success");
            setToastMessage(`${quantity}x ${product.name} (${selectedSize}, ${selectedColor}) added to cart!`);
            setTimeout(() => setToastMessage(null), 3000);

        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} w="full" maxW="1200px" mx="auto" animation="fade-in 0.3s ease" position="relative">
            
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

            {/* Header / Back Button */}
            <Flex align="center" gap={3} mb={6}>
                <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }} onClick={onBack} px={2} rounded="md" h="40px">
                    <Icon as={LuArrowLeft} boxSize="20px" mr={2} />
                    Back to Store
                </Button>
            </Flex>

            <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={10}>
                
                {/* LEFT COLUMN: Interactive Image Gallery */}
                <Box>
                    <Box bg="#1A1C23" rounded="xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden" mb={4} h={{ base: "400px", md: "480px" }} position="relative">
                        <Badge position="absolute" top={4} right={4} bg="black" color="white" border="1px solid white" rounded="full" px={4} py={1} fontSize="xs" fontWeight="bold" zIndex={10}>
                            {product.isNew ? "New Release" : "Featured"}
                        </Badge>
                        <Image src={mockImages[activeImageIdx]} alt={product.name} w="full" h="full" objectFit="cover" />
                    </Box>
                    <HStack gap={4} overflowX="auto" pb={2} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                        {mockImages.map((img, idx) => (
                            <Box 
                                key={idx} cursor="pointer" flexShrink={0}
                                w="80px" h="80px" rounded="xl" overflow="hidden" 
                                border="2px solid" borderColor={activeImageIdx === idx ? brandColor : "transparent"}
                                opacity={activeImageIdx === idx ? 1 : 0.5}
                                _hover={{ opacity: 1 }} transition="all 0.2s"
                                onClick={() => setActiveImageIdx(idx)}
                            >
                                <Image src={img} alt={`View ${idx + 1}`} w="full" h="full" objectFit="cover" />
                            </Box>
                        ))}
                    </HStack>
                </Box>

                {/* RIGHT COLUMN: Product Details & Actions */}
                <Flex direction="column" justify="flex-start">
                    
                    {/* Top Row: Title, Category & Like Button */}
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Box>
                            <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="bold" fontFamily="serif" color="white" lineHeight="1.1" mb={1}>
                                {product.name}
                            </Text>
                            <Text fontSize="sm" color="gray.400">
                                {product.category || "tripstore"}
                            </Text>
                        </Box>
                        <IconButton 
                            aria-label="Save for later" h="44px" w="44px" rounded="full" bg="transparent" color="gray.400" border="1px solid" borderColor="whiteAlpha.200"
                            _hover={{ bg: "whiteAlpha.100", color: brandColor, borderColor: brandColor }} transition="all 0.2s"
                        >
                            <Icon as={LuHeart} boxSize="20px" />
                        </IconButton>
                    </Flex>
                    
                    {/* Price & Stock status */}
                    <Flex align="baseline" gap={4} mb={6}>
                        <Text fontSize="3xl" fontWeight="black" color="white">
                            ₦{product.price.toLocaleString()}
                        </Text>
                        <Text fontSize="xs" color="red.400" fontWeight="bold">
                            Only 1 left in stock!
                        </Text>
                    </Flex>

                    {/* Variants: Size & Color side-by-side to save space */}
                    <Flex gap={6} mb={6}>
                        {/* Size Selection */}
                        <Box flex={1}>
                            <Text color="white" fontSize="xs" fontWeight="bold" mb={2}>SIZE</Text>
                            <Box position="relative">
                                <select 
                                    style={selectStyle} 
                                    value={selectedSize} 
                                    onChange={(e) => setSelectedSize(e.target.value)}
                                >
                                    <option value="" disabled style={{ background: "#1A1C23" }}>Select size</option>
                                    <option value="S" style={{ background: "#1A1C23" }}>Small (S)</option>
                                    <option value="M" style={{ background: "#1A1C23" }}>Medium (M)</option>
                                    <option value="L" style={{ background: "#1A1C23" }}>Large (L)</option>
                                    <option value="XL" style={{ background: "#1A1C23" }}>Extra Large (XL)</option>
                                </select>
                                <Icon as={LuArrowLeft} transform="rotate(-90deg)" position="absolute" right="16px" top="14px" color="gray.400" pointerEvents="none" />
                            </Box>
                        </Box>

                        {/* Color Selection */}
                        <Box flex={1}>
                            {/* --- THE UPDATE IS HERE --- */}
                            <Text color="white" fontSize="xs" fontWeight="bold" mb={2} textTransform="uppercase">
                                COLOR - {selectedColor}
                            </Text>
                            <Flex gap={3} pt={1}>
                                <Box 
                                    boxSize="34px" rounded="full" bg="black" cursor="pointer"
                                    border="2px solid" borderColor={selectedColor === "Black" ? "white" : "transparent"}
                                    boxShadow={selectedColor === "Black" ? "0 0 0 1px black inset" : "none"}
                                    onClick={() => setSelectedColor("Black")}
                                />
                                <Box 
                                    boxSize="34px" rounded="full" bg="#E5E5E5" cursor="pointer"
                                    border="2px solid" borderColor={selectedColor === "White" ? brandColor : "transparent"}
                                    onClick={() => setSelectedColor("White")}
                                />
                                <Box 
                                    boxSize="34px" rounded="full" bg="#4A5568" cursor="pointer"
                                    border="2px solid" borderColor={selectedColor === "Gray" ? "white" : "transparent"}
                                    onClick={() => setSelectedColor("Gray")}
                                />
                                {/* --- ADDDED RED FOR EXAMPLE --- */}
                                <Box 
                                    boxSize="34px" rounded="full" bg="red.500" cursor="pointer"
                                    border="2px solid" borderColor={selectedColor === "Red" ? "white" : "transparent"}
                                    onClick={() => setSelectedColor("Red")}
                                />
                            </Flex>
                        </Box>
                    </Flex>

                    {/* Quantity & Add to Cart (Side by Side) */}
                    <Flex gap={4} mb={8} h="54px">
                        {/* Quantity Counter */}
                        <Flex align="center" border="1px solid" borderColor="whiteAlpha.200" rounded="md" w="130px" h="full">
                            <IconButton 
                                aria-label="Decrease quantity" variant="ghost" color="white" rounded="none" h="full" w="40px"
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                _hover={{ bg: "whiteAlpha.100" }}
                            >
                                <Icon as={LuMinus} boxSize="14px" />
                            </IconButton>
                            <Text color="white" fontWeight="bold" flex={1} textAlign="center">{quantity}</Text>
                            <IconButton 
                                aria-label="Increase quantity" variant="ghost" color="white" rounded="none" h="full" w="40px"
                                onClick={() => setQuantity(prev => prev + 1)}
                                _hover={{ bg: "whiteAlpha.100" }}
                            >
                                <Icon as={LuPlus} boxSize="14px" />
                            </IconButton>
                        </Flex>

                        {/* Add to Cart Button */}
                        <Button 
                            flex={1} h="full" bg="white" color="black" rounded="md" fontSize="md" fontWeight="bold"
                            _hover={{ bg: "gray.200" }} transition="all 0.2s"
                            display="flex" gap={3} onClick={handleAddToCart}
                        >
                            <Icon as={LuShoppingCart} boxSize="20px" /> Add to Cart
                        </Button>
                    </Flex>

                    {/* Trust Badges (Horizontal, compact) */}
                    <Flex justify="space-between" align="center" py={4} borderTop="1px solid" borderBottom="1px solid" borderColor="whiteAlpha.100" mb={6}>
                        <Flex align="center" gap={2}>
                            <Icon as={LuTruck} boxSize="16px" color="white" />
                            <Text color="gray.300" fontSize="xs" fontWeight="medium">Free Shipping</Text>
                        </Flex>
                        <Flex align="center" gap={2}>
                            <Icon as={LuUndo2} boxSize="16px" color="white" />
                            <Text color="gray.300" fontSize="xs" fontWeight="medium">30-Day Returns</Text>
                        </Flex>
                        <Flex align="center" gap={2}>
                            <Icon as={LuShieldCheck} boxSize="16px" color="white" />
                            <Text color="gray.300" fontSize="xs" fontWeight="medium">Secure Payment</Text>
                        </Flex>
                    </Flex>

                    {/* Bottom Tabs & Content */}
                    <Box bg="#111111" rounded="xl" overflow="hidden">
                        <Flex bg="#1A1C23" borderBottom="1px solid" borderColor="whiteAlpha.100">
                            <Box 
                                flex={1} textAlign="center" py={3} cursor="pointer" fontSize="sm" fontWeight="bold" transition="all 0.2s"
                                color={activeTab === "description" ? "white" : "gray.500"}
                                bg={activeTab === "description" ? "whiteAlpha.100" : "transparent"}
                                onClick={() => setActiveTab("description")}
                            >
                                Description
                            </Box>
                            <Box 
                                flex={1} textAlign="center" py={3} cursor="pointer" fontSize="sm" fontWeight="bold" transition="all 0.2s"
                                color={activeTab === "specifications" ? "white" : "gray.500"}
                                bg={activeTab === "specifications" ? "whiteAlpha.100" : "transparent"}
                                onClick={() => setActiveTab("specifications")}
                            >
                                Specifications
                            </Box>
                            <Box 
                                flex={1} textAlign="center" py={3} cursor="pointer" fontSize="sm" fontWeight="bold" transition="all 0.2s"
                                color={activeTab === "reviews" ? "white" : "gray.500"}
                                bg={activeTab === "reviews" ? "whiteAlpha.100" : "transparent"}
                                onClick={() => setActiveTab("reviews")}
                            >
                                Reviews (0)
                            </Box>
                        </Flex>
                        
                        <Box p={5}>
                            {activeTab === "description" && (
                                <Text color="gray.400" fontSize="sm" lineHeight="tall" animation="fade-in 0.3s ease">
                                    Effortless sophistication meets everyday comfort in this sleek black hoodie—an iconic blend of casual luxe and superior craftsmanship. Designed with soft, premium fabric and impeccable attention to detail, it offers a relaxed fit that seamlessly elevates your off-duty wardrobe. The minimalist embroidery and timeless black hue ensure versatile styling for any occasion.
                                </Text>
                            )}
                            {activeTab === "specifications" && (
                                <VStack align="stretch" gap={3} animation="fade-in 0.3s ease">
                                    <Flex justify="space-between" borderBottom="1px dashed" borderColor="whiteAlpha.200" pb={2}>
                                        <Text color="gray.500" fontSize="sm">Material</Text>
                                        <Text color="white" fontSize="sm" fontWeight="medium">100% Premium Cotton</Text>
                                    </Flex>
                                    <Flex justify="space-between" borderBottom="1px dashed" borderColor="whiteAlpha.200" pb={2}>
                                        <Text color="gray.500" fontSize="sm">Fit</Text>
                                        <Text color="white" fontSize="sm" fontWeight="medium">Relaxed / Oversized</Text>
                                    </Flex>
                                    <Flex justify="space-between">
                                        <Text color="gray.500" fontSize="sm">Care</Text>
                                        <Text color="white" fontSize="sm" fontWeight="medium">Machine Wash Cold</Text>
                                    </Flex>
                                </VStack>
                            )}
                            {activeTab === "reviews" && (
                                <Flex align="center" justify="center" h="100px" animation="fade-in 0.3s ease">
                                    <Text color="gray.500" fontSize="sm" fontStyle="italic">No reviews yet for this product.</Text>
                                </Flex>
                            )}
                        </Box>
                    </Box>

                </Flex>
            </Grid>
        </Box>
    );
};
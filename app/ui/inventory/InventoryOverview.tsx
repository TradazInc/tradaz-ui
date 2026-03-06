"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, Image, HStack, Badge } from "@chakra-ui/react";
import { 
    LuSearch, LuFilter, LuStar, LuPrinter, 
    LuPackagePlus, LuPencil, LuTrash2, LuLoaderCircle, LuChevronDown,
    LuArrowLeft
} from "react-icons/lu";

import { generateDummyInventory } from "@/app/lib/data";
import { InventoryProduct } from "@/app/lib/definitions";

export const InventoryOverview = () => {
    const TOTAL_PRODUCTS = 100;
    const ITEMS_PER_PAGE = 9; 
    
    const [inventory, setInventory] = useState<InventoryProduct[]>(generateDummyInventory(ITEMS_PER_PAGE, 0));
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    
    // --- DETAIL VIEW STATE ---
    const [selectedProduct, setSelectedProduct] = useState<InventoryProduct | null>(null);
    const [activeImageIdx, setActiveImageIdx] = useState(0);

    const handleLoadMore = () => {
        if (inventory.length >= TOTAL_PRODUCTS) return;
        setIsLoadingMore(true);
        setTimeout(() => {
            setInventory(prev => [...prev, ...generateDummyInventory(ITEMS_PER_PAGE, prev.length)]);
            setIsLoadingMore(false);
        }, 800);
    };

    // --- MOCK DETAILED DATA GENERATOR ---
    const getDetailedData = (product: InventoryProduct) => {
        return {
            ...product,
            images: [
                product.image,
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=600&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop"
            ],
            description: "Step into the Future of Fashion with these Stylish Unisex Casual Shoes. They redefine casual footwear, seamlessly blending dynamic design with an all-encompassing appeal for both men and women. Experience a cloud-like sensation with the advanced cushioning technology.",
            specs: { brand: "Tracer", type: "Shoes", gender: "Unisex", status: "Active", created: "2/18/2026" },
            variationsData: [
                { id: "v1", size: "EU41", color: "Navy Blue", colorHex: "#0a192f", stock: 1, salePrice: 87000, costPrice: 51100, sku: `${product.sku}-001` },
                { id: "v2", size: "EU44", color: "Navy Blue", colorHex: "#0a192f", stock: 5, salePrice: 87000, costPrice: 51100, sku: `${product.sku}-002` },
                { id: "v3", size: "EU45", color: "Navy Blue", colorHex: "#0a192f", stock: 0, salePrice: 87000, costPrice: 51100, sku: `${product.sku}-003` },
            ]
        };
    };

    const detailedProduct = selectedProduct ? getDetailedData(selectedProduct) : null;

    // ==========================================
    // RENDER: DETAILED PRODUCT VIEW
    // ==========================================
    if (selectedProduct && detailedProduct) {
        return (
            // ✅ FIX: overflowX="hidden" prevents the entire page from sliding horizontally
            <Box w="full" maxW="100%" overflowX="hidden" display="flex" flexDirection="column" position="relative" pb={10}>
                
                {/* --- Detail Header with Actions --- */}
                {/* ✅ FIX: Removed negative margins (mx={-4}), changed to simple padding */}
                <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(18, 18, 20, 0.85)" backdropFilter="blur(12px)" py={4} mb={6} borderBottom="1px solid" borderColor="whiteAlpha.100" w="full">
                    {/* ✅ FIX: direction column on mobile so buttons don't push off-screen */}
                    <Flex justify="space-between" align={{ base: "flex-start", lg: "center" }} direction={{ base: "column", lg: "row" }} gap={4}>
                        <Flex align="center" gap={4} maxW="full">
                            <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }} onClick={() => { setSelectedProduct(null); setActiveImageIdx(0); }} px={2} h="40px" flexShrink={0}>
                                <Icon as={LuArrowLeft} boxSize="20px" />
                            </Button>
                            <Box overflow="hidden">
                                <Text color="white" fontWeight="bold" fontSize={{ base: "lg", md: "xl" }} lineClamp={1}>{detailedProduct.name}</Text>
                                <Text color="gray.500" fontSize="sm">SKU: {detailedProduct.sku}</Text>
                            </Box>
                        </Flex>

                        {/* Top-Level Actions */}
                        <Flex gap={3} w={{ base: "full", lg: "auto" }} overflowX="auto" pb={{ base: 2, lg: 0 }} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                            <Button size="sm" bg="rgba(92, 172, 125, 0.15)" color="#5cac7d" _hover={{ bg: "rgba(92, 172, 125, 0.25)" }} border="none" flexShrink={0}>
                                <Icon as={LuPackagePlus} mr={2} /> Restock
                            </Button>
                            <Button size="sm" bg="rgba(66, 153, 225, 0.15)" color="blue.300" _hover={{ bg: "rgba(66, 153, 225, 0.25)" }} border="none" flexShrink={0}>
                                <Icon as={LuPencil} mr={2} /> Edit Product
                            </Button>
                            <Button size="sm" bg="rgba(245, 101, 101, 0.15)" color="red.400" _hover={{ bg: "rgba(245, 101, 101, 0.25)" }} border="none" flexShrink={0}>
                                <Icon as={LuTrash2} />
                            </Button>
                        </Flex>
                    </Flex>
                </Box>

                {/* --- Main Info Split --- */}
                <SimpleGrid columns={{ base: 1, lg: 12 }} gap={8} mb={8}>
                    
                    {/* Left: Image Gallery */}
                    <Box gridColumn={{ lg: "span 5" }}>
                        <Box bg="#1A1C23" rounded="xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden" mb={4} h={{ base: "300px", md: "400px" }}>
                            <Image src={detailedProduct.images[activeImageIdx]} alt="Main Product" w="full" h="full" objectFit="cover" />
                        </Box>
                        <HStack gap={3} overflowX="auto" pb={2} css={{ '&::-webkit-scrollbar': { height: '4px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.2)', borderRadius: '4px' } }}>
                            {detailedProduct.images.map((img, idx) => (
                                <Box 
                                    key={idx} cursor="pointer" flexShrink={0}
                                    w="80px" h="80px" rounded="md" overflow="hidden" 
                                    border="2px solid" borderColor={activeImageIdx === idx ? "#5cac7d" : "transparent"}
                                    onClick={() => setActiveImageIdx(idx)}
                                >
                                    <Image src={img} w="full" h="full" objectFit="cover" />
                                </Box>
                            ))}
                        </HStack>
                    </Box>

                    {/* Right: Product Details & Specs */}
                    <Box gridColumn={{ lg: "span 7" }} bg="#1A1C23" rounded="xl" border="1px solid" borderColor="whiteAlpha.100" p={{ base: 4, md: 6 }} h="fit-content">
                        <Flex justify="space-between" align="start" direction={{ base: "column", sm: "row" }} gap={4} mb={4}>
                            <Box>
                                <Text color="white" fontSize="2xl" fontWeight="black" mb={2} lineHeight="1.2">{detailedProduct.name}</Text>
                                <Flex wrap="wrap" gap={2}>
                                    <Badge bg="rgba(92, 172, 125, 0.15)" color="#5cac7d" px={2} py={0.5} rounded="md">Active</Badge>
                                    <Badge bg="#121214" border="1px solid" borderColor="whiteAlpha.200" color="gray.300" px={2} py={0.5} rounded="md" textTransform="none">{detailedProduct.specs.brand}</Badge>
                                    <Badge bg="#121214" border="1px solid" borderColor="whiteAlpha.200" color="gray.300" px={2} py={0.5} rounded="md" textTransform="none">{detailedProduct.specs.gender}</Badge>
                                </Flex>
                            </Box>
                            <Text color="#5cac7d" fontSize="3xl" fontWeight="bold">₦{detailedProduct.price.toLocaleString()}</Text>
                        </Flex>

                        <Box mb={6}>
                            <Text color="gray.300" fontWeight="bold" mb={2}>Description</Text>
                            <Text color="gray.400" fontSize="sm" lineHeight="tall">{detailedProduct.description}</Text>
                        </Box>

                        <Box bg="#121214" p={4} rounded="lg" border="1px solid" borderColor="whiteAlpha.50">
                            <Text color="gray.300" fontWeight="bold" mb={3}>Categories</Text>
                            <Flex wrap="wrap" gap={2}>
                                <Badge bg="rgba(66, 153, 225, 0.15)" color="blue.300" px={3} py={1} rounded="full" textTransform="none">Sport Wears</Badge>
                                <Badge bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.200" color="gray.300" px={3} py={1} rounded="full" textTransform="none">Foot Wears</Badge>
                            </Flex>
                        </Box>
                    </Box>
                </SimpleGrid>

                {/* --- Clean Variations Table --- */}
                <Box bg="#1A1C23" rounded="xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden" w="full">
                    <Box p={6} borderBottom="1px solid" borderColor="whiteAlpha.50">
                        <Text color="white" fontWeight="bold" fontSize="lg">Inventory & Variations</Text>
                        <Text color="gray.500" fontSize="sm">Manage stock levels and pricing per variant.</Text>
                    </Box>

                    {/* ✅ FIX: overflowX="auto" is here, but constrained by parent w="full" so it slides nicely inside the box */}
                    <Box overflowX="auto" w="full" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' } }}>
                        <Box as="table" w="full" minW="800px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                            <Box as="thead" bg="#121214">
                                <Box as="tr">
                                    {["Variant", "SKU", "Cost Price", "Sale Price", "Profit", "Stock", ""].map((head, i) => (
                                        <Box as="th" key={i} py={4} px={6} color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">{head}</Box>
                                    ))}
                                </Box>
                            </Box>
                            <Box as="tbody">
                                {detailedProduct.variationsData.map((v, i) => {
                                    const profit = v.salePrice - v.costPrice;
                                    const isLowStock = v.stock > 0 && v.stock < 5;
                                    const isOutOfStock = v.stock === 0;

                                    return (
                                        <Box as="tr" key={i} borderBottom="1px solid" borderColor="whiteAlpha.50" _hover={{ bg: "whiteAlpha.50" }}>
                                            <Box as="td" py={4} px={6}>
                                                <Flex align="center" gap={3}>
                                                    <Box boxSize="16px" rounded="full" bg={v.colorHex} border="1px solid rgba(255,255,255,0.2)" />
                                                    <Box>
                                                        <Text color="white" fontSize="sm" fontWeight="bold">{v.size}</Text>
                                                        <Text color="gray.500" fontSize="xs">{v.color}</Text>
                                                    </Box>
                                                </Flex>
                                            </Box>
                                            <Box as="td" py={4} px={6}><Text color="gray.400" fontSize="sm" fontFamily="monospace">{v.sku}</Text></Box>
                                            <Box as="td" py={4} px={6}><Text color="gray.400" fontSize="sm">₦{v.costPrice.toLocaleString()}</Text></Box>
                                            <Box as="td" py={4} px={6}><Text color="white" fontSize="sm" fontWeight="bold">₦{v.salePrice.toLocaleString()}</Text></Box>
                                            <Box as="td" py={4} px={6}><Text color="#5cac7d" fontSize="sm" fontWeight="bold">₦{profit.toLocaleString()}</Text></Box>
                                            <Box as="td" py={4} px={6}>
                                                <Badge 
                                                    bg={isOutOfStock ? "rgba(245, 101, 101, 0.15)" : isLowStock ? "rgba(237, 137, 54, 0.15)" : "rgba(92, 172, 125, 0.15)"} 
                                                    color={isOutOfStock ? "red.400" : isLowStock ? "orange.400" : "#5cac7d"} 
                                                    px={2} py={1} rounded="md"
                                                >
                                                    {v.stock} units
                                                </Badge>
                                            </Box>
                                            <Box as="td" py={4} px={6} textAlign="right">
                                                <Button size="sm" variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.200" }} px={2}>
                                                    <Icon as={LuPencil} />
                                                </Button>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    // ==========================================
    // RENDER: STANDARD INVENTORY GRID
    // ==========================================
    return (
        <Box w="full" maxW="100%" overflowX="hidden" display="flex" flexDirection="column" position="relative">
            
            {/* --- Header & Toolbar --- */}
            {/* ✅ FIX: Removed negative margins. Header now strictly follows container boundaries. */}
            <Box 
                position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} 
                bg="rgba(18, 18, 20, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} borderBottom="1px solid" borderColor="whiteAlpha.100" w="full"
            >
                <Flex direction={{ base: "column", xl: "row" }} justify="space-between" align={{ base: "stretch", xl: "flex-end" }} gap={4} w="full">
                    <Box w={{ base: "full", xl: "auto" }}>
                        <Text color="#5cac7d" fontWeight="bold" fontSize="2xl" mb={1}>Inventory</Text>
                        <Text color="gray.400" fontSize="sm">
                            Showing <Text as="span" color="white" fontWeight="bold">{inventory.length}</Text> of <Text as="span" color="white" fontWeight="bold">{TOTAL_PRODUCTS}</Text> products
                        </Text>
                    </Box>
                    
                    {/* ✅ FIX: Reorganized responsive layout so search doesn't overflow mobile width */}
                    <Flex direction={{ base: "column", md: "row" }} gap={3} w={{ base: "full", xl: "auto" }}>
                        <Flex w="full" minW={{ base: "0", md: "300px" }} align="center" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" px={3} _focusWithin={{ borderColor: "#5cac7d" }}>
                            <Icon as={LuSearch} color="gray.400" />
                            <Input placeholder="Search products..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="40px" />
                        </Flex>
                        
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
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6} mb={8} w="full">
                {inventory.map((product) => (
                    <Box key={product.id} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden" _hover={{ borderColor: "whiteAlpha.300", shadow: "2xl" }} transition="all 0.2s">
                        
                        {/* ✅ FIX: Removed the buggy 'group' boolean prop. Now uses pure 'role="group"' */}
                        <Box position="relative" h="280px" w="full" bg="#121214" cursor="pointer" onClick={() => setSelectedProduct(product)} role="group">
                            <Image src={product.image} alt={product.name} w="full" h="full" objectFit="cover" opacity={0.9} transition="all 0.4s ease" _groupHover={{ transform: "scale(1.05)", opacity: 1 }} />
                            
                            <Flex position="absolute" inset={0} bg="blackAlpha.600" opacity={0} _groupHover={{ opacity: 1 }} transition="all 0.3s" justify="center" align="center">
                                <Button bg="#5cac7d" color="white" border="none" shadow="xl" _hover={{ bg: "#4a9c6d", transform: "translateY(-2px)" }}>View Details</Button>
                            </Flex>

                            {product.isFeatured && (
                                <Box position="absolute" top={3} right={3} bg="blackAlpha.800" color="white" fontSize="xs" fontWeight="bold" px={3} py={1} rounded="md" backdropFilter="blur(4px)">
                                    Featured
                                </Box>
                            )}
                        </Box>

                        <Box p={5}>
                            <Flex justify="space-between" align="start" mb={4}>
                                <Text color="white" fontWeight="bold" fontSize="lg" lineClamp={1} flex={1} pr={2}>
                                    {product.name}
                                </Text>
                                <Icon as={LuStar} color={product.isFavorite ? "orange.400" : "gray.600"} fill={product.isFavorite ? "orange.400" : "transparent"} boxSize="18px" cursor="pointer" transition="color 0.2s" />
                            </Flex>
                            
                            <Flex justify="space-between" align="center" mb={3} borderBottom="1px solid" borderColor="whiteAlpha.50" pb={3}>
                                <Text color="gray.400" fontSize="xs">SKU: <Text as="span" color="gray.300" fontFamily="monospace">{product.sku}</Text></Text>
                                <Icon as={LuPrinter} color="gray.400" cursor="pointer" _hover={{ color: "white" }} boxSize="14px" />
                            </Flex>

                            <Flex justify="space-between" align="center" mb={4}>
                                <Box>
                                    <Text color="gray.400" fontSize="xs" mb={1}>Variations: <Text as="span" color="white" fontWeight="bold">{product.variations}</Text></Text>
                                    <Text color="gray.400" fontSize="xs">Stock: <Text as="span" color={product.stock < 5 ? "red.400" : "white"} fontWeight={product.stock < 5 ? "bold" : "normal"}>{product.stock}</Text></Text>
                                </Box>
                                <Text color="#5cac7d" fontWeight="black" fontSize="xl">₦{product.price.toLocaleString()}</Text>
                            </Flex>

                            <Flex gap={2}>
                                <Button flex={1} size="sm" bg="rgba(92, 172, 125, 0.15)" color="#5cac7d" _hover={{ bg: "rgba(92, 172, 125, 0.25)" }} border="none" fontSize="xs" px={0}>
                                    <Icon as={LuPackagePlus} mr={1.5} boxSize="14px" /> Restock
                                </Button>
                                <Button flex={1} size="sm" bg="rgba(66, 153, 225, 0.15)" color="blue.300" _hover={{ bg: "rgba(66, 153, 225, 0.25)" }} border="none" fontSize="xs" px={0}>
                                    <Icon as={LuPencil} mr={1.5} boxSize="14px" /> Edit
                                </Button>
                                <Button flex={1} size="sm" bg="rgba(245, 101, 101, 0.15)" color="red.400" _hover={{ bg: "rgba(245, 101, 101, 0.25)" }} border="none" fontSize="xs" px={0}>
                                    <Icon as={LuTrash2} mr={1.5} boxSize="14px" /> Delete
                                </Button>
                            </Flex>
                        </Box>
                    </Box>
                ))}
            </SimpleGrid>

            {inventory.length < TOTAL_PRODUCTS && (
                <Flex justify="center" py={4} mb={8}>
                    <Button 
                        onClick={handleLoadMore} disabled={isLoadingMore} 
                        bg="#1A1C23" color="white" border="1px solid" borderColor="whiteAlpha.200"
                        _hover={{ bg: "whiteAlpha.100", borderColor: "whiteAlpha.300" }} px={8} py={6} rounded="full" shadow="lg"
                    >
                        {isLoadingMore ? <Icon as={LuLoaderCircle} animation="spin 1s linear infinite" /> : "Load More Products"}
                    </Button>
                </Flex>
            )}

        </Box>
    );
};
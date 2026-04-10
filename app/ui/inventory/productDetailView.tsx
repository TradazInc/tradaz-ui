"use client";
import React from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Button, Image, HStack, Badge } from "@chakra-ui/react";
import { LuPackagePlus, LuPencil, LuTrash2, LuArrowLeft } from "react-icons/lu";
import { InventoryProduct } from "@/app/lib/definitions";


export interface ProductVariation {
    id: string;
    size: string;
    color: string;
    colorHex: string;
    stock: number;
    salePrice: number;
    costPrice: number;
    sku: string;
}


export interface DetailedInventoryProduct extends InventoryProduct {
    images: string[];
    description: string;
    specs: {
        brand: string;
        type: string;
        gender: string;
        status: string;
        created: string;
    };
    variationsData: ProductVariation[];
}

interface ProductDetailViewProps {
    product: DetailedInventoryProduct; 
    activeImageIdx: number;
    setActiveImageIdx: (idx: number) => void;
    onBack: () => void;
}

export const ProductDetailView = ({ product, activeImageIdx, setActiveImageIdx, onBack }: ProductDetailViewProps) => {
    return (
        <Box w="full" maxW="100%" display="flex" flexDirection="column" position="relative" pb={10}>
            
            {/* Detail Header */}
            <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(18, 18, 20, 0.85)" backdropFilter="blur(12px)" py={4} mb={6} borderBottom="1px solid" borderColor="whiteAlpha.100" w="full">
                <Flex justify="space-between" align={{ base: "flex-start", lg: "center" }} direction={{ base: "column", lg: "row" }} gap={4}>
                    <Flex align="center" gap={4} maxW="full">
                        <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }} onClick={onBack} px={2} h="40px" flexShrink={0}>
                            <Icon as={LuArrowLeft} boxSize="20px" />
                        </Button>
                        <Box overflow="hidden">
                            <Text color="white" fontWeight="bold" fontSize={{ base: "lg", md: "xl" }} lineClamp={1}>{product.name}</Text>
                            <Text color="gray.500" fontSize="sm">SKU: {product.sku}</Text>
                        </Box>
                    </Flex>
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

            {/* Main Info Split */}
            <SimpleGrid columns={{ base: 1, lg: 12 }} gap={8} mb={8}>
                <Box gridColumn={{ lg: "span 5" }}>
                    <Box bg="#1A1C23" rounded="xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden" mb={4} h={{ base: "300px", md: "400px" }}>
                        <Image src={product.images[activeImageIdx]} alt="Main Product" w="full" h="full" objectFit="cover" />
                    </Box>
                    <HStack gap={3} overflowX="auto" pb={2} css={{ '&::-webkit-scrollbar': { height: '4px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.2)', borderRadius: '4px' } }}>
                        {product.images.map((img, idx) => (
                            <Box key={idx} cursor="pointer" flexShrink={0} w="80px" h="80px" rounded="md" overflow="hidden" border="2px solid" borderColor={activeImageIdx === idx ? "#5cac7d" : "transparent"} onClick={() => setActiveImageIdx(idx)}>
                                <Image src={img} alt={`thumbnail ${idx + 1}`} w="full" h="full" objectFit="cover" />
                            </Box>
                        ))}
                    </HStack>
                </Box>
                <Box gridColumn={{ lg: "span 7" }} bg="#1A1C23" rounded="xl" border="1px solid" borderColor="whiteAlpha.100" p={{ base: 4, md: 6 }} h="fit-content">
                    <Flex justify="space-between" align="start" direction={{ base: "column", sm: "row" }} gap={4} mb={4}>
                        <Box>
                            <Text color="white" fontSize="2xl" fontWeight="black" mb={2} lineHeight="1.2">{product.name}</Text>
                            <Flex wrap="wrap" gap={2}>
                                <Badge bg="rgba(92, 172, 125, 0.15)" color="#5cac7d" px={2} py={0.5} rounded="md">Active</Badge>
                                <Badge bg="#121214" border="1px solid" borderColor="whiteAlpha.200" color="gray.300" px={2} py={0.5} rounded="md" textTransform="none">{product.specs.brand}</Badge>
                                <Badge bg="#121214" border="1px solid" borderColor="whiteAlpha.200" color="gray.300" px={2} py={0.5} rounded="md" textTransform="none">{product.specs.gender}</Badge>
                            </Flex>
                        </Box>
                        <Text color="#5cac7d" fontSize="3xl" fontWeight="bold">₦{product.price.toLocaleString()}</Text>
                    </Flex>
                    <Box mb={6}>
                        <Text color="gray.300" fontWeight="bold" mb={2}>Description</Text>
                        <Text color="gray.400" fontSize="sm" lineHeight="tall">{product.description}</Text>
                    </Box>
                </Box>
            </SimpleGrid>
            
            {/* Inventory Variations Table */}
            <Box bg="#1A1C23" rounded="xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden" w="full">
                <Box p={6} borderBottom="1px solid" borderColor="whiteAlpha.50">
                    <Text color="white" fontWeight="bold" fontSize="lg">Inventory & Variations</Text>
                </Box>
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
                            
                            {product.variationsData.map((v: ProductVariation, i: number) => {
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
                                            <Badge bg={isOutOfStock ? "rgba(245, 101, 101, 0.15)" : isLowStock ? "rgba(237, 137, 54, 0.15)" : "rgba(92, 172, 125, 0.15)"} color={isOutOfStock ? "red.400" : isLowStock ? "orange.400" : "#5cac7d"} px={2} py={1} rounded="md">
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
};
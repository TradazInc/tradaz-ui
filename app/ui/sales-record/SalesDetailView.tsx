"use client";
import React from "react";
// 🚀 1. Removed 'Divider' from imports
import { Box, Flex, Text, SimpleGrid, Icon, Button } from "@chakra-ui/react";
// 🚀 2. Swapped LuCheckCircle2 for LuCheckCircle
import { LuArrowLeft, LuPrinter, LuDownload, LuReceipt, LuCircleCheck } from "react-icons/lu";
import { SalesRecord } from "@/app/lib/definitions";

interface SalesDetailViewProps {
    sale: SalesRecord;
    onBack: () => void;
}

export const SalesDetailView = ({ sale, onBack }: SalesDetailViewProps) => {
    const subtotal = sale.total + sale.discount;
    const vat = subtotal * 0.075; 
    
    
    const referenceId = `TXN-${sale.id.replace(/[^0-9]/g, '') || "99281"}`;

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative" pb={10}>
            
            {/* Header / Back Button */}
            <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)" py={4} mb={6} borderBottom="1px solid" borderColor="whiteAlpha.100">
                <Flex justify="space-between" align="center">
                    <Flex align="center" gap={4}>
                        <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }} onClick={onBack} px={2} h="40px">
                            <Icon as={LuArrowLeft} boxSize="20px" />
                        </Button>
                        <Box>
                            <Text color="white" fontWeight="bold" fontSize="xl">Order {sale.id}</Text>
                            <Text color="gray.500" fontSize="sm">{sale.date}</Text>
                        </Box>
                    </Flex>
                    <Flex gap={2}>
                        <Button size="sm" variant="outline" color="white" borderColor="whiteAlpha.200" _hover={{ bg: "whiteAlpha.100" }}>
                            <Icon as={LuDownload} mr={2} /> PDF
                        </Button>
                        <Button size="sm" bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} border="none">
                            <Icon as={LuPrinter} mr={2} /> Print Receipt
                        </Button>
                    </Flex>
                </Flex>
            </Box>

            <SimpleGrid columns={{ base: 1, lg: 12 }} gap={8}>
                
                {/* Left Column: Receipt Breakdown */}
                <Box gridColumn={{ lg: "span 8" }}>
                    <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden">
                        <Flex align="center" gap={3} p={6} borderBottom="1px solid" borderColor="whiteAlpha.50">
                            <Flex bg="rgba(92, 172, 125, 0.15)" p={2} rounded="lg"><Icon as={LuReceipt} color="#5cac7d" boxSize="20px" /></Flex>
                            <Text color="white" fontWeight="bold" fontSize="lg">Transaction Details</Text>
                        </Flex>

                        {/* Mock Items List */}
                        <Box p={6}>
                            <Box w="full" mb={6}>
                                <Flex justify="space-between" color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" mb={3}>
                                    <Text>Item</Text>
                                    <Text>Amount</Text>
                                </Flex>
                                
                                <Flex justify="space-between" align="center" py={3} borderBottom="1px dashed" borderColor="whiteAlpha.200">
                                    <Box>
                                        <Text color="white" fontSize="sm" fontWeight="bold">Premium Cotton T-Shirt</Text>
                                        <Text color="gray.500" fontSize="xs">Size: L | Color: Black</Text>
                                    </Box>
                                    <Text color="white" fontSize="sm">₦{(subtotal * 0.6).toLocaleString()}</Text>
                                </Flex>

                                <Flex justify="space-between" align="center" py={3} borderBottom="1px dashed" borderColor="whiteAlpha.200">
                                    <Box>
                                        <Text color="white" fontSize="sm" fontWeight="bold">Classic Denim Jeans</Text>
                                        <Text color="gray.500" fontSize="xs">Size: 32</Text>
                                    </Box>
                                    <Text color="white" fontSize="sm">₦{(subtotal * 0.4).toLocaleString()}</Text>
                                </Flex>
                            </Box>

                            {/* Totals Calculation */}
                            <Flex direction="column" gap={3} w={{ base: "full", sm: "300px" }} ml="auto">
                                <Flex justify="space-between">
                                    <Text color="gray.400" fontSize="sm">Subtotal</Text>
                                    <Text color="white" fontSize="sm">₦{subtotal.toLocaleString()}</Text>
                                </Flex>
                                <Flex justify="space-between">
                                    <Text color="gray.400" fontSize="sm">VAT (7.5%)</Text>
                                    <Text color="white" fontSize="sm">₦{vat.toLocaleString()}</Text>
                                </Flex>
                                {sale.discount > 0 && (
                                    <Flex justify="space-between">
                                        <Text color="red.400" fontSize="sm">Discount Applied</Text>
                                        <Text color="red.400" fontSize="sm">- ₦{sale.discount.toLocaleString()}</Text>
                                    </Flex>
                                )}
                                
                                {/* 🚀 Replaced Divider with a pure Box */}
                                <Box w="full" borderBottom="1px solid" borderColor="whiteAlpha.200" my={1} />
                                
                                <Flex justify="space-between" align="center">
                                    <Text color="white" fontWeight="bold" fontSize="lg">Total</Text>
                                    <Text color="#5cac7d" fontWeight="black" fontSize="2xl">₦{sale.total.toLocaleString()}</Text>
                                </Flex>
                            </Flex>
                        </Box>
                    </Box>
                </Box>

                {/* Right Column: Customer & Payment Info */}
                <Box gridColumn={{ lg: "span 4" }}>
                    
                    <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6} mb={6}>
                        <Text color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" mb={4}>Customer Information</Text>
                        <Text color="white" fontWeight="bold" fontSize="lg" mb={1}>{sale.transaction}</Text>
                        <Text color="gray.500" fontSize="sm">Walk-in Customer</Text>
                    </Box>

                    <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6}>
                        <Text color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" mb={4}>Payment Details</Text>
                        
                        <Flex align="center" gap={3} mb={4}>
                            <Icon as={LuCircleCheck} color="#5cac7d" boxSize="24px" />
                            <Box>
                                <Text color="white" fontWeight="bold" fontSize="md">Payment Successful</Text>
                                <Text color="gray.500" fontSize="xs">{sale.date}</Text>
                            </Box>
                        </Flex>

                        <Flex justify="space-between" py={2} borderTop="1px solid" borderColor="whiteAlpha.100">
                            <Text color="gray.400" fontSize="sm">Channel</Text>
                            <Text color="white" fontSize="sm" fontWeight="bold">{sale.type}</Text>
                        </Flex>
                        <Flex justify="space-between" py={2} borderTop="1px solid" borderColor="whiteAlpha.100">
                            <Text color="gray.400" fontSize="sm">Method</Text>
                            <Text color="white" fontSize="sm" fontWeight="bold">{sale.payment}</Text>
                        </Flex>
                        <Flex justify="space-between" py={2} borderTop="1px solid" borderColor="whiteAlpha.100">
                            <Text color="gray.400" fontSize="sm">Reference</Text>
                            <Text color="gray.300" fontSize="sm" fontFamily="monospace">{referenceId}</Text>
                        </Flex>
                    </Box>

                </Box>
            </SimpleGrid>
        </Box>
    );
};
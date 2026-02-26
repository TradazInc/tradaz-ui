"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, IconButton } from "@chakra-ui/react";
import { 
    LuSearch, LuScanLine, LuTrash2, LuMinus, LuPlus, 
    LuUser, LuArrowRight, LuTag 
} from "react-icons/lu";


import { initialPosCart } from "@/app/lib/data";

const inputStyles = {
    bg: "#121214",
    border: "1px solid",
    borderColor: "whiteAlpha.200",
    color: "white",
    rounded: "lg",
    _focus: { borderColor: "#5cac7d", outline: "none", boxShadow: "0 0 0 1px #5cac7d" },
    _hover: { borderColor: "whiteAlpha.300" }
};

export const PosOverview = () => {
    // --- STATE: DUMMY CART DATA ---
    const [cart, setCart] = useState(initialPosCart);

    // --- CALCULATIONS ---
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const vat = subtotal * 0.075; 
    const total = subtotal + vat;

    // --- CART ACTIONS ---
    const updateQty = (id: string, delta: number) => {
        setCart(cart.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, Math.min(item.qty + delta, item.stock));
                return { ...item, qty: newQty };
            }
            return item;
        }));
    };

    const removeItem = (id: string) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const clearCart = () => setCart([]);

    return (
        <Flex gap={8} direction={{ base: "column", xl: "row" }} w="full" position="relative">
            
            {/*LEFT COLUMN: SCANNER & CART TABLE */}
            <Box flex={1} display="flex" flexDirection="column" gap={6}>
                
                {/* Search & Action Bar */}
                <Flex gap={4} wrap="wrap">
                    <Flex flex={1} minW="300px" align="center" bg="#1A1C23" border="2px solid" borderColor="#5cac7d" rounded="xl" px={4} h="56px" shadow="0 0 15px rgba(92, 172, 125, 0.15)">
                        <Icon as={LuScanLine} color="#5cac7d" boxSize="20px" mr={3} />
                        <Input placeholder="Scan barcode or type product name/SKU..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" fontSize="md" fontWeight="medium" />
                        <Icon as={LuSearch} color="gray.500" cursor="pointer" />
                    </Flex>
                    
                    <Flex gap={2}>
                        <Button variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }} h="56px" px={6} bg="#1A1C23" onClick={clearCart}>
                            Clear Cart
                        </Button>
                        <Button variant="outline" borderColor="orange.400" color="orange.400" _hover={{ bg: "rgba(237, 137, 54, 0.1)" }} h="56px" px={6} bg="#1A1C23">
                            Pause Sale
                        </Button>
                    </Flex>
                </Flex>

                {/* Cart Table Area */}
                <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" minH="500px" display="flex" flexDirection="column">
                    
                    {/* Table Header */}
                    <Flex bg="#121214" px={6} py={4} borderBottom="1px solid" borderColor="whiteAlpha.100" borderTopRadius="2xl">
                        <Text flex={2} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">Item</Text>
                        <Text flex={1} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="center">Price</Text>
                        <Text flex={1} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="center">Qty</Text>
                        <Text flex={1} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="right">Subtotal</Text>
                        <Box w="40px" /> 
                    </Flex>

                    {/* Table Body (Scrollable) */}
                    <Box flex={1} overflowY="auto" css={{ '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' } }}>
                        {cart.length === 0 ? (
                            <Flex h="100%" align="center" justify="center" direction="column" py={20}>
                                <Icon as={LuScanLine} boxSize="48px" color="whiteAlpha.200" mb={4} />
                                <Text color="gray.500" fontSize="lg">No products added.</Text>
                                <Text color="gray.600" fontSize="sm">Scan a barcode or search to begin.</Text>
                            </Flex>
                        ) : (
                            cart.map((item) => (
                                <Flex key={item.id} px={6} py={5} borderBottom="1px solid" borderColor="whiteAlpha.50" align="center" _hover={{ bg: "whiteAlpha.50" }} transition="background 0.2s">
                                    
                                    {/* Item Info */}
                                    <Box flex={2} pr={4}>
                                        <Text color="white" fontWeight="bold" fontSize="md" lineClamp={1}>{item.name}</Text>
                                        <Text color="gray.500" fontSize="xs">{item.variant}</Text>
                                    </Box>

                                    {/* Price */}
                                    <Text flex={1} color="gray.300" fontSize="sm" fontWeight="medium" textAlign="center">
                                        ₦{item.price.toLocaleString()}
                                    </Text>

                                    {/* Qty Controls */}
                                    <Flex flex={1} justify="center" align="center">
                                        <Flex bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" p={1} align="center">
                                            <IconButton aria-label="Decrease" size="xs" variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.200" }} onClick={() => updateQty(item.id, -1)}>
                                                <Icon as={LuMinus} />
                                            </IconButton>
                                            
                                            <Text w="30px" textAlign="center" color="white" fontWeight="bold" fontSize="sm">{item.qty}</Text>
                                            
                                            <IconButton aria-label="Increase" size="xs" variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.200" }} onClick={() => updateQty(item.id, 1)}>
                                                <Icon as={LuPlus} />
                                            </IconButton>
                                        </Flex>
                                    </Flex>

                                    {/* Subtotal */}
                                    <Text flex={1} color="white" fontSize="md" fontWeight="bold" textAlign="right">
                                        ₦{(item.price * item.qty).toLocaleString()}
                                    </Text>

                                    {/* Action */}
                                    <Flex justify="flex-end" w="40px" pl={4}>
                                        <IconButton aria-label="Remove" size="sm" variant="ghost" color="red.400" _hover={{ bg: "rgba(245, 101, 101, 0.15)" }} onClick={() => removeItem(item.id)}>
                                            <Icon as={LuTrash2} />
                                        </IconButton>
                                    </Flex>
                                </Flex>
                            ))
                        )}
                    </Box>
                </Box>
            </Box>


          
            <Box w={{ base: "full", xl: "400px" }}>
                <Box 
                    bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6} 
                    position="sticky" top={{ base: "70px", md: "85px" }} shadow="xl"
                >
                    <Text color="white" fontWeight="bold" fontSize="xl" mb={6}>Sale Summary</Text>
                    
                    {/* Financials Breakdown */}
                    <Box mb={6}>
                        <Flex justify="space-between" mb={3}>
                            <Text color="gray.400" fontSize="md">Subtotal</Text>
                            <Text color="white" fontSize="md" fontWeight="bold">₦{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </Flex>
                        <Flex justify="space-between" mb={3}>
                            <Text color="gray.400" fontSize="md">VAT (7.5%)</Text>
                            <Text color="white" fontSize="md" fontWeight="bold">₦{vat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </Flex>
                        
                        <Box w="full" borderTop="1px dashed" borderColor="whiteAlpha.200" my={4} />
                        
                        <Flex justify="space-between" align="center">
                            <Text color="gray.300" fontSize="lg" fontWeight="bold">Total Due</Text>
                            <Text color="#5cac7d" fontSize="3xl" fontWeight="black">₦{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                        </Flex>
                    </Box>

                    {/* Customer & Discounts */}
                    <Flex direction="column" gap={4} mb={8}>
                        <Box>
                            <Flex as="button" w="full" h="48px" px={4} align="center" justify="space-between" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" color="gray.400" fontSize="sm" _hover={{ borderColor: "whiteAlpha.400" }}>
                                <Flex align="center" gap={2}><Icon as={LuTag} /> Apply Coupon/Discount</Flex>
                                <Icon as={LuPlus} />
                            </Flex>
                        </Box>
                        <Box>
                            <Flex as="button" w="full" h="48px" px={4} align="center" justify="space-between" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" color="gray.400" fontSize="sm" _hover={{ borderColor: "whiteAlpha.400" }}>
                                <Flex align="center" gap={2}><Icon as={LuUser} /> Attach Customer Info</Flex>
                                <Icon as={LuPlus} />
                            </Flex>
                        </Box>
                        
                        {/* Payment Method */}
                        <Box>
                            <Text color="gray.400" fontSize="xs" mb={2}>Payment Method</Text>
                            <Box as="select" w="full" h="48px" px={4} {...inputStyles} cursor="pointer">
                                <option value="card" style={{ background: "#1A1C23" }}>💳 Debit / Credit Card (POS)</option>
                                <option value="cash" style={{ background: "#1A1C23" }}>💵 Cash Payment</option>
                                <option value="transfer" style={{ background: "#1A1C23" }}>🏦 Bank Transfer</option>
                            </Box>
                        </Box>
                    </Flex>

                    {/* Action Buttons */}
                    <Flex direction="column" gap={3}>
                        <Button 
                            w="full" h="64px" bg="#5cac7d" color="white" fontSize="lg" fontWeight="bold" border="none"
                            _hover={{ bg: "#4a9c6d", transform: "translateY(-2px)", shadow: "0 10px 20px rgba(92, 172, 125, 0.3)" }}
                            _active={{ transform: "translateY(0)" }} transition="all 0.2s"
                            disabled={cart.length === 0}
                        >
                            Finalize Sale <Icon as={LuArrowRight} ml={2} />
                        </Button>
                        <Button w="full" h="48px" variant="outline" borderColor="whiteAlpha.200" color="gray.300" _hover={{ bg: "whiteAlpha.50", color: "white" }} disabled={cart.length === 0}>
                            Print Invoice Only
                        </Button>
                    </Flex>

                </Box>
            </Box>

        </Flex>
    );
};
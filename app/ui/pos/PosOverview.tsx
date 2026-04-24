"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Icon, Input, Button, IconButton, VStack, SimpleGrid, Spinner, Badge, Separator
} from "@chakra-ui/react";
import { 
    LuSearch, LuScanLine, LuTrash2, LuMinus, LuPlus, 
    LuUser, LuArrowRight, LuTag, LuArrowLeft, LuCheck, 
    LuCreditCard, LuBanknote, LuPrinter, LuTrophy, LuX
} from "react-icons/lu";

import { initialPosCart } from "@/app/lib/data";

const inputStyles = {
    bg: "#0A0A0A",
    border: "1px solid",
    borderColor: "#1A1A1A",
    color: "white",
    rounded: "md",
    _focus: { borderColor: "white", outline: "none", boxShadow: "0 0 0 1px white" },
    _hover: { borderColor: "#333333" }
};

export const PosOverview = () => {
    // --- STATE: CART ---
    const [cart, setCart] = useState(initialPosCart);

    // --- STATE: CHECKOUT FLOW ---
    const [checkoutStep, setCheckoutStep] = useState(0); 
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Form State
    const [customerInfo, setCustomerInfo] = useState("");
    const [coupon, setCoupon] = useState("");
    const [pointsBalance, setPointsBalance] = useState<number | null>(null);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [amountTendered, setAmountTendered] = useState("");

    // --- CALCULATIONS ---
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const vat = subtotal * 0.075; 
    const couponDiscount = coupon === "TRADAZ10" ? (subtotal * 0.1) : 0;
    const loyaltyDiscount = pointsBalance ? 5000 : 0; 
    const total = subtotal + vat - couponDiscount - loyaltyDiscount;

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

    const removeItem = (id: string) => setCart(cart.filter(item => item.id !== id));
    const clearCart = () => {
        setCart([]);
        resetCheckout();
    };

    // --- CHECKOUT ACTIONS ---
    const handleCheckCustomer = () => setPointsBalance(15000); 
    
    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setCheckoutStep(3); 
        }, 1500);
    };

    const resetCheckout = () => {
        setCheckoutStep(0);
        setCustomerInfo("");
        setCoupon("");
        setPointsBalance(null);
        setPaymentMethod("card");
        setAmountTendered("");
    };

    const startNewSale = () => {
        setCart([]);
        resetCheckout();
    };

    return (
        <Flex gap={4} direction={{ base: "column", xl: "row" }} w="full" position="relative" h="full" bg="#000000">
            
            {/* LEFT COLUMN: SCANNER & CART TABLE */}
            <Box flex={1} display="flex" flexDirection="column" gap={4} maxH="calc(100vh - 100px)">
                
                {/* Search & Action Bar */}
                <Flex gap={4} wrap="wrap">
                    <Flex flex={1} minW="300px" align="center" bg="#0A0A0A" border="1px solid #1A1A1A" rounded="lg" px={4} h="56px">
                        <Icon as={LuScanLine} color="white" boxSize="20px" mr={3} />
                        <Input placeholder="Scan barcode or type product name/SKU..." bg="transparent" border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" fontSize="md" fontWeight="medium" rounded="none" />
                        <Icon as={LuSearch} color="gray.500" cursor="pointer" _hover={{ color: "white" }} />
                    </Flex>
                    
                    <Flex gap={2}>
                        <Button variant="outline" rounded="lg" border="1px solid #1A1A1A" color="white" _hover={{ bg: "#111111" }} h="56px" px={6} bg="#0A0A0A" onClick={clearCart}>
                            Clear Cart
                        </Button>
                        <Button variant="outline" rounded="lg" border="1px solid #1A1A1A" color="white" _hover={{ bg: "#111111" }} h="56px" px={6} bg="#0A0A0A">
                            Pause Sale
                        </Button>
                    </Flex>
                </Flex>

                {/* Cart Table Area */}
                <Box bg="#0A0A0A" rounded="lg" border="1px solid #1A1A1A" flex={1} display="flex" flexDirection="column" overflow="hidden">
                    
                    <Flex bg="#111111" px={6} py={4} borderBottom="1px solid #1A1A1A">
                        <Text flex={2} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">Item</Text>
                        <Text flex={1} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="center">Price</Text>
                        <Text flex={1} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="center">Qty</Text>
                        <Text flex={1} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="right">Subtotal</Text>
                        <Box w="40px" /> 
                    </Flex>

                    <Box flex={1} overflowY="auto" css={{ '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#1A1A1A', borderRadius: '4px' } }}>
                        {cart.length === 0 ? (
                            <Flex h="100%" align="center" justify="center" direction="column" py={20}>
                                <Icon as={LuScanLine} boxSize="48px" color="#333333" mb={4} />
                                <Text color="gray.500" fontSize="lg">No products added.</Text>
                                <Text color="gray.600" fontSize="sm">Scan a barcode or search to begin.</Text>
                            </Flex>
                        ) : (
                            cart.map((item) => (
                                <Flex key={item.id} px={6} py={5} borderBottom="1px solid #1A1A1A" align="center" _hover={{ bg: "#111111" }} transition="background 0.2s">
                                    <Box flex={2} pr={4}>
                                        <Text color="white" fontWeight="bold" fontSize="md" lineClamp={1}>{item.name}</Text>
                                        <Text color="gray.500" fontSize="xs">{item.variant}</Text>
                                    </Box>

                                    <Text flex={1} color="gray.300" fontSize="sm" fontWeight="medium" textAlign="center">
                                        ₦{item.price.toLocaleString()}
                                    </Text>

                                    <Flex flex={1} justify="center" align="center">
                                        <Flex bg="#0A0A0A" border="1px solid #1A1A1A" rounded="md" p={1} align="center">
                                            <IconButton aria-label="Decrease" size="xs" variant="ghost" color="gray.400" _hover={{ color: "white", bg: "#1A1A1A" }} rounded="md" onClick={() => updateQty(item.id, -1)} disabled={checkoutStep > 0}>
                                                <Icon as={LuMinus} />
                                            </IconButton>
                                            <Text w="30px" textAlign="center" color="white" fontWeight="bold" fontSize="sm">{item.qty}</Text>
                                            <IconButton aria-label="Increase" size="xs" variant="ghost" color="gray.400" _hover={{ color: "white", bg: "#1A1A1A" }} rounded="md" onClick={() => updateQty(item.id, 1)} disabled={checkoutStep > 0}>
                                                <Icon as={LuPlus} />
                                            </IconButton>
                                        </Flex>
                                    </Flex>

                                    <Text flex={1} color="white" fontSize="md" fontWeight="bold" textAlign="right">
                                        ₦{(item.price * item.qty).toLocaleString()}
                                    </Text>

                                    <Flex justify="flex-end" w="40px" pl={4}>
                                        <IconButton aria-label="Remove" size="sm" variant="ghost" color="gray.400" _hover={{ bg: "#1A1A1A", color: "white" }} rounded="md" onClick={() => removeItem(item.id)} disabled={checkoutStep > 0}>
                                            <Icon as={LuTrash2} />
                                        </IconButton>
                                    </Flex>
                                </Flex>
                            ))
                        )}
                    </Box>
                </Box>
            </Box>


            {/* RIGHT COLUMN: DYNAMIC CHECKOUT SIDEBAR */}
            <Box w={{ base: "full", xl: "400px" }} display="flex" flexDirection="column">
                <Box 
                    bg="#0A0A0A" rounded="lg" border="1px solid #1A1A1A" 
                    display="flex" flexDirection="column" overflow="hidden" h="full"
                >
                    
                    {/* --- DYNAMIC HEADER --- */}
                    <Flex align="center" justify="space-between" p={6} borderBottom="1px solid #1A1A1A">
                        <Flex align="center" gap={3}>
                            {checkoutStep > 0 && checkoutStep < 3 && (
                                <IconButton aria-label="Back" variant="ghost" color="white" size="sm" rounded="md" onClick={() => setCheckoutStep(prev => prev - 1)} _hover={{ bg: "#111111" }}>
                                    <Icon as={LuArrowLeft} boxSize="20px" />
                                </IconButton>
                            )}
                            <Text color="white" fontWeight="bold" fontSize="xl">
                                {checkoutStep === 0 ? "Sale Summary" : checkoutStep === 1 ? "Customer & Discounts" : checkoutStep === 2 ? "Payment" : "Sale Complete"}
                            </Text>
                        </Flex>
                        {checkoutStep > 0 && checkoutStep < 3 && (
                            <IconButton aria-label="Cancel" variant="ghost" color="gray.400" size="sm" rounded="md" onClick={resetCheckout} _hover={{ bg: "#111111", color: "white" }}>
                                <Icon as={LuX} boxSize="20px" />
                            </IconButton>
                        )}
                    </Flex>

                    {/* --- DYNAMIC BODY --- */}
                    <Box flex={1} overflowY="auto" p={6} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                        
                        {/* STEP 0: INITIAL SUMMARY */}
                        {checkoutStep === 0 && (
                            <VStack align="stretch" gap={0} h="full" animation="fade-in 0.3s ease">
                                <Box mb={6}>
                                    <Flex justify="space-between" mb={3}>
                                        <Text color="gray.400" fontSize="md">Subtotal</Text>
                                        <Text color="white" fontSize="md" fontWeight="bold">₦{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                    </Flex>
                                    <Flex justify="space-between" mb={3}>
                                        <Text color="gray.400" fontSize="md">VAT (7.5%)</Text>
                                        <Text color="white" fontSize="md" fontWeight="bold">₦{vat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                    </Flex>
                                    <Box w="full" borderTop="1px dashed #1A1A1A" my={4} />
                                    <Flex justify="space-between" align="center">
                                        <Text color="gray.300" fontSize="lg" fontWeight="bold">Total Due</Text>
                                        <Text color="white" fontSize="3xl" fontWeight="black">₦{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                    </Flex>
                                </Box>

                                {/* Quick Action Hints */}
                                <Flex direction="column" gap={3} mt="auto">
                                    <Flex align="center" gap={3} p={3} bg="#111111" rounded="md" border="1px solid #1A1A1A">
                                        <Icon as={LuUser} color="gray.400" />
                                        <Text color="gray.400" fontSize="sm">Link customer to award loyalty points.</Text>
                                    </Flex>
                                    <Flex align="center" gap={3} p={3} bg="#111111" rounded="md" border="1px solid #1A1A1A">
                                        <Icon as={LuTag} color="gray.400" />
                                        <Text color="gray.400" fontSize="sm">Apply coupons before payment.</Text>
                                    </Flex>
                                </Flex>
                            </VStack>
                        )}

                        {/* STEP 1: CUSTOMER & DISCOUNTS */}
                        {checkoutStep === 1 && (
                            <VStack gap={6} align="stretch" animation="fade-in 0.3s ease">
                                
                                <Box>
                                    <Text fontSize="sm" fontWeight="bold" color="gray.300" mb={2}>Link Customer</Text>
                                    <Input placeholder="Enter Phone or Email" {...inputStyles} h="48px" value={customerInfo} onChange={(e) => setCustomerInfo(e.target.value)} mb={2} />
                                    <Button w="full" bg="#111111" color="white" rounded="md" border="1px solid #1A1A1A" _hover={{ bg: "#1A1A1A" }} onClick={handleCheckCustomer}>
                                        <Icon as={LuUser} mr={2} /> Lookup / Register
                                    </Button>
                                    
                                    {pointsBalance !== null && (
                                        <Box mt={4} bg="#111111" p={4} rounded="md" border="1px solid #1A1A1A">
                                            <Flex align="center" justify="space-between" mb={2}>
                                                <Flex gap={2} align="center">
                                                    <Icon as={LuTrophy} color="white" />
                                                    <Text color="white" fontWeight="bold">Loyalty Status</Text>
                                                </Flex>
                                                <Badge bg="white" color="black" rounded="sm" border="none">{pointsBalance.toLocaleString()} Pts</Badge>
                                            </Flex>
                                            <Text color="gray.400" fontSize="xs">Customer verified. Applying maximum allowed discount (₦5,000).</Text>
                                        </Box>
                                    )}
                                </Box>

                                <Separator borderColor="#1A1A1A" />

                                <Box>
                                    <Text fontSize="sm" fontWeight="bold" color="gray.300" mb={2}>Apply Coupon</Text>
                                    <Flex gap={2}>
                                        <Input placeholder="e.g. TRADAZ10" {...inputStyles} h="48px" value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())} />
                                        <Button h="48px" px={6} bg="#111111" border="1px solid #1A1A1A" color="white" rounded="md" _hover={{ bg: "#1A1A1A" }}>Apply</Button>
                                    </Flex>
                                    {couponDiscount > 0 && <Text color="white" fontSize="sm" mt={2} fontWeight="bold">Valid! - ₦{couponDiscount.toLocaleString()} applied.</Text>}
                                </Box>
                            </VStack>
                        )}

                        {/* STEP 2: PAYMENT */}
                        {checkoutStep === 2 && (
                            <VStack gap={6} align="stretch" animation="fade-in 0.3s ease">
                                
                                <Box bg="#111111" p={5} rounded="md" border="1px solid #1A1A1A">
                                    <Text color="gray.400" fontSize="sm" mb={1}>Amount to Collect</Text>
                                    <Text color="white" fontSize="3xl" fontWeight="black">₦{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                </Box>

                                <Box>
                                    <Text fontSize="sm" fontWeight="bold" color="gray.300" mb={3}>Select Payment Method</Text>
                                    <SimpleGrid columns={2} gap={3}>
                                        <Box 
                                            p={4} border="1px solid" rounded="md" cursor="pointer" textAlign="center" transition="all 0.2s"
                                            borderColor={paymentMethod === 'card' ? "white" : "#1A1A1A"}
                                            bg={paymentMethod === 'card' ? "#111111" : "#0A0A0A"}
                                            onClick={() => setPaymentMethod('card')}
                                            _hover={{ borderColor: paymentMethod !== 'card' ? "#333333" : "white" }}
                                        >
                                            <Icon as={LuCreditCard} boxSize="28px" color={paymentMethod === 'card' ? "white" : "gray.400"} mb={2} />
                                            <Text fontWeight="bold" fontSize="sm" color="white">Card Terminal</Text>
                                        </Box>
                                        <Box 
                                            p={4} border="1px solid" rounded="md" cursor="pointer" textAlign="center" transition="all 0.2s"
                                            borderColor={paymentMethod === 'cash' ? "white" : "#1A1A1A"}
                                            bg={paymentMethod === 'cash' ? "#111111" : "#0A0A0A"}
                                            onClick={() => setPaymentMethod('cash')}
                                            _hover={{ borderColor: paymentMethod !== 'cash' ? "#333333" : "white" }}
                                        >
                                            <Icon as={LuBanknote} boxSize="28px" color={paymentMethod === 'cash' ? "white" : "gray.400"} mb={2} />
                                            <Text fontWeight="bold" fontSize="sm" color="white">Cash</Text>
                                        </Box>
                                    </SimpleGrid>
                                </Box>

                                {paymentMethod === 'cash' && (
                                    <Box animation="fade-in 0.2s ease">
                                        <Text fontSize="sm" fontWeight="bold" color="gray.300" mb={2}>Amount Tendered (₦)</Text>
                                        <Input type="number" placeholder="Enter cash received" {...inputStyles} h="50px" fontSize="lg" fontWeight="bold" value={amountTendered} onChange={(e) => setAmountTendered(e.target.value)} />
                                        
                                        {Number(amountTendered) >= total && (
                                            <Flex justify="space-between" align="center" mt={3} p={3} bg="#111111" border="1px solid #1A1A1A" rounded="md">
                                                <Text color="gray.300" fontWeight="bold">Change Due:</Text>
                                                <Text color="white" fontWeight="black" fontSize="lg">₦{(Number(amountTendered) - total).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                            </Flex>
                                        )}
                                    </Box>
                                )}
                            </VStack>
                        )}

                        {/* STEP 3: SUCCESS */}
                        {checkoutStep === 3 && (
                            <Flex direction="column" align="center" justify="center" h="full" animation="fade-in 0.3s ease" textAlign="center">
                                <Icon as={LuCheck} color="white" boxSize="80px" mb={6} />
                                <Text fontSize="3xl" fontWeight="black" color="white" mb={2}>Payment Received</Text>
                                <Text color="gray.400" mb={8}>Order <Text as="span" color="white" fontWeight="bold">#POS-8829</Text> has been recorded successfully.</Text>
                                
                                <VStack w="full" gap={3}>
                                    <Button w="full" h="56px" bg="#111111" rounded="md" border="1px solid #1A1A1A" color="white" _hover={{ bg: "#1A1A1A" }} display="flex" gap={2}>
                                        <Icon as={LuPrinter} /> Print Physical Receipt
                                    </Button>
                                    <Button w="full" h="56px" rounded="md" bg="white" color="black" _hover={{ bg: "gray.200" }} onClick={startNewSale}>
                                        Start New Sale
                                    </Button>
                                </VStack>
                            </Flex>
                        )}
                    </Box>

                    {/* --- DYNAMIC FOOTER ACTIONS --- */}
                    <Box p={6} borderTop="1px solid #1A1A1A" bg="#111111">
                        {checkoutStep === 0 && (
                            <Button 
                                w="full" h="64px" bg="white" color="black" rounded="md" fontSize="lg" fontWeight="bold" border="none"
                                _hover={{ bg: "gray.200" }}
                                transition="all 0.2s" disabled={cart.length === 0} onClick={() => setCheckoutStep(1)}
                            >
                                Checkout <Icon as={LuArrowRight} ml={2} />
                            </Button>
                        )}
                        
                        {checkoutStep === 1 && (
                            <Button 
                                w="full" h="60px" bg="white" color="black" rounded="md" fontSize="lg" fontWeight="bold"
                                _hover={{ bg: "gray.200" }} onClick={() => setCheckoutStep(2)}
                            >
                                Proceed to Payment
                            </Button>
                        )}

                        {checkoutStep === 2 && (
                            <Button 
                                w="full" h="60px" bg="white" color="black" rounded="md" fontSize="lg" fontWeight="bold"
                                _hover={{ bg: "gray.200" }} onClick={handlePayment} disabled={isProcessing || (paymentMethod === 'cash' && Number(amountTendered) < total)}
                            >
                                {isProcessing ? <Spinner color="black" /> : `Record Payment of ₦${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>

        </Flex>
    );
};
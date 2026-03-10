"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Button, Icon, IconButton, VStack, Spinner, Separator, Input 
} from "@chakra-ui/react";
import { 
    LuArrowLeft, LuX, LuMapPin, LuTruck, LuCreditCard, LuCheck, LuTicket
} from "react-icons/lu";

interface CheckoutDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    cartTotal: number;
    brandColor: string;
}

export const CheckoutDrawer = ({ isOpen, onClose, cartTotal, brandColor }: CheckoutDrawerProps) => {
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        country: "Nigeria",
        state: "",
        address: "",
        landmark: "",
        phone: "",
        coupon: ""
    });

    // Delivery Rates, linked from admin logistic settings when BE is ready
    const deliveryRates = [
        { id: "standard", name: "Standard Delivery", price: 3500, eta: "3-5 Business Days" },
        { id: "express", name: "Express Delivery", price: 7500, eta: "1-2 Business Days" }
    ];
    const [selectedDeliveryId, setSelectedDeliveryId] = useState("standard");
    const [selectedPayment, setSelectedPayment] = useState("paystack");

    const activeDelivery = deliveryRates.find(d => d.id === selectedDeliveryId) || deliveryRates[0];
    const discount = formData.coupon === "TRADAZ10" ? (cartTotal * 0.1) : 0; 
    const finalTotal = cartTotal + activeDelivery.price - discount;

    const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
    if (isOpen !== prevIsOpen) {
        setPrevIsOpen(isOpen);
        if (isOpen) setStep(1);
    }
    
    const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

    const handlePayment = () => {
        setIsProcessing(true);
        // POST /api/orders payload goes here
        setTimeout(() => {
            setIsProcessing(false);
            alert("Payment successful! Redirecting to order success page...");
            onClose();
        }, 2000);
    };

    return (
        <Box position="fixed" inset={0} zIndex={9999} pointerEvents={isOpen ? "auto" : "none"}>
            <Box position="absolute" inset={0} bg="blackAlpha.600" backdropFilter="blur(4px)" opacity={isOpen ? 1 : 0} transition="opacity 0.3s ease" onClick={onClose} />

            <Flex 
                position="absolute" top={0} right={0} h="100vh" w={{ base: "full", sm: "450px" }}
                bg="#121212" borderLeft="1px solid" borderColor="whiteAlpha.100" direction="column" shadow="2xl"
                transform={isOpen ? "translateX(0)" : "translateX(100%)"} transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            >
                {/* Drawer Header */}
                <Flex align="center" justify="space-between" p={6} borderBottom="1px solid" borderColor="whiteAlpha.100">
                    <Flex align="center" gap={3}>
                        {step > 1 ? (
                            <IconButton aria-label="Back" variant="ghost" color="white" size="sm" onClick={handleBack} _hover={{ bg: "whiteAlpha.100" }}>
                                <Icon as={LuArrowLeft} boxSize="20px" />
                            </IconButton>
                        ) : (
                            <Icon as={LuCheck} color={brandColor} boxSize="20px" />
                        )}
                        <Text fontSize="xl" fontWeight="black" color="white">Secure Checkout</Text>
                    </Flex>
                    <IconButton aria-label="Close" variant="ghost" color="gray.400" rounded="full" _hover={{ bg: "whiteAlpha.100", color: "white" }} onClick={onClose}>
                        <Icon as={LuX} boxSize="20px" />
                    </IconButton>
                </Flex>

                {/* Progress Indicators */}
                <Flex px={6} py={4} bg="#1A1C23" borderBottom="1px solid" borderColor="whiteAlpha.50" gap={2}>
                    {[1, 2, 3].map((s) => (
                        <Box key={s} flex={1} h="4px" rounded="full" bg={s <= step ? brandColor : "whiteAlpha.100"} transition="all 0.3s" />
                    ))}
                </Flex>

                {/* Drawer Body */}
                <Box flex={1} overflowY="auto" p={6} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                    
                    {/* STEP 1: Verify Information */}
                    {step === 1 && (
                        <VStack align="stretch" gap={4} animation="fade-in 0.3s ease">
                            <Flex align="center" gap={2} mb={2}>
                                <Icon as={LuMapPin} color={brandColor} />
                                <Text color="white" fontWeight="bold" fontSize="lg">Shipping Address</Text>
                            </Flex>
                            <Input placeholder="Country" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.200" color="white" h="50px" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} _focus={{ borderColor: brandColor }} />
                            <Input placeholder="State / Province" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.200" color="white" h="50px" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} _focus={{ borderColor: brandColor }} />
                            <Input placeholder="Full Delivery Address" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.200" color="white" h="50px" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} _focus={{ borderColor: brandColor }} />
                            <Input placeholder="Landmark (Optional)" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.200" color="white" h="50px" value={formData.landmark} onChange={(e) => setFormData({...formData, landmark: e.target.value})} _focus={{ borderColor: brandColor }} />
                            <Input placeholder="Phone Number" type="tel" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.200" color="white" h="50px" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} _focus={{ borderColor: brandColor }} />
                        </VStack>
                    )}

                    {/* Delivery & Coupons */}
                    {step === 2 && (
                        <VStack align="stretch" gap={6} animation="fade-in 0.3s ease">
                            <Box>
                                <Flex align="center" gap={2} mb={4}>
                                    <Icon as={LuTruck} color={brandColor} />
                                    <Text color="white" fontWeight="bold" fontSize="lg">Delivery Method</Text>
                                </Flex>
                                <VStack gap={3}>
                                    {deliveryRates.map((method) => (
                                        <Box 
                                            key={method.id} w="full" p={4} rounded="xl" cursor="pointer" transition="all 0.2s"
                                            bg={selectedDeliveryId === method.id ? "rgba(92, 172, 125, 0.1)" : "#1A1C23"}
                                            border="1px solid" borderColor={selectedDeliveryId === method.id ? brandColor : "whiteAlpha.100"}
                                            onClick={() => setSelectedDeliveryId(method.id)}
                                        >
                                            <Flex justify="space-between" align="center" mb={1}>
                                                <Text color="white" fontWeight="bold">{method.name}</Text>
                                                <Text color={brandColor} fontWeight="black">₦{method.price.toLocaleString()}</Text>
                                            </Flex>
                                            <Text color="gray.500" fontSize="sm">{method.eta}</Text>
                                        </Box>
                                    ))}
                                </VStack>
                            </Box>

                            <Separator borderColor="whiteAlpha.100" />

                            <Box>
                                <Flex align="center" gap={2} mb={4}>
                                    <Icon as={LuTicket} color={brandColor} />
                                    <Text color="white" fontWeight="bold" fontSize="lg">Discount Code</Text>
                                </Flex>
                                <Flex gap={2}>
                                    <Input placeholder="Enter coupon code" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.200" color="white" h="50px" value={formData.coupon} onChange={(e) => setFormData({...formData, coupon: e.target.value.toUpperCase()})} _focus={{ borderColor: brandColor }} />
                                    <Button h="50px" px={6} bg="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.300" }}>Apply</Button>
                                </Flex>
                                {discount > 0 && <Text color={brandColor} fontSize="sm" mt={2} fontWeight="bold">Coupon applied! You saved ₦{discount.toLocaleString()}</Text>}
                            </Box>
                        </VStack>
                    )}

                    {/*  Payment Method */}
                    {step === 3 && (
                        <VStack align="stretch" gap={6} animation="fade-in 0.3s ease">
                            <Flex align="center" gap={2} mb={2}>
                                <Icon as={LuCreditCard} color={brandColor} />
                                <Text color="white" fontWeight="bold" fontSize="lg">Payment Method</Text>
                            </Flex>
                            <VStack gap={3}>
                                {[
                                    { id: "paystack", name: "Paystack (Card, Transfer, USSD)" },
                                    { id: "transfer", name: "Direct Bank Transfer" }
                                ].map((method) => (
                                    <Box 
                                        key={method.id} w="full" p={4} rounded="xl" cursor="pointer" transition="all 0.2s"
                                        bg={selectedPayment === method.id ? "rgba(92, 172, 125, 0.1)" : "#1A1C23"}
                                        border="1px solid" borderColor={selectedPayment === method.id ? brandColor : "whiteAlpha.100"}
                                        onClick={() => setSelectedPayment(method.id)}
                                    >
                                        <Text color="white" fontWeight="bold">{method.name}</Text>
                                    </Box>
                                ))}
                            </VStack>

                            <Box bg="#1A1C23" p={5} rounded="xl" border="1px solid" borderColor="whiteAlpha.100" mt={4}>
                                <VStack gap={2} align="stretch">
                                    <Flex justify="space-between"><Text color="gray.400" fontSize="sm">Items Total</Text><Text color="white">₦{cartTotal.toLocaleString()}</Text></Flex>
                                    <Flex justify="space-between"><Text color="gray.400" fontSize="sm">Delivery</Text><Text color="white">₦{activeDelivery.price.toLocaleString()}</Text></Flex>
                                    {discount > 0 && <Flex justify="space-between"><Text color="brandColor" fontSize="sm">Discount</Text><Text color={brandColor}>- ₦{discount.toLocaleString()}</Text></Flex>}
                                    <Separator borderColor="whiteAlpha.100" my={2} />
                                    <Flex justify="space-between" align="center"><Text color="white" fontWeight="bold">Total to Pay</Text><Text color={brandColor} fontSize="2xl" fontWeight="black">₦{finalTotal.toLocaleString()}</Text></Flex>
                                </VStack>
                            </Box>
                        </VStack>
                    )}
                </Box>

                {/* Drawer Footer / Action Button */}
                <Box p={6} borderTop="1px solid" borderColor="whiteAlpha.100" bg="#121212">
                    {step < 3 ? (
                        <Button w="full" h="60px" bg={brandColor} color="white" rounded="xl" fontSize="lg" fontWeight="bold" _hover={{ filter: "brightness(1.1)" }} onClick={handleNext}>
                            Proceed to {step === 1 ? "Delivery" : "Payment"}
                        </Button>
                    ) : (
                        <Button w="full" h="60px" bg={brandColor} color="white" rounded="xl" fontSize="lg" fontWeight="bold" _hover={{ filter: "brightness(1.1)" }} onClick={handlePayment} disabled={isProcessing}>
                            {isProcessing ? <Spinner color="white" /> : `Pay ₦${finalTotal.toLocaleString()}`}
                        </Button>
                    )}
                </Box>
            </Flex>
        </Box>
    );
};
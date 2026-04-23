"use client";
import React from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Button, Badge } from "@chakra-ui/react";
import { LuArrowLeft, LuTruck, LuUser, LuMapPin, LuCreditCard, LuPackage } from "react-icons/lu";
import { OnlineOrder } from "@/app/lib/definitions";

interface OnlineOrderDetailViewProps {
    order: OnlineOrder;
    onBack: () => void;
}

export const OnlineOrderDetailView = ({ order, onBack }: OnlineOrderDetailViewProps) => {
    
    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Delivered": return { bg: "#111111", color: "white", border: "1px solid white" };
            case "Shipped": return { bg: "#111111", color: "#888888", border: "1px solid #888888" };
            case "Processing": return { bg: "transparent", color: "white", border: "1px dashed #888888" };
            case "Cancelled": return { bg: "#111111", color: "white", border: "1px solid #333333", textDecoration: "line-through" };
            default: return { bg: "transparent", color: "#888888", border: "1px solid #333333" }; 
        }
    };
    
    const statusStyle = getStatusStyle(order.status);
    const trackingId = `TRK-${order.id.replace(/[^0-9]/g, '') || "9827"}`;

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative" pb={10}>
            
            {/* Header */}
            <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)" py={4} mb={6} borderBottom="1px solid" borderColor="#1A1A1A">
                <Flex justify="space-between" align="center">
                    <Flex align="center" gap={4}>
                        <Button variant="ghost" color="#888888" rounded="none" _hover={{ color: "white", bg: "#111111" }} onClick={onBack} px={2} h="40px">
                            <Icon as={LuArrowLeft} boxSize="20px" strokeWidth="2.5" />
                        </Button>
                        <Box>
                            <Flex align="center" gap={3}>
                                <Text color="white" fontWeight="bold" fontSize="xl" letterSpacing="tight">Order {order.id}</Text>
                                <Badge bg={statusStyle.bg} color={statusStyle.color} border={statusStyle.border} px={2} py={0.5} rounded="none" textTransform="uppercase" letterSpacing="wider" fontSize="10px">
                                    {order.status}
                                </Badge>
                            </Flex>
                            <Text color="#888888" fontSize="sm" fontWeight="500">Placed on {order.date}</Text>
                        </Box>
                    </Flex>
                    <Button size="sm" bg="white" color="black" rounded="none" fontWeight="bold" _hover={{ bg: "#E5E5E5" }} border="none">
                        Update Status
                    </Button>
                </Flex>
            </Box>

            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8}>
                
                {/* Left Side: Order Items */}
                <Box gridColumn={{ lg: "span 2" }}>
                    <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" overflow="hidden">
                        <Flex align="center" gap={3} p={6} borderBottom="1px solid" borderColor="#1A1A1A">
                            <Flex bg="#111111" p={2} rounded="none" border="1px solid #333333"><Icon as={LuPackage} color="white" boxSize="20px" strokeWidth="2.5" /></Flex>
                            <Text color="white" fontWeight="bold" fontSize="lg" letterSpacing="tight">Order Items</Text>
                        </Flex>

                        <Box p={6}>
                            <Flex justify="space-between" align="center" py={3} borderBottom="1px dashed" borderColor="#333333">
                                <Box>
                                    <Text color="white" fontSize="sm" fontWeight="bold">Item #1 Dummy Product</Text>
                                    <Text color="#888888" fontSize="xs" fontWeight="500">Qty: 1</Text>
                                </Box>
                                <Text color="white" fontSize="sm" fontWeight="600">₦{(order.total * 0.7).toLocaleString()}</Text>
                            </Flex>

                            <Flex justify="space-between" align="center" py={3} borderBottom="1px dashed" borderColor="#333333">
                                <Box>
                                    <Text color="white" fontSize="sm" fontWeight="bold">Item #2 Dummy Product</Text>
                                    <Text color="#888888" fontSize="xs" fontWeight="500">Qty: 2</Text>
                                </Box>
                                <Text color="white" fontSize="sm" fontWeight="600">₦{(order.total * 0.3).toLocaleString()}</Text>
                            </Flex>

                            <Flex direction="column" gap={3} w={{ base: "full", sm: "300px" }} ml="auto" mt={6}>
                                <Flex justify="space-between">
                                    <Text color="#888888" fontSize="sm" fontWeight="500">Subtotal</Text>
                                    <Text color="white" fontSize="sm" fontWeight="600">₦{order.total.toLocaleString()}</Text>
                                </Flex>
                                <Flex justify="space-between">
                                    <Text color="#888888" fontSize="sm" fontWeight="500">Shipping Fee</Text>
                                    <Text color="white" fontSize="sm" fontWeight="600">₦2,500</Text>
                                </Flex>
                                <Box w="full" borderBottom="1px solid" borderColor="#333333" my={1} />
                                <Flex justify="space-between" align="center">
                                    <Text color="white" fontWeight="bold" fontSize="lg" letterSpacing="tight">Total Paid</Text>
                                    <Text color="white" fontWeight="black" fontSize="2xl" letterSpacing="tight">₦{(order.total + 2500).toLocaleString()}</Text>
                                </Flex>
                            </Flex>
                        </Box>
                    </Box>
                </Box>

                {/* Right Side: Customer, Shipping, Payment */}
                <Box gridColumn={{ lg: "span 1" }} display="flex" flexDirection="column" gap={6}>
                    
                    {/* Customer Info */}
                    <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" p={6}>
                        <Flex align="center" gap={3} mb={4}>
                            <Icon as={LuUser} color="white" boxSize="18px" strokeWidth="2.5" />
                            <Text color="white" fontWeight="bold" letterSpacing="tight">Customer</Text>
                        </Flex>
                        <Text color="white" fontSize="sm" fontWeight="600" mb={1}>{order.customer}</Text>
                        <Text color="#888888" fontSize="xs" fontWeight="500">Registered User</Text>
                    </Box>

                    {/* Shipping Info */}
                    <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" p={6}>
                        <Flex align="center" gap={3} mb={4}>
                            <Icon as={LuTruck} color="white" boxSize="18px" strokeWidth="2.5" />
                            <Text color="white" fontWeight="bold" letterSpacing="tight">Shipping Details</Text>
                        </Flex>
                        <Text color="white" fontSize="sm" fontWeight="600" mb={1}>{order.shippingMethod}</Text>
                        <Text color="#888888" fontSize="xs" fontWeight="500" mb={4}>Tracking: <Text as="span" fontFamily="monospace" color="white" fontWeight="bold">{trackingId}</Text></Text>
                        
                        <Flex gap={2} align="start" p={3} bg="#111111" rounded="none" border="1px solid" borderColor="#333333">
                            <Icon as={LuMapPin} color="#888888" mt={1} strokeWidth="2.5" />
                            <Text color="#888888" fontSize="xs" fontWeight="500">123 Dummy Street, Phase 2, FCT Abuja, Nigeria</Text>
                        </Flex>
                    </Box>

                    {/* Payment Info */}
                    <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" p={6}>
                        <Flex align="center" gap={3} mb={4}>
                            <Icon as={LuCreditCard} color="white" boxSize="18px" strokeWidth="2.5" />
                            <Text color="white" fontWeight="bold" letterSpacing="tight">Payment Details</Text>
                        </Flex>
                        <Flex justify="space-between" mb={2}>
                            <Text color="#888888" fontSize="xs" fontWeight="500">Status</Text>
                            <Text color={order.paymentStatus === "Paid" ? "white" : "#888888"} fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{order.paymentStatus}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text color="#888888" fontSize="xs" fontWeight="500">Method</Text>
                            <Text color="white" fontSize="xs" fontWeight="600">Paystack Gateway</Text>
                        </Flex>
                    </Box>

                </Box>
            </SimpleGrid>
        </Box>
    );
};
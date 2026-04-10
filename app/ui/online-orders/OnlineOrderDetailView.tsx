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
    // Determine badge color locally based on status
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Delivered": return { bg: "rgba(92, 172, 125, 0.15)", color: "#5cac7d" };
            case "Shipped": return { bg: "rgba(66, 153, 225, 0.15)", color: "blue.400" };
            case "Processing": return { bg: "rgba(237, 137, 54, 0.15)", color: "orange.400" };
            case "Cancelled": return { bg: "rgba(245, 101, 101, 0.15)", color: "red.400" };
            default: return { bg: "whiteAlpha.200", color: "gray.300" }; 
        }
    };
    
    const statusStyle = getStatusColor(order.status);
    const trackingId = `TRK-${order.id.replace(/[^0-9]/g, '') || "9827"}`;

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative" pb={10}>
            
            {/* Header */}
            <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)" py={4} mb={6} borderBottom="1px solid" borderColor="whiteAlpha.100">
                <Flex justify="space-between" align="center">
                    <Flex align="center" gap={4}>
                        <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }} onClick={onBack} px={2} h="40px">
                            <Icon as={LuArrowLeft} boxSize="20px" />
                        </Button>
                        <Box>
                            <Flex align="center" gap={3}>
                                <Text color="white" fontWeight="bold" fontSize="xl">Order {order.id}</Text>
                                <Badge bg={statusStyle.bg} color={statusStyle.color} px={2} py={0.5} rounded="md" textTransform="none">{order.status}</Badge>
                            </Flex>
                            <Text color="gray.500" fontSize="sm">Placed on {order.date}</Text>
                        </Box>
                    </Flex>
                    <Button size="sm" bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} border="none">
                        Update Status
                    </Button>
                </Flex>
            </Box>

            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8}>
                
                {/* Left Side: Order Items */}
                <Box gridColumn={{ lg: "span 2" }}>
                    <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden">
                        <Flex align="center" gap={3} p={6} borderBottom="1px solid" borderColor="whiteAlpha.50">
                            <Flex bg="rgba(92, 172, 125, 0.15)" p={2} rounded="lg"><Icon as={LuPackage} color="#5cac7d" boxSize="20px" /></Flex>
                            <Text color="white" fontWeight="bold" fontSize="lg">Order Items</Text>
                        </Flex>

                        <Box p={6}>
                            <Flex justify="space-between" align="center" py={3} borderBottom="1px dashed" borderColor="whiteAlpha.200">
                                <Box>
                                    <Text color="white" fontSize="sm" fontWeight="bold">Item #1 Dummy Product</Text>
                                    <Text color="gray.500" fontSize="xs">Qty: 1</Text>
                                </Box>
                                <Text color="white" fontSize="sm">₦{(order.total * 0.7).toLocaleString()}</Text>
                            </Flex>

                            <Flex justify="space-between" align="center" py={3} borderBottom="1px dashed" borderColor="whiteAlpha.200">
                                <Box>
                                    <Text color="white" fontSize="sm" fontWeight="bold">Item #2 Dummy Product</Text>
                                    <Text color="gray.500" fontSize="xs">Qty: 2</Text>
                                </Box>
                                <Text color="white" fontSize="sm">₦{(order.total * 0.3).toLocaleString()}</Text>
                            </Flex>

                            <Flex direction="column" gap={3} w={{ base: "full", sm: "300px" }} ml="auto" mt={6}>
                                <Flex justify="space-between">
                                    <Text color="gray.400" fontSize="sm">Subtotal</Text>
                                    <Text color="white" fontSize="sm">₦{order.total.toLocaleString()}</Text>
                                </Flex>
                                <Flex justify="space-between">
                                    <Text color="gray.400" fontSize="sm">Shipping Fee</Text>
                                    <Text color="white" fontSize="sm">₦2,500</Text>
                                </Flex>
                                <Box w="full" borderBottom="1px solid" borderColor="whiteAlpha.200" my={1} />
                                <Flex justify="space-between" align="center">
                                    <Text color="white" fontWeight="bold" fontSize="lg">Total Paid</Text>
                                    <Text color="#5cac7d" fontWeight="black" fontSize="2xl">₦{(order.total + 2500).toLocaleString()}</Text>
                                </Flex>
                            </Flex>
                        </Box>
                    </Box>
                </Box>

                {/* Right Side: Customer, Shipping, Payment */}
                <Box gridColumn={{ lg: "span 1" }} display="flex" flexDirection="column" gap={6}>
                    
                    {/* Customer Info */}
                    <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6}>
                        <Flex align="center" gap={3} mb={4}>
                            <Icon as={LuUser} color="gray.400" boxSize="18px" />
                            <Text color="white" fontWeight="bold">Customer</Text>
                        </Flex>
                        <Text color="gray.300" fontSize="sm" mb={1}>{order.customer}</Text>
                        <Text color="gray.500" fontSize="xs">Registered User</Text>
                    </Box>

                    {/* Shipping Info */}
                    <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6}>
                        <Flex align="center" gap={3} mb={4}>
                            <Icon as={LuTruck} color="blue.400" boxSize="18px" />
                            <Text color="white" fontWeight="bold">Shipping Details</Text>
                        </Flex>
                        <Text color="gray.300" fontSize="sm" mb={1}>{order.shippingMethod}</Text>
                        <Text color="gray.500" fontSize="xs" mb={4}>Tracking: <Text as="span" fontFamily="monospace" color="gray.400">{trackingId}</Text></Text>
                        
                        <Flex gap={2} align="start" p={3} bg="#121214" rounded="lg" border="1px solid" borderColor="whiteAlpha.50">
                            <Icon as={LuMapPin} color="gray.500" mt={1} />
                            <Text color="gray.400" fontSize="xs">123 Dummy Street, Phase 2, FCT Abuja, Nigeria</Text>
                        </Flex>
                    </Box>

                    {/* Payment Info */}
                    <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6}>
                        <Flex align="center" gap={3} mb={4}>
                            <Icon as={LuCreditCard} color="#5cac7d" boxSize="18px" />
                            <Text color="white" fontWeight="bold">Payment Details</Text>
                        </Flex>
                        <Flex justify="space-between" mb={2}>
                            <Text color="gray.500" fontSize="xs">Status</Text>
                            <Text color={order.paymentStatus === "Paid" ? "#5cac7d" : "orange.400"} fontSize="xs" fontWeight="bold">{order.paymentStatus}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text color="gray.500" fontSize="xs">Method</Text>
                            <Text color="gray.300" fontSize="xs">Paystack Gateway</Text>
                        </Flex>
                    </Box>

                </Box>
            </SimpleGrid>
        </Box>
    );
};
"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, IconButton } from "@chakra-ui/react";

import { 
    LuSearch, LuFilter, LuEye, 
    LuLoaderCircle, LuChevronDown 
} from "react-icons/lu";

import { generateDummyOnlineOrders } from "@/app/lib/data";
import { OnlineOrder } from "@/app/lib/definitions";

export const OnlineOrdersOverview = () => {
    const TOTAL_ORDERS = 150;
    const ITEMS_PER_PAGE = 10;
    
    const [orders, setOrders] = useState<OnlineOrder[]>(generateDummyOnlineOrders(ITEMS_PER_PAGE, 0));
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Infinite Scroll simulation
    const handleLoadMore = () => {
        if (orders.length >= TOTAL_ORDERS) return;
        setIsLoadingMore(true);
        setTimeout(() => {
            setOrders((prev) => [...prev, ...generateDummyOnlineOrders(ITEMS_PER_PAGE, prev.length)]);
            setIsLoadingMore(false);
        }, 800);
    };

    // status badge colors
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Delivered": return { bg: "rgba(92, 172, 125, 0.15)", color: "#5cac7d" };
            case "Shipped": return { bg: "rgba(66, 153, 225, 0.15)", color: "blue.400" };
            case "Processing": return { bg: "rgba(237, 137, 54, 0.15)", color: "orange.400" };
            case "Cancelled": return { bg: "rgba(245, 101, 101, 0.15)", color: "red.400" };
            default: return { bg: "whiteAlpha.200", color: "gray.300" }; // Pending
        }
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* ---  Header & Toolbar --- */}
            <Box 
                position="sticky" 
                top={{ base: "70px", md: "85px" }} 
                zIndex={20} 
                bg="rgba(11, 13, 20, 0.85)" 
                backdropFilter="blur(12px)"
                py={4} mb={6} mx={-4} px={4} 
            >
                <Flex justify="space-between" align={{ base: "flex-start", lg: "flex-end" }} wrap="wrap" gap={4}>
                    <Box w={{ base: "full", lg: "auto" }}>
                        <Text color="#5cac7d" fontWeight="bold" fontSize="2xl" mb={1}>Online Orders</Text>
                        <Text color="gray.400" fontSize="sm">
                            Showing <Text as="span" color="white" fontWeight="bold">{orders.length}</Text> of <Text as="span" color="white" fontWeight="bold">{TOTAL_ORDERS}</Text> orders
                        </Text>
                    </Box>
                    
                    <Flex direction={{ base: "column", md: "row" }} gap={3} w={{ base: "full", lg: "auto" }}>
                        <Flex w="full" minW={{ md: "300px" }} align="center" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" px={3} _focusWithin={{ borderColor: "#5cac7d" }}>
                            <Icon as={LuSearch} color="gray.400" />
                            <Input placeholder="Search by order ID, customer..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="40px" />
                        </Flex>
                        
                        <Flex gap={3} w="full">
                            <Button flex={1} variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }} h="40px" bg="#121214">
                                <Icon as={LuFilter} mr={2} /> Status
                            </Button>
                            <Button flex={1} variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }} h="40px" bg="#121214">
                                Date <Icon as={LuChevronDown} ml={2} />
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>

            {/* --- Orders Table --- */}
            <Box bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" mb={8} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' } }}>
                <Box as="table" w="full" minW="900px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                    <Box as="thead" bg="#1A1C23" borderBottom="1px solid" borderColor="whiteAlpha.100">
                        <Box as="tr">
                            {["Order ID", "Customer", "Date", "Status", "Payment", "Shipping", "Total", "Action"].map((head) => (
                                <Box as="th" key={head} py={4} px={5} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">{head}</Box>
                            ))}
                        </Box>
                    </Box>
                    <Box as="tbody">
                        {orders.map((order, idx) => {
                            const statusStyle = getStatusColor(order.status);
                            return (
                                <Box as="tr" key={idx} borderBottom="1px solid" borderColor="whiteAlpha.50" _hover={{ bg: "whiteAlpha.50" }} transition="background 0.2s">
                                    <Box as="td" py={5} px={5}><Text color="white" fontSize="sm" fontWeight="bold">{order.id}</Text></Box>
                                    <Box as="td" py={5} px={5}><Text color="gray.300" fontSize="sm">{order.customer}</Text></Box>
                                    <Box as="td" py={5} px={5}><Text color="gray.400" fontSize="sm">{order.date}</Text></Box>
                                    
                                    {/* Order Status Badge */}
                                    <Box as="td" py={5} px={5}>
                                        <Flex align="center" justify="center" px={3} py={1} rounded="md" bg={statusStyle.bg} color={statusStyle.color} fontSize="xs" fontWeight="bold" display="inline-flex">
                                            {order.status}
                                        </Flex>
                                    </Box>

                                    {/* Payment Status Text */}
                                    <Box as="td" py={5} px={5}>
                                        <Text fontSize="sm" fontWeight="bold" color={order.paymentStatus === "Paid" ? "#5cac7d" : order.paymentStatus === "Unpaid" ? "red.400" : "gray.400"}>
                                            {order.paymentStatus}
                                        </Text>
                                    </Box>

                                    <Box as="td" py={5} px={5}><Text color="gray.400" fontSize="sm">{order.shippingMethod}</Text></Box>
                                    <Box as="td" py={5} px={5}><Text color="white" fontSize="sm" fontWeight="bold">₦{order.total.toLocaleString()}</Text></Box>
                                    
                                    {/* Quick Actions */}
                                    <Box as="td" py={5} px={5}>
                                        <Flex gap={2}>
                                            <IconButton aria-label="View Order" variant="ghost" size="sm" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }}><Icon as={LuEye} /></IconButton>
                                        </Flex>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
                
                {/* Load More Trigger */}
                {orders.length < TOTAL_ORDERS && (
                    <Flex justify="center" py={6}>
                        <Button onClick={handleLoadMore} disabled={isLoadingMore} variant="ghost" color="gray.400" _hover={{ color: "white" }} fontSize="sm">
                            {isLoadingMore ? <Icon as={LuLoaderCircle} animation="spin 1s linear infinite" /> : "Load More Orders"}
                        </Button>
                    </Flex>
                )}
            </Box>

            {/* --- Summary Card --- */}
            <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="#5cac7d" p={6} mb={8} shadow="0 4px 20px rgba(92, 172, 125, 0.1)">
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
                    <Box borderRight={{ lg: "1px solid" }} borderColor="whiteAlpha.100" pr={{ lg: 4 }}>
                        <Text color="gray.400" fontSize="xs" mb={2}>Order Overview</Text>
                        <Flex justify="space-between" mb={1}><Text fontSize="sm" color="gray.300">Total Orders</Text><Text fontSize="sm" color="white" fontWeight="bold">{TOTAL_ORDERS}</Text></Flex>
                        <Flex justify="space-between"><Text fontSize="sm" color="gray.300">Avg. Order Value</Text><Text fontSize="sm" color="white" fontWeight="bold">₦28,500</Text></Flex>
                    </Box>
                    
                    <Box borderRight={{ lg: "1px solid" }} borderColor="whiteAlpha.100" pr={{ lg: 4 }}>
                        <Text color="gray.400" fontSize="xs" mb={2}>Active Fulfillment</Text>
                        <Flex justify="space-between" mb={1}><Text fontSize="sm" color="gray.300">Pending</Text><Text fontSize="sm" color="white" fontWeight="bold">14</Text></Flex>
                        <Flex justify="space-between"><Text fontSize="sm" color="gray.300">Processing</Text><Text fontSize="sm" color="orange.400" fontWeight="bold">8</Text></Flex>
                    </Box>

                    <Box borderRight={{ lg: "1px solid" }} borderColor="whiteAlpha.100" pr={{ lg: 4 }}>
                        <Text color="gray.400" fontSize="xs" mb={2}>Completed Shipments</Text>
                        <Flex justify="space-between" mb={1}><Text fontSize="sm" color="gray.300">In Transit</Text><Text fontSize="sm" color="blue.400" fontWeight="bold">22</Text></Flex>
                        <Flex justify="space-between"><Text fontSize="sm" color="gray.300">Delivered</Text><Text fontSize="sm" color="#5cac7d" fontWeight="bold">94</Text></Flex>
                    </Box>

                    <Box>
                        <Text color="gray.400" fontSize="xs" mb={2}>Financials</Text>
                        <Flex justify="space-between" mb={1}><Text fontSize="sm" color="gray.300">Refunds & Cancelled</Text><Text fontSize="sm" color="red.400" fontWeight="bold">12</Text></Flex>
                        <Flex justify="space-between" mt={2} pt={2} borderTop="1px dashed" borderColor="whiteAlpha.200">
                            <Text fontSize="sm" color="white" fontWeight="bold">Gross Sales</Text>
                            <Text fontSize="md" color="#5cac7d" fontWeight="extrabold">₦4,275,000</Text>
                        </Flex>
                    </Box>
                </SimpleGrid>
            </Box>

        </Box>
    );
};
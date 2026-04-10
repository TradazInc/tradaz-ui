"use client";
import React from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, IconButton, Spinner } from "@chakra-ui/react";
import { LuSearch, LuEye } from "react-icons/lu";
import { OnlineOrder } from "@/app/lib/definitions";

const controlStyles = { bg: "#121214", border: "1px solid", borderColor: "whiteAlpha.200", color: "white", h: "40px", rounded: "lg", px: 3, _focus: { outline: "none", borderColor: "#5cac7d" }, _hover: { bg: "whiteAlpha.50" } };
const nativeSelectStyle: React.CSSProperties = { backgroundColor: "rgba(255, 255, 255, 0.05)", color: "white", height: "40px", borderRadius: "8px", padding: "0 12px", border: "1px solid rgba(255, 255, 255, 0.1)", outline: "none", cursor: "pointer", fontSize: "14px" };

interface OnlineOrdersGridViewProps {
    visibleItems: OnlineOrder[];
    processedOrdersLength: number;
    totalOrders: number;
    searchQuery: string; statusFilter: string; sortBy: string; sortOrder: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleStatusFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSortBy: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSortOrder: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onSelectOrder: (order: OnlineOrder) => void;
    visibleCount: number; isLoadingMore: boolean; loaderRef: React.RefObject<HTMLDivElement | null>;
}

export const OnlineOrdersGridView = ({
    visibleItems, processedOrdersLength, totalOrders,
    searchQuery, statusFilter, sortBy, sortOrder,
    handleSearch, handleStatusFilter, handleSortBy, handleSortOrder,
    onSelectOrder, visibleCount, loaderRef
}: OnlineOrdersGridViewProps) => {

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
            
            {/* Header (Scrolls normally) */}
            <Box mb={6} pt={2}>
                <Text color="#5cac7d" fontWeight="bold" fontSize="3xl" mb={1}>Online Orders</Text>
                <Text color="gray.400" fontSize="sm">
                    Showing <Text as="span" color="white" fontWeight="bold">{visibleItems.length}</Text> of <Text as="span" color="white" fontWeight="bold">{processedOrdersLength}</Text> orders
                </Text>
            </Box>

            {/* Sticky Toolbar */}
            <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)" py={3} mb={6} mx={-4} px={4} borderBottom="1px solid" borderColor="whiteAlpha.100">
                <Flex justify="space-between" align={{ base: "flex-start", lg: "center" }} wrap="wrap" gap={4}>
                    <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
                        
                        <Flex flex={1} minW={{ md: "250px" }} align="center" {...controlStyles}>
                            <Icon as={LuSearch} color="gray.400" mr={2} />
                            <Input placeholder="Search by order ID, customer..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" px={0} value={searchQuery} onChange={handleSearch} />
                        </Flex>
                        
                        <Flex gap={3} w={{ base: "full", md: "auto" }} wrap="wrap">
                            <Box flex={{ base: 1, md: "initial" }}>
                                <select value={statusFilter} onChange={handleStatusFilter} style={nativeSelectStyle}>
                                    <option value="all" style={{ background: "#1A1C23" }}>All Statuses</option>
                                    <option value="delivered" style={{ background: "#1A1C23" }}>Delivered</option>
                                    <option value="shipped" style={{ background: "#1A1C23" }}>Shipped</option>
                                    <option value="processing" style={{ background: "#1A1C23" }}>Processing</option>
                                    <option value="pending" style={{ background: "#1A1C23" }}>Pending</option>
                                    <option value="cancelled" style={{ background: "#1A1C23" }}>Cancelled</option>
                                </select>
                            </Box>
                            <Box flex={{ base: 1, md: "initial" }}>
                                <select value={sortBy} onChange={handleSortBy} style={nativeSelectStyle}>
                                    <option value="date" style={{ background: "#1A1C23" }}>Sort: Date</option>
                                    <option value="total" style={{ background: "#1A1C23" }}>Sort: Total</option>
                                </select>
                            </Box>
                            <Box flex={{ base: 1, md: "initial" }}>
                                <select value={sortOrder} onChange={handleSortOrder} style={nativeSelectStyle}>
                                    <option value="desc" style={{ background: "#1A1C23" }}>Newest / Highest</option>
                                    <option value="asc" style={{ background: "#1A1C23" }}>Oldest / Lowest</option>
                                </select>
                            </Box>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>

            {/* Table Area */}
            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column">
                    <Text color="gray.400" fontSize="lg" fontWeight="bold">No orders found.</Text>
                </Flex>
            ) : (
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
                            {visibleItems.map((order, idx) => {
                                const statusStyle = getStatusColor(order.status);
                                return (
                                    <Box as="tr" key={idx} borderBottom="1px solid" borderColor="whiteAlpha.50" _hover={{ bg: "whiteAlpha.50" }} transition="background 0.2s">
                                        <Box as="td" py={5} px={5}><Text color="white" fontSize="sm" fontWeight="bold">{order.id}</Text></Box>
                                        <Box as="td" py={5} px={5}><Text color="gray.300" fontSize="sm">{order.customer}</Text></Box>
                                        <Box as="td" py={5} px={5}><Text color="gray.400" fontSize="sm">{order.date}</Text></Box>
                                        <Box as="td" py={5} px={5}>
                                            <Flex align="center" justify="center" px={3} py={1} rounded="md" bg={statusStyle.bg} color={statusStyle.color} fontSize="xs" fontWeight="bold" display="inline-flex">
                                                {order.status}
                                            </Flex>
                                        </Box>
                                        <Box as="td" py={5} px={5}>
                                            <Text fontSize="sm" fontWeight="bold" color={order.paymentStatus === "Paid" ? "#5cac7d" : order.paymentStatus === "Unpaid" ? "red.400" : "gray.400"}>
                                                {order.paymentStatus}
                                            </Text>
                                        </Box>
                                        <Box as="td" py={5} px={5}><Text color="gray.400" fontSize="sm">{order.shippingMethod}</Text></Box>
                                        <Box as="td" py={5} px={5}><Text color="white" fontSize="sm" fontWeight="bold">₦{order.total.toLocaleString()}</Text></Box>
                                        <Box as="td" py={5} px={5}>
                                            <IconButton aria-label="View Order" onClick={() => onSelectOrder(order)} variant="ghost" size="sm" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }}>
                                                <Icon as={LuEye} />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                    
                    {/* Infinite Scroll Trigger */}
                    {visibleCount < processedOrdersLength && (
                        <Flex ref={loaderRef} justify="center" align="center" py={8} h="80px">
                            <Spinner color="#5cac7d" size="md" />
                        </Flex>
                    )}
                </Box>
            )}

            {/* Summary Card */}
            <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="#5cac7d" p={6} mb={8} shadow="0 4px 20px rgba(92, 172, 125, 0.1)">
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
                    <Box borderRight={{ lg: "1px solid" }} borderColor="whiteAlpha.100" pr={{ lg: 4 }}>
                        <Text color="gray.400" fontSize="xs" mb={2}>Order Overview</Text>
                        <Flex justify="space-between" mb={1}><Text fontSize="sm" color="gray.300">Total Orders</Text><Text fontSize="sm" color="white" fontWeight="bold">{totalOrders}</Text></Flex>
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
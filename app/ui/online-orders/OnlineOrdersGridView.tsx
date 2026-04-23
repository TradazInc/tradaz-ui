"use client";
import React from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, IconButton, Spinner } from "@chakra-ui/react";
import { LuSearch, LuEye } from "react-icons/lu";
import { OnlineOrder } from "@/app/lib/definitions";


const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "40px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { backgroundColor: "#0A0A0A", color: "white", height: "40px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px" };

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


    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Delivered": return { bg: "#111111", color: "white", border: "1px solid white" };
            case "Shipped": return { bg: "#111111", color: "#888888", border: "1px solid #888888" };
            case "Processing": return { bg: "transparent", color: "white", border: "1px dashed #888888" };
            case "Cancelled": return { bg: "#111111", color: "white", border: "1px solid #333333", textDecoration: "line-through" };
            default: return { bg: "transparent", color: "#888888", border: "1px solid #333333" }; 
        }
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* Header (Scrolls normally) */}
            <Box mb={6} pt={2}>
                <Text color="white" fontWeight="bold" fontSize="3xl" mb={1} letterSpacing="tight">Online Orders</Text>
                <Text color="#888888" fontSize="sm">
                    Showing <Text as="span" color="white" fontWeight="bold">{visibleItems.length}</Text> of <Text as="span" color="white" fontWeight="bold">{processedOrdersLength}</Text> orders
                </Text>
            </Box>

            {/* Sticky Toolbar */}
            <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)" py={3} mb={6} mx={-4} px={4} borderBottom="1px solid" borderColor="#1A1A1A">
                <Flex justify="space-between" align={{ base: "flex-start", lg: "center" }} wrap="wrap" gap={4}>
                    <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
                        
                        <Flex flex={1} minW={{ md: "250px" }} align="center" {...controlStyles}>
                            <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                            <Input placeholder="Search by order ID, customer..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" px={0} value={searchQuery} onChange={handleSearch} />
                        </Flex>
                        
                        <Flex gap={3} w={{ base: "full", md: "auto" }} wrap="wrap">
                            <Box flex={{ base: 1, md: "initial" }}>
                                <select value={statusFilter} onChange={handleStatusFilter} style={nativeSelectStyle}>
                                    <option value="all" style={{ background: "#0A0A0A" }}>All Statuses</option>
                                    <option value="delivered" style={{ background: "#0A0A0A" }}>Delivered</option>
                                    <option value="shipped" style={{ background: "#0A0A0A" }}>Shipped</option>
                                    <option value="processing" style={{ background: "#0A0A0A" }}>Processing</option>
                                    <option value="pending" style={{ background: "#0A0A0A" }}>Pending</option>
                                    <option value="cancelled" style={{ background: "#0A0A0A" }}>Cancelled</option>
                                </select>
                            </Box>
                            <Box flex={{ base: 1, md: "initial" }}>
                                <select value={sortBy} onChange={handleSortBy} style={nativeSelectStyle}>
                                    <option value="date" style={{ background: "#0A0A0A" }}>Sort: Date</option>
                                    <option value="total" style={{ background: "#0A0A0A" }}>Sort: Total</option>
                                </select>
                            </Box>
                            <Box flex={{ base: 1, md: "initial" }}>
                                <select value={sortOrder} onChange={handleSortOrder} style={nativeSelectStyle}>
                                    <option value="desc" style={{ background: "#0A0A0A" }}>Newest / Highest</option>
                                    <option value="asc" style={{ background: "#0A0A0A" }}>Oldest / Lowest</option>
                                </select>
                            </Box>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>

            {/* Table Area */}
            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column">
                    <Text color="#888888" fontSize="lg" fontWeight="bold">No orders found.</Text>
                </Flex>
            ) : (
                <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" mb={8} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                    <Box as="table" w="full" minW="900px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                        <Box as="thead" bg="#111111" borderBottom="1px solid" borderColor="#333333">
                            <Box as="tr">
                                {["Order ID", "Customer", "Date", "Status", "Payment", "Shipping", "Total", "Action"].map((head) => (
                                    <Box as="th" key={head} py={4} px={5} color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{head}</Box>
                                ))}
                            </Box>
                        </Box>
                        <Box as="tbody">
                            {visibleItems.map((order, idx) => {
                                const statusStyle = getStatusStyle(order.status);
                                return (
                                    <Box as="tr" key={idx} borderBottom="1px solid" borderColor="#1A1A1A" _hover={{ bg: "#111111" }} transition="background 0.2s">
                                        <Box as="td" py={5} px={5}><Text color="white" fontSize="sm" fontWeight="bold">{order.id}</Text></Box>
                                        <Box as="td" py={5} px={5}><Text color="white" fontSize="sm" fontWeight="500">{order.customer}</Text></Box>
                                        <Box as="td" py={5} px={5}><Text color="#888888" fontSize="sm">{order.date}</Text></Box>
                                        <Box as="td" py={5} px={5}>
                                            <Flex align="center" justify="center" px={2} py={1} rounded="none" bg={statusStyle.bg} color={statusStyle.color} border={statusStyle.border} fontSize="10px" textTransform="uppercase" letterSpacing="wider" fontWeight="bold" display="inline-flex">
                                                {order.status}
                                            </Flex>
                                        </Box>
                                        <Box as="td" py={5} px={5}>
                                            <Text fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" color={order.paymentStatus === "Paid" ? "white" : "#888888"}>
                                                {order.paymentStatus}
                                            </Text>
                                        </Box>
                                        <Box as="td" py={5} px={5}><Text color="#888888" fontSize="sm">{order.shippingMethod}</Text></Box>
                                        <Box as="td" py={5} px={5}><Text color="white" fontSize="sm" fontWeight="bold">₦{order.total.toLocaleString()}</Text></Box>
                                        <Box as="td" py={5} px={5}>
                                            <IconButton aria-label="View Order" onClick={() => onSelectOrder(order)} variant="ghost" size="sm" rounded="none" color="#888888" _hover={{ color: "white", bg: "#1A1A1A" }}>
                                                <Icon as={LuEye} strokeWidth="2.5" />
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
                            <Spinner color="white" size="md" />
                        </Flex>
                    )}
                </Box>
            )}

            {/* Summary Card */}
            <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#333333" p={6} mb={8}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
                    <Box borderRight={{ lg: "1px solid" }} borderColor="#1A1A1A" pr={{ lg: 4 }}>
                        <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={3}>Order Overview</Text>
                        <Flex justify="space-between" mb={2}><Text fontSize="sm" color="#888888">Total Orders</Text><Text fontSize="sm" color="white" fontWeight="bold">{totalOrders}</Text></Flex>
                        <Flex justify="space-between"><Text fontSize="sm" color="#888888">Avg. Order Value</Text><Text fontSize="sm" color="white" fontWeight="bold">₦28,500</Text></Flex>
                    </Box>
                    <Box borderRight={{ lg: "1px solid" }} borderColor="#1A1A1A" pr={{ lg: 4 }}>
                        <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={3}>Active Fulfillment</Text>
                        <Flex justify="space-between" mb={2}><Text fontSize="sm" color="#888888">Pending</Text><Text fontSize="sm" color="white" fontWeight="bold">14</Text></Flex>
                        <Flex justify="space-between"><Text fontSize="sm" color="#888888">Processing</Text><Text fontSize="sm" color="white" fontWeight="bold">8</Text></Flex>
                    </Box>
                    <Box borderRight={{ lg: "1px solid" }} borderColor="#1A1A1A" pr={{ lg: 4 }}>
                        <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={3}>Completed Shipments</Text>
                        <Flex justify="space-between" mb={2}><Text fontSize="sm" color="#888888">In Transit</Text><Text fontSize="sm" color="white" fontWeight="bold">22</Text></Flex>
                        <Flex justify="space-between"><Text fontSize="sm" color="#888888">Delivered</Text><Text fontSize="sm" color="white" fontWeight="bold">94</Text></Flex>
                    </Box>
                    <Box>
                        <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={3}>Financials</Text>
                        <Flex justify="space-between" mb={2}><Text fontSize="sm" color="#888888">Refunds & Cancelled</Text><Text fontSize="sm" color="white" fontWeight="bold">12</Text></Flex>
                        <Flex justify="space-between" mt={3} pt={3} borderTop="1px solid" borderColor="#333333">
                            <Text fontSize="sm" color="white" fontWeight="bold">Gross Sales</Text>
                            <Text fontSize="md" color="white" fontWeight="black" letterSpacing="tight">₦4,275,000</Text>
                        </Flex>
                    </Box>
                </SimpleGrid>
            </Box>
        </Box>
    );
};
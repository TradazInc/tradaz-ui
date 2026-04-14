"use client";
import React from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, IconButton, Spinner } from "@chakra-ui/react";

import { 
    LuSearch, LuDownload, LuTrendingUp, LuDollarSign, 
    LuStore, LuGlobe, LuRepeat, LuEllipsisVertical, LuArrowUpRight
} from "react-icons/lu";

import { useRevenue } from "@/app/hooks/useRevenue";
import { RevenueTransaction } from "@/app/lib/definitions";

const controlStyles = { bg: "#121214", border: "1px solid", borderColor: "whiteAlpha.200", color: "white", h: "44px", rounded: "lg", px: 3, _focus: { outline: "none", borderColor: "#5cac7d" }, _hover: { bg: "whiteAlpha.50" } };
const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#121214", color: "white", height: "44px", borderRadius: "8px", padding: "0 12px", border: "1px solid rgba(255, 255, 255, 0.2)", outline: "none", cursor: "pointer", fontSize: "14px" };

export const RevenueOverview = () => {
    // Call the Hook
    const {
        searchQuery, channelFilter, sortBy, sortOrder,
        handleSearch, handleChannelFilter, handleSortBy, handleSortOrder,
        visibleItems, processedCount, totalLimit,
        visibleCount, loaderRef,
        totalRevenue, onlineSales, posSales
    } = useRevenue();

    // Helper for Channel Styling
    const getChannelStyle = (channel: string) => {
        switch (channel) {
            case "Online": return { bg: "rgba(66, 153, 225, 0.15)", color: "blue.400", icon: LuGlobe };
            case "POS": return { bg: "rgba(237, 137, 54, 0.15)", color: "orange.400", icon: LuStore };
            case "Subscription": return { bg: "rgba(128, 90, 213, 0.15)", color: "purple.400", icon: LuRepeat };
            default: return { bg: "whiteAlpha.100", color: "gray.400", icon: LuDollarSign };
        }
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* ---  Page Header (Scrolls naturally) --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} wrap="wrap" gap={4} mb={6} pt={2}>
                <Box>
                    <Text color="#5cac7d" fontWeight="bold" fontSize="3xl" mb={1} display="flex" alignItems="center" gap={2}>
                        <Icon as={LuTrendingUp} /> Gross Revenue ({totalLimit})
                    </Text>
                    <Text color="gray.400" fontSize="sm">
                        Showing <Text as="span" color="white" fontWeight="bold">{visibleItems.length}</Text> of <Text as="span" color="white" fontWeight="bold">{processedCount}</Text> • Monitor incoming cash flow and sales channels.
                    </Text>
                </Box>
                <Button variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }} h="44px" px={6}>
                    <Icon as={LuDownload} mr={2} /> Export CSV
                </Button>
            </Flex>

            {/* ---  Sticky Toolbar  --- */}
            <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)" py={3} mb={6} mx={-4} px={4} borderBottom="1px solid" borderColor="whiteAlpha.100">
                <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
                    {/* Search */}
                    <Flex flex={1} minW="300px" align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="gray.400" mr={2} />
                        <Input placeholder="Search transactions or references..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" px={0} value={searchQuery} onChange={handleSearch} />
                    </Flex>
                    
                    {/* Functional Dropdowns */}
                    <Flex gap={3} w={{ base: "full", md: "auto" }}>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={channelFilter} onChange={handleChannelFilter} style={nativeSelectStyle}>
                                <option value="all" style={{ background: "#1A1C23" }}>All Channels</option>
                                <option value="online" style={{ background: "#1A1C23" }}>Online</option>
                                <option value="pos" style={{ background: "#1A1C23" }}>POS</option>
                                <option value="subscription" style={{ background: "#1A1C23" }}>Subscription</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortBy} onChange={handleSortBy} style={nativeSelectStyle}>
                                <option value="date" style={{ background: "#1A1C23" }}>Sort: Date</option>
                                <option value="amount" style={{ background: "#1A1C23" }}>Sort: Amount</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortOrder} onChange={handleSortOrder} style={nativeSelectStyle}>
                                <option value="desc" style={{ background: "#1A1C23" }}>Newest / Highest</option>
                                <option value="asc" style={{ background: "#1A1C23" }}>Oldest / Lowest</option>
                            </select>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* --- 3. Dynamic Revenue Financial Summary --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                <Box bg="#1A1C23" rounded="2xl" p={6} border="1px solid" borderColor="rgba(92, 172, 125, 0.3)" shadow="sm" position="relative" overflow="hidden">
                    <Box position="absolute" right="-20px" top="-20px" opacity={0.05}><Icon as={LuTrendingUp} boxSize="120px" color="#5cac7d" /></Box>
                    <Flex align="center" gap={3} mb={3}>
                        <Flex bg="rgba(92, 172, 125, 0.15)" p={2} rounded="md"><Icon as={LuDollarSign} color="#5cac7d" boxSize="20px" /></Flex>
                        <Text color="gray.400" fontSize="sm" fontWeight="medium">Loaded Gross Revenue</Text>
                    </Flex>
                    <Text color="#5cac7d" fontSize="3xl" fontWeight="black">₦{totalRevenue.toLocaleString()}</Text>
                    <Flex align="center" mt={2} color="#5cac7d" fontSize="xs" fontWeight="bold">
                        <Icon as={LuArrowUpRight} mr={1} /> +12.5% from last month
                    </Flex>
                </Box>
                
                <Box bg="#1A1C23" rounded="2xl" p={6} border="1px solid" borderColor="whiteAlpha.100" shadow="sm">
                    <Flex align="center" gap={3} mb={3}>
                        <Flex bg="rgba(66, 153, 225, 0.15)" p={2} rounded="md"><Icon as={LuGlobe} color="blue.400" boxSize="20px" /></Flex>
                        <Text color="gray.400" fontSize="sm" fontWeight="medium">Online Sales</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black">₦{onlineSales.toLocaleString()}</Text>
                </Box>
                
                <Box bg="#1A1C23" rounded="2xl" p={6} border="1px solid" borderColor="whiteAlpha.100" shadow="sm">
                    <Flex align="center" gap={3} mb={3}>
                        <Flex bg="rgba(237, 137, 54, 0.15)" p={2} rounded="md"><Icon as={LuStore} color="orange.400" boxSize="20px" /></Flex>
                        <Text color="gray.400" fontSize="sm" fontWeight="medium">POS Sales</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black">₦{posSales.toLocaleString()}</Text>
                </Box>
            </SimpleGrid>

            {/* --- 4. Revenue Transactions Table --- */}
            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column">
                    <Text color="gray.400" fontSize="lg" fontWeight="bold">No revenue transactions found.</Text>
                </Flex>
            ) : (
                <Box bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" mb={4} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' } }}>
                    <Box as="table" w="full" minW="900px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                        <Box as="thead" bg="#1A1C23" borderBottom="1px solid" borderColor="whiteAlpha.100">
                            <Box as="tr">
                                {["Transaction", "Channel", "Amount", "Date", "Status", "Actions"].map((head) => (
                                    <Box as="th" key={head} py={4} px={6} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">{head}</Box>
                                ))}
                            </Box>
                        </Box>
                        <Box as="tbody">
                            {/* Strictly typed loop */}
                            {visibleItems.map((txn: RevenueTransaction) => {
                                const chanStyle = getChannelStyle(txn.channel);
                                const isRefund = txn.status === "Refunded";

                                return (
                                    <Box 
                                        as="tr" key={txn.id} 
                                        borderBottom="1px solid" borderColor="whiteAlpha.50" 
                                        _hover={{ bg: "whiteAlpha.50" }} transition="background 0.2s" 
                                        opacity={isRefund ? 0.6 : 1}
                                    >
                                        <Box as="td" py={4} px={6}>
                                            <Text color={isRefund ? "gray.400" : "white"} fontSize="sm" fontWeight="bold" textDecoration={isRefund ? "line-through" : "none"}>{txn.source}</Text>
                                            <Text color="gray.500" fontSize="xs">{txn.reference}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Flex align="center" gap={2}>
                                                <Flex align="center" justify="center" bg={chanStyle.bg} color={chanStyle.color} p={1.5} rounded="md">
                                                    <Icon as={chanStyle.icon} boxSize="14px" />
                                                </Flex>
                                                <Text color="gray.300" fontSize="sm">{txn.channel}</Text>
                                            </Flex>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Text color={isRefund ? "red.400" : "white"} fontSize="md" fontWeight="bold">
                                                {isRefund ? "-" : ""}₦{Math.abs(txn.amount).toLocaleString()}
                                            </Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Text color="gray.400" fontSize="sm">{txn.date}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Flex align="center" gap={2}>
                                                <Box boxSize="8px" rounded="full" bg={isRefund ? "red.400" : (txn.status === "Completed" ? "#5cac7d" : "orange.400")} />
                                                <Text color={isRefund ? "red.400" : (txn.status === "Completed" ? "gray.300" : "orange.400")} fontSize="sm" fontWeight={txn.status === "Pending" ? "bold" : "normal"}>
                                                    {txn.status}
                                                </Text>
                                            </Flex>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Flex gap={2}>
                                                <Button size="sm" variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.200" }}>
                                                    Receipt
                                                </Button>
                                                <IconButton aria-label="Options" size="sm" variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.200" }}>
                                                    <Icon as={LuEllipsisVertical} />
                                                </IconButton>
                                            </Flex>
                                        </Box>

                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                    
                    {/* Infinite Scroll Trigger */}
                    {visibleCount < processedCount && (
                        <Flex ref={loaderRef} justify="center" align="center" py={8} h="80px">
                            <Spinner color="#5cac7d" size="md" />
                        </Flex>
                    )}
                </Box>
            )}

        </Box>
    );
};
"use client";
import React from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, IconButton, Spinner } from "@chakra-ui/react";

import { 
    LuSearch, LuDownload, LuTrendingUp, LuDollarSign, 
    LuStore, LuGlobe, LuRepeat, LuEllipsisVertical, LuArrowUpRight
} from "react-icons/lu";

import { useRevenue } from "@/app/hooks/useRevenue";
import { RevenueTransaction } from "@/app/lib/definitions";


const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px" };

export const RevenueOverview = () => {
    // Call the Hook
    const {
        searchQuery, channelFilter, sortBy, sortOrder,
        handleSearch, handleChannelFilter, handleSortBy, handleSortOrder,
        visibleItems, processedCount, totalLimit,
        visibleCount, loaderRef,
        totalRevenue, onlineSales, posSales
    } = useRevenue();

    
    const getChannelStyle = (channel: string) => {
        const baseStyle = { bg: "#111111", color: "white", border: "1px solid #333333" };
        switch (channel) {
            case "Online": return { ...baseStyle, icon: LuGlobe };
            case "POS": return { ...baseStyle, icon: LuStore };
            case "Subscription": return { ...baseStyle, icon: LuRepeat };
            default: return { ...baseStyle, icon: LuDollarSign };
        }
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* ---  Page Header (Scrolls naturally) --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} wrap="wrap" gap={4} mb={6} pt={2}>
                <Box>
                    <Text color="white" fontWeight="bold" fontSize="3xl" mb={1} display="flex" alignItems="center" gap={2} letterSpacing="tight">
                        <Icon as={LuTrendingUp} strokeWidth="2.5" /> Gross Revenue ({totalLimit})
                    </Text>
                    <Text color="#888888" fontSize="sm">
                        Showing <Text as="span" color="white" fontWeight="bold">{visibleItems.length}</Text> of <Text as="span" color="white" fontWeight="bold">{processedCount}</Text> • Monitor incoming cash flow and sales channels.
                    </Text>
                </Box>
                <Button variant="outline" borderColor="#333333" color="white" _hover={{ bg: "#111111" }} h="44px" px={6} rounded="none" fontWeight="bold">
                    <Icon as={LuDownload} mr={2} strokeWidth="2.5" /> Export CSV
                </Button>
            </Flex>

            {/* ---  Sticky Toolbar  --- */}
            <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)" py={3} mb={6} mx={-4} px={4} borderBottom="1px solid" borderColor="#1A1A1A">
                <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
                    {/* Search */}
                    <Flex flex={1} minW="300px" align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input placeholder="Search transactions or references..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" px={0} value={searchQuery} onChange={handleSearch} />
                    </Flex>
                    
                    {/* Functional Dropdowns */}
                    <Flex gap={3} w={{ base: "full", md: "auto" }}>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={channelFilter} onChange={handleChannelFilter} style={nativeSelectStyle}>
                                <option value="all" style={{ background: "#0A0A0A" }}>All Channels</option>
                                <option value="online" style={{ background: "#0A0A0A" }}>Online</option>
                                <option value="pos" style={{ background: "#0A0A0A" }}>POS</option>
                                <option value="subscription" style={{ background: "#0A0A0A" }}>Subscription</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortBy} onChange={handleSortBy} style={nativeSelectStyle}>
                                <option value="date" style={{ background: "#0A0A0A" }}>Sort: Date</option>
                                <option value="amount" style={{ background: "#0A0A0A" }}>Sort: Amount</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortOrder} onChange={handleSortOrder} style={nativeSelectStyle}>
                                <option value="desc" style={{ background: "#0A0A0A" }}>Newest / Highest</option>
                                <option value="asc" style={{ background: "#0A0A0A" }}>Oldest / Lowest</option>
                            </select>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* --- 3. Dynamic Revenue Financial Summary --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                <Box bg="#0A0A0A" rounded="none" p={6} border="1px solid" borderColor="#333333" position="relative" overflow="hidden">
                    <Box position="absolute" right="-20px" top="-20px" opacity={0.05}><Icon as={LuTrendingUp} boxSize="120px" color="white" /></Box>
                    <Flex align="center" gap={3} mb={3}>
                        <Flex bg="#111111" p={2} rounded="none" border="1px solid #333333"><Icon as={LuDollarSign} color="white" boxSize="18px" strokeWidth="2.5" /></Flex>
                        <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Loaded Gross Revenue</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{totalRevenue.toLocaleString()}</Text>
                    <Flex align="center" mt={2} color="#888888" fontSize="xs" fontWeight="bold">
                        <Icon as={LuArrowUpRight} mr={1} strokeWidth="2.5" /> +12.5% from last month
                    </Flex>
                </Box>
                
                <Box bg="#0A0A0A" rounded="none" p={6} border="1px solid" borderColor="#333333">
                    <Flex align="center" gap={3} mb={3}>
                        <Flex bg="#111111" p={2} rounded="none" border="1px solid #333333"><Icon as={LuGlobe} color="white" boxSize="18px" strokeWidth="2.5" /></Flex>
                        <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Online Sales</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{onlineSales.toLocaleString()}</Text>
                </Box>
                
                <Box bg="#0A0A0A" rounded="none" p={6} border="1px solid" borderColor="#333333">
                    <Flex align="center" gap={3} mb={3}>
                        <Flex bg="#111111" p={2} rounded="none" border="1px solid #333333"><Icon as={LuStore} color="white" boxSize="18px" strokeWidth="2.5" /></Flex>
                        <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">POS Sales</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{posSales.toLocaleString()}</Text>
                </Box>
            </SimpleGrid>

            {/* --- 4. Revenue Transactions Table --- */}
            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column">
                    <Text color="#888888" fontSize="lg" fontWeight="bold">No revenue transactions found.</Text>
                </Flex>
            ) : (
                <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" mb={4} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                    <Box as="table" w="full" minW="900px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                        <Box as="thead" bg="#111111" borderBottom="1px solid" borderColor="#333333">
                            <Box as="tr">
                                {["Transaction", "Channel", "Amount", "Date", "Status", "Actions"].map((head) => (
                                    <Box as="th" key={head} py={4} px={6} color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{head}</Box>
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
                                        borderBottom="1px solid" borderColor="#1A1A1A" 
                                        _hover={{ bg: "#111111" }} transition="background 0.2s" 
                                        opacity={isRefund ? 0.6 : 1}
                                    >
                                        <Box as="td" py={4} px={6}>
                                            <Text color={isRefund ? "#888888" : "white"} fontSize="sm" fontWeight="bold" textDecoration={isRefund ? "line-through" : "none"}>{txn.source}</Text>
                                            <Text color="#888888" fontSize="xs">{txn.reference}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Flex align="center" gap={2}>
                                                <Flex align="center" justify="center" bg={chanStyle.bg} border={chanStyle.border} color={chanStyle.color} p={1.5} rounded="none">
                                                    <Icon as={chanStyle.icon} boxSize="14px" strokeWidth="2.5" />
                                                </Flex>
                                                <Text color="white" fontSize="sm" fontWeight="500">{txn.channel}</Text>
                                            </Flex>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Text color={isRefund ? "#888888" : "white"} fontSize="md" fontWeight="bold" letterSpacing="tight">
                                                {isRefund ? "-" : ""}₦{Math.abs(txn.amount).toLocaleString()}
                                            </Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Text color="#888888" fontSize="sm" fontWeight="500">{txn.date}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Flex align="center" justify="center" px={2} py={1} rounded="none" bg={isRefund ? "#111111" : (txn.status === "Completed" ? "white" : "transparent")} color={isRefund ? "#888888" : (txn.status === "Completed" ? "black" : "white")} border={isRefund ? "1px solid #333333" : (txn.status === "Completed" ? "none" : "1px dashed #888888")} fontSize="10px" textTransform="uppercase" letterSpacing="wider" fontWeight="bold" display="inline-flex">
                                                {txn.status}
                                            </Flex>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Flex gap={2}>
                                                <Button size="sm" variant="ghost" rounded="none" color="#888888" _hover={{ color: "white", bg: "#1A1A1A" }} fontWeight="bold">
                                                    Receipt
                                                </Button>
                                                <IconButton aria-label="Options" size="sm" variant="ghost" rounded="none" color="#888888" _hover={{ color: "white", bg: "#1A1A1A" }}>
                                                    <Icon as={LuEllipsisVertical} strokeWidth="2.5" />
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
                            <Spinner color="white" size="md" />
                        </Flex>
                    )}
                </Box>
            )}

        </Box>
    );
};
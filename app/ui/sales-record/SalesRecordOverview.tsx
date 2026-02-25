"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, IconButton } from "@chakra-ui/react";
import { LuSearch, LuRefreshCw, LuDownload, LuEye, LuCalendar, LuFilter, LuLoader } from "react-icons/lu";

import { generateDummySales } from "@/app/lib/data";
import { SalesRecord } from "@/app/lib/definitions";

export const SalesRecordOverview = () => {
    const [sales, setSales] = useState<SalesRecord[]>(generateDummySales(10));
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Simulate Infinite Scroll 
    const handleLoadMore = () => {
        setIsLoadingMore(true);
        setTimeout(() => {
            setSales((prev) => [...prev, ...generateDummySales(5)]);
            setIsLoadingMore(false);
        }, 1000);
    };

    return (
    
        <Box w="full" display="flex" flexDirection="column">
            
            {/* Header & Top KPIs */}
            <Flex justify="space-between" align="flex-end" mb={6} wrap="wrap" gap={4}>
                <Box>
                    <Flex align="center" gap={3} mb={1}>
                        <Text color="#5cac7d" fontWeight="bold" fontSize="2xl">Sales Record & Performance</Text>
                        <Button size="sm" variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }}>
                            <Icon as={LuRefreshCw} mr={2} /> Refresh
                        </Button>
                    </Flex>
                    <Text color="gray.500" fontSize="sm">View sales transactions and track performance.</Text>
                </Box>
                
                <Flex gap={3}>
                    <Box bg="whiteAlpha.50" border="1px solid" borderColor="whiteAlpha.100" rounded="xl" px={5} py={2}>
                        <Text fontSize="xs" color="gray.400" mb={1}>Total Paid Sales</Text>
                        <Text fontSize="xl" fontWeight="bold" color="#5cac7d">₦15,504,834.27</Text>
                    </Box>
                    <Box bg="whiteAlpha.50" border="1px solid" borderColor="whiteAlpha.100" rounded="xl" px={5} py={2}>
                        <Text fontSize="xs" color="gray.400" mb={1}>Total Sales</Text>
                        <Text fontSize="xl" fontWeight="bold" color="white">111</Text>
                    </Box>
                </Flex>
            </Flex>

            {/* Filters Area */}
            <Flex gap={3} mb={6} wrap="wrap">
                <Flex flex={1} minW="250px" align="center" bg="whiteAlpha.50" border="1px solid" borderColor="whiteAlpha.100" rounded="lg" px={3}>
                    <Icon as={LuSearch} color="gray.400" />
                    <Input placeholder="Search by order #, customer..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" />
                </Flex>
                <Button variant="outline" borderColor="whiteAlpha.100" color="white" _hover={{ bg: "whiteAlpha.50" }} fontWeight="normal">
                    <Icon as={LuCalendar} mr={2} /> Date Created
                </Button>
                <Button variant="outline" borderColor="whiteAlpha.100" color="white" _hover={{ bg: "whiteAlpha.50" }} fontWeight="normal">
                    <Icon as={LuFilter} mr={2} /> Newest First
                </Button>
            </Flex>

            {/* Table Area */}
           
            <Box bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" mb={8} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' } }}>
                <Box as="table" w="full" minW="800px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                    <Box as="thead" bg="#1A1C23" borderBottom="1px solid" borderColor="whiteAlpha.100">
                        <Box as="tr">
                            {["Order ID", "Transaction", "Date", "Payment", "Discount", "Total", "Actions"].map((head) => (
                                <Box as="th" key={head} py={4} px={5} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">{head}</Box>
                            ))}
                        </Box>
                    </Box>
                    <Box as="tbody">
                        {sales.map((sale: SalesRecord, idx: number) => (
                            <Box as="tr" key={idx} borderBottom="1px solid" borderColor="whiteAlpha.50" _hover={{ bg: "whiteAlpha.50" }} transition="background 0.2s">
                                <Box as="td" py={5} px={5}>
                                    <Text color="white" fontSize="sm" fontWeight="medium">{sale.id}</Text>
                                    <Text fontSize="10px" color={sale.type === "POS" ? "orange.400" : "blue.400"} fontWeight="bold" textTransform="uppercase" mt={0.5}>{sale.type}</Text>
                                </Box>
                                <Box as="td" py={5} px={5}><Text color="gray.400" fontSize="sm">{sale.transaction}</Text></Box>
                                <Box as="td" py={5} px={5}><Text color="gray.300" fontSize="sm">{sale.date}</Text></Box>
                                <Box as="td" py={5} px={5}>
                                    <Flex align="center" justify="center" px={2} py={1} rounded="md" bg={sale.payment === "Transfer" ? "green.500" : "whiteAlpha.200"} color={sale.payment === "Transfer" ? "white" : "gray.300"} fontSize="xs" fontWeight="bold" display="inline-flex">
                                        {sale.payment}
                                    </Flex>
                                </Box>
                                <Box as="td" py={5} px={5}><Text color={sale.discount > 0 ? "red.400" : "gray.500"} fontSize="sm">₦{sale.discount.toLocaleString()}</Text></Box>
                                <Box as="td" py={5} px={5}><Text color="#5cac7d" fontSize="sm" fontWeight="bold">₦{sale.total.toLocaleString()}</Text></Box>
                                <Box as="td" py={5} px={5}>
                                    <Flex gap={2}>
                                        <IconButton aria-label="Download" variant="ghost" size="sm" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }}><Icon as={LuDownload} /></IconButton>
                                        <IconButton aria-label="View" variant="ghost" size="sm" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }}><Icon as={LuEye} /></IconButton>
                                    </Flex>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
                
                {/* Infinite Scroll / Load More Trigger */}
                <Flex justify="center" py={6}>
                    <Button onClick={handleLoadMore} disabled={isLoadingMore} variant="ghost" color="gray.400" _hover={{ color: "white" }} fontSize="sm">
                        {isLoadingMore ? <Icon as={LuLoader} animation="spin 1s linear infinite" /> : "Load More Records"}
                    </Button>
                </Flex>
            </Box>

            {/* Summary Card */}
        
            <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="#5cac7d" p={6} mb={8} shadow="0 4px 20px rgba(92, 172, 125, 0.1)">
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
                    <Box borderRight={{ lg: "1px solid" }} borderColor="whiteAlpha.100" pr={{ lg: 4 }}>
                        <Text color="gray.400" fontSize="xs" mb={2}>Overview</Text>
                        <Flex justify="space-between" mb={1}><Text fontSize="sm" color="gray.300">Transactions</Text><Text fontSize="sm" color="white" fontWeight="bold">111</Text></Flex>
                        <Flex justify="space-between"><Text fontSize="sm" color="gray.300">Items Sold</Text><Text fontSize="sm" color="white" fontWeight="bold">203</Text></Flex>
                    </Box>
                    
                    <Box borderRight={{ lg: "1px solid" }} borderColor="whiteAlpha.100" pr={{ lg: 4 }}>
                        <Text color="gray.400" fontSize="xs" mb={2}>Payment Breakdown</Text>
                        <Flex justify="space-between" mb={1}><Text fontSize="sm" color="gray.300">Bank Transfer</Text><Text fontSize="sm" color="white" fontWeight="bold">74</Text></Flex>
                        <Flex justify="space-between"><Text fontSize="sm" color="gray.300">Credit Card</Text><Text fontSize="sm" color="white" fontWeight="bold">35</Text></Flex>
                    </Box>

                    <Box borderRight={{ lg: "1px solid" }} borderColor="whiteAlpha.100" pr={{ lg: 4 }}>
                        <Text color="gray.400" fontSize="xs" mb={2}>Discounts Applied</Text>
                        <Flex justify="space-between" mb={1}><Text fontSize="sm" color="gray.300">Average Disc.</Text><Text fontSize="sm" color="white" fontWeight="bold">20.98%</Text></Flex>
                        <Flex justify="space-between"><Text fontSize="sm" color="gray.300">Total Disc. Value</Text><Text fontSize="sm" color="red.400" fontWeight="bold">₦976,652</Text></Flex>
                    </Box>

                    <Box>
                        <Text color="gray.400" fontSize="xs" mb={2}>Net Financials</Text>
                        <Flex justify="space-between" mb={1}><Text fontSize="sm" color="gray.300">Total VAT</Text><Text fontSize="sm" color="orange.400" fontWeight="bold">₦1,017,283.28</Text></Flex>
                        <Flex justify="space-between" mt={2} pt={2} borderTop="1px dashed" borderColor="whiteAlpha.200">
                            <Text fontSize="sm" color="white" fontWeight="bold">Net Revenue</Text>
                            <Text fontSize="md" color="#5cac7d" fontWeight="extrabold">₦15,504,834</Text>
                        </Flex>
                    </Box>
                </SimpleGrid>
            </Box>

        </Box>
    );
};
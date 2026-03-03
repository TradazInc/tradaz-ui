"use client";
import React, { useState, useMemo } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Button, IconButton } from "@chakra-ui/react";
import { 
    LuCalculator, LuDownload, 
    LuReceipt, LuLandmark, LuWallet, LuEllipsisVertical
} from "react-icons/lu";

import { generateDummyTaxableSales } from "@/app/lib/data";
import { TaxableSale } from "@/app/lib/definitions";

type TimeFilter = "1M" | "3M" | "6M" | "1Y" | "ALL";

export const TaxCalculator = () => {
    // Generate 50 random sales over the last year
    const [allSales] = useState<TaxableSale[]>(generateDummyTaxableSales(50));
    const [timeFilter, setTimeFilter] = useState<TimeFilter>("3M");

    const VAT_RATE = 0.075; // 7.5% Nigerian VAT

    // --- DYNAMIC FILTERING & MATH ---
    const filteredSales = useMemo(() => {
        const now = new Date().getTime();
        const oneMonth = 30 * 24 * 60 * 60 * 1000;
        
        return allSales.filter(sale => {
            if (timeFilter === "ALL") return true;
            if (timeFilter === "1M") return (now - sale.timestamp) <= oneMonth;
            if (timeFilter === "3M") return (now - sale.timestamp) <= (oneMonth * 3);
            if (timeFilter === "6M") return (now - sale.timestamp) <= (oneMonth * 6);
            if (timeFilter === "1Y") return (now - sale.timestamp) <= (oneMonth * 12);
            return true;
        });
    }, [allSales, timeFilter]);

    // Calculate Totals based on the filtered list
    const totalGross = filteredSales.reduce((acc, sale) => acc + sale.grossAmount, 0);
    const totalVAT = totalGross * VAT_RATE;
    const totalNet = totalGross - totalVAT;

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* --- Sticky Header & Filters --- */}
            <Box 
                position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} 
                bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} mx={-4} px={4} 
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4} mb={6}>
                    <Box>
                        <Text color="#5cac7d" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2}>
                            <Icon as={LuLandmark} /> Tax & Liabilities
                        </Text>
                        <Text color="gray.400" fontSize="sm">Automated 7.5% VAT calculation based on the Nigerian Finance Act.</Text>
                    </Box>
                    
                    <Button variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }} h="44px" px={6}>
                        <Icon as={LuDownload} mr={2} /> Export Report
                    </Button>
                </Flex>

                {/* --- TIME TOGGLE BUTTONS --- */}
                <Flex bg="#121214" p={1.5} rounded="xl" border="1px solid" borderColor="whiteAlpha.200" display="inline-flex" gap={1}>
                    {(["1M", "3M", "6M", "1Y", "ALL"] as TimeFilter[]).map((filter) => (
                        <Button
                            key={filter}
                            onClick={() => setTimeFilter(filter)}
                            bg={timeFilter === filter ? "#5cac7d" : "transparent"}
                            color={timeFilter === filter ? "white" : "gray.400"}
                            _hover={{ bg: timeFilter === filter ? "#4a9c6d" : "whiteAlpha.100" }}
                            h="36px" px={4} rounded="lg" fontSize="sm" fontWeight="bold" transition="all 0.2s"
                        >
                            {filter === "ALL" ? "All Time" : filter}
                        </Button>
                    ))}
                </Flex>
            </Box>

            {/* --- Tax Summary Cards --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                <Box bg="#1A1C23" rounded="2xl" p={6} border="1px solid" borderColor="whiteAlpha.100" shadow="sm">
                    <Flex align="center" justify="space-between" mb={3}>
                        <Flex align="center" gap={3}>
                            <Flex bg="whiteAlpha.100" p={2} rounded="md"><Icon as={LuReceipt} color="gray.300" boxSize="20px" /></Flex>
                            <Text color="gray.400" fontSize="sm" fontWeight="medium">Gross Sales ({timeFilter})</Text>
                        </Flex>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black">₦{totalGross.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
                </Box>
                
                <Box bg="#1A1C23" rounded="2xl" p={6} border="1px solid" borderColor="rgba(237, 137, 54, 0.3)" shadow="sm" position="relative" overflow="hidden">
                    <Box position="absolute" right="-20px" top="-20px" opacity={0.05}><Icon as={LuCalculator} boxSize="120px" color="orange.400" /></Box>
                    <Flex align="center" gap={3} mb={3}>
                        <Flex bg="rgba(237, 137, 54, 0.15)" p={2} rounded="md"><Icon as={LuCalculator} color="orange.400" boxSize="20px" /></Flex>
                        <Text color="gray.400" fontSize="sm" fontWeight="medium">VAT Collected (7.5%)</Text>
                    </Flex>
                    <Text color="orange.400" fontSize="3xl" fontWeight="black">₦{totalVAT.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
                </Box>
                
                <Box bg="#1A1C23" rounded="2xl" p={6} border="1px solid" borderColor="rgba(92, 172, 125, 0.3)" shadow="sm">
                    <Flex align="center" gap={3} mb={3}>
                        <Flex bg="rgba(92, 172, 125, 0.15)" p={2} rounded="md"><Icon as={LuWallet} color="#5cac7d" boxSize="20px" /></Flex>
                        <Text color="gray.400" fontSize="sm" fontWeight="medium">Net Revenue (After Tax)</Text>
                    </Flex>
                    <Text color="#5cac7d" fontSize="3xl" fontWeight="black">₦{totalNet.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Text>
                </Box>
            </SimpleGrid>

            {/* --- Tax Calculation Table --- */}
            <Box bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" mb={4} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' } }}>
                <Box as="table" w="full" minW="900px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                    <Box as="thead" bg="#1A1C23" borderBottom="1px solid" borderColor="whiteAlpha.100">
                        <Box as="tr">
                            {["Date & Ref", "Customer", "Gross Amount", "VAT (7.5%)", "Net Amount", "FIRS Status", ""].map((head, i) => (
                                <Box as="th" key={i} py={4} px={6} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">{head}</Box>
                            ))}
                        </Box>
                    </Box>
                    <Box as="tbody">
                        {filteredSales.length === 0 ? (
                            <Box as="tr"><Box as="td" textAlign="center" py={8} color="gray.500">No sales found for this period.</Box></Box>
                        ) : (
                            filteredSales.map((sale) => {
                                const vatAmount = sale.grossAmount * VAT_RATE;
                                const netAmount = sale.grossAmount - vatAmount;
                                const isRemitted = sale.status === "Remitted";

                                return (
                                    <Box as="tr" key={sale.id} borderBottom="1px solid" borderColor="whiteAlpha.50" _hover={{ bg: "whiteAlpha.50" }} transition="background 0.2s">
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="bold">{sale.date}</Text>
                                            <Text color="gray.500" fontSize="xs">{sale.reference}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Text color="gray.300" fontSize="sm">{sale.customer}</Text>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="medium">₦{sale.grossAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Text color="orange.400" fontSize="sm" fontWeight="bold">₦{vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Text color="#5cac7d" fontSize="sm" fontWeight="bold">₦{netAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Flex align="center" gap={2}>
                                                <Box boxSize="8px" rounded="full" bg={isRemitted ? "#5cac7d" : "red.400"} />
                                                <Text color={isRemitted ? "gray.300" : "red.400"} fontSize="sm" fontWeight={!isRemitted ? "bold" : "normal"}>
                                                    {sale.status}
                                                </Text>
                                            </Flex>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6} textAlign="right">
                                            <IconButton aria-label="Options" size="sm" variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.200" }}>
                                                <Icon as={LuEllipsisVertical} />
                                            </IconButton>
                                        </Box>

                                    </Box>
                                );
                            })
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
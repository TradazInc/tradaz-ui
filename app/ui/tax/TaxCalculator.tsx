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
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000">
            
            {/* --- Sticky Header & Filters --- */}
            <Box 
                position="sticky" 
                top={{ base: "-16px", md: "-32px" }} 
                mx={{ base: "-16px", md: "-32px" }}  
                px={{ base: "16px", md: "32px" }}    
                zIndex={20} 
                bg="rgba(0, 0, 0, 0.85)" 
                backdropFilter="blur(12px)" 
                py={4} 
                mb={6} 
                borderBottom="1px solid" 
                borderColor="#1A1A1A" 
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4} mb={6}>
                    <Box>
                        <Flex align="center" gap={3} mb={1}>
                            <Icon as={LuLandmark} color="#f1f1f1" boxSize="24px" strokeWidth="2.5" />
                            <Text color="white" fontWeight="bold" fontSize="2xl" letterSpacing="tight">
                                Tax & Liabilities
                            </Text>
                        </Flex>
                        <Text color="#888888" fontSize="sm">Automated 7.5% VAT calculation based on the Nigerian Finance Act.</Text>
                    </Box>
                    
                    <Button variant="outline" rounded="none" borderColor="#333333" color="white" _hover={{ bg: "#111111" }} h="44px" px={6}>
                        <Icon as={LuDownload} mr={2} strokeWidth="2.5" /> Export Report
                    </Button>
                </Flex>

                {/* --- TIME TOGGLE BUTTONS --- */}
                <Flex bg="#0A0A0A" p={1} rounded="none" border="1px solid" borderColor="#333333" display="inline-flex" gap={1}>
                    {(["1M", "3M", "6M", "1Y", "ALL"] as TimeFilter[]).map((filter) => (
                        <Button
                            key={filter}
                            onClick={() => setTimeFilter(filter)}
                            bg={timeFilter === filter ? "white" : "transparent"}
                            color={timeFilter === filter ? "black" : "#888888"}
                            _hover={{ bg: timeFilter === filter ? "white" : "#111111", color: timeFilter === filter ? "black" : "white" }}
                            h="36px" px={4} rounded="none" fontSize="sm" fontWeight="bold" transition="all 0.2s" border="none"
                        >
                            {filter === "ALL" ? "All Time" : filter}
                        </Button>
                    ))}
                </Flex>
            </Box>

            {/* --- Tax Summary Cards --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                <Box bg="#0A0A0A" rounded="none" p={6} border="1px solid" borderColor="#1A1A1A">
                    <Flex align="center" justify="space-between" mb={3}>
                        <Flex align="center" gap={3}>
                            <Flex bg="#111111" p={2} rounded="none" border="1px solid #333333"><Icon as={LuReceipt} color="white" boxSize="18px" strokeWidth="2.5" /></Flex>
                            <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Gross Sales ({timeFilter})</Text>
                        </Flex>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{totalGross.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                </Box>
                
                <Box bg="#0A0A0A" rounded="none" p={6} border="1px solid" borderColor="#1A1A1A" position="relative" overflow="hidden">
                    <Flex align="center" gap={3} mb={3}>
                        <Flex bg="#111111" p={2} rounded="none" border="1px solid #333333"><Icon as={LuCalculator} color="orange.400" boxSize="18px" strokeWidth="2.5" /></Flex>
                        <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">VAT Collected (7.5%)</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{totalVAT.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                </Box>
                
                <Box bg="#0A0A0A" rounded="none" p={6} border="1px solid" borderColor="#1A1A1A">
                    <Flex align="center" gap={3} mb={3}>
                        <Flex bg="#111111" p={2} rounded="none" border="1px solid #333333"><Icon as={LuWallet} color="#5cac7d" boxSize="18px" strokeWidth="2.5" /></Flex>
                        <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Net Revenue (After Tax)</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{totalNet.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                </Box>
            </SimpleGrid>

            {/* --- Tax Calculation Table --- */}
            <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" mb={4} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                <Box as="table" w="full" minW="900px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                    <Box as="thead" bg="#111111" borderBottom="1px solid" borderColor="#333333">
                        <Box as="tr">
                            {["Date & Ref", "Customer", "Gross Amount", "VAT (7.5%)", "Net Amount", "FIRS Status", "Actions"].map((head, i) => (
                                <Box as="th" key={i} py={4} px={6} color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{head}</Box>
                            ))}
                        </Box>
                    </Box>
                    <Box as="tbody">
                        {filteredSales.length === 0 ? (
                            <Box as="tr"><Box as="td" textAlign="center" py={8} color="#888888" fontSize="sm" fontWeight="bold">No sales found for this period.</Box></Box>
                        ) : (
                            filteredSales.map((sale) => {
                                const vatAmount = sale.grossAmount * VAT_RATE;
                                const netAmount = sale.grossAmount - vatAmount;
                                const isRemitted = sale.status === "Remitted";

                                return (
                                    <Box as="tr" key={sale.id} borderBottom="1px solid" borderColor="#1A1A1A" _hover={{ bg: "#111111" }} transition="background 0.2s">
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="bold">{sale.date}</Text>
                                            <Text color="#888888" fontSize="xs" fontFamily="monospace" mt={0.5}>{sale.reference}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Text color="#888888" fontSize="sm" fontWeight="500">{sale.customer}</Text>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="bold" fontFamily="monospace">₦{sale.grossAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="bold" fontFamily="monospace">₦{vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="bold" fontFamily="monospace">₦{netAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Flex align="center" gap={2} bg="#111111" px={2} py={1} border="1px solid #333333" display="inline-flex">
                                                <Box boxSize="8px" rounded="none" bg={isRemitted ? "#5cac7d" : "orange.400"} />
                                                <Text color={isRemitted ? "white" : "orange.400"} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                                    {sale.status}
                                                </Text>
                                            </Flex>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6} textAlign="right">
                                            <IconButton aria-label="Options" size="sm" variant="ghost" rounded="none" color="#888888" _hover={{ color: "white", bg: "#1A1A1A" }}>
                                                <Icon as={LuEllipsisVertical} strokeWidth="2.5" />
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
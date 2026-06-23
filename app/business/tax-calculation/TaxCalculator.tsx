"use client";
import React, { useState, useMemo } from "react";
import { 
    Box, Flex, Text, SimpleGrid, Icon, Button, IconButton, VStack, Badge
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LuCalculator, LuDownload, LuReceipt, LuLandmark, 
    LuWallet, LuEye, LuX, LuCheck 
} from "react-icons/lu";

import { generateDummyTaxableSales } from "@/data/data";
import { TaxableSale } from "@/types/definitions";

type TimeFilter = "1M" | "3M" | "6M" | "1Y" | "ALL";

// --- TAX DETAILS MODAL ---
const TaxDetailsModal = ({ 
    sale, onClose, onMarkRemitted, vatRate 
}: { 
    sale: TaxableSale | null; onClose: () => void; onMarkRemitted: (id: string) => void; vatRate: number;
}) => {
    if (!sale) return null;
    
    const vatAmount = sale.grossAmount * vatRate;
    const netAmount = sale.grossAmount - vatAmount;
    const isRemitted = sale.status === "Remitted";

    return (
        <AnimatePresence>
            {sale && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
                        onClick={onClose}
                    />
                    <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "400px", md: "450px" }} pointerEvents="none">
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
                        >
                            <Box w="100%" h="100%" bg="#0A0A0A" borderLeft="1px solid" borderColor="#1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                                
                                <Flex justify="space-between" align="center" px={6} pt={8} pb={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#111111">
                                    <Box>
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Tax & Liability Record</Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">{sale.reference}</Text>
                                    </Box>
                                    <IconButton aria-label="Close modal" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <VStack w="full" gap={6} align="stretch">
                                        
                                        {/* Status & Date */}
                                        <Flex justify="space-between" align="center" bg="#111111" p={4} border="1px solid #1A1A1A">
                                            <Box>
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Date of Sale</Text>
                                                <Text color="white" fontSize="sm">{sale.date}</Text>
                                            </Box>
                                            <Badge 
                                                colorScheme={isRemitted ? "green" : "orange"} 
                                                px={3} py={1} rounded="none" textTransform="uppercase" fontWeight="bold" letterSpacing="wider"
                                            >
                                                {sale.status}
                                            </Badge>
                                        </Flex>

                                        {/* Customer Details */}
                                        <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Customer</Text>
                                            <Text color="white" fontWeight="bold">{sale.customer}</Text>
                                        </Box>

                                        {/* Financial Breakdown */}
                                        <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={4}>Tax Calculation Breakdown</Text>
                                            <Flex justify="space-between" mb={2}>
                                                <Text color="#888888" fontSize="sm">Gross Amount</Text>
                                                <Text color="white" fontSize="sm" fontFamily="monospace">₦{sale.grossAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
                                            </Flex>
                                            <Flex justify="space-between" mb={4}>
                                                <Text color="orange.400" fontSize="sm">VAT Liability (7.5%)</Text>
                                                <Text color="orange.400" fontSize="sm" fontFamily="monospace">₦{vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
                                            </Flex>
                                            <Box borderTop="1px dashed #333333" mt={4} pt={4}>
                                                <Flex justify="space-between" align="center">
                                                    <Text color="white" fontWeight="bold">Net Revenue</Text>
                                                    <Text color="#5cac7d" fontSize="xl" fontWeight="black" fontFamily="monospace">₦{netAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
                                                </Flex>
                                            </Box>
                                        </Box>

                                    </VStack>
                                </Box>

                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" bg="#111111" gap={3}>
                                    <Button flex={1} variant="outline" borderColor="#333333" color="white" rounded="none" fontWeight="bold" onClick={onClose} _hover={{ bg: "#1A1A1A" }}>
                                        Close
                                    </Button>
                                    {!isRemitted && (
                                        <Button flex={1} bg="#5cac7d" color="white" rounded="none" fontWeight="bold" onClick={() => onMarkRemitted(sale.id)} _hover={{ bg: "#4a9c6d" }}>
                                            <Icon as={LuCheck} mr={2} strokeWidth="3" /> Mark Remitted
                                        </Button>
                                    )}
                                </Flex>

                            </Box>
                        </motion.div>
                    </Box>
                </>
            )}
        </AnimatePresence>
    );
};


export const TaxCalculator = () => {
    const [allSales, setAllSales] = useState<TaxableSale[]>(generateDummyTaxableSales(50));
    const [timeFilter, setTimeFilter] = useState<TimeFilter>("3M");
    const [viewingSale, setViewingSale] = useState<TaxableSale | null>(null);
    const [isExporting, setIsExporting] = useState(false);

    const VAT_RATE = 0.075; 

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

    const totalGross = filteredSales.reduce((acc, sale) => acc + sale.grossAmount, 0);
    const totalVAT = totalGross * VAT_RATE;
    const totalNet = totalGross - totalVAT;

    // --- ACTIONS ---
    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            const headers = ["Date", "Reference", "Customer", "Gross Amount (NGN)", "VAT (7.5%)", "Net Amount (NGN)", "Status"];
            const csvRows = filteredSales.map(sale => {
                const vat = sale.grossAmount * VAT_RATE;
                const net = sale.grossAmount - vat;
                return `"${sale.date}","${sale.reference}","${sale.customer}",${sale.grossAmount},${vat},${net},"${sale.status}"`;
            });
            const csvString = [headers.join(","), ...csvRows].join("\n");
            
            const blob = new Blob([csvString], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', `tax_liability_report_${timeFilter}.csv`);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            setIsExporting(false);
        }, 500);
    };

    const handleMarkRemitted = (id: string) => {
        setAllSales(prev => prev.map(sale => 
            sale.id === id ? { ...sale, status: "Remitted" } : sale
        ));
        setViewingSale(null);
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000" minH="100vh">
            
            {/* PAGE HEADER (Non-Sticky) */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} wrap="wrap" gap={4} mb={6} pt={2}>
                <Box>
                    <Flex align="center" gap={3} mb={1}>
                        <Icon as={LuLandmark} color="#f1f1f1" boxSize="24px" strokeWidth="2.5" />
                        <Text color="white" fontWeight="bold" fontSize="2xl" letterSpacing="tight">
                            Tax & Liabilities
                        </Text>
                    </Flex>
                    <Text color="#888888" fontSize="sm">Automated 7.5% VAT calculation based on the Nigerian Finance Act.</Text>
                </Box>
                
                <Button 
                    onClick={handleExport}
                    loading={isExporting}
                    loadingText="Exporting..."
                    variant="outline" rounded="none" borderColor="#333333" color="white" _hover={{ bg: "#111111" }} h="44px" px={6}
                >
                    <Icon as={LuDownload} mr={2} strokeWidth="2.5" /> Export Report
                </Button>
            </Flex>

            {/* TAX SUMMARY CARDS (Non-Sticky) */}
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

            {/* STICKY TIME FILTERS */}
            <Box 
                position="sticky" 
                top={{ base: "-16px", md: "-32px" }} 
                mx={{ base: "-16px", md: "-32px" }}  
                px={{ base: "16px", md: "32px" }}    
                zIndex={30} 
                bg="rgba(0, 0, 0, 0.85)" 
                backdropFilter="blur(12px)" 
                py={{ base: 3, md: 4 }} 
                mb={6} 
                borderBottom="1px solid #1A1A1A" 
            >
                <Flex overflowX="auto" css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
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
                </Flex>
            </Box>

            {/* TABLE SECTION */}
            <Box minH="65vh">
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
                                <Box as="tr"><Box as="td" textAlign="center" py={16} color="#888888" fontSize="sm" fontWeight="bold">No sales found for this period.</Box></Box>
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
                                                    <Box boxSize="8px" rounded="full" bg={isRemitted ? "#5cac7d" : "orange.400"} />
                                                    <Text color={isRemitted ? "white" : "orange.400"} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                                        {sale.status}
                                                    </Text>
                                                </Flex>
                                            </Box>
                                            
                                            <Box as="td" py={4} px={6} textAlign="right">
                                                <Button 
                                                    onClick={() => setViewingSale(sale)}
                                                    size="sm" variant="ghost" rounded="none" color="#888888" _hover={{ color: "white", bg: "#1A1A1A" }} fontWeight="bold"
                                                >
                                                    <Icon as={LuEye} mr={1.5} /> View
                                                </Button>
                                            </Box>

                                        </Box>
                                    );
                                })
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Mount Modal */}
            <TaxDetailsModal 
                sale={viewingSale} 
                onClose={() => setViewingSale(null)} 
                onMarkRemitted={handleMarkRemitted} 
                vatRate={VAT_RATE}
            />
        </Box>
    );
};
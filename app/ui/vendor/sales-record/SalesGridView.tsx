"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, IconButton, Spinner } from "@chakra-ui/react";
import { LuSearch, LuRefreshCw, LuDownload, LuEye, LuPlus } from "react-icons/lu";
import { SalesRecord } from "@/app/lib/definitions";

import { SalesPosModal, NewSalePayload } from "./SalesPosModal";


const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px" };

interface SalesGridViewProps {
    visibleItems: SalesRecord[];
    processedSalesLength: number;
    searchQuery: string; sortBy: string; sortOrder: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSortBy: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSortOrder: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onSelectSale: (sale: SalesRecord) => void;
    visibleCount: number; loaderRef: React.RefObject<HTMLDivElement | null>;
    onAddSale: (saleData: NewSalePayload) => void; 
}

export const SalesGridView = ({
    visibleItems, processedSalesLength, searchQuery, sortBy, sortOrder,
    handleSearch, handleSortBy, handleSortOrder, onSelectSale,
    visibleCount, loaderRef, onAddSale
}: SalesGridViewProps) => {

    const [isAddingSale, setIsAddingSale] = useState(false);

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000">
            
            <Flex justify="space-between" align="flex-end" mb={6} wrap="wrap" gap={4} pt={2}>
                <Box>
                    <Flex align="center" gap={3} mb={1}>
                        <Text color="white" fontWeight="bold" fontSize="2xl" letterSpacing="tight">Sales Record & Performance</Text>
                        <Button size="sm" variant="ghost" color="#888888" rounded="none" _hover={{ color: "white", bg: "#111111" }}>
                            <Icon as={LuRefreshCw} mr={2} strokeWidth="2.5" /> Refresh
                        </Button>
                    </Flex>
                    <Text color="#888888" fontSize="sm">View {processedSalesLength} sales transactions and track performance.</Text>
                </Box>
                <Flex gap={3} h="60px">
                    <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" rounded="none" px={5} py={2} display={{ base: "none", md: "block" }}>
                        <Text fontSize="xs" color="#888888" mb={1} fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Total Paid Sales</Text>
                        <Text fontSize="xl" fontWeight="bold" color="white" letterSpacing="tight">₦15,504,834.27</Text>
                    </Box>
                    <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" rounded="none" px={5} py={2} display={{ base: "none", md: "block" }}>
                        <Text fontSize="xs" color="#888888" mb={1} fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Total Sales</Text>
                        <Text fontSize="xl" fontWeight="bold" color="white" letterSpacing="tight">{processedSalesLength}</Text>
                    </Box>
                    <Button bg="white" color="black" h="full" rounded="none" fontWeight="bold" _hover={{ bg: "#E5E5E5" }} border="none" px={6} onClick={() => setIsAddingSale(true)}>
                        <Icon as={LuPlus} mr={2} strokeWidth="2.5" /> Add Record
                    </Button>
                </Flex>
            </Flex>

            <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)" py={3} mb={6} borderBottom="1px solid" borderColor="#1A1A1A" w="full">
                <Flex gap={3} wrap="wrap">
                    <Flex flex={1} minW="250px" align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input placeholder="Search by order #, customer..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" value={searchQuery} onChange={handleSearch} px={0} h="full" />
                    </Flex>
                    <Box w={{ base: "full", md: "auto" }}>
                        <select value={sortBy} onChange={handleSortBy} style={nativeSelectStyle}>
                            <option value="date" style={{ background: "#0A0A0A" }}>Sort: Date Created</option>
                            <option value="total" style={{ background: "#0A0A0A" }}>Sort: Total Amount</option>
                            <option value="discount" style={{ background: "#0A0A0A" }}>Sort: Discount</option>
                        </select>
                    </Box>
                    <Box w={{ base: "full", md: "auto" }}>
                        <select value={sortOrder} onChange={handleSortOrder} style={nativeSelectStyle}>
                            <option value="desc" style={{ background: "#0A0A0A" }}>Newest / Highest First</option>
                            <option value="asc" style={{ background: "#0A0A0A" }}>Oldest / Lowest First</option>
                        </select>
                    </Box>
                </Flex>
            </Box>

            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column" border="1px dashed #1A1A1A" bg="#0A0A0A">
                    <Text color="#888888" fontSize="lg" fontWeight="bold">No records found.</Text>
                </Flex>
            ) : (
                <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" mb={8} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                    <Box as="table" w="full" minW="800px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                        <Box as="thead" bg="#111111" borderBottom="1px solid" borderColor="#333333">
                            <Box as="tr">
                                {["Order ID", "Transaction", "Date", "Payment", "Discount", "Total", "Actions"].map((head) => (
                                    <Box as="th" key={head} py={4} px={5} color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{head}</Box>
                                ))}
                            </Box>
                        </Box>
                        <Box as="tbody">
                            {visibleItems.map((sale: SalesRecord, idx: number) => (
                                <Box as="tr" key={idx} borderBottom="1px solid" borderColor="#1A1A1A" _hover={{ bg: "#111111" }} transition="background 0.2s">
                                    <Box as="td" py={5} px={5}>
                                        <Text color="white" fontSize="sm" fontWeight="bold">{sale.id}</Text>
                                        <Text fontSize="10px" color="#888888" fontWeight="bold" textTransform="uppercase" mt={0.5} letterSpacing="wider">{sale.type}</Text>
                                    </Box>
                                    <Box as="td" py={5} px={5}><Text color="white" fontSize="sm" fontWeight="500">{sale.transaction}</Text></Box>
                                    <Box as="td" py={5} px={5}><Text color="#888888" fontSize="sm">{sale.date}</Text></Box>
                                    <Box as="td" py={5} px={5}>
                                        {/* Pure monochrome badge for payment */}
                                        <Flex align="center" justify="center" px={2} py={1} rounded="none" bg={sale.payment === "Transfer" ? "white" : "#111111"} color={sale.payment === "Transfer" ? "black" : "white"} border={sale.payment === "Transfer" ? "none" : "1px solid #333333"} fontSize="11px" fontWeight="bold" display="inline-flex">
                                            {sale.payment}
                                        </Flex>
                                    </Box>
                                    <Box as="td" py={5} px={5}><Text color="#888888" fontSize="sm" fontWeight="500">₦{sale.discount.toLocaleString()}</Text></Box>
                                    <Box as="td" py={5} px={5}><Text color="white" fontSize="sm" fontWeight="bold">₦{sale.total.toLocaleString()}</Text></Box>
                                    <Box as="td" py={5} px={5}>
                                        <Flex gap={2}>
                                            <IconButton aria-label="Download" variant="ghost" size="sm" rounded="none" color="#888888" _hover={{ color: "white", bg: "#1A1A1A" }}><Icon as={LuDownload} strokeWidth="2.5" /></IconButton>
                                            <IconButton aria-label="View" onClick={() => onSelectSale(sale)} variant="ghost" size="sm" rounded="none" color="#888888" _hover={{ color: "white", bg: "#1A1A1A" }}><Icon as={LuEye} strokeWidth="2.5" /></IconButton>
                                        </Flex>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    {visibleCount < processedSalesLength && (
                        <Flex ref={loaderRef} justify="center" align="center" py={8} h="80px">
                            <Spinner color="white" size="md" />
                        </Flex>
                    )}
                </Box>
            )}

            {/* Bottom Summary Box */}
            <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#333333" p={6} mb={8}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
                    <Box borderRight={{ lg: "1px solid" }} borderColor="#1A1A1A" pr={{ lg: 4 }}>
                        <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={3}>Overview</Text>
                        <Flex justify="space-between" mb={2}><Text fontSize="sm" color="#888888">Transactions</Text><Text fontSize="sm" color="white" fontWeight="bold">111</Text></Flex>
                        <Flex justify="space-between"><Text fontSize="sm" color="#888888">Items Sold</Text><Text fontSize="sm" color="white" fontWeight="bold">203</Text></Flex>
                    </Box>
                    <Box borderRight={{ lg: "1px solid" }} borderColor="#1A1A1A" pr={{ lg: 4 }}>
                        <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={3}>Payment Breakdown</Text>
                        <Flex justify="space-between" mb={2}><Text fontSize="sm" color="#888888">Bank Transfer</Text><Text fontSize="sm" color="white" fontWeight="bold">74</Text></Flex>
                        <Flex justify="space-between"><Text fontSize="sm" color="#888888">Credit Card</Text><Text fontSize="sm" color="white" fontWeight="bold">35</Text></Flex>
                    </Box>
                    <Box borderRight={{ lg: "1px solid" }} borderColor="#1A1A1A" pr={{ lg: 4 }}>
                        <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={3}>Discounts Applied</Text>
                        <Flex justify="space-between" mb={2}><Text fontSize="sm" color="#888888">Average Disc.</Text><Text fontSize="sm" color="white" fontWeight="bold">20.98%</Text></Flex>
                        <Flex justify="space-between"><Text fontSize="sm" color="#888888">Total Disc. Value</Text><Text fontSize="sm" color="white" fontWeight="bold">₦976,652</Text></Flex>
                    </Box>
                    <Box>
                        <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={3}>Net Financials</Text>
                        <Flex justify="space-between" mb={2}><Text fontSize="sm" color="#888888">Total VAT</Text><Text fontSize="sm" color="white" fontWeight="bold">₦1,017,283.28</Text></Flex>
                        <Flex justify="space-between" mt={3} pt={3} borderTop="1px solid" borderColor="#333333">
                            <Text fontSize="sm" color="white" fontWeight="bold">Net Revenue</Text>
                            <Text fontSize="md" color="white" fontWeight="black" letterSpacing="tight">₦15,504,834</Text>
                        </Flex>
                    </Box>
                </SimpleGrid>
            </Box>

            <SalesPosModal 
                isOpen={isAddingSale} 
                onClose={() => setIsAddingSale(false)} 
                onAddSale={onAddSale} 
            />
        </Box>
    );
};
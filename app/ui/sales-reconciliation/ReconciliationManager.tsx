"use client";
import React, { useState } from "react";

import { Box, Flex, Text, Icon, Input, Button, HStack, SimpleGrid, Badge } from "@chakra-ui/react";

import { 
    LuScale, LuSearch, LuCheck, LuTriangleAlert, 
    LuClock, LuDownload, LuSignature, LuWallet
} from "react-icons/lu";

import { generateDummyReconciliations } from "@/app/lib/data";
import { ReconciliationRecord } from "@/app/lib/definitions";

export const ReconciliationManager = () => {
    const [records, setRecords] = useState<ReconciliationRecord[]>(generateDummyReconciliations());
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"All" | "Matched" | "Discrepancy" | "Pending">("All");

    // --- ACTIONS ---
    const resolveDiscrepancy = (id: string) => {
        setRecords(prev => prev.map(rec => 
            rec.id === id ? { ...rec, status: "Matched", actualPayout: rec.expectedAmount - rec.gatewayFee, notes: "Resolved manually." } : rec
        ));
    };

    // --- FILTERING ---
    const filteredRecords = records.filter(rec => {
        const matchesSearch = rec.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              rec.gateway.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || rec.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // --- STATS ---
    const totalExpected = records.reduce((acc, curr) => acc + curr.expectedAmount, 0);
    const totalActual = records.reduce((acc, curr) => acc + curr.actualPayout, 0);
    const totalFees = records.reduce((acc, curr) => acc + curr.gatewayFee, 0);
    
    // Discrepancy Calculation: Expected - Fees - Actual. If > 0, money is missing!
    const missingFunds = records
        .filter(r => r.status === "Discrepancy")
        .reduce((acc, curr) => acc + (curr.expectedAmount - curr.gatewayFee - curr.actualPayout), 0);

    const selectStyles = {
        backgroundColor: "#121214", color: "white", height: "44px", padding: "0 16px",
        borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.16)", cursor: "pointer", outline: "none"
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* --- Sticky Header --- */}
            <Box 
                position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} 
                bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} mx={-4} px={4} 
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4}>
                    <Box>
                        <Text color="#5cac7d" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2}>
                            <Icon as={LuScale} /> Sales Reconciliation
                        </Text>
                        <Text color="gray.400" fontSize="sm">Match system sales against actual bank payouts to prevent revenue leakage.</Text>
                    </Box>
                    <HStack gap={3}>
                        <Button variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }} h="44px" px={4}>
                            <Icon as={LuDownload} mr={2} /> Export Report
                        </Button>
                    </HStack>
                </Flex>
            </Box>

            {/* --- STATS & FILTERS --- */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4} mb={8}>
                <Box bg="#1A1C23" p={5} rounded="xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Text color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">Expected Revenue</Text>
                    <Text color="white" fontSize="2xl" fontWeight="black" mt={1}>₦{totalExpected.toLocaleString()}</Text>
                    <Text color="gray.500" fontSize="xs" mt={1}>Total sales recorded</Text>
                </Box>
                <Box bg="#1A1C23" p={5} rounded="xl" border="1px solid" borderColor="rgba(92, 172, 125, 0.3)">
                    <Text color="#5cac7d" fontSize="xs" fontWeight="bold" textTransform="uppercase">Actual Payouts</Text>
                    <Text color="#5cac7d" fontSize="2xl" fontWeight="black" mt={1}>₦{totalActual.toLocaleString()}</Text>
                    <Text color="gray.500" fontSize="xs" mt={1}>Money hit the bank</Text>
                </Box>
                <Box bg="#1A1C23" p={5} rounded="xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Text color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">Gateway Fees</Text>
                    <Text color="white" fontSize="2xl" fontWeight="black" mt={1}>₦{totalFees.toLocaleString()}</Text>
                    <Text color="gray.500" fontSize="xs" mt={1}>Paystack/Processing costs</Text>
                </Box>
                <Box bg="#1A1C23" p={5} rounded="xl" border="1px solid" borderColor={missingFunds > 0 ? "rgba(245, 101, 101, 0.3)" : "whiteAlpha.100"}>
                    <Flex align="center" gap={2}>
                        <Icon as={missingFunds > 0 ? LuTriangleAlert : LuCheck} color={missingFunds > 0 ? "red.400" : "gray.400"} />
                        <Text color={missingFunds > 0 ? "red.400" : "gray.400"} fontSize="xs" fontWeight="bold" textTransform="uppercase">Missing Funds</Text>
                    </Flex>
                    <Text color={missingFunds > 0 ? "red.400" : "white"} fontSize="2xl" fontWeight="black" mt={1}>₦{missingFunds.toLocaleString()}</Text>
                    {missingFunds > 0 && <Text color="red.400" fontSize="xs" mt={1} fontWeight="bold">Action Required!</Text>}
                </Box>
            </SimpleGrid>

            {/* --- SEARCH & FILTER BAR --- */}
            <Flex gap={4} mb={6} direction={{ base: "column", md: "row" }}>
                <Flex align="center" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.200" rounded="xl" px={4} h="44px" flex={1} _focusWithin={{ borderColor: "#5cac7d" }}>
                    <Icon as={LuSearch} color="gray.400" />
                    <Input 
                        placeholder="Search Batch ID or Gateway..." 
                        border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" ml={2}
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Flex>
                <select 
                    style={{...selectStyles, minWidth: "200px"}} 
                    value={statusFilter} 
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as "All" | "Matched" | "Discrepancy" | "Pending")}
                >
                    <option value="All">All Settlements</option>
                    <option value="Matched">Matched</option>
                    <option value="Discrepancy">Discrepancy</option>
                    <option value="Pending">Pending Payout</option>
                </select>
            </Flex>

            {/* --- RECONCILIATION TABLE --- */}
            <Box bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' } }}>
                <Box as="table" w="full" minW="1000px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                    <Box as="thead" bg="#1A1C23" borderBottom="1px solid" borderColor="whiteAlpha.100">
                        <Box as="tr">
                            {["Settlement ID", "Gateway", "Expected", "Fees", "Actual Payout", "Variance", "Status", ""].map((head, i) => (
                                <Box as="th" key={i} py={4} px={6} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">{head}</Box>
                            ))}
                        </Box>
                    </Box>
                    <Box as="tbody">
                        {filteredRecords.length === 0 ? (
                            <Box as="tr">
                                
                                <td colSpan={8}>
                                    <Box textAlign="center" py={8} color="gray.500">No records found.</Box>
                                </td>
                            </Box>
                        ) : (
                            filteredRecords.map((rec) => {
                                const isMatched = rec.status === "Matched";
                                const isDiscrepancy = rec.status === "Discrepancy";
                                const isPending = rec.status === "Pending";
                                
                                // Expected minus fees minus what actually arrived
                                const variance = rec.expectedAmount - rec.gatewayFee - rec.actualPayout;

                                return (
                                    <Box as="tr" key={rec.id} borderBottom="1px solid" borderColor="whiteAlpha.50" _hover={{ bg: "whiteAlpha.50" }} transition="background 0.2s">
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="bold">{rec.id}</Text>
                                            <Text color="gray.500" fontSize="xs">{rec.settlementDate}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Flex align="center" gap={2}>
                                                <Icon as={LuWallet} color="gray.400" boxSize="14px" />
                                                <Text color="white" fontSize="sm">{rec.gateway}</Text>
                                            </Flex>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Text color="gray.300" fontSize="sm" fontWeight="medium">₦{rec.expectedAmount.toLocaleString()}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Text color="gray.500" fontSize="sm">-₦{rec.gatewayFee.toLocaleString()}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Text color={isPending ? "gray.600" : "white"} fontSize="sm" fontWeight="bold">
                                                {isPending ? "Awaiting..." : `₦${rec.actualPayout.toLocaleString()}`}
                                            </Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            {isPending ? (
                                                <Text color="gray.600" fontSize="sm">-</Text>
                                            ) : variance === 0 ? (
                                                <Text color="#5cac7d" fontSize="sm" fontWeight="bold">₦0.00</Text>
                                            ) : (
                                                <Text color="red.400" fontSize="sm" fontWeight="bold">-₦{variance.toLocaleString()}</Text>
                                            )}
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Badge 
                                                bg={isMatched ? "rgba(92, 172, 125, 0.15)" : isDiscrepancy ? "rgba(245, 101, 101, 0.15)" : "whiteAlpha.100"} 
                                                color={isMatched ? "#5cac7d" : isDiscrepancy ? "red.400" : "gray.400"} 
                                                px={2} py={1} rounded="md" display="inline-flex" alignItems="center" gap={1}
                                            >
                                                {isMatched && <Icon as={LuCheck} boxSize="10px" />}
                                                {isDiscrepancy && <Icon as={LuTriangleAlert} boxSize="10px" />}
                                                {isPending && <Icon as={LuClock} boxSize="10px" />}
                                                {rec.status}
                                            </Badge>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6} textAlign="right">
                                            {isDiscrepancy && (
                                                <Button size="sm" onClick={() => resolveDiscrepancy(rec.id)} variant="outline" borderColor="red.400" color="red.400" _hover={{ bg: "rgba(245, 101, 101, 0.1)" }}>
                                                    <Icon as={LuSignature} mr={2} /> Resolve
                                                </Button>
                                            )}
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
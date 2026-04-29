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
        backgroundColor: "#0A0A0A", color: "white", height: "44px", padding: "0 16px",
        borderRadius: "0px", border: "1px solid #333333", cursor: "pointer", outline: "none"
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000">
            
            {/* --- Sticky Header --- */}
            <Box 
                position="sticky" top={{ base: "-16px", md: "-32px" }} mx={{ base: "-16px", md: "-32px" }} px={{ base: "16px", md: "32px" }}
                zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} borderBottom="1px solid #1A1A1A"
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4}>
                    <Box>
                        <Text color="white" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2} letterSpacing="tight">
                            <Icon as={LuScale} color="#5cac7d" strokeWidth="2.5" /> Sales Reconciliation
                        </Text>
                        <Text color="#888888" fontSize="sm">Match system sales against actual bank payouts to prevent revenue leakage.</Text>
                    </Box>
                    <HStack gap={3}>
                        <Button variant="outline" borderColor="#333333" color="white" _hover={{ bg: "#111111" }} rounded="none" h="44px" px={4}>
                            <Icon as={LuDownload} mr={2} strokeWidth="2.5" /> Export Report
                        </Button>
                    </HStack>
                </Flex>
            </Box>

            {/* --- STATS & FILTERS --- */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4} mb={8}>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Expected Revenue</Text>
                    <Text color="white" fontSize="2xl" fontWeight="black" mt={1} letterSpacing="tight">₦{totalExpected.toLocaleString()}</Text>
                    <Text color="#555555" fontSize="xs" mt={1}>Total sales recorded</Text>
                </Box>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#5cac7d" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Actual Payouts</Text>
                    <Text color="#5cac7d" fontSize="2xl" fontWeight="black" mt={1} letterSpacing="tight">₦{totalActual.toLocaleString()}</Text>
                    <Text color="#555555" fontSize="xs" mt={1}>Money hit the bank</Text>
                </Box>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Gateway Fees</Text>
                    <Text color="white" fontSize="2xl" fontWeight="black" mt={1} letterSpacing="tight">₦{totalFees.toLocaleString()}</Text>
                    <Text color="#555555" fontSize="xs" mt={1}>Paystack/Processing costs</Text>
                </Box>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor={missingFunds > 0 ? "red.900" : "#1A1A1A"}>
                    <Flex align="center" gap={2}>
                        <Icon as={missingFunds > 0 ? LuTriangleAlert : LuCheck} color={missingFunds > 0 ? "red.400" : "#888888"} strokeWidth="2.5" />
                        <Text color={missingFunds > 0 ? "red.400" : "#888888"} fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Missing Funds</Text>
                    </Flex>
                    <Text color={missingFunds > 0 ? "red.400" : "white"} fontSize="2xl" fontWeight="black" mt={1} letterSpacing="tight">₦{missingFunds.toLocaleString()}</Text>
                    {missingFunds > 0 && <Text color="red.400" fontSize="xs" mt={1} fontWeight="bold">Action Required!</Text>}
                </Box>
            </SimpleGrid>

            {/* --- SEARCH & FILTER BAR --- */}
            <Flex gap={4} mb={6} direction={{ base: "column", md: "row" }}>
                <Flex align="center" bg="#0A0A0A" border="1px solid" borderColor="#333333" rounded="none" px={4} h="44px" flex={1} _focusWithin={{ borderColor: "white" }}>
                    <Icon as={LuSearch} color="#888888" strokeWidth="2.5" />
                    <Input 
                        placeholder="Search Batch ID or Gateway..." 
                        border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" ml={2} px={0}
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Flex>
                <select 
                    style={{...selectStyles, minWidth: "200px"}} 
                    value={statusFilter} 
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as "All" | "Matched" | "Discrepancy" | "Pending")}
                >
                    <option value="All" style={{ background: "#0A0A0A" }}>All Settlements</option>
                    <option value="Matched" style={{ background: "#0A0A0A" }}>Matched</option>
                    <option value="Discrepancy" style={{ background: "#0A0A0A" }}>Discrepancy</option>
                    <option value="Pending" style={{ background: "#0A0A0A" }}>Pending Payout</option>
                </select>
            </Flex>

            {/* --- RECONCILIATION TABLE --- */}
            <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                <Box as="table" w="full" minW="1000px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                    <Box as="thead" bg="#111111" borderBottom="1px solid" borderColor="#333333">
                        <Box as="tr">
                            {["Settlement ID", "Gateway", "Expected", "Fees", "Actual Payout", "Variance", "Status", "Actions"].map((head, i) => (
                                <Box as="th" key={i} py={4} px={6} color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{head}</Box>
                            ))}
                        </Box>
                    </Box>
                    <Box as="tbody">
                        {filteredRecords.length === 0 ? (
                            <Box as="tr">
                                <td colSpan={8}>
                                    <Box textAlign="center" py={10} color="#888888" fontWeight="bold">No records found.</Box>
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
                                    <Box as="tr" key={rec.id} borderBottom="1px solid" borderColor="#1A1A1A" _hover={{ bg: "#111111" }} transition="background 0.2s">
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="bold">{rec.id}</Text>
                                            <Text color="#888888" fontSize="xs">{rec.settlementDate}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Flex align="center" gap={2}>
                                                <Icon as={LuWallet} color="#888888" boxSize="14px" />
                                                <Text color="white" fontSize="sm">{rec.gateway}</Text>
                                            </Flex>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="bold" fontFamily="monospace">₦{rec.expectedAmount.toLocaleString()}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Text color="#888888" fontSize="sm" fontFamily="monospace">-₦{rec.gatewayFee.toLocaleString()}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Text color={isPending ? "#888888" : "white"} fontSize="sm" fontWeight="bold" fontFamily="monospace">
                                                {isPending ? "Awaiting..." : `₦${rec.actualPayout.toLocaleString()}`}
                                            </Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            {isPending ? (
                                                <Text color="#888888" fontSize="sm">-</Text>
                                            ) : variance === 0 ? (
                                                <Text color="#5cac7d" fontSize="sm" fontWeight="bold" fontFamily="monospace">₦0.00</Text>
                                            ) : (
                                                <Text color="red.400" fontSize="sm" fontWeight="bold" fontFamily="monospace">-₦{variance.toLocaleString()}</Text>
                                            )}
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Badge 
                                                bg="#111111"
                                                color={isMatched ? "#5cac7d" : isDiscrepancy ? "red.400" : "#888888"} 
                                                border="1px solid" borderColor={isMatched ? "rgba(92, 172, 125, 0.3)" : isDiscrepancy ? "rgba(245, 101, 101, 0.3)" : "#333333"}
                                                px={2} py={1} rounded="none" display="inline-flex" alignItems="center" gap={1.5} fontSize="10px" textTransform="uppercase" letterSpacing="wider" fontWeight="bold"
                                            >
                                                {isMatched && <Icon as={LuCheck} boxSize="10px" strokeWidth="3" />}
                                                {isDiscrepancy && <Icon as={LuTriangleAlert} boxSize="10px" strokeWidth="3" />}
                                                {isPending && <Icon as={LuClock} boxSize="10px" strokeWidth="3" />}
                                                {rec.status}
                                            </Badge>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6} textAlign="right">
                                            {isDiscrepancy && (
                                                <Button size="sm" onClick={() => resolveDiscrepancy(rec.id)} variant="outline" borderColor="#333333" color="red.400" rounded="none" _hover={{ bg: "#111111", color: "white" }}>
                                                    <Icon as={LuSignature} mr={2} strokeWidth="2.5" /> Resolve
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
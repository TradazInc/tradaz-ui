"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, HStack, SimpleGrid } from "@chakra-ui/react";
import { 
    LuLandmark, LuFileText, LuCheck, 
    LuTriangleAlert, LuClock,
    LuDownload, LuSave, LuShieldCheck, LuPercent
} from "react-icons/lu";

import { generateDummyVatRecords } from "@/app/lib/data";
import { VatRemittance } from "@/app/lib/definitions";

export const VatManager = () => {
    const [records, setRecords] = useState<VatRemittance[]>(generateDummyVatRecords());
    const [vatRate, setVatRate] = useState("7.5");

    // --- ACTIONS ---
    const markAsRemitted = (id: string) => {
        const dummyReceipt = `FIRS-${new Date().getTime().toString().slice(-6)}`;
        
        setRecords(prev => prev.map(record => 
            record.id === id ? { 
                ...record, 
                status: "Remitted", 
                remittedAmount: record.collectedAmount,
                firsReceiptNo: dummyReceipt
            } : record
        ));
    };

    // --- STATS ---
    const pendingLiability = records
        .filter(r => r.status === "Pending" || r.status === "Overdue")
        .reduce((acc, curr) => acc + curr.collectedAmount, 0);

    const totalRemittedYTD = records
        .filter(r => r.status === "Remitted" && r.period.includes("2026"))
        .reduce((acc, curr) => acc + curr.remittedAmount, 0);

    const overdueCount = records.filter(r => r.status === "Overdue").length;

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
                            <Icon as={LuLandmark} color="#5cac7d" strokeWidth="2.5" /> VAT & FIRS Remittance
                        </Text>
                        <Text color="#888888" fontSize="sm">Track monthly VAT collection, manage FIRS payments, and adjust tax rates.</Text>
                    </Box>
                    <HStack gap={3}>
                        <Button bg="#111111" color="white" border="1px solid #333333" rounded="none" _hover={{ bg: "#1A1A1A" }} h="44px" px={4} fontWeight="bold">
                            <Icon as={LuDownload} color="#888888" mr={2} strokeWidth="2.5" /> Export CSV
                        </Button>
                    </HStack>
                </Flex>
            </Box>

            {/* --- TOP ROW: CONFIG & CRITICAL STATS --- */}
            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6} mb={8}>
                
                {/* VAT Rate Configurator */}
                <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Flex align="center" gap={2} mb={4} color="#888888">
                        <Icon as={LuPercent} color="#5cac7d" strokeWidth="2.5" />
                        <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Active Global VAT Rate</Text>
                    </Flex>
                    <Flex align="center" gap={3}>
                        <Flex align="center" bg="#111111" border="1px solid" borderColor="#333333" rounded="none" px={3} h="44px" w="120px" _focusWithin={{ borderColor: "white" }}>
                            <Input 
                                type="number" step="0.1" value={vatRate} onChange={(e) => setVatRate(e.target.value)} 
                                border="none" _focus={{ boxShadow: "none" }} color="white" h="full" px={0} fontSize="xl" fontWeight="black" letterSpacing="tight"
                            />
                            <Text color="#888888" fontSize="sm" ml={2} fontWeight="bold">%</Text>
                        </Flex>
                        <Button bg="#111111" color="white" border="1px solid #333333" rounded="none" _hover={{ bg: "#1A1A1A" }} h="44px" px={6}>
                            <Icon as={LuSave} color="#5cac7d" mr={2} strokeWidth="2.5" /> Update
                        </Button>
                    </Flex>
                    <Text color="#555555" fontSize="xs" mt={3} fontWeight="bold">Updates the automated tax calculation for all future checkouts.</Text>
                </Box>

                {/* Outstanding Liability */}
                <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Flex align="center" gap={2} mb={2} color="#888888">
                        <Icon as={overdueCount > 0 ? LuTriangleAlert : LuFileText} color={overdueCount > 0 ? "red.400" : "orange.400"} strokeWidth="2.5" />
                        <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Unremitted VAT Liability</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{pendingLiability.toLocaleString()}</Text>
                    {overdueCount > 0 && (
                        <Flex align="center" gap={1.5} mt={2}>
                            <Icon as={LuTriangleAlert} color="red.400" boxSize="14px" strokeWidth="2.5" />
                            <Text color="white" fontSize="xs" fontWeight="bold">{overdueCount} month(s) overdue for FIRS payment!</Text>
                        </Flex>
                    )}
                </Box>

                {/* YTD Paid */}
                <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Flex align="center" gap={2} mb={2} color="#888888">
                        <Icon as={LuShieldCheck} color="blue.400" strokeWidth="2.5" />
                        <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Total Remitted (YTD)</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{totalRemittedYTD.toLocaleString()}</Text>
                    <Text color="#555555" fontSize="xs" mt={2} fontWeight="bold">Compliant payments made to FIRS in 2026.</Text>
                </Box>
            </SimpleGrid>

            {/* --- MONTHLY REMITTANCE TABLE --- */}
            <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" mb={4} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                <Box as="table" w="full" minW="800px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                    <Box as="thead" bg="#111111" borderBottom="1px solid" borderColor="#333333">
                        <Box as="tr">
                            {["Tax Period", "Collected VAT", "Due Date", "FIRS Receipt No.", "Status", "Actions"].map((head, i) => (
                                <Box as="th" key={i} py={4} px={6} color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{head}</Box>
                            ))}
                        </Box>
                    </Box>
                    <Box as="tbody">
                        {records.length === 0 ? (
                            <Box as="tr">
                                <td colSpan={6}>
                                    <Box textAlign="center" py={12} color="#888888" border="1px dashed #1A1A1A" bg="#000000" fontWeight="bold">No tax records found.</Box>
                                </td>
                            </Box>
                        ) : (
                            records.map((record) => {
                                const isRemitted = record.status === "Remitted";
                                const isOverdue = record.status === "Overdue";

                                return (
                                    <Box as="tr" key={record.id} borderBottom="1px solid" borderColor="#1A1A1A" _hover={{ bg: "#111111" }} transition="background 0.2s">
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="bold">{record.period}</Text>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="bold" fontFamily="monospace">₦{record.collectedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Text color={isOverdue ? "white" : "#888888"} fontSize="sm" fontWeight={isOverdue ? "bold" : "500"}>
                                                {record.dueDate}
                                            </Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            {isRemitted ? (
                                                <Text color="white" fontSize="xs" fontFamily="monospace" bg="#111111" border="1px solid #333333" px={2} py={1} rounded="none" display="inline-block">
                                                    {record.firsReceiptNo}
                                                </Text>
                                            ) : (
                                                <Text color="#555555" fontSize="xs" fontStyle="italic" fontWeight="bold">Awaiting payment...</Text>
                                            )}
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Flex align="center" gap={1.5} px={2} py={1} bg="#111111" border="1px solid #333333" rounded="none" display="inline-flex">
                                                <Icon as={isRemitted ? LuCheck : isOverdue ? LuTriangleAlert : LuClock} color={isRemitted ? "#5cac7d" : isOverdue ? "red.400" : "orange.400"} strokeWidth="3" boxSize="12px" />
                                                <Text color="white" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                                    {record.status}
                                                </Text>
                                            </Flex>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6} textAlign="right">
                                            {!isRemitted && (
                                                <Button size="sm" onClick={() => markAsRemitted(record.id)} variant="outline" borderColor="#333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A" }}>
                                                    <Icon as={LuCheck} color="#5cac7d" mr={2} strokeWidth="2.5" /> Mark Remitted
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
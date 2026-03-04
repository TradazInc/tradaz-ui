"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, HStack, SimpleGrid } from "@chakra-ui/react";
import { 
    LuLandmark, LuFileText, LuCheck, 
    LuTriangleAlert, 
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
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* --- Sticky Header (Mobile Optimized) --- */}
            <Box 
                position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} 
                bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} mx={-4} px={4} 
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4}>
                    <Box>
                        <Text color="#5cac7d" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2}>
                            <Icon as={LuLandmark} /> VAT & FIRS Remittance
                        </Text>
                        <Text color="gray.400" fontSize="sm">Track monthly VAT collection, manage FIRS payments, and adjust tax rates.</Text>
                    </Box>
                    <HStack gap={3}>
                        <Button variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }} h="44px" px={4}>
                            <Icon as={LuDownload} mr={2} /> Export CSV
                        </Button>
                    </HStack>
                </Flex>
            </Box>

            {/* --- TOP ROW: CONFIG & CRITICAL STATS --- */}
            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6} mb={8}>
                
                {/* VAT Rate Configurator */}
                <Box bg="#1A1C23" p={5} rounded="xl" border="1px solid" borderColor="#5cac7d">
                    <Flex align="center" gap={2} mb={4} color="gray.300">
                        <Icon as={LuPercent} color="#5cac7d" />
                        <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">Active Global VAT Rate</Text>
                    </Flex>
                    <Flex align="center" gap={3}>
                        <Flex align="center" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="md" px={3} h="44px" w="120px">
                            <Input 
                                type="number" step="0.1" value={vatRate} onChange={(e) => setVatRate(e.target.value)} 
                                border="none" _focus={{ boxShadow: "none" }} color="white" h="full" px={0} fontSize="lg" fontWeight="black" 
                            />
                            <Text color="gray.500" fontSize="sm" ml={2}>%</Text>
                        </Flex>
                        <Button bg="rgba(92, 172, 125, 0.15)" color="#5cac7d" _hover={{ bg: "#5cac7d", color: "white" }} h="44px">
                            <Icon as={LuSave} mr={2} /> Update
                        </Button>
                    </Flex>
                    <Text color="gray.500" fontSize="xs" mt={3}>Updates the automated tax calculation for all future checkouts.</Text>
                </Box>

                {/* Outstanding Liability */}
                <Box bg="#1A1C23" p={5} rounded="xl" border="1px solid" borderColor={overdueCount > 0 ? "rgba(245, 101, 101, 0.3)" : "rgba(237, 137, 54, 0.3)"}>
                    <Flex align="center" gap={2} mb={2} color={overdueCount > 0 ? "red.400" : "orange.400"}>
                
                        <Icon as={overdueCount > 0 ? LuTriangleAlert : LuFileText} />
                        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">Unremitted VAT Liability</Text>
                    </Flex>
                    <Text color={overdueCount > 0 ? "red.400" : "orange.400"} fontSize="3xl" fontWeight="black">₦{pendingLiability.toLocaleString()}</Text>
                    {overdueCount > 0 && (
                        <Text color="red.400" fontSize="xs" mt={1} fontWeight="bold">⚠️ {overdueCount} month(s) overdue for FIRS payment!</Text>
                    )}
                </Box>

                {/* YTD Paid */}
                <Box bg="#1A1C23" p={5} rounded="xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Flex align="center" gap={2} mb={2} color="gray.400">
                        <Icon as={LuShieldCheck} />
                        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase">Total Remitted (YTD)</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black">₦{totalRemittedYTD.toLocaleString()}</Text>
                    <Text color="gray.500" fontSize="xs" mt={1}>Compliant payments made to FIRS in 2026.</Text>
                </Box>
            </SimpleGrid>

            {/* --- MONTHLY REMITTANCE TABLE --- */}
            <Box bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" mb={4} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' } }}>
                <Box as="table" w="full" minW="800px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                    <Box as="thead" bg="#1A1C23" borderBottom="1px solid" borderColor="whiteAlpha.100">
                        <Box as="tr">
                            {["Tax Period", "Collected VAT", "Due Date", "FIRS Receipt No.", "Status", ""].map((head, i) => (
                                <Box as="th" key={i} py={4} px={6} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">{head}</Box>
                            ))}
                        </Box>
                    </Box>
                    <Box as="tbody">
                        {records.length === 0 ? (
                            <Box as="tr"><Box as="td"  textAlign="center" py={8} color="gray.500">No tax records found.</Box></Box>
                        ) : (
                            records.map((record) => {
                                const isRemitted = record.status === "Remitted";
                                const isOverdue = record.status === "Overdue";

                                return (
                                    <Box as="tr" key={record.id} borderBottom="1px solid" borderColor="whiteAlpha.50" _hover={{ bg: "whiteAlpha.50" }} transition="background 0.2s">
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="bold">{record.period}</Text>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="medium">₦{record.collectedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Text color={isOverdue ? "red.400" : "gray.400"} fontSize="sm" fontWeight={isOverdue ? "bold" : "normal"}>
                                                {record.dueDate}
                                            </Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            {isRemitted ? (
                                                <Text color="gray.400" fontSize="xs" fontFamily="monospace" bg="blackAlpha.300" px={2} py={1} rounded="md" display="inline-block">
                                                    {record.firsReceiptNo}
                                                </Text>
                                            ) : (
                                                <Text color="gray.600" fontSize="xs" fontStyle="italic">Awaiting payment...</Text>
                                            )}
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Flex align="center" px={2.5} py={1} rounded="full" display="inline-flex" bg={isRemitted ? "rgba(92, 172, 125, 0.15)" : isOverdue ? "rgba(245, 101, 101, 0.15)" : "rgba(237, 137, 54, 0.15)"}>
                                                <Box boxSize="6px" rounded="full" mr={2} bg={isRemitted ? "#5cac7d" : isOverdue ? "red.400" : "orange.400"} />
                                                <Text color={isRemitted ? "#5cac7d" : isOverdue ? "red.400" : "orange.400"} fontSize="xs" fontWeight="bold">
                                                    {record.status}
                                                </Text>
                                            </Flex>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6} textAlign="right">
                                            {!isRemitted && (
                                                <Button size="sm" onClick={() => markAsRemitted(record.id)} variant="outline" borderColor="whiteAlpha.200" color="#5cac7d" _hover={{ bg: "rgba(92, 172, 125, 0.1)" }}>
                                                    <Icon as={LuCheck} mr={2} /> Mark Remitted
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
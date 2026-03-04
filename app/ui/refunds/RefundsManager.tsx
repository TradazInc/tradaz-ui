"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, HStack, VStack, SimpleGrid, Image, Badge } from "@chakra-ui/react";
import { 
    LuUndo2, LuSearch, LuBan, 
    LuBanknote, LuMessageSquare, LuMessageCircle, LuGift
} from "react-icons/lu";

import { generateDummyRefunds } from "@/app/lib/data";
import { RefundRequest } from "@/app/lib/definitions";

export const RefundManager = () => {
    const [refunds, setRefunds] = useState<RefundRequest[]>(generateDummyRefunds());
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Processing" | "Refunded" | "Rejected">("All");

    // --- ACTIONS ---
    const updateStatus = (id: string, newStatus: "Processing" | "Refunded" | "Rejected") => {
        setRefunds(prev => prev.map(ref => 
            ref.id === id ? { ...ref, status: newStatus } : ref
        ));
    };

    const issueStoreCredit = (customerName: string, amount: number, id: string) => {
        alert(`Successfully generated a ₦${amount.toLocaleString()} Gift Voucher for ${customerName}! They will receive an email shortly.`);
        updateStatus(id, "Refunded");
    };

    const openChatHistory = (customerName: string) => {
        alert(`Opening chat history for ${customerName}...`);
    };

    // --- FILTERING ---
    const filteredRefunds = refunds.filter(ref => {
        const matchesSearch = ref.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              ref.customerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || ref.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // --- STATS ---
    const pendingRefunds = refunds.filter(r => r.status === "Pending" || r.status === "Processing");
    const pendingAmount = pendingRefunds.reduce((acc, curr) => acc + curr.refundAmount, 0);
    const totalRefunded = refunds.filter(r => r.status === "Refunded").reduce((acc, curr) => acc + curr.refundAmount, 0);

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
                            <Icon as={LuUndo2} /> Customer Refunds
                        </Text>
                        <Text color="gray.400" fontSize="sm">Process money back requests or issue store credit to retain value.</Text>
                    </Box>
                </Flex>
            </Box>

            {/* --- STATS & FILTERS --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={8}>
                <Box bg="#1A1C23" p={4} rounded="xl" border="1px solid" borderColor="rgba(245, 101, 101, 0.3)">
                    <Text color="red.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">Pending Liability</Text>
                    <Text color="white" fontSize="2xl" fontWeight="black">₦{pendingAmount.toLocaleString()}</Text>
                    <Text color="gray.500" fontSize="xs" mt={1}>Across {pendingRefunds.length} request(s)</Text>
                </Box>
                <Box bg="#1A1C23" p={4} rounded="xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Total Refunded (YTD)</Text>
                    <Text color="white" fontSize="2xl" fontWeight="black">₦{totalRefunded.toLocaleString()}</Text>
                </Box>
                
                <Flex direction="column" justify="center" gap={2}>
                    <Flex align="center" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="xl" px={4} h="44px" _focusWithin={{ borderColor: "#5cac7d" }}>
                        <Icon as={LuSearch} color="gray.400" />
                        <Input 
                            placeholder="Search Order ID or Customer..." 
                            border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full"
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Flex>
                    <select 
                        style={selectStyles} 
                        value={statusFilter} 
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as "All" | "Pending" | "Processing" | "Refunded" | "Rejected")}
                    >
                        <option value="All">All Requests</option>
                        <option value="Pending">Pending Approval</option>
                        <option value="Processing">Processing Return</option>
                        <option value="Refunded">Refunded / Credited</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </Flex>
            </SimpleGrid>

            {/* --- REFUND REQUESTS LIST --- */}
            <VStack gap={4} align="stretch" mb={8}>
                {filteredRefunds.length === 0 ? (
                    <Flex justify="center" py={12} color="gray.500" bg="whiteAlpha.50" rounded="2xl" border="1px dashed" borderColor="whiteAlpha.200">
                        No refund requests found.
                    </Flex>
                ) : (
                    filteredRefunds.map((ref) => {
                        const isPending = ref.status === "Pending";
                        const isProcessing = ref.status === "Processing";
                        const isRefunded = ref.status === "Refunded";
                        const isRejected = ref.status === "Rejected";

                        return (
                            <Box key={ref.id} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor={isPending || isProcessing ? "rgba(245, 101, 101, 0.3)" : "whiteAlpha.100"} p={{ base: 4, md: 6 }} shadow="sm" transition="all 0.2s" opacity={isRejected || isRefunded ? 0.6 : 1}>
                                <Flex direction={{ base: "column", xl: "row" }} justify="space-between" align={{ base: "flex-start", xl: "center" }} gap={6}>
                                    
                                    {/* Customer & Status */}
                                    <VStack align="start" flex={1} minW="200px" gap={2}>
                                        <HStack justify="space-between" w="full">
                                            <Text color="white" fontWeight="black" letterSpacing="wider">{ref.orderId}</Text>
                                            <Badge 
                                                bg={isPending ? "rgba(237, 137, 54, 0.15)" : isProcessing ? "rgba(66, 153, 225, 0.15)" : isRefunded ? "rgba(92, 172, 125, 0.15)" : "rgba(245, 101, 101, 0.15)"} 
                                                color={isPending ? "orange.400" : isProcessing ? "blue.400" : isRefunded ? "#5cac7d" : "red.400"} 
                                                px={2} py={1} rounded="md"
                                            >
                                                {ref.status}
                                            </Badge>
                                        </HStack>
                                        <Box>
                                            <Text color="gray.300" fontSize="sm" fontWeight="bold">{ref.customerName}</Text>
                                            <Text color="gray.500" fontSize="xs">{ref.customerEmail}</Text>
                                        </Box>
                                        <Text color="gray.500" fontSize="xs" mt={1}>Requested: {ref.dateRequested}</Text>
                                    </VStack>

                                    {/*  Item & Refund Amount */}
                                    <Flex flex={2} w="full" bg="#121214" p={4} rounded="xl" border="1px solid" borderColor="whiteAlpha.100" align="center" justify="space-between" gap={4} wrap="wrap">
                                        <Flex align="center" gap={3} flex={1}>
                                            <Image src={ref.itemImage} alt="Item" boxSize="40px" rounded="md" objectFit="cover" opacity={0.8} />
                                            <Box>
                                                <Text color="gray.500" fontSize="10px" fontWeight="bold" textTransform="uppercase">Returning Item</Text>
                                                <Text color="gray.300" fontSize="xs" fontWeight="bold" lineClamp={2}>{ref.itemName}</Text>
                                            </Box>
                                        </Flex>
                                        <Box h="40px" w="1px" bg="whiteAlpha.200" display={{ base: "none", md: "block" }} />
                                        <VStack align={{ base: "flex-start", md: "flex-end" }} gap={0} flexShrink={0}>
                                            <Text color="gray.500" fontSize="10px" fontWeight="bold" textTransform="uppercase">Refund Value</Text>
                                            <Text color={isRefunded ? "gray.400" : "red.400"} fontSize="lg" fontWeight="black">₦{ref.refundAmount.toLocaleString()}</Text>
                                        </VStack>
                                    </Flex>

                                    {/*  Actions & Reason */}
                                    <VStack align="end" flex={1} minW={{ xl: "320px" }} w="full" gap={3}>
                                        <Flex align="flex-start" gap={2} bg="whiteAlpha.50" p={3} rounded="lg" w="full" border="1px solid" borderColor="whiteAlpha.100">
                                            <Icon as={LuMessageSquare} color="gray.500" mt={0.5} />
                                            <Text color="gray.400" fontSize="xs" fontStyle="italic">&quot;{ref.reason}&quot;</Text>
                                        </Flex>
                                        
                                        <Flex w="full" justify="space-between" align="center" wrap="wrap" gap={2}>
                                            {/* Chat History Button */}
                                            <Button size="sm" onClick={() => openChatHistory(ref.customerName)} variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }}>
                                                <Icon as={LuMessageCircle} mr={2} /> View Chat
                                            </Button>

                                            {/* Status Actions */}
                                            <HStack gap={2}>
                                                {isPending && (
                                                    <>
                                                        <Button size="sm" onClick={() => updateStatus(ref.id, "Rejected")} variant="ghost" color="red.400" _hover={{ bg: "red.900", color: "white" }}>
                                                            <Icon as={LuBan} />
                                                        </Button>
                                                        <Button size="sm" onClick={() => updateStatus(ref.id, "Processing")} bg="blue.400" color="white" _hover={{ bg: "blue.500" }}>
                                                            Accept Return
                                                        </Button>
                                                    </>
                                                )}
                                                {isProcessing && (
                                                    <>
                                                        <Button size="sm" onClick={() => issueStoreCredit(ref.customerName, ref.refundAmount, ref.id)} variant="outline" borderColor="#5cac7d" color="#5cac7d" _hover={{ bg: "rgba(92, 172, 125, 0.1)" }}>
                                                            <Icon as={LuGift} mr={2} /> Issue Credit
                                                        </Button>
                                                        <Button size="sm" onClick={() => updateStatus(ref.id, "Refunded")} bg="red.500" color="white" _hover={{ bg: "red.600" }}>
                                                            <Icon as={LuBanknote} mr={2} /> Refund Cash
                                                        </Button>
                                                    </>
                                                )}
                                            </HStack>
                                        </Flex>
                                    </VStack>

                                </Flex>
                            </Box>
                        );
                    })
                )}
            </VStack>

        </Box>
    );
};
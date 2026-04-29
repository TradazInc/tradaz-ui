"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, HStack, VStack, Badge, Image } from "@chakra-ui/react";
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
                            <Icon as={LuUndo2} color="#5cac7d" strokeWidth="2.5" /> Customer Refunds
                        </Text>
                        <Text color="#888888" fontSize="sm">Process money back requests or issue store credit to retain value.</Text>
                    </Box>
                </Flex>
            </Box>

            {/* --- STATS & FILTERS --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={8}>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="red.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Pending Liability</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{pendingAmount.toLocaleString()}</Text>
                    <Text color="#888888" fontSize="xs" mt={1}>Across {pendingRefunds.length} request(s)</Text>
                </Box>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Total Refunded (YTD)</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{totalRefunded.toLocaleString()}</Text>
                </Box>
                
                <Flex direction="column" justify="center" gap={3}>
                    <Flex align="center" bg="#0A0A0A" border="1px solid" borderColor="#333333" rounded="none" px={4} h="44px" _focusWithin={{ borderColor: "white" }}>
                        <Icon as={LuSearch} color="#888888" strokeWidth="2.5" />
                        <Input 
                            placeholder="Search Order ID or Customer..." 
                            border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" px={0} ml={2}
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Flex>
                    <select 
                        style={selectStyles} 
                        value={statusFilter} 
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as "All" | "Pending" | "Processing" | "Refunded" | "Rejected")}
                    >
                        <option value="All" style={{ background: "#0A0A0A" }}>All Requests</option>
                        <option value="Pending" style={{ background: "#0A0A0A" }}>Pending Approval</option>
                        <option value="Processing" style={{ background: "#0A0A0A" }}>Processing Return</option>
                        <option value="Refunded" style={{ background: "#0A0A0A" }}>Refunded / Credited</option>
                        <option value="Rejected" style={{ background: "#0A0A0A" }}>Rejected</option>
                    </select>
                </Flex>
            </SimpleGrid>

            {/* --- REFUND REQUESTS LIST --- */}
            <VStack gap={4} align="stretch" mb={8}>
                {filteredRefunds.length === 0 ? (
                    <Flex justify="center" py={12} color="#888888" bg="#0A0A0A" rounded="none" border="1px dashed" borderColor="#1A1A1A" fontWeight="bold">
                        No refund requests found.
                    </Flex>
                ) : (
                    filteredRefunds.map((ref) => {
                        const isPending = ref.status === "Pending";
                        const isProcessing = ref.status === "Processing";
                        const isRefunded = ref.status === "Refunded";
                        const isRejected = ref.status === "Rejected";

                        return (
                            <Box key={ref.id} bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" p={{ base: 4, md: 6 }} transition="all 0.2s" opacity={isRejected || isRefunded ? 0.6 : 1} _hover={{ bg: "#111111" }}>
                                <Flex direction={{ base: "column", xl: "row" }} justify="space-between" align={{ base: "flex-start", xl: "center" }} gap={6}>
                                    
                                    {/* Customer & Status */}
                                    <VStack align="start" flex={1} minW="200px" gap={2}>
                                        <HStack justify="space-between" w="full">
                                            <Text color="white" fontWeight="black" letterSpacing="wider">{ref.orderId}</Text>
                                            <Badge 
                                                bg="#111111" 
                                                color={isPending ? "orange.400" : isProcessing ? "blue.400" : isRefunded ? "#5cac7d" : "red.400"} 
                                                border="1px solid" borderColor={isPending ? "orange.900" : isProcessing ? "blue.900" : isRefunded ? "green.900" : "red.900"}
                                                px={2} py={1} rounded="none" fontSize="10px" textTransform="uppercase" letterSpacing="wider" fontWeight="bold"
                                            >
                                                {ref.status}
                                            </Badge>
                                        </HStack>
                                        <Box>
                                            <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight">{ref.customerName}</Text>
                                            <Text color="#888888" fontSize="xs">{ref.customerEmail}</Text>
                                        </Box>
                                        <Text color="#888888" fontSize="xs" mt={1}>Requested: {ref.dateRequested}</Text>
                                    </VStack>

                                    {/* Item & Refund Amount */}
                                    <Flex flex={2} w="full" bg="#111111" p={4} rounded="none" border="1px solid" borderColor="#1A1A1A" align="center" justify="space-between" gap={4} wrap="wrap">
                                        <Flex align="center" gap={3} flex={1}>
                                            <Image src={ref.itemImage} alt="Item" boxSize="40px" rounded="none" objectFit="cover" opacity={0.8} border="1px solid #333333" />
                                            <Box>
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Returning Item</Text>
                                                <Text color="white" fontSize="xs" fontWeight="bold" lineClamp={2}>{ref.itemName}</Text>
                                            </Box>
                                        </Flex>
                                        <Box h="40px" w="1px" bg="#1A1A1A" display={{ base: "none", md: "block" }} />
                                        <VStack align={{ base: "flex-start", md: "flex-end" }} gap={0} flexShrink={0}>
                                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Refund Value</Text>
                                            <Text color={isRefunded ? "white" : "red.400"} fontSize="lg" fontWeight="black" letterSpacing="tight">₦{ref.refundAmount.toLocaleString()}</Text>
                                        </VStack>
                                    </Flex>

                                    {/* Actions & Reason */}
                                    <VStack align="end" flex={1} minW={{ xl: "320px" }} w="full" gap={3}>
                                        <Flex align="flex-start" gap={2} bg="#111111" p={3} rounded="none" w="full" border="1px solid" borderColor="#1A1A1A">
                                            <Icon as={LuMessageSquare} color="#888888" mt={0.5} strokeWidth="2.5" />
                                            <Text color="#888888" fontSize="xs" fontStyle="italic">&quot;{ref.reason}&quot;</Text>
                                        </Flex>
                                        
                                        <Flex w="full" justify="space-between" align="center" wrap="wrap" gap={2}>
                                            {/* Chat History Button */}
                                            <Button size="sm" h="36px" onClick={() => openChatHistory(ref.customerName)} variant="outline" borderColor="#333333" color="white" rounded="none" _hover={{ bg: "#111111" }}>
                                                <Icon as={LuMessageCircle} mr={2} strokeWidth="2.5" /> View Chat
                                            </Button>

                                            {/* Status Actions */}
                                            <HStack gap={2}>
                                                {isPending && (
                                                    <>
                                                        <Button size="sm" h="36px" onClick={() => updateStatus(ref.id, "Rejected")} variant="ghost" color="red.400" rounded="none" _hover={{ bg: "red.900", color: "white" }}>
                                                            <Icon as={LuBan} strokeWidth="2.5" />
                                                        </Button>
                                                        <Button size="sm" h="36px" onClick={() => updateStatus(ref.id, "Processing")} bg="#111111" color="blue.400" border="1px solid #333333" rounded="none" _hover={{ bg: "#1A1A1A" }}>
                                                            Accept Return
                                                        </Button>
                                                    </>
                                                )}
                                                {isProcessing && (
                                                    <>
                                                        <Button size="sm" h="36px" onClick={() => issueStoreCredit(ref.customerName, ref.refundAmount, ref.id)} variant="outline" borderColor="#5cac7d" color="#5cac7d" rounded="none" _hover={{ bg: "rgba(92, 172, 125, 0.1)" }}>
                                                            <Icon as={LuGift} mr={2} strokeWidth="2.5" /> Issue Credit
                                                        </Button>
                                                        <Button size="sm" h="36px" onClick={() => updateStatus(ref.id, "Refunded")} bg="#111111" border="1px solid #333333" color="red.400" rounded="none" _hover={{ bg: "red.900", color: "white" }}>
                                                            <Icon as={LuBanknote} mr={2} strokeWidth="2.5" /> Refund Cash
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
"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, HStack, VStack, SimpleGrid, Image, Badge } from "@chakra-ui/react";
import { 
    LuRefreshCcw, LuSearch, LuCheck, LuBan, 
    LuPackageCheck, LuArrowRight, LuMessageSquare, LuMessageCircle
} from "react-icons/lu";

import { generateDummyExchanges } from "@/app/lib/data";
import { ExchangeRequest } from "@/app/lib/definitions";

export const ExchangeManager = () => {
    const [exchanges, setExchanges] = useState<ExchangeRequest[]>(generateDummyExchanges());
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Approved" | "Rejected" | "Completed">("All");

    // --- ACTIONS ---
    const updateStatus = (id: string, newStatus: "Approved" | "Rejected" | "Completed") => {
        setExchanges(prev => prev.map(exc => 
            exc.id === id ? { ...exc, status: newStatus } : exc
        ));
    };

    const openChatHistory = (customerName: string) => {
        // open a modal or route to /dashboard/chats?user=123 much more later
        alert(`Opening chat history for ${customerName}...`);
    };

    // --- FILTERING ---
    const filteredExchanges = exchanges.filter(exc => {
        const matchesSearch = exc.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              exc.customerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || exc.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // --- STATS ---
    const pendingCount = exchanges.filter(e => e.status === "Pending").length;
    const approvedCount = exchanges.filter(e => e.status === "Approved").length;

    // Strict Monochrome Styles
    const selectStyles = {
        backgroundColor: "#0A0A0A", color: "white", height: "44px", padding: "0 16px",
        borderRadius: "0px", border: "1px solid #333333", cursor: "pointer", outline: "none"
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000">
            
            {/* --- Sticky Header (Mobile Optimized) --- */}
            <Box 
                position="sticky" top={{ base: "-16px", md: "-32px" }} mx={{ base: "-16px", md: "-32px" }} px={{ base: "16px", md: "32px" }} 
                zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} borderBottom="1px solid #1A1A1A"
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4}>
                    <Box>
                        <Text color="white" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2} letterSpacing="tight">
                            <Icon as={LuRefreshCcw} color="#5cac7d" strokeWidth="2.5" /> Product Exchanges
                        </Text>
                        <Text color="#888888" fontSize="sm">Manage customer return-and-replace requests efficiently.</Text>
                    </Box>
                </Flex>
            </Box>

            {/* --- STATS & FILTERS --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={8}>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="orange.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Action Required (Pending)</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{pendingCount}</Text>
                </Box>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="blue.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Awaiting Return (Approved)</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{approvedCount}</Text>
                </Box>
                
                <Flex direction="column" gap={3}>
                    <Flex align="center" bg="#0A0A0A" border="1px solid" borderColor="#333333" rounded="none" px={4} h="44px" _focusWithin={{ borderColor: "white" }}>
                        <Icon as={LuSearch} color="#888888" strokeWidth="2.5" />
                        <Input 
                            placeholder="Search Order ID or Customer..." 
                            border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" ml={2} px={0}
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Flex>
                    <select 
                        style={selectStyles} 
                        value={statusFilter} 
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as "All" | "Pending" | "Approved" | "Rejected" | "Completed")}
                    >
                        <option value="All" style={{ background: "#0A0A0A" }}>All Requests</option>
                        <option value="Pending" style={{ background: "#0A0A0A" }}>Pending Approval</option>
                        <option value="Approved" style={{ background: "#0A0A0A" }}>Approved</option>
                        <option value="Rejected" style={{ background: "#0A0A0A" }}>Rejected</option>
                        <option value="Completed" style={{ background: "#0A0A0A" }}>Completed</option>
                    </select>
                </Flex>
            </SimpleGrid>

            {/* --- EXCHANGE REQUESTS LIST --- */}
            <VStack gap={4} align="stretch" mb={8}>
                {filteredExchanges.length === 0 ? (
                    <Flex justify="center" py={12} color="#888888" bg="#0A0A0A" rounded="none" border="1px dashed" borderColor="#1A1A1A" fontWeight="bold">
                        No exchange requests found.
                    </Flex>
                ) : (
                    filteredExchanges.map((exc) => {
                        const isPending = exc.status === "Pending";
                        const isApproved = exc.status === "Approved";
                        const isRejected = exc.status === "Rejected";
                        const isCompleted = exc.status === "Completed";

                        return (
                            <Box key={exc.id} bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" p={{ base: 4, md: 6 }} transition="all 0.2s" opacity={isRejected || isCompleted ? 0.6 : 1} _hover={{ bg: "#111111" }}>
                                <Flex direction={{ base: "column", xl: "row" }} justify="space-between" align={{ base: "flex-start", xl: "center" }} gap={6}>
                                    
                                    {/* Customer & Status */}
                                    <VStack align="start" flex={1} minW="200px" gap={2}>
                                        <HStack justify="space-between" w="full">
                                            <Text color="white" fontWeight="black" letterSpacing="wider">{exc.orderId}</Text>
                                            <Badge 
                                                bg="#111111" 
                                                color={isPending ? "orange.400" : isApproved ? "blue.400" : isCompleted ? "#5cac7d" : "red.400"} 
                                                border="1px solid" borderColor={isPending ? "orange.900" : isApproved ? "blue.900" : isCompleted ? "green.900" : "red.900"}
                                                px={2} py={1} rounded="none" fontSize="10px" textTransform="uppercase" letterSpacing="wider" fontWeight="bold"
                                            >
                                                {exc.status}
                                            </Badge>
                                        </HStack>
                                        <Box>
                                            <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight">{exc.customerName}</Text>
                                            <Text color="#888888" fontSize="xs">{exc.customerEmail}</Text>
                                        </Box>
                                        <Text color="#888888" fontSize="xs" mt={1}>Requested: {exc.dateRequested}</Text>
                                    </VStack>

                                    {/* The Swap Visual */}
                                    <Flex flex={2} w="full" bg="#111111" p={4} rounded="none" border="1px solid" borderColor="#1A1A1A" align="center" justify="space-between" direction={{ base: "column", md: "row" }} gap={4}>
                                        {/* Returning Item */}
                                        <Flex align="center" gap={3} flex={1}>
                                            <Image src={exc.returnItemImage} alt="Return" boxSize="40px" rounded="none" objectFit="cover" opacity={0.7} border="1px solid #333333" />
                                            <Box>
                                                <Text color="red.400" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Returning</Text>
                                                <Text color="#888888" fontSize="xs" fontWeight="bold" lineClamp={2}>{exc.returnItem}</Text>
                                            </Box>
                                        </Flex>

                                        {/* Swap Icon */}
                                        <Flex align="center" justify="center" bg="#1A1A1A" border="1px solid #333333" boxSize="32px" rounded="none" flexShrink={0}>
                                            <Icon as={LuArrowRight} color="white" strokeWidth="2.5" />
                                        </Flex>

                                        {/* Requesting Item */}
                                        <Flex align="center" gap={3} flex={1}>
                                            <Image src={exc.requestItemImage} alt="Request" boxSize="40px" rounded="none" objectFit="cover" border="1px solid #333333" />
                                            <Box>
                                                <Text color="#5cac7d" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Requesting</Text>
                                                <Text color="white" fontSize="xs" fontWeight="bold" lineClamp={2}>{exc.requestItem}</Text>
                                            </Box>
                                        </Flex>
                                    </Flex>

                                    {/* Column 3: Actions & Reason */}
                                    <VStack align="end" flex={1} minW={{ xl: "320px" }} w="full" gap={3}>
                                        <Flex align="flex-start" gap={2} bg="#111111" p={3} rounded="none" w="full" border="1px solid" borderColor="#1A1A1A">
                                            <Icon as={LuMessageSquare} color="#888888" mt={0.5} strokeWidth="2.5" />
                                            <Text color="#888888" fontSize="xs" fontStyle="italic">&quot;{exc.reason}&quot;</Text>
                                        </Flex>
                                        
                                        <Flex w="full" justify="space-between" align="center" wrap="wrap" gap={2}>
                                            {/* Chat History Button */}
                                            <Button size="sm" h="36px" onClick={() => openChatHistory(exc.customerName)} variant="outline" borderColor="#333333" rounded="none" color="white" _hover={{ bg: "#1A1A1A" }}>
                                                <Icon as={LuMessageCircle} mr={2} strokeWidth="2.5" /> View Chat
                                            </Button>

                                            {/* Status Actions */}
                                            <HStack gap={2}>
                                                {isPending && (
                                                    <>
                                                        <Button size="sm" h="36px" onClick={() => updateStatus(exc.id, "Rejected")} variant="ghost" rounded="none" color="red.400" _hover={{ bg: "red.900", color: "white" }}>
                                                            <Icon as={LuBan} mr={1.5} strokeWidth="2.5" /> Reject
                                                        </Button>
                                                        <Button size="sm" h="36px" onClick={() => updateStatus(exc.id, "Approved")} bg="#111111" border="1px solid #333333" rounded="none" color="blue.400" _hover={{ bg: "#1A1A1A" }}>
                                                            <Icon as={LuCheck} mr={1.5} strokeWidth="2.5" /> Approve
                                                        </Button>
                                                    </>
                                                )}
                                                {isApproved && (
                                                    <Button size="sm" h="36px" onClick={() => updateStatus(exc.id, "Completed")} bg="#111111" border="1px solid #333333" rounded="none" color="#5cac7d" _hover={{ bg: "#1A1A1A" }}>
                                                        <Icon as={LuPackageCheck} mr={1.5} strokeWidth="2.5" /> Mark Received
                                                    </Button>
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
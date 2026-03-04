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

    const selectStyles = {
        backgroundColor: "#121214", color: "white", height: "44px", padding: "0 16px",
        borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.16)", cursor: "pointer", outline: "none"
    };

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
                            <Icon as={LuRefreshCcw} /> Product Exchanges
                        </Text>
                        <Text color="gray.400" fontSize="sm">Manage customer return-and-replace requests efficiently.</Text>
                    </Box>
                </Flex>
            </Box>

            {/* --- STATS & FILTERS --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={8}>
                <Box bg="#1A1C23" p={4} rounded="xl" border="1px solid" borderColor="rgba(237, 137, 54, 0.3)">
                    <Text color="orange.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">Action Required (Pending)</Text>
                    <Text color="white" fontSize="2xl" fontWeight="black">{pendingCount}</Text>
                </Box>
                <Box bg="#1A1C23" p={4} rounded="xl" border="1px solid" borderColor="rgba(66, 153, 225, 0.3)">
                    <Text color="blue.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">Awaiting Return (Approved)</Text>
                    <Text color="white" fontSize="2xl" fontWeight="black">{approvedCount}</Text>
                </Box>
                
                <Flex direction="column" gap={2}>
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
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as "All" | "Pending" | "Approved" | "Rejected" | "Completed")}
                    >
                        <option value="All">All Requests</option>
                        <option value="Pending">Pending Approval</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Completed">Completed</option>
                    </select>
                </Flex>
            </SimpleGrid>

            {/* --- EXCHANGE REQUESTS LIST --- */}
            <VStack gap={4} align="stretch" mb={8}>
                {filteredExchanges.length === 0 ? (
                    <Flex justify="center" py={12} color="gray.500" bg="whiteAlpha.50" rounded="2xl" border="1px dashed" borderColor="whiteAlpha.200">
                        No exchange requests found.
                    </Flex>
                ) : (
                    filteredExchanges.map((exc) => {
                        const isPending = exc.status === "Pending";
                        const isApproved = exc.status === "Approved";
                        const isRejected = exc.status === "Rejected";
                        const isCompleted = exc.status === "Completed";

                        return (
                            <Box key={exc.id} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor={isPending ? "rgba(237, 137, 54, 0.3)" : "whiteAlpha.100"} p={{ base: 4, md: 6 }} shadow="sm" transition="all 0.2s" opacity={isRejected || isCompleted ? 0.6 : 1}>
                                <Flex direction={{ base: "column", xl: "row" }} justify="space-between" align={{ base: "flex-start", xl: "center" }} gap={6}>
                                    
                                    {/*  Customer & Status */}
                                    <VStack align="start" flex={1} minW="200px" gap={2}>
                                        <HStack justify="space-between" w="full">
                                            <Text color="white" fontWeight="black" letterSpacing="wider">{exc.orderId}</Text>
                                            <Badge 
                                                bg={isPending ? "rgba(237, 137, 54, 0.15)" : isApproved ? "rgba(66, 153, 225, 0.15)" : isCompleted ? "rgba(92, 172, 125, 0.15)" : "rgba(245, 101, 101, 0.15)"} 
                                                color={isPending ? "orange.400" : isApproved ? "blue.400" : isCompleted ? "#5cac7d" : "red.400"} 
                                                px={2} py={1} rounded="md"
                                            >
                                                {exc.status}
                                            </Badge>
                                        </HStack>
                                        <Box>
                                            <Text color="gray.300" fontSize="sm" fontWeight="bold">{exc.customerName}</Text>
                                            <Text color="gray.500" fontSize="xs">{exc.customerEmail}</Text>
                                        </Box>
                                        <Text color="gray.500" fontSize="xs" mt={1}>Requested: {exc.dateRequested}</Text>
                                    </VStack>

                                    {/*  The Swap Visual */}
                                    <Flex flex={2} w="full" bg="#121214" p={4} rounded="xl" border="1px solid" borderColor="whiteAlpha.100" align="center" justify="space-between" direction={{ base: "column", md: "row" }} gap={4}>
                                        {/* Returning Item */}
                                        <Flex align="center" gap={3} flex={1}>
                                            <Image src={exc.returnItemImage} alt="Return" boxSize="40px" rounded="md" objectFit="cover" opacity={0.7} />
                                            <Box>
                                                <Text color="red.400" fontSize="10px" fontWeight="bold" textTransform="uppercase">Returning</Text>
                                                <Text color="gray.400" fontSize="xs" fontWeight="bold" lineClamp={2}>{exc.returnItem}</Text>
                                            </Box>
                                        </Flex>

                                        {/* Swap Icon */}
                                        <Flex align="center" justify="center" bg="whiteAlpha.100" boxSize="32px" rounded="full" flexShrink={0}>
                                            <Icon as={LuArrowRight} color="gray.400" />
                                        </Flex>

                                        {/* Requesting Item */}
                                        <Flex align="center" gap={3} flex={1}>
                                            <Image src={exc.requestItemImage} alt="Request" boxSize="40px" rounded="md" objectFit="cover" />
                                            <Box>
                                                <Text color="#5cac7d" fontSize="10px" fontWeight="bold" textTransform="uppercase">Requesting</Text>
                                                <Text color="white" fontSize="xs" fontWeight="bold" lineClamp={2}>{exc.requestItem}</Text>
                                            </Box>
                                        </Flex>
                                    </Flex>

                                    {/* Column 3: Actions & Reason */}
                                    <VStack align="end" flex={1} minW={{ xl: "320px" }} w="full" gap={3}>
                                        <Flex align="flex-start" gap={2} bg="whiteAlpha.50" p={3} rounded="lg" w="full" border="1px solid" borderColor="whiteAlpha.100">
                                            <Icon as={LuMessageSquare} color="gray.500" mt={0.5} />
                                            <Text color="gray.400" fontSize="xs" fontStyle="italic">&quot;{exc.reason}&quot;</Text>
                                        </Flex>
                                        
                                        <Flex w="full" justify="space-between" align="center" wrap="wrap" gap={2}>
                                            {/* Chat History Button */}
                                            <Button size="sm" onClick={() => openChatHistory(exc.customerName)} variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }}>
                                                <Icon as={LuMessageCircle} mr={2} /> View Chat
                                            </Button>

                                            {/* Status Actions */}
                                            <HStack gap={2}>
                                                {isPending && (
                                                    <>
                                                        <Button size="sm" onClick={() => updateStatus(exc.id, "Rejected")} variant="ghost" color="red.400" _hover={{ bg: "red.900", color: "white" }}>
                                                            <Icon as={LuBan} mr={1} /> Reject
                                                        </Button>
                                                        <Button size="sm" onClick={() => updateStatus(exc.id, "Approved")} bg="blue.400" color="white" _hover={{ bg: "blue.500" }}>
                                                            <Icon as={LuCheck} mr={1} /> Approve
                                                        </Button>
                                                    </>
                                                )}
                                                {isApproved && (
                                                    <Button size="sm" onClick={() => updateStatus(exc.id, "Completed")} bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }}>
                                                        <Icon as={LuPackageCheck} mr={2} /> Received
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
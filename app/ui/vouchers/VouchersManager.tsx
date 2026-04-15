"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, HStack, VStack, SimpleGrid } from "@chakra-ui/react";
import { 
    LuGift, LuSearch, LuPlus, LuCopy, 
    LuBan, LuMail, LuCreditCard, LuUser
} from "react-icons/lu";

import { useVouchers } from "@/app/hooks/useVouchers";
import { GiftVoucher } from "@/app/lib/definitions";
import { CreateVoucherForm } from "./CreateVoucherForm";

export const VoucherManager = () => {
    
    const [isCreating, setIsCreating] = useState(false);

    //  Call the logic hook
    const {
        searchTerm, setSearchTerm,
        statusFilter, setStatusFilter,
        filteredVouchers,
        revokeVoucher, copyToClipboard, resendEmail, handleAddVoucher,
        totalOutstandingLiability, totalRedeemedValue
    } = useVouchers();

    const selectStyles = {
        backgroundColor: "#121214", color: "white", height: "44px", padding: "0 16px",
        borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.16)", cursor: "pointer", outline: "none"
    };

    // Submit handler
    const onFormSubmit = (newVoucher: GiftVoucher) => {
        handleAddVoucher(newVoucher);
        setIsCreating(false);
    };

    // Route to the Create Form if true
    if (isCreating) {
        return <CreateVoucherForm onBack={() => setIsCreating(false)} onSubmit={onFormSubmit} />;
    }

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
                            <Icon as={LuGift} /> Gift Vouchers & Store Credit
                        </Text>
                        <Text color="gray.400" fontSize="sm">Manage prepaid balances, issue refunds as store credit, and track redemptions.</Text>
                    </Box>
                    
                    <Button onClick={() => setIsCreating(true)} bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} h="44px" px={6}>
                        <Icon as={LuPlus} mr={2} /> Issue New Voucher
                    </Button>
                </Flex>
            </Box>

            {/* --- STATS & SEARCH --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
                <Box bg="#1A1C23" p={4} rounded="xl" border="1px solid" borderColor="rgba(92, 172, 125, 0.3)">
                    <Text color="#5cac7d" fontSize="xs" fontWeight="bold" textTransform="uppercase">Outstanding Liability (Active)</Text>
                    <Text color="white" fontSize="2xl" fontWeight="black">₦{totalOutstandingLiability.toLocaleString()}</Text>
                </Box>
                <Box bg="#1A1C23" p={4} rounded="xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Total Value Redeemed</Text>
                    <Text color="white" fontSize="2xl" fontWeight="black">₦{totalRedeemedValue.toLocaleString()}</Text>
                </Box>
                
                <Flex direction="column" gap={2}>
                    <Flex align="center" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="xl" px={4} h="44px" _focusWithin={{ borderColor: "#5cac7d" }}>
                        <Icon as={LuSearch} color="gray.400" />
                        <Input 
                            placeholder="Search code or customer..." 
                            border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full"
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Flex>
                    
                    <select 
                        style={selectStyles} 
                        value={statusFilter} 
                        onChange={(e) => setStatusFilter(e.target.value as "All" | "Active" | "Fully Redeemed" | "Expired" | "Revoked")}
                    >
                        <option value="All" style={{ background: "#1A1C23" }}>All Statuses</option>
                        <option value="Active" style={{ background: "#1A1C23" }}>Active</option>
                        <option value="Fully Redeemed" style={{ background: "#1A1C23" }}>Fully Redeemed</option>
                        <option value="Expired" style={{ background: "#1A1C23" }}>Expired</option>
                        <option value="Revoked" style={{ background: "#1A1C23" }}>Revoked</option>
                    </select>
                </Flex>
            </SimpleGrid>

            {/* --- VOUCHERS LIST --- */}
            <VStack gap={4} align="stretch" mb={8}>
                {filteredVouchers.length === 0 ? (
                    <Flex justify="center" py={12} color="gray.500" bg="whiteAlpha.50" rounded="2xl" border="1px dashed" borderColor="whiteAlpha.200">
                        No vouchers match your search criteria.
                    </Flex>
                ) : (
                    filteredVouchers.map((voucher: GiftVoucher) => {
                        const isActive = voucher.status === "Active";
                        const isRedeemed = voucher.status === "Fully Redeemed";
                        const isRevoked = voucher.status === "Revoked";
                        const balancePercentage = (voucher.remainingBalance / voucher.initialValue) * 100;

                        return (
                            <Box key={voucher.id} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.3)" : "whiteAlpha.100"} p={{ base: 4, md: 6 }} shadow="sm" transition="all 0.2s" opacity={(isRedeemed || isRevoked || voucher.status === "Expired") ? 0.6 : 1}>
                                <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "center" }} gap={6}>
                                    
                                    <VStack align="start" flex={1} gap={2}>
                                        <HStack gap={3}>
                                            <Flex align="center" justify="center" bg="rgba(255, 255, 255, 0.05)" border="1px dashed" borderColor="gray.500" px={3} py={1} rounded="md" cursor="pointer" onClick={() => copyToClipboard(voucher.code)} _hover={{ bg: "whiteAlpha.200" }}>
                                                <Icon as={LuCreditCard} color="#5cac7d" boxSize="14px" mr={2} />
                                                <Text color="white" fontWeight="black" letterSpacing="widest" mr={2}>{voucher.code}</Text>
                                                <Icon as={LuCopy} color="gray.400" boxSize="12px" />
                                            </Flex>
                                            
                                            <Flex align="center" px={2.5} py={0.5} rounded="full" bg={isActive ? "rgba(92, 172, 125, 0.15)" : isRedeemed ? "rgba(66, 153, 225, 0.15)" : "rgba(245, 101, 101, 0.15)"}>
                                                <Box boxSize="6px" rounded="full" mr={2} bg={isActive ? "#5cac7d" : isRedeemed ? "blue.400" : "red.400"} />
                                                <Text color={isActive ? "#5cac7d" : isRedeemed ? "blue.400" : "red.400"} fontSize="xs" fontWeight="bold">
                                                    {voucher.status}
                                                </Text>
                                            </Flex>
                                        </HStack>

                                        <Flex align="center" gap={2} mt={1}>
                                            <Icon as={LuUser} color="gray.500" boxSize="14px" />
                                            <Text color="gray.300" fontSize="sm" fontWeight="bold">{voucher.recipientName}</Text>
                                            <Text color="gray.500" fontSize="xs">({voucher.recipientEmail})</Text>
                                        </Flex>
                                        <Text color="gray.500" fontSize="xs">Issued: {voucher.issueDate} • Expires: {voucher.expiryDate}</Text>
                                    </VStack>

                                    <VStack align="start" flex={1} w="full" minW={{ md: "250px" }} maxW={{ md: "350px" }} gap={1} bg="whiteAlpha.50" p={3} rounded="lg" border="1px solid" borderColor="whiteAlpha.100">
                                        <Flex justify="space-between" w="full">
                                            <Text color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">Remaining Balance</Text>
                                            <Text color={isActive ? "#5cac7d" : "white"} fontSize="sm" fontWeight="black">
                                                ₦{voucher.remainingBalance.toLocaleString()} <Text as="span" color="gray.500" fontWeight="normal" fontSize="xs">/ ₦{voucher.initialValue.toLocaleString()}</Text>
                                            </Text>
                                        </Flex>
                                        <Box w="full" h="8px" bg="whiteAlpha.100" rounded="full" overflow="hidden" mt={1}>
                                            <Box w={`${balancePercentage}%`} h="full" bg={balancePercentage > 20 ? "#5cac7d" : "orange.400"} transition="width 0.3s" />
                                        </Box>
                                    </VStack>

                                    <Flex direction="column" gap={2} minW="140px" justify="flex-end" w={{ base: "full", md: "auto" }}>
                                        <Button size="sm" onClick={() => resendEmail(voucher.recipientEmail)} variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }} justifyContent="flex-start">
                                            <Icon as={LuMail} mr={2} /> Resend Email
                                        </Button>
                                        {isActive && (
                                            <Button size="sm" onClick={() => revokeVoucher(voucher.id)} variant="ghost" color="red.400" _hover={{ bg: "red.900", color: "white" }} justifyContent="flex-start">
                                                <Icon as={LuBan} mr={2} /> Revoke
                                            </Button>
                                        )}
                                    </Flex>

                                </Flex>
                            </Box>
                        );
                    })
                )}
            </VStack>

        </Box>
    );
};
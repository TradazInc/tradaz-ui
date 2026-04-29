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
        backgroundColor: "#0A0A0A", color: "white", height: "44px", padding: "0 16px",
        borderRadius: "0px", border: "1px solid #333333", cursor: "pointer", outline: "none"
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
                            <Icon as={LuGift} color="#5cac7d" strokeWidth="2.5" /> Gift Vouchers & Store Credit
                        </Text>
                        <Text color="#888888" fontSize="sm">Manage prepaid balances, issue refunds as store credit, and track redemptions.</Text>
                    </Box>
                    
                    <Button onClick={() => setIsCreating(true)} bg="white" color="black" _hover={{ bg: "#E5E5E5" }} h="44px" px={6} rounded="none" fontWeight="bold" border="none">
                        <Icon as={LuPlus} mr={2} strokeWidth="2.5" /> Issue New Voucher
                    </Button>
                </Flex>
            </Box>

            {/* --- STATS & SEARCH --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#5cac7d" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Outstanding Liability (Active)</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{totalOutstandingLiability.toLocaleString()}</Text>
                </Box>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Total Value Redeemed</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{totalRedeemedValue.toLocaleString()}</Text>
                </Box>
                
                <Flex direction="column" justify="center" gap={3}>
                    <Flex align="center" bg="#0A0A0A" border="1px solid" borderColor="#333333" rounded="none" px={4} h="44px" _focusWithin={{ borderColor: "white" }}>
                        <Icon as={LuSearch} color="#888888" strokeWidth="2.5" />
                        <Input 
                            placeholder="Search code or customer..." 
                            border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" ml={2} px={0}
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Flex>
                    
                    <select 
                        style={selectStyles} 
                        value={statusFilter} 
                        onChange={(e) => setStatusFilter(e.target.value as "All" | "Active" | "Fully Redeemed" | "Expired" | "Revoked")}
                    >
                        <option value="All" style={{ background: "#0A0A0A" }}>All Statuses</option>
                        <option value="Active" style={{ background: "#0A0A0A" }}>Active</option>
                        <option value="Fully Redeemed" style={{ background: "#0A0A0A" }}>Fully Redeemed</option>
                        <option value="Expired" style={{ background: "#0A0A0A" }}>Expired</option>
                        <option value="Revoked" style={{ background: "#0A0A0A" }}>Revoked</option>
                    </select>
                </Flex>
            </SimpleGrid>

            {/* --- VOUCHERS LIST --- */}
            <VStack gap={4} align="stretch" mb={8}>
                {filteredVouchers.length === 0 ? (
                    <Flex justify="center" py={12} color="#888888" bg="#0A0A0A" rounded="none" border="1px dashed" borderColor="#1A1A1A" fontWeight="bold">
                        No vouchers match your search criteria.
                    </Flex>
                ) : (
                    filteredVouchers.map((voucher: GiftVoucher) => {
                        const isActive = voucher.status === "Active";
                        const isRedeemed = voucher.status === "Fully Redeemed";
                        const isRevoked = voucher.status === "Revoked";
                        const balancePercentage = (voucher.remainingBalance / voucher.initialValue) * 100;

                        return (
                            <Box key={voucher.id} bg="#0A0A0A" rounded="none" border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.3)" : "#1A1A1A"} p={{ base: 4, md: 6 }} transition="all 0.2s" opacity={(isRedeemed || isRevoked || voucher.status === "Expired") ? 0.6 : 1} _hover={{ bg: "#111111" }}>
                                <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "center" }} gap={6}>
                                    
                                    <VStack align="start" flex={1} gap={2}>
                                        <HStack gap={3}>
                                            <Flex align="center" justify="center" bg="#111111" border="1px solid #333333" px={3} py={2} rounded="none" cursor="pointer" onClick={() => copyToClipboard(voucher.code)} _hover={{ bg: "#1A1A1A", borderColor: "white" }} transition="all 0.2s">
                                                <Icon as={LuCreditCard} color="#5cac7d" boxSize="16px" mr={2} strokeWidth="2.5" />
                                                <Text color="white" fontWeight="black" letterSpacing="widest" mr={3}>{voucher.code}</Text>
                                                <Icon as={LuCopy} color="#888888" boxSize="14px" strokeWidth="2.5" />
                                            </Flex>
                                            
                                            <Flex align="center" px={2} py={1} rounded="none" border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.3)" : isRedeemed ? "rgba(66, 153, 225, 0.3)" : "#333333"} bg={isActive ? "rgba(92, 172, 125, 0.1)" : isRedeemed ? "rgba(66, 153, 225, 0.1)" : "#111111"}>
                                                <Box boxSize="6px" rounded="none" mr={2} bg={isActive ? "#5cac7d" : isRedeemed ? "blue.400" : "red.400"} />
                                                <Text color={isActive ? "#5cac7d" : isRedeemed ? "blue.400" : "red.400"} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                                    {voucher.status}
                                                </Text>
                                            </Flex>
                                        </HStack>

                                        <Flex align="center" gap={2} mt={1}>
                                            <Icon as={LuUser} color="#888888" boxSize="14px" strokeWidth="2.5" />
                                            <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight">{voucher.recipientName}</Text>
                                            <Text color="#888888" fontSize="xs">({voucher.recipientEmail})</Text>
                                        </Flex>
                                        <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Issued: {voucher.issueDate} • Expires: {voucher.expiryDate}</Text>
                                    </VStack>

                                    <VStack align="start" flex={1} w="full" minW={{ md: "250px" }} maxW={{ md: "350px" }} gap={2} bg="#111111" p={4} rounded="none" border="1px solid" borderColor="#1A1A1A">
                                        <Flex justify="space-between" w="full" align="flex-end">
                                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Remaining Balance</Text>
                                            <Text color={isActive ? "#5cac7d" : "white"} fontSize="lg" fontWeight="black" letterSpacing="tight">
                                                ₦{voucher.remainingBalance.toLocaleString()} <Text as="span" color="#888888" fontWeight="bold" fontSize="xs">/ ₦{voucher.initialValue.toLocaleString()}</Text>
                                            </Text>
                                        </Flex>
                                        <Box w="full" h="8px" bg="#1A1A1A" rounded="none" overflow="hidden">
                                            <Box w={`${balancePercentage}%`} h="full" bg={balancePercentage > 20 ? "#5cac7d" : "orange.400"} transition="width 0.3s" />
                                        </Box>
                                    </VStack>

                                    <Flex direction="column" gap={2} minW="140px" justify="flex-end" w={{ base: "full", md: "auto" }}>
                                        <Button size="sm" h="36px" onClick={() => resendEmail(voucher.recipientEmail)} variant="outline" borderColor="#333333" color="white" _hover={{ bg: "#111111" }} rounded="none" justifyContent="flex-start">
                                            <Icon as={LuMail} mr={2} strokeWidth="2.5" /> Resend Email
                                        </Button>
                                        {isActive && (
                                            <Button size="sm" h="36px" onClick={() => revokeVoucher(voucher.id)} variant="ghost" color="red.400" _hover={{ bg: "red.900", color: "white" }} rounded="none" justifyContent="flex-start">
                                                <Icon as={LuBan} mr={2} strokeWidth="2.5" /> Revoke
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
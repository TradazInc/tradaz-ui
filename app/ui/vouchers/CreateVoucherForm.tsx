"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Input, Button, Icon, SimpleGrid, VStack } from "@chakra-ui/react";
import { LuArrowLeft, LuSave, LuDices } from "react-icons/lu";
import { GiftVoucher } from "@/app/lib/definitions";

const controlStyles = { bg: "#121214", border: "1px solid", borderColor: "whiteAlpha.200", color: "white", h: "44px", rounded: "lg", px: 4, _focus: { outline: "none", borderColor: "#5cac7d" }, _hover: { bg: "whiteAlpha.50" } };

interface CreateVoucherFormProps {
    onBack: () => void;
    onSubmit: (voucher: GiftVoucher) => void;
}

export const CreateVoucherForm = ({ onBack, onSubmit }: CreateVoucherFormProps) => {
    const [code, setCode] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [recipientEmail, setRecipientEmail] = useState("");
    const [initialValue, setInitialValue] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    const handleGenerateCode = () => {
        const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        setCode(`GIFT-${randomCode}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const val = Number(initialValue) || 0;
        
        const newVoucher: GiftVoucher = {
            id: `VCH-${Math.floor(Math.random() * 10000)}`,
            code: code || "NEW-VOUCHER",
            recipientName,
            recipientEmail,
            initialValue: val,
            remainingBalance: val, // Starts fully loaded!
            issueDate: new Date().toISOString().split('T')[0],
            expiryDate: expiryDate || "2026-12-31",
            status: "Active"
        };

        onSubmit(newVoucher);
    };

    return (
        <Box animation="fade-in 0.3s ease">
            <Flex align="center" gap={4} mb={8}>
                <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }} onClick={onBack} px={2}>
                    <Icon as={LuArrowLeft} boxSize="20px" />
                </Button>
                <Box>
                    <Text color="white" fontWeight="bold" fontSize="2xl">Issue Gift Voucher</Text>
                    <Text color="gray.400" fontSize="sm">Generate store credit and send it directly to a customer.</Text>
                </Box>
            </Flex>

            <Box as="form" onSubmit={handleSubmit} bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                <VStack gap={6} align="stretch">
                    
                    <Box>
                        <Text color="gray.400" fontSize="sm" fontWeight="bold" mb={2}>Voucher Code</Text>
                        <Flex gap={3}>
                            <Input 
                                placeholder="e.g. GIFT-X9Y2B" textTransform="uppercase"
                                value={code} onChange={(e) => setCode(e.target.value.toUpperCase())}
                                {...controlStyles} flex={1} required
                            />
                            <Button onClick={handleGenerateCode} variant="outline" borderColor="whiteAlpha.200" color="white" h="44px" _hover={{ bg: "whiteAlpha.100" }}>
                                <Icon as={LuDices} mr={2} /> Generate
                            </Button>
                        </Flex>
                    </Box>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                        <Box>
                            <Text color="gray.400" fontSize="sm" fontWeight="bold" mb={2}>Recipient Name</Text>
                            <Input 
                                placeholder="John Doe" 
                                value={recipientName} onChange={(e) => setRecipientName(e.target.value)}
                                {...controlStyles} required
                            />
                        </Box>
                        <Box>
                            <Text color="gray.400" fontSize="sm" fontWeight="bold" mb={2}>Recipient Email</Text>
                            <Input 
                                type="email" placeholder="john@example.com" 
                                value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)}
                                {...controlStyles} required
                            />
                        </Box>
                        <Box>
                            <Text color="gray.400" fontSize="sm" fontWeight="bold" mb={2}>Voucher Value (₦)</Text>
                            <Input 
                                type="number" placeholder="e.g. 15000" 
                                value={initialValue} onChange={(e) => setInitialValue(e.target.value)}
                                {...controlStyles} required
                            />
                        </Box>
                        <Box>
                            <Text color="gray.400" fontSize="sm" fontWeight="bold" mb={2}>Expiry Date</Text>
                            <Input 
                                type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}
                                {...controlStyles} css={{ '&::-webkit-calendar-picker-indicator': { filter: 'invert(1)' } }} required
                            />
                        </Box>
                    </SimpleGrid>

                    <Box pt={4} borderTop="1px solid" borderColor="whiteAlpha.100" display="flex" justifyContent="flex-end" gap={3}>
                        <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }} onClick={onBack}>
                            Cancel
                        </Button>
                        <Button type="submit" bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} px={8}>
                            <Icon as={LuSave} mr={2} /> Issue Voucher
                        </Button>
                    </Box>

                </VStack>
            </Box>
        </Box>
    );
};
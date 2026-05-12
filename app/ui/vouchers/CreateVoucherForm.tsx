"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Input, Button, Icon, SimpleGrid, VStack } from "@chakra-ui/react";
import { LuArrowLeft, LuSave, LuDices } from "react-icons/lu";
import { GiftVoucher } from "@/app/lib/definitions";

// --- REUSABLE BRUTALIST STYLES ---
const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 4, _focus: { outline: "none", borderColor: "white", boxShadow: "none" }, _hover: { borderColor: "#555555" } };
const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };

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
                <Button variant="ghost" color="#888888" rounded="none" _hover={{ color: "white", bg: "#111111" }} onClick={onBack} px={2} h="44px">
                    <Icon as={LuArrowLeft} boxSize="20px" strokeWidth="2.5" />
                </Button>
                <Box>
                    <Text color="white" fontWeight="black" fontSize="2xl" letterSpacing="tight">Issue Gift Voucher</Text>
                    <Text color="#888888" fontSize="sm">Generate store credit and send it directly to a customer.</Text>
                </Box>
            </Flex>

            <Box as="form" onSubmit={handleSubmit} bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                <VStack gap={6} align="stretch">
                    
                    <Box>
                        <Text as="label" {...labelStyles}>Voucher Code <Text as="span" color="red.400">*</Text></Text>
                        <Flex gap={3}>
                            <Input 
                                placeholder="e.g. GIFT-X9Y2B" textTransform="uppercase"
                                value={code} onChange={(e) => setCode(e.target.value.toUpperCase())}
                                {...controlStyles} flex={1} required
                            />
                            <Button onClick={handleGenerateCode} variant="outline" borderColor="#333333" bg="#111111" color="white" rounded="none" h="44px" px={6} _hover={{ bg: "#1A1A1A" }}>
                                <Icon as={LuDices} mr={2} strokeWidth="2.5" /> Generate
                            </Button>
                        </Flex>
                    </Box>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                        <Box>
                            <Text as="label" {...labelStyles}>Recipient Name <Text as="span" color="red.400">*</Text></Text>
                            <Input 
                                placeholder="John Doe" 
                                value={recipientName} onChange={(e) => setRecipientName(e.target.value)}
                                {...controlStyles} required
                            />
                        </Box>
                        <Box>
                            <Text as="label" {...labelStyles}>Recipient Email <Text as="span" color="red.400">*</Text></Text>
                            <Input 
                                type="email" placeholder="john@example.com" 
                                value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)}
                                {...controlStyles} required
                            />
                        </Box>
                        <Box>
                            <Text as="label" {...labelStyles}>Voucher Value (₦) <Text as="span" color="red.400">*</Text></Text>
                            <Input 
                                type="number" placeholder="e.g. 15000" 
                                value={initialValue} onChange={(e) => setInitialValue(e.target.value)}
                                {...controlStyles} required
                            />
                        </Box>
                        <Box>
                            <Text as="label" {...labelStyles}>Expiry Date <Text as="span" color="red.400">*</Text></Text>
                            <Input 
                                type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}
                                {...controlStyles} css={{ '&::-webkit-calendar-picker-indicator': { filter: 'invert(1)' } }} required
                            />
                        </Box>
                    </SimpleGrid>

                    <Box pt={6} mt={2} borderTop="1px solid" borderColor="#1A1A1A" display="flex" justifyContent="flex-end" gap={3}>
                        <Button variant="outline" borderColor="#333333" color="#888888" bg="#0A0A0A" h="44px" rounded="none" _hover={{ color: "white", bg: "#111111" }} onClick={onBack}>
                            Cancel
                        </Button>
                        <Button type="submit" bg="white" color="black" border="none" rounded="none" h="44px" px={8} fontWeight="bold" _hover={{ bg: "#E5E5E5" }} display="flex" gap={2}>
                            <Icon as={LuSave} strokeWidth="2.5" /> Issue Voucher
                        </Button>
                    </Box>

                </VStack>
            </Box>
        </Box>
    );
};
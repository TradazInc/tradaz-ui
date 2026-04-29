"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Input, Button, Icon, SimpleGrid, VStack } from "@chakra-ui/react";
import { LuArrowLeft, LuSave, LuDices } from "react-icons/lu";
import { DiscountCoupon } from "@/app/lib/definitions";

const controlStyles = { 
    bg: "#111111", 
    border: "1px solid", 
    borderColor: "#333333", 
    color: "white", 
    h: "44px", 
    rounded: "none", 
    px: 4, 
    _focus: { outline: "none", borderColor: "white" }, 
    _hover: { bg: "#1A1A1A" } 
};

const nativeSelectStyle: React.CSSProperties = { 
    width: "100%", 
    backgroundColor: "#111111", 
    color: "white", 
    height: "44px", 
    borderRadius: "0px", 
    padding: "0 16px", 
    border: "1px solid #333333", 
    outline: "none", 
    cursor: "pointer", 
    fontSize: "14px" 
};

interface CreateCouponFormProps {
    onBack: () => void;
    onSubmit: (coupon: DiscountCoupon) => void;
}

export const CreateCouponForm = ({ onBack, onSubmit }: CreateCouponFormProps) => {
    const [code, setCode] = useState("");
    
    const [type, setType] = useState<"Percentage" | "Fixed">("Percentage");
    const [value, setValue] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [usageLimit, setUsageLimit] = useState("");

    const handleGenerateCode = () => {
        const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        setCode(`TRADAZ-${randomCode}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newCoupon: DiscountCoupon = {
            id: `CPN-${Math.floor(Math.random() * 10000)}`,
            code: code || "NEW-COUPON",
            type: type,
            value: Number(value) || 0,
            expiryDate: expiryDate || "2026-12-31",
            usageLimit: usageLimit ? Number(usageLimit) : "Unlimited",
            usageCount: 0,
            status: "Active"
        };

        onSubmit(newCoupon);
    };

    return (
        <Box animation="fade-in 0.3s ease" bg="#000000" w="full">
            <Flex align="center" gap={4} mb={8}>
                <Button variant="ghost" color="#888888" rounded="none" _hover={{ color: "white", bg: "#111111" }} onClick={onBack} px={2} h="40px">
                    <Icon as={LuArrowLeft} boxSize="20px" strokeWidth="2.5" />
                </Button>
                <Box>
                    <Text color="white" fontWeight="bold" fontSize="2xl" letterSpacing="tight">Create New Coupon</Text>
                    <Text color="#888888" fontSize="sm">Set up a new discount code for your customers.</Text>
                </Box>
            </Flex>

            <Box as="form" onSubmit={handleSubmit} bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                <VStack gap={6} align="stretch">
                    
                    {/* Code Generation */}
                    <Box>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Coupon Code</Text>
                        <Flex gap={3} direction={{ base: "column", md: "row" }}>
                            <Input 
                                placeholder="e.g. SUMMER24" textTransform="uppercase"
                                value={code} onChange={(e) => setCode(e.target.value.toUpperCase())}
                                {...controlStyles} flex={1} required
                            />
                            <Button onClick={handleGenerateCode} bg="#111111" border="1px solid #333333" color="white" rounded="none" h="44px" _hover={{ bg: "#1A1A1A" }}>
                                <Icon as={LuDices} color="#5cac7d" mr={2} strokeWidth="2.5" /> Generate
                            </Button>
                        </Flex>
                    </Box>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                        {/* Discount Type */}
                        <Box>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Discount Type</Text>
                            
                            <select value={type} onChange={(e) => setType(e.target.value as "Percentage" | "Fixed")} style={nativeSelectStyle}>
                                <option value="Percentage" style={{ background: "#0A0A0A" }}>Percentage (%)</option>
                                <option value="Fixed" style={{ background: "#0A0A0A" }}>Fixed Amount (₦)</option>
                            </select>
                        </Box>

                        {/* Discount Value */}
                        <Box>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Discount Value</Text>
                            <Input 
                                type="number" placeholder={type === "Percentage" ? "e.g. 15" : "e.g. 5000"} 
                                value={value} onChange={(e) => setValue(e.target.value)}
                                {...controlStyles} required
                            />
                        </Box>

                        {/* Expiry Date */}
                        <Box>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Expiry Date</Text>
                            <Input 
                                type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}
                                {...controlStyles} css={{ '&::-webkit-calendar-picker-indicator': { filter: 'invert(1)' } }} required
                            />
                        </Box>

                        {/* Usage Limit */}
                        <Box>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Usage Limit (Optional)</Text>
                            <Input 
                                type="number" placeholder="Leave blank for unlimited" 
                                value={usageLimit} onChange={(e) => setUsageLimit(e.target.value)}
                                {...controlStyles}
                            />
                        </Box>
                    </SimpleGrid>

                    <Box pt={6} mt={2} borderTop="1px solid" borderColor="#1A1A1A" display="flex" justifyContent="flex-end" gap={3}>
                        <Button variant="outline" rounded="none" borderColor="#333333" color="#888888" _hover={{ color: "white", bg: "#111111" }} onClick={onBack} h="44px" px={6}>
                            Cancel
                        </Button>
                        <Button type="submit" bg="white" color="black" rounded="none" fontWeight="bold" border="none" _hover={{ bg: "#E5E5E5" }} h="44px" px={8}>
                            <Icon as={LuSave} mr={2} strokeWidth="2.5" /> Save Coupon
                        </Button>
                    </Box>

                </VStack>
            </Box>
        </Box>
    );
};
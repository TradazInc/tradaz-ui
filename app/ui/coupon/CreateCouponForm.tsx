"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Input, Button, Icon, SimpleGrid, VStack } from "@chakra-ui/react";
import { LuArrowLeft, LuSave, LuDices } from "react-icons/lu";
import { DiscountCoupon } from "@/app/lib/definitions";

const controlStyles = { bg: "#121214", border: "1px solid", borderColor: "whiteAlpha.200", color: "white", h: "44px", rounded: "lg", px: 4, _focus: { outline: "none", borderColor: "#5cac7d" }, _hover: { bg: "whiteAlpha.50" } };
const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#121214", color: "white", height: "44px", borderRadius: "8px", padding: "0 16px", border: "1px solid rgba(255, 255, 255, 0.2)", outline: "none", cursor: "pointer", fontSize: "14px" };

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
        <Box animation="fade-in 0.3s ease">
            <Flex align="center" gap={4} mb={8}>
                <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }} onClick={onBack} px={2}>
                    <Icon as={LuArrowLeft} boxSize="20px" />
                </Button>
                <Box>
                    <Text color="white" fontWeight="bold" fontSize="2xl">Create New Coupon</Text>
                    <Text color="gray.400" fontSize="sm">Set up a new discount code for your customers.</Text>
                </Box>
            </Flex>

            <Box as="form" onSubmit={handleSubmit} bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                <VStack gap={6} align="stretch">
                    
                    {/* Code Generation */}
                    <Box>
                        <Text color="gray.400" fontSize="sm" fontWeight="bold" mb={2}>Coupon Code</Text>
                        <Flex gap={3}>
                            <Input 
                                placeholder="e.g. SUMMER24" textTransform="uppercase"
                                value={code} onChange={(e) => setCode(e.target.value.toUpperCase())}
                                {...controlStyles} flex={1} required
                            />
                            <Button onClick={handleGenerateCode} variant="outline" borderColor="whiteAlpha.200" color="white" h="44px" _hover={{ bg: "whiteAlpha.100" }}>
                                <Icon as={LuDices} mr={2} /> Generate
                            </Button>
                        </Flex>
                    </Box>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                        {/* Discount Type */}
                        <Box>
                            <Text color="gray.400" fontSize="sm" fontWeight="bold" mb={2}>Discount Type</Text>
                            
                            <select value={type} onChange={(e) => setType(e.target.value as "Percentage" | "Fixed")} style={nativeSelectStyle}>
                                <option value="Percentage" style={{ background: "#1A1C23" }}>Percentage (%)</option>
                                <option value="Fixed" style={{ background: "#1A1C23" }}>Fixed Amount (₦)</option>
                            </select>
                        </Box>

                        {/* Discount Value */}
                        <Box>
                            <Text color="gray.400" fontSize="sm" fontWeight="bold" mb={2}>Discount Value</Text>
                            <Input 
                                type="number" placeholder={type === "Percentage" ? "e.g. 15" : "e.g. 5000"} 
                                value={value} onChange={(e) => setValue(e.target.value)}
                                {...controlStyles} required
                            />
                        </Box>

                        {/* Expiry Date */}
                        <Box>
                            <Text color="gray.400" fontSize="sm" fontWeight="bold" mb={2}>Expiry Date</Text>
                            <Input 
                                type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}
                                {...controlStyles} css={{ '&::-webkit-calendar-picker-indicator': { filter: 'invert(1)' } }} required
                            />
                        </Box>

                        {/* Usage Limit */}
                        <Box>
                            <Text color="gray.400" fontSize="sm" fontWeight="bold" mb={2}>Usage Limit (Optional)</Text>
                            <Input 
                                type="number" placeholder="Leave blank for unlimited" 
                                value={usageLimit} onChange={(e) => setUsageLimit(e.target.value)}
                                {...controlStyles}
                            />
                        </Box>
                    </SimpleGrid>

                    <Box pt={4} borderTop="1px solid" borderColor="whiteAlpha.100" display="flex" justifyContent="flex-end" gap={3}>
                        <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }} onClick={onBack}>
                            Cancel
                        </Button>
                        <Button type="submit" bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} px={8}>
                            <Icon as={LuSave} mr={2} /> Save Coupon
                        </Button>
                    </Box>

                </VStack>
            </Box>
        </Box>
    );
};
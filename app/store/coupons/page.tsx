"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid, Badge, VStack 
} from "@chakra-ui/react";
import { 
    LuTicket, LuCopy, LuCheck, LuClock, LuPlus, LuInfo 
} from "react-icons/lu";

import { Coupon } from "@/app/lib/definitions";
import { MOCK_COUPONS } from "@/app/lib/data";

export default function CouponsPage() {
    const brandColor = "#5cac7d";
    
    // --- STATE ---
    const [coupons] = useState<Coupon[]>(MOCK_COUPONS);
    const [inputCode, setInputCode] = useState("");
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [isClaiming, setIsClaiming] = useState(false);

    // --- LOGIC HANDLERS ---
    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const handleClaimCoupon = () => {
        if (!inputCode.trim()) return;
        setIsClaiming(true);
        
        // POST /api/coupons/claim
        setTimeout(() => {
            setIsClaiming(false);
            alert(`Checking code: ${inputCode.toUpperCase()}...\n\n(Backend validation goes here)`);
            setInputCode("");
        }, 1000);
    };

    const getStatusUI = (status: string) => {
        switch (status) {
            case "active": return { color: brandColor, label: "Active", opacity: 1 };
            case "used": return { color: "blue.400", label: "Used", opacity: 0.6 };
            case "expired": return { color: "gray.500", label: "Expired", opacity: 0.5 };
            default: return { color: "gray.500", label: "Unknown", opacity: 1 };
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1000px" mx="auto" animation="fade-in 0.3s ease">
            
            {/* Header & Claim Section */}
            <Flex direction={{ base: "column", md: "row" }} align={{ base: "stretch", md: "flex-end" }} justify="space-between" mb={10} gap={6}>
                <Box>
                    <Flex align="center" gap={3} mb={2}>
                        <Icon as={LuTicket} boxSize="28px" color={brandColor} />
                        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight">
                            My Coupons
                        </Text>
                    </Flex>
                    <Text color="gray.400" fontSize="sm">Save more by applying these codes at checkout.</Text>
                </Box>
                
                {/* Manual Code Entry */}
                <Flex gap={2} bg="#1A1C23" p={2} rounded="xl" border="1px solid" borderColor="whiteAlpha.100" w={{ base: "full", md: "400px" }}>
                    <Input 
                        placeholder="Got a promo code?" border="none" color="white" h="45px" 
                        textTransform="uppercase" _placeholder={{ textTransform: "none" }}
                        _focus={{ outline: "none", boxShadow: "none" }}
                        value={inputCode} onChange={(e) => setInputCode(e.target.value)}
                    />
                    
                    <Button 
                        h="45px" px={6} bg={brandColor} color="white" rounded="lg" 
                        _hover={{ filter: "brightness(1.1)" }}
                        onClick={handleClaimCoupon} loading={isClaiming} display="flex" gap={2}
                    >
                        <Icon as={LuPlus} /> Claim
                    </Button>
                </Flex>
            </Flex>

            {/* Coupons Grid */}
            <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
                {coupons.map((coupon) => {
                    const ui = getStatusUI(coupon.status);
                    const isCopied = copiedCode === coupon.code;
                    const isActive = coupon.status === 'active';

                    return (
                        <Flex 
                            key={coupon.id} 
                            bg="#1A1C23" rounded="2xl" border="1px solid" 
                            borderColor={isActive ? "whiteAlpha.200" : "whiteAlpha.50"} 
                            overflow="hidden" opacity={ui.opacity}
                            transition="all 0.2s" _hover={{ transform: isActive ? "translateY(-4px)" : "none", shadow: isActive ? "xl" : "none" }}
                        >
                            {/* Discount Value */}
                            <Flex 
                                direction="column" justify="center" align="center" 
                                bg={isActive ? "rgba(92, 172, 125, 0.1)" : "whiteAlpha.50"} 
                                w="140px" p={4} borderRight="2px dashed" borderColor="whiteAlpha.200"
                            >
                                <Text fontSize="2xl" fontWeight="black" color={isActive ? brandColor : "gray.400"} textAlign="center" lineHeight="1.2">
                                    {coupon.discount}
                                </Text>
                            </Flex>

                            {/* Right Side: Details & Action */}
                            <Flex flex={1} direction="column" justify="space-between" p={5}>
                                <Box>
                                    <Flex justify="space-between" align="start" mb={2}>
                                        <Text color="white" fontWeight="bold" fontSize="md">{coupon.code}</Text>
                                        <Badge bg="whiteAlpha.100" color={ui.color} rounded="full" px={2.5} py={0.5} textTransform="uppercase" fontSize="10px" fontWeight="bold">
                                            {ui.label}
                                        </Badge>
                                    </Flex>
                                    <Text color="gray.400" fontSize="sm" lineClamp={2} mb={3}>
                                        {coupon.description}
                                    </Text>
                                </Box>

                                <VStack gap={2} align="stretch">
                                    {coupon.minSpend && (
                                        <Flex align="center" gap={1.5} color="gray.500" fontSize="xs">
                                            <Icon as={LuInfo} />
                                            <Text>Min. spend: ₦{coupon.minSpend.toLocaleString()}</Text>
                                        </Flex>
                                    )}
                                    <Flex justify="space-between" align="center" pt={3} borderTop="1px solid" borderColor="whiteAlpha.50">
                                        <Flex align="center" gap={1.5} color="gray.500" fontSize="xs">
                                            <Icon as={LuClock} />
                                            <Text>Valid till {coupon.expiryDate}</Text>
                                        </Flex>
                                        
                                        {/* Copy Button (Only for active coupons) */}
                                        {isActive && (
                                            <Button 
                                                size="xs" variant="outline" borderColor="whiteAlpha.200" color="white" 
                                                _hover={{ bg: "whiteAlpha.100" }} display="flex" gap={1.5} rounded="md"
                                                onClick={() => handleCopy(coupon.code)}
                                            >
                                                
                                                <Icon as={isCopied ? LuCheck : LuCopy} color={isCopied ? brandColor : "gray.400"} />
                                                <Text>{isCopied ? "Copied!" : "Copy Code"}</Text>
                                            </Button>
                                        )}
                                    </Flex>
                                </VStack>
                            </Flex>
                        </Flex>
                    );
                })}
            </Grid>
        </Box>
    );
}
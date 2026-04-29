"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, HStack, VStack, SimpleGrid } from "@chakra-ui/react";
import { 
    LuTicket, LuSearch, LuPlus, LuCopy, 
    LuTrash2, LuPower, LuPowerOff, LuPercent, LuBanknote, LuCheck, LuBan, LuClock
} from "react-icons/lu";

import { generateDummyCoupons } from "@/app/lib/data";
import { DiscountCoupon } from "@/app/lib/definitions";

import { CreateCouponForm } from "./CreateCouponForm";

export const CouponManager = () => {
    const [coupons, setCoupons] = useState<DiscountCoupon[]>(generateDummyCoupons());
    const [searchTerm, setSearchTerm] = useState("");
    
    const [isCreating, setIsCreating] = useState(false);

    // --- ACTIONS ---
    const toggleStatus = (id: string, currentStatus: string) => {
        setCoupons(prev => prev.map(coupon => {
            if (coupon.id === id) {
                const newStatus = currentStatus === "Active" ? "Disabled" : "Active";
                return { ...coupon, status: newStatus as "Active" | "Disabled" | "Expired" };
            }
            return coupon;
        }));
    };

    const deleteCoupon = (id: string) => {
        setCoupons(prev => prev.filter(c => c.id !== id));
    };

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
    };

    // Add handler to receive the new coupon from the form
    const handleAddCoupon = (newCoupon: DiscountCoupon) => {
        setCoupons(prev => [newCoupon, ...prev]);
        setIsCreating(false); // Close the form automatically
    };

    // --- FILTERING ---
    const filteredCoupons = coupons.filter(c => 
        c.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- STATS ---
    const activeCount = coupons.filter(c => c.status === "Active").length;
    const totalUses = coupons.reduce((acc, curr) => acc + curr.usageCount, 0);

    //  Route to the Create Form if isCreating is true
    if (isCreating) {
        return (
            <CreateCouponForm 
                onBack={() => setIsCreating(false)} 
                onSubmit={handleAddCoupon} 
            />
        );
    }

    // Otherwise, show the normal list view
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
                            <Icon as={LuTicket} color="#5cac7d" strokeWidth="2.5" /> Discount Coupons
                        </Text>
                        <Text color="#888888" fontSize="sm">Create and manage promotional codes for your store.</Text>
                    </Box>
                    
                    <Button onClick={() => setIsCreating(true)} bg="white" color="black" rounded="none" _hover={{ bg: "#E5E5E5" }} h="44px" px={6} fontWeight="bold" border="none">
                        <Icon as={LuPlus} mr={2} strokeWidth="2.5" /> Create Coupon
                    </Button>
                </Flex>
            </Box>

            {/* --- STATS & SEARCH --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Active Coupons</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{activeCount}</Text>
                </Box>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Total Uses</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{totalUses.toLocaleString()}</Text>
                </Box>
                <Flex align="center" bg="#0A0A0A" border="1px solid" borderColor="#333333" rounded="none" px={4} _focusWithin={{ borderColor: "white" }}>
                    <Icon as={LuSearch} color="#888888" strokeWidth="2.5" />
                    <Input 
                        placeholder="Search by coupon code..." 
                        border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" py={3} ml={2} px={0}
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Flex>
            </SimpleGrid>

            {/* --- COUPONS LIST --- */}
            <VStack gap={4} align="stretch" mb={8}>
                {filteredCoupons.length === 0 ? (
                    <Flex justify="center" py={12} color="#888888" bg="#0A0A0A" rounded="none" border="1px dashed" borderColor="#1A1A1A" fontWeight="bold">
                        No coupons found. Try creating one!
                    </Flex>
                ) : (
                    filteredCoupons.map((coupon) => {
                        const isActive = coupon.status === "Active";
                        const isExpired = coupon.status === "Expired";
                        
                        const usagePercentage = coupon.usageLimit !== "Unlimited" 
                            ? Math.min((coupon.usageCount / (coupon.usageLimit as number)) * 100, 100) 
                            : 0;

                        return (
                            <Box key={coupon.id} bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" p={{ base: 4, md: 6 }} transition="all 0.2s" opacity={isExpired ? 0.6 : 1} _hover={{ bg: "#111111" }}>
                                <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "center" }} gap={6}>
                                    
                                    {/* Left: Code & Details */}
                                    <VStack align="start" flex={1} gap={2}>
                                        <HStack gap={3}>
                                            <Flex align="center" justify="center" bg="#111111" border="1px solid #333333" px={3} py={2} rounded="none" cursor="pointer" onClick={() => copyToClipboard(coupon.code)} _hover={{ borderColor: "white" }} transition="all 0.2s">
                                                <Text color="white" fontWeight="black" letterSpacing="widest" mr={3}>{coupon.code}</Text>
                                                <Icon as={LuCopy} color="#888888" boxSize="14px" strokeWidth="2.5" />
                                            </Flex>
                                            
                                            {/* Strictly monochrome badge with colored icon */}
                                            <Flex align="center" gap={1.5} px={2.5} py={1} rounded="none" bg="#111111" border="1px solid #333333">
                                                <Icon 
                                                    as={isActive ? LuCheck : isExpired ? LuClock : LuBan} 
                                                    color={isActive ? "#5cac7d" : isExpired ? "red.400" : "orange.400"} 
                                                    boxSize="12px" strokeWidth="3" 
                                                />
                                                <Text color="white" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                                    {coupon.status}
                                                </Text>
                                            </Flex>
                                        </HStack>

                                        <Flex align="center" gap={4} mt={2}>
                                            <Flex align="center" gap={1.5}>
                                                <Icon as={coupon.type === "Percentage" ? LuPercent : LuBanknote} color="orange.400" strokeWidth="2.5" />
                                                <Text color="white" fontSize="sm" fontWeight="bold">
                                                    {coupon.type === "Percentage" ? `${coupon.value}% OFF` : `₦${coupon.value.toLocaleString()} OFF`}
                                                </Text>
                                            </Flex>
                                            <Box w="1px" h="14px" bg="#333333" />
                                            <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Expires: {coupon.expiryDate}</Text>
                                        </Flex>
                                    </VStack>

                                    {/* Middle: Usage Progress */}
                                    <VStack align="start" flex={1} w="full" minW={{ md: "200px" }} maxW={{ md: "300px" }} gap={2} bg="#111111" p={4} border="1px solid #1A1A1A" rounded="none">
                                        <Flex justify="space-between" w="full">
                                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Usage</Text>
                                            <Text color="white" fontSize="sm" fontWeight="bold">{coupon.usageCount} <Text as="span" color="#888888" fontWeight="normal" fontSize="xs">/ {coupon.usageLimit}</Text></Text>
                                        </Flex>
                                        {/* Strictly monochrome progress bar */}
                                        <Box w="full" h="6px" bg="#1A1A1A" rounded="none" overflow="hidden">
                                            {coupon.usageLimit !== "Unlimited" && (
                                                <Box w={`${usagePercentage}%`} h="full" bg="white" transition="width 0.3s" />
                                            )}
                                        </Box>
                                    </VStack>

                                    {/* Right: Actions */}
                                    <Flex gap={2} minW="140px" justify="flex-end" w={{ base: "full", md: "auto" }}>
                                        {!isExpired && (
                                            <Button size="sm" h="36px" onClick={() => toggleStatus(coupon.id, coupon.status)} variant="outline" borderColor="#333333" color="white" _hover={{ bg: "#111111" }} rounded="none">
                                                <Icon as={isActive ? LuPowerOff : LuPower} color={isActive ? "orange.400" : "#5cac7d"} mr={2} strokeWidth="2.5" /> {isActive ? "Disable" : "Enable"}
                                            </Button>
                                        )}
                                        <Button size="sm" h="36px" onClick={() => deleteCoupon(coupon.id)} variant="ghost" color="white" _hover={{ bg: "#111111" }} rounded="none">
                                            <Icon as={LuTrash2} color="red.400" strokeWidth="2.5" />
                                        </Button>
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
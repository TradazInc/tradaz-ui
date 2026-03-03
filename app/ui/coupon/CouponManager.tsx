"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, HStack, VStack, SimpleGrid } from "@chakra-ui/react";
import { 
    LuTicket, LuSearch, LuPlus, LuCopy, 
    LuTrash2, LuPower, LuPowerOff, LuPercent, LuBanknote
} from "react-icons/lu";

import { generateDummyCoupons } from "@/app/lib/data";
import { DiscountCoupon } from "@/app/lib/definitions";

export const CouponManager = () => {
    const [coupons, setCoupons] = useState<DiscountCoupon[]>(generateDummyCoupons());
    const [searchTerm, setSearchTerm] = useState("");

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
        // You would typically show a quick toast notification here!
    };

    // --- FILTERING ---
    const filteredCoupons = coupons.filter(c => 
        c.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- STATS ---
    const activeCount = coupons.filter(c => c.status === "Active").length;
    const totalUses = coupons.reduce((acc, curr) => acc + curr.usageCount, 0);

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* --- Sticky Header (Slimmed down for mobile!) --- */}
            <Box 
                position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} 
                bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} mx={-4} px={4} 
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4}>
                    <Box>
                        <Text color="#5cac7d" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2}>
                            <Icon as={LuTicket} /> Discount Coupons
                        </Text>
                        <Text color="gray.400" fontSize="sm">Create and manage promotional codes for your store.</Text>
                    </Box>
                    
                    <Button bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} h="44px" px={6}>
                        <Icon as={LuPlus} mr={2} /> Create Coupon
                    </Button>
                </Flex>
            </Box>

            {/* --- STATS & SEARCH (Moved outside sticky header to scroll away) --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
                <Box bg="#1A1C23" p={4} rounded="xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Active Coupons</Text>
                    <Text color="white" fontSize="2xl" fontWeight="black">{activeCount}</Text>
                </Box>
                <Box bg="#1A1C23" p={4} rounded="xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Total Uses</Text>
                    <Text color="white" fontSize="2xl" fontWeight="black">{totalUses.toLocaleString()}</Text>
                </Box>
                <Flex align="center" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="xl" px={4} _focusWithin={{ borderColor: "#5cac7d" }}>
                    <Icon as={LuSearch} color="gray.400" />
                    <Input 
                        placeholder="Search by coupon code..." 
                        border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" py={3}
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Flex>
            </SimpleGrid>

            {/* --- COUPONS LIST --- */}
            <VStack gap={4} align="stretch" mb={8}>
                {filteredCoupons.length === 0 ? (
                    <Flex justify="center" py={12} color="gray.500" bg="whiteAlpha.50" rounded="2xl" border="1px dashed" borderColor="whiteAlpha.200">
                        No coupons found. Try creating one!
                    </Flex>
                ) : (
                    filteredCoupons.map((coupon) => {
                        const isActive = coupon.status === "Active";
                        const isExpired = coupon.status === "Expired";
                        
                        // Calculate usage progress if there is a limit
                        const usagePercentage = coupon.usageLimit !== "Unlimited" 
                            ? Math.min((coupon.usageCount / coupon.usageLimit) * 100, 100) 
                            : 0;

                        return (
                            <Box key={coupon.id} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.3)" : "whiteAlpha.100"} p={{ base: 4, md: 6 }} shadow="sm" transition="all 0.2s" opacity={isExpired ? 0.6 : 1}>
                                <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "center" }} gap={6}>
                                    
                                    {/* Left: Code & Details */}
                                    <VStack align="start" flex={1} gap={2}>
                                        <HStack gap={3}>
                                            <Flex align="center" justify="center" bg="rgba(255, 255, 255, 0.05)" border="1px dashed" borderColor="gray.500" px={3} py={1} rounded="md" cursor="pointer" onClick={() => copyToClipboard(coupon.code)} _hover={{ bg: "whiteAlpha.200" }}>
                                                <Text color="white" fontWeight="black" letterSpacing="wider" mr={2}>{coupon.code}</Text>
                                                <Icon as={LuCopy} color="gray.400" boxSize="12px" />
                                            </Flex>
                                            
                                            <Flex align="center" px={2.5} py={0.5} rounded="full" bg={isActive ? "rgba(92, 172, 125, 0.15)" : isExpired ? "rgba(245, 101, 101, 0.15)" : "whiteAlpha.100"}>
                                                <Box boxSize="6px" rounded="full" mr={2} bg={isActive ? "#5cac7d" : isExpired ? "red.400" : "gray.400"} />
                                                <Text color={isActive ? "#5cac7d" : isExpired ? "red.400" : "gray.400"} fontSize="xs" fontWeight="bold">
                                                    {coupon.status}
                                                </Text>
                                            </Flex>
                                        </HStack>

                                        <Flex align="center" gap={4} mt={2}>
                                            <Flex align="center" gap={1.5} color="gray.300">
                                                <Icon as={coupon.type === "Percentage" ? LuPercent : LuBanknote} color="orange.400" />
                                                <Text fontSize="sm" fontWeight="bold">
                                                    {coupon.type === "Percentage" ? `${coupon.value}% OFF` : `₦${coupon.value.toLocaleString()} OFF`}
                                                </Text>
                                            </Flex>
                                            <Box w="1px" h="12px" bg="whiteAlpha.300" />
                                            <Text color="gray.500" fontSize="sm">Expires: {coupon.expiryDate}</Text>
                                        </Flex>
                                    </VStack>

                                    {/* Middle: Usage Progress */}
                                    <VStack align="start" flex={1} w="full" minW={{ md: "200px" }} maxW={{ md: "300px" }} gap={1}>
                                        <Flex justify="space-between" w="full">
                                            <Text color="gray.400" fontSize="xs">Usage</Text>
                                            <Text color="white" fontSize="xs" fontWeight="bold">{coupon.usageCount} / {coupon.usageLimit}</Text>
                                        </Flex>
                                        <Box w="full" h="6px" bg="whiteAlpha.100" rounded="full" overflow="hidden">
                                            {coupon.usageLimit !== "Unlimited" && (
                                                <Box w={`${usagePercentage}%`} h="full" bg={usagePercentage >= 100 ? "red.400" : "#5cac7d"} transition="width 0.3s" />
                                            )}
                                        </Box>
                                    </VStack>

                                    {/* Right: Actions */}
                                    <Flex gap={2} minW="140px" justify="flex-end" w={{ base: "full", md: "auto" }}>
                                        {!isExpired && (
                                            <Button size="sm" onClick={() => toggleStatus(coupon.id, coupon.status)} variant="outline" borderColor="whiteAlpha.200" color={isActive ? "orange.400" : "#5cac7d"} _hover={{ bg: "whiteAlpha.50" }}>
                                                <Icon as={isActive ? LuPowerOff : LuPower} mr={2} /> {isActive ? "Disable" : "Enable"}
                                            </Button>
                                        )}
                                        <Button size="sm" onClick={() => deleteCoupon(coupon.id)} variant="ghost" color="red.400" _hover={{ bg: "red.900", color: "white" }}>
                                            <Icon as={LuTrash2} />
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
"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, HStack, VStack, SimpleGrid, IconButton } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LuTicket, LuSearch, LuPlus, LuCopy, 
    LuTrash2, LuPower, LuPowerOff, LuPercent, LuBanknote, LuCheck, LuBan, LuClock, LuX, LuDices
} from "react-icons/lu";

import { generateDummyCoupons } from "@/data/data";
import { DiscountCoupon } from "@/types/definitions";

// --- REUSABLE STYLES ---
const inputStyles = { bg: "#000000", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 4, _focus: { outline: "none", borderColor: "white", boxShadow: "none" }, _hover: { borderColor: "#555555" } };
const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#000000", color: "white", height: "44px", borderRadius: "0px", padding: "0 16px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px" };
const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };

// --- CREATE COUPON MODAL ---
interface CreateCouponModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (coupon: DiscountCoupon) => void;
}

const CreateCouponModal = ({ isOpen, onClose, onSave }: CreateCouponModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        code: "",
        type: "Percentage",
        value: "",
        usageLimit: "",
        expiryDate: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenerateCode = () => {
        const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        setFormData({ ...formData, code: `SALE-${randomCode}` });
    };

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            const newCoupon: DiscountCoupon = {
                id: `CPN-${Math.floor(Math.random() * 90000) + 10000}`,
                code: formData.code,
                type: formData.type as DiscountCoupon["type"], 
                value: Number(formData.value) || 0,
                usageLimit: formData.usageLimit ? Number(formData.usageLimit) : "Unlimited",
                usageCount: 0,
                expiryDate: formData.expiryDate || "No Expiry",
                status: "Active"
            };
            onSave(newCoupon);
            setIsLoading(false);
            setFormData({ code: "", type: "Percentage", value: "", usageLimit: "", expiryDate: "" });
            onClose();
        }, 600);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
                        onClick={onClose}
                    />

                    <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "400px", md: "450px" }} pointerEvents="none">
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
                        >
                            <Box w="100%" h="100%" bg="#0A0A0A" borderLeft="1px solid" borderColor="#1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                                
                                <Flex justify="space-between" align="center" px={6} pt={8} pb={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#111111">
                                    <Box>
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>
                                            Promotions
                                        </Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">
                                            Create Coupon
                                        </Text>
                                    </Box>
                                    <IconButton aria-label="Close modal" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <VStack w="full" gap={6} align="stretch">
                                        
                                        <Box>
                                            <Text as="label" {...labelStyles}>Coupon Code <Text as="span" color="red.400">*</Text></Text>
                                            <Flex gap={3}>
                                                <Input 
                                                    name="code" placeholder="e.g. SUMMER20" textTransform="uppercase"
                                                    value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                                                    {...inputStyles} flex={1} required
                                                />
                                                <Button onClick={handleGenerateCode} variant="outline" borderColor="#333333" bg="#111111" color="white" rounded="none" h="44px" px={6} _hover={{ bg: "#1A1A1A" }}>
                                                    <Icon as={LuDices} mr={2} strokeWidth="2.5" /> Generate
                                                </Button>
                                            </Flex>
                                        </Box>

                                        <SimpleGrid columns={2} gap={4}>
                                            <Box>
                                                <Text as="label" {...labelStyles}>Discount Type</Text>
                                                <select name="type" value={formData.type} onChange={handleChange} style={nativeSelectStyle}>
                                                    <option value="Percentage" style={{ background: "#000000" }}>Percentage (%)</option>
                                                    <option value="Fixed" style={{ background: "#000000" }}>Fixed Amount (₦)</option>
                                                </select>
                                            </Box>
                                            <Box>
                                                <Text as="label" {...labelStyles}>Discount Value <Text as="span" color="red.400">*</Text></Text>
                                                <Input type="number" name="value" value={formData.value} onChange={handleChange} placeholder={formData.type === "Percentage" ? "e.g. 20" : "e.g. 5000"} {...inputStyles} />
                                            </Box>
                                        </SimpleGrid>

                                        <SimpleGrid columns={2} gap={4}>
                                            <Box>
                                                <Text as="label" {...labelStyles}>Usage Limit</Text>
                                                <Input type="number" name="usageLimit" value={formData.usageLimit} onChange={handleChange} placeholder="Leave blank for unlimited" {...inputStyles} />
                                            </Box>
                                            <Box>
                                                <Text as="label" {...labelStyles}>Expiry Date</Text>
                                                <Input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} {...inputStyles} css={{ '&::-webkit-calendar-picker-indicator': { filter: 'invert(1)' } }} />
                                            </Box>
                                        </SimpleGrid>

                                    </VStack>
                                </Box>

                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                                    <Button variant="outline" borderColor="#333333" onClick={onClose} h="44px" rounded="none" color="#888888" bg="#0A0A0A" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        flex="1" h="44px" bg="white" color="black" rounded="none" fontWeight="bold" onClick={handleSave} 
                                        disabled={!formData.code || !formData.value}
                                        _hover={{ bg: "#E5E5E5" }} 
                                        _disabled={{ opacity: 0.5, cursor: "not-allowed", bg: "#333333", color: "#888888" }} 
                                        transition="all 0.2s ease"
                                    >
                                        {isLoading ? "Saving..." : "Create Coupon"}
                                    </Button>
                                </Flex>

                            </Box>
                        </motion.div>
                    </Box>
                </>
            )}
        </AnimatePresence>
    );
};


// --- MAIN COUPON MANAGER ---
export const CouponManager = () => {
    const [coupons, setCoupons] = useState<DiscountCoupon[]>(generateDummyCoupons());
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

    const handleAddCoupon = (newCoupon: DiscountCoupon) => {
        setCoupons(prev => [newCoupon, ...prev]);
    };

    // --- FILTERING ---
    const filteredCoupons = coupons.filter(c => 
        c.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- STATS ---
    const activeCount = coupons.filter(c => c.status === "Active").length;
    const totalUses = coupons.reduce((acc, curr) => acc + curr.usageCount, 0);

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
                    
                    <Button onClick={() => setIsCreateModalOpen(true)} bg="white" color="black" rounded="none" _hover={{ bg: "#E5E5E5" }} h="44px" px={6} fontWeight="bold" border="none">
                        <Icon as={LuPlus} mr={2} strokeWidth="2.5" /> Create Coupon
                    </Button>
                </Flex>
            </Box>

            {/* --- STATS GRID (Reduced to 2 columns) --- */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={6}>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Active Coupons</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{activeCount}</Text>
                </Box>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Total Uses</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{totalUses.toLocaleString()}</Text>
                </Box>
            </SimpleGrid>

            {/* --- UTILITY TOOLBAR (Search isolated here) --- */}
            <Flex mb={6} w="full">
                <Flex align="center" bg="#0A0A0A" border="1px solid" borderColor="#333333" rounded="none" px={4} h="44px" w={{ base: "full", md: "350px" }} _focusWithin={{ borderColor: "white" }}>
                    <Icon as={LuSearch} color="#888888" strokeWidth="2.5" />
                    <Input 
                        placeholder="Search by coupon code..." 
                        border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" ml={2} px={0}
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Flex>
            </Flex>

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

            {/* --- MOUNT MODAL --- */}
            <CreateCouponModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
                onSave={handleAddCoupon}
            />
        </Box>
    );
};
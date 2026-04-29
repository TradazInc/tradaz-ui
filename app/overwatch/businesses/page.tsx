"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid, VStack, Avatar 
} from "@chakra-ui/react";
import { 
    LuSearch, LuFilter, LuPlus, LuEllipsisVertical, LuBuilding2
} from "react-icons/lu";

// --- MOCK PARENT BUSINESS DATA ---
const MOCK_BUSINESSES = [
    { id: "BIZ-901", name: "Wada Group Ltd.", owner: "Wada Gift", plan: "Enterprise", status: "active", totalGmv: "₦45,500,000", shopCount: 3 },
    { id: "BIZ-902", name: "Connor Retail Holdings", owner: "Sarah Connor", plan: "Pro Tier", status: "active", totalGmv: "₦8,200,000", shopCount: 1 },
    { id: "BIZ-903", name: "TechNova Inc.", owner: "John Doe", plan: "Basic Tier", status: "pending", totalGmv: "₦0", shopCount: 1 },
    { id: "BIZ-904", name: "Lagos Streetwear Co.", owner: "Tobi O.", plan: "Pro Tier", status: "suspended", totalGmv: "₦12,400,000", shopCount: 2 },
];

export default function AdminBusinessesPage() {
    const router = useRouter();
    
    const [searchQuery, setSearchQuery] = useState("");
    const [businesses] = useState(MOCK_BUSINESSES);

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1300px" mx="auto" animation="fade-in 0.3s ease" position="relative" bg="#000000" minH="100vh">
            
            {/* --- STICKY HEADER --- */}
            <Box 
                position="sticky" top={{ base: "-16px", lg: "-32px" }} mx={{ base: "-16px", lg: "-32px" }} px={{ base: "16px", lg: "32px" }}
                zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={8} borderBottom="1px solid #1A1A1A"
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} gap={4}>
                    <Box>
                        <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">Parent Businesses</Text>
                        <Text color="#888888" fontSize="sm">Manage master tenant accounts, their aggregated GMV, and total shops.</Text>
                    </Box>
                    <Button 
                        bg="white" color="black" rounded="none" h="44px" px={6} border="none" fontWeight="bold" 
                        _hover={{ bg: "#E5E5E5" }} display="flex" gap={2}
                    >
                        <Icon as={LuPlus} color="#5cac7d" strokeWidth="2.5" /> Onboard New Business
                    </Button>
                </Flex>
            </Box>

            {/* --- FILTERS & SEARCH --- */}
            <Flex gap={4} mb={6} direction={{ base: "column", md: "row" }}>
                <Flex flex={1} align="center" bg="#0A0A0A" border="1px solid" borderColor="#333333" rounded="none" px={4} h="44px" _focusWithin={{ borderColor: "white" }}>
                    <Icon as={LuSearch} color="#888888" strokeWidth="2.5" />
                    <Input 
                        placeholder="Search by business name, owner, or ID..." border="none" color="white" h="full" px={2}
                        _focus={{ boxShadow: "none", outline: "none" }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Flex>
                <Button h="44px" px={6} bg="#111111" border="1px solid" borderColor="#333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A" }} display="flex" gap={2} fontWeight="bold">
                    <Icon as={LuFilter} color="#888888" strokeWidth="2.5" /> <Text display={{ base: "none", sm: "block" }}>Filter</Text>
                </Button>
            </Flex>

            {/* --- GLOBAL BUSINESSES GRID --- */}
            <VStack align="stretch" gap={3}>
                
                {/* Desktop Table Headers */}
                <Grid templateColumns="2fr 1.5fr 1fr 1fr 1fr 1.5fr 50px" gap={4} px={6} py={2} display={{ base: "none", xl: "grid" }}>
                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Business Entity</Text>
                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Primary Owner</Text>
                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Status</Text>
                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Active Shops</Text>
                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Master Plan</Text>
                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Aggregated GMV</Text>
                    <Text></Text>
                </Grid>

                {/* Table Rows */}
                {businesses.map((biz) => {
                    const isActive = biz.status === 'active';
                    const isPending = biz.status === 'pending';

                    return (
                        <Grid 
                            key={biz.id} 
                            templateColumns={{ base: "1fr", md: "2fr 1.5fr 1fr", xl: "2fr 1.5fr 1fr 1fr 1fr 1.5fr 50px" }} 
                            gap={4} p={4} bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A"
                            alignItems="center" cursor="pointer" transition="all 0.2s"
                            _hover={{ bg: "#111111", borderColor: "#333333" }}
                            onClick={() => router.push(`/admin/businesses/${biz.id}`)}
                        >
                            {/* Business Info */}
                            <Flex align="center" gap={4}>
                                <Avatar.Root size="md" rounded="full">
                                    <Avatar.Fallback name={biz.name} bg="#111111" border="1px solid #333333" color="white" rounded="none" fontWeight="bold" />
                                </Avatar.Root>
                                <Box overflow="hidden">
                                    <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1} letterSpacing="tight">{biz.name}</Text>
                                    <Text color="#888888" fontSize="xs" lineClamp={1} fontFamily="monospace" mt={0.5}>ID: {biz.id}</Text>
                                </Box>
                            </Flex>

                            {/* Owner */}
                            <Text color="#888888" fontSize="sm" fontWeight="bold" display={{ base: "none", md: "block" }}>
                                {biz.owner}
                            </Text>

                            {/* Status */}
                            <Box display={{ base: "none", md: "block" }}>
                                <Flex align="center" gap={2}>
                                    <Box boxSize="6px" rounded="none" bg={isActive ? "#5cac7d" : isPending ? "orange.400" : "red.400"} />
                                    <Text color={isActive ? "white" : "#888888"} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                        {biz.status}
                                    </Text>
                                </Flex>
                            </Box>

                            {/* Active Shops Count */}
                            <Flex align="center" gap={2} display={{ base: "none", xl: "flex" }}>
                                <Icon as={LuBuilding2} color="#5cac7d" strokeWidth="2.5" />
                                <Text color="white" fontWeight="bold" fontSize="sm">{biz.shopCount} <Text as="span" fontWeight="normal" color="#888888">Shops</Text></Text>
                            </Flex>

                            {/* Master SaaS Plan */}
                            <Text color="#888888" fontWeight="bold" fontSize="10px" textTransform="uppercase" letterSpacing="wider" display={{ base: "none", xl: "block" }}>
                                {biz.plan}
                            </Text>
                            
                            {/* Aggregated GMV */}
                            <Text color="white" fontWeight="black" fontSize="sm" display={{ base: "none", xl: "block" }} textAlign="right" letterSpacing="tight" fontFamily="monospace">
                                {biz.totalGmv}
                            </Text>

                            {/* Action Menu */}
                            <Flex justify="flex-end" display={{ base: "none", xl: "flex" }}>
                                <Icon as={LuEllipsisVertical} color="#888888" cursor="pointer" strokeWidth="2.5" _hover={{ color: "white" }} />
                            </Flex>
                        </Grid>
                    );
                })}
            </VStack>
        </Box>
    );
}
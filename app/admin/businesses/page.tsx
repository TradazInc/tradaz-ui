"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid, Badge, VStack, Avatar 
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
    const brandColor = "#5cac7d";
    const router = useRouter();
    
    const [searchQuery, setSearchQuery] = useState("");
    const [businesses] = useState(MOCK_BUSINESSES);

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1300px" mx="auto" animation="fade-in 0.3s ease">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={8} gap={4}>
                <Box>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">Parent Businesses</Text>
                    <Text color="gray.400" fontSize="sm">Manage master tenant accounts, their aggregated GMV, and total shops.</Text>
                </Box>
                <Button bg={brandColor} color="white" rounded="lg" h="45px" px={6} _hover={{ filter: "brightness(1.1)" }} display="flex" gap={2}>
                    <Icon as={LuPlus} /> Onboard New Business
                </Button>
            </Flex>

            {/* --- FILTERS & SEARCH --- */}
            <Flex gap={4} mb={6}>
                <Flex flex={1} align="center" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" rounded="xl" px={4} _focusWithin={{ borderColor: brandColor }}>
                    <Icon as={LuSearch} color="gray.500" />
                    <Input 
                        placeholder="Search by business name, owner, or ID..." border="none" color="white" h="50px" 
                        _focus={{ boxShadow: "none", outline: "none" }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Flex>
                <Button h="50px" px={6} bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" color="white" rounded="xl" _hover={{ bg: "whiteAlpha.50" }} display="flex" gap={2}>
                    <Icon as={LuFilter} /> <Text display={{ base: "none", sm: "block" }}>Filter</Text>
                </Button>
            </Flex>

            {/* --- GLOBAL BUSINESSES GRID --- */}
            <VStack align="stretch" gap={3}>
                
                {/* Desktop Table Headers */}
                <Grid templateColumns="2fr 1.5fr 1fr 1fr 1fr 1.5fr 50px" gap={4} px={6} py={2} display={{ base: "none", xl: "grid" }}>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Business Entity</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Primary Owner</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Status</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Active Shops</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Master Plan</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Aggregated GMV</Text>
                </Grid>

                {/* Table Rows */}
                {businesses.map((biz) => (
                    <Grid 
                        key={biz.id} 
                        templateColumns={{ base: "1fr", md: "2fr 1.5fr 1fr", xl: "2fr 1.5fr 1fr 1fr 1fr 1.5fr 50px" }} 
                        gap={4} p={4} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.50"
                        alignItems="center" cursor="pointer" transition="all 0.2s"
                        _hover={{ borderColor: brandColor, transform: "translateY(-2px)", shadow: "lg" }}
                        onClick={() => router.push(`/admin/businesses/${biz.id}`)}
                    >
                        {/*  Business Info */}
                        <Flex align="center" gap={3}>
                            <Avatar.Root size="md">
                                <Avatar.Fallback name={biz.name} bg="whiteAlpha.200" color="white" />
                            </Avatar.Root>
                            <Box overflow="hidden">
                                <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1}>{biz.name}</Text>
                                <Text color="gray.500" fontSize="xs" lineClamp={1}>ID: {biz.id}</Text>
                            </Box>
                        </Flex>

                        {/*  Owner */}
                        <Text color="gray.400" fontSize="sm" display={{ base: "none", md: "block" }}>
                            {biz.owner}
                        </Text>

                        {/*  Status */}
                        <Box display={{ base: "none", md: "block" }}>
                            <Badge 
                                bg={biz.status === 'active' ? "rgba(92, 172, 125, 0.15)" : biz.status === 'pending' ? "rgba(236, 201, 75, 0.15)" : "rgba(229, 62, 62, 0.15)"} 
                                color={biz.status === 'active' ? brandColor : biz.status === 'pending' ? "yellow.400" : "red.400"} 
                                px={2.5} py={1} rounded="md"
                            >
                                {biz.status.toUpperCase()}
                            </Badge>
                        </Box>

                        {/*  Active Shops Count */}
                        <Flex align="center" gap={2} display={{ base: "none", xl: "flex" }}>
                            <Icon as={LuBuilding2} color={brandColor} />
                            <Text color="white" fontWeight="bold" fontSize="sm">{biz.shopCount} <Text as="span" fontWeight="normal" color="gray.500">Shops</Text></Text>
                        </Flex>

                        {/* Master SaaS Plan */}
                        <Text color="purple.400" fontWeight="bold" fontSize="sm" display={{ base: "none", xl: "block" }}>
                            {biz.plan}
                        </Text>
                        
                        {/*  Aggregated GMV */}
                        <Text color="white" fontWeight="black" fontSize="sm" display={{ base: "none", xl: "block" }}>
                            {biz.totalGmv}
                        </Text>

                        {/*  Action Menu */}
                        <Flex justify="flex-end" display={{ base: "none", xl: "flex" }}>
                            <Icon as={LuEllipsisVertical} color="gray.500" />
                        </Flex>
                    </Grid>
                ))}
            </VStack>
        </Box>
    );
}
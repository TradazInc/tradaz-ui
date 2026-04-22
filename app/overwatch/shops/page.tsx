"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid, Badge, VStack, Avatar 
} from "@chakra-ui/react";
import { 
    LuSearch, LuFilter,  LuPlus, LuEllipsisVertical, LuUsers
} from "react-icons/lu";

// --- MOCK TENANT DATA ---
const MOCK_SHOPS = [
    { id: "SHP-001", name: "Urban Kicks NG", owner: "Wada Gift", plan: "Pro Tier", status: "active", gmv: "₦12,500,000", users: 104 },
    { id: "SHP-002", name: "Lagos Streetwear", owner: "Tobi O.", plan: "Basic Tier", status: "pending", gmv: "₦0", users: 100 },
    { id: "SHP-003", name: "Tech Gadgets Pro", owner: "John Doe", plan: "Enterprise", status: "active", gmv: "₦5,100,000", users: 120 },
    { id: "SHP-004", name: "Minimalist Hub", owner: "Sarah Connor", plan: "Pro Tier", status: "suspended", gmv: "₦8,200,000", users: 300 },
];

export default function AdminShopsPage() {
    const brandColor = "#5cac7d";
    const router = useRouter();
    
    const [searchQuery, setSearchQuery] = useState("");
    const [shops] = useState(MOCK_SHOPS);

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1300px" mx="auto" animation="fade-in 0.3s ease">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={8} gap={4}>
                <Box>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">Registered Shops</Text>
                    <Text color="gray.400" fontSize="sm">Monitor tenant health, subscription plans, and user counts.</Text>
                </Box>
                <Button bg={brandColor} color="white" rounded="lg" h="45px" px={6} _hover={{ filter: "brightness(1.1)" }} display="flex" gap={2}>
                    <Icon as={LuPlus} /> Invite New Business
                </Button>
            </Flex>

            {/* --- FILTERS & SEARCH --- */}
            <Flex gap={4} mb={6}>
                <Flex flex={1} align="center" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" rounded="xl" px={4} _focusWithin={{ borderColor: brandColor }}>
                    <Icon as={LuSearch} color="gray.500" />
                    <Input 
                        placeholder="Search by shop name, owner, or ID..." border="none" color="white" h="50px" 
                        _focus={{ boxShadow: "none", outline: "none" }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Flex>
                <Button h="50px" px={6} bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" color="white" rounded="xl" _hover={{ bg: "whiteAlpha.50" }} display="flex" gap={2}>
                    <Icon as={LuFilter} /> <Text display={{ base: "none", sm: "block" }}>Filter</Text>
                </Button>
            </Flex>

            {/* --- GLOBAL SHOPS GRID --- */}
            <VStack align="stretch" gap={3}>
                
                {/* Desktop Table Headers */}
                <Grid templateColumns="2fr 1.5fr 1fr 1fr 1fr 1.5fr 50px" gap={4} px={6} py={2} display={{ base: "none", xl: "grid" }}>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Shop / Tenant</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Owner</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Status</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">SaaS Plan</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Users</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">30-Day GMV</Text>
                </Grid>

                {/* Table Rows */}
                {shops.map((shop) => (
                    <Grid 
                        key={shop.id} 
                        templateColumns={{ base: "1fr", md: "2fr 1.5fr 1fr", xl: "2fr 1.5fr 1fr 1fr 1fr 1.5fr 50px" }} 
                        gap={4} p={4} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.50"
                        alignItems="center" cursor="pointer" transition="all 0.2s"
                        _hover={{ borderColor: brandColor, transform: "translateY(-2px)", shadow: "lg" }}
                        onClick={() => router.push(`/admin/shops/${shop.id}`)}
                    >
                        {/* 1. Shop Info */}
                        <Flex align="center" gap={3}>
                            <Avatar.Root size="md">
                                <Avatar.Fallback name={shop.name} bg="whiteAlpha.200" color="white" />
                            </Avatar.Root>
                            <Box overflow="hidden">
                                <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1}>{shop.name}</Text>
                                <Text color="gray.500" fontSize="xs" lineClamp={1}>ID: {shop.id}</Text>
                            </Box>
                        </Flex>

                        {/*  Owner */}
                        <Text color="gray.400" fontSize="sm" display={{ base: "none", md: "block" }}>
                            {shop.owner}
                        </Text>

                        {/*  Status */}
                        <Box display={{ base: "none", md: "block" }}>
                            <Badge 
                                bg={shop.status === 'active' ? "rgba(92, 172, 125, 0.15)" : shop.status === 'pending' ? "rgba(236, 201, 75, 0.15)" : "rgba(229, 62, 62, 0.15)"} 
                                color={shop.status === 'active' ? brandColor : shop.status === 'pending' ? "yellow.400" : "red.400"} 
                                px={2.5} py={1} rounded="md"
                            >
                                {shop.status.toUpperCase()}
                            </Badge>
                        </Box>

                        {/*  SaaS Plan */}
                        <Text color="purple.400" fontWeight="bold" fontSize="sm" display={{ base: "none", xl: "block" }}>
                            {shop.plan}
                        </Text>
                        
                        {/*  Staff Count */}
                        <Flex align="center" gap={2} display={{ base: "none", xl: "flex" }}>
                            <Icon as={LuUsers} color="gray.500" />
                            <Text color="gray.400" fontSize="sm">{shop.users}</Text>
                        </Flex>

                        {/* GMV */}
                        <Text color="white" fontWeight="black" fontSize="sm" display={{ base: "none", xl: "block" }}>
                            {shop.gmv}
                        </Text>

                        {/* Action Menu */}
                        <Flex justify="flex-end" display={{ base: "none", xl: "flex" }}>
                            <Icon as={LuEllipsisVertical} color="gray.500" />
                        </Flex>
                    </Grid>
                ))}
            </VStack>
        </Box>
    );
}
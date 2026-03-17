"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid, Badge, VStack, Avatar 
} from "@chakra-ui/react";
import { 
    LuSearch, LuFilter, LuStore, LuPlus, LuEllipsisVertical, 
} from "react-icons/lu";

// --- MOCK DATA ---
const MOCK_SHOPS = [
    { id: "SHP-001", name: "Urban Kicks NG", owner: "Wada Gift", plan: "Pro", status: "active", gmv: "₦12,500,000", staffCount: 4 },
    { id: "SHP-002", name: "Lagos Streetwear", owner: "Tobi O.", plan: "Basic", status: "pending", gmv: "₦0", staffCount: 1 },
    { id: "SHP-003", name: "Tech Gadgets Pro", owner: "John Doe", plan: "Enterprise", status: "active", gmv: "₦5,100,000", staffCount: 12 },
    { id: "SHP-004", name: "Minimalist Hub", owner: "Sarah Connor", plan: "Pro", status: "suspended", gmv: "₦8,200,000", staffCount: 3 },
];

export default function AdminShopsPage() {
    const brandColor = "#5cac7d";
    const router = useRouter();
    
    const [searchQuery, setSearchQuery] = useState("");
    const [shops] = useState(MOCK_SHOPS);

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1200px" mx="auto" animation="fade-in 0.3s ease">
            
            {/* Header */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={8} gap={4}>
                <Box>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">Shops & Tenants</Text>
                    <Text color="gray.400" fontSize="sm">Manage businesses, verify KYC, and monitor tenant health.</Text>
                </Box>
                <Button bg={brandColor} color="white" rounded="lg" h="45px" px={6} _hover={{ filter: "brightness(1.1)" }} display="flex" gap={2}>
                    <Icon as={LuPlus} /> Invite New Seller
                </Button>
            </Flex>

            {/* Filters */}
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

            {/* Shops Grid */}
            <VStack align="stretch" gap={3}>
                <Grid templateColumns="2fr 1.5fr 1fr 1fr 1fr 50px" gap={4} px={6} py={2} display={{ base: "none", md: "grid" }}>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Shop / Tenant</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Owner</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Status</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Plan</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Staff Count</Text>
                </Grid>

                {shops.map((shop) => (
                    <Grid 
                        key={shop.id} 
                        templateColumns={{ base: "1fr", md: "2fr 1.5fr 1fr 1fr 1fr 50px" }} 
                        gap={4} p={4} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.50"
                        alignItems="center" cursor="pointer" transition="all 0.2s"
                        _hover={{ borderColor: brandColor, transform: "translateY(-2px)", shadow: "lg" }}
                        onClick={() => router.push(`/admin/shops/${shop.id}`)} //dynamic route
                    >
                        <Flex align="center" gap={3}>
                            <Avatar.Root size="md">
                                <Avatar.Fallback name={shop.name} bg="whiteAlpha.200" color="white" />
                            </Avatar.Root>
                            <Box overflow="hidden">
                                <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1}>{shop.name}</Text>
                                <Text color="gray.500" fontSize="xs" lineClamp={1}>ID: {shop.id}</Text>
                            </Box>
                        </Flex>

                        <Text color="gray.400" fontSize="sm" display={{ base: "none", md: "block" }}>{shop.owner}</Text>

                        <Box display={{ base: "none", md: "block" }}>
                            <Badge 
                                bg={shop.status === 'active' ? "rgba(92, 172, 125, 0.15)" : shop.status === 'pending' ? "rgba(236, 201, 75, 0.15)" : "rgba(229, 62, 62, 0.15)"} 
                                color={shop.status === 'active' ? brandColor : shop.status === 'pending' ? "yellow.400" : "red.400"} 
                                px={2.5} py={1} rounded="md"
                            >
                                {shop.status.toUpperCase()}
                            </Badge>
                        </Box>

                        <Text color="white" fontWeight="bold" fontSize="sm" display={{ base: "none", md: "block" }}>{shop.plan}</Text>
                        
                        <Flex align="center" gap={2} display={{ base: "none", md: "flex" }}>
                            <Icon as={LuStore} color="gray.500" />
                            <Text color="gray.400" fontSize="sm">{shop.staffCount} Users</Text>
                        </Flex>

                        <Flex justify="flex-end" display={{ base: "none", md: "flex" }}>
                            <Icon as={LuEllipsisVertical} color="gray.500" />
                        </Flex>
                    </Grid>
                ))}
            </VStack>
        </Box>
    );
}
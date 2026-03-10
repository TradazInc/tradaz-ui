"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Image, Button, Icon, Badge, VStack, HStack, IconButton, Input
} from "@chakra-ui/react";
import { 
    LuPackage, LuMessageSquare, LuChevronRight, LuSearch, 
    LuClock, LuTruck, LuCheck, LuCircle, LuFilter
} from "react-icons/lu";
import Link from "next/link";


// --- API-READY DUMMY DATA ---
const MOCK_ORDERS = [
    {
        id: "TRD-9823-XYZ",
        date: "March 8, 2026",
        status: "Delivered",
        total: 165000,
        itemCount: 2,
        images: [
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=200&auto=format&fit=crop"
        ]
    },
    {
        id: "TRD-4451-ABC",
        date: "March 1, 2026",
        status: "Shipped",
        total: 45000,
        itemCount: 1,
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop"
        ]
    },
    {
        id: "TRD-1092-LMN",
        date: "February 15, 2026",
        status: "Processing",
        total: 87000,
        itemCount: 3,
        images: [
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=200&auto=format&fit=crop",
            "https://via.placeholder.com/200/121212/FFFFFF?text=+1" // Represents additional items
        ]
    }
];

export default function MyOrdersPage() {
    const brandColor = "#5cac7d";
    // const router = useRouter(); // For navigating to chat
    
    const [orders] = useState(MOCK_ORDERS);
    const [searchQuery, setSearchQuery] = useState("");

    // --- LOGIC HANDLERS ---
    const handleChatSupport = (orderId: string) => {
        // API-READY ROUTING:
        // router.push(`/account/inbox?orderId=${orderId}`);
        alert(`Opening chat for Order: ${orderId}\n\nThis will redirect to the inbox with the order context pre-loaded!`);
    };

    // Semantic status styling
    const getStatusUI = (status: string) => {
        switch (status) {
            case "Delivered": return { bg: "rgba(92, 172, 125, 0.15)", color: brandColor, icon: LuCheck };
            case "Shipped": return { bg: "rgba(66, 153, 225, 0.15)", color: "blue.400", icon: LuTruck };
            case "Processing": return { bg: "rgba(237, 137, 54, 0.15)", color: "orange.400", icon: LuClock };
            case "Cancelled": return { bg: "rgba(245, 101, 101, 0.15)", color: "red.400", icon: LuCircle };
            default: return { bg: "whiteAlpha.100", color: "gray.400", icon: LuPackage };
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1000px" mx="auto" animation="fade-in 0.3s ease">
            
            {/* Header & Search */}
            <Flex direction={{ base: "column", md: "row" }} align={{ base: "stretch", md: "flex-end" }} justify="space-between" mb={8} gap={4}>
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight">
                        Order History
                    </Text>
                    <Text color="gray.400" fontSize="sm">Track, manage, and review your purchases.</Text>
                </Box>
                
                <Flex gap={3}>
                    <Flex align="center" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" px={3} _focusWithin={{ borderColor: brandColor }} transition="all 0.2s" flex={1}>
                        <Icon as={LuSearch} color="gray.500" />
                        <Input 
                            placeholder="Search Order ID..." border="none" color="white" h="45px" 
                            _focus={{ outline: "none", boxShadow: "none" }}
                            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Flex>
                    <IconButton aria-label="Filter orders" h="45px" w="45px" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.100" }}>
                        <Icon as={LuFilter} />
                    </IconButton>
                </Flex>
            </Flex>

            {/* Orders List */}
            {orders.length === 0 ? (
                // Empty State
                <Flex direction="column" align="center" justify="center" py={20} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Icon as={LuPackage} boxSize="60px" color="gray.600" mb={4} />
                    <Text color="white" fontSize="xl" fontWeight="bold">No orders found</Text>
                    <Text color="gray.500" fontSize="sm" mt={2}>You haven&apos;t placed any orders yet.</Text>
                    <Link href="/store" style={{ textDecoration: 'none' }}>
                        <Button mt={6} bg={brandColor} color="white" rounded="full" _hover={{ filter: "brightness(1.1)" }}>Start Shopping</Button>
                    </Link>
                </Flex>
            ) : (
                <VStack gap={6} align="stretch">
                    {orders.map((order) => {
                        const statusUI = getStatusUI(order.status);
                        
                        return (
                            <Box key={order.id} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden" transition="all 0.2s" _hover={{ borderColor: "whiteAlpha.300", shadow: "lg" }}>
                                
                                {/* Order Header */}
                                <Flex justify="space-between" align="center" p={5} borderBottom="1px solid" borderColor="whiteAlpha.50" bg="whiteAlpha.50">
                                    <Box>
                                        <Text color="white" fontWeight="bold" fontSize="md" fontFamily="monospace">{order.id}</Text>
                                        <Text color="gray.500" fontSize="xs">Placed on {order.date}</Text>
                                    </Box>
                                    <Badge bg={statusUI.bg} color={statusUI.color} px={3} py={1.5} rounded="full" display="flex" alignItems="center" gap={2} textTransform="none" fontSize="xs" fontWeight="bold">
                                        <Icon as={statusUI.icon} /> {order.status}
                                    </Badge>
                                </Flex>

                                {/* Order Body */}
                                <Flex direction={{ base: "column", md: "row" }} justify="space-between" p={5} gap={6}>
                                    
                                    {/* Image Thumbnails */}
                                    <HStack gap={3}>
                                        {order.images.map((img, idx) => (
                                            <Box key={idx} boxSize="70px" rounded="lg" overflow="hidden" bg="#121212" border="1px solid" borderColor="whiteAlpha.100">
                                                <Image src={img} alt="Product thumbnail" w="full" h="full" objectFit="cover" />
                                            </Box>
                                        ))}
                                    </HStack>

                                    {/* Order Financials & Actions */}
                                    <Flex direction="column" justify="space-between" align={{ base: "flex-start", md: "flex-end" }} w={{ base: "full", md: "auto" }}>
                                        <Box textAlign={{ base: "left", md: "right" }} mb={{ base: 4, md: 0 }}>
                                            <Text color="gray.400" fontSize="sm">Total Amount</Text>
                                            <Text color="white" fontSize="2xl" fontWeight="black">₦{order.total.toLocaleString()}</Text>
                                        </Box>

                                        <Flex gap={3} w={{ base: "full", md: "auto" }}>
                                            {/* ✅ THE CHAT BUTTON */}
                                            <Button 
                                                flex={1} size="sm" variant="outline" borderColor="whiteAlpha.200" color="white" 
                                                _hover={{ bg: "whiteAlpha.100", borderColor: "whiteAlpha.300" }}
                                                onClick={() => handleChatSupport(order.id)}
                                                display="flex" gap={2}
                                            >
                                                <Icon as={LuMessageSquare} color={brandColor} /> Chat Support
                                            </Button>
                                            
                                            <Button 
                                                flex={1} size="sm" bg="rgba(92, 172, 125, 0.15)" color={brandColor} 
                                                _hover={{ bg: brandColor, color: "white" }} border="none"
                                                display="flex" gap={1}
                                            >
                                                Details <Icon as={LuChevronRight} />
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Box>
                        );
                    })}
                </VStack>
            )}
        </Box>
    );
}
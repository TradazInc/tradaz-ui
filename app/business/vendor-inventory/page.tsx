"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, VStack, IconButton } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LuSearch, LuRefreshCw, LuBox, LuCheck, 
    LuX, LuClock, LuUser, LuEye, LuImage
} from "react-icons/lu";

const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };

export interface VendorProduct {
    id: string;
    name: string;
    brand: string;
    vendorName: string;
    price: number;
    stock: number;
    status: "Pending" | "Approved" | "Rejected" | "Edited" | "Deleted";
    created: string;
    updated: string;
}

// Initial Database
const INITIAL_PRODUCTS: VendorProduct[] = [
    { id: "VPRD-801", name: "NY Suede Loafers", brand: "nyashii leather", vendorName: "Og Leather", price: 45000, stock: 1, status: "Pending", created: "12/13/2025", updated: "12/13/2025" },
    { id: "VPRD-802", name: "NY DiagCross", brand: "nyashii leather", vendorName: "og Leather", price: 32000, stock: 1, status: "Pending", created: "12/13/2025", updated: "12/13/2025" },
    { id: "VPRD-803", name: "Commando", brand: "nyashii leather", vendorName: "Ny Leather", price: 55000, stock: 1, status: "Pending", created: "12/13/2025", updated: "12/13/2025" },
    { id: "VPRD-804", name: "Classic Oxfords", brand: "luxe shoes", vendorName: "chrida Shoes", price: 60000, stock: 5, status: "Approved", created: "11/10/2025", updated: "11/15/2025" },
    { id: "VPRD-805", name: "Faux Leather Boots", brand: "shady kicks", vendorName: "OG dior", price: 15000, stock: 0, status: "Rejected", created: "10/05/2025", updated: "10/06/2025" },
];

const TABS_CONFIG = [
    { id: "Pending", label: "New" },
    { id: "Approved", label: "Approved" },
    { id: "Rejected", label: "Rejected" },
    { id: "Edited", label: "Edit" },
    { id: "Deleted", label: "Delete" },
];

// --- PRODUCT DETAILS MODAL ---
const ProductDetailsModal = ({ product, onClose, onStatusChange }: { product: VendorProduct | null, onClose: () => void, onStatusChange: (id: string, status: VendorProduct["status"]) => void }) => {
    return (
        <AnimatePresence>
            {product && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
                        onClick={onClose}
                    />
                    <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "400px", md: "450px" }} pointerEvents="none">
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
                        >
                            <Box w="100%" h="100%" bg="#0A0A0A" borderLeft="1px solid" borderColor="#1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                                <Flex justify="space-between" align="center" px={6} pt={8} pb={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#111111">
                                    <Box>
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Product Information</Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">{product.name}</Text>
                                    </Box>
                                    <IconButton aria-label="Close modal" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <VStack w="full" gap={6} align="stretch">
                                        <Flex h="200px" bg="#111111" border="1px solid #1A1A1A" align="center" justify="center">
                                            <Icon as={LuImage} boxSize="40px" color="#333333" />
                                        </Flex>
                                        <SimpleGrid columns={2} gap={4}>
                                            <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Price</Text>
                                                <Text color="white" fontSize="lg" fontWeight="black" fontFamily="monospace">₦{product.price.toLocaleString()}</Text>
                                            </Box>
                                            <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Stock Level</Text>
                                                <Text color="white" fontSize="lg" fontWeight="black">{product.stock} units</Text>
                                            </Box>
                                        </SimpleGrid>
                                        <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Vendor Details</Text>
                                            <Text color="white" fontWeight="bold">{product.vendorName}</Text>
                                            <Text color="#888888" fontSize="sm" mt={1}>Brand: {product.brand}</Text>
                                        </Box>
                                        <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Timestamps</Text>
                                            <Text color="white" fontSize="sm">Submitted: {product.created}</Text>
                                            <Text color="white" fontSize="sm" mt={1}>Last Updated: {product.updated}</Text>
                                        </Box>
                                    </VStack>
                                </Box>

                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                                    {product.status !== "Approved" && (
                                        <Button flex={1} bg="#5cac7d" color="white" rounded="none" fontWeight="bold" onClick={() => { onStatusChange(product.id, "Approved"); onClose(); }} _hover={{ bg: "#4a9c6d" }}>
                                            <Icon as={LuCheck} mr={2} strokeWidth="3" /> Approve
                                        </Button>
                                    )}
                                    {product.status !== "Rejected" && (
                                        <Button flex={1} bg="red.500" color="white" rounded="none" fontWeight="bold" onClick={() => { onStatusChange(product.id, "Rejected"); onClose(); }} _hover={{ bg: "red.600" }}>
                                            <Icon as={LuX} mr={2} strokeWidth="3" /> Reject
                                        </Button>
                                    )}
                                </Flex>
                            </Box>
                        </motion.div>
                    </Box>
                </>
            )}
        </AnimatePresence>
    );
};

export default function Page() {
    // STATE
    const [products, setProducts] = useState<VendorProduct[]>(INITIAL_PRODUCTS);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("Pending");
    const [viewingProduct, setViewingProduct] = useState<VendorProduct | null>(null);

    // ACTIONS
    const handleStatusChange = (id: string, newStatus: VendorProduct["status"]) => {
        setProducts(prev => prev.map(prod => 
            prod.id === id ? { ...prod, status: newStatus, updated: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) } : prod
        ));
    };

    // FILTER LOGIC
    const visibleItems = products.filter(prod => {
        const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || prod.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = prod.status === activeTab;
        return matchesSearch && matchesStatus;
    });

    // DYNAMIC TAB COUNTS
    const dynamicTabs = TABS_CONFIG.map(tab => ({
        ...tab,
        count: products.filter(p => p.status === tab.id).length
    }));

    // KPI COUNTS
    const totalProducts = products.length;
    const pendingCount = products.filter(p => p.status === "Pending").length;
    const approvedCount = products.filter(p => p.status === "Approved").length;
    const rejectedCount = products.filter(p => p.status === "Rejected").length;

    // HELPER
    const getStatusIconProps = (status: string) => {
        switch(status) {
            case "Approved": return { icon: LuCheck, color: "#5cac7d" };
            case "Pending": return { icon: LuClock, color: "orange.400" };
            case "Rejected": return { icon: LuX, color: "red.400" };
            case "Edited": return { icon: LuRefreshCw, color: "blue.400" };
            default: return { icon: LuBox, color: "#888888" };
        }
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000" minH="100vh">
            
            {/* STICKY FILTER & SEARCH BAR */}
            <Box
                position="sticky"
                top={{ base: "-20px", md: "-32px" }}
                mx={{ base: "-16px", md: "-32px" }}
                px={{ base: "16px", md: "32px" }}
                zIndex={30}
                bg="rgba(0, 0, 0, 0.85)"
                backdropFilter="blur(12px)"
                py={{ base: 3, md: 4 }}
                mb={6}
                borderBottom="1px solid #1A1A1A"
            >
                {/* Navigation Tabs */}
                <Flex borderBottom="1px solid #1A1A1A" mb={3} overflowX="auto" css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                    {dynamicTabs.map((tab) => (
                        <Box 
                            key={tab.id}
                            px={4} py={2} cursor="pointer"
                            borderBottom="2px solid"
                            borderColor={activeTab === tab.id ? "white" : "transparent"}
                            onClick={() => setActiveTab(tab.id)}
                            _hover={{ color: "white" }}
                            transition="all 0.2s"
                        >
                            <Text fontSize="sm" fontWeight={activeTab === tab.id ? "bold" : "500"} color={activeTab === tab.id ? "white" : "#888888"} whiteSpace="nowrap">
                                {tab.label} ({tab.count})
                            </Text>
                        </Box>
                    ))}
                </Flex>

                {/* Search Bar */}
                <Flex align="center" {...controlStyles} h="40px" bg="#0A0A0A" w="full" _focusWithin={{ borderColor: "white" }}>
                    <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                    <Input 
                        placeholder="Search products, brands, or vendors..." 
                        border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" 
                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} px={0} w="full" h="full"
                    />
                </Flex>
            </Box>

            {/* Inventory Summary  */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4} mb={8} px={{ base: 4, md: 8 }}>
                <Box bg="#0A0A0A" border="1px solid #1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Total Products</Text>
                        <Icon as={LuBox} color="blue.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">{totalProducts}</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid #1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Pending Review</Text>
                        <Icon as={LuClock} color="orange.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">{pendingCount}</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid #1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Approved</Text>
                        <Icon as={LuCheck} color="#5cac7d" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">{approvedCount}</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid #1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Rejected</Text>
                        <Icon as={LuX} color="red.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">{rejectedCount}</Text>
                </Box>
            </SimpleGrid>

            {/* Product Grid */}
            <Box px={{ base: 4, md: 8 }}>
                {visibleItems.length === 0 ? (
                    <Flex justify="center" align="center" py={20} direction="column" border="1px dashed #1A1A1A" bg="#0A0A0A">
                        <Text color="#888888" fontSize="lg" fontWeight="bold">No products found in {activeTab}.</Text>
                    </Flex>
                ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6} mb={8}>
                        {visibleItems.map((prod) => {
                            const statusProps = getStatusIconProps(prod.status);
                            
                            return (
                                <Box key={prod.id} bg="#0A0A0A" border="1px solid #1A1A1A" rounded="none" overflow="hidden" display="flex" flexDirection="column">
                                    
                                    {/* Image Placeholder */}
                                    <Flex h="220px" bg="#111111" borderBottom="1px solid #1A1A1A" align="center" justify="center">
                                        <Icon as={LuImage} boxSize="40px" color="#333333" />
                                    </Flex>

                                    {/* Card Body */}
                                    <Box p={5} flex={1} display="flex" flexDirection="column">
                                        
                                        <Flex justify="space-between" align="flex-start" mb={2} gap={2}>
                                            <Text color="white" fontWeight="bold" fontSize="md" lineClamp={1}>{prod.name}</Text>
                                            <Flex align="center" gap={1.5} bg="#111111" color="white" px={2} py={0.5} border="1px solid #333333" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" flexShrink={0}>
                                                <Icon as={statusProps.icon} color={statusProps.color} boxSize="12px" strokeWidth="3" />
                                                {prod.status}
                                            </Flex>
                                        </Flex>

                                        {/* Brand Row */}
                                        <Text color="#888888" fontSize="xs" mb={4}>{prod.brand}</Text>

                                        {/* Price / Stock Row */}
                                        <Flex justify="space-between" align="center" mb={4}>
                                            <Text color="white" fontSize="sm" fontWeight="bold" fontFamily="monospace">₦{prod.price.toLocaleString()}</Text>
                                            <Text color="#888888" fontSize="xs">{prod.stock} in stock</Text>
                                        </Flex>

                                        {/* Vendor Name Row */}
                                        <Flex align="center" gap={2} mb={3}>
                                            <Icon as={LuUser} color="#888888" boxSize="14px" />
                                            <Text color="#888888" fontSize="xs">{prod.vendorName}</Text>
                                        </Flex>

                                        {/* Dates Row */}
                                        <Flex wrap="wrap" gap={1} fontSize="10px" color="#555555" mb={6} mt="auto">
                                            <Text>Created: {prod.created}</Text>
                                            <Text>•</Text>
                                            <Text>Updated: {prod.updated}</Text>
                                        </Flex>

                                        {/* Action Buttons Row */}
                                        <SimpleGrid columns={prod.status === "Approved" ? 1 : 3} gap={2} mt="auto">
                                            <Button onClick={() => setViewingProduct(prod)} size="sm" h="36px" bg="#111111" border="1px solid #333333" color="white" rounded="none" fontSize="12px" _hover={{ bg: "#1A1A1A" }}>
                                                <Icon as={LuEye} mr={1.5} /> Details
                                            </Button>
                                            
                                            {prod.status !== "Approved" && (
                                                <>
                                                    <Button onClick={() => handleStatusChange(prod.id, "Approved")} size="sm" h="36px" bg="#111111" color="white" border="1px solid #333333" rounded="none" fontSize="12px" _hover={{ bg: "#1A1A1A" }}>
                                                        <Icon as={LuCheck} color="#5cac7d" mr={1.5} strokeWidth="3" /> Approve
                                                    </Button>
                                                    
                                                    <Button onClick={() => handleStatusChange(prod.id, "Rejected")} size="sm" h="36px" bg="#111111" color="white" border="1px solid #333333" rounded="none" fontSize="12px" _hover={{ bg: "#1A1A1A" }}>
                                                        <Icon as={LuX} color="red.400" mr={1.5} strokeWidth="3" /> Reject
                                                    </Button>
                                                </>
                                            )}
                                        </SimpleGrid>
                                    </Box>
                                </Box>
                            );
                        })}
                    </SimpleGrid>
                )}
            </Box>
            
            {/* View Product Modal */}
            <ProductDetailsModal 
                product={viewingProduct} 
                onClose={() => setViewingProduct(null)} 
                onStatusChange={handleStatusChange} 
            />
        </Box>
    );
}
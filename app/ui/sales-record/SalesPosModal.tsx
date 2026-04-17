"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, IconButton } from "@chakra-ui/react";
import { LuX, LuShoppingCart } from "react-icons/lu";

const controlStyles = { bg: "whiteAlpha.50", border: "1px solid", borderColor: "whiteAlpha.100", color: "white", h: "40px", rounded: "lg", px: 3, _focus: { outline: "none", borderColor: "#5cac7d" }, _hover: { bg: "whiteAlpha.100" } };
const nativeSelectStyle: React.CSSProperties = { backgroundColor: "rgba(255, 255, 255, 0.05)", color: "white", height: "40px", borderRadius: "8px", padding: "0 12px", border: "1px solid rgba(255, 255, 255, 0.1)", outline: "none", cursor: "pointer", fontSize: "14px" };

export interface PosProduct {
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
}

export interface NewSalePayload {
    total: number;
    discount: number;
    paymentMethod: string;
    customerName: string;
}

// Simulated Database for the Search Bar
const MOCK_INVENTORY_DB: PosProduct[] = [
    { id: "PROD-001", name: "Premium Cotton T-Shirt", sku: "TSH-BLK-M", price: 15000, stock: 120 },
    { id: "PROD-002", name: "Urban Street Sneakers", sku: "SNK-WHT-42", price: 45000, stock: 15 },
    { id: "PROD-003", name: "Classic Denim Jacket", sku: "JKT-BLU-L", price: 35000, stock: 4 },
    { id: "PROD-004", name: "Vintage Face Cap", sku: "CAP-VNT", price: 5000, stock: 50 },
];

interface SalesPosModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddSale: (saleData: NewSalePayload) => void;
}

export const SalesPosModal = ({ isOpen, onClose, onAddSale }: SalesPosModalProps) => {
    const [posSearchTerm, setPosSearchTerm] = useState("");
    const [selectedPosProduct, setSelectedPosProduct] = useState<PosProduct | null>(null);
    const [posQty, setPosQty] = useState(1);
    const [posDiscount, setPosDiscount] = useState(0);
    const [posPaymentMethod, setPosPaymentMethod] = useState("Cash");

    if (!isOpen) return null;

    const searchResults = posSearchTerm.length > 1 
        ? MOCK_INVENTORY_DB.filter(p => p.name.toLowerCase().includes(posSearchTerm.toLowerCase()) || p.sku.toLowerCase().includes(posSearchTerm.toLowerCase()))
        : [];

    const handlePosSubmit = () => {
        if (!selectedPosProduct) return;
        
        const subtotal = selectedPosProduct.price * posQty;
        const finalTotal = subtotal - posDiscount;

        onAddSale({
            total: finalTotal,
            discount: posDiscount,
            paymentMethod: posPaymentMethod,
            customerName: "Walk-in Customer"
        });

        // Reset and close
        setPosSearchTerm("");
        setSelectedPosProduct(null);
        setPosQty(1);
        setPosDiscount(0);
        onClose();
    };

    return (
        <Box position="fixed" inset={0} zIndex={9999} display="flex" alignItems="center" justifyContent="center">
            <Box position="absolute" inset={0} bg="blackAlpha.800" backdropFilter="blur(6px)" onClick={onClose} />
            <Box position="relative" bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" w="90%" maxW="500px" shadow="2xl">
                
                <Flex justify="space-between" align="center" mb={6}>
                    <Flex align="center" gap={3}>
                        <Flex bg="rgba(92, 172, 125, 0.15)" p={2} rounded="lg"><Icon as={LuShoppingCart} color="#5cac7d" boxSize="20px" /></Flex>
                        <Text color="white" fontWeight="bold" fontSize="lg">New POS Sale</Text>
                    </Flex>
                    <IconButton aria-label="Close" size="sm" variant="ghost" color="gray.400" onClick={onClose}><LuX /></IconButton>
                </Flex>

                {!selectedPosProduct ? (
                    <Box mb={4}>
                        <Text color="gray.400" fontSize="sm" mb={2} fontWeight="bold">Search Inventory</Text>
                        <Input placeholder="Type product name or SKU..." {...controlStyles} mb={2} value={posSearchTerm} onChange={(e) => setPosSearchTerm(e.target.value)} autoFocus />
                        
                        {posSearchTerm.length > 1 && (
                            <Box bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" maxH="150px" overflowY="auto">
                                {searchResults.length > 0 ? searchResults.map(prod => (
                                    <Flex key={prod.id} p={3} borderBottom="1px solid" borderColor="whiteAlpha.50" _hover={{ bg: "whiteAlpha.50" }} cursor="pointer" justify="space-between" align="center" onClick={() => setSelectedPosProduct(prod)}>
                                        <Box>
                                            <Text color="white" fontSize="sm" fontWeight="bold">{prod.name}</Text>
                                            <Text color="gray.500" fontSize="xs">{prod.sku}</Text>
                                        </Box>
                                        <Text color="#5cac7d" fontSize="sm" fontWeight="bold">₦{prod.price.toLocaleString()}</Text>
                                    </Flex>
                                )) : (
                                    <Box p={3}><Text color="gray.500" fontSize="sm">No products found matching &quot;{posSearchTerm}&quot;</Text></Box>
                                )}
                            </Box>
                        )}
                    </Box>
                ) : (
                    <Box animation="fade-in 0.3s ease">
                        <Flex justify="space-between" align="center" bg="whiteAlpha.50" p={3} rounded="lg" mb={6} border="1px solid" borderColor="whiteAlpha.100">
                            <Box>
                                <Text color="white" fontSize="md" fontWeight="bold">{selectedPosProduct.name}</Text>
                                <Text color="gray.400" fontSize="xs">₦{selectedPosProduct.price.toLocaleString()} each • {selectedPosProduct.stock} in stock</Text>
                            </Box>
                            <IconButton aria-label="Change" size="xs" variant="ghost" color="gray.400" onClick={() => setSelectedPosProduct(null)}><LuX /></IconButton>
                        </Flex>

                        <SimpleGrid columns={2} gap={4} mb={6}>
                            <Box>
                                <Text color="gray.400" fontSize="sm" mb={2}>Quantity</Text>
                                <Input type="number" min={1} max={selectedPosProduct.stock} {...controlStyles} value={posQty} onChange={(e) => setPosQty(Number(e.target.value))} />
                            </Box>
                            <Box>
                                <Text color="gray.400" fontSize="sm" mb={2}>Discount (₦)</Text>
                                <Input type="number" min={0} {...controlStyles} value={posDiscount} onChange={(e) => setPosDiscount(Number(e.target.value))} />
                            </Box>
                        </SimpleGrid>

                        <Box mb={6}>
                            <Text color="gray.400" fontSize="sm" mb={2}>Payment Method</Text>
                            <select value={posPaymentMethod} onChange={(e) => setPosPaymentMethod(e.target.value)} style={nativeSelectStyle}>
                                <option value="Cash" style={{ background: "#1A1C23" }}>Cash</option>
                                <option value="Transfer" style={{ background: "#1A1C23" }}>Bank Transfer</option>
                                <option value="POS" style={{ background: "#1A1C23" }}>Card (POS Terminal)</option>
                            </select>
                        </Box>

                        <Flex justify="space-between" align="center" pt={4} borderTop="1px dashed" borderColor="whiteAlpha.200" mb={6}>
                            <Text color="white" fontSize="lg" fontWeight="bold">Total Due</Text>
                            <Text color="#5cac7d" fontSize="2xl" fontWeight="black">
                                ₦{((selectedPosProduct.price * posQty) - posDiscount).toLocaleString()}
                            </Text>
                        </Flex>

                        <Button w="full" bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} h="48px" onClick={handlePosSubmit}>
                            Complete Sale
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
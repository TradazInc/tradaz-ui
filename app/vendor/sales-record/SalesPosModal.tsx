"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, IconButton } from "@chakra-ui/react";
import { LuX, LuShoppingCart } from "react-icons/lu";

const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "40px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { backgroundColor: "#0A0A0A", color: "white", height: "40px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px" };

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
           
            <Box position="absolute" inset={0} bg="rgba(0,0,0,0.85)" backdropFilter="blur(4px)" onClick={onClose} />
            
           
            <Box position="relative" bg="#000000" p={6} rounded="none" border="1px solid" borderColor="#333333" w="90%" maxW="500px" shadow="2xl">
                
                <Flex justify="space-between" align="center" mb={6}>
                    <Flex align="center" gap={3}>
                        <Flex bg="#111111" p={2} rounded="none" border="1px solid #333333"><Icon as={LuShoppingCart} color="white" boxSize="20px" strokeWidth="2.5" /></Flex>
                        <Text color="white" fontWeight="bold" fontSize="lg" letterSpacing="tight">New POS Sale</Text>
                    </Flex>
                    <IconButton aria-label="Close" size="sm" rounded="none" variant="ghost" color="#888888" _hover={{ color: "white", bg: "#111111" }} onClick={onClose}>
                        <LuX strokeWidth="2.5" />
                    </IconButton>
                </Flex>

                {!selectedPosProduct ? (
                    <Box mb={4}>
                        <Text color="#888888" fontSize="11px" mb={2} fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Search Inventory</Text>
                        <Input placeholder="Type product name or SKU..." {...controlStyles} mb={2} value={posSearchTerm} onChange={(e) => setPosSearchTerm(e.target.value)} autoFocus />
                        
                        {posSearchTerm.length > 1 && (
                            <Box bg="#0A0A0A" border="1px solid" borderColor="#333333" rounded="none" maxH="150px" overflowY="auto" css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: '#27272A' } }}>
                                {searchResults.length > 0 ? searchResults.map(prod => (
                                    <Flex key={prod.id} p={3} borderBottom="1px solid" borderColor="#1A1A1A" _hover={{ bg: "#111111" }} cursor="pointer" justify="space-between" align="center" onClick={() => setSelectedPosProduct(prod)}>
                                        <Box>
                                            <Text color="white" fontSize="sm" fontWeight="bold">{prod.name}</Text>
                                            <Text color="#888888" fontSize="xs">{prod.sku}</Text>
                                        </Box>
                                        <Text color="white" fontSize="sm" fontWeight="bold">₦{prod.price.toLocaleString()}</Text>
                                    </Flex>
                                )) : (
                                    <Box p={3}><Text color="#888888" fontSize="sm">No products found matching &quot;{posSearchTerm}&quot;</Text></Box>
                                )}
                            </Box>
                        )}
                    </Box>
                ) : (
                    <Box animation="fade-in 0.3s ease">
                        <Flex justify="space-between" align="center" bg="#0A0A0A" p={3} rounded="none" mb={6} border="1px solid" borderColor="#333333">
                            <Box>
                                <Text color="white" fontSize="md" fontWeight="bold">{selectedPosProduct.name}</Text>
                                <Text color="#888888" fontSize="xs">₦{selectedPosProduct.price.toLocaleString()} each • {selectedPosProduct.stock} in stock</Text>
                            </Box>
                            <IconButton aria-label="Change" size="xs" rounded="none" variant="ghost" color="#888888" _hover={{ color: "white", bg: "#111111" }} onClick={() => setSelectedPosProduct(null)}>
                                <LuX strokeWidth="2.5" />
                            </IconButton>
                        </Flex>

                        <SimpleGrid columns={2} gap={4} mb={6}>
                            <Box>
                                <Text color="#888888" fontSize="11px" mb={2} fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Quantity</Text>
                                <Input type="number" min={1} max={selectedPosProduct.stock} {...controlStyles} value={posQty} onChange={(e) => setPosQty(Number(e.target.value))} />
                            </Box>
                            <Box>
                                <Text color="#888888" fontSize="11px" mb={2} fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Discount (₦)</Text>
                                <Input type="number" min={0} {...controlStyles} value={posDiscount} onChange={(e) => setPosDiscount(Number(e.target.value))} />
                            </Box>
                        </SimpleGrid>

                        <Box mb={6}>
                            <Text color="#888888" fontSize="11px" mb={2} fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Payment Method</Text>
                            <select value={posPaymentMethod} onChange={(e) => setPosPaymentMethod(e.target.value)} style={nativeSelectStyle}>
                                <option value="Cash" style={{ background: "#0A0A0A" }}>Cash</option>
                                <option value="Transfer" style={{ background: "#0A0A0A" }}>Bank Transfer</option>
                                <option value="POS" style={{ background: "#0A0A0A" }}>Card (POS Terminal)</option>
                            </select>
                        </Box>

                        <Flex justify="space-between" align="center" pt={4} borderTop="1px solid" borderColor="#333333" mb={6}>
                            <Text color="white" fontSize="lg" fontWeight="bold" letterSpacing="tight">Total Due</Text>
                            <Text color="white" fontSize="2xl" fontWeight="black" letterSpacing="tight">
                                ₦{((selectedPosProduct.price * posQty) - posDiscount).toLocaleString()}
                            </Text>
                        </Flex>

                        <Button w="full" bg="white" color="black" rounded="none" fontWeight="bold" _hover={{ bg: "#E5E5E5" }} h="48px" onClick={handlePosSubmit}>
                            Complete Sale
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
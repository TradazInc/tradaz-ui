"use client";
import React, { useState } from 'react';
import { Box, VStack, Text, IconButton, Icon, Flex, Input, Button } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuX } from 'react-icons/lu';

interface AddStoreModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// --- REUSABLE BRUTALIST STYLES ---
const inputStyles = { bg: "#000000", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 4, _focus: { outline: "none", borderColor: "white", boxShadow: "none" }, _hover: { borderColor: "#555555" } };
const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };

export const AddStoreModal = ({ isOpen, onClose }: AddStoreModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        storeName: '',
        storeType: '',
        storeCategory: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsLoading(true);
        // Simulate API save delay
        setTimeout(() => {
            setIsLoading(false);
            alert(`Store ${formData.storeName} created successfully!`);
            setFormData({ storeName: '', storeType: '', storeCategory: '' }); // Reset
            onClose();
        }, 800);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Dark overlay backdrop - Z-INDEX INCREASED */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
                        onClick={onClose}
                    />

                    {/* The Slide-over Panel - RESPONSIVE WIDTH & Z-INDEX INCREASED */}
                    <Box 
                        position="fixed" top={0} right={0} bottom={0} zIndex={10001}
                        w={{ base: "100%", sm: "400px", md: "450px" }} 
                        pointerEvents="none" 
                    >
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
                        >
                            <Box w="100%" h="100%" bg="#0A0A0A" borderLeft="1px solid" borderColor="#1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                                
                                {/* Header */}
                                <Flex justify="space-between" align="center" px={6} pt={8} pb={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#111111">
                                    <Box>
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>
                                            New Location
                                        </Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">
                                            Add a New Store
                                        </Text>
                                    </Box>
                                    <IconButton aria-label="Close modal" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                {/* Form Content */}
                                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <VStack w="full" gap={6} align="stretch">
                                        
                                        <Box>
                                            <Text as="label" {...labelStyles}>Store Name <Text as="span" color="red.400">*</Text></Text>
                                            <Input name="storeName" value={formData.storeName} onChange={handleChange} placeholder="e.g. Downtown Outlet" {...inputStyles} />
                                            <Text color="#555555" fontSize="10px" mt={1.5} fontFamily="monospace">What do customers call this location?</Text>
                                        </Box>

                                        <Box>
                                            <Text as="label" {...labelStyles}>Store Type <Text as="span" color="red.400">*</Text></Text>
                                            <Input name="storeType" value={formData.storeType} onChange={handleChange} placeholder="e.g. Physical Retail, Warehouse, Pop-up" {...inputStyles} />
                                        </Box>

                                        <Box>
                                            <Text as="label" {...labelStyles}>Store Category <Text as="span" color="red.400">*</Text></Text>
                                            <Input name="storeCategory" value={formData.storeCategory} onChange={handleChange} placeholder="e.g. Apparel, Electronics, Groceries" {...inputStyles} />
                                        </Box>

                                    </VStack>
                                </Box>

                                {/* Footer Sticky Buttons */}
                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                                    <Button variant="outline" borderColor="#333333" onClick={onClose} h="44px" rounded="none" color="#888888" bg="#0A0A0A" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        flex="1" h="44px" bg="white" color="black" rounded="none" fontWeight="bold" onClick={handleSave} 
                                        disabled={!formData.storeName || !formData.storeType || !formData.storeCategory}
                                        _hover={{ bg: "#E5E5E5" }} 
                                        _disabled={{ opacity: 0.5, cursor: "not-allowed", bg: "#333333", color: "#888888" }} 
                                        transition="all 0.2s ease"
                                    >
                                        {isLoading ? "Saving..." : "Create Store"}
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
'use client';
import React, { useState } from 'react';
import { Box, VStack, Text, IconButton, Icon, Flex, Input, Button } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuX } from 'react-icons/lu';
import { Field } from '../field'; 

interface AddStoreModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddStoreModal = ({ isOpen, onClose }: AddStoreModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        storeName: '',
        storeType: '',
        storeCategory: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    const inputStyles = { bg: "whiteAlpha.50", border: "1px solid", borderColor: "whiteAlpha.100", color: "white", _hover: { borderColor: "whiteAlpha.300" }, _focusWithin: { borderColor: "#5cac7d" } };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Dark overlay backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9998, backgroundColor: "rgba(0,0,0,0.5)" }}
                        onClick={onClose}
                    />

                    {/* The Slide-over Panel */}
                    <Box 
                        position="fixed" top={0} right={0} bottom={0} zIndex={9999}
                        w={{ base: "100%", md: "65%", lg: "50%" }} 
                        pointerEvents="none" 
                    >
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
                        >
                            <Box w="100%" h="100%" bg="#11131A" borderLeft="1px solid" borderColor="whiteAlpha.100" shadow="-20px 0 50px rgba(0,0,0,0.5)" display="flex" flexDirection="column">
                                
                                {/* Header */}
                                <Flex justify="space-between" align="center" px={8} pt={8} pb={6} borderBottom="1px solid" borderColor="whiteAlpha.100">
                                    <Box>
                                        <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="gray.500" textTransform="uppercase">
                                            New Location
                                        </Text>
                                        <Text fontSize="xl" fontWeight="bold" color="#5cac7d">
                                            Add a New Store
                                        </Text>
                                    </Box>
                                    <IconButton aria-label="Close modal" variant="ghost" size="sm" rounded="full" onClick={onClose} color="gray.400" _hover={{ bg: "whiteAlpha.100", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" />
                                    </IconButton>
                                </Flex>

                                {/* Form Content */}
                                <Box flex={1} overflowY="auto" px={{ base: 6, md: 10 }} py={8}>
                                    <VStack maxW="500px" mx="auto" w="full" gap={5} align="stretch">
                                        <Field label="Store Name" required helperText="What do customers call this location?">
                                            <Input name="storeName" value={formData.storeName} onChange={handleChange} placeholder="e.g. Downtown Outlet" size="lg" {...inputStyles} />
                                        </Field>

                                        <Field label="Store Type" required>
                                            <Input name="storeType" value={formData.storeType} onChange={handleChange} placeholder="e.g. Physical Retail, Warehouse, Pop-up" size="lg" {...inputStyles} />
                                        </Field>

                                        <Field label="Store Category" required>
                                            <Input name="storeCategory" value={formData.storeCategory} onChange={handleChange} placeholder="e.g. Apparel, Electronics, Groceries" size="lg" {...inputStyles} />
                                        </Field>
                                    </VStack>
                                </Box>

                                {/* Footer Sticky Buttons */}
                                <Flex p={6} borderTop="1px solid" borderColor="whiteAlpha.100" gap={3} bg="blackAlpha.300">
                                    <Button variant="ghost" onClick={onClose} size="lg" color="gray.400" _hover={{ bg: "whiteAlpha.50", color: "white" }}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        flex="1" size="lg" bg="#5cac7d" color="white" onClick={handleSave} 
                                        disabled={!formData.storeName || !formData.storeType || !formData.storeCategory}
                                        _hover={{ bg: "#4a9c6d" }} _disabled={{ opacity: 0.5, cursor: "not-allowed", bg: "whiteAlpha.200", color: "gray.400" }} transition="all 0.2s ease"
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
'use client';

import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, IconButton, Icon } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuX } from 'react-icons/lu';
import { CreateBusinessForm } from './CreateBusinessForm'; 

interface OnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
    const [isMounted, setIsMounted] = useState(false);

    
    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9998, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)' }}
                        onClick={onClose}
                    />

                    {/* Sidebar Drawer */}
                    <Box position="fixed" top={0} right={0} bottom={0} zIndex={9999} w={{ base: "100%", md: "65%", lg: "50%" }} pointerEvents="none">
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
                        >
                            <Box w="100%" h="100%" bg="#000000" borderLeft="1px solid #1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                                
                                {/* Header */}
                                <Flex justify="space-between" align="center" px={8} pt={8} pb={6} borderBottom="1px solid #1A1A1A">
                                    <Box>
                                        <Text fontSize="11px" fontWeight="700" letterSpacing="widest" color="#888888" textTransform="uppercase">Account Setup</Text>
                                        <Text fontSize="xl" fontWeight="bold" color="white" letterSpacing="tight" mt={1}>
                                            Create Business Entity
                                        </Text>
                                    </Box>
                                    <IconButton aria-label="Close modal" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                {/* Form Component Mounted  */}
                                <Box flex={1} w="full" h="full" overflow="hidden">
                                    <CreateBusinessForm onSuccess={onClose} onCancel={onClose} />
                                </Box>

                            </Box>
                        </motion.div>
                    </Box>
                </>
            )}
        </AnimatePresence>
    );
};
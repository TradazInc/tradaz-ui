'use client';
import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, IconButton, Icon, Flex } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuX } from 'react-icons/lu';

import { BusinessInfoForm } from './BusinessInfoForm';

import { CategorySelection } from './CategorySelction';
import { BrandingForm } from './BrandingForm';
import { OnboardingData } from '@/app/lib/definitions'; 

const STORAGE_KEY = 'tradaz_onboarding_data';

const DEFAULT_DATA: OnboardingData = {
    businessName: '', subDomain: '', about: '', address: '', phone: '',
    category: '',
    primaryColor: '#5cac7d', secondaryColor: '#2d3748', tertiaryColor: '#e2e8f0',
    logo: null
};

interface OnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
    const [step, setStep] = useState(1);
    const [isMounted, setIsMounted] = useState(false);

    const [formData, setFormData] = useState<OnboardingData>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
               
                try {
                    return JSON.parse(saved);
                } catch { 
                    return DEFAULT_DATA;
                }
            }
        }
        return DEFAULT_DATA;
    });

    
    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        }
    }, [formData, isMounted]);

    const updateData = (newData: Partial<OnboardingData>) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    useEffect(() => {
        if (!isOpen) setTimeout(() => setStep(1), 300);
    }, [isOpen]);

    if (!isMounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                  
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9998, backgroundColor: "rgba(0,0,0,0.5)" }}
                        onClick={onClose}
                    />

                    <Box 
                        position="fixed" top={0} right={0} bottom={0} zIndex={9999}
                        w={{ base: "100%", md: "65%", lg: "60%" }}
                        pointerEvents="none" 
                    >
                        
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
                        >
                            
                            <Box 
                                w="100%" h="100%" bg="#11131A" 
                                borderLeft="1px solid" borderColor="whiteAlpha.100"
                                shadow="-20px 0 50px rgba(0,0,0,0.5)"
                                display="flex" flexDirection="column"
                            >
                                <Flex justify="space-between" align="center" px={8} pt={8} pb={2}>
                                    <Box>
                                        <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="gray.500" textTransform="uppercase">
                                            Account Setup
                                        </Text>
                                        <Text fontSize="xl" fontWeight="bold" color="#5cac7d">
                                            {step === 1 && 'Tell us about your business'}
                                            {step === 2 && 'Choose your industry'}
                                            {step === 3 && 'Customize your store'}
                                        </Text>
                                    </Box>
                                    
                                    <IconButton
                                        aria-label="Close modal"
                                        variant="ghost" size="sm" rounded="full"
                                        onClick={onClose} color="gray.400" _hover={{ bg: "whiteAlpha.100", color: "white" }}
                                    >
                                        <Icon as={LuX} boxSize="20px" />
                                    </IconButton>
                                </Flex>

                                <Box w="full" px={8} pb={4}>
                                    <Box w="full" h="4px" bg="whiteAlpha.100" rounded="full" overflow="hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(step / 3) * 100}%` }}
                                            transition={{ duration: 0.6, ease: "easeInOut" }}
                                            style={{ height: '100%', backgroundColor: '#5cac7d', borderRadius: '999px' }}
                                        />
                                    </Box>
                                    <Text fontSize="xs" color="gray.500" mt={2} textAlign="right" fontWeight="medium">
                                        Step {step} of 3
                                    </Text>
                                </Box>

                                <Box flex={1} overflowY="auto" px={{ base: 6, md: 10 }} pb={10}>
                                    <VStack maxW="500px" mx="auto" w="full" h="full" justify="flex-start" pt={4}>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={step}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.3 }}
                                                style={{ width: '100%' }}
                                            >
                                                {step === 1 && <BusinessInfoForm data={formData} update={updateData} onNext={() => setStep(2)} />}
                                                {step === 2 && <CategorySelection data={formData} update={updateData} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
                                                {step === 3 && <BrandingForm data={formData} update={updateData} onBack={() => setStep(2)} onFinish={onClose} />}
                                            </motion.div>
                                        </AnimatePresence>
                                    </VStack>
                                </Box>
                            </Box>
                        </motion.div>
                    </Box>
                </>
            )}
        </AnimatePresence>
    );
};
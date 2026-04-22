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
    primaryColor: '#FFFFFF', secondaryColor: '#000000', tertiaryColor: '#1A1A1A',
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
                        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9998, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
                        onClick={onClose}
                    />

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
                           
                            <Box 
                                w="100%" h="100%" bg="#000000" 
                                borderLeft="1px solid #1A1A1A"
                                shadow="-20px 0 50px rgba(0,0,0,0.9)"
                                display="flex" flexDirection="column"
                            >
                                <Flex justify="space-between" align="center" px={8} pt={8} pb={2}>
                                    <Box>
                                        <Text fontSize="11px" fontWeight="700" letterSpacing="widest" color="#888888" textTransform="uppercase">
                                            Account Setup
                                        </Text>
                                        
                                        <Text fontSize="xl" fontWeight="bold" color="white" letterSpacing="tight" mt={1}>
                                            {step === 1 && 'Tell us about your business'}
                                            {step === 2 && 'Choose your industry'}
                                            {step === 3 && 'Customize your store'}
                                        </Text>
                                    </Box>
                                    
                                    {/* cornered close button */}
                                    <IconButton
                                        aria-label="Close modal"
                                        variant="ghost" size="sm" rounded="none"
                                        onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}
                                    >
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                <Box w="full" px={8} pb={4}>
                                    
                                    
                                    <Box w="full" h="2px" bg="#1A1A1A" rounded="none" overflow="hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(step / 3) * 100}%` }}
                                            transition={{ duration: 0.6, ease: "easeInOut" }}
                                            style={{ height: '100%', backgroundColor: '#FFFFFF', borderRadius: '0px' }}
                                        />
                                    </Box>
                                    <Text fontSize="12px" color="#888888" mt={2} textAlign="right" fontWeight="600">
                                        Step {step} of 3
                                    </Text>
                                </Box>

                                <Box flex={1} overflowY="auto" px={{ base: 6, md: 10 }} pb={10} css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: '#27272A', borderRadius: '4px' } }}>
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
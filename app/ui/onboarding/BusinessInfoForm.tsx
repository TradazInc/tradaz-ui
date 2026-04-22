'use client';
import { useState, useEffect } from 'react';
import { VStack, Input, Textarea, SimpleGrid, Button, Flex, Box, Text, Spinner } from '@chakra-ui/react';
import { Field } from '../field'; 
import { StepFormProps } from '@/app/lib/definitions';
import { checkSubdomainAvailability } from '@/app/lib/data';

export function BusinessInfoForm({ data, update, onNext }: StepFormProps) {
    const [status, setStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        update({ [e.target.name]: e.target.value });
    };

    // handler for Subdomain to prevent spaces and symbols
    const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = e.target.value.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
        update({ subDomain: sanitizedValue });

        // synchronous state updates 
        if (!sanitizedValue || sanitizedValue.length < 2) {
            setStatus('idle');
        } else {
            setStatus('checking');
        }
    };

    // Debounced API Check Effect
    useEffect(() => {
        const domain = data.subDomain;
        
        if (!domain || domain.length < 2) return;
        
        
        const timer = setTimeout(async () => {
            const isAvailable = await checkSubdomainAvailability(domain);
            setStatus(isAvailable ? 'available' : 'unavailable');
        }, 500);

        return () => clearTimeout(timer);
    }, [data.subDomain]);

    
    const inputStyles = { 
        bg: "#0A0A0A", 
        border: "1px solid", 
        borderColor: "#333333", 
        color: "white", 
        rounded: "none", 
        _hover: { borderColor: "#666666" }, 
        _focusWithin: { borderColor: "white" } 
    };

    return (
        <VStack gap={4} align="stretch">
            <Field label="Business Name" required>
                <Input name="businessName" value={data.businessName} onChange={handleChange} placeholder="e.g. Tradaz Fashion" size="lg" {...inputStyles} />
            </Field>

            <Field label="Store URL (Subdomain)" required>
                
                <Flex {...inputStyles} overflow="hidden" align="center" transition="all 0.2s">
                    <Input 
                        name="subDomain" 
                        value={data.subDomain} 
                        onChange={handleSubdomainChange} 
                        placeholder="your-store" 
                        size="lg" 
                        border="none" 
                        bg="transparent"
                        rounded="none"
                        _focus={{ outline: "none", boxShadow: "none" }}
                        px={4}
                    />
                    <Flex align="center" justify="center" bg="#111111" px={4} h="100%" borderLeft="1px solid" borderColor="#333333" color="#888888" fontSize="13px" fontWeight="500" userSelect="none">
                        .tradaz.com
                    </Flex>
                </Flex>
                
                {/* Dynamic Status Indicator */}
                <Box mt={2} h="20px">
                    {status === 'idle' && <Text fontSize="12px" color="#888888">Must be unique letters, numbers, or hyphens.</Text>}
                    {status === 'checking' && (
                        <Flex align="center" gap={2} color="#888888">
                            <Spinner size="xs" /> <Text fontSize="12px">Checking availability...</Text>
                        </Flex>
                    )}
                    
                    {status === 'available' && <Text fontSize="12px" color="white" fontWeight="600"> {data.subDomain}.tradaz.com is Available!</Text>}
                    {status === 'unavailable' && <Text fontSize="12px" color="red.400" fontWeight="600"> {data.subDomain}.tradaz.com is Not available. Try another one.</Text>}
                </Box>
            </Field>

            <SimpleGrid columns={2} gap={4}>
                <Field label="Phone">
                    <Input name="phone" value={data.phone} onChange={handleChange} placeholder="+234..." size="lg" {...inputStyles} />
                </Field>
                <Field label="Store Address">
                    <Input name="address" value={data.address} onChange={handleChange} placeholder="Lagos" size="lg" {...inputStyles} />
                </Field>
            </SimpleGrid>

            <Field label="About (Optional)">
                <Textarea name="about" value={data.about} onChange={handleChange} placeholder="What do you sell?" size="lg" rows={3} resize="none" {...inputStyles} />
            </Field>

            
            <Button
                size="lg" w="full" mt={2} 
                bg="white" color="black" rounded="none" fontWeight="bold" fontSize="14px"
                onClick={onNext}
                disabled={!data.businessName || status !== 'available'}
                _hover={{ bg: "#E5E5E5" }} 
                _disabled={{ opacity: 1, cursor: "not-allowed", bg: "#1A1A1A", color: "#666666" }}
                transition="all 0.2s ease"
            >
                Next Step
            </Button>
        </VStack>
    );
}
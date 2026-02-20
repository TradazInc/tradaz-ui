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
        
        // Wait 500ms after the user stops typing before calling the API
        const timer = setTimeout(async () => {
            const isAvailable = await checkSubdomainAvailability(domain);
            setStatus(isAvailable ? 'available' : 'unavailable');
        }, 500);

        return () => clearTimeout(timer);
    }, [data.subDomain]);

    const inputStyles = { bg: "whiteAlpha.50", border: "1px solid", borderColor: "whiteAlpha.100", color: "white", _hover: { borderColor: "whiteAlpha.300" }, _focusWithin: { borderColor: "#5cac7d" } };

    return (
        <VStack gap={4} align="stretch">
            <Field label="Business Name" required>
                <Input name="businessName" value={data.businessName} onChange={handleChange} placeholder="e.g. Tradaz Fashion" size="lg" {...inputStyles} />
            </Field>

            <Field label="Store URL (Subdomain)" required>
                {/* Seamless Split Input UI */}
                <Flex {...inputStyles} rounded="md" overflow="hidden" align="center" transition="all 0.2s">
                    <Input 
                        name="subDomain" 
                        value={data.subDomain} 
                        onChange={handleSubdomainChange} 
                        placeholder="your-store" 
                        size="lg" 
                        border="none" 
                        bg="transparent"
                        _focus={{ outline: "none", boxShadow: "none" }}
                        px={4}
                    />
                    <Flex align="center" justify="center" bg="whiteAlpha.100" px={4} h="100%" borderLeft="1px solid" borderColor="whiteAlpha.100" color="gray.400" fontSize="sm" fontWeight="medium" userSelect="none">
                        .tradaz.com
                    </Flex>
                </Flex>
                
                {/* Dynamic Status Indicator */}
                <Box mt={2} h="20px">
                    {status === 'idle' && <Text fontSize="xs" color="gray.500">Must be unique letters, numbers, or hyphens.</Text>}
                    {status === 'checking' && (
                        <Flex align="center" gap={2} color="gray.400">
                            <Spinner size="xs" /> <Text fontSize="xs">Checking availability...</Text>
                        </Flex>
                    )}
                    {/* domain text updates */}
                    {status === 'available' && <Text fontSize="xs" color="#5cac7d" fontWeight="medium">  {data.subDomain}.tradaz.com is Available!</Text>}
                    {status === 'unavailable' && <Text fontSize="xs" color="red.400" fontWeight="medium">  {data.subDomain}.tradaz.com is Not available. Try another one.</Text>}
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
                size="lg" w="full" mt={2} bg="#5cac7d" color="white" onClick={onNext}
                disabled={!data.businessName || status !== 'available'}
                _hover={{ bg: "#4a9c6d" }} _disabled={{ opacity: 0.5, cursor: "not-allowed", bg: "whiteAlpha.200", color: "gray.400" }}
                transition="all 0.2s ease"
            >
                Next Step
            </Button>
        </VStack>
    );
}
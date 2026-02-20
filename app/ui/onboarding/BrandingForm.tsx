'use client';
import { VStack, Box, Text, Input, SimpleGrid, Button, HStack, Heading } from '@chakra-ui/react';


import { Field } from '../field'; 


export interface OnboardingData {
    businessName: string;
    subDomain: string;
    about: string;
    address: string;
    phone: string;
    category: string;
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    logo: File | null;
}

interface BrandingFormProps {
    data: OnboardingData;
    update: (newData: Partial<OnboardingData>) => void;
    onBack: () => void;
    onFinish: () => void;
}


export function BrandingForm({ data, update, onBack, onFinish }: BrandingFormProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        update({ [e.target.name]: e.target.value });
    };

    const handleFinish = () => {
        // Trigger your API setup call here!
        if (onFinish) onFinish();
    };

    return (
        <VStack gap={6} align="stretch" w="full">
            <Heading size="md" color="white">Store Appearance</Heading>

            <Field label="Store Logo" helperText="Upload your brand logo">
                <Box
                    border="1px dashed" borderColor="whiteAlpha.200" p={4} borderRadius="md" bg="#171923"
                    _hover={{ borderColor: "#5cac7d", bg: "whiteAlpha.50" }} transition="all 0.2s" cursor="pointer"
                >
                    <Input
                        type="file" 
                        variant="subtle" 
                        p={0} h="auto" accept="image/*" color="gray.300"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) update({ logo: file });
                        }}
                    />
                </Box>
            </Field>

            <SimpleGrid columns={3} gap={3}>
                <Field label="Primary">
                    <Input type="color" name="primaryColor" value={data.primaryColor} onChange={handleChange} h="12" p={1} cursor="pointer" w="full" bg="#171923" border="1px solid" borderColor="whiteAlpha.100" />
                </Field>
                <Field label="Secondary">
                    <Input type="color" name="secondaryColor" value={data.secondaryColor} onChange={handleChange} h="12" p={1} cursor="pointer" w="full" bg="#171923" border="1px solid" borderColor="whiteAlpha.100" />
                </Field>
                <Field label="Tertiary">
                    <Input type="color" name="tertiaryColor" value={data.tertiaryColor} onChange={handleChange} h="12" p={1} cursor="pointer" w="full" bg="#171923" border="1px solid" borderColor="whiteAlpha.100" />
                </Field>
            </SimpleGrid>

            {/* Live Visual Preview */}
            <Box w="full" p={5} borderRadius="lg" bg="#171923" border="1px solid" borderColor="whiteAlpha.100" textAlign="center">
                <Text fontSize="xs" fontWeight="bold" mb={3} color="gray.500" letterSpacing="wider">
                    PREVIEW
                </Text>
                <Button size="sm" bg={data.primaryColor} color="white" _hover={{ opacity: 0.9 }} shadow="sm">
                    {data.businessName || "Your Button"}
                </Button>
            </Box>

            <HStack w="full" gap={3} mt={2}>
                <Button variant="ghost" onClick={onBack} size="lg" color="gray.400" _hover={{ bg: "whiteAlpha.50", color: "white" }}>
                    Back
                </Button>
                <Button size="lg" flex="1" bg="#5cac7d" _hover={{ bg: "#4a9c6d" }} color="white" onClick={handleFinish}>
                    Finish Setup
                </Button>
            </HStack>
        </VStack>
    );
}
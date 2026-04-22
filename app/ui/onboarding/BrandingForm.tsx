'use client';
import { VStack, Box, Text, Input, SimpleGrid, Button, HStack, Heading } from '@chakra-ui/react';
import { Field } from '../field'; 
import { StepFormProps } from '@/app/lib/definitions';

export function BrandingForm({ data, update, onBack, onFinish }: StepFormProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        update({ [e.target.name]: e.target.value });
    };

    const handleFinish = () => {
        
        if (onFinish) onFinish();
    };

    

    return (
        <VStack gap={6} align="stretch" w="full">
            <Heading size="md" color="white" letterSpacing="tight">Brand Appearance</Heading>

            <Field label="Store Logo" helperText="Upload your brand logo">
                <Box
                    border="1px dashed" 
                    borderColor="#333333" 
                    p={4} 
                    rounded="none" 
                    bg="#0A0A0A"
                    _hover={{ borderColor: "white", bg: "#111111" }} 
                    transition="all 0.2s" 
                    cursor="pointer"
                >
                    <Input
                        type="file" 
                        p={0} 
                        h="auto" 
                        accept="image/*" 
                        color="#888888"
                        fontSize="13px"
                        rounded="none"
                        border="none"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) update({ logo: file });
                        }}
                    />
                </Box>
            </Field>

            <SimpleGrid columns={3} gap={3}>
                <Field label="Primary">
                    <Input 
                        type="color" 
                        name="primaryColor" 
                        value={data.primaryColor} 
                        onChange={handleChange} 
                        h="12" p={1} cursor="pointer" w="full" 
                        bg="#0A0A0A" border="1px solid" borderColor="#333333" 
                        rounded="none"
                    />
                </Field>
                <Field label="Secondary">
                    <Input 
                        type="color" 
                        name="secondaryColor" 
                        value={data.secondaryColor} 
                        onChange={handleChange} 
                        h="12" p={1} cursor="pointer" w="full" 
                        bg="#0A0A0A" border="1px solid" borderColor="#333333" 
                        rounded="none"
                    />
                </Field>
                <Field label="Tertiary">
                    <Input 
                        type="color" 
                        name="tertiaryColor" 
                        value={data.tertiaryColor} 
                        onChange={handleChange} 
                        h="12" p={1} cursor="pointer" w="full" 
                        bg="#0A0A0A" border="1px solid" borderColor="#333333" 
                        rounded="none"
                    />
                </Field>
            </SimpleGrid>

           
            <Box w="full" p={5} rounded="none" bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" textAlign="center">
                <Text fontSize="10px" fontWeight="700" mb={4} color="#555555" letterSpacing="0.2em">
                    PREVIEW
                </Text>
                <Button 
                    size="sm" 
                    bg={data.primaryColor} 
                    color={data.primaryColor === '#FFFFFF' ? 'black' : 'white'} 
                    rounded="none"
                    fontWeight="bold"
                    px={6}
                    _hover={{ opacity: 0.8 }} 
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                >
                    {data.businessName || "Your Button"}
                </Button>
            </Box>

            <HStack w="full" gap={3} mt={2}>
                <Button 
                    variant="ghost" 
                    onClick={onBack} 
                    size="lg" 
                    color="#888888" 
                    rounded="none"
                    fontSize="14px"
                    fontWeight="600"
                    _hover={{ bg: "#1A1A1A", color: "white" }}
                >
                    Back
                </Button>
                <Button 
                    size="lg" 
                    flex="1" 
                    bg="white" 
                    color="black" 
                    rounded="none"
                    fontWeight="bold"
                    fontSize="14px"
                    onClick={handleFinish}
                    _hover={{ bg: "#E5E5E5" }}
                >
                    Finish Setup
                </Button>
            </HStack>
        </VStack>
    );
}
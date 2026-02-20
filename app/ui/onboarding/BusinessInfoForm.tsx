'use client';
import { VStack, Input, Textarea, SimpleGrid, Button } from '@chakra-ui/react';
import { Field } from '../field'; 
import { StepFormProps } from '@/app/lib/definitions';

export function BusinessInfoForm({ data, update, onNext }: StepFormProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        update({ [e.target.name]: e.target.value });
    };

    const inputStyles = { bg: "whiteAlpha.50", border: "1px solid", borderColor: "whiteAlpha.100", color: "white", _hover: { borderColor: "whiteAlpha.300" }, _focus: { borderColor: "#5cac7d" } };

    return (
        <VStack gap={3} align="stretch">
            

            <Field label="Business Name" required>
                <Input name="businessName" value={data.businessName} onChange={handleChange} placeholder="e.g. Tradaz Fashion" size="lg" {...inputStyles} />
            </Field>

            <Field label="Subdomain" required helperText="Your store URL">
                <Input name="subDomain" value={data.subDomain} onChange={handleChange} placeholder="store-name" size="lg" {...inputStyles} />
            </Field>

            <SimpleGrid columns={2} gap={4}>
                <Field label="Phone">
                    <Input name="phone" value={data.phone} onChange={handleChange} placeholder="+234..." size="lg" {...inputStyles} />
                </Field>
                <Field label="City">
                    <Input name="address" value={data.address} onChange={handleChange} placeholder="Lagos" size="lg" {...inputStyles} />
                </Field>
            </SimpleGrid>

            <Field label="About (Optional)">
                <Textarea name="about" value={data.about} onChange={handleChange} placeholder="What do you sell?" size="lg" rows={3} resize="none" {...inputStyles} />
            </Field>

            <Button
                size="lg" w="full" mt={4} bg="#5cac7d" color="white" onClick={onNext}
                disabled={!data.businessName || !data.subDomain}
                _hover={{ bg: "#4a9c6d" }} _disabled={{ opacity: 0.5, cursor: "not-allowed", bg: "whiteAlpha.200", color: "gray.400" }}
                transition="all 0.2s ease"
            >
                Next Step
            </Button>
        </VStack>
    );
}
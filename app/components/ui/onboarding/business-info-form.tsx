'use client';
import { VStack, Input, Textarea, SimpleGrid, Button, Heading } from '@chakra-ui/react';
import { Field } from '../field';

export function BusinessInfoForm({ data, update, onNext }: any) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        update({ [e.target.name]: e.target.value });
    };

    return (
        <VStack gap={5} align="stretch">
            <Heading size="md" mb={2} color="gray.800">Business Details</Heading>

            <Field label="Business Name" required>
                <Input
                    name="businessName"
                    value={data.businessName}
                    onChange={handleChange}
                    placeholder="e.g. Tradaz Fashion"
                    size="lg" // Match Auth size
                />
            </Field>

            <Field label="Subdomain" required helperText="Your store URL">
                <Input
                    name="subDomain"
                    value={data.subDomain}
                    onChange={handleChange}
                    placeholder="store-name"
                    size="lg"
                // Add a suffix style visually using InputGroup if available, 
                // or just keep it simple for now
                />
            </Field>

            <SimpleGrid columns={2} gap={4}>
                <Field label="Phone">
                    <Input name="phone" value={data.phone} onChange={handleChange} placeholder="+234..." size="lg" />
                </Field>
                <Field label="City">
                    <Input name="address" value={data.address} onChange={handleChange} placeholder="Lagos" size="lg" />
                </Field>
            </SimpleGrid>

            <Field label="About (Optional)">
                <Textarea
                    name="about"
                    value={data.about}
                    onChange={handleChange}
                    placeholder="What do you sell?"
                    size="lg"
                    rows={3}
                    resize="none"
                />
            </Field>

            <Button
                size="lg"
                w="full"
                mt={4}
                bg="#5cac7d"
                _hover={{ bg: "#4a9c6d" }}
                color="white"
                onClick={onNext}
                disabled={!data.businessName || !data.subDomain}
            >
                Next Step
            </Button>
        </VStack>
    );
}
'use client';
import { HStack, Input, VStack, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';

export function OTPInput({ onVerify }: { onVerify: () => void }) {
    const [otp, setOtp] = useState(['', '', '', '']);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling && element.value) {
            (element.nextSibling as HTMLInputElement).focus();
        }
    };

    const handleVerify = () => {
        // In a real app, you'd check the code here
        if (otp.join('').length === 4) {
            onVerify();
        } else {
            alert("Please enter a 4-digit code");
        }
    };

    return (
        <VStack gap={6} w="full">
            <HStack gap={2} justify="center">
                {otp.map((data, index) => (
                    <Input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                        textAlign="center"
                        fontSize="2xl"
                        w="12"
                        h="12"
                        borderRadius="md"
                        border="1px solid"
                        borderColor="gray.300"
                        focusBorderColor="#5cac7d"
                        _focus={{ boxShadow: "0 0 0 1px #5cac7d" }}
                    />
                ))}
            </HStack>

            <Text fontSize="sm" color="gray.500">
                Didn't receive code? <Text as="span" color="#5cac7d" fontWeight="bold" cursor="pointer">Resend</Text>
            </Text>

            <Button
                size="lg"
                w="full"
                bg="#5cac7d"
                color="white"
                _hover={{ bg: "#4a9c6d" }}
                onClick={handleVerify}
            >
                Verify Email
            </Button>
        </VStack>
    );
}
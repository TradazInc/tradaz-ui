'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, VStack, Heading, Text, Flex, Icon } from '@chakra-ui/react';
import { OTPInput } from '../components/ui/auth/otp-input';
import { FaEnvelopeOpenText } from 'react-icons/fa';

export default function VerifyPage() {
    const router = useRouter();
    const [email, setEmail] = useState('user@example.com');

    useEffect(() => {
        // Simulate getting email from local storage or previous step
        const storedEmail = localStorage.getItem('tradaz_temp_email');
        if (storedEmail) setEmail(storedEmail);
    }, []);

    const handleSuccess = () => {
        // Mark as verified in storage
        localStorage.setItem('tradaz_is_verified', 'true');
        router.push('/onboarding');
    };

    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.50">
            <Container maxW="md">
                <VStack gap={6} w="full">

                    <Box bg="#e6f4ea" p={4} borderRadius="full">
                        <Icon as={FaEnvelopeOpenText} boxSize={8} color="#5cac7d" />
                    </Box>

                    <VStack gap={1} textAlign="center">
                        <Heading size="lg" color="gray.800">Verify your email</Heading>
                        <Text color="gray.500" fontSize="sm">
                            We sent a 4-digit code to <b>{email}</b>.
                        </Text>
                    </VStack>

                    {/* The Card */}
                    <Box w="full" bg="white" p={8} borderRadius="2xl" shadow="lg" border="1px solid" borderColor="gray.100">
                        <OTPInput onVerify={handleSuccess} />
                    </Box>

                    <Text fontSize="xs" color="gray.400" cursor="pointer" onClick={() => router.back()}>
                        ← Back to Sign Up
                    </Text>

                </VStack>
            </Container>
        </Flex>
    );
}
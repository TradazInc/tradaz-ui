'use client';
import { VStack, Input, Button, Text, Link } from '@chakra-ui/react';
import { Field } from '../field';
import { FcGoogle } from 'react-icons/fc';

export function LoginForm() {
    return (
        <VStack gap={4} align="stretch">
            <VStack gap={3}>
                <Field label="Email">
                    <Input type="email" placeholder="you@example.com" size="lg" />
                </Field>
                <Field label="Password">
                    <Input type="password" placeholder="••••••••" size="lg" />
                </Field>
            </VStack>

            <Link href="#" fontSize="sm" color="#5cac7d" alignSelf="end" fontWeight="medium">
                Forgot Password?
            </Link>

            <Button size="lg" colorPalette="green" w="full" bg="#5cac7d" _hover={{ bg: "#4a9c6d" }}>
                Log In
            </Button>

            <Button variant="outline" size="lg" w="full" mt={2}>
                <FcGoogle /> Google
            </Button>
        </VStack>
    );
}
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Tabs,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa"; // Make sure to install react-icons
import { LoginForm } from "../ui/auth/login"; // Adjust path if needed
import { SignupForm } from "../ui/auth/signup"; // Adjust path if needed

export default function AuthPage() {
  const [view, setView] = useState<"auth" | "success">("auth");
  const router = useRouter();

  const handleAuthSuccess = () => {
    setView("success");
    // Redirect to Verification page after 1.5 seconds
    setTimeout(() => {
      router.push("/verify");
    }, 1500);
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Container maxW="md">
        <VStack gap={8} w="full">
          {/* Header: Hide during success state for a cleaner transition */}
          {view === "auth" && (
            <VStack gap={2}>
              <Heading size="2xl" color="#5cac7d" letterSpacing="tight">
                Tradaz.
              </Heading>
              <Text color="fg.muted" fontSize="lg">
                Start your commerce journey
              </Text>
            </VStack>
          )}

          {/* The Card */}
          <Box
            w="full"
            bg="white"
            p={8}
            borderRadius="2xl"
            shadow="lg"
            border="1px solid"
            borderColor="border.subtle"
          >
            {view === "auth" ? (
              <Tabs.Root defaultValue="signup" fitted variant="plain">
                <Tabs.List bg="gray.100" p={1} borderRadius="lg" mb={6}>
                  <Tabs.Trigger
                    value="login"
                    px={4}
                    py={2}
                    borderRadius="md"
                    _selected={{ bg: "white", shadow: "xs", color: "#5cac7d" }}
                  >
                    Log In
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="signup"
                    px={4}
                    py={2}
                    borderRadius="md"
                    _selected={{ bg: "white", shadow: "xs", color: "#5cac7d" }}
                  >
                    Sign Up
                  </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="login">
                  {/* Pass the onSuccess handler */}
                  <LoginForm onSuccess={handleAuthSuccess} />
                </Tabs.Content>
                <Tabs.Content value="signup">
                  {/* Pass the onSuccess handler */}
                  <SignupForm onSuccess={handleAuthSuccess} />
                </Tabs.Content>
              </Tabs.Root>
            ) : (
              /* Success View */
              <VStack gap={6} py={8} textAlign="center">
                <Icon as={FaCheckCircle} boxSize={16} color="#5cac7d" />
                <Box>
                  <Heading size="xl" mb={2} color="gray.800">
                    Check your email
                  </Heading>
                  <Text color="gray.500">
                    We sent a verification code to you.
                  </Text>
                </Box>
                <Text fontSize="xs" color="gray.400" mt={4}>
                  Redirecting...
                </Text>
              </VStack>
            )}
          </Box>
        </VStack>
      </Container>
    </Flex>
  );
}

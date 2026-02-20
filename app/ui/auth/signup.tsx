"use client";
import { useState } from "react";
import {
  VStack,
  Input,
  Button,
  Text,
  Separator,
  HStack,
} from "@chakra-ui/react";
import { Field } from "../field";
import { FcGoogle } from "react-icons/fc";

export function SignupForm({ onSuccess }: { onSuccess: () => void }) {
  // Local state to capture the email for the next step
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Save email locally so the Verify Page knows where we sent the code
    // In a real app, this would come from your backend response
    if (email) {
      localStorage.setItem("tradaz_temp_email", email);
    }

    // 2. Trigger the "Success" view in the parent component
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <VStack gap={4} align="stretch">
        <VStack gap={3}>
          {/* Split Name Fields for better data */}
          <HStack gap={4}>
            <Field label="First Name">
              <Input placeholder="John" size="lg" required />
            </Field>
            <Field label="Last Name">
              <Input placeholder="Doe" size="lg" required />
            </Field>
          </HStack>

          <Field label="Email Address">
            <Input
              type="email"
              placeholder="you@example.com"
              size="lg"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          <Field label="Password">
            <Input type="password" placeholder="••••••••" size="lg" required />
          </Field>
        </VStack>

        <Button
          type="submit"
          size="lg"
          colorPalette="green"
          w="full"
          mt={2}
          bg="#5cac7d"
          _hover={{ bg: "#4a9c6d" }}
          color="white"
        >
          Create Account
        </Button>

        <HStack w="full" gap={4}>
          <Separator flex="1" />
          <Text fontSize="xs" color="fg.muted">
            OR CONTINUE WITH
          </Text>
          <Separator flex="1" />
        </HStack>

        <Button variant="outline" size="lg" w="full">
          <FcGoogle /> Google
        </Button>
      </VStack>
    </form>
  );
}

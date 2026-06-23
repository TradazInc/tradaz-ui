"use client";

import { useState } from "react";
import {
  Box,
  Field,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../components/ui/password-input";
import { SignInData } from "../../types/definitions";
import { GoogleIcon } from "./GoogleIcon";
import LinkText from "./LinkText";
import SeparatorText from "./SeparatorText";
import { authClient } from "@/lib/authClient";
import { toaster } from "@/components/ui/toaster";

const SignInForm = () => {
  const router = useRouter();
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>();

  // --- EMAIL SIGN IN ---
  const onSubmit = handleSubmit(async (data) => {
    setIsEmailLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: data.email!,
        password: data.password,
      });

      if (result.error) {
        toaster.create({
          title: "Sign in failed",
          description: result.error.message || "Invalid credentials.",
          type: "error",
        });
        return;
      }

      toaster.create({
        title: "Welcome back!",
        description: "Redirecting to your dashboard…",
        type: "success",
      });
      router.push("/business");
    } catch (err) {
      console.error("Sign in error:", err);
      toaster.create({
        title: "Unexpected error",
        description: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setIsEmailLoading(false);
    }
  });

  // --- GOOGLE SIGN IN ---
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/business",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Google login failed.";
      toaster.create({
        title: "Google sign‑in error",
        description: message,
        type: "error",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <Box w={"full"}>
      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <Stack gap={4} w={"full"}>
          {/* Email Field */}
          <Field.Root invalid={!!errors.email} w={"full"}>
            <Field.Label fontWeight={"400"} fontSize={"14px"}>
              Email Address *
            </Field.Label>
            <Input
              {...register("email", { required: "Email is required" })}
              placeholder="Enter email address"
              type="email"
              maxH={"45px"}
              borderRadius={"7px"}
              borderWidth={"2px"}
              borderColor="#292929"
              bg="white"
              color="black"
              _placeholder={{ color: "gray.500" }}
            />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          {/* Password Field */}
          <Field.Root invalid={!!errors.password} w={"full"}>
            <Field.Label fontWeight={"400"} fontSize={"14px"}>
              Password *
            </Field.Label>
            <PasswordInput
              {...register("password", { required: "Password is required" })}
              placeholder="Enter password"
              maxH={"45px"}
              borderRadius={"7px"}
              borderWidth={"2px"}
              borderColor={"#292929"}
              bg="white"
              color="black"
              _placeholder={{ color: "gray.500" }}
            />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          {/* Buttons */}
          <VStack w={"full"}>
            <Box w={"full"} textAlign={"right"}>
              <LinkText>Forgot Password?</LinkText>
            </Box>

            <Button
              type="submit"
              loading={isEmailLoading}
              loadingText="Signing in..."
              w="full"
              h="45px"
              bg="white"
              color="black"
              _hover={{ bg: "gray.200" }}
              borderRadius="7px"
              fontWeight="600"
              disabled={isGoogleLoading}
            >
              Sign In
            </Button>

            <SeparatorText />

            <Button
              type="button"
              onClick={handleGoogleSignIn}
              loading={isGoogleLoading}
              variant="outline"
              w="full"
              h="45px"
              borderRadius="7px"
              borderWidth="2px"
              borderColor="#292929"
              color="white"
              bg="transparent"
              _hover={{ bg: "whiteAlpha.50" }}
              disabled={isEmailLoading}
            >
              <GoogleIcon maxW={"20px"} maxH={"20px"} />
              <Text fontSize={"14px"} fontWeight={"600"} ml={2}>
                Sign In With Google
              </Text>
            </Button>

            <HStack alignItems={"center"} maxW={"288px"}>
              <Text
                fontSize={"16px"}
                color="#8E9BAE"
                flex={2}
                textAlign={"right"}
              >
                Don’t have an account?
              </Text>
              <LinkText>Sign Up</LinkText>
            </HStack>
          </VStack>
        </Stack>
      </form>
    </Box>
  );
};

export default SignInForm;

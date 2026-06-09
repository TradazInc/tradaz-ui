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
  Button
} from "@chakra-ui/react";
import { useRouter } from "next/navigation"; 
import { useForm } from "react-hook-form";
import Link from "next/link"; 
import { PasswordInput } from "../../../components/ui/password-input";
import { GoogleIcon } from "./GoogleIcon";
import LinkText from "./LinkText";
import SeparatorText from "./SeparatorText";

// --- IMPORT ONLY BETTER AUTH ---
import { authClient, signUp } from "@/app/lib/auth"; 
import { SignUpData } from "../../lib/definitions"; 

const SignUpForm = () => {
  const router = useRouter(); 
  const [authError, setAuthError] = useState("");
  
  // Local loading states for our buttons
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>();

  // --- EMAIL SIGN UP  ---
  const onSubmit = handleSubmit(async (data) => {
    setAuthError(""); 
    setIsEmailLoading(true);

    try {
      // Better Auth's native email registration
      const { error } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      
      if (error) {
        setAuthError(error.message || "Failed to sign up. Please try again.");
        setIsEmailLoading(false);
        return;
      }

      console.log("Successfully signed up!");
      router.push("/business");

    } catch (error) {
      console.error("Failed to sign up:", error);
      setAuthError("An unexpected system error occurred.");
      setIsEmailLoading(false);
    }
  });

  // --- GOOGLE SIGN UP/IN ---
  const handleGoogleSignIn = async () => {
    setAuthError(""); 
    setIsGoogleLoading(true);

    try {
      // Better Auth handles the redirect to Google automatically!
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/business", 
      });
    } catch (error) {
      setIsGoogleLoading(false);
      const errorMessage = error instanceof Error ? error.message : "Failed to initialize Google sign-up.";
      setAuthError(errorMessage);
    }
  };

  return (
    <Box w={"full"}>
      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <Stack gap={4} w={"full"}>
          
          {/* Show Auth Error if it exists */}
          {authError && (
             <Text color="red.400" fontSize="sm" textAlign="center" bg="red.900" p={2} rounded="md">
               {authError}
             </Text>
          )}

          {/* Name Field */}
          <Field.Root invalid={!!errors.name} w={"full"}>
            <Field.Label fontWeight={"400"} fontSize={"14px"}>
              Full Name *
            </Field.Label>
            <Input
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your full name"
              maxH={"45px"}
              borderRadius={"7px"}
              borderWidth={"2px"}
              borderColor="#292929"
              bg="white"
              color="black"
              _placeholder={{ color: "gray.500" }}
            />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

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
              {...register("password", { 
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" }
              })}
              placeholder="Enter password"
              maxH={"45px"}
              borderRadius={"7px"}
              borderWidth={"2px"}
              color="black"    
              bg="white"
              borderColor={"#292929"}
              _placeholder={{ color: "gray.500" }}
            />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          {/* Buttons Area */}
          <VStack w={"full"}>
            
            <Button 
                type="submit" 
                loading={isEmailLoading}
                loadingText="Signing up..."
                w="full"
                h="45px"
                bg="white"
                color="black"
                _hover={{ bg: "gray.200" }}
                borderRadius="7px"
                fontWeight="600"
                disabled={isGoogleLoading}
            >
              Sign Up
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
                Sign Up With Google
              </Text>
            </Button>

            <HStack alignItems={"center"} maxW={"288px"}>
              <Text
                fontSize={"16px"}
                color="#8E9BAE"
                flex={2}
                textAlign={"right"}
              >
                Already have an account?
              </Text>
              <Link href="/signin">
                <LinkText>Sign In</LinkText>
              </Link>
            </HStack>
          </VStack>
        </Stack>
      </form>
    </Box>
  );
};

export default SignUpForm;
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

// --- IMPORT YOUR ENTITY HOOK ---
import { useAuthActions } from "@/app/entities/auth/hooks";
import { SignUpData } from "../../lib/definitions"; 

const SignUpForm = () => {
  const router = useRouter(); 
  const [authError, setAuthError] = useState("");
  
  //  Pull in the signUp mutation from our TanStack hook
  const { signUp } = useAuthActions();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>();

  //  Consume your new API hook on submit
  const onSubmit = handleSubmit(async (data) => {
    setAuthError(""); 

    try {
      // Call the API endpoint
      await signUp.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
        rememberMe: true,
        callbackURL: "/business"
      });
      
      console.log("Successfully signed up!");
      router.push("/business");

    } catch (error) {
      // TanStack automatically catches network errors and throws them here
      const message = error instanceof Error ? error.message : "Failed to sign up. Please try again.";
      console.error("Failed to sign up:", message);
      setAuthError(message);
    }
  });

  // Google Auth 
  const handleGoogleSignIn = async () => {
    setAuthError("Google Sign-In is not yet wired to the custom backend."); 
    // TODO: Wire this to your custom /api/auth/sign-in/social endpoint once built!
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
                // We map the loading state directly to the TanStack mutation!
                loading={signUp.isPending}
                loadingText="Signing up..."
                w="full"
                h="45px"
                bg="white"
                color="black"
                _hover={{ bg: "gray.200" }}
                borderRadius="7px"
                fontWeight="600"
            >
              Sign Up
            </Button>
            
            <SeparatorText />

            <Button 
                type="button" 
                onClick={handleGoogleSignIn}
                variant="outline"
                w="full"
                h="45px"
                borderRadius="7px"
                borderWidth="2px"
                borderColor="#292929"
                color="white"
                bg="transparent"
                _hover={{ bg: "whiteAlpha.50" }}
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
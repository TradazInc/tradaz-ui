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
import Link from "next/link"; 
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../../components/ui/password-input";
import { SignInData } from "../../lib/definitions";

import { GoogleIcon } from "./GoogleIcon";
import LinkText from "./LinkText";
import SeparatorText from "./SeparatorText";

// --- IMPORT YOUR ENTITY HOOK ---
import { useAuthActions } from "@/app/entities/auth/hooks";

// Keep this temporarily if you are still using it for Google Auth
import { authClient } from "@/app/lib/auth"; 

const SignInForm = () => {
  const router = useRouter(); 
  const [authError, setAuthError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false); // Kept specifically for Google Auth
  
  //  Pull in the signIn mutation from our TanStack hook
  const { signIn } = useAuthActions();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>();

  // Consume your new API hook on submit
  const onSubmit = handleSubmit(async (data) => {
    setAuthError(""); 

    try {
      // Call the custom backend API endpoint
     const response = await signIn.mutateAsync({
        email: data.email, 
        password: data.password,
        rememberMe: true,
        callbackURL: "/business"
      });
      
      if (response.token) {
         localStorage.setItem("auth_token", response.token);
      }

      console.log("Successfully signed in!");
      router.push("/business"); 

    } catch (error) {
      // TanStack automatically catches network errors and throws them here
      const message = error instanceof Error ? error.message : "Sign in failed. Please check your credentials.";
      console.error("Sign in failed:", message);
      setAuthError(message);
    }
  });

  // Google Auth
  const handleGoogleSignIn = async () => { 
    setAuthError(""); 
    setIsGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard", 
      });
    } catch (error) { 
      setIsGoogleLoading(false);
      const errorMessage = error instanceof Error ? error.message : "Failed to initialize Google login.";
      setAuthError(errorMessage);
    }
  };

  return (
    <Box w={"full"}>
      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <Stack gap={4} w={"full"}>
          
          {authError && (
             <Text color="red.400" fontSize="sm" textAlign="center" bg="red.900" p={2} rounded="md">
               {authError}
             </Text>
          )}

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

          {/* Buttons Area */}
          <VStack w={"full"}>
            <Box w={"full"} textAlign={"right"}>
              <LinkText>Forgot Password?</LinkText>
            </Box>

            <Button 
                type="submit" 
                loading={signIn.isPending}
                loadingText="Signing in..."
                w="full"
                h="45px"
                bg="white"
                color="black"
                _hover={{ bg: "gray.200" }}
                borderRadius="7px"
                fontWeight="600"
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
              
              <Link href="/signup">
                <LinkText>Sign Up</LinkText>
              </Link>
            </HStack>
          </VStack>
        </Stack>
      </form>
    </Box>
  );
};

export default SignInForm;
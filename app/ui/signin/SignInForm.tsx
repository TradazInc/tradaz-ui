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
import { authClient } from "@/app/lib/auth"; 
import { SignInData } from "../../lib/definitions";

import { GoogleIcon } from "./GoogleIcon";
import LinkText from "./LinkText";
import SeparatorText from "./SeparatorText";

const SignInForm = () => {
  const router = useRouter(); 
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>();

  // Better Auth Sign In
  const onSubmit = handleSubmit(async (data) => {
    setAuthError(""); 

    await authClient.signIn.email({
        email: data.email, 
        password: data.password,
        rememberMe: true 
    }, {
        onRequest: () => {
            setIsLoading(true);
        },
        onSuccess: () => {
            setIsLoading(false);
            console.log("Successfully signed in!");
            router.push("/dashboard"); 
        },
        onError: (ctx) => {
            setIsLoading(false);
            console.error("Sign in failed:", ctx.error.message);
            setAuthError(ctx.error.message);
        },
    });
  });


 // google auth
 const handleGoogleSignIn = async () => {
    setAuthError(""); 
    setIsLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard", 
      });
    } catch (error) { 
      setIsLoading(false);
  
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
                disabled={isLoading}
                w="full"
                h="45px"
                bg="white"
                color="black"
                _hover={{ bg: "gray.200" }}
                borderRadius="7px"
                fontWeight="600"
            >
              {isLoading ? "Signing in..." : "Sign In"}
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
"use client";

import {
  Box,
  Field,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation"; 
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../../components/ui/password-input";


import signInUser from "../../hooks/useSignIn";
import { SignInData } from "../../lib/definitions";
import { GoogleIcon } from "./GoogleIcon";
import LinkText from "./LinkText";
import SeparatorText from "./SeparatorText";
import SignUpButton from "./SignUpButton";
import Link from "next/link";

const SignUpForm = () => {
  const router = useRouter(); 
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>();

  const onSubmit = handleSubmit(async (data) => {
    
    const { data: user, error } = await signInUser(data);
    
    
    if (error) {
      console.error("Failed to sign in:", error);
      
      return; 
    }

    console.log("Successfully signed in:", user);

    
    router.push("/dashboard");
  });

  return (
    <Box w={"full"}>
      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <Stack gap={4} w={"full"}>
          {/* Email Field */}
          <Field.Root invalid={!!errors.login} w={"full"}>
            <Field.Label fontWeight={"400"} fontSize={"14px"}>
              Email Address/Username *
            </Field.Label>
            <Input
              {...register("login")}
              placeholder="Enter email address"
              maxH={"45px"}
              borderRadius={"7px"}
              borderWidth={"2px"}
              borderColor="#292929"
            />
            <Field.ErrorText>{errors.login?.message}</Field.ErrorText>
          </Field.Root>

          {/* Password Field */}
          <Field.Root invalid={!!errors.password} w={"full"}>
            <Field.Label fontWeight={"400"} fontSize={"14px"}>
              Password *
            </Field.Label>
            <PasswordInput
              {...register("password")}
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
<Link href='/dashboard'>
<SignUpButton type="submit">Sign Up</SignUpButton>

</Link>
            
            <SeparatorText />

            <SignUpButton>
              <GoogleIcon maxW={"20px"} maxH={"20px"} />
              <Text fontSize={"14px"} fontWeight={"600"}>
                Sign Up With Google
              </Text>
            </SignUpButton>

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

export default SignUpForm;
"use client";

import { toaster } from "@/components/ui/toaster";
import { OrgRole, Role } from "@/entities/CustomSession";
import { authClient } from "@/lib/authClient";
import {
  Box,
  Button,
  Field,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { PasswordInput } from "../../components/ui/password-input";
import { GoogleIcon } from "./GoogleIcon";
import LinkText from "./LinkText";
import SeparatorText from "./SeparatorText";

const SignUpForm = () => {
  const router = useRouter();
  const [isEmailPending, startEmailTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  const handleEmailSignup = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // extract form data
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    // validate form
    if (!(email && name && password))
      return toaster.create({
        title: "Incomplete form!",
        description: "All fields are required",
        type: "error",
      });

    startEmailTransition(async () => {
      await authClient.signUp.email(
        { name, email, password },
        {
          onSuccess: async (ctx) => signupSuccess(router),
          onError: (ctx) => {
            toaster.create({
              title: "Signup failed",
              description: ctx.error.message,
              type: "error",
            });
          },
        },
      );
    });
  };

  const handleGoogleSignup = () => {
    startGoogleTransition(async () => {
      await authClient.signIn.social(
        { provider: "google" },
        {
          onSuccess: async (ctx) => signupSuccess(router),
          onError: (ctx) => {
            toaster.create({
              title: "Google sign in failed",
              description: ctx.error.message,
              type: "error",
            });
          },
        },
      );
    });
  };

  return (
    <Box w={"full"}>
      <form onSubmit={handleEmailSignup} style={{ width: "100%" }}>
        <Stack gap={4} w={"full"}>
          {/* Full Name Field */}
          <Field.Root w={"full"}>
            <Field.Label fontWeight={"400"} fontSize={"14px"}>
              Full Name *
            </Field.Label>
            <Input
              name="name"
              placeholder="Enter your full name"
              maxH={"45px"}
              borderRadius={"7px"}
              borderWidth={"2px"}
              borderColor="#292929"
              bg="white"
              color="black"
              _placeholder={{ color: "gray.500" }}
            />
          </Field.Root>

          {/* Email Field */}
          <Field.Root w={"full"}>
            <Field.Label fontWeight={"400"} fontSize={"14px"}>
              Email Address *
            </Field.Label>
            <Input
              name="email"
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
          </Field.Root>

          {/* Password Field */}
          <Field.Root w={"full"}>
            <Field.Label fontWeight={"400"} fontSize={"14px"}>
              Password *
            </Field.Label>
            <PasswordInput
              name="password"
              placeholder="Enter password"
              maxH={"45px"}
              borderRadius={"7px"}
              borderWidth={"2px"}
              color="black"
              bg="white"
              borderColor={"#292929"}
              _placeholder={{ color: "gray.500" }}
            />
          </Field.Root>

          {/* Buttons */}
          <VStack w={"full"}>
            <Button
              type="submit"
              loading={isEmailPending}
              loadingText="Signing up..."
              w="full"
              h="45px"
              bg="white"
              color="black"
              _hover={{ bg: "gray.200" }}
              borderRadius="7px"
              fontWeight="600"
              disabled={isEmailPending}
            >
              Sign Up
            </Button>

            <SeparatorText />

            <Button
              type="button"
              onClick={handleGoogleSignup}
              loading={isGooglePending}
              variant="outline"
              w="full"
              h="45px"
              borderRadius="7px"
              borderWidth="2px"
              borderColor="#292929"
              color="white"
              bg="transparent"
              _hover={{ bg: "whiteAlpha.50" }}
              disabled={isGooglePending}
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
              <LinkText>Sign In</LinkText>
            </HStack>
          </VStack>
        </Stack>
      </form>
    </Box>
  );
};

export default SignUpForm;

const signupSuccess = async (router: AppRouterInstance) => {
  const { data: session, error } = await authClient.getSession();
  if (error) {
    toaster.create({
      title: "No session found",
      description: error.message,
      type: "error",
    });
    return;
  }

  // redirect to the dashboard
  if (session.user.role === Role.admin) {
    return router.push("/overwatch");
  }
  if (session.member?.role === OrgRole.customer) {
    return router.push("/store");
  }
  if (session.member?.role === OrgRole.vendor) {
    return router.push("/vendor");
  }
  router.push("/business");
};

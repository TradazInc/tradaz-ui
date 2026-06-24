"use client";

import { authService } from "@/services/auth/authService";
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
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { PasswordInput } from "../../components/ui/password-input";
import { GoogleIcon } from "./GoogleIcon";
import LinkText from "./LinkText";
import SeparatorText from "./SeparatorText";

const SignInForm = () => {
  const router = useRouter();
  const [isEmailPending, startEmailTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  const handleEmailSignin = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startEmailTransition(async () => {
      await authService.emailSignIn(formData, router);
    });
  };

  const handleGoogleSignIn = () => {
    startGoogleTransition(async () => {
      await authService.googleSignIn(router);
    });
  };

  return (
    <Box w={"full"}>
      <form onSubmit={handleEmailSignin} style={{ width: "100%" }}>
        <Stack gap={4} w={"full"}>
          {/* Full Name Field */}
          <Field.Root w={"full"}>
            <Field.Label fontWeight={"400"} fontSize={"14px"}>
              Email <Field.RequiredIndicator />
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
              Password <Field.RequiredIndicator />
            </Field.Label>
            <PasswordInput
              name="password"
              placeholder="Enter password"
              maxH={"45px"}
              borderRadius={"7px"}
              borderWidth={"2px"}
              borderColor={"#292929"}
              bg="white"
              color="black"
              _placeholder={{ color: "gray.500" }}
            />
          </Field.Root>

          {/* Buttons */}
          <VStack w={"full"}>
            <Box w={"full"} textAlign={"right"}>
              <LinkText>Forgot Password?</LinkText>
            </Box>

            <Button
              type="submit"
              loading={isEmailPending}
              loadingText="Signing in..."
              w="full"
              h="45px"
              bg="white"
              color="black"
              _hover={{ bg: "gray.200" }}
              borderRadius="7px"
              fontWeight="600"
              disabled={isEmailPending}
            >
              {isEmailPending ? "Signing in..." : "Sign in"}
            </Button>

            <SeparatorText />

            <Button
              type="button"
              onClick={handleGoogleSignIn}
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

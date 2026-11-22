"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { useEmailSignin, useGoogleSignin } from "@/hooks/auth";
import { EmailSignInSchema } from "@/schema/auth";
import { destination } from "@/utilities/destination";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { Box, Button, Field, Fieldset, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import SeparatorText from "./SeparatorText";

interface Props {
  redirectTo?: string;
}

const SignInForm = ({ redirectTo = "/merchant" }: Props) => {
  const { trigger: emailTrigger, isMutating: emailMutating } = useEmailSignin();
  const { trigger, isMutating } = useGoogleSignin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ resolver: zodResolver(EmailSignInSchema) });

  const onSubmit = handleSubmit(async (signInData) => {
    const promise = toaster.promise(emailTrigger({ signInData }), {
      loading: { title: "Logging in…", description: "Please wait" },
      success: (session) => ({
        title: "Login successful",
        description: `Welcome ${session.user.name}`,
      }),
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
      // full load so the section layout's guard reads the new session cookie
      window.location.assign(destination(redirectTo));
    } catch {} // Error displayed by toaster
  });

  const handleGoogleSignIn = async () => {
    const callbackURL = `${window.location.origin}${destination(redirectTo)}`;
    const promise = toaster.promise(trigger(callbackURL), {
      loading: { title: "Redirecting…", description: "Please wait" },
      success: {
        title: "Redirect successful",
        description: "Continue with Google",
      },
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
    } catch {} // Error displayed by toaster
  };

  return (
    <Fieldset.Root size={"lg"} maxW={"lg"}>
      <Fieldset.Content>
        <Field.Root required invalid={!!errors.email}>
          <Field.Label>Email Address</Field.Label>
          <Input
            type={"email"}
            {...register("email")}
            placeholder={"Enter your email"}
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <PasswordInput
            {...register("password")}
            placeholder={"Enter your password"}
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>
      </Fieldset.Content>
      <Box textAlign="right" w="full">
        <Link href={"#"}>Forgot Password?</Link>
      </Box>
      <Button
        onClick={onSubmit}
        loading={emailMutating}
        disabled={!isValid || isSubmitting || emailMutating || isMutating}
        w={"full"}
      >
        Sign In
      </Button>

      <SeparatorText>Or</SeparatorText>

      <Button
        type={"button"}
        onClick={handleGoogleSignIn}
        loading={isMutating}
        disabled={isMutating || emailMutating}
        w={"full"}
      >
        <FcGoogle />
        <Text>Sign In With Google</Text>
      </Button>
    </Fieldset.Root>
  );
};

export default SignInForm;

"use client";

import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { useEmailSignup, useGoogleSignin } from "@/hooks/auth";
import { EmailSignUpSchema } from "@/schema/auth";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { Button, Field, Fieldset, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Options, passwordStrength } from "check-password-strength";
import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import SeparatorText from "./SeparatorText";

const strengthOptions: Options<string> = [
  { id: 1, value: "weak", minDiversity: 0, minLength: 0 },
  { id: 2, value: "medium", minDiversity: 2, minLength: 6 },
  { id: 3, value: "strong", minDiversity: 3, minLength: 8 },
  { id: 4, value: "very-strong", minDiversity: 4, minLength: 10 },
];

interface Props {
  redirectTo?: string;
}

const SignUpForm = ({ redirectTo = "/merchant?signup=true" }: Props) => {
  const { trigger: emailTrigger, isMutating: emailMutating } = useEmailSignup();
  const { trigger, isMutating } = useGoogleSignin();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ resolver: zodResolver(EmailSignUpSchema) });

  const password = useWatch({ control, name: "password" });

  const strength = useMemo(() => {
    if (!password) return 0;
    const result = passwordStrength(password, strengthOptions);
    return result.id;
  }, [password]);

  const onSubmit = handleSubmit(async (signUpData) => {
    const promise = toaster.promise(emailTrigger({ signUpData }), {
      loading: { title: "Signing up…", description: "Please wait" },
      success: (session) => ({
        title: "Signup successful",
        description: `Welcome ${session.user.name}`,
      }),
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
      // full load so the section layout's guard reads the new session cookie
      window.location.assign(redirectTo); // review after emailVerification
    } catch {} // Error displayed by toaster
  });

  const handleGoogleSignup = async () => {
    const callbackURL = `${window.location.origin}${redirectTo}`;
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
        <Field.Root required invalid={!!errors.name}>
          <Field.Label>Full Name</Field.Label>
          <Input {...register("name")} placeholder={"Enter your full name"} />
          <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid={!!errors.email}>
          <Field.Label>Email Address</Field.Label>
          <Input
            type={"email"}
            {...register("email")}
            placeholder={"e.g., example@email.com"}
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid={!!errors.password}>
          <Stack gap={3} w={"full"}>
            <Field.Label>Password</Field.Label>
            <PasswordInput
              {...register("password")}
              placeholder={"Minimum 5 characters"}
            />
            <PasswordStrengthMeter value={strength} />
          </Stack>
          <Field.HelperText></Field.HelperText>
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>
      </Fieldset.Content>

      <Button
        onClick={onSubmit}
        loading={emailMutating}
        disabled={!isValid || isSubmitting || emailMutating || isMutating}
        w={"full"}
      >
        Sign Up
      </Button>

      <SeparatorText>Or</SeparatorText>

      <Button
        type={"button"}
        onClick={handleGoogleSignup}
        loading={isMutating}
        disabled={isMutating || emailMutating}
        w={"full"}
      >
        <FcGoogle />
        <Text>Sign Up With Google</Text>
      </Button>
    </Fieldset.Root>
  );
};

export default SignUpForm;

"use client";

import { CreateBusinessInputData } from "@/schema/business";
import {
  Field,
  Fieldset,
  HStack,
  Input,
  InputGroup,
  Spinner,
} from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";

interface Props {
  form: UseFormReturn<CreateBusinessInputData>;
}

const ContactStep = ({
  form: {
    register,
    formState: { errors, validatingFields },
  },
}: Props) => {
  const withMask = useHookFormMask(register);
  const isCheckingSlug = !!validatingFields.slug;

  return (
    <Fieldset.Root>
      <Field.Root required invalid={!isCheckingSlug && !!errors.slug}>
        <Field.Label>
          Subdomain <Field.RequiredIndicator />
        </Field.Label>
        <InputGroup
          startAddon={"www."}
          endAddon={
            <HStack gap={2}>
              {isCheckingSlug && <Spinner size={"xs"} />}
              .tradaz.com
            </HStack>
          }
        >
          <Input placeholder="yoursite" {...register("slug")} />
        </InputGroup>
        <Field.HelperText>
          {isCheckingSlug
            ? "Checking availability…"
            : "Pick a subdomain for your business website"}
        </Field.HelperText>
        <Field.ErrorText>
          <Field.ErrorIcon />
          {errors.slug?.message}
        </Field.ErrorText>
      </Field.Root>

      <Field.Root required invalid={!!errors.address}>
        <Field.Label>
          Address <Field.RequiredIndicator />
        </Field.Label>
        <Input
          placeholder="e.g., 123 Main St, Lekki, Lagos"
          {...register("address")}
        />
        <Field.HelperText>Address of business main branch</Field.HelperText>
        <Field.ErrorText>{errors.address?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root required invalid={!!errors.phone}>
        <Field.Label>
          Phone <Field.RequiredIndicator />
        </Field.Label>
        <Input
          placeholder="0812-345-6789"
          {...withMask("phone", "9999-999-9999", {
            autoUnmask: true,
          })}
        />
        <Field.HelperText>Contact number of business</Field.HelperText>
        <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
      </Field.Root>
    </Fieldset.Root>
  );
};

export default ContactStep;

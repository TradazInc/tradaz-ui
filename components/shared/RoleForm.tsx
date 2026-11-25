"use client";

import { toaster } from "@/components/ui/toaster";
import { useAddRole } from "@/hooks/role";
import { CreateRoleInputSchema, emptyRole } from "@/schema/role";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Button,
  createOverlay,
  Dialog,
  Field,
  Fieldset,
  Input,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import FormButton from "./FormButton";
import { PermissionPicker } from "./PermissionPicker";
import { orgStatements } from "@/lib/organizationAc";

export const roleDialog = createOverlay((props) => {
  const { businessId } = useParams<{ businessId?: string }>();
  const { trigger, isMutating } = useAddRole(businessId);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(CreateRoleInputSchema),
    defaultValues: emptyRole,
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (roleData) => {
    const promise = toaster.promise(trigger(roleData), {
      loading: { title: "Creating role...", description: "Please wait" },
      success: () => ({
        title: "Creation successful",
        description: `${roleData.role} role has been created`,
      }),
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
      props.onOpenChange?.({ open: false });
    } catch {} // Error displayed by toaster
  });

  return (
    <Dialog.Root {...props} size={"xl"} lazyMount scrollBehavior={"inside"}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body>
              <Fieldset.Root
                w={"full"}
                size={"lg"}
                mx={"auto"}
                px={{ base: 4, md: 0 }}
                maxW={{ base: "full", md: "2xl", xl: "4xl" }}
              >
                <Stack>
                  <Fieldset.Legend>Roles</Fieldset.Legend>
                  <Fieldset.HelperText>
                    Name the role and pick what members with it can do.
                  </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                  <Field.Root required invalid={!!errors.role}>
                    <Field.Label>
                      Name <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      placeholder="e.g., sales-manager"
                      {...register("role")}
                    />
                    <Field.HelperText>
                      Lowercase letters, numbers and hyphens
                    </Field.HelperText>
                    <Field.ErrorText>{errors.role?.message}</Field.ErrorText>
                  </Field.Root>

                  <Controller
                    control={control}
                    name="permission"
                    render={({ field }) => (
                      <Field.Root
                        required
                        invalid={!!errors.permission}
                        disabled={field.disabled}
                      >
                        <Field.Label>
                          Permissions <Field.RequiredIndicator />
                        </Field.Label>
                        <PermissionPicker
                          statements={orgStatements}
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          disabled={field.disabled}
                          invalid={!!errors.permission}
                        />
                        <Field.ErrorText>
                          {errors.permission?.message ??
                            errors.permission?.root?.message}
                        </Field.ErrorText>
                      </Field.Root>
                    )}
                  />
                </Fieldset.Content>

                <Button
                  onClick={onSubmit}
                  variant={"outline"}
                  alignSelf={"flex-start"}
                  disabled={!isValid || isSubmitting || isMutating}
                  loading={isSubmitting || isMutating}
                >
                  Submit
                </Button>
              </Fieldset.Root>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

export const RoleForm = () => {
  return (
    <FormButton onClick={() => roleDialog.open("role-form", {})}>
      <LuPlus />
      New Role
    </FormButton>
  );
};

export const RoleFormViewport = roleDialog.Viewport;

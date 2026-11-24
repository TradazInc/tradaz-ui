"use client";

import { toaster } from "@/components/ui/toaster";
import { useSendInvitation } from "@/hooks/invitation";
import { useStores } from "@/hooks/store";
import {
  CreateInvitationInputSchema,
  emptyInvitation,
} from "@/schema/invitation";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Button,
  ButtonProps,
  createListCollection,
  createOverlay,
  Dialog,
  Field,
  Fieldset,
  Input,
  Portal,
  Select,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { LuUserPlus } from "react-icons/lu";
import FormButton from "./FormButton";
import RoleSelect from "./RoleSelect";

export const invitationDialog = createOverlay((props) => {
  const { businessId } = useParams<{ businessId?: string }>();
  const { trigger, isMutating } = useSendInvitation(businessId);

  const { data, isLoading, error, mutate } = useStores(businessId);
  const storeCollection = useMemo(
    () =>
      createListCollection({
        items: data ?? [],
        itemToValue: (item) => item.id,
        itemToString: (item) => item.name,
      }),
    [data],
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(CreateInvitationInputSchema),
    defaultValues: emptyInvitation,
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (invitationData) => {
    const promise = toaster.promise(trigger(invitationData), {
      loading: { title: "Sending invitation...", description: "Please wait" },
      success: {
        title: "Invitation sent",
        description: `Invitation sent to ${invitationData.email}`,
      },
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
      props.onOpenChange?.({ open: false });
    } catch {} // Error displayed by toaster
  });

  return (
    <Dialog.Root {...props} size={"lg"} lazyMount>
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
                  <Fieldset.Legend>Invite staff</Fieldset.Legend>
                  <Fieldset.HelperText>
                    An invitation link will be sent to this email address.
                  </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                  <Field.Root required invalid={!!errors.email}>
                    <Field.Label>
                      Email <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="email"
                      placeholder="e.g., jane@example.com"
                      {...register("email")}
                    />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root required invalid={!!errors.role}>
                    <Field.Label>
                      Role <Field.RequiredIndicator />
                    </Field.Label>
                    <Controller
                      control={control}
                      name={"role"}
                      render={({ field }) => (
                        <RoleSelect
                          businessId={businessId}
                          name={field.name}
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                      )}
                    />
                    <Field.HelperText>
                      Determines what the staff member can access
                    </Field.HelperText>
                    <Field.ErrorText>{errors.role?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.teamId || !!error}>
                    <Field.Label>Branch</Field.Label>
                    <Controller
                      control={control}
                      name={"teamId"}
                      render={({ field }) => (
                        <Select.Root
                          name={field.name}
                          value={field.value ? [field.value] : []}
                          onValueChange={({ value }) => {
                            field.onChange(value[0] || undefined);
                            field.onBlur();
                          }}
                          onInteractOutside={() => field.onBlur()}
                          collection={storeCollection}
                        >
                          <Select.HiddenSelect />
                          <Select.Control>
                            <Select.Trigger>
                              <Select.ValueText placeholder="Select branch" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.ClearTrigger />
                              {isLoading ? (
                                <Spinner size="sm" />
                              ) : (
                                <Select.Indicator />
                              )}
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content>
                                {storeCollection.items.map((store) => (
                                  <Select.Item item={store} key={store.id}>
                                    {store.name}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Portal>
                        </Select.Root>
                      )}
                    />
                    {error && (
                      <Button
                        w={"full"}
                        size={"sm"}
                        variant={"subtle"}
                        onClick={() => mutate()}
                      >
                        Click to retry
                      </Button>
                    )}
                    <Field.HelperText>
                      Branch the staff member will be assigned to
                    </Field.HelperText>
                    <Field.ErrorText>
                      {error
                        ? "Branches unavailable. Retry to continue."
                        : errors.teamId?.message}
                    </Field.ErrorText>
                  </Field.Root>
                </Fieldset.Content>

                <Button
                  onClick={onSubmit}
                  variant={"outline"}
                  alignSelf={"flex-start"}
                  disabled={!isValid || isSubmitting || isMutating}
                  loading={isSubmitting || isMutating}
                >
                  Send invitation
                </Button>
              </Fieldset.Root>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

export const InvitationForm = (props: ButtonProps) => {
  return (
    <FormButton
      {...props}
      onClick={() => {
        invitationDialog.open("invitation-form", {});
      }}
    >
      <LuUserPlus />
      Invite Staff
    </FormButton>
  );
};

export const InvitationFormViewport = invitationDialog.Viewport;

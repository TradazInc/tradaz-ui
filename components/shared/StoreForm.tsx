"use client";

import { toaster } from "@/components/ui/toaster";
import { useAddStore } from "@/hooks/store";
import { CreateStoreInputSchema } from "@/schema/store";
import { computePath } from "@/utilities/computePath";
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
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import FormButton from "./FormButton";

export const storeDialog = createOverlay((props) => {
  const { businessId } = useParams<{ businessId?: string }>();
  const { trigger, isMutating } = useAddStore(businessId);
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(CreateStoreInputSchema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (storeData) => {
    const promise = toaster.promise(trigger(storeData), {
      loading: { title: "Setting up branch...", description: "Please wait" },
      success: (store) => ({
        title: "Setup successful",
        description: `${store.name} branch has been created`,
      }),
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      const store = await promise.unwrap();
      push(computePath(businessId, store.id));
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
                  <Fieldset.Legend>Branch details</Fieldset.Legend>
                  <Fieldset.HelperText>
                    Please provide your branch details below.
                  </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                  <Field.Root required invalid={!!errors.name}>
                    <Field.Label>
                      Name <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      placeholder="e.g., Tradaz Lekki Lagos"
                      {...register("name")}
                    />
                    <Field.HelperText>
                      Name of the branch under selected business
                    </Field.HelperText>
                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root required invalid={!!errors.address}>
                    <Field.Label>
                      Address <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      placeholder="e.g., 123 Main St, Lekki, Lagos"
                      {...register("address")}
                    />
                    <Field.HelperText>Address of branch</Field.HelperText>
                    <Field.ErrorText>{errors.address?.message}</Field.ErrorText>
                  </Field.Root>
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

export const StoreForm = () => {
  return (
    <FormButton
      onClick={() => {
        storeDialog.open("store-form", {});
      }}
    >
      <LuPlus />
      New Branch
    </FormButton>
  );
};

export const StoreFormViewport = storeDialog.Viewport;

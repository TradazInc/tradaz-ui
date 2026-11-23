"use client";

import { toaster } from "@/components/ui/toaster";
import { useAddShippingConfig } from "@/hooks/shippingConfig";
import {
  CreateShippingConfigInputData,
  CreateShippingConfigInputSchema,
  emptyShippingConfig,
  emptyShippingMethod,
} from "@/schema/shippingConfig";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Button,
  ButtonProps,
  createOverlay,
  Dialog,
  Field,
  Fieldset,
  HStack,
  IconButton,
  Input,
  NumberInput,
  Portal,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useParams } from "next/navigation";
import { Control, Controller, useFieldArray, useForm } from "react-hook-form";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import FormButton from "./FormButton";

type NumericMethodField = "price" | "deliveryDaysMin" | "deliveryDaysMax";

interface NumberFieldProps {
  control: Control<CreateShippingConfigInputData>;
  name: `shippingMethods.${number}.${NumericMethodField}`;
  step: number;
}

const NumberField = ({ control, name, step }: NumberFieldProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <NumberInput.Root
        min={0}
        step={step}
        w={"full"}
        name={field.name}
        disabled={field.disabled}
        value={field.value?.toString()}
        onValueChange={({ valueAsNumber }) =>
          field.onChange(Number.isNaN(valueAsNumber) ? 0 : valueAsNumber)
        }
      >
        <NumberInput.Control />
        <NumberInput.Input onBlur={field.onBlur} />
      </NumberInput.Root>
    )}
  />
);

export const shippingConfigDialog = createOverlay((props) => {
  const { businessId } = useParams<{ businessId?: string }>();
  const { trigger, isMutating } = useAddShippingConfig(businessId);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(CreateShippingConfigInputSchema),
    defaultValues: emptyShippingConfig,
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "shippingMethods",
  });

  const onSubmit = handleSubmit(async (shippingConfigData) => {
    const promise = toaster.promise(trigger(shippingConfigData), {
      loading: {
        title: "Creating shipping config...",
        description: "Please wait",
      },
      success: (shippingConfig) => ({
        title: "Creation successful",
        description: `${shippingConfig.carrier} shipping config has been created`,
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
    <Dialog.Root {...props} size={"xl"} lazyMount>
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
                  <Fieldset.Legend>Shipping config details</Fieldset.Legend>
                  <Fieldset.HelperText>
                    Please provide the carrier and its shipping methods below.
                  </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                  <Field.Root required invalid={!!errors.carrier}>
                    <Field.Label>
                      Carrier <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="e.g., DHL" {...register("carrier")} />
                    <Field.ErrorText>{errors.carrier?.message}</Field.ErrorText>
                  </Field.Root>
                </Fieldset.Content>

                <Fieldset.Root invalid={!!errors.shippingMethods?.root?.message}>
                  <Fieldset.Legend>Shipping methods</Fieldset.Legend>
                  {fields.map((field, index) => {
                    const methodErrors = errors.shippingMethods?.[index];
                    return (
                      <HStack
                        p={4}
                        key={field.id}
                        borderWidth={"thin"}
                        borderRadius={"md"}
                        alignItems={"end"}
                      >
                        <SimpleGrid
                          flex={1}
                          gap={4}
                          columns={{ base: 1, md: 2, xl: 4 }}
                        >
                          <Field.Root required invalid={!!methodErrors?.name}>
                            <Field.Label>
                              Name <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                              placeholder="e.g., Express"
                              {...register(`shippingMethods.${index}.name`)}
                            />
                            <Field.ErrorText>
                              {methodErrors?.name?.message}
                            </Field.ErrorText>
                          </Field.Root>

                          <Field.Root required invalid={!!methodErrors?.price}>
                            <Field.Label>
                              Price <Field.RequiredIndicator />
                            </Field.Label>
                            <NumberField
                              control={control}
                              name={`shippingMethods.${index}.price`}
                              step={0.01}
                            />
                            <Field.ErrorText>
                              {methodErrors?.price?.message}
                            </Field.ErrorText>
                          </Field.Root>

                          <Field.Root
                            required
                            invalid={!!methodErrors?.deliveryDaysMin}
                          >
                            <Field.Label>
                              Min days <Field.RequiredIndicator />
                            </Field.Label>
                            <NumberField
                              control={control}
                              name={`shippingMethods.${index}.deliveryDaysMin`}
                              step={1}
                            />
                            <Field.ErrorText>
                              {methodErrors?.deliveryDaysMin?.message}
                            </Field.ErrorText>
                          </Field.Root>

                          <Field.Root
                            required
                            invalid={!!methodErrors?.deliveryDaysMax}
                          >
                            <Field.Label>
                              Max days <Field.RequiredIndicator />
                            </Field.Label>
                            <NumberField
                              control={control}
                              name={`shippingMethods.${index}.deliveryDaysMax`}
                              step={1}
                            />
                            <Field.ErrorText>
                              {methodErrors?.deliveryDaysMax?.message}
                            </Field.ErrorText>
                          </Field.Root>
                        </SimpleGrid>

                        <IconButton
                          size="sm"
                          type="button"
                          variant="subtle"
                          aria-label="Remove shipping method"
                          onClick={() => remove(index)}
                        >
                          <LuTrash2 />
                        </IconButton>
                      </HStack>
                    );
                  })}

                  <Button
                    size="sm"
                    type="button"
                    variant="outline"
                    alignSelf="flex-start"
                    onClick={() => append(emptyShippingMethod)}
                  >
                    <LuPlus /> Add method
                  </Button>

                  <Fieldset.ErrorText>
                    {errors.shippingMethods?.root?.message}
                  </Fieldset.ErrorText>
                </Fieldset.Root>

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

export const ShippingConfigForm = (props: ButtonProps) => {
  return (
    <FormButton
      {...props}
      onClick={() => {
        shippingConfigDialog.open("shipping-config-form", {});
      }}
    >
      <LuPlus />
      New Shipping Config
    </FormButton>
  );
};

export const ShippingConfigFormViewport = shippingConfigDialog.Viewport;

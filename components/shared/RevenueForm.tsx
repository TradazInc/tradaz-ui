"use client";

import { toaster } from "@/components/ui/toaster";
import { MAX_FILE_SIZE } from "@/data/constants";
import { useAddRevenue } from "@/hooks/revenue";
import { useStores } from "@/hooks/store";
import { CreateRevenueInputSchema, emptyRevenue } from "@/schema/revenue";
import { computePath } from "@/utilities/computePath";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Button,
  createListCollection,
  Field,
  Fieldset,
  Input,
  NumberInput,
  Portal,
  Select,
  Spinner,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import FormInputGrid from "./FormInputGrid";
import HeaderText from "./HeaderText";
import { UploadDialog } from "./UploadDialog";

const RevenueForm = () => {
  const { businessId } = useParams<{ businessId?: string }>();
  const { trigger, isMutating } = useAddRevenue(businessId);
  const { data, isLoading, error, mutate } = useStores(businessId);
  const { push } = useRouter();

  const storeCollection = useMemo(
    () =>
      createListCollection({
        items: data ?? [],
        itemToValue: (item) => item?.id,
        itemToString: (item) => item.name,
      }),
    [data],
  );

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(CreateRevenueInputSchema),
    defaultValues: emptyRevenue,
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (revenueData) => {
    const promise = toaster.promise(trigger(revenueData), {
      loading: {
        title: "Creating revenue...",
        description: "Please wait",
      },
      success: (revenue) => ({
        title: "Creation successful",
        description: `${revenue.name} revenue has been created`,
      }),
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
      reset(emptyRevenue);
      push(`${computePath(businessId)}/revenue`);
    } catch {} // Error displayed by toaster
  });

  return (
    <Fieldset.Root
      w={"full"}
      size={"lg"}
      mx={"auto"}
      px={{ base: 4, md: 0 }}
      maxW={{ base: "full", md: "2xl", xl: "4xl" }}
    >
      <Stack>
        <Fieldset.Legend asChild>
          <HeaderText>Revenue</HeaderText>
        </Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide the revenue details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Controller
          control={control}
          name={"recieptUrl"}
          render={({ field, fieldState }) => (
            <Field.Root required invalid={!!fieldState.error}>
              <Field.Label>
                Receipt <Field.RequiredIndicator />
              </Field.Label>
              <UploadDialog
                maxFiles={1}
                maxFileSize={MAX_FILE_SIZE}
                disabled={field.disabled}
                value={field.value ? [field.value] : []}
                onUpload={(url) => {
                  field.onChange(url);
                  field.onBlur();
                }}
              />
              {field.value && (
                <Button
                  w={"full"}
                  size={"sm"}
                  type={"button"}
                  variant={"subtle"}
                  onClick={() => {
                    field.onChange("");
                    field.onBlur();
                  }}
                >
                  Remove receipt
                </Button>
              )}
              <Field.HelperText>
                Upload a photo of the revenue receipt
              </Field.HelperText>
              <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
            </Field.Root>
          )}
        />

        <FormInputGrid>
          <Field.Root required invalid={!!errors.name}>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="e.g., Branch sponsor" {...register("name")} />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.amount}>
            <Field.Label>
              Amount <Field.RequiredIndicator />
            </Field.Label>
            <Controller
              control={control}
              name={"amount"}
              render={({ field }) => (
                <NumberInput.Root
                  min={0}
                  step={0.01}
                  w={"full"}
                  name={field.name}
                  disabled={field.disabled}
                  formatOptions={{
                    style: "currency",
                    currency: "NGN",
                    currencyDisplay: "narrowSymbol",
                    currencySign: "accounting",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }}
                  value={
                    Number.isNaN(field.value) ? "" : field.value.toString()
                  }
                  onValueChange={({ valueAsNumber }) =>
                    field.onChange(valueAsNumber)
                  }
                >
                  <NumberInput.Control />
                  <NumberInput.Input onBlur={field.onBlur} />
                </NumberInput.Root>
              )}
            />
            <Field.ErrorText>{errors.amount?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.teamId || error}>
            <Field.Label>Branch</Field.Label>
            <Controller
              control={control}
              name={"teamId"}
              render={({ field }) => (
                <Select.Root
                  name={field.name}
                  disabled={field.disabled}
                  value={field.value ? [field.value] : []}
                  onValueChange={({ value }) => {
                    field.onChange(value[0]);
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
                      {isLoading ? <Spinner size="sm" /> : <Select.Indicator />}
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
                type={"button"}
                variant={"subtle"}
                loading={isLoading}
                onClick={() => mutate()}
              >
                Click to retry
              </Button>
            )}
            <Field.HelperText>
              Branch the revenue belongs to. Leave empty for a business wide
              revenue
            </Field.HelperText>
            <Field.ErrorText>
              {error
                ? "Branches unavailable. Retry to continue."
                : errors.teamId?.message}
            </Field.ErrorText>
          </Field.Root>
        </FormInputGrid>

        <Field.Root required invalid={!!errors.description}>
          <Field.Label>
            Description <Field.RequiredIndicator />
          </Field.Label>
          <Textarea
            autoresize
            placeholder="e.g., Rent for the month of March"
            {...register("description")}
          />
          <Field.HelperText>
            A short description of the revenue
          </Field.HelperText>
          <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
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
  );
};

export default RevenueForm;

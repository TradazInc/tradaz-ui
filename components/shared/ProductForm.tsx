"use client";

import { toaster } from "@/components/ui/toaster";
import { MAX_FILE_SIZE, MAX_FILES } from "@/data/constants";
import { useAddProduct } from "@/hooks/product";
import { useProductCategories } from "@/hooks/productCategory";
import { useSizeTypes } from "@/hooks/sizeType";
import { Gender } from "@/schema/enums";
import {
  CreateProductInputSchema,
  emptyProduct,
  formProduct,
  GetProductOutputData,
} from "@/schema/product";
import { computePath } from "@/utilities/computePath";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { parseCursorData } from "@/utilities/parsePageData";
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
  Textarea,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useParams, useRouter } from "next/navigation";
import { useId, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroll-component";
import FormInputGrid from "./FormInputGrid";
import HeaderText from "./HeaderText";
import {
  ProductCategoryForm,
  ProductCategoryFormViewport,
} from "./ProductCategoryForm";
import { ProductSizeForm, ProductSizeFormViewport } from "./ProductSizeForm";
import TotalQuantityStat from "./TotalQuantityStat";
import { UploadDialog } from "./UploadDialog";
import VariationField from "./VariationField";

interface Props {
  product?: GetProductOutputData;
}

const ProductForm = ({ product }: Props) => {
  const { businessId } = useParams<{ businessId?: string }>();
  const { trigger, isMutating } = useAddProduct(businessId);
  const categories = useProductCategories(businessId);
  const sizeTypes = useSizeTypes(businessId);
  const { push } = useRouter();
  const categoryScrollId = useId();
  const sizetypeScrollId = useId();

  // Parse paged data
  const parsedCategories = useMemo(
    () => parseCursorData(categories.data),
    [categories.data],
  );
  const parsedSizeTypes = useMemo(
    () => parseCursorData(sizeTypes.data),
    [sizeTypes.data],
  );

  // Create collection data (chakra)
  const categoryCollection = useMemo(
    () =>
      createListCollection({
        items: parsedCategories.flatData,
        itemToValue: (item) => item?.id,
        itemToString: (item) => item.name,
      }),
    [parsedCategories.flatData],
  );
  const sizeTypeCollection = useMemo(
    () =>
      createListCollection({
        items: parsedSizeTypes.flatData,
        itemToValue: (item) => item?.id,
        itemToString: (item) => item.name,
      }),
    [parsedSizeTypes.flatData],
  );
  const genderCollection = useMemo(
    () =>
      createListCollection({
        items: [
          { label: "Male", value: Gender.male },
          { label: "Female", value: Gender.female },
          { label: "Unisex", value: Gender.unisex },
        ],
      }),
    [],
  );

  const {
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(CreateProductInputSchema),
    defaultValues: product ? formProduct(product) : emptyProduct,
    mode: "onBlur",
  });

  // Clear sizes when size type changes
  const clearVariationSizes = () =>
    getValues("variations").forEach((_, index) =>
      setValue(`variations.${index}.sizeId`, "", { shouldValidate: true }),
    );

  const onSubmit = handleSubmit(async (productData) => {
    const promise = toaster.promise(trigger(productData), {
      loading: { title: "Creating product...", description: "Please wait" },
      success: (product) => ({
        title: "Creation successful",
        description: `${product.name} product has been created`,
      }),
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      const product = await promise.unwrap();
      push(`${computePath(businessId)}/products/${product.id}`);
    } catch {} // Error displayed by toaster
  });

  return (
    <Fieldset.Root
      w={"full"}
      size={"lg"}
      mx={"auto"}
      maxW={{ base: "full", md: "2xl", xl: "4xl" }}
    >
      <Fieldset.Legend asChild>
        <HeaderText>Product details</HeaderText>
      </Fieldset.Legend>
      <Fieldset.HelperText>
        Please provide your product details below.
      </Fieldset.HelperText>

      <Fieldset.Content>
        <Controller
          control={control}
          name={"images"}
          render={({ field, fieldState }) => (
            <Field.Root required invalid={!!fieldState.error}>
              <Field.Label>
                Images <Field.RequiredIndicator />
              </Field.Label>
              <UploadDialog
                maxFiles={MAX_FILES}
                maxFileSize={MAX_FILE_SIZE}
                value={field.value.map(({ url }) => url)}
                onUpload={(url) => {
                  // Read the live form state so earlier uploads are kept
                  field.onChange([...getValues("images"), { url }]);
                  field.onBlur();
                }}
              />
              <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
            </Field.Root>
          )}
        />

        <FormInputGrid>
          <Field.Root required invalid={!!errors.name}>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <Input {...register("name")} />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.brand}>
            <Field.Label>Brand</Field.Label>
            <Input {...register("brand")} />
            <Field.ErrorText>{errors.brand?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.gender}>
            <Field.Label>
              Gender <Field.RequiredIndicator />
            </Field.Label>
            <Controller
              control={control}
              name={"gender"}
              render={({ field }) => (
                <Select.Root
                  name={field.name}
                  value={[field.value]}
                  onValueChange={({ value }) => {
                    field.onChange(value[0]);
                    field.onBlur();
                  }}
                  onInteractOutside={() => field.onBlur()}
                  collection={genderCollection}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder={"Select gender"} />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {genderCollection.items.map((gender) => (
                          <Select.Item item={gender} key={gender.value}>
                            {gender.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              )}
            />
            <Field.ErrorText>{errors.gender?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.discountPercentage}>
            <Field.Label>
              Discount %
              <Field.RequiredIndicator />
            </Field.Label>
            <Controller
              control={control}
              name={"discountPercentage"}
              render={({ field }) => (
                <NumberInput.Root
                  w={"full"}
                  name={field.name}
                  disabled={field.disabled}
                  defaultValue={"0"}
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
            <Field.ErrorText>
              {errors.discountPercentage?.message}
            </Field.ErrorText>
          </Field.Root>
        </FormInputGrid>

        <Field.Root invalid={!!errors.description}>
          <Field.Label>Description</Field.Label>
          <Textarea autoresize {...register("description")} />
          <Field.HelperText>
            A short description of the product
          </Field.HelperText>
          <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
        </Field.Root>

        <FormInputGrid>
          <Field.Root required invalid={!!errors.categoryId}>
            <Field.Label>
              Product category <Field.RequiredIndicator />
            </Field.Label>
            <Controller
              control={control}
              name={"categoryId"}
              render={({ field }) => (
                <Select.Root
                  name={field.name}
                  value={[field.value]}
                  onValueChange={({ value }) => {
                    field.onChange(value[0] ?? "");
                    field.onBlur();
                  }}
                  onInteractOutside={() => field.onBlur()}
                  collection={categoryCollection}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder={"Select category"} />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.ClearTrigger />
                      {categories.isLoading ? (
                        <Spinner size="sm" />
                      ) : (
                        <Select.Indicator />
                      )}
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content id={categoryScrollId}>
                        <InfiniteScroll
                          dataLength={parsedCategories.flatData.length}
                          hasMore={parsedCategories.hasMore}
                          next={() => categories.setSize(categories.size + 1)}
                          loader={<Spinner size={"xs"} />}
                          scrollableTarget={categoryScrollId}
                        >
                          {categoryCollection.items.map((category) => (
                            <Select.Item item={category} key={category.id}>
                              {category.name}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                          <ProductCategoryForm w={"full"} variant={"subtle"} />
                        </InfiniteScroll>
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              )}
            />
            {categories.error && (
              <Button
                w={"full"}
                size={"sm"}
                type={"button"}
                variant={"subtle"}
                loading={categories.isLoading}
                onClick={() => categories.mutate()}
              >
                Click to retry
              </Button>
            )}
            <Field.HelperText>
              Create a category, then select one for this product.
            </Field.HelperText>
            <Field.ErrorText>{errors.categoryId?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.sizeTypeId}>
            <Field.Label>Product size type</Field.Label>
            <Controller
              control={control}
              name={"sizeTypeId"}
              render={({ field }) => (
                <Select.Root
                  name={field.name}
                  value={field.value ? [field.value] : []}
                  onValueChange={({ value }) => {
                    field.onChange(value[0] ?? "");
                    field.onBlur();
                    clearVariationSizes();
                  }}
                  onInteractOutside={() => field.onBlur()}
                  collection={sizeTypeCollection}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder={"Select size type"} />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.ClearTrigger />
                      {sizeTypes.isLoading ? (
                        <Spinner size="sm" />
                      ) : (
                        <Select.Indicator />
                      )}
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content id={sizetypeScrollId}>
                        <InfiniteScroll
                          dataLength={parsedSizeTypes.flatData.length}
                          hasMore={parsedSizeTypes.hasMore}
                          next={() => sizeTypes.setSize(sizeTypes.size + 1)}
                          loader={<Spinner size={"xs"} />}
                          scrollableTarget={sizetypeScrollId}
                        >
                          {sizeTypeCollection.items.map((sizeType) => (
                            <Select.Item item={sizeType} key={sizeType.id}>
                              {sizeType.name}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                          <ProductSizeForm w={"full"} variant={"subtle"} />
                        </InfiniteScroll>
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              )}
            />
            {sizeTypes.error && (
              <Button
                w={"full"}
                size={"sm"}
                type={"button"}
                variant={"subtle"}
                loading={sizeTypes.isLoading}
                onClick={() => sizeTypes.mutate()}
              >
                Click to retry
              </Button>
            )}
            <Field.HelperText>
              Create a size type if needed, then select one for this product.
            </Field.HelperText>
            <Field.ErrorText>{errors.sizeTypeId?.message}</Field.ErrorText>
          </Field.Root>
        </FormInputGrid>

        <VariationField
          control={control}
          errors={errors}
          getValues={getValues}
          isLoading={sizeTypes.isLoading}
          sizeTypes={parsedSizeTypes.flatData}
        />
      </Fieldset.Content>

      <TotalQuantityStat control={control} />

      <Button
        onClick={onSubmit}
        variant={"outline"}
        alignSelf={"flex-start"}
        loading={isSubmitting || isMutating}
        disabled={!isValid || isSubmitting || isMutating}
      >
        {product ? "Update Product" : "Create Product"}
      </Button>

      <Fieldset.ErrorText>
        Some fields are invalid. Please check them.
      </Fieldset.ErrorText>

      <ProductCategoryFormViewport />
      <ProductSizeFormViewport />
    </Fieldset.Root>
  );
};

export default ProductForm;

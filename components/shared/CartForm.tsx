"use client";

import { toaster } from "@/components/ui/toaster";
import { useAddCart, useCart, useUpdateCart } from "@/hooks/cart";
import { usePosCheckout, useWebCheckout } from "@/hooks/checkout";
import { usePosConfigs } from "@/hooks/posConfig";
import { useSubaccounts } from "@/hooks/subaccount";
import {
  CreateCartInputSchema,
  emptyCart,
  formCart,
  GetCartOutputData,
  UpdateCartInputSchema,
} from "@/schema/cart";
import { computePath } from "@/utilities/computePath";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { parseCursorData } from "@/utilities/parsePageData";
import {
  Box,
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
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useRouter } from "next/navigation";
import { useId, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroll-component";
import TotalPriceStat from "./TotalPriceStat";

interface Props {
  initialCart?: Promise<GetCartOutputData>;
  cartId: string;
  businessId: string | undefined;
  storeId: string | undefined;
}

const CartForm = ({ initialCart, businessId, storeId, cartId }: Props) => {
  const {
    data: cart,
    error,
    isLoading,
    mutate,
  } = useCart(cartId, businessId, storeId, {
    fallbackData: initialCart,
  });
  const addCart = useAddCart(businessId, storeId);
  const updateCart = useUpdateCart(businessId, storeId);
  const subaccounts = useSubaccounts(businessId);
  const posConfigs = usePosConfigs(businessId, storeId);
  const webCheckout = useWebCheckout(businessId, storeId);
  const posCheckout = usePosCheckout(businessId, storeId);
  const { push } = useRouter();

  const parsedSubaccounts = useMemo(
    () => parseCursorData(subaccounts.data),
    [subaccounts.data],
  );
  const parsedPosConfigs = useMemo(
    () => parseCursorData(posConfigs.data),
    [posConfigs.data],
  );
  const subaccountScrollId = useId();
  const posConfigScrollId = useId();

  const terminalCollection = useMemo(
    () =>
      createListCollection({
        items: parsedPosConfigs.flatData.flatMap((posConfig) =>
          posConfig.terminalConfigs.map((terminal) => ({
            ...terminal,
            gateway: posConfig.gateway,
          })),
        ),
        itemToValue: (item) => item.id,
        itemToString: (item) =>
          `${item.name ?? item.serialNumber} (${item.gateway})`,
      }),
    [posConfigs.data],
  );

  const subaccountCollection = useMemo(
    () =>
      createListCollection({
        items: parsedSubaccounts.flatData,
        itemToValue: (account) => account.id,
        itemToString: (account) => account.gateway,
      }),
    [subaccounts.data],
  );

  const {
    reset,
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isValid, isDirty, isSubmitSuccessful },
  } = useForm({
    resolver: standardSchemaResolver(
      cart ? UpdateCartInputSchema : CreateCartInputSchema,
    ),
    defaultValues: cart ? formCart(cart) : emptyCart,
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (cartData) => {
    let promise;
    if (cart) {
      promise = toaster.promise(
        updateCart.trigger({ id: cart.id, data: cartData }),
        {
          loading: {
            title: "Updating cart...",
            description: "Please wait",
          },
          success: {
            title: "Update successful",
            description: "Cart has been updated",
          },
          error: errorToastOptions,
        },
      );
    } else {
      promise = toaster.promise(addCart.trigger(cartData), {
        loading: {
          title: "Creating cart...",
          description: "Please wait",
        },
        success: {
          title: "Creation successful",
          description: "Cart has been created",
        },
        error: errorToastOptions,
      });
    }

    if (!promise) return;
    try {
      const cart = await promise.unwrap();
      reset({ ...cartData, paymentConfigId: cart.paymentConfigId ?? "" });
    } catch {} // Error displayed by toaster
  });

  const handleCheckout = async (id: string) => {
    const subaccount = getValues("paymentConfigId");
    const terminal = getValues("terminalConfigId");

    let promise;
    if (subaccount) {
      promise = toaster.promise(webCheckout.trigger({ id }), {
        loading: {
          title: "Initializing Web checkout...",
          description: "Please wait",
        },
        success: {
          title: "Checkout successful",
          description: "Order has been created",
        },
        error: errorToastOptions,
      });

      if (!promise) return;
      try {
        const session = await promise.unwrap();
        push(session.url);
      } catch {} // Error displayed by toaster
    } else if (terminal) {
      promise = toaster.promise(posCheckout.trigger({ id }), {
        loading: {
          title: "Initializing POS checkout...",
          description: "Please wait",
        },
        success: {
          title: "Checkout successful",
          description: "Order has been created",
        },
        error: errorToastOptions,
      });

      if (!promise) return;
      try {
        await promise.unwrap();
        push(`${computePath(businessId)}/sales-record`);
      } catch {} // Error displayed by toaster
    } else {
      toaster.error({
        title: "Checkout failed",
        description: "Select a payment method",
      });
    }
  };

  return (
    <Fieldset.Root p={3} w={"full"} size={"md"} borderRadius={"md"}>
      <Stack>
        <Fieldset.Legend>Checkout Summary</Fieldset.Legend>
        <Fieldset.HelperText>
          Provide relevant checkout information.
        </Fieldset.HelperText>
      </Stack>
      <Fieldset.Content>
        {cart && (
          <TotalPriceStat
            p={3}
            w={"full"}
            rounded={"md"}
            borderWidth={"1px"}
            infoText={"Total Price does not include VAT"}
            totalPrice={
              cart.cartItems.reduce(
                (total, item) => total + item.totalPrice,
                0,
              ) - (cart.depositAmount ?? 0)
            }
          />
        )}

        <Field.Root invalid={!!errors.couponCode}>
          <Field.Label>Coupon code</Field.Label>
          <Input placeholder="e.g., SAVE10" {...register("couponCode")} />
          <Field.ErrorText>{errors.couponCode?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.points}>
          <Field.Label>Points</Field.Label>
          <Controller
            control={control}
            name={"points"}
            render={({ field }) => (
              <NumberInput.Root
                min={0}
                step={1}
                w={"full"}
                name={field.name}
                disabled={field.disabled}
                value={field.value?.toString()}
                onValueChange={({ valueAsNumber }) =>
                  field.onChange(
                    Number.isNaN(valueAsNumber) ? 0 : valueAsNumber,
                  )
                }
              >
                <NumberInput.Control />
                <NumberInput.Input onBlur={field.onBlur} />
              </NumberInput.Root>
            )}
          />
          <Field.HelperText>Loyalty points to redeem</Field.HelperText>
          <Field.ErrorText>{errors.points?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.depositAmount}>
          <Field.Label>Deposit amount</Field.Label>
          <Controller
            control={control}
            name={"depositAmount"}
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
                  currencyDisplay: "symbol",
                  currencySign: "accounting",
                  maximumFractionDigits: 2,
                }}
                value={field.value?.toString()}
                onValueChange={({ valueAsNumber }) =>
                  field.onChange(
                    Number.isNaN(valueAsNumber) ? 0 : valueAsNumber,
                  )
                }
              >
                <NumberInput.Control />
                <NumberInput.Input onBlur={field.onBlur} />
              </NumberInput.Root>
            )}
          />
          <Field.HelperText>
            Leave at zero to charge the full amount
          </Field.HelperText>
          <Field.ErrorText>{errors.depositAmount?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.terminalConfigId || !!posConfigs.error}>
          <Field.Label>POS terminal</Field.Label>
          <Controller
            control={control}
            name={"terminalConfigId"}
            rules={{ deps: ["paymentConfigId"] }}
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
                collection={terminalCollection}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select terminal" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.ClearTrigger />
                    {posConfigs.isLoading ? (
                      <Spinner size="sm" />
                    ) : (
                      <Select.Indicator />
                    )}
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content id={posConfigScrollId}>
                      <InfiniteScroll
                        dataLength={parsedPosConfigs.flatData.length}
                        hasMore={parsedPosConfigs.hasMore}
                        next={() => posConfigs.setSize(posConfigs.size + 1)}
                        loader={<Spinner size={"xs"} />}
                        scrollableTarget={posConfigScrollId}
                      >
                        {terminalCollection.size > 0 ? (
                          terminalCollection.items.map((terminal) => (
                            <Select.Item item={terminal} key={terminal.id}>
                              {terminal.name ??
                                [terminal.gateway, terminal.serialNumber]
                                  .filter(Boolean)
                                  .join(" · ")}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))
                        ) : (
                          <Box>No terminals found</Box>
                        )}
                      </InfiniteScroll>
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            )}
          />
          {posConfigs.error && (
            <Button
              w={"full"}
              size={"sm"}
              type={"button"}
              variant={"subtle"}
              onClick={() => posConfigs.mutate()}
            >
              Click to retry
            </Button>
          )}
          <Field.HelperText>
            Terminal to push the payment to for POS checkout. Leave empty for
            web checkout
          </Field.HelperText>
          <Field.ErrorText>
            {posConfigs.error
              ? "Terminals unavailable. Retry to continue."
              : errors.terminalConfigId?.message}
          </Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.paymentConfigId || !!subaccounts.error}>
          <Field.Label>Subaccount</Field.Label>
          <Controller
            control={control}
            name={"paymentConfigId"}
            rules={{ deps: ["terminalConfigId"] }}
            render={({ field }) => (
              <Select.Root
                name={field.name}
                disabled={field.disabled}
                value={field.value ? [field.value] : []}
                onValueChange={({ value }) => {
                  field.onChange(value[0] ?? "");
                  field.onBlur();
                }}
                onInteractOutside={() => field.onBlur()}
                collection={subaccountCollection}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select subaccount" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    {subaccounts.isLoading ? (
                      <Spinner size="sm" />
                    ) : (
                      <Select.Indicator />
                    )}
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content id={subaccountScrollId}>
                      <InfiniteScroll
                        dataLength={parsedSubaccounts.flatData.length}
                        hasMore={parsedSubaccounts.hasMore}
                        next={() => subaccounts.setSize(subaccounts.size + 1)}
                        loader={<Spinner size={"xs"} />}
                        scrollableTarget={subaccountScrollId}
                      >
                        {subaccountCollection.size > 0 ? (
                          subaccountCollection.items.map((subaccount) => (
                            <Select.Item item={subaccount} key={subaccount.id}>
                              {subaccount.gateway}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))
                        ) : (
                          <Box>No subaccounts found</Box>
                        )}
                      </InfiniteScroll>
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            )}
          />
          {subaccounts.error && (
            <Button
              w={"full"}
              size={"sm"}
              type={"button"}
              variant={"subtle"}
              onClick={() => subaccounts.mutate()}
            >
              Click to retry
            </Button>
          )}
          <Field.HelperText>
            Payment gateway subaccount that receives this payment
          </Field.HelperText>
          <Field.ErrorText>
            {subaccounts.error
              ? "Subaccounts unavailable. Retry to continue."
              : errors.paymentConfigId?.message}
          </Field.ErrorText>
        </Field.Root>
      </Fieldset.Content>

      {error && (
        <Button
          w={"full"}
          variant={"subtle"}
          loading={isLoading}
          disabled={isLoading}
          onClick={() => mutate()}
        >
          Error loading cart retry
        </Button>
      )}

      <Button
        w={"full"}
        onClick={onSubmit}
        variant={"outline"}
        disabled={
          !isValid ||
          isSubmitting ||
          addCart.isMutating ||
          updateCart.isMutating
        }
        loading={isSubmitting || addCart.isMutating || updateCart.isMutating}
      >
        {cart ? "Update" : "Create"}
      </Button>

      {cart && (
        <Button
          w={"full"}
          disabled={
            !isValid ||
            isSubmitting ||
            addCart.isMutating ||
            updateCart.isMutating ||
            (isDirty && !isSubmitSuccessful)
          }
          loading={webCheckout.isMutating || posCheckout.isMutating}
          onClick={() => handleCheckout(cart.id)}
        >
          Checkout
        </Button>
      )}
    </Fieldset.Root>
  );
};

export default CartForm;

"use client";

import { useAddCart } from "@/hooks/cart";
import { computePath } from "@/utilities/computePath";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { useRouter } from "next/navigation";
import { LuPlus } from "react-icons/lu";
import FormButton from "./FormButton";
import { toaster } from "../ui/toaster";

interface Props {
  businessId: string | undefined;
  storeId: string | undefined;
}

const NewCartButton = ({ businessId, storeId }: Props) => {
  const { push } = useRouter();
  const { trigger } = useAddCart(businessId, storeId);

  const handleClick = async () => {
    const promise = toaster.promise(trigger({}), {
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
    if (!promise) return;
    try {
      const cart = await promise.unwrap();
      push(`${computePath(businessId, storeId)}/carts/${cart.id}`);
    } catch {} // Error displayed by toaster
  };

  return (
    <FormButton onClick={handleClick}>
      <LuPlus />
      New Cart
    </FormButton>
  );
};

export default NewCartButton;

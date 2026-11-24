"use client";

import { useCarts, useRemoveCart } from "@/hooks/cart";
import { GetAllCartsOutputData } from "@/schema/cart";
import { computePath } from "@/utilities/computePath";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { parseCursorData } from "@/utilities/parsePageData";
import { Box, Button, For, GridItem, Spinner, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GridContainer from "./GridContainer";
import { toaster } from "../ui/toaster";
import CartCard from "./CartCard";
import EmptyPage from "./EmptyPage";
import { LuShoppingCart } from "react-icons/lu";

interface Props {
  initialCarts: Promise<GetAllCartsOutputData[]>;
  businessId: string | undefined;
  storeId: string | undefined;
}

const CartGrid = ({ initialCarts, businessId, storeId }: Props) => {
  const { data, error, mutate, setSize, size, isLoading } = useCarts(
    businessId,
    storeId,
    {
      fallbackData: initialCarts,
    },
  );
  const { flatData: carts, hasMore } = useMemo(
    () => parseCursorData(data),
    [data],
  );

  const { trigger } = useRemoveCart(businessId, storeId);

  const handleDelete = async (id: string) => {
    toaster.promise(trigger(id), {
      loading: {
        title: "Deleting cart...",
        description: "Please wait",
      },
      success: {
        title: "Deletion successful",
        description: "Cart has been deleted",
      },
      error: errorToastOptions,
    });
  };

  if (data && carts.length === 0) {
    return (
      <EmptyPage title="No carts found" description="Create a cart">
        <LuShoppingCart />
      </EmptyPage>
    );
  }

  return (
    <Box w={"full"}>
      <InfiniteScroll
        dataLength={carts.length}
        next={() => setSize(size + 1)}
        hasMore={hasMore && !error}
        loader={<Spinner />}
        style={{ width: "100%", overflow: "visible" }}
      >
        <GridContainer pb={12} gap={2}>
          <For each={carts}>
            {(cart) => (
              <GridItem key={cart.id} colSpan={1}>
                <CartCard
                  cart={cart}
                  onClick={handleDelete}
                  href={`${computePath(businessId, storeId)}/carts/${cart.id}`}
                />
              </GridItem>
            )}
          </For>
        </GridContainer>
        {error && (
          <>
            <Button
              w={"full"}
              size={"md"}
              variant={"subtle"}
              loading={isLoading}
              onClick={() => mutate()}
            >
              Click to retry
            </Button>
            <Text>Carts unavailable. Retry to continue.</Text>
          </>
        )}
      </InfiniteScroll>
    </Box>
  );
};

export default CartGrid;

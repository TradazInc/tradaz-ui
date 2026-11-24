"use client";

import { useBusinesses } from "@/hooks/business";
import { useStores } from "@/hooks/store";
import { GetAllStoresOutputData } from "@/schema/store";
import { useComputePath } from "@/hooks/useComputePath";
import { For } from "@chakra-ui/react";
import { notFound, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import EmptyPage from "./EmptyPage";
import GridContainer from "./GridContainer";
import StoreCard from "./StoreCard";

interface Props {
  initialStores: Promise<GetAllStoresOutputData>;
  businessId: string;
}

const StoreGrid = ({ businessId, initialStores }: Props) => {
  const computePath = useComputePath();
  const search = useSearchParams().get("search")?.trim().toLowerCase();
  const { data: businesses } = useBusinesses();
  const business = businesses?.find((b) => b.id === businessId);

  if (businesses && !business) notFound();

  const { data } = useStores(businessId, {
    fallbackData: initialStores,
  });

  // The full list is loaded at once, so search on the client
  const stores = useMemo(
    () =>
      (data ?? []).filter(
        (s) => !search || s.name.toLowerCase().includes(search),
      ),
    [data, search],
  );

  if (data && stores.length === 0) {
    return search ? (
      <EmptyPage
        title={"No branches found"}
        description={"No branch matches your search"}
      />
    ) : (
      <EmptyPage
        title={"No branches found"}
        description={"Create a new branch for your business"}
      />
    );
  }

  return (
    <GridContainer>
      <For each={stores}>
        {(store) => (
          <StoreCard
            key={store.id}
            store={store}
            businessName={business?.name}
            href={computePath(businessId, store.id)}
          />
        )}
      </For>
    </GridContainer>
  );
};

export default StoreGrid;

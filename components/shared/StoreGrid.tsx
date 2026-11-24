"use client";

import { useBusinesses } from "@/hooks/business";
import { useStores } from "@/hooks/store";
import { GetAllStoresOutputData } from "@/schema/store";
import { useClientSearch } from "@/hooks/useClientSearch";
import { useComputePath } from "@/hooks/useComputePath";
import { For } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import EmptyPage from "./EmptyPage";
import GridContainer from "./GridContainer";
import StoreCard from "./StoreCard";

interface Props {
  initialStores: Promise<GetAllStoresOutputData>;
  businessId: string;
}

const StoreGrid = ({ businessId, initialStores }: Props) => {
  const computePath = useComputePath();
  const { data: businesses } = useBusinesses();
  const business = businesses?.find((b) => b.id === businessId);

  if (businesses && !business) notFound();

  const { data } = useStores(businessId, {
    fallbackData: initialStores,
  });
  const { results: stores, search } = useClientSearch(data, "name");

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

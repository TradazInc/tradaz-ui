"use client";

import { useBusinesses } from "@/hooks/business";
import { GetAllBusinessOutputData } from "@/schema/business";
import { useComputePath } from "@/hooks/useComputePath";
import { For } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import BusinessCard from "./BusinessCard";
import EmptyPage from "./EmptyPage";
import GridContainer from "./GridContainer";

interface Props {
  initialBusinesses: Promise<GetAllBusinessOutputData>;
}

const BusinessGrid = ({ initialBusinesses }: Props) => {
  const computePath = useComputePath();
  const search = useSearchParams().get("search")?.trim().toLowerCase();
  const { data } = useBusinesses({
    fallbackData: initialBusinesses,
  });

  // The full list is loaded at once, so search on the client
  const businesses = useMemo(
    () =>
      (data ?? []).filter(
        (b) => !search || b.name.toLowerCase().includes(search),
      ),
    [data, search],
  );

  if (data && businesses.length === 0) {
    return search ? (
      <EmptyPage
        title={"No businesses found"}
        description={"No business matches your search"}
      />
    ) : (
      <EmptyPage
        title={"No businesses found"}
        description={"Create a new business"}
      />
    );
  }

  return (
    <GridContainer>
      <For each={businesses}>
        {(business) => (
          <BusinessCard
            key={business.id}
            business={business}
            href={computePath(business.id)}
          />
        )}
      </For>
    </GridContainer>
  );
};

export default BusinessGrid;

"use client";

import { useBusinesses } from "@/hooks/business";
import { GetAllBusinessOutputData } from "@/schema/business";
import { useClientSearch } from "@/hooks/useClientSearch";
import { useComputePath } from "@/hooks/useComputePath";
import { For } from "@chakra-ui/react";
import BusinessCard from "./BusinessCard";
import EmptyPage from "./EmptyPage";
import GridContainer from "./GridContainer";

interface Props {
  initialBusinesses: Promise<GetAllBusinessOutputData>;
}

const BusinessGrid = ({ initialBusinesses }: Props) => {
  const computePath = useComputePath();
  const { data } = useBusinesses({
    fallbackData: initialBusinesses,
  });
  const { results: businesses, search } = useClientSearch(data, "name");

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

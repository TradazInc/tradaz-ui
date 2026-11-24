import BusinessName from "@/components/shared/BusinessName";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import { RevenueStat } from "@/components/shared/RevenueStat";
import { SalesStat } from "@/components/shared/SalesStat";
import Search from "@/components/shared/Search";
import { StoreForm, StoreFormViewport } from "@/components/shared/StoreForm";
import StoreGrid from "@/components/shared/StoreGrid";
import { StoreStat } from "@/components/shared/StoreStat";
import { VisitorsStat } from "@/components/shared/VisitorsStat";
import { getStores } from "@/server/store";
import { Spacer } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const stores = getStores(businessId);

  return (
    <PageContainer>
      <PageHeader>
        <BusinessName businessId={businessId} suffix={"Branches"} />
      </PageHeader>

      <PageItemContainer>
        <Suspense>
          <Search placeholder={"Search for a branch"} searchField={"search"} />
        </Suspense>
        <Spacer />
        <StoreForm />
      </PageItemContainer>

      <PageItemContainer my={2}>
        <Suspense>
          <StoreStat initialStores={stores} businessId={businessId} />
        </Suspense>
        <VisitorsStat />
        <SalesStat />
        <RevenueStat />
      </PageItemContainer>

      <Suspense>
        <StoreGrid initialStores={stores} businessId={businessId} />
      </Suspense>
      <StoreFormViewport />
    </PageContainer>
  );
}

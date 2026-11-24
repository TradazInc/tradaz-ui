import BusinessName from "@/components/shared/BusinessName";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import { RevenueStat } from "@/components/shared/RevenueStat";
import { SalesStat } from "@/components/shared/SalesStat";
import { ShowMore } from "@/components/shared/ShowMore";
import { StoreStat } from "@/components/shared/StoreStat";
import { VisitorsStat } from "@/components/shared/VisitorsStat";
import { getStores } from "@/server/store";
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
        <BusinessName businessId={businessId} suffix={"Analytics"} />
      </PageHeader>

      <Suspense>
        <ShowMore
          initial={
            <PageItemContainer>
              <StoreStat initialStores={stores} businessId={businessId} />
              <VisitorsStat />
              <SalesStat />
              <RevenueStat />
            </PageItemContainer>
          }
        >
          <PageItemContainer>
            <StoreStat initialStores={stores} businessId={businessId} />
            <VisitorsStat />
            <SalesStat />
            <RevenueStat />
          </PageItemContainer>

          <PageItemContainer>
            <StoreStat initialStores={stores} businessId={businessId} />
            <VisitorsStat />
            <SalesStat />
            <RevenueStat />
          </PageItemContainer>
        </ShowMore>
      </Suspense>
    </PageContainer>
  );
}

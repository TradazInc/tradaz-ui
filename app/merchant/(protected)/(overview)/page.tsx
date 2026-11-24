import {
  BusinessForm,
  BusinessFormViewport,
} from "@/components/shared/BusinessForm";
import BusinessGrid from "@/components/shared/BusinessGrid";
import { BusinessStat } from "@/components/shared/BusinessStat";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import { RevenueStat } from "@/components/shared/RevenueStat";
import { SalesStat } from "@/components/shared/SalesStat";
import Search from "@/components/shared/Search";
import UserName from "@/components/shared/UserName";
import { VisitorsStat } from "@/components/shared/VisitorsStat";
import { getBusinesses } from "@/server/business";
import { Spacer } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{ signup?: string }>;
}

export default async function page({ searchParams }: Props) {
  const { signup } = await searchParams;
  const businesses = getBusinesses();

  return (
    <PageContainer>
      <PageHeader>
        <UserName />
      </PageHeader>

      <PageItemContainer>
        <Suspense>
          <Search placeholder={"Search for a business"} searchField={"search"} />
        </Suspense>
        <Spacer />
        <BusinessForm signup={signup} />
      </PageItemContainer>

      <PageItemContainer my={2}>
        <BusinessStat initialBusinesses={businesses} />
        <VisitorsStat />
        <SalesStat />
        <RevenueStat />
      </PageItemContainer>

      <Suspense>
        <BusinessGrid initialBusinesses={businesses} />
      </Suspense>
      <BusinessFormViewport />
    </PageContainer>
  );
}

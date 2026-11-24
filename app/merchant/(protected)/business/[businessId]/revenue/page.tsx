import FormButton from "@/components/shared/FormButton";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import RevenueTable from "@/components/shared/RevenueTable";
import Search from "@/components/shared/Search";
import { getRevenues } from "@/server/revenue";
import { computePath } from "@/utilities/computePath";
import { Spacer } from "@chakra-ui/react";
import NextLink from "next/link";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const revenues = getRevenues(businessId).then((d) => [d]);

  return (
    <PageContainer>
      <PageHeader>Revenues</PageHeader>

      <PageItemContainer>
        <Suspense>
          <Search placeholder={"Search for a revenue"} searchField={"search"} />
        </Suspense>
        <Spacer />
        <FormButton asChild>
          <NextLink href={`${computePath(businessId)}/revenue/new`}>
            <LuPlus />
            Create Revenue
          </NextLink>
        </FormButton>
      </PageItemContainer>

      <RevenueTable initialRevenues={revenues} businessId={businessId} />
    </PageContainer>
  );
}

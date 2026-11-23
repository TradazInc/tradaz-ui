import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import Search from "@/components/shared/Search";
import {
  ShippingConfigForm,
  ShippingConfigFormViewport,
} from "@/components/shared/ShippingConfigForm";
import ShippingConfigTable from "@/components/shared/ShippingConfigTable";
import { getShippingConfigs } from "@/server/shippingConfig";
import { Spacer } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const shippingConfigs = getShippingConfigs(businessId).then((d) => [d]);

  return (
    <PageContainer>
      <PageHeader>Logistics & Shipping</PageHeader>

      <PageItemContainer>
        <Suspense>
          <Search
            placeholder={"Search for a shipping config"}
            searchField={"search"}
          />
        </Suspense>
        <Spacer />
        <ShippingConfigForm />
      </PageItemContainer>

      <ShippingConfigTable
        initialShippingConfigs={shippingConfigs}
        businessId={businessId}
      />
      <ShippingConfigFormViewport />
    </PageContainer>
  );
}

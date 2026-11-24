import FormButton from "@/components/shared/FormButton";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import ProductGrid from "@/components/shared/ProductGrid";
import Search from "@/components/shared/Search";
import { getProducts } from "@/server/product";
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
  const products = getProducts(businessId).then((d) => [d]);

  return (
    <PageContainer>
      <PageHeader>Product Inventory</PageHeader>

      <PageItemContainer>
        <Suspense>
          <Search placeholder={"Search for a product"} searchField={"search"} />
        </Suspense>
        <Spacer />
        <FormButton asChild>
          <NextLink href={`${computePath(businessId)}/products/new`}>
            <LuPlus />
            New Product
          </NextLink>
        </FormButton>
        {/* add dropdown */}
      </PageItemContainer>

      <ProductGrid businessId={businessId} initialProducts={products} />
    </PageContainer>
  );
}

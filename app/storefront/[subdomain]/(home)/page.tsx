import HeaderText from "@/components/shared/HeaderText";
import { PageContainer } from "@/components/shared/PageContainer";
import { rootDomain } from "@/ini/configs";
import { puckConfig } from "@/puck.config";
import { emptyPage } from "@/schema/uiConfig";
import { getStorefrontUIConfig } from "@/server/uiConfig";
import { Render } from "@puckeditor/core";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const subdomainData = await Promise.resolve(subdomain); // fetch business data

  if (!subdomainData) {
    return { title: rootDomain };
  }

  return {
    title: `${subdomain}.${rootDomain}`,
    description: `Subdomain page for ${subdomain}.${rootDomain}`,
  };
}

interface Props {
  params: Promise<{ subdomain: string }>;
}

export default async function page({ params }: Props) {
  const { subdomain } = await params;
  const uiConfig = await getStorefrontUIConfig(subdomain);

  return (
    <PageContainer>
      <HeaderText>{subdomain.toUpperCase()} Home Page</HeaderText>

      <Render config={puckConfig} data={uiConfig?.page ?? emptyPage} />
    </PageContainer>
  );
}

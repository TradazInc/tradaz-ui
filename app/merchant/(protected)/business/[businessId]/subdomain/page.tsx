import { PageContainer } from "@/components/shared/PageContainer";
import { PageEditor } from "@/components/shared/PageEditor";
import PageHeader from "@/components/shared/PageHeader";
import { getUIConfig } from "@/server/uiConfig";
import { Data } from "@puckeditor/core";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const data = (await getUIConfig(businessId)) as unknown as Data;

  return (
    <PageContainer>
      <PageHeader>Subdomain</PageHeader>

      <PageEditor businessId={businessId} initialData={data} />
    </PageContainer>
  );
}

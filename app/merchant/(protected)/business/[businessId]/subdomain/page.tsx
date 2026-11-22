import { PageContainer } from "@/components/shared/PageContainer";
import { PageEditor } from "@/components/shared/PageEditor";
import PageHeader from "@/components/shared/PageHeader";
import { emptyPage } from "@/schema/uiConfig";
import { getUIConfig } from "@/server/uiConfig";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const uiConfig = await getUIConfig(businessId);

  return (
    <PageContainer>
      <PageHeader>Subdomain</PageHeader>

      <PageEditor
        businessId={businessId}
        initialData={uiConfig?.page ?? emptyPage}
      />
    </PageContainer>
  );
}

import { PageContainer } from "@/components/shared/PageContainer";
import { PageEditor } from "@/components/shared/PageEditor";
import PageHeader from "@/components/shared/PageHeader";
import { puckTemplate } from "@/data/puckTemplate";
import { getUIConfig } from "@/server/uiConfig";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const uiConfig = await getUIConfig(businessId);

  return (
    <PageContainer alignItems="stretch">
      <PageHeader>Storefront Themes</PageHeader>

      <PageEditor
        businessId={businessId}
        initialData={uiConfig?.page ?? puckTemplate}
      />
    </PageContainer>
  );
}

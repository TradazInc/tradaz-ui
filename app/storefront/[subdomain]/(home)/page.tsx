import { PageContainer } from "@/components/shared/PageContainer";
import { Data, Render } from "@puckeditor/core";
import { puckConfig } from "@/puck.config";
import HeaderText from "@/components/shared/HeaderText";
import { getUIConfig } from "@/server/uiConfig";

interface Props {
  params: Promise<{ subdomain: string }>;
}

export default async function page({ params }: Props) {
  const { subdomain } = await params;
  const data = (await getUIConfig(subdomain)) as unknown as Data;

  return (
    <PageContainer>
      <HeaderText>{subdomain.toUpperCase()} Home Page</HeaderText>

      <Render config={puckConfig} data={data} />
    </PageContainer>
  );
}

import { PageContainer } from "@/components/shared/PageContainer";

interface Props {
  params: Promise<{ invitationId: string }>;
}

export default async function page({ params }: Props) {
  const { invitationId } = await params;

  return <PageContainer>Accept invite {invitationId}</PageContainer>;
}

import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import { RoleForm, RoleFormViewport } from "@/components/shared/RoleForm";
import RoleTable from "@/components/shared/RoleTable";
import { getRoles } from "@/server/role";
import { Spacer } from "@chakra-ui/react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const roles = getRoles(businessId);

  return (
    <PageContainer>
      <PageHeader>Roles & Permissisons</PageHeader>

      <PageItemContainer>
        <Spacer />
        <RoleForm />
      </PageItemContainer>

      <RoleTable initialRoles={roles} businessId={businessId} />
      <RoleFormViewport />
    </PageContainer>
  );
}

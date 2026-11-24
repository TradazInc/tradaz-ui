import {
  InvitationForm,
  InvitationFormViewport,
} from "@/components/shared/InvitationForm";
import InvitationTable from "@/components/shared/InvitationTable";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import Search from "@/components/shared/Search";
import { getInvitations } from "@/server/invitation";
import { Spacer } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const invitations = getInvitations(businessId);

  return (
    <PageContainer>
      <PageHeader>Invitations</PageHeader>

      <PageItemContainer>
        <Suspense>
          <Search
            placeholder={"Search for an invitation"}
            searchField={"search"}
          />
        </Suspense>
        <Spacer />
        <InvitationForm />
      </PageItemContainer>

      <Suspense>
        <InvitationTable
          initialInvitations={invitations}
          businessId={businessId}
        />
      </Suspense>
      <InvitationFormViewport />
    </PageContainer>
  );
}

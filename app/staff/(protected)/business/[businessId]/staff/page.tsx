import {
  InvitationForm,
  InvitationFormViewport,
} from "@/components/shared/InvitationForm";
import InvitationTable from "@/components/shared/InvitationTable";
import MemberTable from "@/components/shared/MemberTable";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import Search from "@/components/shared/Search";
import { getInvitations } from "@/server/invitation";
import { getMembers } from "@/server/member";
import { Heading, Spacer } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const members = getMembers(businessId).then((d) => [d]);
  const invitations = getInvitations(businessId);

  return (
    <PageContainer>
      <PageHeader>Staff</PageHeader>

      <PageItemContainer>
        <Suspense>
          <Search placeholder={"Search for a staff"} searchField={"search"} />
        </Suspense>
        <Spacer />
        <InvitationForm />
      </PageItemContainer>

      <MemberTable initialMembers={members} businessId={businessId} />

      <Heading size={"md"} alignSelf={"flex-start"} mt={6}>
        Invitations
      </Heading>
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

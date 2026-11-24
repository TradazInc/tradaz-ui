import { InvitationForm } from "@/components/shared/InvitationForm";
import MemberTable from "@/components/shared/MemberTable";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import Search from "@/components/shared/Search";
import { getMembers } from "@/server/member";
import { Spacer } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const members = getMembers(businessId).then((d) => [d]);

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
    </PageContainer>
  );
}

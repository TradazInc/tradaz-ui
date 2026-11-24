"use client";

import EmptyPage from "@/components/shared/EmptyPage";
import { toaster } from "@/components/ui/toaster";
import {
  useCancelInvitation,
  useInvitations,
  useSendInvitation,
} from "@/hooks/invitation";
import { useStores } from "@/hooks/store";
import {
  GetAllInvitationOutputData,
  GetInvitationOutputData,
} from "@/schema/invitation";
import { displayStatus } from "@/utilities/displayStatus";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Badge,
  BadgeProps,
  Box,
  Button,
  ButtonGroup,
  For,
  IconButton,
  Table,
  Text,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { LuSend } from "react-icons/lu";
import DeleteIconButton from "./DeleteIconButton";

interface Props {
  initialInvitations: Promise<GetAllInvitationOutputData>;
  businessId: string | undefined;
}

const statusColor: Record<string, BadgeProps["colorPalette"]> = {
  pending: "yellow",
  accepted: "green",
  rejected: "red",
  canceled: "gray",
  expired: "gray",
};

const InvitationTable = ({ initialInvitations, businessId }: Props) => {
  const search = useSearchParams().get("search")?.trim().toLowerCase();
  const { data, error, mutate } = useInvitations(businessId, {
    fallbackData: initialInvitations,
  });
  const { trigger: cancel, isMutating: isCanceling } =
    useCancelInvitation(businessId);
  const { trigger: resend, isMutating: isResending } =
    useSendInvitation(businessId);

  const { data: stores } = useStores(businessId);
  const storeNames = useMemo(
    () => new Map((stores ?? []).map((s) => [s.id, s.name])),
    [stores],
  );

  // The full list is loaded at once, so search on the client
  const invitations = useMemo(
    () =>
      (data ?? []).filter(
        (i) => !search || i.email.toLowerCase().includes(search),
      ),
    [data, search],
  );

  const handleCancel = (id: string) => {
    toaster.promise(cancel(id), {
      loading: { title: "Canceling invitation...", description: "Please wait" },
      success: {
        title: "Invitation canceled",
        description: "The invitation link is no longer valid",
      },
      error: errorToastOptions,
    });
  };

  const handleResend = (invitation: GetInvitationOutputData) => {
    toaster.promise(
      resend({
        email: invitation.email,
        role: invitation.role,
        teamId: invitation.teamId ?? undefined,
      }),
      {
        loading: {
          title: "Resending invitation...",
          description: "Please wait",
        },
        success: {
          title: "Invitation resent",
          description: `Invitation resent to ${invitation.email}`,
        },
        error: errorToastOptions,
      },
    );
  };

  if (data && invitations.length === 0) {
    return (
      <EmptyPage
        title="No invitations found"
        description="Invite a staff member"
      />
    );
  }

  return (
    <Box w={"full"}>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
            <Table.ColumnHeader>Branch</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Expires</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <For
            each={invitations}
            fallback={
              <Table.Row>
                <Table.Cell colSpan={6}>No invitations available</Table.Cell>
              </Table.Row>
            }
          >
            {(invitation) => {
              const status = displayStatus(invitation);
              const isPending = status === "pending";
              const canResend = isPending || status === "expired";
              return (
                <Table.Row key={invitation.id} w={"full"}>
                  <Table.Cell>{invitation.email}</Table.Cell>
                  <Table.Cell>{invitation.role}</Table.Cell>
                  <Table.Cell>
                    {invitation.teamId
                      ? (storeNames.get(invitation.teamId) ?? "—")
                      : "—"}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge colorPalette={statusColor[status]}>{status}</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(invitation.expiresAt).toDateString()}
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    <ButtonGroup size="sm" variant="outline">
                      <IconButton
                        aria-label="Resend invitation"
                        onClick={() => handleResend(invitation)}
                        disabled={!canResend || isResending}
                      >
                        <LuSend />
                      </IconButton>
                      <DeleteIconButton
                        aria-label="Cancel invitation"
                        onClick={() => handleCancel(invitation.id)}
                        disabled={!isPending || isCanceling}
                      />
                    </ButtonGroup>
                  </Table.Cell>
                </Table.Row>
              );
            }}
          </For>
        </Table.Body>
      </Table.Root>
      {error && (
        <>
          <Button
            w={"full"}
            size={"md"}
            variant={"subtle"}
            onClick={() => mutate()}
          >
            Click to retry
          </Button>
          <Text>Invitations unavailable. Retry to continue.</Text>
        </>
      )}
    </Box>
  );
};

export default InvitationTable;

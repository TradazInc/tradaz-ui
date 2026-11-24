import { GetInvitationOutputData } from "@/schema/invitation";

export type DisplayStatus = GetInvitationOutputData["status"] | "expired";

export const displayStatus = (
  invitation: GetInvitationOutputData,
): DisplayStatus =>
  invitation.status === "pending" &&
  new Date(invitation.expiresAt).getTime() < Date.now()
    ? "expired"
    : invitation.status;

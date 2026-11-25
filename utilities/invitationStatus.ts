import { GetInvitationOutputData } from "@/schema/invitation";

export type InvitationStatus = GetInvitationOutputData["status"] | "expired";

export const invitationStatus = (
  invitation: GetInvitationOutputData,
): InvitationStatus =>
  invitation.status === "pending" &&
  new Date(invitation.expiresAt).getTime() < Date.now()
    ? "expired"
    : invitation.status;

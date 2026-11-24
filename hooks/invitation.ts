import { INVITATION_KEY } from "@/data/cacheKeys";
import { authClient, authConfig } from "@/lib/authClient";
import {
  CreateInvitationInputData,
  GetAllInvitationOutputData,
} from "@/schema/invitation";
import { cache } from "@/utilities/cacheKey";
import useSWR, { SWRConfiguration } from "swr";
import useSWRMutation from "swr/mutation";

export const useInvitations = (
  organizationId: string | undefined,
  config?: SWRConfiguration<GetAllInvitationOutputData, Error>,
) => {
  return useSWR(
    cache.scopedKey(INVITATION_KEY, organizationId),
    () =>
      authClient.organization.listInvitations({
        query: { organizationId },
        fetchOptions: authConfig,
      }),
    config,
  );
};

export const useInvitation = (id: string) => {
  return useSWR(cache.scopedKey(INVITATION_KEY, id), () =>
    authClient.organization.getInvitation({
      query: { id },
      fetchOptions: authConfig,
    }),
  );
};

export const useCancelInvitation = (organizationId: string | undefined) => {
  const mutation = useSWRMutation(
    cache.scopedKey(INVITATION_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      authClient.organization.cancelInvitation({
        invitationId: arg,
        fetchOptions: authConfig,
      }),
  );

  // Optimistic UI update
  const trigger = (invitationId: string) =>
    mutation.trigger<GetAllInvitationOutputData>(invitationId, {
      populateCache: (_, current = []) =>
        current.map((invitation) =>
          invitation.id === invitationId
            ? { ...invitation, status: "canceled" as const }
            : invitation,
        ),
    });

  return { ...mutation, trigger };
};

export const useSendInvitation = (organizationId: string | undefined) => {
  const mutation = useSWRMutation(
    cache.scopedKey(INVITATION_KEY, organizationId),
    (key, { arg }: { arg: CreateInvitationInputData }) =>
      authClient.organization.inviteMember({
        email: arg.email,
        role: arg.role,
        teamId: arg.teamId,
        organizationId,
        resend: true,
        fetchOptions: authConfig,
      }),
  );

  // Map response into cache to prevent duplicate when resent
  const trigger = (data: CreateInvitationInputData) =>
    mutation.trigger<GetAllInvitationOutputData>(data, {
      populateCache: (invitation, current = []) => {
        return current.some((i) => i.id === invitation.id)
          ? current.map((i) => (i.id === invitation.id ? invitation : i))
          : [invitation, ...current];
      },
    });

  return { ...mutation, trigger };
};

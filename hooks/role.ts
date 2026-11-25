import { MEMBER_ROLE_KEY, ROLE_KEY } from "@/data/cacheKeys";
import { authClient, authConfig } from "@/lib/authClient";
import { CreateRoleInputData } from "@/schema/role";
import { cache } from "@/utilities/cacheKey";
import { toPermission } from "@/utilities/toPermission";
import useSWR, { SWRConfiguration } from "swr";
import useSWRMutation from "swr/mutation";

export const useRoles = (
  organizationId: string | undefined,
  config?: SWRConfiguration,
) => {
  return useSWR(
    cache.scopedKey(ROLE_KEY, organizationId),
    () =>
      authClient.organization.listRoles({
        query: { organizationId },
        fetchOptions: authConfig,
      }),
    config,
  );
};

export const useMemberRole = (organizationId: string | undefined) => {
  return useSWR(cache.scopedKey(MEMBER_ROLE_KEY, organizationId), () =>
    authClient.organization.getActiveMemberRole({
      query: { organizationId },
      fetchOptions: authConfig,
    }),
  );
};

export const useAddRole = (organizationId: string | undefined) => {
  return useSWRMutation(
    cache.scopedKey(ROLE_KEY, organizationId),
    (key, { arg }: { arg: CreateRoleInputData }) =>
      authClient.organization.createRole({
        role: arg.role,
        permission: toPermission(arg.permission),
        organizationId,
        fetchOptions: authConfig,
      }),
  );
};

export const useRemoveRole = (organizationId: string | undefined) => {
  return useSWRMutation(
    cache.scopedKey(ROLE_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      authClient.organization.deleteRole({
        roleName: arg,
        organizationId,
        fetchOptions: authConfig,
      }),
  );
};

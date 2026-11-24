import { CreateRoleInputData } from "@/schema/role";

export const toPermission = (
  permission: CreateRoleInputData["permission"],
): Record<string, string[]> => ({
  // Drop resources with no selected actions so the API only sees granted ones
  ...Object.fromEntries(
    Object.entries(permission).filter(
      (entry): entry is [string, string[]] => !!entry[1]?.length,
    ),
  ),
  // always grant `ac: ["read"]` so members with a custom role can list roles to resolve their own permissions
  ac: ["read"],
});

import { CreateRoleInputData } from "@/schema/role";

/** Drops resources with no selected actions so the API only sees granted ones. */
export const toPermission = (
  permission: CreateRoleInputData["permission"],
): Record<string, string[]> =>
  Object.fromEntries(
    Object.entries(permission).filter(
      (entry): entry is [string, string[]] => !!entry[1]?.length,
    ),
  );

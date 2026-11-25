import { orgRoles } from "@/lib/organizationAc";

export function hasRole(role: string | null | undefined, name: string) {
  return (
    !!role &&
    role
      .split(",")
      .map((r) => r.trim())
      .includes(name)
  );
}

export function hasCustomRole(role: string | null | undefined) {
  return !!role?.split(",").some((name) => !(name in orgRoles));
}

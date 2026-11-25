import { AllOrgPermission, orgAc, orgRoles } from "@/lib/accessControl";
import { authClient } from "@/lib/authClient";
import { GetAllRolesOutputData } from "@/schema/role";

export function checkRolePermission(
  role: string | null | undefined,
  permissions: AllOrgPermission,
  customRoles: GetAllRolesOutputData = [],
): boolean {
  if (!role) return false;

  // default roles
  if (
    authClient.organization.checkRolePermission({
      role: role as keyof typeof orgRoles,
      permissions,
    })
  )
    return true;

  // custom roles
  return role.split(",").some((name) => {
    const custom = customRoles.find((r) => r.role === name);
    return (
      !!custom &&
      orgAc.newRole(custom.permission).authorize(permissions).success
    );
  });
}

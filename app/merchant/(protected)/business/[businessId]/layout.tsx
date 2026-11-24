import { requireRole } from "@/server/auth";
import { hasRole } from "@/utilities/hasRole";

export default async function RoleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ businessId: string }>;
}>) {
  const { businessId } = await params;

  // Any member except customers (owner, manager, staff, vendor, custom roles).
  // Pages and features check their own permissions.
  await requireRole(
    { organizationId: businessId },
    (role) => !hasRole(role, "customer"),
  );

  return <>{children}</>;
}

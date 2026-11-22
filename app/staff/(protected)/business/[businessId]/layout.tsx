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

  await requireRole(
    { organizationId: businessId },
    (role) => !hasRole(role, "customer"),
  );

  return <>{children}</>;
}

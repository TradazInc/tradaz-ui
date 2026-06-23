export interface CustomSession {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
    banned: boolean | null | undefined;
    role?: string | null | undefined;
    banReason?: string | null | undefined;
    banExpires?: Date | null | undefined;
  };
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
    activeOrganizationId?: string | null | undefined;
    activeTeamId?: string | null | undefined;
  };
  teammember: {
    id: string;
    createdAt: Date | null;
    teamId: string;
    userId: string;
  } | null;
  member: {
    id: string;
    createdAt: Date;
    organizationId: string;
    userId: string;
    role: OrgRole;
    approved: boolean;
  } | null;
}

export enum OrgRole {
  owner = "owner",
  admin = "admin",
  sales = "sales",
  manager = "manager",
  vendor = "vendor",
  customer = "customer",
}

export enum Role {
  admin = "admin",
  user = "user",
}

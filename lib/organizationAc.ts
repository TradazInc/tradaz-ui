import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements } from "better-auth/plugins/organization/access";

/* Organization-level Resources */
const organizationStatement = {
  ...defaultStatements,
  // Product related
  products: ["create", "read", "update", "update-status", "delete"],
  productCategories: ["create", "delete"],
  productEdits: ["create", "read", "update", "approve", "reject", "delete"],
  sizeTypes: ["create", "read", "update", "delete"],
  cart: ["create", "read", "update", "delete"],

  // Checkout related
  checkout: ["web", "pos"],
  orders: ["read", "update-status"],
  coupons: ["create", "read", "update", "delete"],
  shippingConfigs: ["create", "read", "update", "delete"],
  transactions: ["create", "read"],

  // Business related
  pointsConfig: ["create", "read", "update"],
  posConfig: ["create", "read", "update", "delete"],
  subaccounts: ["create", "read", "update"],
  uiConfig: ["read", "upsert", "delete"],
  supportChats: ["create", "update", "auth"],

  // Finance related
  finance: ["read"],
  expense: ["create", "read", "update", "delete"],
  revenue: ["create", "read", "update", "delete"],
  vendors: ["read"],
} as const;
export const orgAc = createAccessControl(organizationStatement);

/* Organization-level Roles */
export const owner = orgAc.newRole({ ...orgAc.statements });

export const manager = orgAc.newRole({
  ...orgAc.statements,
  ac: ["read"],
  organization: ["update"],
  subaccounts: ["read"],
});

export const staff = orgAc.newRole({
  ac: ["read"],
  cart: ["create", "read", "update", "delete"],
  checkout: ["pos"],
  products: ["read"],
  sizeTypes: ["read"],
  orders: ["read"],
  supportChats: ["create", "update", "auth"],
  transactions: ["read"],
});

export const customer = orgAc.newRole({
  cart: ["create", "read", "update", "delete"],
  checkout: ["web"],
  orders: ["read"],
  pointsConfig: ["read"],
  shippingConfigs: ["read"],
  supportChats: ["create", "auth"],
  uiConfig: ["read"],
});

export const vendor = orgAc.newRole({
  ac: ["read"],
  products: ["create", "read"],
  productEdits: ["create", "read", "update", "delete"],
  sizeTypes: ["read"],
  vendors: ["read"],
  supportChats: ["create", "auth"],
});

// Export default roles
export const orgRoles = { owner, manager, staff, customer, vendor };
export const invitableRoles = Object.keys(orgRoles).filter(
  (role) => role !== "owner" && role !== "customer",
);
export const defaultRoles = Object.entries(orgRoles).map(
  ([role, { statements }]) => ({
    role,
    permission: statements as Record<string, readonly string[]>,
  }),
);

// Export all resources
export type AllOrgStatements = typeof orgAc.statements;
export type AllOrgResource = keyof AllOrgStatements;
export type AllOrgAction<R extends AllOrgResource = AllOrgResource> =
  AllOrgStatements[R][number];
export type AllOrgPermission = { [R in AllOrgResource]?: AllOrgAction<R>[] };

// Export grantable resources
// `ac` (managing roles themselves) is deliberately not grantable from the UI.
const { ac: _ac, ...grantable } = orgAc.statements;
export const orgStatements = grantable;

export type OrgStatements = typeof orgStatements;
export type OrgResource = keyof OrgStatements;
export type OrgAction<R extends OrgResource = OrgResource> =
  OrgStatements[R][number];
export type OrgPermission = { [R in OrgResource]?: OrgAction<R>[] };

export const resources = Object.keys(orgStatements) as [
  OrgResource,
  ...OrgResource[],
];

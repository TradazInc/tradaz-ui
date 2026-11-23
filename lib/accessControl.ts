import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc as platformAdminAc,
  defaultStatements as platformStatements,
  userAc,
} from "better-auth/plugins/admin/access";
import { defaultStatements as organizationStatements } from "better-auth/plugins/organization/access";

/* Platform-level Resources */
const platformStatement = {
  ...platformStatements,
  businessCategories: ["create", "read", "delete"],
  banks: ["read"],
  country: ["read"],
  media: ["upload"],
} as const;

export const platformAc = createAccessControl(platformStatement);

/* Platform-level Roles */
export const admin = platformAc.newRole({
  ...platformAc.statements,
  ...platformAdminAc.statements,
});

export const user = platformAc.newRole({
  ...platformAc.statements,
  ...userAc.statements,
  businessCategories: ["read"],
});

/* Organization-level Resources */
const organizationStatement = {
  ...organizationStatements,
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
  checkout: ["pos"],
  products: ["read"],
  sizeTypes: ["read"],
  orders: ["read"],
  supportChats: ["create", "update", "auth"],
});

export const customer = orgAc.newRole({
  cart: ["create", "read", "update", "delete"],
  checkout: ["web"],
  orders: ["read"],
  supportChats: ["create", "auth"],
});

export const vendor = orgAc.newRole({
  products: ["create", "read"],
  productEdits: ["create", "read", "update", "delete"],
  sizeTypes: ["read"],
  vendors: ["read"],
  supportChats: ["create", "auth"],
});

// Resources a business can grant to a custom role.
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

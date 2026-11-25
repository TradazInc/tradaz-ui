import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements,
  userAc,
} from "better-auth/plugins/admin/access";

/* Platform-level Resources */
const platformStatement = {
  ...defaultStatements,
  businessCategories: ["create", "read", "delete"],
  banks: ["read"],
  country: ["read"],
  media: ["upload"],
} as const;
export const platformAc = createAccessControl(platformStatement);

/* Platform-level Roles */
export const admin = platformAc.newRole({
  ...platformAc.statements,
  ...adminAc.statements,
});

export const user = platformAc.newRole({
  ...platformAc.statements,
  ...userAc.statements,
  businessCategories: ["read"],
});

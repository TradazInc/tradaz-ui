import { serverUrl } from "@/ini/configs";
import {
  customer,
  manager,
  orgAc,
  owner,
  staff,
  vendor,
} from "@/lib/organizationAc";
import { admin, platformAc, user } from "@/lib/platformAc";
import { CustomSession } from "@/schema/session";
import { setServerCookie } from "@/utilities/setServerCookie";
import { logger } from "@better-fetch/logger";
import {
  adminClient,
  customSessionClient,
  inferOrgAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { customSession } from "better-auth/plugins";
import { BetterFetchOption, createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: serverUrl,
  fetchOptions: {
    credentials: "include",
    onRequest: async (context) => setServerCookie(context),
    plugins: [logger()],
  },
  plugins: [
    customSessionClient<{
      options: { plugins: [ReturnType<typeof customSession<CustomSession>>] };
    }>(),
    adminClient({ ac: platformAc, roles: { admin, user } }),
    organizationClient({
      ac: orgAc,
      roles: { owner, manager, staff, customer, vendor },
      teams: { enabled: true },
      dynamicAccessControl: { enabled: true },
      schema: inferOrgAdditionalFields({
        organization: {
          additionalFields: {
            categoryId: { type: "string", input: true, required: true },
          },
        },
        team: {
          additionalFields: {
            address: { type: "string", input: true, required: true },
          },
        },
      }),
    }),
  ],
});

export const authConfig = { throw: true as const } satisfies BetterFetchOption;

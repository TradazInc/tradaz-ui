import { createAuthClient } from "better-auth/client";
import { organizationClient, adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL ?? "https://tradaz-ui.vercel.app", // add env later*
  fetchOptions: { credentials: "include" },
  plugins: [
    adminClient(),
    organizationClient({
      teams: { enabled: true },
      schema: {
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
      },
    }),
  ],
});

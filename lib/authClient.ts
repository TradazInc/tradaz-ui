import { CustomSession } from "@/entities/CustomSession";
import { createAuthClient } from "better-auth/react";
import { organizationClient, adminClient } from "better-auth/client/plugins";
import { customSessionClient } from "better-auth/client/plugins";
import { customSession } from "better-auth/plugins";

// Mirror the server's auth shape for type inference.
type ServerAuth = {
  options: {
    plugins: [ReturnType<typeof customSession<CustomSession>>];
  };
};

export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL ?? "https://tradaz-ui.vercel.app", // add env later*
  fetchOptions: { credentials: "include" },
  plugins: [
    customSessionClient<ServerAuth>(),
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

export type AuthClient = typeof authClient;

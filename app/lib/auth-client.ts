import { createAuthClient } from "better-auth/client";
import { usernameClient, organizationClient, adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  plugins: [
    usernameClient(),
    organizationClient({
      schema: {
        organization: {
          additionalFields: {
            categoryId: {
              type: "string",
              required: false,
            },
            
            
          },
        },
      },
    }),
    adminClient(),
  ],
});
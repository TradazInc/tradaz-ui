// import { createAuthClient } from "better-auth/client";
// import { usernameClient,organizationClient } from "better-auth/client/plugins";

// export const authClient = createAuthClient({
//     baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", 
//     plugins: [
//         usernameClient(),
//         organizationClient()
//     ]
// });

import { createAuthClient } from "better-auth/client";
import { usernameClient, organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  plugins: [
    usernameClient(),
    organizationClient({
      schema: {
        organization: {
          additionalFields: {
            categoryId: {
              type: "number",
              required: false,
            },
            // Add any other fields you've defined on the server here,
            
          },
        },
      },
    }),
  ],
});
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", 
});

export const { useSession, signIn, signUp } = authClient;





// import { createAuthClient } from "better-auth/client";
// const authClient = createAuthClient();

// const signIn = async () => {
//   const data = await authClient.signIn.social({
//     provider: "google",
//   });
// };




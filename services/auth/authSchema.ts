import { z } from "zod";

export const emailSignUpSchema = z.object({
  name: z.string({ error: "name is required" }),
  email: z.email({ error: "email is required" }),
  password: z.string({ error: "Password is required" }),
});

export const emailSignInSchema = z.object({
  email: z.email({ error: "email is required" }),
  password: z.string({ error: "password is required" }),
});

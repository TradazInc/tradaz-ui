import { z } from "zod";

export const emailSignUpSchema = z.object({
  name: z.string({ error: "name is required" }).min(3),
  email: z.email({ error: "email is required" }),
  password: z.string({ error: "Password is required" }).min(5),
});

export const emailSignInSchema = z.object({
  email: z.email({ error: "email is required" }).min(3),
  password: z.string({ error: "password is required" }).min(5),
});

import { z } from "zod";

export const emailSignUpSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export const emailSignInSchema = z.object({
  email: z.email(),
  password: z.string(),
});

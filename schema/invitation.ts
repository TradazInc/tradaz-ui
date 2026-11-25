import { authClient } from "@/lib/authClient";
import { z } from "zod";

// Create
export const CreateInvitationInputSchema = z.object({
  email: z.email({ error: "enter a valid email address" }),
  role: z
    .string({ error: "role is required" })
    .min(1, { error: "role is required" }),
  teamId: z.string().optional(),
});
export type CreateInvitationInputData = z.input<
  typeof CreateInvitationInputSchema
>;

export const emptyInvitation: CreateInvitationInputData = {
  email: "",
  role: "staff",
  teamId: undefined,
};

export type GetInvitationOutputData = typeof authClient.$Infer.Invitation;
export type GetAllInvitationOutputData = GetInvitationOutputData[];

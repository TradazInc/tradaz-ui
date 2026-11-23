import { resources, OrgResource, orgStatements } from "@/lib/accessControl";
import { getRoles } from "@/server/role";
import { z } from "zod";

// Get All
export type GetAllRolesOutputData = Awaited<ReturnType<typeof getRoles>>;
export type GetRoleOutputData = GetAllRolesOutputData[number];

// Create
export const CreateRoleInputSchema = z.object({
  role: z
    .string({ error: "role name is required" })
    .trim()
    .min(2, { error: "role name must be at least 2 characters long" })
    .max(50, { error: "role name must be at most 50 characters long" })
    .regex(/^[a-z0-9-]+$/, {
      error: "use lowercase letters, numbers and hyphens only",
    }),

  permission: z
    .partialRecord(z.enum(resources), z.string().array())
    .superRefine((permission, ctx) => {
      let selected = 0;

      for (const [resource, actions] of Object.entries(permission)) {
        const allowed: readonly string[] =
          orgStatements[resource as OrgResource];
        for (const action of actions ?? []) {
          if (!allowed.includes(action)) {
            ctx.addIssue({
              code: "custom",
              path: [resource],
              message: `"${action}" is not a valid ${resource} permission`,
            });
          }
        }
        selected += actions?.length ?? 0;
      }

      if (selected === 0) {
        ctx.addIssue({
          code: "custom",
          message: "select at least one permission",
        });
      }
    }),
});
export type CreateRoleInputData = z.infer<typeof CreateRoleInputSchema>;

export const emptyRole: CreateRoleInputData = { role: "", permission: {} };

/** Drops resources with no selected actions so the API only sees granted ones. */
export const toPermission = (
  permission: CreateRoleInputData["permission"],
): Record<string, string[]> =>
  Object.fromEntries(
    Object.entries(permission).filter(
      (entry): entry is [string, string[]] => !!entry[1]?.length,
    ),
  );

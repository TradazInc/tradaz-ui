import { z } from "zod";

export const businessSchema = z.object({
  name: z.string({ error: "name is required" }),
  address: z.string({ error: "address is required" }),
  description: z.string({ error: "description is required" }),
  categoryId: z.cuid2({ error: "select a business category" }),
  phone: z.string({ error: "phone number is required" }),
  slug: z.string({ error: "slug is required" }).slugify(),
});

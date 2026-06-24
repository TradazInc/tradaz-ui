import { z } from "zod";

export const businessSchema = z.object({
  name: z.string({ error: "name is required" }).min(3),
  address: z.string({ error: "address is required" }).min(5),
  description: z.string({ error: "description is required" }).min(5).max(255),
  categoryId: z.cuid2({ error: "select a business category" }),
  phone: z.e164({ error: "phone number is required" }).min(11),
  slug: z.string({ error: "slug is required" }).slugify(),
});

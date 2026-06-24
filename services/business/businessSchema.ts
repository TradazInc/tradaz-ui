import { z } from "zod";

export const businessSchema = z.object({
  name: z.string(),
  address: z.string(),
  description: z.string(),
  categoryId: z.cuid2(),
  phone: z.string(),
  slug: z.string().slugify(),
});

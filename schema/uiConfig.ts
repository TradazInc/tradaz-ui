import type { Data } from "@puckeditor/core";
import { z } from "zod";

const PuckComponentDataSchema = z.toZod<Data["content"][number]>()(
  z.object({
    type: z.string(),
    props: z.any(), // component props are typed `any` by Puck
    readOnly: z
      .partialRecord(z.union([z.string(), z.number(), z.symbol()]), z.boolean())
      .optional(),
  }),
);
const PuckRootDataSchema = z.object({
  title: z.string().optional(),
  props: z.object({ title: z.string().optional() }).optional(),
  readOnly: z.object({ title: z.boolean().optional() }).optional(),
});
const PuckContentSchema = z.toZod<Data["content"]>()(
  z.array(PuckComponentDataSchema),
);
const PuckZonesSchema = z.toZod<NonNullable<Data["zones"]>>()(
  z.record(z.string(), PuckContentSchema),
);
export const PuckDataSchema = z
  .toZod<Omit<Data, "zones">>()(
    z.object({ root: PuckRootDataSchema, content: PuckContentSchema }),
  )
  .extend({ zones: PuckZonesSchema.optional() });
export type PuckData = z.infer<typeof PuckDataSchema>;

const UIConfigOutputSchema = z.object({
  id: z.cuid2(),
  page: PuckDataSchema.nullable(),
  createdAt: z.iso.datetime(),
  organizationId: z.cuid2(),
});

// Get (by business id)
export const GetUIConfigOutputSchema = UIConfigOutputSchema.nullable();
export type GetUIConfigOutputData = z.infer<typeof GetUIConfigOutputSchema>;

// Get storefront (public, by business slug)
export const GetStorefrontUIConfigParamsSchema = z.object({
  slug: z.string(),
});

export const GetStorefrontUIConfigOutputSchema = UIConfigOutputSchema.pick({
  page: true,
}).nullable();
export type GetStorefrontUIConfigOutputData = z.infer<
  typeof GetStorefrontUIConfigOutputSchema
>;

// Create (upsert)
export const CreateUIConfigInputSchema = z.object({ page: PuckDataSchema });
export type CreateUIConfigInputData = z.input<typeof CreateUIConfigInputSchema>;

export const CreateUIConfigOutputSchema = UIConfigOutputSchema;

// Delete
export const DeleteUIConfigOutputSchema = CreateUIConfigOutputSchema.pick({
  id: true,
});

export const emptyPage = { root: { props: {} }, content: [] } satisfies Data;

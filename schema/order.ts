import { z } from "zod";
import { createFetchResponseSchema } from "../utilities/fetchResponse";
import { Gateway, OrderStatus, TransactionStatus } from "./enums";

/* Output Base Schemas */
const OrderOutputBaseSchema = z.object({
  id: z.cuid2(),
  couponCode: z.string().nullable(),
  points: z.number().nullable(),
  reference: z.string(),
  paidPrice: z.coerce.number(),
  totalPrice: z.coerce.number(),
  discount: z.coerce.number(),
  orderStatus: z.enum(OrderStatus),
  createdAt: z.iso.datetime(),
  organizationId: z.cuid2(),
  teamId: z.cuid2().nullable(),
  memberId: z.cuid2(),
  cartId: z.cuid2().nullable(),
});

export const OrderItemOutputSchema = z.object({
  id: z.cuid2(),
  name: z.string(),
  quantity: z.number(),
  unitPrice: z.coerce.number(),
  paidPrice: z.coerce.number(),
  totalPrice: z.coerce.number(),
  discount: z.coerce.number(),
  orderId: z.cuid2(),
  variationId: z.cuid2(),
  vendorId: z.cuid2().nullable(),
});
export type OrderItemOutputData = z.infer<typeof OrderItemOutputSchema>;

export const TransactionOutputSchema = z.object({
  id: z.cuid2(),
  externalTxId: z.string().nullable(),
  amount: z.coerce.number(),
  gateway: z.enum(Gateway),
  transactionStatus: z.enum(TransactionStatus),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  orderId: z.cuid2(),
  paymentConfigId: z.cuid2().nullable(),
  terminalConfigId: z.cuid2().nullable(),
});
export type TransactionOutputData = z.infer<typeof TransactionOutputSchema>;

// Get
export const GetOrderParamSchema = z.object({
  id: z.cuid2(),
});

export const GetOrderOutputSchema = OrderOutputBaseSchema.extend({
  orderItems: z.array(OrderItemOutputSchema),
  transactions: z.array(TransactionOutputSchema),
  member: z.object({
    id: z.cuid2(),
    role: z.string(),
    approved: z.boolean(),
    createdAt: z.iso.datetime(),
    organizationId: z.cuid2(),
    userId: z.cuid2(),
    user: z.object({ name: z.string(), email: z.string() }),
  }),
});
export type GetOrderOutputData = z.infer<typeof GetOrderOutputSchema>;

// Get All
export const GetAllOrderQuerySchema = z.object({
  orderStatus: z.enum(OrderStatus).optional(),
  search: z.string().optional(),
  teamId: z.cuid2().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  cursor: z.cuid2().optional(),
  pageSize: z.number().positive().optional(),
});

export const GetAllOrderOutputSchema = createFetchResponseSchema(
  OrderOutputBaseSchema.pick({
    id: true,
    orderStatus: true,
    createdAt: true,
    reference: true,
    totalPrice: true,
    paidPrice: true,
  }),
);
export type GetAllOrderOutputData = z.infer<typeof GetAllOrderOutputSchema>;

// Update Status
export const UpdateOrderStatusParamSchema = z.object({
  id: z.cuid2(),
});

export const UpdateOrderStatusInputSchema = z.enum(OrderStatus, {
  error: "select an order status",
});

export type UpdateOrderStatusInputData = z.input<
  typeof UpdateOrderStatusInputSchema
>;
export const UpdateOrderStatusOutputSchema = OrderOutputBaseSchema;

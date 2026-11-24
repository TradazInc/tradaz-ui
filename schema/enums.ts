export enum Role {
  admin = "admin",
  user = "user",
}

export enum TransactionStatus {
  pending = "pending",
  paid = "paid",
}

export enum OrderStatus {
  pending = "pending",
  paid = "paid",
  fulfilled = "fulfilled",
  cancelled = "cancelled",
}

export enum Gateway {
  opay = "opay",
  moniepoint = "moniepoint",
  paystack = "paystack",
}

export enum Gender {
  male = "male",
  female = "female",
  unisex = "unisex",
}

export enum ProductStatus {
  approved = "approved",
  pending = "pending",
  rejected = "rejected",
}

export enum DiscountType {
  percentage = "percentage",
  fixed = "fixed",
}

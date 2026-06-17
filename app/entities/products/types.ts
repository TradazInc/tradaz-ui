// ---- Enums & Constants ----
export type Gender = "male" | "female" | "unisex";
export type ProductStatus = "approved" | "pending" | "rejected";

// ---- Image ----
export interface ProductImage {
  id?: string;
  url: string;
}

// ---- Team Variation (inventory per team/location) ----
export interface TeamVariation {
  id?: string;
  quantity: number;
  teamId: string;
}

// ---- Variation (SKU-level) ----
export interface ProductVariation {
  id?: string;
  sku: string;
  color: string;
  price: number;
  sizeId: string;
  teamVariations: TeamVariation[];
}

// ---- Product ----
export interface Product {
  id: string;
  name: string;
  brand: string;
  gender: Gender;
  description: string;
  discountPercentage: number;
  categoryId: string;
  sizeTypeId: string;
  productStatus: ProductStatus;
  variations: ProductVariation[];
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

// ---- Pagination ----
export interface Pagination {
  page: number;
  pageSize: number;
  count: number;
}

// ---- API Response Shapes ----
export interface ProductListResponse {
  products: Product[];
  pagination: Pagination;
}

export interface ProductResponse {
  product: Product;
}

// ---- Request Payloads ----
export interface CreateProductPayload {
  name: string;
  brand: string;
  gender: Gender;
  description: string;
  discountPercentage: number;
  categoryId: string;
  sizeTypeId: string;
  variations: Omit<ProductVariation, "id">[];
  images: { url: string }[];
}

export interface UpdateProductPayload {
  name?: string;
  brand?: string;
  gender?: Gender;
  description?: string;
  discountPercentage?: number;
  categoryId?: string;
  sizeTypeId?: string;
  variations?: ProductVariation[];
  images?: { url: string }[];
}

export interface UpdateProductStatusPayload {
  productStatus: ProductStatus;
}

// ---- Query Parameters ----
export interface ProductListParams {
  categoryId?: string;
  name?: string;
  teamId?: string;
  page?: number;
  pageSize?: number;
}
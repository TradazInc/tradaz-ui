// ---- Enums & Constants ----
export type Gender = "male" | "female" | "unisex";
export type ProductStatus = "approved" | "pending" | "rejected";


export interface ProductImage {
  id?: string;
  url: string;
}


export interface TeamVariation {
  id?: string;
  quantity: number;
  teamId: string;
}


export interface ProductVariation {
  id?: string;
  sku: string;
  color: string;
  price: number;
  sizeId: string;
  teamVariations: TeamVariation[];
}

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


export interface ProductListResponse {
  products: Product[];
  pagination: Pagination;
}

export interface ProductResponse {
  product: Product;
}


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

// Query Parameters 
export interface ProductListParams {
  categoryId?: string;
  name?: string;
  teamId?: string;
  page?: number;
  pageSize?: number;
}
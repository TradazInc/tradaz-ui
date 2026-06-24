// Dummy replacement for the deleted entities/products/{hooks,api}.
// Exposes useProductList/useProduct/useProductActions plus a `productsApi`
// stub, all backed by static data so the inventory & add-product pages run.
import { dummyQuery, dummyMutation } from "./_stub";
import type {
  Product,
  ProductListParams,
  ProductListResponse,
  CreateProductPayload,
  UpdateProductPayload,
  UpdateProductStatusPayload,
} from "@/data/types";

const DUMMY_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Vortex 11 Sneakers",
    brand: "Tracer",
    gender: "unisex",
    description: "Lightweight everyday sneakers with breathable mesh.",
    discountPercentage: 10,
    categoryId: "cat-shoes",
    sizeTypeId: "size-eu",
    productStatus: "approved",
    variations: [
      {
        id: "var-1",
        sku: "VTX11-BLK-42",
        color: "Black",
        price: 87000,
        sizeId: "42",
        teamVariations: [{ id: "tv-1", quantity: 8, teamId: "team-1" }],
      },
    ],
    images: [{ id: "img-1", url: "https://picsum.photos/seed/prod1/400/400" }],
    createdAt: "2026-02-10",
    updatedAt: "2026-02-15",
  },
  {
    id: "prod-2",
    name: "Graphic Tee",
    brand: "Urban",
    gender: "male",
    description: "100% cotton graphic tee with a relaxed fit.",
    discountPercentage: 0,
    categoryId: "cat-tops",
    sizeTypeId: "size-alpha",
    productStatus: "pending",
    variations: [
      {
        id: "var-2",
        sku: "GTEE-WHT-L",
        color: "White",
        price: 15000,
        sizeId: "L",
        teamVariations: [{ id: "tv-2", quantity: 20, teamId: "team-1" }],
      },
    ],
    images: [{ id: "img-2", url: "https://picsum.photos/seed/prod2/400/400" }],
    createdAt: "2026-02-12",
    updatedAt: "2026-02-18",
  },
];

const DUMMY_LIST: ProductListResponse = {
  products: DUMMY_PRODUCTS,
  pagination: { page: 1, pageSize: 100, count: DUMMY_PRODUCTS.length },
};

export function useProductList(_params?: ProductListParams) {
  return dummyQuery(DUMMY_LIST);
}

export function useProduct(id: string) {
  const product = DUMMY_PRODUCTS.find((p) => p.id === id) ?? DUMMY_PRODUCTS[0];
  return dummyQuery({ product });
}

export function useProductActions() {
  return {
    create: dummyMutation(),
    update: dummyMutation(),
    remove: dummyMutation(),
    updateStatus: dummyMutation(),
    deleteImages: dummyMutation(),
  };
}

// Dummy stand-in for the deleted products API client.
export const productsApi = {
  list: async (_params?: ProductListParams): Promise<ProductListResponse> =>
    DUMMY_LIST,
  getById: async (id: string) => ({
    product: DUMMY_PRODUCTS.find((p) => p.id === id) ?? DUMMY_PRODUCTS[0],
  }),
  create: async (_payload: CreateProductPayload) => ({
    product: DUMMY_PRODUCTS[0],
  }),
  update: async (_id: string, _payload: UpdateProductPayload) => ({
    product: DUMMY_PRODUCTS[0],
  }),
  delete: async (_id: string) => ({ success: true }),
  updateStatus: async (_id: string, _payload: UpdateProductStatusPayload) => ({
    product: DUMMY_PRODUCTS[0],
  }),
  deleteImages: async (_imageIds: string[]) => ({ success: true }),
  uploadImage: async (_file: File): Promise<string> =>
    `https://picsum.photos/seed/upload-${Math.floor(Math.random() * 10000)}/400/400`,
};

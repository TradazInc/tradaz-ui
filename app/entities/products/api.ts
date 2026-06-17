import axios from "axios";
import type {
  ProductListResponse,
  ProductResponse,
  ProductListParams,
  CreateProductPayload,
  UpdateProductPayload,
  UpdateProductStatusPayload,
} from "@/app/entities/products/types";

const BASE = "/api/products";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

const productsAxios = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const productsApi = {
  // ---- Product CRUD ----
  list: (params?: ProductListParams) =>
    productsAxios.get<ProductListResponse>(BASE, { params }).then((r) => r.data),

  getById: (id: string) =>
    productsAxios.get<ProductResponse>(`${BASE}/${id}`).then((r) => r.data),

  create: (body: CreateProductPayload) =>
    productsAxios.post<ProductResponse>(BASE, body).then((r) => r.data),

  update: (id: string, body: UpdateProductPayload) =>
    productsAxios.put<ProductResponse>(`${BASE}/${id}`, body).then((r) => r.data),

  delete: (id: string) =>
    productsAxios.delete(`${BASE}/${id}`).then((r) => r.data),

  updateStatus: (id: string, body: UpdateProductStatusPayload) =>
    productsAxios.patch<ProductResponse>(`${BASE}/${id}/status`, body).then((r) => r.data),

  deleteImages: (imageIds: string[]) =>
    productsAxios.post(`${BASE}/image/delete`, imageIds).then((r) => r.data),

  //  Image Upload i will swap when endpoint is ready 
  uploadImage: async (file: File): Promise<string> => {
    // TODO: Replace with real upload when endpoint exists:
    //
    // const formData = new FormData();
    // formData.append("file", file);
    // const { data } = await productsAxios.post<{ url: string }>(
    //   "/api/upload",
    //   formData,
    //   { headers: { "Content-Type": "multipart/form-data" } },
    // );
    // return data.url;

    // For now, return local preview URL
    return URL.createObjectURL(file);
  },
};
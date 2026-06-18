import axios from "axios";
import type { BusinessCategory, CreateCategoryPayload } from "./types";

const BASE = "/api/business-categories";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

const categoriesAxios = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const categoriesApi = {
  list: () =>
    categoriesAxios.get<BusinessCategory[]>(BASE).then((r) => r.data),

  create: (body: CreateCategoryPayload) =>
    categoriesAxios.post<BusinessCategory>(BASE, body).then((r) => r.data),

  delete: (id: string) =>
    categoriesAxios.delete(`${BASE}/${id}`).then((r) => r.data),
};
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "./api";
import type {
  ProductListParams,
  CreateProductPayload,
  UpdateProductPayload,
  UpdateProductStatusPayload,
} from "./types";
import { toaster } from "@/components/ui/toaster";

// Query Keys
const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (params?: ProductListParams) => [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

// Queries 
export function useProductList(params?: ProductListParams) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => productsApi.list(params),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
}

//  Mutations 
export function useProductActions() {
  const queryClient = useQueryClient();

  const invalidateList = () =>
    queryClient.invalidateQueries({ queryKey: productKeys.lists() });

  const invalidateDetail = (id: string) =>
    queryClient.invalidateQueries({ queryKey: productKeys.detail(id) });

  const successToast = (message: string) =>
    toaster.create({ title: "Success", description: message, type: "success" });

  const errorToast = (message: string) =>
    toaster.create({ title: "Error", description: message, type: "error" });

  return {
    create: useMutation({
      mutationFn: (payload: CreateProductPayload) => productsApi.create(payload),
      onSuccess: () => {
        invalidateList();
        successToast("Product created successfully");
      },
      onError: () => errorToast("Failed to create product"),
    }),

    update: useMutation({
      mutationFn: ({ id, ...payload }: { id: string } & UpdateProductPayload) =>
        productsApi.update(id, payload),
      onSuccess: (_, variables) => {
        invalidateList();
        invalidateDetail(variables.id);
        successToast("Product updated successfully");
      },
      onError: () => errorToast("Failed to update product"),
    }),

    remove: useMutation({
      mutationFn: (id: string) => productsApi.delete(id),
      onSuccess: () => {
        invalidateList();
        successToast("Product deleted successfully");
      },
      onError: () => errorToast("Failed to delete product"),
    }),

    updateStatus: useMutation({
      mutationFn: ({ id, ...payload }: { id: string } & UpdateProductStatusPayload) =>
        productsApi.updateStatus(id, payload),
      onSuccess: (_, variables) => {
        invalidateList();
        invalidateDetail(variables.id);
        successToast("Product status updated");
      },
      onError: () => errorToast("Failed to update status"),
    }),

    deleteImages: useMutation({
      mutationFn: (imageIds: string[]) => productsApi.deleteImages(imageIds),
      onSuccess: () => successToast("Images deleted"),
      onError: () => errorToast("Failed to delete images"),
    }),
  };
}
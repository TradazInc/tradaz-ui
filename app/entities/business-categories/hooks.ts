import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesApi } from "./api";
import type { CreateCategoryPayload } from "./types";
import { toaster } from "@/components/ui/toaster";

const categoryKeys = {
  all: ["business-categories"] as const,
};

export function useBusinessCategories() {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: categoriesApi.list,
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });
}

export function useCategoryActions() {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: categoryKeys.all });

  return {
    create: useMutation({
      mutationFn: (payload: CreateCategoryPayload) => categoriesApi.create(payload),
      onSuccess: () => {
        invalidate();
        toaster.create({ title: "Category created", type: "success" });
      },
      onError: () => toaster.create({ title: "Failed to create category", type: "error" }),
    }),
    remove: useMutation({
      mutationFn: (id: string) => categoriesApi.delete(id),
      onSuccess: () => {
        invalidate();
        toaster.create({ title: "Category deleted", type: "success" });
      },
      onError: () => toaster.create({ title: "Failed to delete category", type: "error" }),
    }),
  };
}
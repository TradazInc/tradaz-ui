// Dummy replacement for the deleted entities/business-categories/hooks.
import { dummyQuery, dummyMutation } from "./_stub";
import type { BusinessCategory } from "@/data/types";

const DUMMY_CATEGORIES: BusinessCategory[] = [
  { id: "cat-fashion", name: "Fashion & Apparel" },
  { id: "cat-electronics", name: "Electronics" },
  { id: "cat-beauty", name: "Beauty & Personal Care" },
  { id: "cat-home", name: "Home & Living" },
  { id: "cat-food", name: "Food & Groceries" },
];

export function useBusinessCategories() {
  return dummyQuery(DUMMY_CATEGORIES);
}

export function useCategoryActions() {
  return {
    create: dummyMutation(),
    remove: dummyMutation(),
  };
}

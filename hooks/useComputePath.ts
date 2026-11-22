"use client";

import { AppBase, computePath } from "@/utilities/computePath";
import { sectionOf } from "@/utilities/section";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

// "staff" on the staff portal, "merchant" on the merchant dashboard
export function useAppBase(): AppBase {
  return sectionOf(usePathname()) === "/staff" ? "staff" : "merchant";
}

export function useComputePath() {
  const base = useAppBase();
  return useCallback(
    (businessId?: string, storeId?: string) =>
      computePath(base, businessId, storeId),
    [base],
  );
}

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export const useClientSearch = <T>(
  items: T[] | undefined,
  field: StringKeys<T>,
) => {
  const search = useSearchParams().get("search")?.trim().toLowerCase();

  const results = useMemo(
    () =>
      (items ?? []).filter(
        (item) =>
          !search || (item[field] as string).toLowerCase().includes(search),
      ),
    [items, field, search],
  );

  return { results, search };
};

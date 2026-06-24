// Dummy replacement for the deleted entities/business/hooks.
// Returns static businesses so the dashboard renders while testing.
import { dummyQuery, dummyMutation } from "./_stub";

const DUMMY_BUSINESSES = [
  {
    id: "biz-1",
    name: "Tradaz Fashion",
    slug: "tradaz-fashion",
    logo: null,
    createdAt: new Date("2026-01-05"),
  },
  {
    id: "biz-2",
    name: "Urban Threads",
    slug: "urban-threads",
    logo: null,
    createdAt: new Date("2026-02-12"),
  },
];

export function useBusinessList() {
  return dummyQuery(DUMMY_BUSINESSES);
}

export function useActiveBusiness() {
  return dummyQuery(DUMMY_BUSINESSES[0]);
}

export function useBusinessActions() {
  return {
    create: dummyMutation(),
    update: dummyMutation(),
    delete: dummyMutation(),
    setActive: dummyMutation(),
    leave: dummyMutation(),
  };
}

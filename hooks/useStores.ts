// Dummy replacement for the deleted entities/stores/hooks.
// Returns static stores (teams) so the store breadcrumb / shops page render.
import { dummyQuery, dummyMutation } from "./_stub";

const DUMMY_TEAMS = [
  {
    id: "team-1",
    name: "Lagos Flagship",
    address: "12 Marina Rd, Lagos",
    createdAt: new Date("2026-01-10"),
  },
  {
    id: "team-2",
    name: "Abuja Outlet",
    address: "44 Wuse Zone 5, Abuja",
    createdAt: new Date("2026-02-02"),
  },
];

export function useTeamList(_organizationId?: string) {
  return dummyQuery(DUMMY_TEAMS);
}

export function useTeamActions() {
  return {
    create: dummyMutation(),
    update: dummyMutation(),
    remove: dummyMutation(),
    setActive: dummyMutation(),
  };
}

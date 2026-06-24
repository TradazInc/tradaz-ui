// Dummy replacement for the deleted app/entities/admin/hooks.
// Returns static platform users + no-op admin action mutations.
import { dummyQuery, dummyMutation } from "./_stub";

const DUMMY_USERS = [
  {
    id: "usr-1",
    name: "Grace Wada",
    email: "grace.wada@example.com",
    role: "admin",
    banned: false,
    createdAt: "2026-01-03",
    updatedAt: "2026-06-01",
  },
  {
    id: "usr-2",
    name: "Chinedu Okeke",
    email: "chinedu.okeke@example.com",
    role: "user",
    banned: false,
    createdAt: "2026-02-14",
    updatedAt: "2026-05-20",
  },
  {
    id: "usr-3",
    name: "Sarah Connor",
    email: "sarah.connor@example.com",
    role: "user",
    banned: true,
    createdAt: "2026-03-08",
    updatedAt: "2026-04-11",
  },
];

export function useListUsers(
  _queryParams?: { limit?: number } & Record<string, unknown>,
) {
  return dummyQuery({ users: DUMMY_USERS });
}

export function useGetUser(userId: string) {
  return dummyQuery({
    user: DUMMY_USERS.find((u) => u.id === userId) ?? DUMMY_USERS[0],
  });
}

export function useListUserSessions(_userId: string) {
  return dummyQuery({ sessions: [] as unknown[] });
}

export function useAdminActions() {
  return {
    createUser: dummyMutation(),
    updateUser: dummyMutation(),
    setRole: dummyMutation(),
    banUser: dummyMutation(),
    unbanUser: dummyMutation(),
    removeUser: dummyMutation(),
    setPassword: dummyMutation(),
    revokeSession: dummyMutation(),
    revokeAllSessions: dummyMutation(),
    impersonateUser: dummyMutation(),
    stopImpersonating: dummyMutation(),
  };
}

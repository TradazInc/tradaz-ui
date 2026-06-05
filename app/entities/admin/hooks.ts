
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "./api";
import * as T from "./types";

// The Data Fetcher 
export function useAdminUsers(params?: T.ListUsersParams) {
  return useQuery({
    queryKey: ["admin", "users", params], // key for caching
    queryFn: () => adminApi.listUsers(params),
  });
}

// 2. The Mutator (Replaces useAdminUserActions)
export function useAdminActions() {
  const queryClient = useQueryClient();

  // Helper to automatically refresh the user table after any action!
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
  };

  return {
    createUser: useMutation({ mutationFn: adminApi.createUser, onSuccess }),
    setRole: useMutation({ mutationFn: adminApi.setRole, onSuccess }),
    banUser: useMutation({ mutationFn: adminApi.banUser, onSuccess }),
    unbanUser: useMutation({ mutationFn: adminApi.unbanUser, onSuccess }),
    removeUser: useMutation({ mutationFn: adminApi.removeUser, onSuccess }),
    setPassword: useMutation({ mutationFn: adminApi.setPassword, onSuccess }),
    revokeAll: useMutation({ mutationFn: adminApi.revokeAllSessions, onSuccess }),
    impersonate: useMutation({ mutationFn: adminApi.impersonateUser }),
  };
}
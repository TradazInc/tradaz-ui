import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/app/lib/authClient";

// ---- Queries ----
export function useListUsers(
  queryParams?: Parameters<typeof authClient.admin.listUsers>[0]["query"],
) {
  return useQuery({
    queryKey: ["admin", "users", queryParams],
    queryFn: () => authClient.admin.listUsers({ query: queryParams ?? {} }),
  });
}

export function useGetUser(userId: string) {
  return useQuery({
    queryKey: ["admin", "user", userId],
    queryFn: () => authClient.admin.getUser({ query: { id: userId } }),
    enabled: !!userId,
  });
}

export function useListUserSessions(userId: string) {
  return useQuery({
    queryKey: ["admin", "sessions", userId],
    queryFn: () => authClient.admin.listUserSessions({ userId }),
    enabled: !!userId,
  });
}

// ---- Mutations ----
export function useAdminActions() {
  const queryClient = useQueryClient();

  const invalidateUsers = () =>
    queryClient.invalidateQueries({ queryKey: ["admin", "users"] });

  const invalidateUser = (userId: string) =>
    queryClient.invalidateQueries({ queryKey: ["admin", "user", userId] });

  return {
    createUser: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.admin.createUser>[0],
      ) => {
        const { data, error } = await authClient.admin.createUser(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: invalidateUsers,
    }),

    updateUser: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.admin.updateUser>[0],
      ) => {
        const { data, error } = await authClient.admin.updateUser(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: (_data, variables) =>
        invalidateUser(variables.userId as string),
    }),

    setRole: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.admin.setRole>[0],
      ) => {
        const { data, error } = await authClient.admin.setRole(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: (_data, variables) => {
        if (variables.userId) {
          invalidateUser(variables.userId as string);
        }
        invalidateUsers();
      },
    }),

    banUser: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.admin.banUser>[0],
      ) => {
        const { data, error } = await authClient.admin.banUser(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: (_data, variables) => {
        invalidateUser(variables.userId as string);
        invalidateUsers();
      },
    }),

    unbanUser: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.admin.unbanUser>[0],
      ) => {
        const { data, error } = await authClient.admin.unbanUser(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: (_data, variables) => {
        invalidateUser(variables.userId as string);
        invalidateUsers();
      },
    }),

    removeUser: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.admin.removeUser>[0],
      ) => {
        const { data, error } = await authClient.admin.removeUser(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: invalidateUsers,
    }),

    setPassword: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.admin.setUserPassword>[0],
      ) => {
        const { data, error } = await authClient.admin.setUserPassword(payload);
        if (error) throw new Error(error.message);
        return data;
      },
    }),

    revokeSession: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.admin.revokeUserSession>[0],
      ) => {
        const { data, error } =
          await authClient.admin.revokeUserSession(payload);
        if (error) throw new Error(error.message);
        return data;
      },
    }),

    revokeAllSessions: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.admin.revokeUserSessions>[0],
      ) => {
        const { data, error } =
          await authClient.admin.revokeUserSessions(payload);
        if (error) throw new Error(error.message);
        return data;
      },
    }),

    impersonateUser: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.admin.impersonateUser>[0],
      ) => {
        const { data, error } = await authClient.admin.impersonateUser(payload);
        if (error) throw new Error(error.message);
        return data;
      },
    }),

    stopImpersonating: useMutation({
      mutationFn: async () => {
        const { data, error } = await authClient.admin.stopImpersonating();
        if (error) throw new Error(error.message);
        return data;
      },
    }),
  };
}

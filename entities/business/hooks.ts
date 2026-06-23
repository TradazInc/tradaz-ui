import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/authClient";

export function useBusinessList() {
  return authClient.useListOrganizations;
}

export function useActiveBusiness() {
  return authClient.useActiveOrganization;
}

export function useBusinessActions() {
  const queryClient = useQueryClient();

  const invalidateBusinessCache = () =>
    queryClient.invalidateQueries({ queryKey: ["organization"] });

  return {
    create: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.organization.create>[0],
      ) => {
        try {
          const { data, error } = await authClient.organization.create(payload);
          if (error) throw new Error(error.message);
          return data ?? {};
        } catch (err) {
          if (err instanceof SyntaxError && err.message.includes("JSON")) {
            return {};
          }
          throw err;
        }
      },
      onSuccess: invalidateBusinessCache,
    }),
    update: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.organization.update>[0],
      ) => {
        const { data, error } = await authClient.organization.update(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: invalidateBusinessCache,
    }),
    delete: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.organization.delete>[0],
      ) => {
        const { data, error } = await authClient.organization.delete(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: invalidateBusinessCache,
    }),
    setActive: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.organization.setActive>[0],
      ) => {
        const { data, error } =
          await authClient.organization.setActive(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: invalidateBusinessCache,
    }),
    leave: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.organization.leave>[0],
      ) => {
        const { data, error } = await authClient.organization.leave(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: invalidateBusinessCache,
    }),
  };
}

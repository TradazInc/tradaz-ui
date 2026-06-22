import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/app/lib/authClient";
import { toaster } from "@/components/ui/toaster";

const teamKeys = {
  all: ["teams"] as const,
  list: (orgId?: string) => [...teamKeys.all, "list", orgId] as const,
};

// ---- Queries ----
export function useTeamList(organizationId?: string) {
  return useQuery({
    queryKey: teamKeys.list(organizationId),
    queryFn: () =>
      authClient.organization.listTeams({ query: { organizationId } }),
  });
}

// ---- Mutations ----
export function useTeamActions() {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: teamKeys.all });

  return {
    create: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.organization.createTeam>[0],
      ) => {
        const { data, error } =
          await authClient.organization.createTeam(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: () => {
        invalidate();
        toaster.create({ title: "Store created", type: "success" });
      },
      onError: () =>
        toaster.create({ title: "Failed to create store", type: "error" }),
    }),

    update: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.organization.updateTeam>[0],
      ) => {
        const { data, error } =
          await authClient.organization.updateTeam(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: () => {
        invalidate();
        toaster.create({ title: "Store updated", type: "success" });
      },
      onError: () =>
        toaster.create({ title: "Failed to update store", type: "error" }),
    }),

    remove: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.organization.removeTeam>[0],
      ) => {
        const { data, error } =
          await authClient.organization.removeTeam(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: () => {
        invalidate();
        toaster.create({ title: "Store deleted", type: "success" });
      },
      onError: () =>
        toaster.create({ title: "Failed to delete store", type: "error" }),
    }),

    setActive: useMutation({
      mutationFn: async (
        payload: Parameters<typeof authClient.organization.setActiveTeam>[0],
      ) => {
        const { data, error } =
          await authClient.organization.setActiveTeam(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: () => {
        toaster.create({ title: "Active store changed", type: "info" });
      },
    }),
  };
}

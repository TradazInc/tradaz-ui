import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/app/lib/auth-client"; 


export const useBusinessList = authClient.useListOrganizations;
export const useActiveBusiness = authClient.useActiveOrganization;

export function useBusinessActions() {
  const queryClient = useQueryClient();


  const invalidateBusinessCache = () => {
    queryClient.invalidateQueries({ queryKey: ["organization"] }); 
  };

  return {
    create: useMutation({
      mutationFn: async (payload: Parameters<typeof authClient.organization.create>[0]) => {
        const { data, error } = await authClient.organization.create(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: invalidateBusinessCache,
    }),
    
    update: useMutation({
      mutationFn: async (payload: Parameters<typeof authClient.organization.update>[0]) => {
        const { data, error } = await authClient.organization.update(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: invalidateBusinessCache,
    }),

    delete: useMutation({
      mutationFn: async (payload: Parameters<typeof authClient.organization.delete>[0]) => {
        const { data, error } = await authClient.organization.delete(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: invalidateBusinessCache,
    }),

    setActive: useMutation({
      mutationFn: async (payload: Parameters<typeof authClient.organization.setActive>[0]) => {
        const { data, error } = await authClient.organization.setActive(payload);
        if (error) throw new Error(error.message);
        return data;
      },
      onSuccess: invalidateBusinessCache,
    })
  };
}
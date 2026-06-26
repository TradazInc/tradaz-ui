import { authClient } from "@/lib/authClient";

export const useBusinesses = () => {
  return authClient.useListOrganizations();
};

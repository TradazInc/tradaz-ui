import { AuthClient, authClient } from "@/lib/authClient";

class StoreService {
  constructor(private readonly auth: AuthClient) {}

  async getStores(organizationId: string) {
    return this.auth.organization.listTeams({ query: { organizationId } });
  }

  async setActiveStore(teamId: string) {
    return this.auth.organization.setActiveTeam({ teamId });
  }
}

export const storeService = new StoreService(authClient);

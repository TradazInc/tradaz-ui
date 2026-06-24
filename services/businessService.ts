import { toaster } from "@/components/ui/toaster";
import { AuthClient, authClient } from "@/lib/authClient";
import { businessSchema } from "@/types/business";

class BusinessService {
  constructor(private readonly auth: AuthClient) {}

  async createBusiness(formData: FormData) {
    const result = Object.fromEntries(formData.entries());
    const { data, error } = businessSchema.safeParse(result);

    // validate form
    if (error)
      return toaster.create({
        title: error.name,
        description: error.message,
        type: "error",
      });

    return this.auth.organization.create({
      ...data,
      metadata: { description: data.description },
      keepCurrentActiveOrganization: false,
    });
  }
}

export const businessService = new BusinessService(authClient);

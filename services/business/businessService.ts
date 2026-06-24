import { toaster } from "@/components/ui/toaster";
import { AuthClient, authClient } from "@/lib/authClient";
import { businessSchema } from "./businessSchema";

class BusinessService {
  constructor(private readonly auth: AuthClient) {}

  async createBusiness(formData: FormData) {
    const form = Object.fromEntries(formData.entries());
    const { data, error } = businessSchema.safeParse(form);

    // validate form
    if (error)
      return toaster.create({
        title: error.name,
        description: error.message,
        type: "error",
      });

    return this.auth.organization.create({
      ...data,
      metadata: {
        description: data.description,
        phone: data.phone,
        address: data.address,
      },
      keepCurrentActiveOrganization: false,
    });
  }
}

export const businessService = new BusinessService(authClient);

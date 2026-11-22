import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";

export async function getUIConfig(organizationId: string | undefined) {
  return apiClient("@get/api/ui-configs", {
    headers: scopeHeaders(organizationId),
    ...apiConfig,
  });
}

export async function getStorefrontUIConfig(slug: string) {
  return apiClient("@get/api/ui-configs/storefront/:slug", {
    params: { slug },
    ...apiConfig,
  });
}

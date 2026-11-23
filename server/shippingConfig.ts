import { PAGE_SIZE } from "@/data/constants";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";

export async function getShippingConfigs(organizationId: string | undefined) {
  return apiClient("@get/api/shipping-configs", {
    query: { pageSize: PAGE_SIZE },
    headers: scopeHeaders(organizationId),
    ...apiConfig,
  });
}

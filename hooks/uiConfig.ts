import { UI_CONFIG_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { CreateUIConfigInputData } from "@/schema/uiConfig";
import { cache } from "@/utilities/cacheKey";
import { scopeHeaders } from "@/utilities/scopeHeaders";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useUIConfig = (organizationId: string | undefined) => {
  return useSWR(cache.scopedKey(UI_CONFIG_KEY, organizationId), () =>
    apiClient("@get/api/ui-configs", {
      headers: scopeHeaders(organizationId),
      ...apiConfig,
    }),
  );
};

export const useAddUIConfig = (organizationId: string | undefined) => {
  return useSWRMutation(
    cache.scopedKey(UI_CONFIG_KEY, organizationId),
    (key, { arg }: { arg: CreateUIConfigInputData }) =>
      apiClient("@post/api/ui-configs", {
        body: arg,
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
  );
};

export const useRemoveUIConfig = (organizationId: string | undefined) => {
  return useSWRMutation(cache.scopedKey(UI_CONFIG_KEY, organizationId), () =>
    apiClient("@delete/api/ui-configs", {
      headers: scopeHeaders(organizationId),
      ...apiConfig,
    }),
  );
};

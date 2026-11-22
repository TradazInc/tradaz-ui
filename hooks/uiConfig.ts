import { UI_CONFIG_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";
import { cache } from "@/utilities/cacheKey";
import type { Data } from "@puckeditor/core";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { CreateUIConfigInputData } from "@/schema/uiConfig";

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
    (key, { arg }: { arg: CreateUIConfigInputData["page"] }) =>
      apiClient("@post/api/ui-configs", {
        body: { page: arg },
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

export function computePath(
  businessId?: string,
  storeId?: string,
):
  | "/merchant"
  | `/merchant/business/${string}`
  | `/merchant/business/${string}/store/${string}` {
  if (!businessId) return "/merchant";
  if (!storeId) return `/merchant/business/${businessId}`;
  return `/merchant/business/${businessId}/store/${storeId}`;
}

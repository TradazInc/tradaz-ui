import {
  businessItems,
  dashboardItems,
  storeItems,
} from "@/components/shared/SideMenuItems";
import { checkRolePermission } from "@/utilities/checkRolePermission";
import { useParams } from "next/navigation";
import { useMemberRole, useRoles } from "./role";

export const useSideItems = () => {
  const { businessId, storeId } = useParams<{
    businessId?: string;
    storeId?: string;
  }>();
  if (!businessId) return { sideItems: dashboardItems };

  const memberRole = useMemberRole(businessId);
  const customRoles = useRoles(businessId);

  return {
    sideItems: (storeId ? storeItems : businessItems)
      .map((sideMenuItem) => ({
        ...sideMenuItem,
        // filter item children
        children: sideMenuItem.children?.filter(
          ({ permission }) =>
            !permission ||
            checkRolePermission(
              memberRole?.data?.role,
              permission,
              customRoles.data,
            ),
        ),
      }))
      // drop empty items
      .filter((sideMenuItem) => sideMenuItem.children?.length),
    isLoading: memberRole.isLoading || customRoles.isLoading,
  };
};

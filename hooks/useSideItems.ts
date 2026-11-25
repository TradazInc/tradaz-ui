import {
  businessItems,
  dashboardItems,
  storeItems,
} from "@/components/shared/SideMenuItems";
import { checkRolePermission } from "@/utilities/checkRolePermission";
import { hasCustomRole } from "@/utilities/hasRole";
import { useParams } from "next/navigation";
import { useMemberRole, useRoles } from "./role";

export const useSideItems = () => {
  const { businessId, storeId } = useParams<{
    businessId?: string;
    storeId?: string;
  }>();

  const memberRole = useMemberRole(businessId);
  const organizationId = hasCustomRole(memberRole.data?.role)
    ? businessId
    : undefined;
  const customRoles = useRoles(organizationId);

  if (!businessId) return { sideItems: dashboardItems, isLoading: false };

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

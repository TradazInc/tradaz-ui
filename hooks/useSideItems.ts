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
  const { data: memberRole } = useMemberRole(businessId);
  const { data: customRoles } = useRoles(businessId);

  if (!businessId) return dashboardItems;

  return (
    (storeId ? storeItems : businessItems)
      .map((sideMenuItem) => ({
        ...sideMenuItem,
        // filter item children
        children: sideMenuItem.children?.filter(
          ({ permission }) =>
            !permission ||
            checkRolePermission(memberRole?.role, permission, customRoles),
        ),
      }))
      // drop empty items
      .filter((sideMenuItem) => sideMenuItem.children?.length)
  );
};

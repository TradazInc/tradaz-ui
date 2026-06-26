"use client";

import { Sidebar } from "@/app/components/Sidebar";
import { BUSINESS_NAV_ITEMS } from "@/data/sidebarItems";

export const VendorSidebar = () => {
  return (
    <Sidebar
      items={BUSINESS_NAV_ITEMS}
      basePath="/vendor"
      showSubscription={true}
    />
  );
};

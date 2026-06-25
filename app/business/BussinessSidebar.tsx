"use client";

import { Sidebar } from "@/app/components/Sidebar";
import { BUSINESS_NAV_ITEMS } from "@/data/sidebarItems";

export const BusinessSidebar = () => {
  return <Sidebar items={BUSINESS_NAV_ITEMS} basePath="/business" />;
};

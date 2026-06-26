"use client";

import { Sidebar } from "@/app/components/Sidebar";
import { SUPER_ADMIN_NAV_ITEMS } from "@/data/sidebarItems";

export const OverwatchSidebar = () => {
  return <Sidebar items={SUPER_ADMIN_NAV_ITEMS} basePath="/overwatch" />;
};

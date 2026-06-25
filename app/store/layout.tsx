import { StoreNav } from "@/app/store/StoreNav";
import { MobileBottomNav } from "@/app/store/navigation/MobileBottomNav";
import React from "react";
import { LayoutContainer } from "../components/LayoutsContainer";
import { PageContainer } from "../components/PageContainer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenantConfig = { storeName: "OGDior", brandColor: "#5cac7d" };

  return (
    <LayoutContainer>
      <StoreNav />
      <PageContainer>{children}</PageContainer>
      <MobileBottomNav brandColor={tenantConfig.brandColor} />
    </LayoutContainer>
  );
}

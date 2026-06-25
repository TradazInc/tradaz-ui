"use client";
import { Header } from "@/app/store/StoreHeader";
import { MobileBottomNav } from "@/app/store/navigation/MobileBottomNav";
import React from "react";
import { LayoutContainer } from "../components/LayoutContainer";
import { PageContainer } from "../components/PageContainer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenantConfig = { storeName: "OGDior", brandColor: "#5cac7d" };

  return (
    <LayoutContainer>
      <Header
        onOpenSidebar={() => console.log("Mobile Nav Used")}
        brandColor={tenantConfig.brandColor}
        storeName={tenantConfig.storeName}
      />
      <PageContainer>{children}</PageContainer>
      <MobileBottomNav brandColor={tenantConfig.brandColor} />
    </LayoutContainer>
  );
}

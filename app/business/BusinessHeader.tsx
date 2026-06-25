"use client";

import { Text, Breadcrumb } from "@chakra-ui/react";
import { Header } from "@/app/components/Header";
import { DashboardHeader } from "@/app/business/DashboardHeader";
import { BUSINESS_NAV_ITEMS } from "@/data/sidebarItems";

export const BusinessHeader = () => {
  const Logo = (
    <Breadcrumb.Root>
      <Breadcrumb.List gap={3}>
        <Breadcrumb.Item>
          <Text
            fontSize="xl"
            fontWeight="extrabold"
            color="white"
            letterSpacing="tight"
            userSelect="none"
          >
            Tradazs
            <Text as="span" color="#888888">
              .
            </Text>
          </Text>
        </Breadcrumb.Item>
        <Breadcrumb.Separator
          color="gray.600"
          fontSize="xl"
          display={{ base: "none", md: "block" }}
        >
          /
        </Breadcrumb.Separator>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );

  return (
    <Header
      navItems={BUSINESS_NAV_ITEMS}
      basePath="/business"
      leftContent={Logo}
      rightContent={<DashboardHeader />}
    />
  );
};

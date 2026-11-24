"use client";

import { computePath } from "@/utilities/computePath";
import { StackSeparator, VStack } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { businessItems, dashboardItems, storeItems } from "./SideMenuItems";
import { SideMenuSection } from "./SideMenuSection";

export const SideMenuSectionList = () => {
  // Tracks url changes
  const { businessId, storeId } = useParams<{
    businessId?: string;
    storeId?: string;
  }>();

  const basePath = useMemo(
    () => computePath(businessId, storeId),
    [businessId, storeId],
  );

  const sideItems = useMemo(() => {
    if (storeId) return storeItems;
    if (businessId) return businessItems;
    return dashboardItems;
  }, [businessId, storeId]);

  return (
    <VStack
      p={5}
      gapY={2}
      w={"full"}
      minH={"full"}
      borderRightWidth={"1px"}
      separator={<StackSeparator />}
    >
      {sideItems.map((item, index) => (
        <SideMenuSection basePath={basePath} menuItem={item} key={index} />
      ))}
    </VStack>
  );
};

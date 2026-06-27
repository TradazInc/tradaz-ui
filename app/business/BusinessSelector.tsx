"use client";

import { toaster } from "@/components/ui/toaster";
import { Store } from "@/entities/Store";
import { useBusinesses } from "@/hooks/business";
import { businessService } from "@/services/business/businessService";
import { storeService } from "@/services/stores/storeService";
import {
  Box,
  Breadcrumb,
  Center,
  Menu,
  Portal,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { LuBuilding2, LuChevronDown, LuStore } from "react-icons/lu";

export const BusinessSelector = () => {
  // active state
  const [activeBusiness, setActiveBusiness] = useState("Businesses");
  const [activeStore, setActiveStore] = useState("Stores");

  // data state
  const { data: businesses, error, isPending } = useBusinesses();
  const [stores, setStores] = useState<Store[]>();

  const handleBusiness = async (businessId: string) => {
    const business = await businessService.setActiveBussienss(businessId);
    if (business.error) {
      return toaster.create({
        title: business.error.code,
        description: business.error.message,
        type: "error",
      });
    }
    setActiveBusiness(business.data.name);

    const store = await storeService.getStores(business.data?.id);
    if (store.error) {
      return toaster.create({
        title: store.error.code,
        description: store.error.message,
        type: "error",
      });
    }
    setStores(store.data);
  };

  const handleStore = async (storeId: string) => {
    const { data, error } = await storeService.setActiveStore(storeId);
    if (error) {
      return toaster.create({
        title: error.code,
        description: error.message,
        type: "error",
      });
    }
    setActiveStore(data.name);
  };

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List gap="4">
        <>
          <Breadcrumb.Separator />
          <BreadcrumbMenuItem
            data={businesses ?? []}
            handleClick={handleBusiness}
          >
            <Breadcrumb.Link as="button">
              <LuBuilding2 />
              {activeBusiness}
              {isPending ? (
                <Spinner size="sm" borderWidth="4px" />
              ) : (
                <LuChevronDown />
              )}
            </Breadcrumb.Link>
          </BreadcrumbMenuItem>
        </>

        {stores && (
          <>
            <Breadcrumb.Separator />
            <BreadcrumbMenuItem data={stores ?? []} handleClick={handleStore}>
              <Breadcrumb.Link as="button">
                <LuStore />
                {activeStore}
                <LuChevronDown />
              </Breadcrumb.Link>
            </BreadcrumbMenuItem>
          </>
        )}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
};

interface BreadcrumbMenuItemProps {
  data: Array<{ name: string; id: string }>;
  handleClick: (id: string) => Promise<unknown>;
  children: React.ReactNode;
}

const BreadcrumbMenuItem = ({
  children,
  data,
  handleClick,
}: BreadcrumbMenuItemProps) => {
  return (
    <Breadcrumb.Item>
      <Menu.Root>
        <Menu.Trigger asChild>{children}</Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              {data.map((item) => (
                <Menu.Item
                  key={item.id}
                  value={item.id}
                  onClick={() => handleClick(item.id)}
                >
                  {item.name}
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Breadcrumb.Item>
  );
};

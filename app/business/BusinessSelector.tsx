"use client";

import { toaster } from "@/components/ui/toaster";
import { useBusinesses } from "@/hooks/businesses";
import { businessService } from "@/services/business/businessService";
import { storeService } from "@/services/stores/storeService";
import { Breadcrumb, Button, Menu, Portal } from "@chakra-ui/react";
import React, { useState } from "react";
import { LuBuilding2, LuChevronDown, LuStore } from "react-icons/lu";

export const BusinessSelector = () => {
  const [stores, setStores] = useState<any[] | null>([]);

  const {
    data: businesses,
    error,
    isPending,
    isRefetching,
    refetch,
  } = useBusinesses();

  const handleBusiness = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const businessId = e.currentTarget.value;
    await businessService.setActiveBussienss(businessId);
    const { data, error } = await storeService.getStores();

    if (error)
      toaster.create({
        title: error.code,
        description: error.message,
        type: "error",
      });

    setStores(data);
  };

  const handleStore = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const storeId = e.currentTarget.value;
    const { error } = await storeService.setActiveStore(storeId);

    if (error)
      toaster.create({
        title: error.code,
        description: error.message,
        type: "error",
      });
  };

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List gap="4">
        <Breadcrumb.Separator />

        <BreadcrumbMenuItem
          data={businesses ?? []}
          handleClick={handleBusiness}
        >
          <Breadcrumb.Link as="button">
            <LuBuilding2 />
            Business
            <LuChevronDown />
          </Breadcrumb.Link>
        </BreadcrumbMenuItem>

        <Breadcrumb.Separator />

        <BreadcrumbMenuItem data={stores ?? []} handleClick={handleStore}>
          <Breadcrumb.Link as="button">
            <LuStore />
            Stores
            <LuChevronDown />
          </Breadcrumb.Link>
        </BreadcrumbMenuItem>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
};

interface BreadcrumbMenuItemProps {
  data: Array<{ name: string; id: string }>;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
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
                <Menu.Item key={item.id} value={item.id}>
                  <Button onClick={handleClick}>{item.name}</Button>
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Breadcrumb.Item>
  );
};

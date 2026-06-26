"use client";

import { toaster } from "@/components/ui/toaster";
import { useBusinesses } from "@/hooks/businesses";
import { businessService } from "@/services/business/businessService";
import { storeService } from "@/services/stores/storeService";
import { Breadcrumb, Button, Menu, Portal } from "@chakra-ui/react";
import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

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
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
        </Breadcrumb.Item>

        <Breadcrumb.Separator />

        <BreadcrumbMenuItem data={businesses ?? []}>
          <Button onClick={handleBusiness}>
            Business
            <LuChevronDown />
          </Button>
        </BreadcrumbMenuItem>

        <Breadcrumb.Separator />

        <BreadcrumbMenuItem data={stores ?? []}>
          <Button onClick={handleStore}>
            Stores
            <LuChevronDown />
          </Button>
        </BreadcrumbMenuItem>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
};

interface BreadcrumbMenuItemProps {
  data: Array<{ name: string; id: string }>;
  children: React.ReactNode;
}

const BreadcrumbMenuItem = ({ children, data }: BreadcrumbMenuItemProps) => {
  return (
    <Breadcrumb.Item>
      <Menu.Root>
        <Menu.Trigger asChild>{children}</Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              {data.map((item) => (
                <Menu.Item key={item.id} value={item.id}>
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

import { GetAllBusinessOutputData } from "@/schema/business";
import { GetAllStoresOutputData, GetStoreOutputSchema } from "@/schema/store";
import { computePath } from "@/utilities/computePath";
import { Menu, Portal } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  data?: GetAllStoresOutputData | GetAllBusinessOutputData | null;
}

export const BusinessSelectorMenu = ({ children, data }: Props) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>{children}</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {data && data.length > 0 ? (
              data.map((item) => {
                const { data, success } = GetStoreOutputSchema.safeParse(item);
                const href = success
                  ? computePath(data.organizationId, data.id)
                  : computePath(item.id);

                return (
                  <Menu.Item key={item.id} value={item.id} asChild>
                    <NextLink href={href}>{item.name}</NextLink>
                  </Menu.Item>
                );
              })
            ) : (
              <Menu.Item value="">Nothing found</Menu.Item>
            )}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

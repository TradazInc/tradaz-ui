"use client";

import React from "react";
import { Flex } from "@chakra-ui/react";
import { MobileSidebar } from "@/app/components/MobileSidebar";
import { SidebarItem } from "@/app/components/Sidebar";

export interface HeaderProps {
  navItems: SidebarItem[];
  basePath?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  height?: string;
  bg?: string;
}

export const Header = ({
  navItems,
  basePath = "",
  leftContent,
  rightContent,
  height = "60px",
  bg = "#000000",
}: HeaderProps) => {
  return (
    <Flex
      h={height}
      w="full"
      align="center"
      justify="space-between"
      bg={bg}
      position="relative"
      zIndex={100}
      flexShrink={0}
      px={{ base: 4, lg: 8 }}
      borderBottom="1px solid #1A1A1A"
    >
      <Flex align="center" gap={4}>
        <MobileSidebar items={navItems} basePath={basePath} />
        {leftContent}
      </Flex>

      <Flex align="center" gap={4} flex={1} justify="flex-end" h="full">
        {rightContent}
      </Flex>
    </Flex>
  );
};

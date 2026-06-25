"use client";

import React, { useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

import { Header } from "@/app/components/Header";
import { NotificationDropdown } from "@/app/components/NotificationDropdown";
import { SUPER_ADMIN_NAV_ITEMS } from "@/data/sidebarItems";

export const OverwatchHeader = () => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const LeftSideUI = (
    <Text
      display={{ base: "none", sm: "block" }}
      color="gray.400"
      fontSize="sm"
      fontWeight="medium"
    >
      Welcome back, System Ops
    </Text>
  );

  const RightSideUI = (
    <Flex gap={{ base: 3, sm: 6 }} align="center">
      <NotificationDropdown
        isOpen={isNotifOpen}
        onToggle={() => setIsNotifOpen(!isNotifOpen)}
      />
    </Flex>
  );

  return (
    <>
      {/* Global Click-Away Overlay for Notifications */}
      {isNotifOpen && (
        <Box
          position="fixed"
          inset={0}
          zIndex={99998}
          onClick={() => setIsNotifOpen(false)}
        />
      )}

      <Header
        navItems={SUPER_ADMIN_NAV_ITEMS}
        basePath="/overwatch"
        leftContent={LeftSideUI}
        rightContent={RightSideUI}
      />
    </>
  );
};

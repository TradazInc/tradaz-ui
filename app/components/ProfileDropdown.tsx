"use client";

import { Avatar, Flex, Icon, Menu, Portal, Text } from "@chakra-ui/react";
import React from "react";
import { LuLogOut, LuSettings } from "react-icons/lu";

export const ProfileDropdown = () => {
  const profileMenuOptions = [
    {
      label: "Account Settings",
      value: "settings",
      icon: LuSettings,
    },
    {
      label: "Log Out",
      value: "logout",
      icon: LuLogOut,
      danger: true,
    },
  ];

  return (
    <Menu.Root>
      <Menu.Trigger rounded="full" focusRing="outside">
        <Avatar.Root size="sm">
          <Avatar.Fallback name="Segun Adebayo" />
          <Avatar.Image src="https://bit.ly/sage-adebayo" />
        </Avatar.Root>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content background={"black"}>
            {profileMenuOptions.map((option, index) => (
              <Menu.Item
                key={index}
                value={option.value}
                color={option?.danger ? "fg.error" : "white"}
                _hover={
                  option?.danger
                    ? { bg: "bg.error", color: "fg.error" }
                    : undefined
                }
              >
                <ProfileMenuButton>
                  <Icon as={option.icon} boxSize="16px" strokeWidth={"2.5"} />
                  <Text fontSize="13px" fontWeight="bold">
                    {option.label}
                  </Text>
                </ProfileMenuButton>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

const ProfileMenuButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex px={4} py={3} align="center" gap={3} w={"full"}>
      {children}
    </Flex>
  );
};

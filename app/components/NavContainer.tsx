import { authService } from "@/services/auth/authService";
import { Flex, HStack } from "@chakra-ui/react";
import React from "react";
import { NotificationDropdown } from "./NotificationDropdown";
import { ProfileDropdown } from "./ProfileDropdown";

const NavContainer = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      h={"60px"}
      w="full"
      align="center"
      justify="space-between"
      bg={"#000000"}
      position="relative"
      zIndex={100}
      flexShrink={0}
      px={{ base: 4, lg: 8 }}
      borderBottom="1px solid #1A1A1A"
    >
      <HStack gapX={8}>{children}</HStack>
      <HStack gapX={4}>
        <NotificationDropdown />
        <ProfileDropdown />
      </HStack>
    </Flex>
  );
};

export default NavContainer;

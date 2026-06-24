"use client";

import { Flex, Icon, Text } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";

interface LogoutButtonProps {
  isCollapsed?: boolean;
  onClick?: () => void;
}

export const LogoutButton = ({
  isCollapsed = false,
  onClick,
}: LogoutButtonProps) => {
  const iconStyle = { strokeWidth: "2.5", boxSize: "18px" };

  return (
    <Flex
      as="button"
      onClick={onClick}
      align="center"
      justify={isCollapsed ? "center" : "flex-start"}
      gap={3}
      px={isCollapsed ? 2 : 0}
      py={2}
      w={isCollapsed ? "auto" : "full"}
      cursor="pointer"
      rounded="none"
      color="red.500"
      bg="transparent"
      border="none"
      outline="none"
      _hover={{ bg: "rgba(229, 62, 62, 0.1)" }}
      transition="all 0.2s"
    >
      <Icon as={LuLogOut} color="red.500" css={iconStyle} />
      {!isCollapsed && (
        <Text fontSize="14px" fontWeight="600" whiteSpace="nowrap">
          Log Out
        </Text>
      )}
    </Flex>
  );
};

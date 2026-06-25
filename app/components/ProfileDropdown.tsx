"use client";

import { Box, Flex, Text, Icon, Avatar, AvatarGroup } from "@chakra-ui/react";
import {
  LuBuilding2,
  LuStore,
  LuImage,
  LuSettings,
  LuLogOut,
} from "react-icons/lu";

export interface ProfileDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onAddBusiness?: () => void;
  onAddStore?: () => void;
  onLogout?: () => void;
  user: {
    name: string;
    email: string;
    initials: string;
  };
}

export const ProfileDropdown = ({
  isOpen,
  onToggle,
  onAddBusiness,
  onAddStore,
  onLogout,
  user,
}: ProfileDropdownProps) => {
  const iconStyle = { strokeWidth: "2.5" };

  return (
    <Box position="relative">
      <Box onClick={onToggle} cursor="pointer">
        <AvatarGroup>
          <Avatar.Root
            size="sm"
            border="1px solid"
            rounded="full"
            borderColor={isOpen ? "white" : "#333333"}
            transition="all 0.2s"
            _hover={{ borderColor: "white" }}
          >
            <Avatar.Fallback
              bg="#1A1A1A"
              rounded="full"
              color="white"
              fontSize="11px"
              fontWeight="bold"
            >
              {user.initials}
            </Avatar.Fallback>
            <Avatar.Image />
          </Avatar.Root>
        </AvatarGroup>
      </Box>

      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          right={0}
          mt={6}
          w={{ base: "calc(100vw - 32px)", sm: "260px" }}
          maxW="260px"
          bg="#0A0A0A"
          border="1px solid #1A1A1A"
          rounded="none"
          py={2}
          zIndex={99999}
          shadow="2xl"
        >
          <Flex
            px={4}
            py={3}
            gap={4}
            align="center"
            borderBottom="1px solid #1A1A1A"
            mb={2}
          >
            <AvatarGroup>
              <Avatar.Root
                size="md"
                rounded="full"
                border="1px solid #333333"
                flexShrink={0}
              >
                <Avatar.Fallback
                  bg="#1A1A1A"
                  rounded="full"
                  color="white"
                  fontSize="13px"
                  fontWeight="bold"
                >
                  {user.initials}
                </Avatar.Fallback>
                <Avatar.Image />
              </Avatar.Root>
            </AvatarGroup>
            <Box overflow="hidden">
              <Text
                fontSize="13px"
                fontWeight="bold"
                color="white"
                lineClamp={1}
              >
                {user.name}
              </Text>
              <Text fontSize="12px" color="#888888" lineClamp={1}>
                {user.email}
              </Text>
            </Box>
          </Flex>

          {onAddBusiness && (
            <Flex
              px={4}
              py={3}
              align="center"
              gap={3}
              cursor="pointer"
              _hover={{ bg: "#111111", color: "white" }}
              color="#888888"
              transition="all 0.2s"
              onClick={onAddBusiness}
            >
              <Icon as={LuBuilding2} boxSize="16px" css={iconStyle} />
              <Text fontSize="13px" fontWeight="bold">
                Add New Business
              </Text>
            </Flex>
          )}

          {onAddStore && (
            <Flex
              px={4}
              py={3}
              align="center"
              gap={3}
              cursor="pointer"
              _hover={{ bg: "#111111", color: "white" }}
              color="#888888"
              transition="all 0.2s"
              onClick={onAddStore}
            >
              <Icon as={LuStore} boxSize="16px" css={iconStyle} />
              <Text fontSize="13px" fontWeight="bold">
                Add New Store
              </Text>
            </Flex>
          )}

          <Box my={2} borderBottom="1px solid #1A1A1A" />

          <Flex
            px={4}
            py={3}
            align="center"
            gap={3}
            cursor="pointer"
            _hover={{ bg: "#111111", color: "white" }}
            color="#888888"
            transition="all 0.2s"
          >
            <Icon as={LuImage} boxSize="16px" css={iconStyle} />
            <Text fontSize="13px" fontWeight="bold">
              Change Profile Image
            </Text>
          </Flex>

          <Flex
            px={4}
            py={3}
            align="center"
            gap={3}
            cursor="pointer"
            _hover={{ bg: "#111111", color: "white" }}
            color="#888888"
            transition="all 0.2s"
          >
            <Icon as={LuSettings} boxSize="16px" css={iconStyle} />
            <Text fontSize="13px" fontWeight="bold">
              Account Settings
            </Text>
          </Flex>

          <Box my={2} borderBottom="1px solid #1A1A1A" />

          <Flex
            px={4}
            py={3}
            align="center"
            gap={3}
            cursor="pointer"
            _hover={{ bg: "#111111", color: "red.500" }}
            color="red.400"
            transition="all 0.2s"
            onClick={onLogout}
          >
            <Icon as={LuLogOut} boxSize="16px" css={iconStyle} />
            <Text fontSize="13px" fontWeight="bold">
              Log Out
            </Text>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

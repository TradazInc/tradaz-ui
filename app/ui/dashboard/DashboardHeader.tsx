"use client";
import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Icon,
  Button,
  Avatar,
  AvatarGroup,
  Breadcrumb,
  Menu,
  Portal,
} from "@chakra-ui/react";
import {
  LuBell,
  LuChevronDown,
  LuCheck,
  LuImage,
  LuSettings,
  LuLogOut,
  LuShoppingBag,
  LuBuilding2,
  LuStore,
  LuPlus,
} from "react-icons/lu";
import { OnboardingModal } from "../onboarding/OnboardingModel";
import { AddStoreModal } from "../onboarding/AddStoreModal";
import {
  useBusinessList,
  useActiveBusiness,
} from "@/app/entities/business/hooks";
import { useTeamList, useTeamActions } from "@/app/entities/stores/hooks";
import { authClient } from "@/app/lib/authClient";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface BreadcrumbMenuItemProps {
  children: React.ReactNode;
  items: Array<{ id: string; name: string }>;
  activeId?: string;
  onSelect: (value: string) => void;
  addActionLabel?: string;
  onAddAction?: () => void;
  emptyMessage?: string;
}

// ---------------------------------------------------------------------------
// BreadcrumbMenuItem (unchanged)
// ---------------------------------------------------------------------------
const BreadcrumbMenuItem = ({
  children,
  items,
  activeId,
  onSelect,
  addActionLabel,
  onAddAction,
  emptyMessage = "No items found.",
}: BreadcrumbMenuItemProps) => (
  <Breadcrumb.Item>
    <Menu.Root>
      <Menu.Trigger asChild>{children}</Menu.Trigger>
      <Portal>
        <Menu.Positioner zIndex={999999999}>
          <Menu.Content
            bg="#0A0A0A"
            border="1px solid #1A1A1A"
            rounded="none"
            shadow="2xl"
            minW={{ base: "240px", sm: "260px" }}
            maxW="calc(100vw - 32px)"
            p={0}
          >
            <Box
              maxH="250px"
              overflowY="auto"
              py={1}
              css={{
                "&::-webkit-scrollbar": { width: "4px" },
                "&::-webkit-scrollbar-thumb": {
                  background: "#1A1A1A",
                  borderRadius: "0px",
                },
              }}
            >
              {items.map((item) => (
                <Menu.Item
                  key={item.id}
                  value={item.id}
                  onClick={() => onSelect(item.id)}
                  px={4}
                  py={3}
                  cursor="pointer"
                  bg="transparent"
                  rounded="none"
                  color={item.id === activeId ? "white" : "#888888"}
                  fontWeight={item.id === activeId ? "bold" : "normal"}
                  _hover={{ bg: "#111111", color: "white" }}
                >
                  <Flex justify="space-between" w="full" align="center">
                    <Text fontSize="13px" lineClamp={1}>
                      {item.name}
                    </Text>
                    {item.id === activeId && (
                      <Icon
                        as={LuCheck}
                        color="white"
                        boxSize="14px"
                        strokeWidth="2.5"
                        flexShrink={0}
                        ml={2}
                      />
                    )}
                  </Flex>
                </Menu.Item>
              ))}
              {(!items || items.length === 0) && (
                <Text fontSize="12px" color="#666666" px={4} py={3}>
                  {emptyMessage}
                </Text>
              )}
            </Box>

            {addActionLabel && onAddAction && (
              <Box p={2} borderTop="1px solid #1A1A1A" bg="#050505">
                <Menu.Item
                  value="add_action"
                  onClick={onAddAction}
                  bg="#111111"
                  color="white"
                  border="1px solid #333333"
                  rounded="none"
                  px={3}
                  py={2}
                  cursor="pointer"
                  _hover={{ bg: "white", color: "black" }}
                  justifyContent="center"
                >
                  <Flex align="center" justify="center" gap={2} w="full">
                    <Icon as={LuPlus} strokeWidth="2.5" />
                    <Text fontSize="12px" fontWeight="bold">
                      {addActionLabel}
                    </Text>
                  </Flex>
                </Menu.Item>
              </Box>
            )}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  </Breadcrumb.Item>
);

export const DashboardHeader = () => {
  // ---- Business data ----
  const orgsAtom = useBusinessList() as unknown as {
    data?: Array<{ id: string; name: string }>;
  };
  const activeOrgAtom = useActiveBusiness() as unknown as {
    data?: { id: string; name: string } | null;
  };
  const activeBusiness = activeOrgAtom.data ?? null;

  const businessItems = (orgsAtom.data ?? []).map((org) => ({
    id: org.id,
    name: org.name,
  }));

  // ---- Store (team) data ----
  const { data: teamsData } = useTeamList(activeBusiness?.id);
  const { setActive: setActiveTeam } = useTeamActions();

  // Safely extract the array from the query result
  const teamsArray = Array.isArray(teamsData) ? teamsData : [];

  const storeItems = teamsArray.map((team) => ({
    id: team.id,
    name: team.name,
  }));

  // Track active team ID locally (updated via mutation)
  const [activeTeamId, setActiveTeamId] = useState<string | undefined>(
    undefined,
  );

  const handleStoreChange = async (teamId: string) => {
    await setActiveTeam.mutateAsync({ teamId });
    setActiveTeamId(teamId);
  };

  const activeStoreName =
    storeItems.find((s) => s.id === activeTeamId)?.name ?? "Select Store";

  // ---- Local state ----
  const [activeDropdown, setActiveDropdown] = useState<
    "notif" | "profile" | null
  >(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false);

  const toggleDropdown = (dropdown: "notif" | "profile") => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeAll = () => setActiveDropdown(null);

  const iconStyle = { strokeWidth: "2.5" };

  return (
    <>
      {activeDropdown && (
        <Box position="fixed" inset={0} zIndex={99998} onClick={closeAll} />
      )}

      <Flex w="full" justify="space-between" align="center">
        <Breadcrumb.Root>
          <Breadcrumb.List gap={{ base: 1, sm: 3 }}>
            {/* BUSINESS BREADCRUMB */}
            <BreadcrumbMenuItem
              items={businessItems}
              activeId={activeBusiness?.id}
              onSelect={(id) => {
                authClient.organization.setActive({ organizationId: id });
              }}
              addActionLabel="Add New Business"
              onAddAction={() => setIsOnboardingOpen(true)}
              emptyMessage="No business found"
            >
              <Flex
                as="button"
                align="center"
                gap={{ base: 1, sm: 2 }}
                cursor="pointer"
                color="#888888"
                _hover={{ color: "white" }}
                transition="all 0.2s"
                outline="none"
              >
                <Icon
                  as={LuBuilding2}
                  boxSize={{ base: "14px", sm: "18px" }}
                  css={iconStyle}
                  flexShrink={0}
                />
                <Text
                  fontSize={{ base: "xs", sm: "sm" }}
                  fontWeight="300"
                  lineClamp={1}
                  color="white"
                  maxW={{ base: "80px", sm: "120px", md: "none" }}
                >
                  {activeBusiness?.name ?? "Select Business"}
                </Text>
                <Icon
                  as={LuChevronDown}
                  boxSize="16px"
                  css={iconStyle}
                  flexShrink={0}
                />
              </Flex>
            </BreadcrumbMenuItem>

            <Breadcrumb.Separator
              color="gray.600"
              fontSize={{ base: "sm", sm: "xl" }}
              mx={{ base: 0, sm: 1 }}
            >
              /
            </Breadcrumb.Separator>

            {/* STORE BREADCRUMB – NOW REAL DATA */}
            <BreadcrumbMenuItem
              items={storeItems}
              activeId={activeTeamId}
              onSelect={handleStoreChange}
              addActionLabel="Add New Store"
              onAddAction={() => setIsAddStoreOpen(true)}
              emptyMessage="No store found"
            >
              <Flex
                as="button"
                align="center"
                gap={{ base: 1, sm: 2 }}
                cursor="pointer"
                color="#888888"
                _hover={{ color: "white" }}
                transition="all 0.2s"
                outline="none"
              >
                <Icon
                  as={LuStore}
                  boxSize={{ base: "14px", sm: "18px" }}
                  css={iconStyle}
                  flexShrink={0}
                />
                <Text
                  fontSize={{ base: "xs", sm: "sm" }}
                  fontWeight="300"
                  lineClamp={1}
                  color="white"
                  maxW={{ base: "80px", sm: "120px", md: "none" }}
                >
                  {activeStoreName}
                </Text>
                <Icon
                  as={LuChevronDown}
                  boxSize="16px"
                  css={iconStyle}
                  flexShrink={0}
                />
              </Flex>
            </BreadcrumbMenuItem>
          </Breadcrumb.List>
        </Breadcrumb.Root>

        {/* Right side – unchanged */}

        <Flex gap={{ base: 3, sm: 6 }} align="center" ml="auto">
          {/* --- NOTIFICATIONS DROPDOWN --- */}
          <Box position="relative">
            <Box
              position="relative"
              cursor="pointer"
              onClick={() => toggleDropdown("notif")}
            >
              <Icon
                as={LuBell}
                color="white"
                boxSize="20px"
                _hover={{ color: "gray.300" }}
                transition="color 0.2s"
                mt={1}
                css={iconStyle}
              />
              <Box
                position="absolute"
                top="2px"
                right="-2px"
                boxSize="8px"
                bg="red.500"
                rounded="full"
                border="1px solid #000000"
              />
            </Box>

            {activeDropdown === "notif" && (
              <Box
                position="absolute"
                top="100%"
                right={{ base: "-40px", sm: 0 }}
                mt={6}
                w={{ base: "calc(100vw - 32px)", sm: "320px" }}
                maxW="320px"
                bg="#0A0A0A"
                border="1px solid #1A1A1A"
                rounded="none"
                shadow="2xl"
                zIndex={99999}
                overflow="hidden"
              >
                <Flex
                  px={4}
                  py={3}
                  justify="space-between"
                  align="center"
                  borderBottom="1px solid #1A1A1A"
                  bg="#111111"
                >
                  <Text fontSize="13px" fontWeight="bold" color="white">
                    Notifications
                  </Text>
                  <Text
                    fontSize="12px"
                    color="#888888"
                    cursor="pointer"
                    _hover={{ color: "white" }}
                  >
                    Mark all read
                  </Text>
                </Flex>

                <Box
                  maxH="300px"
                  overflowY="auto"
                  css={{ "&::-webkit-scrollbar": { display: "none" } }}
                >
                  <Flex
                    px={4}
                    py={4}
                    gap={4}
                    _hover={{ bg: "#111111" }}
                    cursor="pointer"
                    borderBottom="1px solid #1A1A1A"
                  >
                    <Flex
                      align="center"
                      justify="center"
                      boxSize="32px"
                      bg="#1A1A1A"
                      color="white"
                      border="1px solid #333"
                      rounded="none"
                      flexShrink={0}
                    >
                      <Icon as={LuShoppingBag} boxSize="14px" css={iconStyle} />
                    </Flex>
                    <Box>
                      <Text fontSize="13px" color="white" fontWeight="bold">
                        New order received!
                      </Text>
                      <Text fontSize="12px" color="#888888" mt={1}>
                        Order #POS-8829 needs fulfillment.
                      </Text>
                      <Text
                        fontSize="10px"
                        color="#555555"
                        mt={2}
                        fontWeight="bold"
                      >
                        10 MINS AGO
                      </Text>
                    </Box>
                  </Flex>
                </Box>

                <Box p={3}>
                  <Button
                    w="full"
                    bg="#1A1A1A"
                    color="white"
                    rounded="none"
                    border="1px solid #333"
                    fontWeight="bold"
                    fontSize="12px"
                    size="sm"
                    _hover={{ bg: "#333333" }}
                  >
                    View All
                  </Button>
                </Box>
              </Box>
            )}
          </Box>

          {/* --- PROFILE AVATAR DROPDOWN --- */}
          <Box position="relative">
            <Box onClick={() => toggleDropdown("profile")} cursor="pointer">
              <AvatarGroup>
                <Avatar.Root
                  size="sm"
                  border="1px solid"
                  rounded="full"
                  borderColor={
                    activeDropdown === "profile" ? "white" : "#333333"
                  }
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
                    GW
                  </Avatar.Fallback>
                  <Avatar.Image />
                </Avatar.Root>
              </AvatarGroup>
            </Box>

            {activeDropdown === "profile" && (
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
                        GW
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
                      Wada Gift
                    </Text>
                    <Text fontSize="12px" color="#888888" lineClamp={1}>
                      gift.wada@yahoo.com
                    </Text>
                  </Box>
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
                  onClick={() => {
                    setIsOnboardingOpen(true);
                    closeAll();
                  }}
                >
                  <Icon as={LuBuilding2} boxSize="16px" css={iconStyle} />
                  <Text fontSize="13px" fontWeight="bold">
                    Add New Business
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
                  onClick={() => {
                    setIsAddStoreOpen(true);
                    closeAll();
                  }}
                >
                  <Icon as={LuStore} boxSize="16px" css={iconStyle} />
                  <Text fontSize="13px" fontWeight="bold">
                    Add New Store
                  </Text>
                </Flex>

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
                >
                  <Icon as={LuLogOut} boxSize="16px" css={iconStyle} />
                  <Text fontSize="13px" fontWeight="bold">
                    Log Out
                  </Text>
                </Flex>
              </Box>
            )}
          </Box>
        </Flex>
      </Flex>

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />
      <AddStoreModal
        isOpen={isAddStoreOpen}
        onClose={() => setIsAddStoreOpen(false)}
      />
    </>
  );
};

"use client";

import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Icon,
  Breadcrumb,
  Menu,
  Portal,
} from "@chakra-ui/react";
import {
  LuChevronDown,
  LuCheck,
  LuBuilding2,
  LuStore,
  LuPlus,
} from "react-icons/lu";

import { Header } from "@/app/components/Header";
import { Logo } from "@/app/components/Logo";
import { NotificationDropdown } from "@/app/components/NotificationDropdown";
import { ProfileDropdown } from "@/app/components/ProfileDropdown";
import { BUSINESS_NAV_ITEMS } from "@/data/sidebarItems";
import { OnboardingModal } from "./onboarding/OnboardingModal";
import { AddStoreModal } from "./onboarding/AddStoreModal";
import { useBusinessList, useActiveBusiness } from "@/hooks/useBusiness";
import { useTeamList, useTeamActions } from "@/hooks/useStores";
import { authClient } from "@/lib/authClient";

// --- Breadcrumb Component (Internal to Business Logic) ---
interface BreadcrumbMenuItemProps {
  children: React.ReactNode;
  items: Array<{ id: string; name: string }>;
  activeId?: string;
  onSelect: (value: string) => void;
  addActionLabel?: string;
  onAddAction?: () => void;
  emptyMessage?: string;
}

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

export const BusinessHeader = () => {
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

  // ---- Store data ----
  const { data: teamsData } = useTeamList(activeBusiness?.id);
  const { setActive: setActiveTeam } = useTeamActions();
  const storeItems = Array.isArray(teamsData)
    ? teamsData.map((team) => ({ id: team.id, name: team.name }))
    : [];
  const [activeTeamId, setActiveTeamId] = useState<string | undefined>(
    undefined,
  );

  const handleStoreChange = async (teamId: string) => {
    await setActiveTeam.mutateAsync({ teamId });
    setActiveTeamId(teamId);
  };
  const activeStoreName =
    storeItems.find((s) => s.id === activeTeamId)?.name ?? "Select Store";

  // ---- Local UI state ----
  const [activeDropdown, setActiveDropdown] = useState<
    "notif" | "profile" | null
  >(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false);

  const toggleDropdown = (dropdown: "notif" | "profile") =>
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  const closeAll = () => setActiveDropdown(null);
  const iconStyle = { strokeWidth: "2.5" };

  const LeftSideUI = (
    <Breadcrumb.Root>
      <Breadcrumb.List gap={{ base: 1, sm: 3 }}>
        <Breadcrumb.Item>
          <Logo href="/business" />
        </Breadcrumb.Item>
        <Breadcrumb.Separator
          color="gray.600"
          fontSize="xl"
          display={{ base: "none", md: "block" }}
        >
          /
        </Breadcrumb.Separator>

        <BreadcrumbMenuItem
          items={businessItems}
          activeId={activeBusiness?.id}
          onSelect={(id) =>
            authClient.organization.setActive({ organizationId: id })
          }
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
  );

  const RightSideUI = (
    <Flex gap={{ base: 3, sm: 6 }} align="center">
      <NotificationDropdown
        isOpen={activeDropdown === "notif"}
        onToggle={() => toggleDropdown("notif")}
      />

      <ProfileDropdown
        isOpen={activeDropdown === "profile"}
        onToggle={() => toggleDropdown("profile")}
        user={{
          name: "Wada Gift",
          email: "gift.wada@yahoo.com",
          initials: "WG",
        }}
        onAddBusiness={() => {
          setIsOnboardingOpen(true);
          closeAll();
        }}
        onAddStore={() => {
          setIsAddStoreOpen(true);
          closeAll();
        }}
        onLogout={() => console.log("Logout Triggered")}
      />
    </Flex>
  );

  return (
    <>
      {/* Global Click-Away Overlay */}
      {activeDropdown && (
        <Box position="fixed" inset={0} zIndex={99998} onClick={closeAll} />
      )}

      <Header
        navItems={BUSINESS_NAV_ITEMS}
        basePath="/business"
        leftContent={LeftSideUI}
        rightContent={RightSideUI}
      />

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

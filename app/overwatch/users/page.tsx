"use client";

import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Grid,
  SimpleGrid,
  Icon,
  Badge,
  Button,
  Avatar,
  Input,
  IconButton,
  VStack,
  ScrollArea,
  Spinner,
} from "@chakra-ui/react";
import {
  LuSearch,
  LuFilter,
  LuArrowUpRight,
  LuUsers,
  LuUser,
  LuShieldAlert,
  LuBan,
  LuEye,
  LuFlipVertical,
  LuStore,
  LuCheck,
  LuShield,
} from "react-icons/lu";
import { toaster } from "@/components/ui/toaster";

import { PlatformUser, RawAuthUser, BetterAuthResponse } from "./types";
import { USER_KPIs, controlStyles, nativeSelectStyle } from "./constants";
import { ViewUserModal } from "./ViewUserModal";
import { ManageUserModal } from "./ManageUserModal";
import { useListUsers, useAdminActions } from "@/hooks/useAdmin";

export default function UsersPage() {
  const { data, isLoading } = useListUsers({ limit: 100 });
  const actions = useAdminActions();

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewingUser, setViewingUser] = useState<PlatformUser | null>(null);
  const [managingUser, setManagingUser] = useState<PlatformUser | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // --- ACTIONS ---
  const handleUpdateUser = async (
    id: string,
    updates: Partial<PlatformUser>,
    banReason?: string,
  ) => {
    try {
      if (updates.role && updates.role !== managingUser?.role) {
        const backendRole =
          updates.role.toLowerCase() === "admin" ? "admin" : "user";
        await actions.setRole.mutateAsync({
          userId: id,
          role: backendRole as "admin" | "user",
        });
      }
      if (updates.status !== managingUser?.status) {
        if (updates.status === "Banned" && banReason) {
          await actions.banUser.mutateAsync({ userId: id, banReason });
        } else if (updates.status === "Active") {
          await actions.unbanUser.mutateAsync({ userId: id });
        }
      }
      toaster.create({
        title: "User updated",
        description: "Modifications saved.",
        type: "success",
      });
    } catch {
      toaster.create({
        title: "Update failed",
        description: "Please try again.",
        type: "error",
      });
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to completely delete this user? This cannot be undone.",
      )
    )
      return;
    try {
      await actions.removeUser.mutateAsync({ userId: id });
      toaster.create({
        title: "User deleted",
        description: "Account removed permanently.",
        type: "success",
      });
      setManagingUser(null);
    } catch {
      toaster.create({
        title: "Delete failed",
        description: "Could not delete user.",
        type: "error",
      });
    }
  };

  const handleSetPassword = async (id: string) => {
    const newPassword = window.prompt("Enter the new password for this user:");
    if (!newPassword) return;
    try {
      await actions.setPassword.mutateAsync({
        userId: id,
        newPassword: newPassword,
      });
      toaster.create({
        title: "Password updated",
        description: "User must use the new password.",
        type: "success",
      });
    } catch {
      toaster.create({
        title: "Password reset failed",
        description: "Check the input.",
        type: "error",
      });
    }
  };

  const handleRevokeSessions = async (id: string) => {
    if (!window.confirm("This will log the user out of all devices. Continue?"))
      return;
    try {
      await actions.revokeAllSessions.mutateAsync({ userId: id });
      toaster.create({
        title: "Sessions revoked",
        description: "User logged out everywhere.",
        type: "success",
      });
    } catch {
      toaster.create({
        title: "Revoke failed",
        description: "Could not revoke sessions.",
        type: "error",
      });
    }
  };

  const handleImpersonate = async (id: string) => {
    if (!window.confirm("You are about to log in as this user. Proceed?"))
      return;
    try {
      const response = await actions.impersonateUser.mutateAsync({
        userId: id,
      });
      const token =
        (response as unknown as { session?: { token: string } })?.session
          ?.token || "Active";
      toaster.create({
        title: "Impersonation active",
        description: `Session token: ${token}`,
        type: "info",
      });
    } catch {
      toaster.create({
        title: "Impersonation failed",
        description: "Insufficient permissions?",
        type: "error",
      });
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const headers = [
        "User ID",
        "Name",
        "Email",
        "Role",
        "Status",
        "Joined",
        "Last Active",
      ];
      const csvRows = filteredUsers.map((u: PlatformUser) =>
        [
          u.id,
          `"${u.name}"`,
          `"${u.email}"`,
          u.role,
          u.status,
          `"${u.joinedAt}"`,
          `"${u.lastActive}"`,
        ].join(","),
      );
      const csvString = [headers.join(","), ...csvRows].join("\n");
      const blob = new Blob([csvString], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url);
      a.setAttribute("download", "platform_users_export.csv");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setIsExporting(false);
    }, 800);
  };

  // --- FILTER LOGIC ---
  const castedData = data as unknown as BetterAuthResponse;
  const rawUsers: RawAuthUser[] =
    castedData?.data?.users || castedData?.users || [];

  const mappedUsers: PlatformUser[] = rawUsers.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
      ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
      : "Buyer",
    status: user.banned ? "Banned" : "Active",
    joinedAt: new Date(user.createdAt).toLocaleDateString(),
    lastActive: user.updatedAt
      ? new Date(user.updatedAt).toLocaleDateString()
      : "Unknown",
  }));

  const filteredUsers = mappedUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleStyle = (role: string) => {
    switch (role) {
      case "Admin":
        return {
          bg: "rgba(159, 122, 234, 0.1)",
          color: "purple.400",
          border: "1px solid var(--chakra-colors-purple-400)",
          icon: LuShield,
        };
      case "Merchant":
        return {
          bg: "rgba(66, 153, 225, 0.1)",
          color: "blue.400",
          border: "1px solid var(--chakra-colors-blue-400)",
          icon: LuStore,
        };
      default:
        return {
          bg: "#111111",
          color: "#888888",
          border: "1px solid #333333",
          icon: LuUser,
        };
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return { color: "#5cac7d", icon: LuCheck };
      case "Suspended":
        return { color: "yellow.400", icon: LuShieldAlert };
      case "Banned":
        return { color: "red.400", icon: LuBan };
      default:
        return { color: "#888888", icon: LuUser };
    }
  };

  return (
    <Box
      p={{ base: 4, lg: 8 }}
      maxW="1400px"
      mx="auto"
      animation="fade-in 0.3s ease"
      bg="#000000"
      minH="100vh"
    >
      <Flex
        justify="space-between"
        align={{ base: "flex-start", md: "flex-end" }}
        direction={{ base: "column", md: "row" }}
        gap={4}
        mb={8}
      >
        <Box>
          <Text
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="black"
            color="white"
            letterSpacing="tight"
            mb={1}
          >
            Platform Users
          </Text>
          <Text color="#888888" fontSize="sm">
            Central directory for all registered accounts: Buyers, Merchants,
            and Staff.
          </Text>
        </Box>
        <Flex gap={3}>
          <Button
            onClick={handleExport}
            loading={isExporting}
            loadingText="Exporting..."
            display={{ base: "none", sm: "flex" }}
            bg="#111111"
            border="1px solid #333333"
            color="white"
            rounded="none"
            _hover={{ bg: "#1A1A1A" }}
            gap={2}
            h="44px"
            px={6}
            fontWeight="bold"
          >
            <Icon as={LuArrowUpRight} strokeWidth="2.5" /> Export
          </Button>
        </Flex>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6} mb={8}>
        {USER_KPIs.map((kpi, idx) => (
          <Box
            key={idx}
            bg="#0A0A0A"
            p={6}
            rounded="none"
            border="1px solid"
            borderColor="#1A1A1A"
          >
            <Flex justify="space-between" align="start" mb={4}>
              <Flex
                boxSize="40px"
                bg="#111111"
                border="1px solid #333333"
                rounded="none"
                align="center"
                justify="center"
              >
                <Icon
                  as={kpi.icon}
                  color={kpi.iconColor}
                  boxSize="20px"
                  strokeWidth="2.5"
                />
              </Flex>
              <Badge
                bg="#111111"
                color="#888888"
                border="1px solid #333333"
                rounded="none"
                px={2}
                py={1}
                fontSize="10px"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                {kpi.trend}
              </Badge>
            </Flex>
            <Text
              color="#888888"
              fontSize="10px"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wider"
              mb={1}
            >
              {kpi.label}
            </Text>
            <Text
              color="white"
              fontSize="3xl"
              fontWeight="black"
              letterSpacing="tight"
            >
              {kpi.value}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      <Box bg="#0A0A0A" border="1px solid #1A1A1A" p={5} mb={8}>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={4}
          w="full"
          justify="space-between"
        >
          <Flex
            flex={1}
            maxW={{ md: "400px" }}
            align="center"
            {...controlStyles}
          >
            <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
            <Input
              placeholder="Search by name, email, or ID..."
              border="none"
              color="white"
              h="full"
              px={0}
              _focus={{ boxShadow: "none", outline: "none" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Flex>

          <Flex
            gap={4}
            w={{ base: "full", md: "auto" }}
            wrap={{ base: "wrap", sm: "nowrap" }}
          >
            <Flex
              align="center"
              bg="#111111"
              border="1px solid #333333"
              px={3}
              h="44px"
              flexShrink={0}
              display={{ base: "none", sm: "flex" }}
            >
              <Icon as={LuFilter} color="#888888" strokeWidth="2.5" />
            </Flex>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={nativeSelectStyle}
            >
              <option value="All" style={{ background: "#000000" }}>
                All Roles
              </option>
              <option value="Buyer" style={{ background: "#000000" }}>
                Buyers Only
              </option>
              <option value="Merchant" style={{ background: "#000000" }}>
                Merchants Only
              </option>
              <option value="Admin" style={{ background: "#000000" }}>
                Staff / Admins
              </option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={nativeSelectStyle}
            >
              <option value="All" style={{ background: "#000000" }}>
                All Statuses
              </option>
              <option value="Active" style={{ background: "#000000" }}>
                Active
              </option>
              <option value="Suspended" style={{ background: "#000000" }}>
                Suspended
              </option>
              <option value="Banned" style={{ background: "#000000" }}>
                Banned
              </option>
            </select>
          </Flex>
        </Flex>
      </Box>

      <Box bg="#0A0A0A" border="1px solid #1A1A1A" mb={8}>
        {isLoading ? (
          <Flex justify="center" align="center" py={32} direction="column">
            <Spinner color="#5cac7d" size="xl" mb={4} />
            <Text color="#888888" fontWeight="bold">
              Fetching secure records...
            </Text>
          </Flex>
        ) : (
          <ScrollArea.Root maxW="full">
            <ScrollArea.Viewport pb={4}>
              <Box minW="1000px">
                <Grid
                  templateColumns="2.5fr 1fr 1fr 1fr 100px"
                  gap={4}
                  px={6}
                  py={4}
                  bg="#111111"
                  borderBottom="1px solid #333333"
                >
                  <Text
                    color="#888888"
                    fontSize="10px"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    User Identity
                  </Text>
                  <Text
                    color="#888888"
                    fontSize="10px"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Platform Role
                  </Text>
                  <Text
                    color="#888888"
                    fontSize="10px"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Activity
                  </Text>
                  <Text
                    color="#888888"
                    fontSize="10px"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Account Status
                  </Text>
                  <Text
                    color="#888888"
                    fontSize="10px"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    textAlign="right"
                  >
                    Actions
                  </Text>
                </Grid>

                {filteredUsers.length === 0 ? (
                  <Flex
                    justify="center"
                    align="center"
                    py={16}
                    direction="column"
                  >
                    <Icon
                      as={LuUsers}
                      color="#333333"
                      boxSize="40px"
                      mb={4}
                      strokeWidth="1.5"
                    />
                    <Text color="#888888" fontSize="lg" fontWeight="bold">
                      No users found.
                    </Text>
                  </Flex>
                ) : (
                  <VStack align="stretch" gap={0}>
                    {filteredUsers.map((user: PlatformUser) => {
                      const roleStyle = getRoleStyle(user.role);
                      const statusStyle = getStatusStyle(user.status);
                      return (
                        <Grid
                          key={user.id}
                          templateColumns="2.5fr 1fr 1fr 1fr 100px"
                          gap={4}
                          px={6}
                          py={5}
                          borderBottom="1px solid #1A1A1A"
                          alignItems="center"
                          _hover={{ bg: "#111111" }}
                          transition="background 0.2s"
                        >
                          <Flex align="center" gap={4}>
                            <Avatar.Root size="md" rounded="full">
                              <Avatar.Fallback
                                name={user.name}
                                bg="#111111"
                                border="1px solid #333333"
                                color="white"
                                rounded="none"
                                fontWeight="black"
                              />
                            </Avatar.Root>
                            <Box>
                              <Text
                                color="white"
                                fontSize="sm"
                                fontWeight="bold"
                                letterSpacing="tight"
                                mb={0.5}
                              >
                                {user.name}
                              </Text>
                              <Text color="#888888" fontSize="xs">
                                {user.email}
                              </Text>
                              <Text
                                color="#555555"
                                fontSize="10px"
                                fontFamily="monospace"
                                mt={1}
                              >
                                ID: {user.id}
                              </Text>
                            </Box>
                          </Flex>

                          <Box>
                            <Flex
                              align="center"
                              gap={2}
                              {...roleStyle}
                              px={2.5}
                              py={1}
                              rounded="none"
                              display="inline-flex"
                            >
                              <Icon
                                as={roleStyle.icon}
                                boxSize="12px"
                                strokeWidth="2.5"
                              />
                              <Text
                                fontSize="10px"
                                fontWeight="bold"
                                textTransform="uppercase"
                                letterSpacing="wider"
                              >
                                {user.role}
                              </Text>
                            </Flex>
                          </Box>

                          <Box>
                            <Text
                              color="white"
                              fontSize="sm"
                              fontWeight="bold"
                              mb={1}
                            >
                              {user.lastActive}
                            </Text>
                            <Text color="#888888" fontSize="xs">
                              Joined: {user.joinedAt}
                            </Text>
                          </Box>

                          <Box>
                            <Flex align="center" gap={2}>
                              <Icon
                                as={statusStyle.icon}
                                color={statusStyle.color}
                                boxSize="14px"
                                strokeWidth="3"
                              />
                              <Text
                                color={statusStyle.color}
                                fontSize="sm"
                                fontWeight="bold"
                              >
                                {user.status}
                              </Text>
                            </Flex>
                          </Box>

                          <Flex justify="flex-end" gap={2}>
                            <IconButton
                              onClick={() => setViewingUser(user)}
                              aria-label="View Data"
                              size="sm"
                              h="36px"
                              w="36px"
                              bg="#111111"
                              border="1px solid #333333"
                              color="white"
                              rounded="none"
                              _hover={{ bg: "#1A1A1A", color: "white" }}
                            >
                              <Icon as={LuEye} strokeWidth="2.5" />
                            </IconButton>
                            <IconButton
                              onClick={() => setManagingUser(user)}
                              aria-label="Manage Account"
                              size="sm"
                              h="36px"
                              w="36px"
                              variant="outline"
                              borderColor="#333333"
                              color="#888888"
                              rounded="none"
                              _hover={{ bg: "#111111", color: "white" }}
                            >
                              <Icon as={LuFlipVertical} strokeWidth="2.5" />
                            </IconButton>
                          </Flex>
                        </Grid>
                      );
                    })}
                  </VStack>
                )}
              </Box>
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar
              orientation="horizontal"
              bg="#0A0A0A"
              h="6px"
              p={0}
            >
              <ScrollArea.Thumb
                bg="#1A1A1A"
                rounded="none"
                _hover={{ bg: "#333333" }}
              />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        )}
      </Box>

      {/* --- MODALS --- */}
      <ViewUserModal user={viewingUser} onClose={() => setViewingUser(null)} />

      <ManageUserModal
        key={managingUser?.id || "none"}
        user={managingUser}
        onClose={() => setManagingUser(null)}
        onUpdate={handleUpdateUser}
        onDelete={handleDeleteUser}
        onImpersonate={handleImpersonate}
        onRevokeSessions={handleRevokeSessions}
        onSetPassword={handleSetPassword}
        isSavingRole={
          actions.setRole.isPending ||
          actions.banUser.isPending ||
          actions.unbanUser.isPending
        }
        isDeleting={actions.removeUser.isPending}
        isRevoking={actions.revokeAllSessions.isPending}
      />
    </Box>
  );
}

"use client";

import { toaster } from "@/components/ui/toaster";
import { useRemoveRole, useRoles } from "@/hooks/role";
import { defaultRoles } from "@/lib/accessControl";
import { GetAllRolesOutputData } from "@/schema/role";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { Box, Button, ButtonGroup, For, Table, Text } from "@chakra-ui/react";
import DeleteIconButton from "./DeleteIconButton";
import PermissionBadges from "./PermissionBadges";

interface Props {
  initialRoles: Promise<GetAllRolesOutputData>;
  businessId: string | undefined;
}

const RoleTable = ({ initialRoles, businessId }: Props) => {
  const {
    data: roles,
    error,
    mutate,
  } = useRoles(businessId, { fallbackData: initialRoles });
  const { trigger, isMutating } = useRemoveRole(businessId);

  const handleDelete = async (roleName: string) => {
    toaster.promise(trigger(roleName), {
      loading: { title: "Deleting role...", description: "Please wait" },
      success: {
        title: "Deletion successful",
        description: `${roleName} role has been deleted`,
      },
      error: errorToastOptions,
    });
  };

  // Combine dynamic and default roles
  const allRoles = [
    ...defaultRoles.map((role) => ({
      ...role,
      id: `default-${role.role}`,
      createdAt: null,
    })),
    ...(roles ?? []),
  ];

  return (
    <Box w={"full"}>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Permissions</Table.ColumnHeader>
            <Table.ColumnHeader>Created</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <For
            each={allRoles}
            fallback={
              <Table.Row>
                <Table.Cell colSpan={4}>No roles available</Table.Cell>
              </Table.Row>
            }
          >
            {(role) => (
              <Table.Row key={role.id} w={"full"}>
                <Table.Cell>{role.role}</Table.Cell>
                <Table.Cell>
                  <PermissionBadges permission={role.permission} />
                </Table.Cell>
                <Table.Cell>
                  {role.createdAt
                    ? new Date(role.createdAt).toDateString()
                    : "-"}
                </Table.Cell>
                <Table.Cell textAlign="end">
                  <ButtonGroup size="sm" variant="outline">
                    <DeleteIconButton
                      aria-label="Delete role"
                      onClick={() => handleDelete(role.role)}
                      disabled={isMutating || !role.createdAt}
                    />
                  </ButtonGroup>
                </Table.Cell>
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table.Root>
      {error && (
        <>
          <Button
            w={"full"}
            size={"md"}
            variant={"subtle"}
            onClick={() => mutate()}
          >
            Click to retry
          </Button>
          <Text>Roles unavailable. Retry to continue.</Text>
        </>
      )}
    </Box>
  );
};

export default RoleTable;

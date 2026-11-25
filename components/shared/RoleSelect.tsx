"use client";

import { useRoles } from "@/hooks/role";
import { invitableRoles } from "@/lib/organizationAc";
import {
  Button,
  createListCollection,
  Portal,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useMemo } from "react";

interface Props {
  businessId: string | undefined;
  name: string;
  value: string | undefined;
  onChange: (value: string) => void;
  onBlur: () => void;
}

const RoleSelect = ({ businessId, name, value, onChange, onBlur }: Props) => {
  const { data, isLoading, error, mutate } = useRoles(businessId);

  const roleCollection = useMemo(() => {
    const customRoles = (data ?? []).map((r) => r.role);
    const roles = Array.from(new Set([...invitableRoles, ...customRoles]));
    return createListCollection({
      items: roles.map((role) => ({ label: role, value: role })),
    });
  }, [data]);

  return (
    <>
      <Select.Root
        name={name}
        value={value ? [value] : []}
        onValueChange={({ value }) => {
          onChange(value[0] ?? "");
          onBlur();
        }}
        onInteractOutside={() => onBlur()}
        collection={roleCollection}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select role" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            {isLoading ? <Spinner size="sm" /> : <Select.Indicator />}
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {roleCollection.items.map((role) => (
                <Select.Item item={role} key={role.value}>
                  {role.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
      {error && (
        <Button
          w={"full"}
          size={"sm"}
          variant={"subtle"}
          onClick={() => mutate()}
        >
          Custom roles unavailable. Click to retry
        </Button>
      )}
    </>
  );
};

export default RoleSelect;

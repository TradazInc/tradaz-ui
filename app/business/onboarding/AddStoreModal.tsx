"use client";
import React, { useState } from "react";
import {
  Box,
  VStack,
  Text,
  Input,
  Button,
  Drawer,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import { useActiveBusiness } from "@/hooks/useBusiness";
import { useTeamActions } from "@/hooks/useStores";
import { inputStyles, labelStyles } from "@/app/style";

interface AddStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddStoreModal = ({ isOpen, onClose }: AddStoreModalProps) => {
  const { create } = useTeamActions();
  const activeOrgAtom = useActiveBusiness();
  const activeOrg = (
    activeOrgAtom as unknown as { data?: { id: string; name: string } }
  )?.data;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.address.trim()) return;

    await create.mutateAsync({
      name: formData.name.trim(),
      address: formData.address.trim(),
      organizationId: activeOrg?.id,
    });

    setFormData({ name: "", address: "" });
    onClose();
  };

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      placement="end"
    >
      <Portal>
        <Drawer.Backdrop bg="rgba(0,0,0,0.85)" backdropFilter="blur(4px)" />
        <Drawer.Positioner zIndex={10001}>
          <Drawer.Content
            bg="#0A0A0A"
            borderLeft="1px solid"
            borderColor="#1A1A1A"
            w={{ base: "100%", sm: "400px", md: "450px" }}
            maxW="none"
            shadow="-20px 0 50px rgba(0,0,0,0.9)"
          >
            {/* Header */}
            <Drawer.Header
              px={6}
              pt={8}
              pb={6}
              borderBottom="1px solid"
              borderColor="#1A1A1A"
              bg="#111111"
            >
              <Box>
                <Text
                  fontSize="10px"
                  fontWeight="bold"
                  letterSpacing="wider"
                  color="#888888"
                  textTransform="uppercase"
                  mb={1}
                >
                  New Location
                </Text>
                <Drawer.Title
                  fontSize="xl"
                  fontWeight="black"
                  color="white"
                  letterSpacing="tight"
                >
                  Add a New Store
                </Drawer.Title>
              </Box>
              <Drawer.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  color="#888888"
                  rounded="none"
                  _hover={{ bg: "#1A1A1A", color: "white" }}
                  position="absolute"
                  top={8}
                  right={6}
                />
              </Drawer.CloseTrigger>
            </Drawer.Header>

            {/* Form Content */}
            <Drawer.Body
              px={6}
              py={8}
              css={{ "&::-webkit-scrollbar": { display: "none" } }}
            >
              <VStack w="full" gap={6} align="stretch">
                <Box>
                  <Text as="label" {...labelStyles}>
                    Store Name{" "}
                    <Text as="span" color="red.400">
                      *
                    </Text>
                  </Text>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Downtown Outlet"
                    {...inputStyles}
                  />
                </Box>

                <Box>
                  <Text as="label" {...labelStyles}>
                    Address{" "}
                    <Text as="span" color="red.400">
                      *
                    </Text>
                  </Text>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. 123 Main Street, Lagos"
                    {...inputStyles}
                  />
                </Box>
              </VStack>
            </Drawer.Body>

            {/* Footer */}
            <Drawer.Footer
              p={6}
              borderTop="1px solid"
              borderColor="#1A1A1A"
              gap={3}
              bg="#111111"
            >
              <Button
                variant="outline"
                borderColor="#333333"
                onClick={onClose}
                h="44px"
                rounded="none"
                color="#888888"
                bg="#0A0A0A"
                _hover={{ bg: "#1A1A1A", color: "white" }}
              >
                Cancel
              </Button>
              <Button
                flex="1"
                h="44px"
                bg="white"
                color="black"
                rounded="none"
                fontWeight="bold"
                onClick={handleSave}
                disabled={!formData.name.trim() || !formData.address.trim()}
                loading={create.isPending}
                loadingText="Creating..."
                _hover={{ bg: "#E5E5E5" }}
                _disabled={{
                  opacity: 0.5,
                  cursor: "not-allowed",
                  bg: "#333333",
                  color: "#888888",
                }}
              >
                Create Store
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

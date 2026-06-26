"use client";

import React, { useState } from "react";
import {
  Box,
  Stack,
  Text,
  Input,
  Button,
  Drawer,
  Icon,
} from "@chakra-ui/react";
import { LuX } from "react-icons/lu";

interface AddStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddStoreModal = ({ isOpen, onClose }: AddStoreModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.address.trim()) return;

    setIsLoading(true);

    // Simulated API Call
    setTimeout(() => {
      console.log("Saved Store Data:", formData);
      setFormData({ name: "", address: "" });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      placement="end"
    >
      <Drawer.Backdrop bg="blackAlpha.800" backdropFilter="blur(4px)" />

      <Drawer.Positioner zIndex={10001}>
        <Drawer.Content
          bg="#0A0A0A"
          borderLeftWidth="1px"
          borderColor="#1A1A1A"
          w={{ base: "100%", sm: "400px", md: "450px" }}
          maxW="none"
          shadow="2xl"
        >
          {/* Header */}
          <Drawer.Header
            px={6}
            py={6}
            borderBottomWidth="1px"
            borderColor="#1A1A1A"
            bg="#111111"
          >
            <Text
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="wider"
              color="gray.500"
              textTransform="uppercase"
              mb={1}
            >
              New Location
            </Text>
            <Drawer.Title
              fontSize="xl"
              fontWeight="bold"
              color="white"
              letterSpacing="tight"
            >
              Add a New Store
            </Drawer.Title>

            <Drawer.CloseTrigger asChild>
              <Box
                as="button"
                position="absolute"
                top={6}
                right={6}
                color="gray.500"
                _hover={{ color: "white" }}
                transition="color 0.2s"
              >
                <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
              </Box>
            </Drawer.CloseTrigger>
          </Drawer.Header>

          {/* Form Content */}
          <Drawer.Body px={6} py={8} overflowY="auto">
            <Stack gap={6}>
              <Box>
                <Text
                  as="label"
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.300"
                  mb={2}
                  display="block"
                >
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
                  bg="#000000"
                  borderWidth="1px"
                  borderColor="#1A1A1A"
                  color="white"
                  h="12"
                  px={4}
                  rounded="md"
                  _hover={{ borderColor: "gray.700" }}
                  _focus={{
                    borderColor: "white",
                    boxShadow: "none",
                    outline: "none",
                  }}
                  transition="all 0.2s"
                />
              </Box>

              <Box>
                <Text
                  as="label"
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.300"
                  mb={2}
                  display="block"
                >
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
                  bg="#000000"
                  borderWidth="1px"
                  borderColor="#1A1A1A"
                  color="white"
                  h="12"
                  px={4}
                  rounded="md"
                  _hover={{ borderColor: "gray.700" }}
                  _focus={{
                    borderColor: "white",
                    boxShadow: "none",
                    outline: "none",
                  }}
                  transition="all 0.2s"
                />
              </Box>
            </Stack>
          </Drawer.Body>

          {/* Footer */}
          <Drawer.Footer
            px={6}
            py={4}
            borderTopWidth="1px"
            borderColor="#1A1A1A"
            bg="#111111"
            gap={3}
          >
            <Button
              flex="1"
              variant="outline"
              borderColor="gray.800"
              bg="transparent"
              color="gray.400"
              h="12"
              rounded="md"
              _hover={{ bg: "gray.900", color: "white" }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              flex="2"
              bg="white"
              color="black"
              h="12"
              rounded="md"
              fontWeight="bold"
              onClick={handleSave}
              disabled={!formData.name.trim() || !formData.address.trim()}
              loading={isLoading}
              loadingText="Creating..."
              _hover={{ bg: "gray.200" }}
              _disabled={{
                opacity: 0.5,
                cursor: "not-allowed",
                bg: "gray.800",
                color: "gray.500",
              }}
            >
              Create Store
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};

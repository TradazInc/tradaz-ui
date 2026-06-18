"use client";

import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Icon,
  VStack,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import {
  LuBuilding2,
  LuLink,
  LuLayers,
  LuPhone,
  LuMapPin,
} from "react-icons/lu";

import { useBusinessActions } from "@/app/entities/business/hooks";

interface CreateBusinessFormProps {
  onSuccess: () => void;
  onCancel?: () => void;
}

// Reusable Styles
const inputStyles = {
  bg: "#111111",
  border: "1px solid #333333",
  color: "white",
  rounded: "none",
  h: "44px",
  px: 4,
  _focus: { borderColor: "white", outline: "none" },
  _placeholder: { color: "#555555" },
};
const labelStyles = {
  color: "#888888",
  fontSize: "10px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  letterSpacing: "wider",
  mb: 2,
  display: "block",
};

export const CreateBusinessForm = ({ onSuccess }: CreateBusinessFormProps) => {
  const { create } = useBusinessActions();

  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    categoryId: "",   
    about: "",
    phone: "",
    address: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  // Auto-generate URL-safe slug whenever the name changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const newSlug = newName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setFormData((prev) => ({ ...prev, name: newName, slug: newSlug }));
    setErrorMsg("");
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanSlug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setFormData((prev) => ({ ...prev, slug: cleanSlug }));
    setErrorMsg("");
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Manual validation
    if (formData.name.length < 2)
      return setErrorMsg("Business name must be at least 2 characters.");
    if (formData.slug.length < 2)
      return setErrorMsg("Slug must be at least 2 characters.");
    if (formData.categoryId === "")   
      return setErrorMsg("Please select an industry category.");

    try {
      await create.mutateAsync({
        name: formData.name,
        slug: formData.slug,
        keepCurrentActiveOrganization: false,
        categoryId: formData.categoryId, 
        metadata: {
          about: formData.about,
          phone: formData.phone,
          address: formData.address,
        },
      });

     
      setFormData({
        name: "",
        slug: "",
        categoryId: "",
        about: "",
        phone: "",
        address: "",
      });

      // Success Toast
      toaster.create({
        title: "Business created successfully",
        description: `${formData.name} has been provisioned.`,
        type: "success",
      });

      onSuccess();
    } catch (error: unknown) {
      console.error("Workspace provisioning failed:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Failed to create organization. Slug might be taken.";

      setErrorMsg(message);

      toaster.create({
        title: "Business creation failed",
        description: message,
        type: "error",
      });
    }
  };

  return (
    <Flex
      as="form"
      onSubmit={handleFinalSubmit}
      id="create-business-form"
      direction="column"
      h="100%"
    >
      {/* Scrollable Form Body */}
      <Box
        flex={1}
        overflowY="auto"
        px={{ base: 6, md: 10 }}
        py={8}
        css={{
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-thumb": {
            background: "#27272A",
            borderRadius: "4px",
          },
        }}
      >
        {errorMsg && (
          <Box bg="#2a0000" border="1px solid red" p={3} mb={6}>
            <Text color="red.400" fontSize="sm" fontWeight="bold">
              {errorMsg}
            </Text>
          </Box>
        )}

        <VStack gap={6} align="stretch" maxW="500px" mx="auto">
          <Box>
            <Text as="label" {...labelStyles}>
              Business Name{" "}
              <Text as="span" color="red.400">
                *
              </Text>
            </Text>
            <Flex align="center" {...inputStyles}>
              <Icon as={LuBuilding2} color="#444" mr={3} />
              <Input
                border="none"
                p={0}
                _focus={{ boxShadow: "none" }}
                placeholder="e.g. Tradaz Fashion"
                value={formData.name}
                onChange={handleNameChange}
                required
              />
            </Flex>
          </Box>

          <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
            <Box>
              <Text as="label" {...labelStyles}>
                Store URL Slug{" "}
                <Text as="span" color="red.400">
                  *
                </Text>
              </Text>
              <Flex align="center" {...inputStyles}>
                <Icon as={LuLink} color="#444" mr={3} />
                <Input
                  border="none"
                  p={0}
                  _focus={{ boxShadow: "none" }}
                  placeholder="your-store"
                  value={formData.slug}
                  onChange={handleSlugChange}
                  required
                />
              </Flex>
            </Box>

            <Box>
              <Text as="label" {...labelStyles}>
                Industry Category{" "}
                <Text as="span" color="red.400">
                  *
                </Text>
              </Text>
              <Flex align="center" {...inputStyles} px={2}>
                <Icon as={LuLayers} color="#444" mx={2} />
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      categoryId: e.target.value, 
                    }))
                  }
                  style={{
                    width: "100%",
                    background: "transparent",
                    color: "white",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                  }}
                  required
                >
                  <option value="" disabled style={{ background: "#0A0A0A" }}>
                    Select Industry
                  </option>
                  {/* All values are strings */}
                  <option value="1" style={{ background: "#0A0A0A" }}>
                    Retail & Premium Goods
                  </option>
                  <option value="2" style={{ background: "#0A0A0A" }}>
                    Food & Beverage
                  </option>
                  <option value="3" style={{ background: "#0A0A0A" }}>
                    Consumer Electronics
                  </option>
                  <option value="4" style={{ background: "#0A0A0A" }}>
                    Digital Services
                  </option>
                </select>
              </Flex>
            </Box>
          </SimpleGrid>

          <Box>
            <Text as="label" {...labelStyles}>
              Corporate Overview
            </Text>
            <Textarea
              {...inputStyles}
              h="auto"
              minH="80px"
              py={3}
              resize="none"
              placeholder="Brief operational statement regarding the entity..."
              value={formData.about}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, about: e.target.value }))
              }
            />
          </Box>

          <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
            <Box>
              <Text as="label" {...labelStyles}>
                Headquarters Phone
              </Text>
              <Flex align="center" {...inputStyles}>
                <Icon as={LuPhone} color="#444" mr={3} />
                <Input
                  border="none"
                  p={0}
                  _focus={{ boxShadow: "none" }}
                  placeholder="+234..."
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </Flex>
            </Box>

            <Box>
              <Text as="label" {...labelStyles}>
                Street Address
              </Text>
              <Flex align="center" {...inputStyles}>
                <Icon as={LuMapPin} color="#444" mr={3} />
                <Input
                  border="none"
                  p={0}
                  _focus={{ boxShadow: "none" }}
                  placeholder="Lagos, Nigeria"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
              </Flex>
            </Box>
          </SimpleGrid>
        </VStack>
      </Box>

      {/* Footer Action */}
      <Box p={8} borderTop="1px solid #1A1A1A" bg="#111111">
        <Button
          type="submit"
          form="create-business-form"
          w="full"
          h="46px"
          bg="white"
          color="black"
          rounded="none"
          fontWeight="bold"
          _hover={{ bg: "#E5E5E5" }}
          _disabled={{ bg: "#222222", color: "#555555", cursor: "not-allowed" }}
          loading={create.isPending}
        >
          Create business
        </Button>
      </Box>
    </Flex>
  );
};
"use client";

import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Icon,
  Stack,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import { LuBuilding2, LuLayers, LuPhone, LuMapPin } from "react-icons/lu";

interface CreateBusinessFormProps {
  onSuccess: () => void;
  onCancel?: () => void;
}

export const CreateBusinessForm = ({ onSuccess }: CreateBusinessFormProps) => {
  const mockCategories = [
    { id: "retail", name: "Retail & E-commerce" },
    { id: "tech", name: "Technology & Software" },
    { id: "food", name: "Food & Beverage" },
    { id: "services", name: "Professional Services" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    about: "",
    phone: "",
    address: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name.trim().length < 2)
      return setErrorMsg("Business name must be at least 2 characters.");
    if (formData.categoryId === "")
      return setErrorMsg("Please select an industry category.");

    // Fire success immediately with no simulation
    console.log("Business Form Data:", formData);
    setFormData({
      name: "",
      categoryId: "",
      about: "",
      phone: "",
      address: "",
    });
    onSuccess();
  };

  return (
    <Flex
      as="form"
      onSubmit={handleFinalSubmit}
      id="create-business-form"
      direction="column"
      h="100%"
    >
      <Box flex={1} overflowY="auto" px={{ base: 6, md: 8 }} py={8}>
        {errorMsg && (
          <Box
            bg="red.900"
            borderWidth="1px"
            borderColor="red.500"
            p={3}
            mb={6}
            rounded="md"
          >
            <Text color="red.200" fontSize="sm" fontWeight="bold">
              {errorMsg}
            </Text>
          </Box>
        )}

        <Stack gap={6} maxW="500px" mx="auto">
          {/* Business Name */}
          <Box>
            <Text
              as="label"
              fontSize="sm"
              fontWeight="medium"
              color="gray.300"
              mb={2}
              display="block"
            >
              Business Name{" "}
              <Text as="span" color="red.400">
                *
              </Text>
            </Text>
            <Flex
              align="center"
              bg="#000000"
              borderWidth="1px"
              borderColor="#1A1A1A"
              rounded="md"
              px={3}
              h="12"
              _focusWithin={{ borderColor: "white" }}
              transition="all 0.2s"
            >
              <Icon as={LuBuilding2} color="gray.500" mr={3} boxSize="18px" />
              <Input
                name="name"
                border="none"
                p={0}
                bg="transparent"
                color="white"
                _focus={{ boxShadow: "none", outline: "none" }}
                placeholder="e.g. Tradaz Fashion"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Flex>
          </Box>

          {/* Category */}
          <Box>
            <Text
              as="label"
              fontSize="sm"
              fontWeight="medium"
              color="gray.300"
              mb={2}
              display="block"
            >
              Industry Category{" "}
              <Text as="span" color="red.400">
                *
              </Text>
            </Text>
            <Flex
              align="center"
              bg="#000000"
              borderWidth="1px"
              borderColor="#1A1A1A"
              rounded="md"
              px={3}
              h="12"
              _focusWithin={{ borderColor: "white" }}
              transition="all 0.2s"
            >
              <Icon as={LuLayers} color="gray.500" mr={3} boxSize="18px" />
              <Box
                as="select"
                flex="1"
                bg="transparent"
                color="white"
                border="none"
                outline="none"
                cursor="pointer"
              >
                <option value="" disabled style={{ background: "#0A0A0A" }}>
                  Select Industry
                </option>
                {mockCategories.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.id}
                    style={{ background: "#0A0A0A" }}
                  >
                    {cat.name}
                  </option>
                ))}
              </Box>
            </Flex>
          </Box>

          {/* About */}
          <Box>
            <Text
              as="label"
              fontSize="sm"
              fontWeight="medium"
              color="gray.300"
              mb={2}
              display="block"
            >
              Corporate Overview
            </Text>
            <Textarea
              name="about"
              bg="#000000"
              borderWidth="1px"
              borderColor="#1A1A1A"
              rounded="md"
              color="white"
              px={4}
              py={3}
              minH="100px"
              resize="none"
              _focus={{
                borderColor: "white",
                boxShadow: "none",
                outline: "none",
              }}
              transition="all 0.2s"
              placeholder="Brief operational statement regarding the entity..."
              value={formData.about}
              onChange={handleChange}
            />
          </Box>

          <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
            {/* Phone */}
            <Box>
              <Text
                as="label"
                fontSize="sm"
                fontWeight="medium"
                color="gray.300"
                mb={2}
                display="block"
              >
                Headquarters Phone
              </Text>
              <Flex
                align="center"
                bg="#000000"
                borderWidth="1px"
                borderColor="#1A1A1A"
                rounded="md"
                px={3}
                h="12"
                _focusWithin={{ borderColor: "white" }}
                transition="all 0.2s"
              >
                <Icon as={LuPhone} color="gray.500" mr={3} boxSize="18px" />
                <Input
                  name="phone"
                  border="none"
                  p={0}
                  bg="transparent"
                  color="white"
                  _focus={{ boxShadow: "none", outline: "none" }}
                  placeholder="+234..."
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Flex>
            </Box>

            {/* Address */}
            <Box>
              <Text
                as="label"
                fontSize="sm"
                fontWeight="medium"
                color="gray.300"
                mb={2}
                display="block"
              >
                Street Address
              </Text>
              <Flex
                align="center"
                bg="#000000"
                borderWidth="1px"
                borderColor="#1A1A1A"
                rounded="md"
                px={3}
                h="12"
                _focusWithin={{ borderColor: "white" }}
                transition="all 0.2s"
              >
                <Icon as={LuMapPin} color="gray.500" mr={3} boxSize="18px" />
                <Input
                  name="address"
                  border="none"
                  p={0}
                  bg="transparent"
                  color="white"
                  _focus={{ boxShadow: "none", outline: "none" }}
                  placeholder="Lagos, Nigeria"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Flex>
            </Box>
          </SimpleGrid>
        </Stack>
      </Box>

      {/* Footer Action */}
      <Box
        px={8}
        py={6}
        borderTopWidth="1px"
        borderColor="#1A1A1A"
        bg="#111111"
      >
        <Button
          type="submit"
          form="create-business-form"
          w="full"
          h="12"
          bg="white"
          color="black"
          rounded="md"
          fontWeight="bold"
          _hover={{ bg: "gray.200" }}
          _disabled={{
            bg: "gray.800",
            color: "gray.500",
            cursor: "not-allowed",
          }}
          disabled={!formData.name.trim() || !formData.categoryId}
        >
          Create Business
        </Button>
      </Box>
    </Flex>
  );
};

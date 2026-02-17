"use client";
import {
  VStack,
  Box,
  Text,
  Input,
  SimpleGrid,
  Button,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { Field } from "../field";

export function BrandingForm({ data, update, onBack }: any) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update({ [e.target.name]: e.target.value });
  };

  return (
    <VStack gap={6} align="stretch" w="full">
      <Heading size="md" color="gray.800">
        Store Appearance
      </Heading>

      <Field label="Store Logo" helperText="Upload your brand logo">
        <Box
          border="1px dashed"
          borderColor="gray.300"
          p={4}
          borderRadius="md"
          bg="gray.50"
          _hover={{ borderColor: "#5cac7d" }}
          transition="all 0.2s"
        >
          <Input
            type="file"
            variant="ghost"
            p={0}
            h="auto"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) update({ logo: file });
            }}
          />
        </Box>
      </Field>

      <SimpleGrid columns={3} gap={3}>
        <Field label="Primary">
          <Input
            type="color"
            name="primaryColor"
            value={data.primaryColor}
            onChange={handleChange}
            h="12"
            p={1}
            cursor="pointer"
            w="full"
          />
        </Field>
        <Field label="Secondary">
          <Input
            type="color"
            name="secondaryColor"
            value={data.secondaryColor}
            onChange={handleChange}
            h="12"
            p={1}
            cursor="pointer"
            w="full"
          />
        </Field>
        <Field label="Tertiary">
          <Input
            type="color"
            name="tertiaryColor"
            value={data.tertiaryColor}
            onChange={handleChange}
            h="12"
            p={1}
            cursor="pointer"
            w="full"
          />
        </Field>
      </SimpleGrid>

      {/* Live Visual Preview */}
      <Box
        w="full"
        p={5}
        borderRadius="lg"
        bg="gray.50"
        border="1px solid"
        borderColor="gray.100"
        textAlign="center"
      >
        <Text
          fontSize="xs"
          fontWeight="bold"
          mb={3}
          color="gray.400"
          letterSpacing="wider"
        >
          PREVIEW
        </Text>
        <Button
          size="sm"
          bg={data.primaryColor}
          color="white"
          _hover={{ opacity: 0.9 }}
          shadow="sm"
        >
          {data.businessName || "Your Button"}
        </Button>
      </Box>

      <HStack w="full" gap={3} mt={2}>
        <Button variant="ghost" onClick={onBack} size="lg" color="gray.600">
          Back
        </Button>
        <Button
          size="lg"
          flex="1"
          bg="#5cac7d"
          _hover={{ bg: "#4a9c6d" }}
          color="white"
          onClick={() => alert("Welcome to Tradaz Dashboard!")}
        >
          Finish Setup
        </Button>
      </HStack>
    </VStack>
  );
}

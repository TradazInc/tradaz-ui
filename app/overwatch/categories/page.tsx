"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Grid,
  Input,
  Button,
  Icon,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { LuLayers, LuTrash2, LuPlus } from "react-icons/lu";

// --- ENTITY HOOKS ---
import {
  useBusinessCategories,
  useCategoryActions,
} from "@/entities/business-categories/hooks";
import { controlStyles, labelStyles } from "./style";
import { authClient } from "@/lib/authClient";

export default function CategoriesPage() {
  const { data: categories, isLoading } = useBusinessCategories();
  const { create, remove } = useCategoryActions();

  const [name, setName] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    create.mutate(
      { name: name.trim() },
      {
        onSuccess: () => setName(""),
      },
    );
  };

  const handleDelete = (id: string, categoryName: string) => {
    if (!window.confirm(`Delete "${categoryName}"?`)) return;
    remove.mutate(id);
  };

  useEffect(() => {
    authClient.getSession().then((res) => {
      console.log("Full session:", res);
    });
  }, []);

  return (
    <Box
      p={{ base: 4, lg: 8 }}
      maxW="1200px"
      mx="auto"
      bg="#000000"
      minH="100vh"
    >
      {/* HEADER */}
      <Box mb={8} borderBottom="1px solid #1A1A1A" pb={6}>
        <Text
          fontSize="10px"
          fontWeight="bold"
          letterSpacing="wider"
          color="#888888"
          textTransform="uppercase"
          mb={2}
        >
          Platform Data
        </Text>
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="black"
          color="white"
          letterSpacing="tight"
          mb={2}
        >
          Category Management
        </Text>
        <Text color="#888888" fontSize="sm">
          Define the taxonomy merchants use to classify their businesses.
        </Text>
      </Box>

      <Grid
        templateColumns={{ base: "1fr", lg: "350px 1fr" }}
        gap={10}
        alignItems="start"
      >
        {/* LEFT: CREATE FORM */}
        <Box
          as="form"
          onSubmit={handleCreate}
          bg="#0A0A0A"
          border="1px solid #1A1A1A"
          p={6}
          position="sticky"
          top="24px"
        >
          <Flex
            align="center"
            gap={3}
            mb={6}
            borderBottom="1px solid #1A1A1A"
            pb={4}
          >
            <Icon as={LuLayers} color="white" boxSize="18px" />
            <Text color="white" fontWeight="bold" letterSpacing="tight">
              Add New Category
            </Text>
          </Flex>

          <VStack align="stretch" gap={5}>
            <Box>
              <Text as="label" {...labelStyles}>
                Name{" "}
                <Text as="span" color="red.400">
                  *
                </Text>
              </Text>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                {...controlStyles}
                placeholder="e.g. Real Estate"
                required
              />
            </Box>

            <Button
              type="submit"
              bg="white"
              color="black"
              rounded="none"
              fontWeight="bold"
              h="44px"
              mt={2}
              _hover={{ bg: "#E5E5E5" }}
              loading={create.isPending}
              loadingText="Saving..."
              disabled={!name.trim()}
            >
              <Icon as={LuPlus} mr={2} strokeWidth="2.5" /> Publish Category
            </Button>
          </VStack>
        </Box>

        <Box>
          <Text
            fontSize="10px"
            fontWeight="bold"
            letterSpacing="wider"
            color="#888888"
            textTransform="uppercase"
            mb={4}
          >
            Existing Categories ({categories?.length ?? 0})
          </Text>

          {isLoading ? (
            <Text color="#888888">Loading...</Text>
          ) : categories?.length === 0 ? (
            <Flex
              justify="center"
              align="center"
              py={16}
              bg="#0A0A0A"
              border="1px dashed #1A1A1A"
              direction="column"
            >
              <Icon
                as={LuLayers}
                color="#333333"
                boxSize="32px"
                mb={3}
                strokeWidth="1.5"
              />
              <Text color="#888888" fontSize="sm" fontWeight="bold">
                No categories exist yet.
              </Text>
            </Flex>
          ) : (
            <VStack align="stretch" gap={3}>
              {categories?.map((cat) => (
                <Flex
                  key={cat.id}
                  bg="#0A0A0A"
                  border="1px solid #1A1A1A"
                  p={5}
                  align="center"
                  justify="space-between"
                  _hover={{ bg: "#111111", borderColor: "#333333" }}
                  transition="all 0.2s"
                >
                  <Text
                    color="white"
                    fontSize="md"
                    fontWeight="bold"
                    letterSpacing="tight"
                  >
                    {cat.name}
                  </Text>

                  <IconButton
                    aria-label="Delete Category"
                    size="sm"
                    variant="outline"
                    rounded="none"
                    borderColor="#333333"
                    color="#888888"
                    _hover={{
                      bg: "red.900",
                      color: "white",
                      borderColor: "red.500",
                    }}
                    onClick={() => handleDelete(cat.id, cat.name)}
                    loading={remove.isPending}
                  >
                    <Icon as={LuTrash2} boxSize="16px" />
                  </IconButton>
                </Flex>
              ))}
            </VStack>
          )}
        </Box>
      </Grid>
    </Box>
  );
}

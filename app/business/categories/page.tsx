"use client";
import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Grid,
  SimpleGrid,
  Icon,
  Button,
  Input,
  VStack,
  IconButton,
  Textarea,
  Badge,
} from "@chakra-ui/react";
import {
  LuList,
  LuPlus,
  LuSearch,
  LuTrash,
  LuPen,
  LuPackage,
} from "react-icons/lu";

import { controlStyles } from "@/app/style";

// --- MOCK DATA ---
const INITIAL_CATEGORIES = [
  {
    id: "1",
    name: "Foot Wears",
    code: "CAT-FW",
    slug: "foot-wears",
    description: "All types of shoes, sneakers, and boots.",
    created: "May 10, 2026",
  },
  {
    id: "2",
    name: "Sport Wears",
    code: "CAT-SW",
    slug: "sport-wears",
    description: "Athletic clothing, gym gear, and activewear.",
    created: "May 08, 2026",
  },
  {
    id: "3",
    name: "Accessories",
    code: "CAT-ACC",
    slug: "accessories",
    description: "Jewelry, watches, belts, and hats.",
    created: "Apr 22, 2026",
  },
  {
    id: "4",
    name: "Bags",
    code: "CAT-BG",
    slug: "bags",
    description: "Backpacks, handbags, and travel luggage.",
    created: "Apr 15, 2026",
  },
  {
    id: "5",
    name: "Electronics",
    code: "CAT-EL",
    slug: "electronics",
    description: "Gadgets, devices, and tech accessories.",
    created: "Mar 30, 2026",
  },
];

type Category = (typeof INITIAL_CATEGORIES)[0];

export default function CategoriesPage() {
  const brandColor = "#5cac7d";

  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);

  // Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    code: "",
    description: "",
  });

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // --- LOGIC ---
  const handleAddCategory = () => {
    if (!newCategory.name.trim() || !newCategory.code.trim()) return;

    // Auto-generate slug from name
    const generatedSlug = newCategory.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const categoryToAdd = {
      id: Date.now().toString(),
      name: newCategory.name,
      code: newCategory.code,
      slug: generatedSlug,
      description: newCategory.description || "No description provided.",
      created: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    setCategories([categoryToAdd, ...categories]);
    setIsAddModalOpen(false);
    setNewCategory({ name: "", code: "", description: "" }); // Reset
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = () => {
    if (
      !editingCategory ||
      !editingCategory.name.trim() ||
      !editingCategory.code.trim()
    )
      return;

    const updatedSlug = editingCategory.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    setCategories(
      categories.map((cat) =>
        cat.id === editingCategory.id
          ? { ...editingCategory, slug: updatedSlug }
          : cat,
      ),
    );

    setIsEditModalOpen(false);
    setEditingCategory(null);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  // Filter categories based on search
  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.code.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Box
      p={{ base: 4, lg: 8 }}
      maxW="1600px"
      mx="auto"
      animation="fade-in 0.3s ease"
      bg="#000000"
      minH="100vh"
    >
      {/* --- ADD CATEGORY MODAL --- */}
      {isAddModalOpen && (
        <Box
          position="sticky"
          top={0}
          zIndex={20}
          bg="rgba(0, 0, 0, 0.85)"
          backdropFilter="blur(12px)"
          mx={{ base: -4, lg: -8 }}
          px={{ base: 4, lg: 8 }}
          pt={4}
          pb={4}
          mb={8}
          borderBottom="1px solid #1A1A1A"
        >
          <Box
            bg="#0A0A0A"
            border="1px solid #333333"
            rounded="none"
            w="full"
            maxW="500px"
            p={6}
            shadow="2xl"
          >
            <Text
              fontSize="xl"
              fontWeight="black"
              color="white"
              mb={6}
              letterSpacing="tight"
            >
              Add New Category
            </Text>

            <VStack gap={5} align="stretch">
              <Box>
                <Text
                  color="#888888"
                  fontSize="xs"
                  fontWeight="bold"
                  mb={2}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Category Name
                </Text>
                <Input
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  bg="#111111"
                  border="1px solid #333333"
                  color="white"
                  rounded="none"
                  _focus={{
                    borderColor: "white",
                    outline: "none",
                    boxShadow: "none",
                  }}
                  placeholder="e.g., Home Appliances"
                />
              </Box>
              <Box>
                <Text
                  color="#888888"
                  fontSize="xs"
                  fontWeight="bold"
                  mb={2}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Category Code
                </Text>
                <Input
                  value={newCategory.code}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  bg="#111111"
                  border="1px solid #333333"
                  color="white"
                  rounded="none"
                  _focus={{
                    borderColor: "white",
                    outline: "none",
                    boxShadow: "none",
                  }}
                  placeholder="e.g., CAT-HA"
                />
              </Box>
              <Box>
                <Text
                  color="#888888"
                  fontSize="xs"
                  fontWeight="bold"
                  mb={2}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Description
                </Text>
                <Textarea
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })
                  }
                  bg="#111111"
                  border="1px solid #333333"
                  color="white"
                  rounded="none"
                  _focus={{
                    borderColor: "white",
                    outline: "none",
                    boxShadow: "none",
                  }}
                  placeholder="Brief description of this category..."
                  rows={3}
                  resize="none"
                />
              </Box>
            </VStack>

            <Flex justify="flex-end" gap={3} mt={8}>
              <Button
                onClick={() => setIsAddModalOpen(false)}
                variant="ghost"
                color="#888888"
                _hover={{ color: "white", bg: "#111111" }}
                rounded="none"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddCategory}
                bg="white"
                color="black"
                rounded="none"
                _hover={{ bg: "#e0e0e0" }}
              >
                Save Category
              </Button>
            </Flex>
          </Box>
        </Box>
      )}

      {/* --- EDIT CATEGORY MODAL --- */}
      {isEditModalOpen && editingCategory && (
        <Box
          position="fixed"
          inset={0}
          zIndex={9999}
          bg="blackAlpha.800"
          backdropFilter="blur(4px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
        >
          <Box
            bg="#0A0A0A"
            border="1px solid #333333"
            rounded="none"
            w="full"
            maxW="500px"
            p={6}
            shadow="2xl"
          >
            <Text
              fontSize="xl"
              fontWeight="black"
              color="white"
              mb={6}
              letterSpacing="tight"
            >
              Edit Category
            </Text>

            <VStack gap={5} align="stretch">
              <Box>
                <Text
                  color="#888888"
                  fontSize="xs"
                  fontWeight="bold"
                  mb={2}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Category Name
                </Text>
                <Input
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      name: e.target.value,
                    })
                  }
                  bg="#111111"
                  border="1px solid #333333"
                  color="white"
                  rounded="none"
                  _focus={{
                    borderColor: "white",
                    outline: "none",
                    boxShadow: "none",
                  }}
                />
              </Box>
              <Box>
                <Text
                  color="#888888"
                  fontSize="xs"
                  fontWeight="bold"
                  mb={2}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Category Code
                </Text>
                <Input
                  value={editingCategory.code}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  bg="#111111"
                  border="1px solid #333333"
                  color="white"
                  rounded="none"
                  _focus={{
                    borderColor: "white",
                    outline: "none",
                    boxShadow: "none",
                  }}
                />
              </Box>
              <Box>
                <Text
                  color="#888888"
                  fontSize="xs"
                  fontWeight="bold"
                  mb={2}
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Description
                </Text>
                <Textarea
                  value={editingCategory.description}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      description: e.target.value,
                    })
                  }
                  bg="#111111"
                  border="1px solid #333333"
                  color="white"
                  rounded="none"
                  _focus={{
                    borderColor: "white",
                    outline: "none",
                    boxShadow: "none",
                  }}
                  rows={3}
                  resize="none"
                />
              </Box>
            </VStack>

            <Flex justify="flex-end" gap={3} mt={8}>
              <Button
                onClick={() => setIsEditModalOpen(false)}
                variant="ghost"
                color="#888888"
                _hover={{ color: "white", bg: "#111111" }}
                rounded="none"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateCategory}
                bg="white"
                color="black"
                rounded="none"
                _hover={{ bg: "#e0e0e0" }}
              >
                Update Category
              </Button>
            </Flex>
          </Box>
        </Box>
      )}

      {/* --- HEADER --- */}
      <Flex
        justify="space-between"
        align={{ base: "flex-start", md: "flex-end" }}
        direction={{ base: "column", md: "row" }}
        gap={4}
        mb={8}
      >
        <Box>
          <Flex align="center" gap={3} mb={1}>
            <Icon
              as={LuList}
              color={brandColor}
              boxSize="24px"
              strokeWidth="2.5"
            />
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="black"
              color="white"
              letterSpacing="tight"
            >
              Categories
            </Text>
          </Flex>
          <Text color="#888888" fontSize="sm">
            Manage product categories, codes, and classifications.
          </Text>
        </Box>

        <Button
          onClick={() => setIsAddModalOpen(true)}
          bg="#111111"
          border="1px solid #333333"
          color="white"
          h="44px"
          px={6}
          rounded="none"
          _hover={{ bg: "#1A1A1A" }}
          display="flex"
          gap={2}
        >
          <Icon as={LuPlus} color={brandColor} strokeWidth="2.5" /> Add Category
        </Button>
      </Flex>

      {/* --- KPI SECTION --- */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
        <Box
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
                as={LuPackage}
                color={brandColor}
                boxSize="20px"
                strokeWidth="2.5"
              />
            </Flex>
          </Flex>
          <Text
            color="#888888"
            fontSize="10px"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
            mb={1}
          >
            Total Available Categories
          </Text>
          <Flex align="baseline" gap={3}>
            <Text
              color="white"
              fontSize="3xl"
              fontWeight="black"
              letterSpacing="tight"
            >
              {categories.length}
            </Text>
          </Flex>
        </Box>
      </SimpleGrid>

      {/* --- SEARCH CONTROL (Filter Removed) --- */}
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={4}
        mb={6}
        justify="space-between"
      >
        <Flex
          flex={1}
          maxW="500px"
          align="center"
          {...controlStyles}
          bg="#0A0A0A"
        >
          <Icon as={LuSearch} color={brandColor} mr={2} strokeWidth="2.5" />
          <Input
            placeholder="Search categories by name or code..."
            border="none"
            color="white"
            h="full"
            px={0}
            _focus={{ boxShadow: "none", outline: "none" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Flex>
      </Flex>

      {/* --- CATEGORIES TABLE --- */}
      <Box bg="#0A0A0A" border="1px solid #1A1A1A" overflowX="auto">
        <Box minW="1000px">
          {/* Table Header */}
          <Grid
            templateColumns="1.5fr 1fr 1fr 2.5fr 1fr 0.5fr"
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
              Name
            </Text>
            <Text
              color="#888888"
              fontSize="10px"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Code
            </Text>
            <Text
              color="#888888"
              fontSize="10px"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Slug
            </Text>
            <Text
              color="#888888"
              fontSize="10px"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Description
            </Text>
            <Text
              color="#888888"
              fontSize="10px"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Created
            </Text>
            <Text
              color="#888888"
              fontSize="10px"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wider"
              textAlign="center"
            >
              Actions
            </Text>
          </Grid>

          {/* Table Body */}
          <VStack align="stretch" gap={0}>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <Grid
                  key={category.id}
                  templateColumns="1.5fr 1fr 1fr 2.5fr 1fr 0.5fr"
                  gap={4}
                  px={6}
                  py={4}
                  borderBottom="1px solid #1A1A1A"
                  alignItems="center"
                  _hover={{ bg: "#111111" }}
                  transition="background 0.2s"
                >
                  <Text color="white" fontSize="sm" fontWeight="bold">
                    {category.name}
                  </Text>

                  <Box>
                    <Badge
                      bg="#111111"
                      color="white"
                      border="1px solid #333333"
                      rounded="none"
                      px={2}
                      py={0.5}
                      fontSize="10px"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {category.code}
                    </Badge>
                  </Box>

                  <Text color="#888888" fontSize="12px" fontFamily="monospace">
                    /{category.slug}
                  </Text>

                  <Text
                    color="#888888"
                    fontSize="sm"
                    title={category.description}
                  >
                    {category.description}
                  </Text>

                  <Text color="white" fontSize="xs" fontWeight="medium">
                    {category.created}
                  </Text>

                  <Flex justify="center" gap={1}>
                    <IconButton
                      aria-label="Edit"
                      variant="ghost"
                      size="sm"
                      rounded="none"
                      _hover={{ bg: "#1A1A1A" }}
                      onClick={() => openEditModal(category)}
                    >
                      <Icon as={LuPen} boxSize="14px" color={brandColor} />
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      variant="ghost"
                      size="sm"
                      rounded="none"
                      _hover={{ bg: "rgba(229, 62, 62, 0.1)" }}
                      onClick={() => handleDelete(category.id)}
                    >
                      <Icon as={LuTrash} boxSize="14px" color="red.400" />
                    </IconButton>
                  </Flex>
                </Grid>
              ))
            ) : (
              <Flex
                justify="center"
                align="center"
                py={12}
                direction="column"
                gap={3}
              >
                <Icon as={LuSearch} color="#333333" boxSize="32px" />
                <Text color="#888888" fontSize="sm">
                  No categories found matching your criteria.
                </Text>
              </Flex>
            )}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

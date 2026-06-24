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
  LuBox,
  LuPlus,
  LuSearch,
  LuTrash,
  LuPen,
  LuLayers,
} from "react-icons/lu";

import { controlStyles } from "@/app/ui/style";

// --- MOCK DATA ---
const INITIAL_PRODUCT_TYPES = [
  {
    id: "1",
    name: "Sneakers",
    code: "PT-SNK",
    category: "Foot Wears",
    description: "Casual and athletic sneakers.",
    created: "May 10, 2026",
  },
  {
    id: "2",
    name: "T-Shirts",
    code: "PT-TSH",
    category: "Sport Wears",
    description: "Short sleeve, long sleeve, and activewear tees.",
    created: "May 08, 2026",
  },
  {
    id: "3",
    name: "Smartphones",
    code: "PT-SMP",
    category: "Electronics",
    description: "Mobile phones and smart devices.",
    created: "Apr 22, 2026",
  },
  {
    id: "4",
    name: "Handbags",
    code: "PT-HBG",
    category: "Bags",
    description: "Women's designer and casual handbags.",
    created: "Apr 15, 2026",
  },
  {
    id: "5",
    name: "Wrist Watches",
    code: "PT-WCH",
    category: "Accessories",
    description: "Analog, digital, and smartwatches.",
    created: "Mar 30, 2026",
  },
];

// Mock categories for the dropdown selector
const CATEGORIES = [
  "Foot Wears",
  "Sport Wears",
  "Electronics",
  "Bags",
  "Accessories",
];

type ProductType = (typeof INITIAL_PRODUCT_TYPES)[0];

export default function ProductTypePage() {
  const brandColor = "#5cac7d";

  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [productTypes, setProductTypes] = useState(INITIAL_PRODUCT_TYPES);

  // Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductType, setNewProductType] = useState({
    name: "",
    code: "",
    category: "Foot Wears",
    description: "",
  });

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProductType, setEditingProductType] =
    useState<ProductType | null>(null);

  // --- LOGIC ---
  const handleAddProductType = () => {
    if (!newProductType.name.trim() || !newProductType.code.trim()) return;

    const typeToAdd = {
      id: Date.now().toString(),
      name: newProductType.name,
      code: newProductType.code,
      category: newProductType.category,
      description: newProductType.description || "No description provided.",
      created: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    setProductTypes([typeToAdd, ...productTypes]);
    setIsAddModalOpen(false);
    setNewProductType({
      name: "",
      code: "",
      category: "Foot Wears",
      description: "",
    }); // Reset
  };

  const openEditModal = (productType: ProductType) => {
    setEditingProductType(productType);
    setIsEditModalOpen(true);
  };

  const handleUpdateProductType = () => {
    if (
      !editingProductType ||
      !editingProductType.name.trim() ||
      !editingProductType.code.trim()
    )
      return;

    setProductTypes(
      productTypes.map((pt) =>
        pt.id === editingProductType.id ? editingProductType : pt,
      ),
    );

    setIsEditModalOpen(false);
    setEditingProductType(null);
  };

  const handleDelete = (id: string) => {
    setProductTypes(productTypes.filter((pt) => pt.id !== id));
  };

  // Filter product types based on search
  const filteredProductTypes = productTypes.filter(
    (pt) =>
      pt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pt.category.toLowerCase().includes(searchQuery.toLowerCase()),
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
      {/* --- ADD PRODUCT TYPE MODAL --- */}
      {isAddModalOpen && (
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
              Add Product Type
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
                  Type Name
                </Text>
                <Input
                  value={newProductType.name}
                  onChange={(e) =>
                    setNewProductType({
                      ...newProductType,
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
                  placeholder="e.g., Sneakers"
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
                  Type Code
                </Text>
                <Input
                  value={newProductType.code}
                  onChange={(e) =>
                    setNewProductType({
                      ...newProductType,
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
                  placeholder="e.g., PT-SNK"
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
                  value={newProductType.description}
                  onChange={(e) =>
                    setNewProductType({
                      ...newProductType,
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
                  placeholder="Brief description of this product type..."
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
                onClick={handleAddProductType}
                bg="white"
                color="black"
                rounded="none"
                _hover={{ bg: "#e0e0e0" }}
              >
                Save Type
              </Button>
            </Flex>
          </Box>
        </Box>
      )}

      {/* --- EDIT PRODUCT TYPE MODAL --- */}
      {isEditModalOpen && editingProductType && (
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
              Edit Product Type
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
                  Type Name
                </Text>
                <Input
                  value={editingProductType.name}
                  onChange={(e) =>
                    setEditingProductType({
                      ...editingProductType,
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
                  Type Code
                </Text>
                <Input
                  value={editingProductType.code}
                  onChange={(e) =>
                    setEditingProductType({
                      ...editingProductType,
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
                  Parent Category
                </Text>
                <select
                  style={{
                    width: "100%",
                    height: "40px",
                    padding: "0 12px",
                    background: "#111111",
                    border: "1px solid #333333",
                    color: "white",
                    outline: "none",
                    cursor: "pointer",
                  }}
                  value={editingProductType.category}
                  onChange={(e) =>
                    setEditingProductType({
                      ...editingProductType,
                      category: e.target.value,
                    })
                  }
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
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
                  value={editingProductType.description}
                  onChange={(e) =>
                    setEditingProductType({
                      ...editingProductType,
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
                onClick={handleUpdateProductType}
                bg="white"
                color="black"
                rounded="none"
                _hover={{ bg: "#e0e0e0" }}
              >
                Update Type
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
              as={LuBox}
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
              Product Types
            </Text>
          </Flex>
          <Text color="#888888" fontSize="sm">
            Manage specific product sub-types and variants under categories.
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
          <Icon as={LuPlus} color={brandColor} strokeWidth="2.5" /> Add Type
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
                as={LuLayers}
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
            Total Product Types
          </Text>
          <Flex align="baseline" gap={3}>
            <Text
              color="white"
              fontSize="3xl"
              fontWeight="black"
              letterSpacing="tight"
            >
              {productTypes.length}
            </Text>
          </Flex>
        </Box>
      </SimpleGrid>

      {/* --- SEARCH CONTROL --- */}
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
            placeholder="Search types by name, code, or category..."
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

      {/* --- PRODUCT TYPES TABLE --- */}
      <Box bg="#0A0A0A" border="1px solid #1A1A1A" overflowX="auto">
        <Box minW="1000px">
          {/* Table Header */}
          <Grid
            templateColumns="1.5fr 1fr 1.5fr 2.5fr 1fr 0.5fr"
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
              Category
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
            {filteredProductTypes.length > 0 ? (
              filteredProductTypes.map((pt) => (
                <Grid
                  key={pt.id}
                  templateColumns="1.5fr 1fr 1.5fr 2.5fr 1fr 0.5fr"
                  gap={4}
                  px={6}
                  py={4}
                  borderBottom="1px solid #1A1A1A"
                  alignItems="center"
                  _hover={{ bg: "#111111" }}
                  transition="background 0.2s"
                >
                  <Text color="white" fontSize="sm" fontWeight="bold">
                    {pt.name}
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
                      {pt.code}
                    </Badge>
                  </Box>

                  <Text color="#888888" fontSize="sm">
                    {pt.category}
                  </Text>

                  <Text color="#888888" fontSize="sm" title={pt.description}>
                    {pt.description}
                  </Text>

                  <Text color="white" fontSize="xs" fontWeight="medium">
                    {pt.created}
                  </Text>

                  <Flex justify="center" gap={1}>
                    <IconButton
                      aria-label="Edit"
                      variant="ghost"
                      size="sm"
                      rounded="none"
                      _hover={{ bg: "#1A1A1A" }}
                      onClick={() => openEditModal(pt)}
                    >
                      <Icon as={LuPen} boxSize="14px" color={brandColor} />
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      variant="ghost"
                      size="sm"
                      rounded="none"
                      _hover={{ bg: "rgba(229, 62, 62, 0.1)" }}
                      onClick={() => handleDelete(pt.id)}
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
                  No product types found matching your criteria.
                </Text>
              </Flex>
            )}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

"use client";
import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Icon,
  Input,
  Button,
  Image,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import {
  LuSearch,
  LuStar,
  LuPrinter,
  LuPackagePlus,
  LuPencil,
  LuTrash2,
  LuX,
} from "react-icons/lu";
import { InventoryProduct } from "@/app/lib/definitions";

// 🚀 Brutalist control styles
const controlStyles = {
  bg: "#0A0A0A",
  border: "1px solid",
  borderColor: "#333333",
  color: "white",
  h: "44px",
  rounded: "none",
  px: 3,
  _focus: { outline: "none", borderColor: "white" },
  _hover: { bg: "#111111" },
};
const nativeSelectStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#0A0A0A",
  color: "white",
  height: "44px",
  borderRadius: "0px",
  padding: "0 12px",
  border: "1px solid #333333",
  outline: "none",
  cursor: "pointer",
};

interface InventoryGridViewProps {
  visibleItems: InventoryProduct[];
  processedInventoryLength: number;
  searchQuery: string;
  filterCategory: string;
  sortBy: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSelectProduct: (product: InventoryProduct) => void;
  visibleCount: number;
  isLoadingMore: boolean;
  loaderRef: React.RefObject<HTMLDivElement | null>;
  onDelete: (id: string) => void;
  onRestock: (id: string, amount: number) => void;
  onEdit: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export const InventoryGridView = ({
  visibleItems,
  processedInventoryLength,
  searchQuery,
  filterCategory,
  sortBy,
  handleSearch,
  handleFilter,
  handleSort,
  onSelectProduct,
  visibleCount,
  isLoadingMore,
  loaderRef,
  onDelete,
  onRestock,
  onEdit,
  toggleFavorite,
}: InventoryGridViewProps) => {
  const [restockTarget, setRestockTarget] = useState<string | null>(null);
  const [restockAmount, setRestockAmount] = useState("");

  const submitRestock = () => {
    if (restockTarget && restockAmount && !isNaN(Number(restockAmount))) {
      onRestock(restockTarget, Number(restockAmount));
      setRestockTarget(null);
      setRestockAmount("");
    }
  };

  return (
    <Box
      w="full"
      maxW="100%"
      display="flex"
      flexDirection="column"
      position="relative"
      bg="#000000"
    >
      <Box mb={4} pt={2}>
        <Text
          color="white"
          fontWeight="bold"
          fontSize="3xl"
          mb={1}
          letterSpacing="tight"
        >
          My Inventory
        </Text>
        <Text color="#888888" fontSize="sm">
          Showing{" "}
          <Text as="span" color="white" fontWeight="bold">
            {visibleItems.length}
          </Text>{" "}
          of{" "}
          <Text as="span" color="white" fontWeight="bold">
            {processedInventoryLength}
          </Text>{" "}
          products
        </Text>
      </Box>

      <Box
        position="sticky"
        top={{ base: "-16px", md: "-32px" }}
        mx={{ base: "-16px", md: "-32px" }}
        px={{ base: "16px", md: "32px" }}
        zIndex={20}
        bg="rgba(0, 0, 0, 0.85)"
        backdropFilter="blur(12px)"
        py={3}
        mb={6}
        borderBottom="1px solid"
        borderColor="#1A1A1A"
        w="full"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          gap={4}
          w="full"
        >
          <Flex
            w="full"
            maxW={{ base: "full", md: "400px" }}
            align="center"
            {...controlStyles}
          >
            <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
            <Input
              placeholder="Search by name or SKU..."
              border="none"
              _focus={{ outline: "none", boxShadow: "none" }}
              color="white"
              h="full"
              value={searchQuery}
              onChange={handleSearch}
              px={0}
            />
          </Flex>

          <Flex gap={3} w={{ base: "full", md: "auto" }}>
            <Box flex={1} w={{ base: "full", md: "180px" }}>
              <select
                value={filterCategory}
                onChange={handleFilter}
                style={nativeSelectStyle}
              >
                <option value="all" style={{ background: "#0A0A0A" }}>
                  All Products
                </option>
                <option value="featured" style={{ background: "#0A0A0A" }}>
                  Featured Only
                </option>
                <option value="low-stock" style={{ background: "#0A0A0A" }}>
                  Low Stock
                </option>
                <option value="out-of-stock" style={{ background: "#0A0A0A" }}>
                  Out of Stock
                </option>
              </select>
            </Box>
            <Box flex={1} w={{ base: "full", md: "180px" }}>
              <select
                value={sortBy}
                onChange={handleSort}
                style={nativeSelectStyle}
              >
                <option value="default" style={{ background: "#0A0A0A" }}>
                  Sort: Default
                </option>
                <option value="price-asc" style={{ background: "#0A0A0A" }}>
                  Price: Low to High
                </option>
                <option value="price-desc" style={{ background: "#0A0A0A" }}>
                  Price: High to Low
                </option>
                <option value="stock-asc" style={{ background: "#0A0A0A" }}>
                  Stock: Low to High
                </option>
                <option value="stock-desc" style={{ background: "#0A0A0A" }}>
                  Stock: High to Low
                </option>
              </select>
            </Box>
          </Flex>
        </Flex>
      </Box>

      {visibleItems.length === 0 ? (
        <Flex
          justify="center"
          align="center"
          py={20}
          direction="column"
          border="1px dashed #1A1A1A"
          bg="#0A0A0A"
        >
          <Text color="#888888" fontSize="lg" fontWeight="bold">
            No products found.
          </Text>
          <Text color="#555555" fontSize="sm">
            Try adjusting your search or filters.
          </Text>
        </Flex>
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          gap={6}
          mb={8}
          w="full"
        >
          {visibleItems.map((product) => (
            <Box
              key={product.id}
              bg="#0A0A0A"
              border="1px solid #1A1A1A"
              rounded="none"
              overflow="hidden"
              _hover={{ borderColor: "#333333", shadow: "2xl" }}
              transition="all 0.2s"
              display="flex"
              flexDirection="column"
            >
              <Box
                position="relative"
                h="280px"
                w="full"
                bg="#111111"
                cursor="pointer"
                onClick={() => onSelectProduct(product)}
                role="group"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  w="full"
                  h="full"
                  objectFit="cover"
                  opacity={0.9}
                  transition="all 0.4s ease"
                  _groupHover={{ transform: "scale(1.05)", opacity: 1 }}
                />

                <Flex
                  position="absolute"
                  inset={0}
                  bg="rgba(0,0,0,0.6)"
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                  transition="all 0.3s"
                  justify="center"
                  align="center"
                >
                  <Button
                    bg="white"
                    color="black"
                    rounded="none"
                    fontWeight="bold"
                    border="none"
                    shadow="xl"
                    _hover={{ bg: "#E5E5E5" }}
                  >
                    View Details
                  </Button>
                </Flex>

                {product.isFeatured && (
                  <Box
                    position="absolute"
                    top={3}
                    right={3}
                    bg="#000000"
                    color="white"
                    fontSize="10px"
                    fontWeight="bold"
                    px={2}
                    py={1}
                    border="1px solid #333333"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Featured
                  </Box>
                )}
              </Box>

              <Box p={5} flex={1} display="flex" flexDirection="column">
                <Flex justify="space-between" align="start" mb={4}>
                  <Text
                    color="white"
                    fontWeight="bold"
                    fontSize="lg"
                    lineClamp={1}
                    flex={1}
                    pr={2}
                    letterSpacing="tight"
                  >
                    {product.name}
                  </Text>
                  <Icon
                    as={LuStar}
                    color={product.isFavorite ? "orange.400" : "#333333"}
                    fill={product.isFavorite ? "orange.400" : "transparent"}
                    boxSize="18px"
                    cursor="pointer"
                    transition="all 0.2s"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                  />
                </Flex>

                <Flex
                  justify="space-between"
                  align="center"
                  mb={3}
                  borderBottom="1px solid #1A1A1A"
                  pb={3}
                >
                  <Text color="#888888" fontSize="xs">
                    SKU:{" "}
                    <Text as="span" color="white" fontFamily="monospace">
                      {product.sku}
                    </Text>
                  </Text>
                  <Icon
                    as={LuPrinter}
                    color="#555555"
                    cursor="pointer"
                    _hover={{ color: "white" }}
                    boxSize="14px"
                  />
                </Flex>

                <Flex justify="space-between" align="center" mb={6}>
                  <Box>
                    <Text color="#888888" fontSize="xs" mb={1}>
                      Variations:{" "}
                      <Text as="span" color="white" fontWeight="bold">
                        {product.variations || 1}
                      </Text>
                    </Text>
                    <Text color="#888888" fontSize="xs">
                      Stock:{" "}
                      <Text
                        as="span"
                        color={product.stock < 5 ? "red.400" : "white"}
                        fontWeight={product.stock < 5 ? "bold" : "normal"}
                      >
                        {product.stock}
                      </Text>
                    </Text>
                  </Box>
                  <Text
                    color="white"
                    fontWeight="black"
                    fontSize="xl"
                    letterSpacing="tight"
                  >
                    ₦{product.price.toLocaleString()}
                  </Text>
                </Flex>

                {/* 🚀 STRICT MONOCHROME BUTTONS WITH COLORED ICONS */}
                <Flex gap={2} mt="auto">
                  <Button
                    flex={1}
                    size="sm"
                    h="36px"
                    bg="#111111"
                    color="white"
                    border="1px solid #333333"
                    rounded="none"
                    fontSize="12px"
                    px={0}
                    _hover={{ bg: "#1A1A1A" }}
                    onClick={() => setRestockTarget(product.id)}
                  >
                    <Icon
                      as={LuPackagePlus}
                      color="#5cac7d"
                      mr={1.5}
                      boxSize="14px"
                    />{" "}
                    Restock
                  </Button>
                  <Button
                    flex={1}
                    size="sm"
                    h="36px"
                    bg="#111111"
                    color="white"
                    border="1px solid #333333"
                    rounded="none"
                    fontSize="12px"
                    px={0}
                    _hover={{ bg: "#1A1A1A" }}
                    onClick={() => onEdit(product.id)}
                  >
                    <Icon
                      as={LuPencil}
                      color="blue.400"
                      mr={1.5}
                      boxSize="14px"
                    />{" "}
                    Edit
                  </Button>
                  <Button
                    flex={1}
                    size="sm"
                    h="36px"
                    bg="#111111"
                    color="white"
                    border="1px solid #333333"
                    rounded="none"
                    fontSize="12px"
                    px={0}
                    _hover={{ bg: "#1A1A1A" }}
                    onClick={() => onDelete(product.id)}
                  >
                    <Icon
                      as={LuTrash2}
                      color="red.400"
                      mr={1.5}
                      boxSize="14px"
                    />{" "}
                    Delete
                  </Button>
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}

      {visibleCount < processedInventoryLength && (
        <Flex ref={loaderRef} justify="center" py={4} h="80px" align="center">
          {isLoadingMore && <Spinner color="white" size="md" />}
        </Flex>
      )}

      {/* Restock Modal */}
      {restockTarget && (
        <Box
          position="fixed"
          inset={0}
          zIndex={9999}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            position="absolute"
            inset={0}
            bg="rgba(0,0,0,0.85)"
            backdropFilter="blur(4px)"
            onClick={() => setRestockTarget(null)}
          />
          <Box
            position="relative"
            bg="#0A0A0A"
            p={6}
            rounded="none"
            border="1px solid #333333"
            w="90%"
            maxW="400px"
            shadow="2xl"
            animation="fade-in 0.2s ease-out"
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Text
                color="white"
                fontWeight="bold"
                fontSize="lg"
                letterSpacing="tight"
              >
                Restock Product
              </Text>
              <IconButton
                aria-label="Close"
                size="sm"
                variant="ghost"
                rounded="none"
                color="#888888"
                _hover={{ bg: "#111111", color: "white" }}
                onClick={() => setRestockTarget(null)}
              >
                <LuX strokeWidth="2.5" />
              </IconButton>
            </Flex>
            <Text color="#888888" fontSize="sm" mb={4}>
              Enter the quantity to add to the existing stock.
            </Text>
            <Input
              type="number"
              placeholder="Enter quantity (e.g. 50)"
              {...controlStyles}
              mb={6}
              value={restockAmount}
              onChange={(e) => setRestockAmount(e.target.value)}
              autoFocus
            />
            <Flex gap={3} justify="flex-end">
              <Button
                variant="ghost"
                rounded="none"
                color="#888888"
                _hover={{ bg: "#111111", color: "white" }}
                onClick={() => setRestockTarget(null)}
              >
                Cancel
              </Button>
              <Button
                bg="white"
                color="black"
                rounded="none"
                fontWeight="bold"
                _hover={{ bg: "#E5E5E5" }}
                border="none"
                onClick={submitRestock}
                disabled={!restockAmount}
              >
                Update Stock
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </Box>
  );
};

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

const controlStyles = {
  bg: "#121214",
  border: "1px solid",
  borderColor: "whiteAlpha.200",
  color: "white",
  h: "40px",
  rounded: "lg",
  px: 3,
  _focus: { outline: "none", borderColor: "#5cac7d" },
  _hover: { bg: "whiteAlpha.50" },
};
const nativeSelectStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#121214",
  color: "white",
  height: "40px",
  borderRadius: "8px",
  padding: "0 12px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
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
    >
      <Box mb={4} pt={2}>
        <Text color="#fff" fontWeight="bold" fontSize="3xl" mb={1}>
          Inventory
        </Text>
        <Text color="gray.400" fontSize="sm">
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
        top={{ base: "70px", md: "85px" }}
        zIndex={20}
        bg="rgba(18, 18, 20, 0.85)"
        backdropFilter="blur(12px)"
        py={3}
        mb={6}
        borderBottom="1px solid"
        borderColor="whiteAlpha.100"
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
            _focusWithin={{ borderColor: "#5cac7d" }}
          >
            <Icon as={LuSearch} color="gray.400" />
            <Input
              placeholder="Search by name or SKU..."
              border="none"
              _focus={{ outline: "none", boxShadow: "none" }}
              color="white"
              h="full"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Flex>

          <Flex gap={3} w={{ base: "full", md: "auto" }}>
            <Box flex={1} w={{ base: "full", md: "180px" }}>
              <select
                value={filterCategory}
                onChange={handleFilter}
                style={nativeSelectStyle}
              >
                <option value="all" style={{ background: "#1A1C23" }}>
                  All Products
                </option>
                <option value="featured" style={{ background: "#1A1C23" }}>
                  Featured Only
                </option>
                <option value="low-stock" style={{ background: "#1A1C23" }}>
                  Low Stock
                </option>
                <option value="out-of-stock" style={{ background: "#1A1C23" }}>
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
                <option value="default" style={{ background: "#1A1C23" }}>
                  Sort: Default
                </option>
                <option value="price-asc" style={{ background: "#1A1C23" }}>
                  Price: Low to High
                </option>
                <option value="price-desc" style={{ background: "#1A1C23" }}>
                  Price: High to Low
                </option>
                <option value="stock-asc" style={{ background: "#1A1C23" }}>
                  Stock: Low to High
                </option>
                <option value="stock-desc" style={{ background: "#1A1C23" }}>
                  Stock: High to Low
                </option>
              </select>
            </Box>
          </Flex>
        </Flex>
      </Box>

      {visibleItems.length === 0 ? (
        <Flex justify="center" align="center" py={20} direction="column">
          <Text color="gray.400" fontSize="lg" fontWeight="bold">
            No products found.
          </Text>
          <Text color="gray.500" fontSize="sm">
            Try adjusting your search or filters.
          </Text>
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6} mb={8} w="full">
          {visibleItems.map((product) => (
            <Box
              key={product.id}
              bg="black"
              // rounded="2xl"
              border="1px solid"
              borderColor="whiteAlpha.100"
              overflow="hidden"
              _hover={{ borderColor: "whiteAlpha.300", shadow: "2xl" }}
              transition="all 0.2s"
            >
              <Box
                position="relative"
                h="280px"
                w="full"
                bg="black"
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
                  bg="blackAlpha.600"
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                  transition="all 0.3s"
                  justify="center"
                  align="center"
                >
                  <Button
                    bg="#5cac7d"
                    color="white"
                    border="none"
                    shadow="xl"
                    _hover={{ bg: "#4a9c6d", transform: "translateY(-2px)" }}
                  >
                    View Details
                  </Button>
                </Flex>
                {product.isFeatured && (
                  <Box
                    position="absolute"
                    top={3}
                    right={3}
                    bg="blackAlpha.800"
                    color="white"
                    fontSize="xs"
                    fontWeight="bold"
                    px={3}
                    py={1}
                    backdropFilter="blur(4px)"
                  >
                    Featured
                  </Box>
                )}
              </Box>

              <Box p={5}>
                <Flex justify="space-between" align="start" mb={4}>
                  <Text
                    color="white"
                    fontWeight="bold"
                    fontSize="lg"
                    lineClamp={1}
                    flex={1}
                    pr={2}
                  >
                    {product.name}
                  </Text>
                  <Icon
                    as={LuStar}
                    color={product.isFavorite ? "orange.400" : "gray.600"}
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
                  borderBottom="1px solid"
                  borderColor="whiteAlpha.50"
                  pb={3}
                >
                  <Text color="gray.400" fontSize="xs">
                    SKU:{" "}
                    <Text as="span" color="gray.300" fontFamily="monospace">
                      {product.sku}
                    </Text>
                  </Text>
                  <Icon
                    as={LuPrinter}
                    color="gray.400"
                    cursor="pointer"
                    _hover={{ color: "white" }}
                    boxSize="14px"
                  />
                </Flex>

                <Flex justify="space-between" align="center" mb={4}>
                  <Box>
                    <Text color="gray.400" fontSize="xs" mb={1}>
                      Variations:{" "}
                      <Text as="span" color="white" fontWeight="bold">
                        {product.variations || 1}
                      </Text>
                    </Text>
                    <Text color="gray.400" fontSize="xs">
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
                  <Text color="#fff" fontWeight="black" fontSize="xl">
                    ₦{product.price.toLocaleString()}
                  </Text>
                </Flex>

                <Flex gap={2}>
                  {/*  Wired up Restock Modal Trigger */}
                  <Button
                    flex={1}
                    size="sm"
                    bg="rgba(92, 172, 125, 0.15)"
                    color="#5cac7d"
                    _hover={{ bg: "rgba(92, 172, 125, 0.25)" }}
                    border="none"
                    fontSize="xs"
                    px={0}
                    onClick={() => setRestockTarget(product.id)}
                  >
                    <Icon as={LuPackagePlus} mr={1.5} boxSize="14px" /> Restock
                  </Button>

                  {/*  Wired up Edit Action */}
                  <Button
                    flex={1}
                    size="sm"
                    bg="rgba(66, 153, 225, 0.15)"
                    color="blue.300"
                    _hover={{ bg: "rgba(66, 153, 225, 0.25)" }}
                    border="none"
                    fontSize="xs"
                    px={0}
                    onClick={() => onEdit(product.id)}
                  >
                    <Icon as={LuPencil} mr={1.5} boxSize="14px" /> Edit
                  </Button>

                  {/*  Wired up Delete Action */}
                  <Button
                    flex={1}
                    size="sm"
                    bg="rgba(245, 101, 101, 0.15)"
                    color="red.400"
                    _hover={{ bg: "rgba(245, 101, 101, 0.25)" }}
                    border="none"
                    fontSize="xs"
                    px={0}
                    onClick={() => onDelete(product.id)}
                  >
                    <Icon as={LuTrash2} mr={1.5} boxSize="14px" /> Delete
                  </Button>
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}

      {visibleCount < processedInventoryLength && (
        <Flex ref={loaderRef} justify="center" py={4} h="80px" align="center">
          {isLoadingMore && <Spinner color="#5cac7d" size="md" />}
        </Flex>
      )}

      {/* Restock Modal for the Grid View */}
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
            bg="blackAlpha.700"
            backdropFilter="blur(4px)"
            onClick={() => setRestockTarget(null)}
          />
          <Box
            position="relative"
            bg="#1A1C23"
            p={6}
            rounded="2xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
            w="90%"
            maxW="400px"
            shadow="2xl"
            animation="fade-in 0.2s ease-out"
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Text color="white" fontWeight="bold" fontSize="lg">
                Restock Product
              </Text>
              <IconButton
                aria-label="Close"
                size="sm"
                variant="ghost"
                color="gray.400"
                onClick={() => setRestockTarget(null)}
              >
                <LuX />
              </IconButton>
            </Flex>
            <Text color="gray.400" fontSize="sm" mb={4}>
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
                color="gray.400"
                _hover={{ bg: "whiteAlpha.50" }}
                onClick={() => setRestockTarget(null)}
              >
                Cancel
              </Button>
              <Button
                bg="#5cac7d"
                color="white"
                _hover={{ bg: "#4a9c6d" }}
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

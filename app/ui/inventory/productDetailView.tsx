"use client";
import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Icon,
  Button,
  Image,
  HStack,
  Badge,
  IconButton,
  Input,
} from "@chakra-ui/react";
import {
  LuPackagePlus,
  LuPencil,
  LuTrash2,
  LuArrowLeft,
  LuX,
} from "react-icons/lu";
import { InventoryProduct } from "@/app/lib/definitions";

export interface ProductVariation {
  id: string;
  size: string;
  color: string;
  colorHex: string;
  stock: number;
  salePrice: number;
  costPrice: number;
  sku: string;
}

export interface DetailedInventoryProduct extends InventoryProduct {
  images: string[];
  description: string;
  specs: {
    brand: string;
    type: string;
    gender: string;
    status: string;
    created: string;
  };
  variationsData: ProductVariation[];
}

interface ProductDetailViewProps {
  product: DetailedInventoryProduct;
  activeImageIdx: number;
  setActiveImageIdx: (idx: number) => void;
  onBack: () => void;
  onDelete: (id: string) => void;
  onRestock: (id: string, amount: number) => void;
  onEdit: (id: string) => void;
}

const controlStyles = {
  bg: "#0A0A0A",
  border: "1px solid",
  borderColor: "#1A1A1A",
  color: "white",
  h: "44px",
  rounded: "none",
  px: 3,
  _focus: { outline: "none", borderColor: "white", boxShadow: "0 0 0 1px white" },
  _hover: { borderColor: "#333333" },
};

export const ProductDetailView = ({
  product,
  activeImageIdx,
  setActiveImageIdx,
  onBack,
  onDelete,
  onRestock,
  onEdit,
}: ProductDetailViewProps) => {
  // Restock Modal
  const [isRestocking, setIsRestocking] = useState(false);
  const [restockAmount, setRestockAmount] = useState("");

  const handleRestockSubmit = () => {
    if (restockAmount && !isNaN(Number(restockAmount))) {
      onRestock(product.id, Number(restockAmount));
      setIsRestocking(false);
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
      pb={10}
      animation="fade-in 0.3s ease"
      bg="#000000"
    >
      {/* Detail Header */}
      <Box
        position="sticky"
        top={{ base: "-16px", md: "-32px" }}
        mx={{ base: "-16px", md: "-32px" }}
        px={{ base: "16px", md: "32px" }}
        zIndex={20}
        bg="rgba(0, 0, 0, 0.85)"
        backdropFilter="blur(12px)"
        py={4}
        mb={6}
        borderBottom="1px solid #1A1A1A"
        w="full"
      >
        <Flex
          justify="space-between"
          align={{ base: "flex-start", lg: "center" }}
          direction={{ base: "column", lg: "row" }}
          gap={4}
        >
          <Flex align="center" gap={4} maxW="full">
            <Button
              variant="ghost"
              color="gray.400"
              rounded="none"
              _hover={{ color: "white", bg: "#111111" }}
              onClick={onBack}
              px={2}
              h="40px"
              flexShrink={0}
            >
              <Icon as={LuArrowLeft} boxSize="20px" />
            </Button>
            <Box overflow="hidden">
              <Text
                color="white"
                fontWeight="bold"
                fontSize={{ base: "lg", md: "xl" }}
                lineClamp={1}
              >
                {product.name}
              </Text>
              <Text color="gray.500" fontSize="sm">
                SKU: {product.sku}
              </Text>
            </Box>
          </Flex>
          <Flex
            gap={3}
            w={{ base: "full", lg: "auto" }}
            overflowX="auto"
            pb={{ base: 2, lg: 0 }}
            css={{ "&::-webkit-scrollbar": { display: "none" } }}
          >
            {/* Restock Button - Kept color */}
            <Button
              size="sm"
              bg="rgba(92, 172, 125, 0.1)"
              color="#5cac7d"
              rounded="none"
              _hover={{ bg: "rgba(92, 172, 125, 0.2)" }}
              border="1px solid rgba(92, 172, 125, 0.3)"
              flexShrink={0}
              onClick={() => setIsRestocking(true)}
            >
              <Icon as={LuPackagePlus} mr={2} /> Restock
            </Button>

            {/* Edit Button - Kept color */}
            <Button
              size="sm"
              bg="rgba(66, 153, 225, 0.1)"
              color="blue.300"
              rounded="none"
              _hover={{ bg: "rgba(66, 153, 225, 0.2)" }}
              border="1px solid rgba(66, 153, 225, 0.3)"
              flexShrink={0}
              onClick={() => onEdit(product.id)}
            >
              <Icon as={LuPencil} mr={2} /> Edit Product
            </Button>

            {/* Delete Button - Kept color */}
            <Button
              size="sm"
              bg="rgba(245, 101, 101, 0.1)"
              color="red.400"
              rounded="none"
              _hover={{ bg: "rgba(245, 101, 101, 0.2)" }}
              border="1px solid rgba(245, 101, 101, 0.3)"
              flexShrink={0}
              onClick={() => onDelete(product.id)}
            >
              <Icon as={LuTrash2} />
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* Main Info Split */}
      <SimpleGrid columns={{ base: 1, lg: 12 }} gap={8} mb={8}>
        <Box gridColumn={{ lg: "span 5" }}>
          <Box
            bg="#0A0A0A"
            rounded="none"
            border="1px solid"
            borderColor="#1A1A1A"
            overflow="hidden"
            mb={4}
            h={{ base: "300px", md: "400px" }}
          >
            {/* Fallback to single image if images array is missing/empty */}
            <Image
              src={product.images?.[activeImageIdx] || product.image}
              alt="Main Product"
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>
          <HStack
            gap={3}
            overflowX="auto"
            pb={2}
            css={{
              "&::-webkit-scrollbar": { height: "4px" },
              "&::-webkit-scrollbar-thumb": {
                background: "#1A1A1A",
                borderRadius: "0px",
              },
            }}
          >
            {product.images?.map((img, idx) => (
              <Box
                key={idx}
                cursor="pointer"
                flexShrink={0}
                w="80px"
                h="80px"
                rounded="none"
                overflow="hidden"
                border="1px solid"
                borderColor={activeImageIdx === idx ? "white" : "#1A1A1A"}
                onClick={() => setActiveImageIdx(idx)}
              >
                <Image
                  src={img}
                  alt={`thumbnail ${idx + 1}`}
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              </Box>
            ))}
          </HStack>
        </Box>

        <Box
          gridColumn={{ lg: "span 7" }}
          bg="#0A0A0A"
          rounded="none"
          border="1px solid"
          borderColor="#1A1A1A"
          p={{ base: 4, md: 6 }}
          h="fit-content"
        >
          <Flex
            justify="space-between"
            align="start"
            direction={{ base: "column", sm: "row" }}
            gap={4}
            mb={4}
          >
            <Box>
              <Text
                color="white"
                fontSize="2xl"
                fontWeight="black"
                mb={2}
                lineHeight="1.2"
              >
                {product.name}
              </Text>
              <Flex wrap="wrap" gap={2}>
                <Badge
                  bg={
                    product.stock > 0
                      ? "rgba(92, 172, 125, 0.1)"
                      : "rgba(229, 62, 62, 0.1)"
                  }
                  color={product.stock > 0 ? "#5cac7d" : "red.400"}
                  border="1px solid"
                  borderColor={product.stock > 0 ? "rgba(92, 172, 125, 0.3)" : "rgba(229, 62, 62, 0.3)"}
                  px={2}
                  py={0.5}
                  rounded="none"
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
                {product.specs?.brand && (
                  <Badge
                    bg="#111111"
                    border="1px solid"
                    borderColor="#1A1A1A"
                    color="gray.400"
                    px={2}
                    py={0.5}
                    rounded="none"
                    textTransform="none"
                  >
                    {product.specs.brand}
                  </Badge>
                )}
              </Flex>
            </Box>
            {/* Kept price color */}
            <Text color="#5cac7d" fontSize="3xl" fontWeight="bold">
              ₦{product.price.toLocaleString()}
            </Text>
          </Flex>
          <Box mb={6}>
            <Text color="gray.300" fontWeight="bold" mb={2}>
              Description
            </Text>
            <Text color="gray.400" fontSize="sm" lineHeight="tall">
              {product.description || "No description provided."}
            </Text>
          </Box>
        </Box>
      </SimpleGrid>

      {/* Inventory Variations Table */}
      <Box
        bg="#0A0A0A"
        rounded="none"
        border="1px solid"
        borderColor="#1A1A1A"
        overflow="hidden"
        w="full"
      >
        <Box p={6} borderBottom="1px solid #1A1A1A">
          <Text color="white" fontWeight="bold" fontSize="lg">
            Inventory & Variations
          </Text>
        </Box>

        {product.variationsData?.length > 0 ? (
          <Box
            overflowX="auto"
            w="full"
            css={{
              "&::-webkit-scrollbar": { height: "6px" },
              "&::-webkit-scrollbar-thumb": {
                background: "#1A1A1A",
                borderRadius: "0px",
              },
            }}
          >
            <Box
              as="table"
              w="full"
              minW="800px"
              textAlign="left"
              style={{ borderCollapse: "collapse" }}
            >
              <Box as="thead" bg="#111111">
                <Box as="tr">
                  {[
                    "Variant",
                    "SKU",
                    "Cost Price",
                    "Sale Price",
                    "Profit",
                    "Stock",
                    "",
                  ].map((head, i) => (
                    <Box
                      as="th"
                      key={i}
                      py={4}
                      px={6}
                      color="gray.500"
                      fontSize="xs"
                      fontWeight="bold"
                      textTransform="uppercase"
                    >
                      {head}
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box as="tbody">
                {product.variationsData.map(
                  (v: ProductVariation, i: number) => {
                    const profit = v.salePrice - v.costPrice;
                    const isLowStock = v.stock > 0 && v.stock < 5;
                    const isOutOfStock = v.stock === 0;

                    return (
                      <Box
                        as="tr"
                        key={i}
                        borderBottom="1px solid #1A1A1A"
                        _hover={{ bg: "#111111" }}
                      >
                        <Box as="td" py={4} px={6}>
                          <Flex align="center" gap={3}>
                            <Box
                              boxSize="16px"
                              rounded="none"
                              bg={v.colorHex || "gray.500"}
                              border="1px solid #333333"
                            />
                            <Box>
                              <Text
                                color="white"
                                fontSize="sm"
                                fontWeight="bold"
                              >
                                {v.size}
                              </Text>
                              <Text color="gray.500" fontSize="xs">
                                {v.color}
                              </Text>
                            </Box>
                          </Flex>
                        </Box>
                        <Box as="td" py={4} px={6}>
                          <Text
                            color="gray.400"
                            fontSize="sm"
                            fontFamily="monospace"
                          >
                            {v.sku}
                          </Text>
                        </Box>
                        <Box as="td" py={4} px={6}>
                          <Text color="gray.400" fontSize="sm">
                            ₦{v.costPrice.toLocaleString()}
                          </Text>
                        </Box>
                        <Box as="td" py={4} px={6}>
                          <Text color="white" fontSize="sm" fontWeight="bold">
                            ₦{v.salePrice.toLocaleString()}
                          </Text>
                        </Box>
                        <Box as="td" py={4} px={6}>
                          {/* Kept profit color */}
                          <Text color="#5cac7d" fontSize="sm" fontWeight="bold">
                            ₦{profit.toLocaleString()}
                          </Text>
                        </Box>
                        <Box as="td" py={4} px={6}>
                          <Badge
                            bg={
                              isOutOfStock
                                ? "rgba(245, 101, 101, 0.1)"
                                : isLowStock
                                  ? "rgba(237, 137, 54, 0.1)"
                                  : "rgba(92, 172, 125, 0.1)"
                            }
                            color={
                              isOutOfStock
                                ? "red.400"
                                : isLowStock
                                  ? "orange.400"
                                  : "#5cac7d"
                            }
                            border="1px solid"
                            borderColor={
                              isOutOfStock
                                ? "rgba(245, 101, 101, 0.3)"
                                : isLowStock
                                  ? "rgba(237, 137, 54, 0.3)"
                                  : "rgba(92, 172, 125, 0.3)"
                            }
                            px={2}
                            py={1}
                            rounded="none"
                          >
                            {v.stock} units
                          </Badge>
                        </Box>
                        <Box as="td" py={4} px={6} textAlign="right">
                          <Button
                            size="sm"
                            variant="ghost"
                            color="gray.400"
                            rounded="none"
                            _hover={{ color: "white", bg: "#333333" }}
                            px={2}
                            onClick={() => onEdit(product.id)}
                          >
                            <Icon as={LuPencil} />
                          </Button>
                        </Box>
                      </Box>
                    );
                  },
                )}
              </Box>
            </Box>
          </Box>
        ) : (
          <Flex
            justify="center"
            align="center"
            py={10}
            color="gray.500"
            fontSize="sm"
            bg="#0A0A0A"
          >
            No specific variations configured for this product.
          </Flex>
        )}
      </Box>

      {/* Custom Restock Modal */}
      {isRestocking && (
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
            bg="blackAlpha.800"
            backdropFilter="blur(4px)"
            onClick={() => setIsRestocking(false)}
          />
          <Box
            position="relative"
            bg="#0A0A0A"
            p={6}
            rounded="none"
            border="1px solid #1A1A1A"
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
                rounded="none"
                _hover={{ bg: "#111111", color: "white" }}
                onClick={() => setIsRestocking(false)}
              >
                <LuX />
              </IconButton>
            </Flex>
            <Text color="gray.400" fontSize="sm" mb={4}>
              Enter the quantity to add to the existing stock for{" "}
              <Text as="span" color="white" fontWeight="bold">
                {product.name}
              </Text>
              .
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
                rounded="none"
                _hover={{ bg: "#111111", color: "white" }}
                onClick={() => setIsRestocking(false)}
              >
                Cancel
              </Button>
              <Button
                bg="white"
                color="black"
                rounded="none"
                _hover={{ bg: "gray.200" }}
                onClick={handleRestockSubmit}
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
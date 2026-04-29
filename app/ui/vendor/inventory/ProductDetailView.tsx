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
  borderColor: "#333333",
  color: "white",
  h: "44px",
  rounded: "none",
  px: 3,
  _focus: { outline: "none", borderColor: "white" },
  _hover: { borderColor: "#555555" },
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
              color="#888888"
              rounded="none"
              _hover={{ color: "white", bg: "#111111" }}
              onClick={onBack}
              px={2}
              h="40px"
              flexShrink={0}
            >
              <Icon as={LuArrowLeft} boxSize="20px" strokeWidth="2.5" />
            </Button>
            <Box overflow="hidden">
              <Text
                color="white"
                fontWeight="bold"
                fontSize={{ base: "lg", md: "xl" }}
                lineClamp={1}
                letterSpacing="tight"
              >
                {product.name}
              </Text>
              <Text color="#888888" fontSize="sm" fontFamily="monospace">
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
            {/* 🚀 Monochrome Buttons with colored icons */}
            <Button
              size="sm"
              h="36px"
              bg="#111111"
              color="white"
              border="1px solid #333333"
              rounded="none"
              _hover={{ bg: "#1A1A1A" }}
              flexShrink={0}
              onClick={() => setIsRestocking(true)}
            >
              <Icon
                as={LuPackagePlus}
                color="#5cac7d"
                mr={2}
                strokeWidth="2.5"
              />{" "}
              Restock
            </Button>
            <Button
              size="sm"
              h="36px"
              bg="#111111"
              color="white"
              border="1px solid #333333"
              rounded="none"
              _hover={{ bg: "#1A1A1A" }}
              flexShrink={0}
              onClick={() => onEdit(product.id)}
            >
              <Icon as={LuPencil} color="blue.400" mr={2} strokeWidth="2.5" />{" "}
              Edit Product
            </Button>
            <Button
              size="sm"
              h="36px"
              bg="#111111"
              color="white"
              border="1px solid #333333"
              rounded="none"
              _hover={{ bg: "#1A1A1A" }}
              flexShrink={0}
              onClick={() => onDelete(product.id)}
            >
              <Icon as={LuTrash2} color="red.400" strokeWidth="2.5" />
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* Main Info Split */}
      <SimpleGrid columns={{ base: 1, lg: 12 }} gap={8} mb={8}>
        <Box gridColumn={{ lg: "span 5" }}>
          <Box
            bg="#111111"
            rounded="none"
            border="1px solid #1A1A1A"
            overflow="hidden"
            mb={4}
            h={{ base: "300px", md: "400px" }}
          >
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
                  opacity={activeImageIdx === idx ? 1 : 0.6}
                  _hover={{ opacity: 1 }}
                  transition="all 0.2s"
                />
              </Box>
            ))}
          </HStack>
        </Box>

        <Box
          gridColumn={{ lg: "span 7" }}
          bg="#0A0A0A"
          rounded="none"
          border="1px solid #1A1A1A"
          p={{ base: 4, md: 6 }}
          h="fit-content"
        >
          <Flex
            justify="space-between"
            align="start"
            direction={{ base: "column", sm: "row" }}
            gap={4}
            mb={6}
          >
            <Box>
              <Text
                color="white"
                fontSize="2xl"
                fontWeight="black"
                mb={2}
                lineHeight="1.2"
                letterSpacing="tight"
              >
                {product.name}
              </Text>
              <Flex wrap="wrap" gap={2}>
                {/* Strict Monochrome Badges */}
                <Badge
                  bg="#111111"
                  color={product.stock > 0 ? "#5cac7d" : "red.400"}
                  border="1px solid #333333"
                  px={2}
                  py={0.5}
                  rounded="none"
                  fontSize="10px"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
                {product.specs?.brand && (
                  <Badge
                    bg="#111111"
                    color="#888888"
                    border="1px solid #333333"
                    px={2}
                    py={0.5}
                    rounded="none"
                    fontSize="10px"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    {product.specs.brand}
                  </Badge>
                )}
              </Flex>
            </Box>
            <Text
              color="white"
              fontSize="3xl"
              fontWeight="black"
              letterSpacing="tight"
            >
              ₦{product.price.toLocaleString()}
            </Text>
          </Flex>
          <Box borderTop="1px solid #1A1A1A" pt={6} mb={6}>
            <Text
              color="#888888"
              fontSize="xs"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wider"
              mb={2}
            >
              Description
            </Text>
            <Text color="#DDDDDD" fontSize="sm" lineHeight="tall">
              {product.description || "No description provided."}
            </Text>
          </Box>
        </Box>
      </SimpleGrid>

      {/* Inventory Variations Table */}
      <Box
        bg="#0A0A0A"
        rounded="none"
        border="1px solid #1A1A1A"
        overflow="hidden"
        w="full"
      >
        <Box p={6} borderBottom="1px solid #1A1A1A">
          <Text
            color="white"
            fontWeight="bold"
            fontSize="lg"
            letterSpacing="tight"
          >
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
                background: "#333333",
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
              <Box as="thead" bg="#111111" borderBottom="1px solid #333333">
                <Box as="tr">
                  {[
                    "Variant",
                    "SKU",
                    "Cost Price",
                    "Sale Price",
                    "Profit",
                    "Stock",
                    "Actions",
                  ].map((head, i) => (
                    <Box
                      as="th"
                      key={i}
                      py={4}
                      px={6}
                      color="#888888"
                      fontSize="xs"
                      fontWeight="bold"
                      textTransform="uppercase"
                      letterSpacing="wider"
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
                              <Text color="#888888" fontSize="xs">
                                {v.color}
                              </Text>
                            </Box>
                          </Flex>
                        </Box>
                        <Box as="td" py={4} px={6}>
                          <Text
                            color="#888888"
                            fontSize="sm"
                            fontFamily="monospace"
                          >
                            {v.sku}
                          </Text>
                        </Box>
                        <Box as="td" py={4} px={6}>
                          <Text color="#888888" fontSize="sm">
                            ₦{v.costPrice.toLocaleString()}
                          </Text>
                        </Box>
                        <Box as="td" py={4} px={6}>
                          <Text color="white" fontSize="sm" fontWeight="bold">
                            ₦{v.salePrice.toLocaleString()}
                          </Text>
                        </Box>
                        <Box as="td" py={4} px={6}>
                          <Text color="white" fontSize="sm" fontWeight="bold">
                            ₦{profit.toLocaleString()}
                          </Text>
                        </Box>
                        <Box as="td" py={4} px={6}>
                          <Badge
                            bg="#111111"
                            color={isOutOfStock ? "red.400" : "white"}
                            border="1px solid #333333"
                            px={2}
                            py={1}
                            rounded="none"
                            fontSize="10px"
                          >
                            {v.stock} units
                          </Badge>
                        </Box>
                        <Box as="td" py={4} px={6} textAlign="right">
                          <Button
                            size="sm"
                            variant="ghost"
                            color="#888888"
                            rounded="none"
                            _hover={{ color: "white", bg: "#1A1A1A" }}
                            px={2}
                            onClick={() => onEdit(product.id)}
                          >
                            <Icon as={LuPencil} strokeWidth="2.5" />
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
            color="#888888"
            fontSize="sm"
            bg="#0A0A0A"
            borderTop="1px dashed #1A1A1A"
          >
            No specific variations configured for this product.
          </Flex>
        )}
      </Box>

      {/* Restock Modal */}
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
            bg="rgba(0,0,0,0.85)"
            backdropFilter="blur(4px)"
            onClick={() => setIsRestocking(false)}
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
                color="#888888"
                rounded="none"
                _hover={{ bg: "#111111", color: "white" }}
                onClick={() => setIsRestocking(false)}
              >
                <LuX strokeWidth="2.5" />
              </IconButton>
            </Flex>
            <Text color="#888888" fontSize="sm" mb={4}>
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
                color="#888888"
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
                fontWeight="bold"
                _hover={{ bg: "#E5E5E5" }}
                border="none"
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

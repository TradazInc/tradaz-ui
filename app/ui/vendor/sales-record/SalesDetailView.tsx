"use client";
import React from "react";

import { Box, Flex, Text, SimpleGrid, Icon, Button } from "@chakra-ui/react";

import {
  LuArrowLeft,
  LuPrinter,
  LuDownload,
  LuReceipt,
  LuCircleCheck,
} from "react-icons/lu";
import { SalesRecord } from "@/app/lib/definitions";

interface SalesDetailViewProps {
  sale: SalesRecord;
  onBack: () => void;
}

export const SalesDetailView = ({ sale, onBack }: SalesDetailViewProps) => {
  const subtotal = sale.total + sale.discount;
  const vat = subtotal * 0.075;

  const referenceId = `TXN-${sale.id.replace(/[^0-9]/g, "") || "99281"}`;

  return (
    <Box
      w="full"
      display="flex"
      flexDirection="column"
      position="relative"
      pb={10}
    >
      {/* Header / Back Button */}
      <Box
        position="sticky"
        top={{ base: "70px", md: "85px" }}
        zIndex={20}
        bg="rgba(0, 0, 0, 0.85)"
        backdropFilter="blur(12px)"
        py={4}
        mb={6}
        borderBottom="1px solid"
        borderColor="#1A1A1A"
      >
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={4}>
            <Button
              variant="ghost"
              color="#888888"
              rounded="none"
              _hover={{ color: "white", bg: "#111111" }}
              onClick={onBack}
              px={2}
              h="40px"
            >
              <Icon as={LuArrowLeft} boxSize="20px" strokeWidth="2.5" />
            </Button>
            <Box>
              <Text color="white" fontWeight="bold" fontSize="xl" letterSpacing="tight">
                Order {sale.id}
              </Text>
              <Text color="#888888" fontSize="sm">
                {sale.date}
              </Text>
            </Box>
          </Flex>
          <Flex gap={2}>
            <Button
              size="sm"
              variant="outline"
              color="white"
              rounded="none"
              borderColor="#333333"
              _hover={{ bg: "#111111" }}
            >
              <Icon as={LuDownload} mr={2} strokeWidth="2.5" /> PDF
            </Button>
            <Button
              size="sm"
              bg="white"
              color="black"
              rounded="none"
              fontWeight="bold"
              _hover={{ bg: "#E5E5E5" }}
              border="none"
            >
              <Icon as={LuPrinter} mr={2} strokeWidth="2.5" /> Print Receipt
            </Button>
          </Flex>
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 1, lg: 12 }} gap={8}>
        {/* Left Column: Receipt Breakdown */}
        <Box gridColumn={{ lg: "span 8" }}>
          <Box
            bg="#0A0A0A"
            rounded="none"
            border="1px solid"
            borderColor="#1A1A1A"
            overflow="hidden"
          >
            <Flex
              align="center"
              gap={3}
              p={6}
              borderBottom="1px solid"
              borderColor="#1A1A1A"
            >
              <Flex bg="#111111" p={2} rounded="none" border="1px solid #333333">
                <Icon as={LuReceipt} color="white" boxSize="20px" strokeWidth="2.5" />
              </Flex>
              <Text color="white" fontWeight="bold" fontSize="lg" letterSpacing="tight">
                Transaction Details
              </Text>
            </Flex>

            {/* Mock Items List */}
            <Box p={6}>
              <Box w="full" mb={6}>
                <Flex
                  justify="space-between"
                  color="#888888"
                  fontSize="xs"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  mb={3}
                >
                  <Text>Item</Text>
                  <Text>Amount</Text>
                </Flex>

                <Flex
                  justify="space-between"
                  align="center"
                  py={3}
                  borderBottom="1px dashed"
                  borderColor="#333333"
                >
                  <Box>
                    <Text color="white" fontSize="sm" fontWeight="bold">
                      Premium Cotton T-Shirt
                    </Text>
                    <Text color="#888888" fontSize="xs">
                      Size: L | Color: Black
                    </Text>
                  </Box>
                  <Text color="white" fontSize="sm" fontWeight="600">
                    ₦{(subtotal * 0.6).toLocaleString()}
                  </Text>
                </Flex>

                <Flex
                  justify="space-between"
                  align="center"
                  py={3}
                  borderBottom="1px dashed"
                  borderColor="#333333"
                >
                  <Box>
                    <Text color="white" fontSize="sm" fontWeight="bold">
                      Classic Denim Jeans
                    </Text>
                    <Text color="#888888" fontSize="xs">
                      Size: 32
                    </Text>
                  </Box>
                  <Text color="white" fontSize="sm" fontWeight="600">
                    ₦{(subtotal * 0.4).toLocaleString()}
                  </Text>
                </Flex>
              </Box>

              {/* Totals Calculation */}
              <Flex
                direction="column"
                gap={3}
                w={{ base: "full", sm: "300px" }}
                ml="auto"
              >
                <Flex justify="space-between">
                  <Text color="#888888" fontSize="sm" fontWeight="500">
                    Subtotal
                  </Text>
                  <Text color="white" fontSize="sm" fontWeight="600">
                    ₦{subtotal.toLocaleString()}
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="#888888" fontSize="sm" fontWeight="500">
                    VAT (7.5%)
                  </Text>
                  <Text color="white" fontSize="sm" fontWeight="600">
                    ₦{vat.toLocaleString()}
                  </Text>
                </Flex>
                {sale.discount > 0 && (
                  <Flex justify="space-between">
                    <Text color="#888888" fontSize="sm" fontWeight="500">
                      Discount Applied
                    </Text>
                    <Text color="white" fontSize="sm" fontWeight="600">
                      - ₦{sale.discount.toLocaleString()}
                    </Text>
                  </Flex>
                )}

                <Box
                  w="full"
                  borderBottom="1px solid"
                  borderColor="#333333"
                  my={1}
                />

                <Flex justify="space-between" align="center">
                  <Text color="white" fontWeight="bold" fontSize="lg" letterSpacing="tight">
                    Total
                  </Text>
                  <Text color="white" fontWeight="black" fontSize="2xl" letterSpacing="tight">
                    ₦{sale.total.toLocaleString()}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Box>

        {/* Right Column: Customer & Payment Info */}
        <Box gridColumn={{ lg: "span 4" }}>
          <Box
            bg="#0A0A0A"
            rounded="none"
            border="1px solid"
            borderColor="#1A1A1A"
            p={6}
            mb={6}
          >
            <Text
              color="#888888"
              fontSize="11px"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wider"
              mb={4}
            >
              Customer Information
            </Text>
            <Text color="white" fontWeight="bold" fontSize="lg" mb={1} letterSpacing="tight">
              {sale.transaction}
            </Text>
            <Text color="#888888" fontSize="sm" fontWeight="500">
              Walk-in Customer
            </Text>
          </Box>

          <Box
            bg="#0A0A0A"
            rounded="none"
            border="1px solid"
            borderColor="#1A1A1A"
            p={6}
          >
            <Text
              color="#888888"
              fontSize="11px"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wider"
              mb={4}
            >
              Payment Details
            </Text>

            <Flex align="center" gap={3} mb={4}>
              <Icon as={LuCircleCheck} color="white" boxSize="24px" strokeWidth="2.5" />
              <Box>
                <Text color="white" fontWeight="bold" fontSize="md" letterSpacing="tight">
                  Payment Successful
                </Text>
                <Text color="#888888" fontSize="xs" fontWeight="500">
                  {sale.date}
                </Text>
              </Box>
            </Flex>

            <Flex
              justify="space-between"
              py={2}
              borderTop="1px solid"
              borderColor="#1A1A1A"
            >
              <Text color="#888888" fontSize="sm" fontWeight="500">
                Channel
              </Text>
              <Text color="white" fontSize="sm" fontWeight="bold">
                {sale.type}
              </Text>
            </Flex>
            <Flex
              justify="space-between"
              py={2}
              borderTop="1px solid"
              borderColor="#1A1A1A"
            >
              <Text color="#888888" fontSize="sm" fontWeight="500">
                Method
              </Text>
              <Text color="white" fontSize="sm" fontWeight="bold">
                {sale.payment}
              </Text>
            </Flex>
            <Flex
              justify="space-between"
              py={2}
              borderTop="1px solid"
              borderColor="#1A1A1A"
            >
              <Text color="#888888" fontSize="sm" fontWeight="500">
                Reference
              </Text>
              <Text color="#888888" fontSize="sm" fontFamily="monospace" fontWeight="600">
                {referenceId}
              </Text>
            </Flex>
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
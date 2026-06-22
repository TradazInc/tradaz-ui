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
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import {
  LuSearch,
  LuRefreshCw,
  LuDownload,
  LuEye,
  LuPlus,
} from "react-icons/lu";
import { ExtendedSalesRecord } from "@/types/definitions";

import { SalesPosModal, NewSalePayload } from "./SalesPosModal";

const controlStyles = {
  bg: "#0A0A0A",
  border: "1px solid",
  borderColor: "#333333",
  color: "white",
  h: "40px",
  rounded: "none",
  px: 3,
  _focus: { outline: "none", borderColor: "white" },
  _hover: { bg: "#111111" },
};

const nativeSelectStyle: React.CSSProperties = {
  backgroundColor: "#0A0A0A",
  color: "white",
  height: "40px",
  borderRadius: "0px",
  padding: "0 12px",
  border: "1px solid #333333",
  outline: "none",
  cursor: "pointer",
  fontSize: "13px",
};

interface SalesGridViewProps {
  visibleItems: ExtendedSalesRecord[]; // <-- FIXED
  processedSalesLength: number;
  searchQuery: string;
  sortBy: string;
  sortOrder: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortBy: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSortOrder: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSelectSale: (sale: ExtendedSalesRecord) => void; // <-- FIXED
  visibleCount: number;
  loaderRef: React.RefObject<HTMLDivElement | null>;
  onAddSale: (saleData: NewSalePayload) => void;
}

export const SalesGridView = ({
  visibleItems,
  processedSalesLength,
  searchQuery,
  sortBy,
  sortOrder,
  handleSearch,
  handleSortBy,
  handleSortOrder,
  onSelectSale,
  visibleCount,
  loaderRef,
  onAddSale,
}: SalesGridViewProps) => {
  const [isAddingSale, setIsAddingSale] = useState(false);

  // Combine sorting states for a single dropdown UI
  const combinedSortValue = `${sortBy}-${sortOrder}`;
  const handleCombinedSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortBy, newSortOrder] = e.target.value.split("-");
    handleSortBy({ target: { value: newSortBy } } as React.ChangeEvent<HTMLSelectElement>);
    handleSortOrder({ target: { value: newSortOrder } } as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <Box w="full" display="flex" flexDirection="column" position="relative">
      
      {/* --- HEADER --- */}
      <Flex
        justify="space-between"
        align={{ base: "center", md: "flex-end" }}
        mb={4}
        wrap="wrap"
        gap={4}
      >
        <Box>
          <Text
            color="white"
            fontWeight="bold"
            fontSize={{ base: "lg", md: "2xl" }}
            letterSpacing="tight"
          >
            Sales & Performance
          </Text>
          <Text color="#888888" fontSize="xs" display={{ base: "none", md: "block" }}>
            View {processedSalesLength} sales transactions and track performance.
          </Text>
        </Box>

        <Flex gap={3} h={{ base: "auto", md: "60px" }} align="center">
          
          {/* Desktop Summary Stats */}
          <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" px={5} py={2} display={{ base: "none", md: "block" }}>
            <Text fontSize="xs" color="#888888" mb={1} fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
              Total Paid Sales
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="white" letterSpacing="tight">
              ₦15,504,834.27
            </Text>
          </Box>
          <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" px={5} py={2} display={{ base: "none", md: "block" }}>
            <Text fontSize="xs" color="#888888" mb={1} fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
              Total Sales
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="white" letterSpacing="tight">
              {processedSalesLength}
            </Text>
          </Box>

          {/* Refresh Button - Hidden on Mobile */}
          <Button
            size="sm"
            variant="ghost"
            color="#888888"
            rounded="none"
            display={{ base: "none", md: "flex" }}
            _hover={{ color: "white", bg: "#111111" }}
          >
            <Icon as={LuRefreshCw} mr={2} strokeWidth="2.5" /> Refresh
          </Button>

          {/* Add Record Button - Adapts to Mobile/Desktop */}
          <Button
            bg="white"
            color="black"
            h={{ base: "36px", md: "full" }}
            rounded="none"
            fontWeight="bold"
            fontSize="sm"
            _hover={{ bg: "#E5E5E5" }}
            border="none"
            px={{ base: 4, md: 6 }}
            onClick={() => setIsAddingSale(true)}
          >
            <Icon as={LuPlus} mr={{ base: 1, md: 2 }} strokeWidth="3" /> 
            <Text display={{ base: "none", md: "inline" }}>Add Record</Text>
            <Text display={{ base: "inline", md: "none" }}>Add</Text>
          </Button>
        </Flex>
      </Flex>

      {/* --- STICKY SEARCH & SORT --- */}
     
      <Box
        position="sticky"
        top={{ base: "-16px", md: "-32px" }}
      
        zIndex={20}
        bg="rgba(0, 0, 0, 0.85)"
        backdropFilter="blur(12px)"
        py={3}
        mb={4}
        borderBottom="1px solid"
        borderColor="#1A1A1A"
        w="full"
      >
        <Flex gap={2} wrap="nowrap" w="full" align="center">
          {/* Search Bar */}
          <Flex flex={1} minW="0" align="center" {...controlStyles}>
            <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
            <Input
              placeholder="Search order or customer..."
              border="none"
              _focus={{ outline: "none", boxShadow: "none" }}
              color="white"
              fontSize="sm"
              value={searchQuery}
              onChange={handleSearch}
              px={0}
              w="full"
            />
          </Flex>

          {/* Combined Sort Dropdown */}
          <Box w={{ base: "140px", sm: "160px", md: "200px" }} flexShrink={0}>
            <select
              value={combinedSortValue}
              onChange={handleCombinedSort}
              style={{ ...nativeSelectStyle, width: "100%" }}
            >
              <option value="date-desc" style={{ background: "#0A0A0A" }}>Newest First</option>
              <option value="date-asc" style={{ background: "#0A0A0A" }}>Oldest First</option>
              <option value="total-desc" style={{ background: "#0A0A0A" }}>Highest Amount</option>
              <option value="total-asc" style={{ background: "#0A0A0A" }}>Lowest Amount</option>
              <option value="discount-desc" style={{ background: "#0A0A0A" }}>Highest Discount</option>
              <option value="discount-asc" style={{ background: "#0A0A0A" }}>Lowest Discount</option>
            </select>
          </Box>
        </Flex>
      </Box>

      {/* --- SALES TABLE --- */}
      {visibleItems.length === 0 ? (
        <Flex justify="center" align="center" py={20} direction="column">
          <Text color="#888888" fontSize="lg" fontWeight="bold">
            No records found.
          </Text>
        </Flex>
      ) : (
        <Box
          bg="#0A0A0A"
          rounded="none"
          border="1px solid"
          borderColor="#1A1A1A"
          mb={8}
          overflowX="auto"
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
            <Box as="thead" bg="#111111" borderBottom="1px solid" borderColor="#333333">
              <Box as="tr">
                {[
                  "Order ID",
                  "Transaction",
                  "Date",
                  "Payment",
                  "Discount",
                  "Total",
                  "Actions",
                ].map((head) => (
                  <Box
                    as="th"
                    key={head}
                    py={4}
                    px={5}
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
              {visibleItems.map((sale: ExtendedSalesRecord, idx: number) => ( // <-- FIXED
                <Box
                  as="tr"
                  key={idx}
                  borderBottom="1px solid"
                  borderColor="#1A1A1A"
                  _hover={{ bg: "#111111" }}
                  transition="background 0.2s"
                >
                  <Box as="td" py={5} px={5}>
                    <Text color="white" fontSize="sm" fontWeight="bold">
                      {sale.id}
                    </Text>
                    <Text fontSize="10px" color="#888888" fontWeight="bold" textTransform="uppercase" mt={0.5} letterSpacing="wider">
                      {sale.type}
                    </Text>
                  </Box>
                  <Box as="td" py={5} px={5}>
                    <Text color="white" fontSize="sm" fontWeight="500">
                      {sale.transaction}
                    </Text>
                  </Box>
                  <Box as="td" py={5} px={5}>
                    <Text color="#888888" fontSize="sm">
                      {sale.date}
                    </Text>
                  </Box>
                  <Box as="td" py={5} px={5}>
                    <Flex
                      align="center"
                      justify="center"
                      px={2}
                      py={1}
                      rounded="none"
                      bg={sale.payment === "Transfer" ? "white" : "#111111"}
                      color={sale.payment === "Transfer" ? "black" : "white"}
                      border={sale.payment === "Transfer" ? "none" : "1px solid #333333"}
                      fontSize="11px"
                      fontWeight="bold"
                      display="inline-flex"
                    >
                      {sale.payment}
                    </Flex>
                  </Box>
                  <Box as="td" py={5} px={5}>
                    <Text color="#888888" fontSize="sm" fontWeight="500">
                      ₦{sale.discount.toLocaleString()}
                    </Text>
                  </Box>
                  <Box as="td" py={5} px={5}>
                    <Text color="white" fontSize="sm" fontWeight="bold">
                      ₦{sale.total.toLocaleString()}
                    </Text>
                  </Box>
                  <Box as="td" py={5} px={5}>
                    <Flex gap={2}>
                      <IconButton
                        aria-label="Download"
                        variant="ghost"
                        size="sm"
                        rounded="none"
                        color="#888888"
                        _hover={{ color: "white", bg: "#1A1A1A" }}
                      >
                        <Icon as={LuDownload} strokeWidth="2.5" />
                      </IconButton>
                      <IconButton
                        aria-label="View"
                        onClick={() => onSelectSale(sale)}
                        variant="ghost"
                        size="sm"
                        rounded="none"
                        color="#888888"
                        _hover={{ color: "white", bg: "#1A1A1A" }}
                      >
                        <Icon as={LuEye} strokeWidth="2.5" />
                      </IconButton>
                    </Flex>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          {visibleCount < processedSalesLength && (
            <Flex ref={loaderRef} justify="center" align="center" py={8} h="80px">
              <Spinner color="white" size="md" />
            </Flex>
          )}
        </Box>
      )}

      {/* --- BOTTOM SUMMARY BOX --- */}
      <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#333333" p={6} mb={8}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
          <Box borderRight={{ lg: "1px solid" }} borderColor="#1A1A1A" pr={{ lg: 4 }}>
            <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={3}>
              Overview
            </Text>
            <Flex justify="space-between" mb={2}>
              <Text fontSize="sm" color="#888888">Transactions</Text>
              <Text fontSize="sm" color="white" fontWeight="bold">111</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontSize="sm" color="#888888">Items Sold</Text>
              <Text fontSize="sm" color="white" fontWeight="bold">203</Text>
            </Flex>
          </Box>
          <Box borderRight={{ lg: "1px solid" }} borderColor="#1A1A1A" pr={{ lg: 4 }}>
            <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={3}>
              Payment Breakdown
            </Text>
            <Flex justify="space-between" mb={2}>
              <Text fontSize="sm" color="#888888">Bank Transfer</Text>
              <Text fontSize="sm" color="white" fontWeight="bold">74</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontSize="sm" color="#888888">Credit Card</Text>
              <Text fontSize="sm" color="white" fontWeight="bold">35</Text>
            </Flex>
          </Box>
          <Box borderRight={{ lg: "1px solid" }} borderColor="#1A1A1A" pr={{ lg: 4 }}>
            <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={3}>
              Discounts Applied
            </Text>
            <Flex justify="space-between" mb={2}>
              <Text fontSize="sm" color="#888888">Average Disc.</Text>
              <Text fontSize="sm" color="white" fontWeight="bold">20.98%</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fontSize="sm" color="#888888">Total Disc. Value</Text>
              <Text fontSize="sm" color="white" fontWeight="bold">₦976,652</Text>
            </Flex>
          </Box>
          <Box>
            <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={3}>
              Net Financials
            </Text>
            <Flex justify="space-between" mb={2}>
              <Text fontSize="sm" color="#888888">Total VAT</Text>
              <Text fontSize="sm" color="white" fontWeight="bold">₦1,017,283.28</Text>
            </Flex>
            <Flex justify="space-between" mt={3} pt={3} borderTop="1px solid" borderColor="#333333">
              <Text fontSize="sm" color="white" fontWeight="bold">Net Revenue</Text>
              <Text fontSize="md" color="white" fontWeight="black" letterSpacing="tight">₦15,504,834</Text>
            </Flex>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Mount the Modular POS Component here */}
      <SalesPosModal
        isOpen={isAddingSale}
        onClose={() => setIsAddingSale(false)}
        onAddSale={onAddSale}
      />
    </Box>
  );
};
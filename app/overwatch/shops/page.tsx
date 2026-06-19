"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Flex,
  Text,
  Input,
  Icon,
  VStack,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import { LuSearch, LuEllipsisVertical } from "react-icons/lu";

import { useActiveBusiness } from "@/app/entities/business/hooks";
import { useTeamList } from "@/app/entities/stores/hooks";


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
  fontSize: "14px",
};


export default function AdminShopsPage() {
  const router = useRouter();

  // ---- Active business ----
  const activeOrgAtom = useActiveBusiness() as unknown as {
    data?: { id: string; name: string } | null;
  };
  const activeBusiness = activeOrgAtom.data;

 const { data: teamsData } = useTeamList(activeBusiness?.id);
const teamsArray = useMemo(() => Array.isArray(teamsData) ? teamsData : [], [teamsData]);

  // ---- Local state ----
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "date-asc" | "date-desc">("name-asc");

  // ---- Derived sorted/filtered list ----
  const processedShops = useMemo(() => {
    let result = [...teamsArray];

    // search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (shop) =>
          shop.name.toLowerCase().includes(q) ||
          shop.address.toLowerCase().includes(q),
      );
    }

    // sort
    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "date-asc":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case "date-desc":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
    }

    return result;
  }, [teamsArray, searchQuery, sortBy]);

  return (
    <Box
      p={{ base: 4, lg: 8 }}
      maxW="1300px"
      mx="auto"
      bg="#000000"
      minH="100vh"
    >
      {/* Header */}
      <Box mb={8}>
        <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">
          Shops
        </Text>
        <Text color="#888888" fontSize="sm">
          {activeBusiness
            ? `Stores under ${activeBusiness.name}`
            : "Select a business to view its stores"}
        </Text>
      </Box>

      
      <Flex gap={3} mb={6} direction={{ base: "column", md: "row" }}>
        {/* Search */}
        <Flex
          flex={1}
          align="center"
          bg="#0A0A0A"
          border="1px solid #333"
          rounded="none"
          px={4}
          h="44px"
          _focusWithin={{ borderColor: "white" }}
        >
          <Icon as={LuSearch} color="#888888" strokeWidth="2.5" />
          <Input
            placeholder="Search by name or address..."
            border="none"
            color="white"
            h="full"
            px={2}
            _focus={{ boxShadow: "none", outline: "none" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Flex>

    
        <Box w={{ base: "full", md: "200px" }}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            style={nativeSelectStyle}
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="date-asc">Oldest first</option>
            <option value="date-desc">Newest first</option>
          </select>
        </Box>
      </Flex>

      {/* Shops list */}
      {teamsArray.length === 0 ? (
        <Flex
          justify="center"
          align="center"
          py={20}
          bg="#0A0A0A"
          border="1px dashed #1A1A1A"
        >
          <Text color="#888888">No stores found for this business.</Text>
        </Flex>
      ) : (
        <VStack align="stretch" gap={3}>
          {processedShops.map((shop) => (
            <Flex
              key={shop.id}
              bg="#0A0A0A"
              border="1px solid #1A1A1A"
              p={4}
              align="center"
              justify="space-between"
              _hover={{ bg: "#111111", borderColor: "#333333" }}
              cursor="pointer"
              onClick={() => router.push(`/admin/shops/${shop.id}`)}
            >
              <Flex align="center" gap={4}>
                <Avatar.Root size="md" rounded="full">
                  <Avatar.Fallback
                    name={shop.name}
                    bg="#111111"
                    border="1px solid #333"
                    color="white"
                    fontWeight="bold"
                  />
                </Avatar.Root>
                <Box>
                  <Text color="white" fontWeight="bold" fontSize="sm">
                    {shop.name}
                  </Text>
                  <Text color="#888888" fontSize="xs">
                    {shop.address}
                  </Text>
                </Box>
              </Flex>
              <IconButton
                aria-label="Manage"
                variant="ghost"
                size="sm"
                color="#888888"
                _hover={{ color: "white", bg: "#1A1A1A" }}
                onClick={(e) => {
                  e.stopPropagation();
                
                }}
              >
                <Icon as={LuEllipsisVertical} strokeWidth="2.5" />
              </IconButton>
            </Flex>
          ))}
        </VStack>
      )}
    </Box>
  );
}
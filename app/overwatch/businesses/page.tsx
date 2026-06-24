"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Flex,
  Text,
  Input,
  Icon,
  Grid,
  VStack,
  Avatar,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { LuSearch, LuEllipsisVertical, LuX } from "react-icons/lu";

import { useBusinessList, useBusinessActions } from "@/hooks/useBusiness";
import { toaster } from "@/components/ui/toaster";

interface OrgData {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  createdAt: Date;
}

// Manage Business Drawer
const ManageBusinessDrawer = ({
  business,
  onClose,
  onUpdate,
}: {
  business: OrgData | null;
  onClose: () => void;
  onUpdate: (id: string, data: { name?: string; slug?: string }) => void;
}) => {
  const [name, setName] = useState(business?.name ?? "");
  const [slug, setSlug] = useState(business?.slug ?? "");
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (business) {
      setName(business.name);
      setSlug(business.slug);
    }
  }, [business]);

  if (!business) return null;

  const handleSave = async () => {
    setIsSaving(true);
    await onUpdate(business.id, { name, slug });
    setIsSaving(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {business && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10000,
              backgroundColor: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(4px)",
            }}
            onClick={onClose}
          />
          <Box
            position="fixed"
            top={0}
            right={0}
            bottom={0}
            zIndex={10001}
            w={{ base: "100%", sm: "400px", md: "450px" }}
            pointerEvents="none"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
            >
              <Box
                w="100%"
                h="100%"
                bg="#0A0A0A"
                borderLeft="1px solid"
                borderColor="#1A1A1A"
                shadow="-20px 0 50px rgba(0,0,0,0.9)"
                display="flex"
                flexDirection="column"
              >
                <Flex
                  justify="space-between"
                  align="center"
                  px={6}
                  pt={8}
                  pb={6}
                  borderBottom="1px solid"
                  borderColor="#1A1A1A"
                  bg="#111111"
                >
                  <Box>
                    <Text
                      fontSize="10px"
                      fontWeight="bold"
                      letterSpacing="wider"
                      color="#888888"
                      textTransform="uppercase"
                      mb={1}
                    >
                      Manage Business
                    </Text>
                    <Text
                      fontSize="xl"
                      fontWeight="black"
                      color="white"
                      letterSpacing="tight"
                    >
                      {business.name}
                    </Text>
                  </Box>
                  <IconButton
                    aria-label="Close"
                    variant="ghost"
                    size="sm"
                    rounded="none"
                    onClick={onClose}
                    color="#888888"
                    _hover={{ bg: "#1A1A1A", color: "white" }}
                  >
                    <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                  </IconButton>
                </Flex>

                <Box
                  flex={1}
                  overflowY="auto"
                  px={6}
                  py={8}
                  css={{ "&::-webkit-scrollbar": { display: "none" } }}
                >
                  <VStack w="full" gap={6} align="stretch">
                    <Box>
                      <Text
                        color="#888888"
                        fontSize="10px"
                        fontWeight="bold"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        mb={2}
                      >
                        Business Name
                      </Text>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        bg="#111111"
                        border="1px solid #333"
                        color="white"
                        h="44px"
                        rounded="none"
                        _focus={{ borderColor: "white" }}
                      />
                    </Box>
                    <Box>
                      <Text
                        color="#888888"
                        fontSize="10px"
                        fontWeight="bold"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        mb={2}
                      >
                        Slug
                      </Text>
                      <Input
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        bg="#111111"
                        border="1px solid #333"
                        color="white"
                        h="44px"
                        rounded="none"
                        _focus={{ borderColor: "white" }}
                      />
                    </Box>
                  </VStack>
                </Box>

                <Flex
                  p={6}
                  borderTop="1px solid"
                  borderColor="#1A1A1A"
                  gap={3}
                  bg="#111111"
                >
                  <Button
                    variant="outline"
                    borderColor="#333333"
                    onClick={onClose}
                    h="44px"
                    rounded="none"
                    color="#888888"
                    bg="#0A0A0A"
                    _hover={{ bg: "#1A1A1A", color: "white" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    flex="1"
                    h="44px"
                    bg="white"
                    color="black"
                    rounded="none"
                    fontWeight="bold"
                    onClick={handleSave}
                    loading={isSaving}
                    loadingText="Saving..."
                    _hover={{ bg: "#E5E5E5" }}
                  >
                    Save Changes
                  </Button>
                </Flex>
              </Box>
            </motion.div>
          </Box>
        </>
      )}
    </AnimatePresence>
  );
};

// Main Page
export default function AdminBusinessesPage() {
  const router = useRouter();

  // Real business
  const orgsAtom = useBusinessList() as unknown as { data?: OrgData[] };
  const organizations = useMemo(() => orgsAtom.data ?? [], [orgsAtom.data]);

  const { update } = useBusinessActions();

  // ---- State ----
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "name-asc" | "name-desc" | "date-asc" | "date-desc"
  >("name-asc");
  const [selectedBusiness, setSelectedBusiness] = useState<OrgData | null>(
    null,
  );

  // ---- Derived data ----
  const filteredBusinesses = useMemo(() => {
    let result = [...organizations];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q),
      );
    }

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
  }, [organizations, searchQuery, sortBy]);

  // ---- Handlers ----
  const handleUpdateBusiness = async (
    id: string,
    data: { name?: string; slug?: string },
  ) => {
    try {
      await update.mutateAsync({
        organizationId: id,
        data: {
          name: data.name,
          slug: data.slug,
        },
      });
      toaster.create({ title: "Business updated", type: "success" });
    } catch {
      toaster.create({ title: "Update failed", type: "error" });
    }
  };

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
        <Text
          fontSize="3xl"
          fontWeight="black"
          color="white"
          letterSpacing="tight"
        >
          Businesses
        </Text>
        <Text color="#888888" fontSize="sm">
          Manage your business accounts and settings.
        </Text>
      </Box>

      {/* Search + Sort toolbar */}
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
            placeholder="Search by business name or slug..."
            border="none"
            color="white"
            h="full"
            px={2}
            _focus={{ boxShadow: "none", outline: "none" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Flex>

        {/* Single Sort button */}
        <Box w={{ base: "full", md: "200px" }}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            style={{
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
            }}
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="date-asc">Oldest first</option>
            <option value="date-desc">Newest first</option>
          </select>
        </Box>
      </Flex>

      {/* Business list */}
      {filteredBusinesses.length === 0 ? (
        <Flex
          justify="center"
          align="center"
          py={20}
          bg="#0A0A0A"
          border="1px dashed #1A1A1A"
        >
          <Text color="#888888">No businesses found.</Text>
        </Flex>
      ) : (
        <VStack align="stretch" gap={3}>
          {/* Desktop header */}
          <Grid
            templateColumns="2fr 1fr 1fr 80px"
            gap={4}
            px={6}
            py={2}
            display={{ base: "none", md: "grid" }}
          >
            <Text
              color="#888888"
              fontSize="10px"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Business
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
              Created
            </Text>
            <Text></Text>
          </Grid>

          {filteredBusinesses.map((biz) => (
            <Grid
              key={biz.id}
              templateColumns={{ base: "1fr", md: "2fr 1fr 1fr 80px" }}
              gap={4}
              p={4}
              bg="#0A0A0A"
              rounded="none"
              border="1px solid"
              borderColor="#1A1A1A"
              alignItems="center"
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ bg: "#111111", borderColor: "#333333" }}
              onClick={() => router.push(`/admin/businesses/${biz.id}`)}
            >
              {/* Name  logo */}
              <Flex align="center" gap={4}>
                <Avatar.Root size="md" rounded="full">
                  <Avatar.Fallback
                    name={biz.name}
                    bg="#111111"
                    border="1px solid #333333"
                    color="white"
                    rounded="full"
                    fontWeight="bold"
                  />
                </Avatar.Root>
                <Box overflow="hidden">
                  <Text
                    color="white"
                    fontWeight="bold"
                    fontSize="sm"
                    lineClamp={1}
                    letterSpacing="tight"
                  >
                    {biz.name}
                  </Text>
                  <Text
                    color="#888888"
                    fontSize="xs"
                    fontFamily="monospace"
                    mt={0.5}
                  >
                    ID: {biz.id}
                  </Text>
                </Box>
              </Flex>

              {/* Slug */}
              <Text
                color="#888888"
                fontSize="sm"
                display={{ base: "none", md: "block" }}
              >
                /{biz.slug}
              </Text>

              {/* Created date */}
              <Text
                color="#888888"
                fontSize="sm"
                display={{ base: "none", md: "block" }}
              >
                {new Date(biz.createdAt).toLocaleDateString()}
              </Text>

              {/* Actions */}
              <Flex justify="flex-end">
                <IconButton
                  aria-label="Manage Business"
                  variant="ghost"
                  size="sm"
                  color="#888888"
                  _hover={{ color: "white", bg: "#1A1A1A" }}
                  rounded="none"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBusiness(biz);
                  }}
                >
                  <Icon as={LuEllipsisVertical} strokeWidth="2.5" />
                </IconButton>
              </Flex>
            </Grid>
          ))}
        </VStack>
      )}

      {/* Manage drawer */}
      <ManageBusinessDrawer
        business={selectedBusiness}
        onClose={() => setSelectedBusiness(null)}
        onUpdate={handleUpdateBusiness}
      />
    </Box>
  );
}

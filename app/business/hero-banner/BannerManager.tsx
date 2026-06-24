"use client";
import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  Button,
  HStack,
  VStack,
  SimpleGrid,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuLayoutTemplate,
  LuPlus,
  LuType,
  LuLink,
  LuPower,
  LuPowerOff,
  LuSquare,
  LuTrash2,
  LuMonitorSmartphone,
  LuX,
} from "react-icons/lu";

import { generateDummyBanners } from "@/data/data";
import { PromoBanner } from "@/types/definitions";

// --- REUSABLE STYLES ---
const inputStyles = {
  bg: "#000000",
  border: "1px solid",
  borderColor: "#333333",
  color: "white",
  h: "44px",
  rounded: "none",
  px: 4,
  _focus: { outline: "none", borderColor: "white", boxShadow: "none" },
  _hover: { borderColor: "#555555" },
};
const nativeSelectStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#000000",
  color: "white",
  height: "44px",
  borderRadius: "0px",
  padding: "0 16px",
  border: "1px solid #333333",
  outline: "none",
  cursor: "pointer",
  fontSize: "14px",
};
const colorPickerStyle: React.CSSProperties = {
  width: "100%",
  height: "44px",
  padding: "2px",
  backgroundColor: "#000000",
  border: "1px solid #333333",
  cursor: "pointer",
};
const labelStyles = {
  color: "#888888",
  fontSize: "10px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  letterSpacing: "wider",
  mb: 2,
  display: "block",
};

// --- CREATE / EDIT BANNER MODAL ---
interface CreateBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (banner: PromoBanner) => void;
  editData?: PromoBanner | null;
}

const CreateBannerModal = ({
  isOpen,
  onClose,
  onSave,
  editData,
}: CreateBannerModalProps) => {
  const defaultData = {
    name: "",
    position: "Top Announcement Bar",
    message: "",
    ctaText: "",
    ctaLink: "/",
    bgColor: "#5cac7d",
    textColor: "#ffffff",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(
    editData ? { ...editData } : defaultData,
  );

  const [prevEditData, setPrevEditData] = useState(editData);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  // Modern React Pattern: Adjust state during render when props change
  if (editData !== prevEditData || isOpen !== prevIsOpen) {
    setPrevEditData(editData);
    setPrevIsOpen(isOpen);

    if (editData) {
      setFormData({
        name: editData.name,
        position: editData.position || "Top Announcement Bar",
        message: editData.message,
        ctaText: editData.ctaText,
        ctaLink: editData.ctaLink,
        bgColor: editData.bgColor,
        textColor: editData.textColor,
      });
    } else {
      setFormData(defaultData);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      const banner: PromoBanner = {
        // If editing, keep the same ID and Status. If new, generate ID and set to Draft.
        id: editData
          ? editData.id
          : `BNR-${Math.floor(Math.random() * 90000) + 10000}`,
        name: formData.name,
        position: formData.position as PromoBanner["position"],
        message: formData.message,
        ctaText: formData.ctaText,
        ctaLink: formData.ctaLink,
        bgColor: formData.bgColor,
        textColor: formData.textColor,
        status: editData ? editData.status : "Draft",
      };
      onSave(banner);
      setIsLoading(false);
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
                      Visual Builder
                    </Text>
                    <Text
                      fontSize="xl"
                      fontWeight="black"
                      color="white"
                      letterSpacing="tight"
                    >
                      {editData ? "Edit Banner" : "Create Banner"}
                    </Text>
                  </Box>
                  <IconButton
                    aria-label="Close modal"
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
                      <Text as="label" {...labelStyles}>
                        Banner Name{" "}
                        <Text as="span" color="red.400">
                          *
                        </Text>
                      </Text>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Free Shipping Top Bar"
                        {...inputStyles}
                      />
                    </Box>

                    <Box>
                      <Text as="label" {...labelStyles}>
                        Placement Position
                      </Text>
                      <select
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        style={nativeSelectStyle}
                      >
                        <option
                          value="Top Announcement Bar"
                          style={{ background: "#000000" }}
                        >
                          Top Announcement Bar
                        </option>
                        <option
                          value="Checkout Warning"
                          style={{ background: "#000000" }}
                        >
                          Checkout Warning
                        </option>
                      </select>
                    </Box>

                    <Box>
                      <Text as="label" {...labelStyles}>
                        Message Text{" "}
                        <Text as="span" color="red.400">
                          *
                        </Text>
                      </Text>
                      <Input
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="e.g. Free shipping on orders over ₦50k!"
                        {...inputStyles}
                      />
                    </Box>

                    <SimpleGrid columns={2} gap={4}>
                      <Box>
                        <Text as="label" {...labelStyles}>
                          Button Text
                        </Text>
                        <Input
                          name="ctaText"
                          value={formData.ctaText}
                          onChange={handleChange}
                          placeholder="e.g. Shop Now"
                          {...inputStyles}
                        />
                      </Box>
                      <Box>
                        <Text as="label" {...labelStyles}>
                          Button Link
                        </Text>
                        <Input
                          name="ctaLink"
                          value={formData.ctaLink}
                          onChange={handleChange}
                          placeholder="e.g. /shop"
                          {...inputStyles}
                        />
                      </Box>
                    </SimpleGrid>

                    <SimpleGrid
                      columns={2}
                      gap={4}
                      pt={4}
                      borderTop="1px dashed"
                      borderColor="#1A1A1A"
                    >
                      <Box>
                        <Text as="label" {...labelStyles}>
                          Background Color
                        </Text>
                        <input
                          type="color"
                          name="bgColor"
                          value={formData.bgColor}
                          onChange={handleChange}
                          style={colorPickerStyle}
                        />
                      </Box>
                      <Box>
                        <Text as="label" {...labelStyles}>
                          Text Color
                        </Text>
                        <input
                          type="color"
                          name="textColor"
                          value={formData.textColor}
                          onChange={handleChange}
                          style={colorPickerStyle}
                        />
                      </Box>
                    </SimpleGrid>
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
                    disabled={!formData.name || !formData.message}
                    _hover={{ bg: "#E5E5E5" }}
                    _disabled={{
                      opacity: 0.5,
                      cursor: "not-allowed",
                      bg: "#333333",
                      color: "#888888",
                    }}
                    transition="all 0.2s ease"
                  >
                    {isLoading
                      ? "Saving..."
                      : editData
                        ? "Update Banner"
                        : "Create Banner"}
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

// --- MAIN BANNER MANAGER ---
export const BannerManager = () => {
  const [banners, setBanners] = useState<PromoBanner[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedBanners = localStorage.getItem("tradaz_banners");
        if (savedBanners) return JSON.parse(savedBanners);
      } catch (error) {
        console.error("Failed to load banners:", error);
      }
    }
    return generateDummyBanners() as PromoBanner[];
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<PromoBanner | null>(null); // State for editing

  // --- ACTIONS WITH LOCAL STORAGE SYNC ---
  const toggleStatus = (id: string, currentStatus: string) => {
    const updated = banners.map(
      (banner): PromoBanner =>
        banner.id === id
          ? ({
              ...banner,
              status: currentStatus === "Active" ? "Draft" : "Active",
            } as PromoBanner)
          : banner,
    );
    setBanners(updated);
    localStorage.setItem("tradaz_banners", JSON.stringify(updated));
  };

  const deleteBanner = (id: string) => {
    const updated = banners.filter((b) => b.id !== id);
    setBanners(updated);
    localStorage.setItem("tradaz_banners", JSON.stringify(updated));
  };

  const handleSaveBanner = (savedBanner: PromoBanner) => {
    let updated;
    if (editingBanner) {
      // Update existing banner
      updated = banners.map((b) => (b.id === savedBanner.id ? savedBanner : b));
    } else {
      // Add new banner
      updated = [savedBanner, ...banners];
    }
    setBanners(updated);
    localStorage.setItem("tradaz_banners", JSON.stringify(updated));
    setEditingBanner(null);
  };

  const openEditModal = (banner: PromoBanner) => {
    setEditingBanner(banner);
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setEditingBanner(null);
  };

  // --- STATS ---
  const activeCount = banners.filter((b) => b.status === "Active").length;
  const topBarActive = banners.some(
    (b) => b.position === "Top Announcement Bar" && b.status === "Active",
  );

  return (
    <Box
      w="full"
      display="flex"
      flexDirection="column"
      position="relative"
      bg="#000000"
    >
      {/* --- Sticky Header --- */}
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
      >
        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          wrap="wrap"
          gap={4}
        >
          <Box>
            <Text
              color="white"
              fontWeight="bold"
              fontSize="2xl"
              mb={1}
              display="flex"
              alignItems="center"
              gap={2}
              letterSpacing="tight"
            >
              <Icon as={LuLayoutTemplate} color="#5cac7d" strokeWidth="2.5" />{" "}
              Promo Banners
            </Text>
            <Text color="#888888" fontSize="sm">
              Manage announcement bars and checkout warnings.
            </Text>
          </Box>

          <Button
            onClick={() => {
              setEditingBanner(null);
              setIsCreateModalOpen(true);
            }}
            bg="white"
            color="black"
            _hover={{ bg: "#E5E5E5" }}
            h="44px"
            px={6}
            rounded="none"
            fontWeight="bold"
            border="none"
          >
            <Icon as={LuPlus} mr={2} strokeWidth="2.5" /> Create Banner
          </Button>
        </Flex>
      </Box>

      {/* --- STATS --- */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={8}>
        <Box
          bg="#0A0A0A"
          p={5}
          rounded="none"
          border="1px solid"
          borderColor="#1A1A1A"
        >
          <Text
            color="#5cac7d"
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
            mb={2}
          >
            Active Banners
          </Text>
          <Text
            color="white"
            fontSize="3xl"
            fontWeight="black"
            letterSpacing="tight"
          >
            {activeCount}
          </Text>
        </Box>
        <Box
          bg="#0A0A0A"
          p={5}
          rounded="none"
          border="1px solid"
          borderColor="#1A1A1A"
        >
          <Text
            color={topBarActive ? "blue.400" : "#888888"}
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
            mb={2}
          >
            Top Bar Status
          </Text>
          <Flex align="center" gap={2}>
            <Box
              boxSize="8px"
              rounded="full"
              bg={topBarActive ? "blue.400" : "gray.500"}
            />
            <Text
              color="white"
              fontSize="2xl"
              fontWeight="black"
              letterSpacing="tight"
            >
              {topBarActive ? "Currently Displaying" : "Empty / Hidden"}
            </Text>
          </Flex>
        </Box>
      </SimpleGrid>

      {/* --- BANNERS LIST --- */}
      <VStack gap={4} align="stretch" mb={8}>
        {banners.length === 0 ? (
          <Flex
            justify="center"
            py={12}
            color="#888888"
            bg="#0A0A0A"
            rounded="none"
            border="1px dashed"
            borderColor="#1A1A1A"
            fontWeight="bold"
          >
            No banners created yet. Add one to announce your next big sale!
          </Flex>
        ) : (
          banners.map((banner) => {
            const isActive = banner.status === "Active";
            const isDraft = banner.status === "Draft";

            return (
              <Box
                key={banner.id}
                bg="#0A0A0A"
                rounded="none"
                border="1px solid"
                borderColor={isActive ? "rgba(92, 172, 125, 0.3)" : "#1A1A1A"}
                p={{ base: 4, md: 6 }}
                transition="all 0.2s"
                opacity={isDraft ? 0.6 : 1}
                _hover={{ bg: "#111111" }}
              >
                <Flex
                  direction={{ base: "column", xl: "row" }}
                  justify="space-between"
                  align={{ base: "flex-start", xl: "center" }}
                  gap={6}
                >
                  {/* Left: Banner Info */}
                  <VStack align="start" flex={1} gap={2} minW="200px">
                    <HStack gap={3}>
                      <Flex
                        align="center"
                        justify="center"
                        bg="#111111"
                        p={3}
                        rounded="none"
                        border="1px solid #333333"
                      >
                        <Icon
                          as={LuMonitorSmartphone}
                          color={isActive ? "white" : "#888888"}
                          boxSize="20px"
                          strokeWidth="2.5"
                        />
                      </Flex>
                      <Box>
                        <Text
                          color="white"
                          fontWeight="bold"
                          fontSize="xl"
                          letterSpacing="tight"
                        >
                          {banner.name}
                        </Text>
                        <Text
                          color="#888888"
                          fontSize="xs"
                          fontWeight="bold"
                          textTransform="uppercase"
                          letterSpacing="wider"
                          mt={1}
                        >
                          {banner.position}
                        </Text>
                      </Box>
                    </HStack>

                    <Flex align="center" mt={2}>
                      <Flex
                        align="center"
                        px={2}
                        py={1}
                        rounded="none"
                        border="1px solid"
                        borderColor={
                          isActive ? "rgba(92, 172, 125, 0.3)" : "#333333"
                        }
                        bg={isActive ? "rgba(92, 172, 125, 0.1)" : "#111111"}
                      >
                        <Box
                          boxSize="6px"
                          rounded="none"
                          mr={2}
                          bg={isActive ? "#5cac7d" : "gray.500"}
                        />
                        <Text
                          color={isActive ? "#5cac7d" : "gray.500"}
                          fontSize="10px"
                          fontWeight="bold"
                          textTransform="uppercase"
                          letterSpacing="wider"
                        >
                          {banner.status}
                        </Text>
                      </Flex>
                    </Flex>
                  </VStack>

                  {/* Middle: Live Visual Preview */}
                  <VStack
                    align="start"
                    flex={2}
                    w="full"
                    gap={3}
                    bg="#111111"
                    p={4}
                    rounded="none"
                    border="1px solid"
                    borderColor="#1A1A1A"
                  >
                    <Text
                      color="#888888"
                      fontSize="10px"
                      fontWeight="bold"
                      textTransform="uppercase"
                      letterSpacing="wider"
                    >
                      Live Preview
                    </Text>

                    {/* THE ACTUAL MINI-BANNER PREVIEW */}
                    <Flex
                      w="full"
                      p={3}
                      rounded="none"
                      justify="center"
                      align="center"
                      gap={4}
                      bg={banner.bgColor}
                      color={banner.textColor}
                      boxShadow="inset 0 0 10px rgba(0,0,0,0.1)"
                      direction={{ base: "column", md: "row" }}
                      textAlign="center"
                    >
                      <Flex align="center" gap={2}>
                        <Icon
                          as={LuType}
                          boxSize="14px"
                          strokeWidth="2.5"
                          opacity={0.7}
                        />
                        <Text fontSize="sm" fontWeight="bold">
                          {banner.message}
                        </Text>
                      </Flex>
                      {banner.ctaText && (
                        <Button
                          size="xs"
                          bg={banner.textColor}
                          color={banner.bgColor}
                          _hover={{ opacity: 0.8 }}
                          rounded="none"
                          px={4}
                          fontWeight="black"
                          textTransform="uppercase"
                          letterSpacing="wider"
                        >
                          {banner.ctaText}
                        </Button>
                      )}
                    </Flex>

                    <Flex align="center" gap={1.5} color="#888888" mt={1}>
                      <Icon as={LuLink} boxSize="12px" strokeWidth="2.5" />
                      <Text fontSize="xs" fontWeight="bold">
                        Links to: {banner.ctaLink}
                      </Text>
                    </Flex>
                  </VStack>

                  {/* Right: Actions */}
                  <Flex
                    direction="column"
                    gap={2}
                    minW="140px"
                    justify="flex-end"
                    w={{ base: "full", xl: "auto" }}
                  >
                    <Button
                      size="sm"
                      h="36px"
                      onClick={() => openEditModal(banner)}
                      variant="outline"
                      borderColor="#333333"
                      color="white"
                      _hover={{ bg: "#111111" }}
                      rounded="none"
                      justifyContent="flex-start"
                    >
                      <Icon as={LuSquare} mr={2} strokeWidth="2.5" /> Edit
                      Banner
                    </Button>
                    <Button
                      size="sm"
                      h="36px"
                      onClick={() => toggleStatus(banner.id, banner.status)}
                      variant="outline"
                      borderColor="#333333"
                      color={isActive ? "orange.400" : "#5cac7d"}
                      _hover={{ bg: "#111111" }}
                      rounded="none"
                      justifyContent="flex-start"
                    >
                      <Icon
                        as={isActive ? LuPowerOff : LuPower}
                        mr={2}
                        strokeWidth="2.5"
                      />{" "}
                      {isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Box
                      w="full"
                      h="1px"
                      bg="#1A1A1A"
                      my={1}
                      display={{ base: "none", xl: "block" }}
                    />
                    <Button
                      size="sm"
                      h="36px"
                      onClick={() => deleteBanner(banner.id)}
                      variant="ghost"
                      color="red.400"
                      _hover={{ bg: "red.900", color: "white" }}
                      rounded="none"
                      justifyContent="flex-start"
                    >
                      <Icon as={LuTrash2} mr={2} strokeWidth="2.5" /> Delete
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            );
          })
        )}
      </VStack>

      {/* --- MOUNT MODAL --- */}
      <CreateBannerModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveBanner}
        editData={editingBanner}
      />
    </Box>
  );
};

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
  LuAppWindow,
  LuPlus,
  LuMail,
  LuMegaphone,
  LuMousePointerClick,
  LuPower,
  LuPowerOff,
  LuEye,
  LuTarget,
  LuSquare,
  LuTrash2,
  LuSearch,
  LuX,
} from "react-icons/lu";
import { inputStyles, nativeSelectStyle, labelStyles } from "@/app/style";

import { generateDummyPopups } from "@/data/data";
import { PopupCampaign } from "@/data/types";

interface CreatePopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (popup: PopupCampaign) => void;
}

const CreatePopupModal = ({
  isOpen,
  onClose,
  onSave,
}: CreatePopupModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "Email Capture",
    trigger: "Time Delay (5s)",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newPopup: PopupCampaign = {
        id: `POP-${Math.floor(Math.random() * 90000) + 10000}`,
        name: formData.name,
        type: formData.type as PopupCampaign["type"],
        trigger: formData.trigger,
        views: 0,
        conversions: 0,
        status: "Paused",
      };
      onSave(newPopup);
      setIsLoading(false);
      setFormData({
        name: "",
        type: "Email Capture",
        trigger: "Time Delay (5s)",
      });
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
                      Conversion Tools
                    </Text>
                    <Text
                      fontSize="xl"
                      fontWeight="black"
                      color="white"
                      letterSpacing="tight"
                    >
                      Create Pop-up
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
                        Pop-up Name{" "}
                        <Text as="span" color="red.400">
                          *
                        </Text>
                      </Text>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Black Friday Newsletter Capture"
                        {...inputStyles}
                      />
                      <Text
                        color="#555555"
                        fontSize="10px"
                        mt={1.5}
                        fontFamily="monospace"
                      >
                        Internal name to track performance.
                      </Text>
                    </Box>

                    <Box>
                      <Text as="label" {...labelStyles}>
                        Pop-up Type
                      </Text>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        style={nativeSelectStyle}
                      >
                        <option
                          value="Email Capture"
                          style={{ background: "#000000" }}
                        >
                          Email Capture
                        </option>
                        <option
                          value="Announcement"
                          style={{ background: "#000000" }}
                        >
                          Announcement
                        </option>
                        <option
                          value="Discount Offer"
                          style={{ background: "#000000" }}
                        >
                          Discount Offer
                        </option>
                        <option
                          value="Exit Intent"
                          style={{ background: "#000000" }}
                        >
                          Exit Intent (Dont Leave!)
                        </option>
                      </select>
                    </Box>

                    <Box>
                      <Text as="label" {...labelStyles}>
                        Display Trigger
                      </Text>
                      <select
                        name="trigger"
                        value={formData.trigger}
                        onChange={handleChange}
                        style={nativeSelectStyle}
                      >
                        <option
                          value="Time Delay (5s)"
                          style={{ background: "#000000" }}
                        >
                          After 5 seconds on page
                        </option>
                        <option
                          value="Time Delay (10s)"
                          style={{ background: "#000000" }}
                        >
                          After 10 seconds on page
                        </option>
                        <option
                          value="Exit Intent"
                          style={{ background: "#000000" }}
                        >
                          When user attempts to leave
                        </option>
                        <option
                          value="Scroll Depth (50%)"
                          style={{ background: "#000000" }}
                        >
                          After scrolling halfway down
                        </option>
                      </select>
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
                    disabled={!formData.name}
                    _hover={{ bg: "#E5E5E5" }}
                    _disabled={{
                      opacity: 0.5,
                      cursor: "not-allowed",
                      bg: "#333333",
                      color: "#888888",
                    }}
                    transition="all 0.2s ease"
                  >
                    {isLoading ? "Saving..." : "Create Pop-up"}
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

// --- MAIN POPUP MANAGER ---
export const PopupManager = () => {
  const [popups, setPopups] = useState<PopupCampaign[]>(generateDummyPopups());
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // --- ACTIONS ---
  const toggleStatus = (id: string, currentStatus: string) => {
    setPopups((prev) =>
      prev.map((popup) =>
        popup.id === id
          ? {
              ...popup,
              status: currentStatus === "Active" ? "Paused" : "Active",
            }
          : popup,
      ),
    );
  };

  const deletePopup = (id: string) => {
    setPopups((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCreatePopup = (newPopup: PopupCampaign) => {
    setPopups((prev) => [newPopup, ...prev]);
  };

  // --- FILTERING ---
  const filteredPopups = popups.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.type.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // --- STATS ---
  const activeCount = popups.filter((p) => p.status === "Active").length;
  const totalViews = popups.reduce((acc, curr) => acc + curr.views, 0);
  const totalConversions = popups.reduce(
    (acc, curr) => acc + curr.conversions,
    0,
  );
  const avgConversionRate =
    totalViews > 0 ? ((totalConversions / totalViews) * 100).toFixed(1) : "0.0";

  const getIconForType = (type: string) => {
    switch (type) {
      case "Email Capture":
        return LuMail;
      case "Announcement":
        return LuMegaphone;
      case "Discount Offer":
        return LuAppWindow;
      case "Exit Intent":
        return LuMousePointerClick;
      default:
        return LuAppWindow;
    }
  };

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
              <Icon as={LuAppWindow} color="#5cac7d" strokeWidth="2.5" />{" "}
              Website Pop-ups
            </Text>
            <Text color="#888888" fontSize="sm">
              Capture leads, announce sales, and reduce cart abandonment.
            </Text>
          </Box>

          <Button
            onClick={() => setIsCreateModalOpen(true)}
            bg="white"
            color="black"
            _hover={{ bg: "#E5E5E5" }}
            h="44px"
            px={6}
            rounded="none"
            fontWeight="bold"
            border="none"
          >
            <Icon as={LuPlus} mr={2} strokeWidth="2.5" /> Create Pop-up
          </Button>
        </Flex>
      </Box>

      {/* --- STATS GRID --- */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={6}>
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
            Active Pop-ups
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
            color="#888888"
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
            mb={2}
          >
            Total Views
          </Text>
          <Text
            color="white"
            fontSize="3xl"
            fontWeight="black"
            letterSpacing="tight"
          >
            {totalViews.toLocaleString()}
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
            color="orange.400"
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
            mb={2}
          >
            Avg Conversion Rate
          </Text>
          <Text
            color="orange.400"
            fontSize="3xl"
            fontWeight="black"
            letterSpacing="tight"
          >
            {avgConversionRate}%
          </Text>
        </Box>
      </SimpleGrid>

      {/* --- UTILITY TOOLBAR (Search isolated here) --- */}
      <Flex mb={6} w="full">
        <Flex
          align="center"
          bg="#0A0A0A"
          border="1px solid"
          borderColor="#333333"
          rounded="none"
          px={4}
          h="44px"
          w={{ base: "full", md: "350px" }}
          _focusWithin={{ borderColor: "white" }}
        >
          <Icon as={LuSearch} color="#888888" strokeWidth="2.5" />
          <Input
            placeholder="Search pop-ups..."
            border="none"
            _focus={{ outline: "none", boxShadow: "none" }}
            color="white"
            h="full"
            ml={2}
            px={0}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Flex>
      </Flex>

      {/* --- POP-UPS LIST --- */}
      <VStack gap={4} align="stretch" mb={8}>
        {filteredPopups.length === 0 ? (
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
            No pop-ups found. Build one to capture more leads!
          </Flex>
        ) : (
          filteredPopups.map((popup) => {
            const isActive = popup.status === "Active";
            const PopupIcon = getIconForType(popup.type);
            const conversionRate =
              popup.views > 0
                ? ((popup.conversions / popup.views) * 100).toFixed(1)
                : "0.0";

            return (
              <Box
                key={popup.id}
                bg="#0A0A0A"
                rounded="none"
                border="1px solid"
                borderColor={isActive ? "rgba(92, 172, 125, 0.3)" : "#1A1A1A"}
                p={{ base: 4, md: 6 }}
                transition="all 0.2s"
                opacity={!isActive ? 0.6 : 1}
                _hover={{ bg: "#111111" }}
              >
                <Flex
                  direction={{ base: "column", md: "row" }}
                  justify="space-between"
                  align={{ base: "flex-start", md: "center" }}
                  gap={6}
                >
                  {/* Left: Pop-up Details */}
                  <VStack align="start" flex={1} gap={2}>
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
                          as={PopupIcon}
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
                          {popup.name}
                        </Text>
                        <Text color="#888888" fontSize="xs" mt={1}>
                          {popup.type} • Trigger: {popup.trigger}
                        </Text>
                      </Box>
                    </HStack>

                    <Flex align="center" mt={2}>
                      <Flex
                        align="center"
                        px={2}
                        py={1}
                        rounded="none"
                        bg={isActive ? "rgba(92, 172, 125, 0.1)" : "#111111"}
                        border="1px solid"
                        borderColor={
                          isActive ? "rgba(92, 172, 125, 0.3)" : "#333333"
                        }
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
                          {popup.status}
                        </Text>
                      </Flex>
                    </Flex>
                  </VStack>

                  {/* Middle: Performance Metrics */}
                  <VStack
                    align="start"
                    flex={1}
                    w="full"
                    minW={{ md: "250px" }}
                    maxW={{ md: "400px" }}
                    gap={3}
                    bg="#111111"
                    p={4}
                    rounded="none"
                    border="1px solid"
                    borderColor="#1A1A1A"
                  >
                    <Flex justify="space-between" w="full" align="center">
                      <VStack align="start" gap={1}>
                        <Flex align="center" gap={1.5} color="#888888">
                          <Icon as={LuEye} boxSize="14px" strokeWidth="2.5" />
                          <Text
                            fontSize="10px"
                            fontWeight="bold"
                            textTransform="uppercase"
                            letterSpacing="wider"
                          >
                            Views
                          </Text>
                        </Flex>
                        <Text color="white" fontSize="md" fontWeight="bold">
                          {popup.views.toLocaleString()}
                        </Text>
                      </VStack>

                      <Box h="30px" w="1px" bg="#1A1A1A" />

                      <VStack align="start" gap={1}>
                        <Flex align="center" gap={1.5} color="#888888">
                          <Icon
                            as={LuTarget}
                            boxSize="14px"
                            strokeWidth="2.5"
                          />
                          <Text
                            fontSize="10px"
                            fontWeight="bold"
                            textTransform="uppercase"
                            letterSpacing="wider"
                          >
                            Clicks/Emails
                          </Text>
                        </Flex>
                        <Text color="white" fontSize="md" fontWeight="bold">
                          {popup.conversions.toLocaleString()}
                        </Text>
                      </VStack>

                      <Box h="30px" w="1px" bg="#1A1A1A" />

                      <VStack align="end" gap={1}>
                        <Text
                          color="#888888"
                          fontSize="10px"
                          fontWeight="bold"
                          textTransform="uppercase"
                          letterSpacing="wider"
                        >
                          Conv. Rate
                        </Text>
                        <Text
                          color={
                            parseFloat(conversionRate) > 5
                              ? "#5cac7d"
                              : "orange.400"
                          }
                          fontSize="md"
                          fontWeight="black"
                        >
                          {conversionRate}%
                        </Text>
                      </VStack>
                    </Flex>
                  </VStack>

                  {/* Right: Actions */}
                  <Flex
                    direction="column"
                    gap={2}
                    minW="140px"
                    justify="flex-end"
                    w={{ base: "full", md: "auto" }}
                  >
                    <Button
                      size="sm"
                      h="36px"
                      variant="outline"
                      borderColor="#333333"
                      color="white"
                      _hover={{ bg: "#111111" }}
                      rounded="none"
                      justifyContent="flex-start"
                    >
                      <Icon as={LuSquare} mr={2} strokeWidth="2.5" /> Edit
                      Design
                    </Button>
                    <Button
                      size="sm"
                      h="36px"
                      onClick={() => toggleStatus(popup.id, popup.status)}
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
                      {isActive ? "Pause" : "Activate"}
                    </Button>
                    <Box
                      w="full"
                      h="1px"
                      bg="#1A1A1A"
                      my={1}
                      display={{ base: "none", md: "block" }}
                    />
                    <Button
                      size="sm"
                      h="36px"
                      onClick={() => deletePopup(popup.id)}
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
      <CreatePopupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreatePopup}
      />
    </Box>
  );
};

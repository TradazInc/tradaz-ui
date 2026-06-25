"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Flex,
  Box,
  Input,
  IconButton,
  Icon,
  Text,
  Badge,
  Avatar,
} from "@chakra-ui/react";
import {
  LuSearch,
  LuBell,
  LuMenu,
  LuShoppingCart,
  LuCircleCheck,
  LuFilter,
  LuPackage,
} from "react-icons/lu";
import Link from "next/link";
import { HeaderProps } from "@/data/types";

import { CustomerSidebar } from "@/app/store/navigation/CustomerSidebar";

export const Header = ({
  brandColor = "#5cac7d",
  storeName = "TRADAZ.",
}: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // --- DROPDOWN STATES ---
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);

  // --- CART STATE ---
  const [cartCount, setCartCount] = useState(0);

  // --- DATA STATES ---
  const [mobileSortValue, setMobileSortValue] = useState("relevant");
  const categories = [
    "Categories",
    "Foot Wears",
    "Sport Wears",
    "Accessories",
    "Bags",
  ];

  const sortOptions = [
    { value: "relevant", label: "Most Relevant" },
    { value: "newest", label: "Newest Arrivals" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
  ];

  // --- DYNAMIC CART LISTENER ---
  useEffect(() => {
    // Function to calculate total items from local storage
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("tradaz_cart") || "[]");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const totalItems = cart.reduce(
          (sum: number, item: any) => sum + (item.quantity || 1),
          0,
        );
        setCartCount(totalItems);
      } catch (error) {
        console.error("Failed to parse cart data", error);
      }
    };

    // Run on mount to get initial cart count
    updateCartCount();

    // Listen for the custom event dispatched when "Add to Cart" is clicked
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <Flex
      as="header"
      h="70px"
      bg="#121212"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
      align="center"
      justify="space-between"
      px={{ base: 4, lg: 8 }}
      position="sticky"
      top={0}
      zIndex={90}
      shadow="sm"
      w="full"
    >
      {/* Mobile Logo */}
      <Flex align="center" display={{ base: "flex", lg: "none" }}>
        <Link href="/store" style={{ textDecoration: "none" }}>
          <Flex
            align="center"
            gap={2}
            cursor="pointer"
            transition="all 0.2s"
            _hover={{ opacity: 0.8 }}
          >
            <Avatar.Root size="sm">
              <Avatar.Fallback
                name={storeName}
                bg={brandColor}
                color="white"
                fontWeight="bold"
              />
            </Avatar.Root>
            <Text
              fontSize="lg"
              fontWeight="black"
              color="white"
              letterSpacing="tight"
            >
              {storeName}
            </Text>
          </Flex>
        </Link>
      </Flex>

      {/* Desktop Logo & Categories */}
      <Flex
        flex={1}
        display={{ base: "none", lg: "flex" }}
        align="center"
        gap={8}
      >
        <Link href="/store" style={{ textDecoration: "none" }}>
          <Flex
            align="center"
            gap={3}
            cursor="pointer"
            transition="all 0.2s"
            _hover={{ opacity: 0.8 }}
          >
            <Avatar.Root size="md">
              <Avatar.Fallback
                name={storeName}
                bg={brandColor}
                color="white"
                fontWeight="bold"
              />
            </Avatar.Root>
            <Text
              fontSize="xl"
              fontWeight="black"
              color="white"
              letterSpacing="tight"
            >
              {storeName}
            </Text>
          </Flex>
        </Link>

        {/* Desktop Search Bar */}
        <Flex
          flex={1}
          maxW="600px"
          bg="#1A1C23"
          border="1px solid"
          borderColor="whiteAlpha.200"
          rounded="full"
          overflow="hidden"
          align="center"
          _focusWithin={{ borderColor: brandColor }}
          transition="all 0.2s"
        >
          <Box
            as="select"
            bg="whiteAlpha.50"
            h="40px"
            px={4}
            border="none"
            borderRight="1px solid"
            borderColor="whiteAlpha.200"
            fontSize="sm"
            color="white"
            outline="none"
            cursor="pointer"
            _hover={{ bg: "whiteAlpha.100" }}
          >
            {categories.map((cat, i) => (
              <option
                key={i}
                value={cat}
                style={{ background: "#1A1C23", color: "white" }}
              >
                {cat}
              </option>
            ))}
          </Box>

          <Flex align="center" px={3} flex={1}>
            <Icon as={LuSearch} color="gray.400" />
            <Input
              placeholder="Search products, brands, or SKUs..."
              border="none"
              bg="transparent"
              h="40px"
              px={3}
              w="full"
              color="white"
              _focus={{ outline: "none", boxShadow: "none" }}
              fontSize="sm"
              _placeholder={{ color: "gray.500" }}
            />
          </Flex>
        </Flex>
      </Flex>

      {/* Mobile Search Bar & Modern Filter Dropdown */}
      <Flex flex={1} mx={4} display={{ base: "flex", lg: "none" }} gap={2}>
        <Flex
          flex={1}
          bg="#1A1C23"
          border="1px solid"
          borderColor="whiteAlpha.200"
          rounded="full"
          overflow="hidden"
          align="center"
          px={3}
          h="40px"
          _focusWithin={{ borderColor: brandColor }}
          transition="all 0.2s"
        >
          <Icon as={LuSearch} color="gray.400" boxSize="16px" />
          <Input
            placeholder="Search..."
            border="none"
            bg="transparent"
            h="full"
            px={2}
            w="full"
            color="white"
            _focus={{ outline: "none", boxShadow: "none" }}
            fontSize="sm"
            _placeholder={{ color: "gray.500" }}
          />
        </Flex>

        <Box position="relative">
          <IconButton
            aria-label="Sort and Filter"
            h="40px"
            w="40px"
            rounded="full"
            bg={isMobileSortOpen ? "whiteAlpha.100" : "#1A1C23"}
            border="1px solid"
            borderColor={isMobileSortOpen ? "whiteAlpha.400" : "whiteAlpha.200"}
            color={isMobileSortOpen ? "white" : "gray.400"}
            _hover={{ bg: "whiteAlpha.100", color: "white" }}
            onClick={() => {
              setIsMobileSortOpen(!isMobileSortOpen);
              setIsNotifOpen(false);
              setIsNavOpen(false);
            }}
          >
            <Icon as={LuFilter} boxSize="16px" />
          </IconButton>

          {/* Modern Mobile Sort Dropdown Overlay */}
          {isMobileSortOpen && (
            <>
              <Box
                position="fixed"
                inset={0}
                zIndex={99}
                onClick={() => setIsMobileSortOpen(false)}
              />
              <Box
                position="absolute"
                right={0}
                top="100%"
                mt={2}
                bg="#1A1C23"
                shadow="2xl"
                rounded="xl"
                border="1px solid"
                borderColor="whiteAlpha.100"
                minW="220px"
                py={2}
                zIndex={100}
                animation="fade-in 0.2s ease"
              >
                <Box
                  px={4}
                  py={2}
                  mb={1}
                  borderBottom="1px solid"
                  borderColor="whiteAlpha.100"
                >
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color="gray.400"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Sort Products By
                  </Text>
                </Box>
                <Flex direction="column" gap={0.5}>
                  {sortOptions.map((option) => (
                    <Flex
                      key={option.value}
                      align="center"
                      justify="space-between"
                      px={4}
                      py={2.5}
                      cursor="pointer"
                      transition="all 0.2s"
                      bg={
                        mobileSortValue === option.value
                          ? "whiteAlpha.50"
                          : "transparent"
                      }
                      _hover={{ bg: "whiteAlpha.100" }}
                      onClick={() => {
                        setMobileSortValue(option.value);
                        setIsMobileSortOpen(false);
                      }}
                    >
                      <Text
                        fontSize="sm"
                        color={
                          mobileSortValue === option.value
                            ? brandColor
                            : "white"
                        }
                        fontWeight={
                          mobileSortValue === option.value ? "bold" : "medium"
                        }
                      >
                        {option.label}
                      </Text>
                      {mobileSortValue === option.value && (
                        <Icon
                          as={LuCircleCheck}
                          color={brandColor}
                          boxSize="16px"
                        />
                      )}
                    </Flex>
                  ))}
                </Flex>
              </Box>
            </>
          )}
        </Box>
      </Flex>

      {/* Right Side Actions */}
      <Flex align="center" gap={{ base: 2, md: 4 }}>
        {/* Cart */}
        <Box position="relative" display={{ base: "none", lg: "block" }}>
          <Flex
            as="button"
            onClick={() => router.push("/store/cart")}
            align="center"
            justify="center"
            boxSize="40px"
            rounded="full"
            color="gray.400"
            _hover={{ bg: "whiteAlpha.100", color: "white" }}
            transition="all 0.2s"
            cursor="pointer"
            border="none"
            bg="transparent"
            outline="none"
            position="relative"
            zIndex={10}
          >
            <Icon as={LuShoppingCart} boxSize="20px" pointerEvents="none" />
          </Flex>
          {cartCount > 0 && (
            <Badge
              position="absolute"
              top="0px"
              right="0px"
              zIndex={11}
              bg={brandColor}
              color="white"
              rounded="full"
              minW="18px"
              h="18px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="10px"
              fontWeight="bold"
              border="2px solid #121212"
              pointerEvents="none"
            >
              {cartCount}
            </Badge>
          )}
        </Box>

        {/* Notifications */}
        <Box position="relative" display={{ base: "none", lg: "block" }}>
          <Flex
            as="button"
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsNavOpen(false);
              setIsMobileSortOpen(false);
            }}
            align="center"
            justify="center"
            boxSize="40px"
            rounded="full"
            color="gray.400"
            _hover={{ bg: "whiteAlpha.100", color: "white" }}
            transition="all 0.2s"
            cursor="pointer"
            border="none"
            bg="transparent"
            outline="none"
            position="relative"
            zIndex={10}
          >
            <Icon as={LuBell} boxSize="20px" pointerEvents="none" />
          </Flex>
          <Badge
            position="absolute"
            top="0px"
            right="0px"
            zIndex={11}
            bg="red.500"
            color="white"
            rounded="full"
            minW="18px"
            h="18px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="10px"
            fontWeight="bold"
            border="2px solid #121212"
            pointerEvents="none"
          >
            5
          </Badge>

          {/* Notification Dropdown Panel */}
          {isNotifOpen && (
            <>
              <Box
                position="fixed"
                inset={0}
                zIndex={99}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsNotifOpen(false);
                }}
                cursor="default"
              />
              <Box
                position="absolute"
                right={0}
                top="100%"
                mt={2}
                bg="white"
                shadow="xl"
                rounded="xl"
                border="1px solid"
                borderColor="gray.100"
                minW="320px"
                py={2}
                zIndex={100}
                cursor="default"
                onClick={(e) => e.stopPropagation()}
              >
                <Box
                  px={4}
                  py={3}
                  borderBottom="1px solid"
                  borderColor="gray.100"
                >
                  <Text fontSize="sm" fontWeight="bold" color="gray.900">
                    Notifications
                  </Text>
                </Box>

                <Flex direction="column" maxH="300px" overflowY="auto">
                  <Flex
                    align="start"
                    gap={3}
                    px={4}
                    py={3}
                    _hover={{ bg: "gray.50" }}
                    cursor="pointer"
                    borderBottom="1px solid"
                    borderColor="gray.50"
                  >
                    <Flex
                      bg="rgba(92, 172, 125, 0.15)"
                      p={2}
                      rounded="full"
                      color={brandColor}
                      flexShrink={0}
                    >
                      <Icon as={LuPackage} />
                    </Flex>
                    <Box>
                      <Text fontSize="sm" fontWeight="bold" color="gray.800">
                        New Order Placed
                      </Text>
                      <Text fontSize="xs" color="gray.600" mt={0.5}>
                        Order #1024 has been placed successfully.
                      </Text>
                      <Text fontSize="xs" color="gray.400" mt={1}>
                        2 mins ago
                      </Text>
                    </Box>
                  </Flex>

                  <Flex
                    align="start"
                    gap={3}
                    px={4}
                    py={3}
                    _hover={{ bg: "gray.50" }}
                    cursor="pointer"
                  >
                    <Flex
                      bg="rgba(66, 153, 225, 0.15)"
                      p={2}
                      rounded="full"
                      color="blue.500"
                      flexShrink={0}
                    >
                      <Icon as={LuCircleCheck} />
                    </Flex>
                    <Box>
                      <Text fontSize="sm" fontWeight="bold" color="gray.800">
                        Payment Verified
                      </Text>
                      <Text fontSize="xs" color="gray.600" mt={0.5}>
                        Payment for Order #1023 was verified.
                      </Text>
                      <Text fontSize="xs" color="gray.400" mt={1}>
                        1 hour ago
                      </Text>
                    </Box>
                  </Flex>
                </Flex>

                <Box
                  px={4}
                  pt={3}
                  pb={1}
                  borderTop="1px solid"
                  borderColor="gray.100"
                  textAlign="center"
                >
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color={brandColor}
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                  >
                    View all notifications
                  </Text>
                </Box>
              </Box>
            </>
          )}
        </Box>

        {/* Profile Avatar */}
        <Box position="relative">
          <Flex
            align="center"
            gap={2}
            p={1}
            rounded="full"
            _hover={{ bg: "whiteAlpha.50" }}
            transition="all 0.2s"
            cursor="pointer"
            onClick={() => {
              setIsNavOpen(false);
              setIsNotifOpen(false);
              setIsMobileSortOpen(false);
            }}
          >
            <Flex
              justify="center"
              align="center"
              boxSize="32px"
              bg={brandColor}
              color="white"
              rounded="full"
              fontWeight="bold"
              fontSize="sm"
            >
              <Avatar.Root size="sm">
                <Avatar.Fallback
                  name="Wada Gift"
                  bg={brandColor}
                  color="white"
                />
                <Avatar.Image src="https://bit.ly/sage-adebayo" />
              </Avatar.Root>
            </Flex>
          </Flex>
        </Box>

        {/* Desktop Navigation Dropdown */}
        <Box position="relative" display={{ base: "none", lg: "block" }}>
          <IconButton
            aria-label="Store Menu"
            variant="ghost"
            color="gray.400"
            rounded="full"
            _hover={{ bg: "whiteAlpha.100", color: "white" }}
            onClick={() => {
              setIsNavOpen(!isNavOpen);
              setIsNotifOpen(false);
              setIsMobileSortOpen(false);
            }}
          >
            <Icon as={LuMenu} boxSize="22px" />
          </IconButton>

          {isNavOpen && (
            <>
              <Box
                position="fixed"
                inset={0}
                zIndex={99}
                onClick={() => setIsNavOpen(false)}
              />

              <Box
                position="absolute"
                right={0}
                top="100%"
                mt={3}
                bg="#1A1C23"
                shadow="2xl"
                rounded="xl"
                border="1px solid"
                borderColor="whiteAlpha.100"
                minW="260px"
                overflow="hidden"
                zIndex={100}
                animation="fade-in 0.2s ease"
              >
                <Box
                  maxH="calc(100vh - 100px)"
                  overflowY="auto"
                  css={{ "&::-webkit-scrollbar": { display: "none" } }}
                >
                  <CustomerSidebar
                    activePath={pathname || ""}
                    brandColor={brandColor}
                    storeName={storeName}
                  />
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

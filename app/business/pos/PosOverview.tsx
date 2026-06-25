"use client";

import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  Input,
  IconButton,
  VStack,
  SimpleGrid,
  Spinner,
  Badge,
  Separator,
  Image,
  Drawer,
  Portal,
} from "@chakra-ui/react";
import {
  LuSearch,
  LuScanLine,
  LuTrash2,
  LuMinus,
  LuPlus,
  LuUser,
  LuArrowRight,
  LuTag,
  LuArrowLeft,
  LuCheck,
  LuPrinter,
  LuTrophy,
  LuX,
  LuWifi,
  LuShoppingCart,
} from "react-icons/lu";

import { DashboardCard } from "@/app/components/DashboardCard";
import { ActionButton } from "@/app/components/ActionButton";
import { initialPosCart } from "@/data/data";
import { inputStyles } from "@/app/style";

interface GatewayCardProps {
  brand: string;
  bgGradient: string;
  logoSrc: string;
  isSelected: boolean;
  onClick: () => void;
}

const GatewayCard = ({
  brand,
  bgGradient,
  logoSrc,
  isSelected,
  onClick,
}: GatewayCardProps) => (
  <Box
    position="relative"
    w="full"
    h="120px"
    rounded="none"
    p={3}
    cursor="pointer"
    bgImage={bgGradient}
    shadow={isSelected ? "0 8px 20px rgba(0,0,0,0.4)" : "none"}
    transform={isSelected ? "scale(1.02)" : "scale(1)"}
    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    border={isSelected ? "2px solid white" : "2px solid transparent"}
    onClick={onClick}
    overflow="hidden"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
  >
    <Box
      position="absolute"
      top="-30px"
      right="-30px"
      boxSize="100px"
      rounded="full"
      bg="whiteAlpha.200"
      filter="blur(20px)"
    />
    <Flex
      justify="space-between"
      align="flex-start"
      position="relative"
      zIndex={2}
    >
      <Image
        src={logoSrc}
        alt={brand}
        h="16px"
        objectFit="contain"
        filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.4))"
      />
      <Icon
        as={LuWifi}
        transform="rotate(90deg)"
        boxSize="16px"
        color="white"
        opacity={0.8}
      />
    </Flex>
    <Box position="relative" zIndex={2}>
      <Box
        w="28px"
        h="20px"
        rounded="sm"
        mb={1.5}
        bgImage="linear-gradient(135deg, #e6c875 0%, #b38b22 100%)"
        border="1px solid rgba(255,255,255,0.3)"
        shadow="inner"
      />
      <Text
        fontFamily="monospace"
        fontSize="sm"
        letterSpacing="0.1em"
        color="white"
        textShadow="0px 1px 2px rgba(0,0,0,0.6)"
      >
        •••• {brand === "Moniepoint" ? "8821" : "4092"}
      </Text>
    </Box>
    <Flex
      justify="space-between"
      align="flex-end"
      position="relative"
      zIndex={2}
    >
      <Text
        fontWeight="bold"
        fontSize="10px"
        color="white"
        letterSpacing="wider"
        textTransform="uppercase"
        textShadow="0px 1px 2px rgba(0,0,0,0.6)"
      >
        {brand}
      </Text>
      <Text
        fontSize="xs"
        fontWeight="black"
        fontStyle="italic"
        color="whiteAlpha.900"
        letterSpacing="tighter"
      >
        POS
      </Text>
    </Flex>
    <Flex
      position="absolute"
      inset={0}
      bg="rgba(0,0,0,0.4)"
      align="center"
      justify="center"
      zIndex={10}
      borderRadius="inherit"
      opacity={isSelected ? 1 : 0}
      pointerEvents={isSelected ? "auto" : "none"}
      transition="opacity 0.2s ease-in-out"
    >
      <Flex
        boxSize="40px"
        bg="white"
        rounded="full"
        align="center"
        justify="center"
        shadow="xl"
      >
        <Icon as={LuCheck} color="black" boxSize="20px" strokeWidth="3" />
      </Flex>
    </Flex>
  </Box>
);

export const PosOverview = () => {
  const [cart, setCart] = useState(initialPosCart);
  const [searchQuery, setSearchQuery] = useState("");

  // Mobile Drawer State
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Checkout Flow State
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [activeCoupon, setActiveCoupon] = useState("");
  const [pointsBalance, setPointsBalance] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("moniepoint");

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const vat = subtotal * 0.075;
  const couponDiscount = activeCoupon === "TRADAZ10" ? subtotal * 0.1 : 0;
  const loyaltyDiscount = pointsBalance ? 5000 : 0;
  const total = Math.max(0, subtotal + vat - couponDiscount - loyaltyDiscount);

  // Actions
  const handleScan = () => {
    if (!searchQuery.trim()) return;
    alert(`Simulating scan: ${searchQuery}`);
    setSearchQuery("");
  };
  const updateQty = (id: string, delta: number) =>
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: Math.max(1, Math.min(item.qty + delta, item.stock)),
            }
          : item,
      ),
    );
  const removeItem = (id: string) =>
    setCart(cart.filter((item) => item.id !== id));
  const clearCart = () => {
    setCart([]);
    resetCheckout();
  };
  const pauseSale = () => {
    alert("Sale paused.");
    clearCart();
    setIsMobileDrawerOpen(false);
  };

  const handleCheckCustomer = () => {
    if (customerInfo.trim()) setPointsBalance(15000);
  };
  const applyCoupon = () => setActiveCoupon(couponInput);
  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep(3);
    }, 1500);
  };

  const resetCheckout = () => {
    setCheckoutStep(0);
    setCustomerInfo("");
    setCouponInput("");
    setActiveCoupon("");
    setPointsBalance(null);
    setPaymentMethod("moniepoint");
  };
  const startNewSale = () => {
    setCart([]);
    resetCheckout();
    setIsMobileDrawerOpen(false);
  };

  const CheckoutSidebarUI = (
    <DashboardCard
      p={0}
      display="flex"
      flexDirection="column"
      h="full"
      maskPosition="bottom right"
      border={{ base: "none", xl: "1px solid #1A1A1A" }} // No border when inside mobile drawer
      rounded={{ base: "none", xl: "lg" }}
    >
      {/* HEADER */}
      <Flex
        align="center"
        justify="space-between"
        p={6}
        borderBottom="1px solid #1A1A1A"
        bg="#0A0A0A"
        position="relative"
        zIndex={2}
      >
        <Flex align="center" gap={3}>
          {checkoutStep > 0 && checkoutStep < 3 && (
            <IconButton
              aria-label="Back"
              variant="ghost"
              color="white"
              size="sm"
              rounded="md"
              onClick={() => setCheckoutStep((prev) => prev - 1)}
              _hover={{ bg: "#111111" }}
            >
              <Icon as={LuArrowLeft} boxSize="20px" />
            </IconButton>
          )}
          <Text color="white" fontWeight="bold" fontSize="xl">
            {checkoutStep === 0
              ? "Sale Summary"
              : checkoutStep === 1
                ? "Customer & Discounts"
                : checkoutStep === 2
                  ? "Payment"
                  : "Sale Complete"}
          </Text>
        </Flex>
        <Flex gap={2}>
          {/* Mobile Only: Close Drawer Button */}
          <IconButton
            display={{ base: "flex", xl: "none" }}
            aria-label="Close Drawer"
            variant="ghost"
            color="white"
            size="sm"
            rounded="md"
            onClick={() => setIsMobileDrawerOpen(false)}
            _hover={{ bg: "#111111" }}
          >
            <Icon as={LuX} boxSize="20px" />
          </IconButton>

          {/* Desktop Only: Reset Checkout Button (Only shows if not completed) */}
          {checkoutStep > 0 && checkoutStep < 3 && (
            <IconButton
              display={{ base: "none", xl: "flex" }}
              aria-label="Cancel"
              variant="ghost"
              color="gray.400"
              size="sm"
              rounded="md"
              onClick={resetCheckout}
              _hover={{ bg: "#111111", color: "white" }}
            >
              <Icon as={LuX} boxSize="20px" />
            </IconButton>
          )}
        </Flex>
      </Flex>

      {/* BODY */}
      <Box
        flex={1}
        overflowY="auto"
        p={6}
        css={{ "&::-webkit-scrollbar": { display: "none" } }}
        position="relative"
        zIndex={2}
      >
        {/* STEP 0 */}
        {checkoutStep === 0 && (
          <VStack
            align="stretch"
            gap={0}
            h="full"
            animation="fade-in 0.3s ease"
          >
            <Box mb={6}>
              <Flex justify="space-between" mb={3}>
                <Text color="gray.400" fontSize="md">
                  Subtotal
                </Text>
                <Text color="white" fontSize="md" fontWeight="bold">
                  ₦
                  {subtotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </Flex>
              <Flex justify="space-between" mb={3}>
                <Text color="gray.400" fontSize="md">
                  VAT (7.5%)
                </Text>
                <Text color="white" fontSize="md" fontWeight="bold">
                  ₦
                  {vat.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </Flex>
              <Box w="full" borderTop="1px dashed #1A1A1A" my={4} />
              <Flex justify="space-between" align="center">
                <Text color="gray.300" fontSize="lg" fontWeight="bold">
                  Total Due
                </Text>
                <Text color="white" fontSize="3xl" fontWeight="black">
                  ₦
                  {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </Flex>
            </Box>
            <Flex direction="column" gap={3} mt="auto">
              <Flex
                align="center"
                gap={3}
                p={3}
                bg="#111111"
                rounded="md"
                border="1px solid #1A1A1A"
              >
                <Icon as={LuUser} color="gray.400" />
                <Text color="gray.400" fontSize="sm">
                  Link customer to award loyalty points.
                </Text>
              </Flex>
              <Flex
                align="center"
                gap={3}
                p={3}
                bg="#111111"
                rounded="md"
                border="1px solid #1A1A1A"
              >
                <Icon as={LuTag} color="gray.400" />
                <Text color="gray.400" fontSize="sm">
                  Apply coupons before payment.
                </Text>
              </Flex>
            </Flex>
          </VStack>
        )}

        {/* STEP 1 */}
        {checkoutStep === 1 && (
          <VStack gap={6} align="stretch" animation="fade-in 0.3s ease">
            <Box>
              <Text fontSize="sm" fontWeight="bold" color="gray.300" mb={2}>
                Link Customer
              </Text>
              <Input
                placeholder="Enter Phone or Email"
                {...inputStyles}
                h="48px"
                value={customerInfo}
                onChange={(e) => setCustomerInfo(e.target.value)}
                mb={2}
              />
              <ActionButton
                variant="secondary"
                w="full"
                onClick={handleCheckCustomer}
              >
                <Icon as={LuUser} mr={2} /> Lookup / Register
              </ActionButton>
              {pointsBalance !== null && (
                <Box
                  mt={4}
                  bg="#111111"
                  p={4}
                  rounded="md"
                  border="1px solid #1A1A1A"
                >
                  <Flex align="center" justify="space-between" mb={2}>
                    <Flex gap={2} align="center">
                      <Icon as={LuTrophy} color="white" />
                      <Text color="white" fontWeight="bold">
                        Loyalty Status
                      </Text>
                    </Flex>
                    <Badge bg="white" color="black" rounded="sm" border="none">
                      {pointsBalance.toLocaleString()} Pts
                    </Badge>
                  </Flex>
                  <Text color="gray.400" fontSize="xs">
                    Customer verified. Applying maximum allowed discount
                    (₦5,000).
                  </Text>
                </Box>
              )}
            </Box>
            <Separator borderColor="#1A1A1A" />
            <Box>
              <Text fontSize="sm" fontWeight="bold" color="gray.300" mb={2}>
                Apply Coupon
              </Text>
              <Flex gap={2}>
                <Input
                  placeholder="e.g. TRADAZ10"
                  {...inputStyles}
                  h="48px"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                />
                <ActionButton
                  variant="secondary"
                  h="48px"
                  px={6}
                  onClick={applyCoupon}
                >
                  Apply
                </ActionButton>
              </Flex>
              {couponDiscount > 0 && (
                <Text color="white" fontSize="sm" mt={2} fontWeight="bold">
                  Valid! - ₦{couponDiscount.toLocaleString()} applied.
                </Text>
              )}
            </Box>
          </VStack>
        )}

        {/* STEP 2 */}
        {checkoutStep === 2 && (
          <VStack gap={6} align="stretch" animation="fade-in 0.3s ease">
            <Box bg="#111111" p={5} rounded="md" border="1px solid #1A1A1A">
              <Text color="gray.400" fontSize="sm" mb={1}>
                Amount to Collect
              </Text>
              <Text color="white" fontSize="3xl" fontWeight="black">
                ₦
                {total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="bold" color="gray.300" mb={3}>
                Select Terminal
              </Text>
              <SimpleGrid columns={2} gap={3}>
                <GatewayCard
                  brand="Moniepoint"
                  bgGradient="linear-gradient(135deg, #0533eb 0%, #01166b 100%)"
                  logoSrc="/Moniepoint.png"
                  isSelected={paymentMethod === "moniepoint"}
                  onClick={() => setPaymentMethod("moniepoint")}
                />
                <GatewayCard
                  brand="OPay"
                  bgGradient="linear-gradient(135deg, #10c282 0%, #08704a 100%)"
                  logoSrc="/opay.jpg"
                  isSelected={paymentMethod === "opay"}
                  onClick={() => setPaymentMethod("opay")}
                />
              </SimpleGrid>
            </Box>
          </VStack>
        )}

        {/* STEP 3 */}
        {checkoutStep === 3 && (
          <Flex
            direction="column"
            align="center"
            justify="center"
            h="full"
            animation="fade-in 0.3s ease"
            textAlign="center"
          >
            <Icon as={LuCheck} color="white" boxSize="80px" mb={6} />
            <Text fontSize="3xl" fontWeight="black" color="white" mb={2}>
              Payment Received
            </Text>
            <Text color="gray.400" mb={8}>
              Order{" "}
              <Text as="span" color="white" fontWeight="bold">
                #POS-8829
              </Text>{" "}
              has been recorded via{" "}
              {paymentMethod === "moniepoint" ? "Moniepoint" : "OPay"}.
            </Text>
            <VStack w="full" gap={3}>
              <ActionButton
                variant="secondary"
                w="full"
                h="56px"
                display="flex"
                gap={2}
                onClick={() => window.print()}
              >
                <Icon as={LuPrinter} /> Print Physical Receipt
              </ActionButton>
              <ActionButton
                variant="primary"
                w="full"
                h="56px"
                onClick={startNewSale}
              >
                Start New Sale
              </ActionButton>
            </VStack>
          </Flex>
        )}
      </Box>

      {/* FOOTER */}
      <Box
        p={6}
        borderTop="1px solid #1A1A1A"
        bg="#111111"
        position="relative"
        zIndex={2}
      >
        {checkoutStep === 0 && (
          <ActionButton
            variant="primary"
            w="full"
            h="64px"
            fontSize="lg"
            disabled={cart.length === 0}
            onClick={() => setCheckoutStep(1)}
          >
            Checkout <Icon as={LuArrowRight} ml={2} />
          </ActionButton>
        )}
        {checkoutStep === 1 && (
          <ActionButton
            variant="primary"
            w="full"
            h="60px"
            fontSize="lg"
            onClick={() => setCheckoutStep(2)}
          >
            Proceed to Payment
          </ActionButton>
        )}
        {checkoutStep === 2 && (
          <ActionButton
            variant="primary"
            w="full"
            h="60px"
            fontSize="lg"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Spinner color="black" />
            ) : (
              `Record Payment of ₦${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            )}
          </ActionButton>
        )}
      </Box>
    </DashboardCard>
  );

  return (
    <>
      <Flex
        gap={4}
        direction="row"
        w="full"
        position="relative"
        h="full"
        bg="#000000"
        pb={{ base: "80px", xl: 0 }}
      >
        {/* LEFT COLUMN: SCANNER & CART TABLE */}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          gap={4}
          maxH={{ base: "calc(100vh - 160px)", xl: "calc(100vh - 100px)" }}
        >
          {/* Search & Action Bar */}
          <Flex gap={4} wrap="wrap">
            <Flex
              flex={1}
              minW={{ base: "100%", sm: "300px" }}
              align="center"
              bg="#0A0A0A"
              border="1px solid #1A1A1A"
              rounded="lg"
              px={4}
              h="56px"
            >
              <Icon as={LuScanLine} color="white" boxSize="20px" mr={3} />
              <Input
                placeholder="Scan barcode or search..."
                bg="transparent"
                border="none"
                _focus={{ outline: "none", boxShadow: "none" }}
                color="white"
                fontSize="md"
                fontWeight="medium"
                rounded="none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
              />
              <Icon
                as={LuSearch}
                color="gray.500"
                cursor="pointer"
                _hover={{ color: "white" }}
                onClick={handleScan}
              />
            </Flex>
            <Flex gap={2} w={{ base: "full", sm: "auto" }}>
              <ActionButton
                variant="outline"
                flex={{ base: 1, sm: "auto" }}
                h="56px"
                px={6}
                onClick={clearCart}
              >
                Clear
              </ActionButton>
              <ActionButton
                variant="outline"
                flex={{ base: 1, sm: "auto" }}
                h="56px"
                px={6}
                onClick={pauseSale}
              >
                Pause
              </ActionButton>
            </Flex>
          </Flex>

          {/* CART TABLE AREA */}
          <DashboardCard
            p={0}
            flex={1}
            display="flex"
            flexDirection="column"
            overflow="hidden"
            maskPosition="top left"
          >
            <Flex
              bg="#111111"
              px={{ base: 3, md: 6 }}
              py={4}
              borderBottom="1px solid #1A1A1A"
            >
              <Text
                flex={2}
                color="gray.400"
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
              >
                Item
              </Text>
              <Text
                display={{ base: "none", md: "block" }}
                flex={1}
                color="gray.400"
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                textAlign="center"
              >
                Price
              </Text>
              <Text
                flex={1}
                color="gray.400"
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                textAlign="center"
              >
                Qty
              </Text>
              <Text
                flex={1}
                color="gray.400"
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                textAlign="right"
              >
                Total
              </Text>
              <Box w={{ base: "30px", md: "40px" }} />
            </Flex>

            <Box
              flex={1}
              overflowY="auto"
              css={{
                "&::-webkit-scrollbar": { width: "6px" },
                "&::-webkit-scrollbar-thumb": {
                  background: "#1A1A1A",
                  borderRadius: "4px",
                },
              }}
            >
              {cart.length === 0 ? (
                <Flex
                  h="100%"
                  align="center"
                  justify="center"
                  direction="column"
                  py={20}
                >
                  <Icon as={LuScanLine} boxSize="48px" color="#333333" mb={4} />
                  <Text color="gray.500" fontSize="lg">
                    No products added.
                  </Text>
                </Flex>
              ) : (
                cart.map((item) => (
                  <Flex
                    key={item.id}
                    px={{ base: 3, md: 6 }}
                    py={5}
                    borderBottom="1px solid #1A1A1A"
                    align="center"
                    _hover={{ bg: "#111111" }}
                    transition="background 0.2s"
                  >
                    <Box flex={2} pr={2}>
                      <Text
                        color="white"
                        fontWeight="bold"
                        fontSize={{ base: "sm", md: "md" }}
                        lineClamp={1}
                      >
                        {item.name}
                      </Text>
                      <Text
                        color="gray.500"
                        fontSize="xs"
                        display={{ base: "none", md: "block" }}
                      >
                        {item.variant}
                      </Text>
                    </Box>
                    <Text
                      display={{ base: "none", md: "block" }}
                      flex={1}
                      color="gray.300"
                      fontSize="sm"
                      fontWeight="medium"
                      textAlign="center"
                    >
                      ₦{item.price.toLocaleString()}
                    </Text>
                    <Flex flex={1} justify="center" align="center">
                      <Flex
                        bg="#0A0A0A"
                        border="1px solid #1A1A1A"
                        rounded="md"
                        p={1}
                        align="center"
                      >
                        <IconButton
                          aria-label="Decrease"
                          size="xs"
                          variant="ghost"
                          color="gray.400"
                          _hover={{ color: "white", bg: "#1A1A1A" }}
                          rounded="md"
                          onClick={() => updateQty(item.id, -1)}
                          disabled={checkoutStep > 0}
                        >
                          <Icon as={LuMinus} />
                        </IconButton>
                        <Text
                          w={{ base: "20px", md: "30px" }}
                          textAlign="center"
                          color="white"
                          fontWeight="bold"
                          fontSize="sm"
                        >
                          {item.qty}
                        </Text>
                        <IconButton
                          aria-label="Increase"
                          size="xs"
                          variant="ghost"
                          color="gray.400"
                          _hover={{ color: "white", bg: "#1A1A1A" }}
                          rounded="md"
                          onClick={() => updateQty(item.id, 1)}
                          disabled={checkoutStep > 0}
                        >
                          <Icon as={LuPlus} />
                        </IconButton>
                      </Flex>
                    </Flex>
                    <Text
                      flex={1}
                      color="white"
                      fontSize={{ base: "sm", md: "md" }}
                      fontWeight="bold"
                      textAlign="right"
                    >
                      ₦{(item.price * item.qty).toLocaleString()}
                    </Text>
                    <Flex
                      justify="flex-end"
                      w={{ base: "30px", md: "40px" }}
                      pl={2}
                    >
                      <IconButton
                        aria-label="Remove"
                        size="sm"
                        variant="ghost"
                        color="gray.400"
                        _hover={{ bg: "#1A1A1A", color: "red.400" }}
                        rounded="md"
                        onClick={() => removeItem(item.id)}
                        disabled={checkoutStep > 0}
                      >
                        <Icon as={LuTrash2} />
                      </IconButton>
                    </Flex>
                  </Flex>
                ))
              )}
            </Box>
          </DashboardCard>
        </Box>

        {/* RIGHT COLUMN: DESKTOP ONLY */}
        <Box
          w="400px"
          display={{ base: "none", xl: "flex" }}
          flexDirection="column"
        >
          {CheckoutSidebarUI}
        </Box>
      </Flex>

      {/* MOBILE ONLY: FIXED BOTTOM ACTION BAR */}
      <Flex
        display={{ base: "flex", xl: "none" }}
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bg="#0A0A0A"
        borderTop="1px solid #1A1A1A"
        p={4}
        zIndex={99}
        justify="space-between"
        align="center"
        boxShadow="0 -10px 40px rgba(0,0,0,0.8)"
      >
        <Box>
          <Text color="gray.400" fontSize="sm">
            {cart.length} Items in Cart
          </Text>
          <Text color="white" fontWeight="bold" fontSize="xl">
            ₦
            {total.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </Box>
        <ActionButton
          variant="primary"
          h="48px"
          px={8}
          onClick={() => setIsMobileDrawerOpen(true)}
          disabled={cart.length === 0 && checkoutStep === 0}
        >
          <Icon as={LuShoppingCart} mr={2} /> View Cart
        </ActionButton>
      </Flex>

      {/* MOBILE ONLY: DRAWER FOR CHECKOUT */}
      <Drawer.Root
        open={isMobileDrawerOpen}
        onOpenChange={(e) => setIsMobileDrawerOpen(e.open)}
        placement="end"
        size="sm"
      >
        <Portal>
          <Drawer.Backdrop bg="rgba(0,0,0,0.85)" backdropFilter="blur(4px)" />
          <Drawer.Positioner zIndex={10000}>
            <Drawer.Content
              bg="#000000"
              w={{ base: "100%", sm: "400px" }}
              maxW="100vw"
            >
              {/* Inject the exact same UI we use for Desktop here! */}
              {CheckoutSidebarUI}
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};

"use client";
import React from "react";
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Icon,
  Button,
  Badge,
  Avatar,
  AvatarGroup,
} from "@chakra-ui/react";
import {
  LuArrowLeft,
  LuMail,
  LuPhone,
  LuMapPin,
  LuShoppingBag,
  LuBan,
  LuTrash2,
  LuPencil,
} from "react-icons/lu";
import { Customer } from "@/data/types";

interface CustomerDetailViewProps {
  customer: Customer;
  onBack: () => void;
}

export const CustomerDetailView = ({
  customer,
  onBack,
}: CustomerDetailViewProps) => {
  const brandColor = "#5cac7d";

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
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={4}>
            <Button
              variant="ghost"
              color="#888888"
              _hover={{ color: "white", bg: "#111111" }}
              onClick={onBack}
              px={2}
              h="40px"
              rounded="none"
            >
              <Icon as={LuArrowLeft} boxSize="20px" />
            </Button>
            <Text
              color="white"
              fontWeight="black"
              fontSize="xl"
              letterSpacing="tight"
            >
              Customer Profile
            </Text>
          </Flex>
          <Flex gap={2}>
            <Button
              size="sm"
              bg="#111111"
              color="white"
              border="1px solid #333333"
              rounded="none"
              _hover={{ bg: "#1A1A1A" }}
            >
              {/* Colored Icon */}
              <Icon as={LuPencil} color="blue.400" mr={2} /> Edit
            </Button>
          </Flex>
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8}>
        {/* Left Column: Profile Card */}
        <Box gridColumn={{ lg: "span 1" }}>
          <Box
            bg="#0A0A0A"
            rounded="none"
            border="1px solid #1A1A1A"
            p={6}
            textAlign="center"
            mb={6}
          >
            <AvatarGroup>
              <Avatar.Root>
                <Avatar.Fallback boxSize="100px" />
                <Avatar.Image src="https://bit.ly/sage-adebayo" />
              </Avatar.Root>
            </AvatarGroup>

            <Text
              color="white"
              fontSize="2xl"
              fontWeight="black"
              letterSpacing="tight"
            >
              {customer.name}
            </Text>
            <Text color="#888888" mb={4} fontFamily="monospace">
              {customer.handle}
            </Text>

            <Badge
              bg="#111111"
              color="white"
              border="1px solid #333333"
              px={3}
              py={1}
              rounded="none"
              mb={6}
              textTransform="uppercase"
              fontSize="xs"
              fontWeight="bold"
            >
              {customer.status} Account
            </Badge>

            <Flex
              direction="column"
              gap={3}
              textAlign="left"
              bg="#111111"
              p={4}
              rounded="none"
              border="1px solid #1A1A1A"
            >
              <Flex align="center" gap={3}>
                <Icon as={LuMail} color={brandColor} />
                <Text color="#888888" fontSize="sm">
                  {customer.email}
                </Text>
              </Flex>
              <Flex align="center" gap={3}>
                <Icon as={LuPhone} color={brandColor} />
                <Text color="#888888" fontSize="sm">
                  +234 (0) 800 000 0000
                </Text>
              </Flex>
              <Flex align="center" gap={3}>
                <Icon as={LuMapPin} color={brandColor} />
                <Text color="#888888" fontSize="sm">
                  Abuja, FCT, Nigeria
                </Text>
              </Flex>
            </Flex>
          </Box>

          {/* Danger Zone */}
          <Box bg="#0A0A0A" rounded="none" border="1px solid #1A1A1A" p={6}>
            <Text
              color="white"
              fontWeight="bold"
              mb={4}
              textTransform="uppercase"
              letterSpacing="wider"
              fontSize="xs"
            >
              Danger Zone
            </Text>
            <Button
              w="full"
              mb={3}
              bg="transparent"
              color="white"
              border="1px solid #333333"
              rounded="none"
              _hover={{ bg: "#111111" }}
            >
              <Icon as={LuBan} color="orange.400" mr={2} /> Suspend Account
            </Button>
            <Button
              w="full"
              bg="#111111"
              color="white"
              border="1px solid #333333"
              rounded="none"
              _hover={{ bg: "#1A1A1A" }}
            >
              <Icon as={LuTrash2} color="red.400" mr={2} /> Delete Customer
            </Button>
          </Box>
        </Box>

        {/* Right Column: Lifetime Stats & Recent Orders */}
        <Box gridColumn={{ lg: "span 2" }}>
          {/* Metrics Row */}
          <SimpleGrid columns={2} gap={6} mb={8}>
            <Box bg="#0A0A0A" rounded="none" border="1px solid #1A1A1A" p={6}>
              <Flex align="center" justify="space-between" mb={4}>
                <Text
                  color="#888888"
                  fontSize="10px"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Total Orders
                </Text>
                <Flex
                  bg="#111111"
                  border="1px solid #333333"
                  p={2}
                  rounded="none"
                >
                  {/* Colored Icon */}
                  <Icon as={LuShoppingBag} color={brandColor} />
                </Flex>
              </Flex>
              <Text
                color="white"
                fontSize="4xl"
                fontWeight="black"
                letterSpacing="tight"
              >
                {customer.orders}
              </Text>
            </Box>
            <Box bg="#0A0A0A" rounded="none" border="1px solid #1A1A1A" p={6}>
              <Flex align="center" justify="space-between" mb={4}>
                <Text
                  color="#888888"
                  fontSize="10px"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Lifetime Spend
                </Text>
                <Flex
                  bg="#111111"
                  border="1px solid #333333"
                  p={2}
                  rounded="none"
                >
                  {/* Colored Text acting as Icon */}
                  <Text
                    color={brandColor}
                    fontWeight="bold"
                    fontSize="md"
                    lineHeight="1"
                  >
                    ₦
                  </Text>
                </Flex>
              </Flex>
              <Text
                color="white"
                fontSize="4xl"
                fontWeight="black"
                letterSpacing="tight"
              >
                ₦{customer.spend.toLocaleString()}
              </Text>
            </Box>
          </SimpleGrid>

          {/* Placeholder for Recent Orders Table */}
          <Box
            bg="#0A0A0A"
            rounded="none"
            border="1px solid #1A1A1A"
            p={6}
            h="300px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={LuShoppingBag} boxSize="40px" color="#333333" mb={4} />
            <Text
              color="white"
              fontWeight="bold"
              fontSize="lg"
              letterSpacing="tight"
            >
              Recent Orders
            </Text>

            <Text color="#888888" fontSize="sm">
              Customer&apos;s order history will populate here.
            </Text>
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

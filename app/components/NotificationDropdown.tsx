"use client";

import { Box, Flex, Text, Icon, Button } from "@chakra-ui/react";
import { LuBell, LuShoppingBag } from "react-icons/lu";

export interface NotificationDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  // real notifications as an array here!
}

export const NotificationDropdown = ({
  isOpen,
  onToggle,
}: NotificationDropdownProps) => {
  const iconStyle = { strokeWidth: "2.5" };

  return (
    <Box position="relative">
      <Box position="relative" cursor="pointer" onClick={onToggle}>
        <Icon
          as={LuBell}
          color="white"
          boxSize="20px"
          _hover={{ color: "gray.300" }}
          transition="color 0.2s"
          mt={1}
          css={iconStyle}
        />
        <Box
          position="absolute"
          top="2px"
          right="-2px"
          boxSize="8px"
          bg="red.500"
          rounded="full"
          border="1px solid #000000"
        />
      </Box>

      {isOpen && (
        <Box
          position="absolute"
          top="100%"
          right={{ base: "-40px", sm: 0 }}
          mt={6}
          w={{ base: "calc(100vw - 32px)", sm: "320px" }}
          maxW="320px"
          bg="#0A0A0A"
          border="1px solid #1A1A1A"
          rounded="none"
          shadow="2xl"
          zIndex={99999}
          overflow="hidden"
        >
          <Flex
            px={4}
            py={3}
            justify="space-between"
            align="center"
            borderBottom="1px solid #1A1A1A"
            bg="#111111"
          >
            <Text fontSize="13px" fontWeight="bold" color="white">
              Notifications
            </Text>
            <Text
              fontSize="12px"
              color="#888888"
              cursor="pointer"
              _hover={{ color: "white" }}
            >
              Mark all read
            </Text>
          </Flex>

          <Box
            maxH="300px"
            overflowY="auto"
            css={{ "&::-webkit-scrollbar": { display: "none" } }}
          >
            <Flex
              px={4}
              py={4}
              gap={4}
              _hover={{ bg: "#111111" }}
              cursor="pointer"
              borderBottom="1px solid #1A1A1A"
            >
              <Flex
                align="center"
                justify="center"
                boxSize="32px"
                bg="#1A1A1A"
                color="white"
                border="1px solid #333"
                rounded="none"
                flexShrink={0}
              >
                <Icon as={LuShoppingBag} boxSize="14px" css={iconStyle} />
              </Flex>
              <Box>
                <Text fontSize="13px" color="white" fontWeight="bold">
                  New order received!
                </Text>
                <Text fontSize="12px" color="#888888" mt={1}>
                  Order #POS-8829 needs fulfillment.
                </Text>
                <Text fontSize="10px" color="#555555" mt={2} fontWeight="bold">
                  10 MINS AGO
                </Text>
              </Box>
            </Flex>
          </Box>

          <Box p={3}>
            <Button
              w="full"
              bg="#1A1A1A"
              color="white"
              rounded="none"
              border="1px solid #333"
              fontWeight="bold"
              fontSize="12px"
              size="sm"
              _hover={{ bg: "#333333" }}
            >
              View All
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

"use client";

import React from "react";
import { Drawer, Text, Box, Icon } from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import { CreateBusinessForm } from "./CreateBusinessForm";

interface OnboardingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal = ({ isOpen, onClose }: OnboardingDrawerProps) => {
  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      placement="end"
    >
      <Drawer.Backdrop bg="blackAlpha.800" backdropFilter="blur(4px)" />

      <Drawer.Positioner zIndex={9999}>
        <Drawer.Content
          bg="#000000"
          color="white"
          rounded="none"
          borderLeftWidth="1px"
          borderColor="#1A1A1A"
          w={{ base: "100%", md: "65%", lg: "50%" }}
          maxW="none"
          shadow="2xl"
        >
          <Drawer.Header
            px={8}
            py={6}
            borderBottomWidth="1px"
            borderColor="#1A1A1A"
          >
            <Box pr={8}>
              <Text
                fontSize="xs"
                fontWeight="bold"
                letterSpacing="widest"
                color="gray.500"
                textTransform="uppercase"
              >
                Account Setup
              </Text>
              <Drawer.Title
                fontSize="xl"
                fontWeight="bold"
                color="white"
                letterSpacing="tight"
                mt={1}
              >
                Create Business Entity
              </Drawer.Title>
            </Box>

            {/* Replaced undefined CloseButton with native Icon */}
            <Drawer.CloseTrigger asChild>
              <Box
                as="button"
                position="absolute"
                top={8}
                right={8}
                color="gray.500"
                _hover={{ color: "white" }}
                transition="color 0.2s"
              >
                <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
              </Box>
            </Drawer.CloseTrigger>
          </Drawer.Header>

          <Drawer.Body
            p={0}
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <Box flex={1} w="full" h="full" overflowY="auto">
              <CreateBusinessForm onSuccess={onClose} onCancel={onClose} />
            </Box>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};

import React from "react";
import { Drawer, Text, Box, Portal, CloseButton } from "@chakra-ui/react";
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
      <Portal>
        <Drawer.Backdrop bg="rgba(0,0,0,0.85)" backdropFilter="blur(4px)" />
        <Drawer.Positioner zIndex={9999}>
          <Drawer.Content
            bg="#000000"
            color="white"
            rounded="none"
            borderLeft="1px solid #1A1A1A"
            w={{ base: "100%", md: "65%", lg: "50%" }}
            maxW="none"
            shadow="-20px 0 50px rgba(0,0,0,0.9)"
          >
            <Drawer.Header
              px={8}
              pt={8}
              pb={6}
              borderBottom="1px solid #1A1A1A"
            >
              <Box pr={8}>
                <Text
                  fontSize="11px"
                  fontWeight="700"
                  letterSpacing="widest"
                  color="#888888"
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
              <Drawer.CloseTrigger asChild>
                <CloseButton
                  color="#888888"
                  _hover={{ color: "white", bg: "#1A1A1A" }}
                  rounded="none"
                  position="absolute"
                  top={8}
                  right={8}
                />
              </Drawer.CloseTrigger>
            </Drawer.Header>

            <Drawer.Body
              p={0}
              css={{ "&::-webkit-scrollbar": { display: "none" } }}
              overflow="hidden"
              display="flex"
              flexDirection="column"
            >
              <Box flex={1} w="full" h="full" overflow="hidden">
                <CreateBusinessForm onSuccess={onClose} onCancel={onClose} />
              </Box>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

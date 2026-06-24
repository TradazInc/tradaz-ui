"use client";
import React, { useState } from "react";
import {
  Box,
  VStack,
  Text,
  IconButton,
  Icon,
  Flex,
  Input,
  Button,
} from "@chakra-ui/react";

import { motion, AnimatePresence } from "framer-motion";
import { LuX } from "react-icons/lu";
import { useActiveBusiness } from "@/hooks/useBusiness";
import {useTeamActions} from "@/hooks/useStores"

import { inputStyles,labelStyles } from "@/app/ui/style";
interface AddStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}


export const AddStoreModal = ({ isOpen, onClose }: AddStoreModalProps) => {
  const { create } = useTeamActions();
  const activeOrgAtom = useActiveBusiness();
  const activeOrg = (activeOrgAtom as unknown as { data?: { id: string; name: string } })?.data;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.address.trim()) return;

    await create.mutateAsync({
      name: formData.name.trim(),
      address: formData.address.trim(),
      organizationId: activeOrg?.id, 
    });

    // onSuccess handles toast + invalidation; just reset and close
    setFormData({ name: "", address: "" });
    onClose();
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
                {/* Header */}
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
                      New Location
                    </Text>
                    <Text
                      fontSize="xl"
                      fontWeight="black"
                      color="white"
                      letterSpacing="tight"
                    >
                      Add a New Store
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

                {/* Form Content */}
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
                        Store Name <Text as="span" color="red.400">*</Text>
                      </Text>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Downtown Outlet"
                        {...inputStyles}
                      />
                    </Box>

                    <Box>
                      <Text as="label" {...labelStyles}>
                        Address <Text as="span" color="red.400">*</Text>
                      </Text>
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="e.g. 123 Main Street, Lagos"
                        {...inputStyles}
                      />
                    </Box>
                  </VStack>
                </Box>

                {/* Footer */}
                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
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
                    disabled={!formData.name.trim() || !formData.address.trim()}
                    loading={create.isPending}
                    loadingText="Creating..."
                    _hover={{ bg: "#E5E5E5" }}
                    _disabled={{
                      opacity: 0.5,
                      cursor: "not-allowed",
                      bg: "#333333",
                      color: "#888888",
                    }}
                  >
                    Create Store
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
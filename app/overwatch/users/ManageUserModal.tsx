"use client";

import React, { useState } from "react";
import { Box, Flex, Text, Input, IconButton, Button, Icon, VStack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { LuX, LuTrash2, LuKey, LuLogOut, LuRepeat } from "react-icons/lu";
import { PlatformUser } from "./types";
import { nativeSelectStyle, controlStyles, labelStyles, dangerButtonStyle } from "./constants";

interface ManageUserModalProps {
  user: PlatformUser | null;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<PlatformUser>, banReason?: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onImpersonate: (id: string) => Promise<void>;
  onRevokeSessions: (id: string) => Promise<void>;
  onSetPassword: (id: string) => Promise<void>;
  isSavingRole: boolean;
  isDeleting: boolean;
  isRevoking: boolean;
}

export const ManageUserModal = ({
  user, onClose, onUpdate, onDelete, onImpersonate, onRevokeSessions, onSetPassword, isSavingRole, isDeleting, isRevoking,
}: ManageUserModalProps) => {
  const [status, setStatus] = useState<string>(user?.status || "Active");
  const [role, setRole] = useState<string>(user?.role || "Buyer");
  const [banReason, setBanReason] = useState("");

  if (!user) return null;

  const handleSaveChanges = async () => {
    await onUpdate(user.id, { status, role }, banReason);
    onClose();
  };

  return (
    <AnimatePresence>
      {user && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />
          <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "400px", md: "450px" }} pointerEvents="none">
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
            >
              <Box w="100%" h="100%" bg="#0A0A0A" borderLeft="1px solid" borderColor="#1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                <Flex justify="space-between" align="center" px={6} pt={8} pb={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#111111">
                  <Box>
                    <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Manage User</Text>
                    <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">{user.name}</Text>
                  </Box>
                  <IconButton aria-label="Close" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                    <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                  </IconButton>
                </Flex>

                <Box flex={1} overflowY="auto" px={6} py={8} css={{ "&::-webkit-scrollbar": { display: "none" } }}>
                  <VStack w="full" gap={6} align="stretch">
                    <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                      <VStack align="stretch" gap={4}>
                        <Box>
                          <Text as="label" {...labelStyles}>Account Status</Text>
                          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ ...nativeSelectStyle, width: "100%" }}>
                            <option value="Active">Active</option>
                            <option value="Suspended">Suspended</option>
                            <option value="Banned">Banned</option>
                          </select>
                        </Box>

                        {status === "Banned" && (
                          <Box>
                            <Text as="label" {...labelStyles} color="red.400">Ban Reason (Required)</Text>
                            <Input value={banReason} onChange={(e) => setBanReason(e.target.value)} {...controlStyles} placeholder="Violation of terms..." />
                          </Box>
                        )}

                        <Box>
                          <Text as="label" {...labelStyles}>System Role</Text>
                          <select value={role} onChange={(e) => setRole(e.target.value)} style={{ ...nativeSelectStyle, width: "100%" }}>
                            <option value="Buyer">Buyer</option>
                            <option value="Merchant">Merchant</option>
                            <option value="Admin">Admin</option>
                          </select>
                        </Box>
                      </VStack>
                    </Box>

                    <Box>
                      <Text {...labelStyles} color="red.400" mb={3}>Advanced Actions</Text>
                      <VStack gap={2}>
                        <Button {...dangerButtonStyle} onClick={() => onSetPassword(user.id)}>
                          <Icon as={LuKey} /> Force Password Reset
                        </Button>
                        <Button {...dangerButtonStyle} onClick={() => onRevokeSessions(user.id)} loading={isRevoking}>
                          <Icon as={LuLogOut} /> Revoke All Sessions
                        </Button>
                        <Button {...dangerButtonStyle} onClick={() => onImpersonate(user.id)}>
                          <Icon as={LuRepeat} /> Impersonate Account
                        </Button>
                        <Button {...dangerButtonStyle} onClick={() => onDelete(user.id)} loading={isDeleting} color="red.400" borderColor="red.900" _hover={{ bg: "red.900", color: "white" }}>
                          <Icon as={LuTrash2} /> Delete User (Irreversible)
                        </Button>
                      </VStack>
                    </Box>
                  </VStack>
                </Box>

                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                  <Button variant="outline" borderColor="#333333" onClick={onClose} h="44px" rounded="none" color="#888888" bg="#0A0A0A" _hover={{ bg: "#1A1A1A", color: "white" }}>
                    Cancel
                  </Button>
                  <Button flex="1" h="44px" bg="white" color="black" rounded="none" fontWeight="bold" onClick={handleSaveChanges} loading={isSavingRole} loadingText="Saving..." _hover={{ bg: "#E5E5E5" }}>
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
"use client";

import React from "react";
import { Box, Flex, Text, Icon, Badge, Button, Avatar, VStack, IconButton } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { LuX, LuMail, LuCalendar, LuClock } from "react-icons/lu";
import { PlatformUser } from "./types";

interface ViewUserModalProps {
  user: PlatformUser | null;
  onClose: () => void;
}

export const ViewUserModal = ({ user, onClose }: ViewUserModalProps) => {
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
                    <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>User Profile</Text>
                    <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">{user.name}</Text>
                  </Box>
                  <IconButton aria-label="Close modal" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                    <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                  </IconButton>
                </Flex>
                
                <Box flex={1} overflowY="auto" px={6} py={8} css={{ "&::-webkit-scrollbar": { display: "none" } }}>
                  <VStack w="full" gap={6} align="stretch">
                    <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                      <Flex align="center" gap={4} mb={4}>
                        <Avatar.Root size="lg" rounded="none">
                          <Avatar.Fallback name={user.name} bg="#1A1A1A" color="white" border="1px solid #333333" />
                        </Avatar.Root>
                        <Box>
                          <Text color="white" fontWeight="bold">{user.name}</Text>
                          <Text color="#888888" fontSize="sm" fontFamily="monospace">{user.id}</Text>
                        </Box>
                      </Flex>
                      <Flex align="center" gap={2} color="#888888" fontSize="sm" mb={2}>
                        <Icon as={LuMail} /> {user.email}
                      </Flex>
                    </Box>
                    <Flex justify="space-between" align="center" bg="#111111" p={4} border="1px solid #1A1A1A">
                      <Box>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>System Role</Text>
                        <Text color="white" fontSize="sm" fontWeight="bold">{user.role}</Text>
                      </Box>
                      <Badge colorScheme={user.status === "Active" ? "green" : user.status === "Suspended" ? "yellow" : "red"} px={3} py={1} rounded="none" textTransform="uppercase">
                        {user.status}
                      </Badge>
                    </Flex>
                    <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                      <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={4}>Activity Log</Text>
                      <Flex align="center" gap={3} mb={3}>
                        <Icon as={LuCalendar} color="#888888" />
                        <Text color="white" fontSize="sm">Joined: <Text as="span" fontWeight="bold">{user.joinedAt}</Text></Text>
                      </Flex>
                      <Flex align="center" gap={3}>
                        <Icon as={LuClock} color="#888888" />
                        <Text color="white" fontSize="sm">Last Active: <Text as="span" fontWeight="bold">{user.lastActive}</Text></Text>
                      </Flex>
                    </Box>
                  </VStack>
                </Box>
                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" bg="#111111">
                  <Button w="full" bg="white" color="black" rounded="none" fontWeight="bold" onClick={onClose} _hover={{ bg: "#E5E5E5" }}>
                    Close Profile
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
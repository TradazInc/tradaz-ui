"use client";
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { MotionBox } from "./motion";

export const FounderBadge = () => (
  <MotionBox
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    
    transition={{ delay: 0.5, type: "spring" }}
    display="inline-flex"
    alignItems="center"
    gap={3}
    bg="whiteAlpha.100"
    border="1px solid"
    borderColor="orange.400"
    px={5}
    py={3}
    borderRadius="2xl"
    boxShadow="0 4px 20px rgba(237, 137, 54, 0.1)"
    mb={6}
    cursor="default"
    whileHover={{ scale: 1.05 }}
    maxW="xl"
  >
    <Box position="relative" display="flex" h={3} w={3} mt={{ base: 1.5, md: 0 }} flexShrink={0}>
      <MotionBox
        position="absolute"
        w="100%"
        h="100%"
        borderRadius="full"
        bg="orange.400"
        opacity={0.75}
        animate={{ scale: [1, 2], opacity: [0.75, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
      />
      <Box position="relative" h={3} w={3} borderRadius="full" bg="orange.500" />
    </Box>

    <Text fontSize="sm" fontWeight="medium" color="gray.300" lineHeight="short">
      Early birds get{" "}
      <Text as="span" color="orange.400" fontWeight="bold">Founder Badge</Text>, first
      month sub for free and{" "}
      <Text as="span" color="orange.400" fontWeight="bold">50% off</Text> for 3 months. 🏆
    </Text>
  </MotionBox>
);
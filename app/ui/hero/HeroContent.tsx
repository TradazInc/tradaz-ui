"use client";
import React from "react";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { MotionBox, MotionHeading, MotionText, MotionFlex } from "./motion";
import { fadeUp } from "./config";
import { Typewriter } from "./Typewriter";
import { FounderBadge } from "./FounderBadge";

export const HeroContent = () => {
  return (
    <MotionBox
      order={{ base: 1, md: 1 }}
      display="flex"
      flexDirection="column"
      alignItems={{ base: "center", md: "flex-start" }}
      justifyContent="center"
      textAlign={{ base: "center", md: "left" }}
      pt={{ base: 16, md: 0 }}
    >
      <FounderBadge />

      <MotionHeading
        as="h1"
        variants={fadeUp}
        fontWeight="extrabold"
        color="white"
        lineHeight="1.1"
        fontSize={{ base: "4xl", sm: "6xl", md: "5xl", lg: "7xl" }}
        mb={6}
      >
        Launch Your <br />
        <Box as="span" display="block" minH="1.2em" my={2} color="#5cac7d">
          <Typewriter />
        </Box>
        With Tradaz
      </MotionHeading>

      <MotionText
        variants={fadeUp}
        fontSize={{ base: "base", sm: "lg", md: "xl" }}
        color="gray.400"
        maxW="lg"
        lineHeight="relaxed"
        mb={8}
      >
        Tradaz helps small and large businesses build stunning, scalable
        e-commerce websites from one powerful platform.
      </MotionText>

      <MotionFlex
        variants={fadeUp}
        direction={{ base: "column", sm: "row" }}
        gap={4}
        w={{ base: "full", sm: "auto" }}
      >
        <Button
          asChild
        
          size="lg"
          h="60px"
          px={8}
          fontSize="md"
          bg="#5cac7d"
          color="white"
          rounded="full"
          boxShadow="0 4px 14px 0 rgba(92, 172, 125, 0.39)"
          _hover={{ bg: "#4a9c6d", transform: "translateY(-2px)" }}
          _active={{ transform: "scale(0.98)" }}
          cursor="pointer"
        >
          <Link href="/signup">Register</Link>
          
        </Button>

        <Button
          size="lg"
          h="60px"
          px={8}
          fontSize="md"
          variant="outline"
          color="gray.300"
          borderColor="gray.600"
          rounded="full"
          _hover={{ bg: "whiteAlpha.100", color: "#5cac7d", borderColor: "#5cac7d" }}
          _active={{ transform: "scale(0.98)" }}
        >
          View Demo
        </Button>
      </MotionFlex>
    </MotionBox>
  );
};
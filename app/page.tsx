"use client";
import React from "react";
import { Box, Container } from "@chakra-ui/react";

import { HeroImage } from "./ui/hero/HeroImage";
import { HeroContent } from "./ui/hero/HeroContent";
import { MotionBox } from "./ui/hero/motion";

import { containerVariants } from "./ui/hero/config";

const Hero = () => {
  return (
    <Box
      as="section"
      position="relative"
      minH="100vh"
      bg="#171923"
      overflow="hidden"
      pt={24}
      display="flex"
      alignItems="center"
    >
      <Container maxW="container.xl" px={{ base: 6, md: 12 }} h="full">
        <MotionBox
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
          alignItems="center"
          gap={{ base: 8, lg: 16 }}
          h="full"
          variants={containerVariants} 
          initial="hidden"
          animate="show"
        >
          <HeroContent/>
          <HeroImage/>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Hero;
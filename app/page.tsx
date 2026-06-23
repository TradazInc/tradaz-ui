"use client";
import React from "react";
import { Box, Container } from "@chakra-ui/react";

import { HeroImage } from "./landingPage/landingPage/hero/HeroImage";
import { HeroContent } from "./landingPage/landingPage/hero/HeroContent";
import { MotionBox } from "./landingPage/landingPage/hero/motion";
import { containerVariants } from "./landingPage/landingPage/hero/config";

import HowItWorks from "./landingPage/how-it-works/HowItWorks";
import WhatWeOffer from "./landingPage/landingPage/what-we-offer/WhatWeOffer";
import Navbar from "./landingPage/landingPage/navbar/Navbar";
import { Footer } from "./landingPage/landingPage/footer/footer";



const Hero = () => {
  return (
    
    <>
<Navbar/>
      <Box
        as="section"
        position="relative"
        minH="100vh"
        bg="#171923"
        overflow="hidden"
        pt={24}
        pb={23}
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

     
      <HowItWorks/>
      <WhatWeOffer/>
      <Footer/>
      
    </>
  );
};

export default Hero;
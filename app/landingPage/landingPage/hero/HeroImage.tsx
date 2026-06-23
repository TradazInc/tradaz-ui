"use client";
import React from "react";
import { MotionBox, MotionImage } from "./motion";
import { imageVariants } from "./config";

export const HeroImage = () => {
  return (
    <MotionBox
      variants={imageVariants}
      display={{ base: "none", md: "flex" }}
      justifyContent={{ base: "center", md: "flex-end" }}
      alignItems="center"
      order={{ base: 2, md: 2 }}
      h="full"
    >
      <MotionImage
        src="/hero1.png"
        alt="Tradaz dashboard preview"
        w="full"
        maxW={{ lg: "1100px", xl: "1500px" }}
        maxH="85vh"
        objectFit="contain"
        filter="drop-shadow(0px 20px 40px rgba(0,0,0,0.4))"
        animate={{ y: [0, -14, 0] }}
    
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </MotionBox>
  );
};
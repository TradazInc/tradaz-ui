"use client";
import React from "react";
import { Box } from "@chakra-ui/react";

const SectionBackground = () => (
    <>
        <Box
            position="absolute"
            top="-20%"
            right="-10%"
            width="500px"
            height="500px"
            bg="green.500"
            opacity={0.03}
            borderRadius="full"
            filter="blur(100px)"
        />
        <Box
            position="absolute"
            bottom="-20%"
            left="-10%"
            width="500px"
            height="500px"
            bg="orange.400"
            opacity={0.03}
            borderRadius="full"
            filter="blur(100px)"
        />
    </>
);

export default SectionBackground;
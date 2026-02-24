"use client";
import React from "react";
import { Box, Container } from "@chakra-ui/react";
import SectionBackground from "./SectionBackground";
import HowItWorksHeader from "./HowItWorksHeader";
import DesktopFlow from "./layouts/DesktopFlow";
import MobileFlow from "./layouts/MobileFlow";

const HowItWorks = () => {
    return (
        <Box 
            as="section" 
            bg="#0B0D14" 
            py={{ base: 16, md: 24 }}
            position="relative" 
            overflow="hidden"
            id="how-it-work"
        >
            <SectionBackground />
            
            <Container maxW="container.lg" position="relative">
                <HowItWorksHeader />
                <DesktopFlow />
                <MobileFlow />
            </Container>
        </Box>
    );
};

export default HowItWorks;
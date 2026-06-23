"use client";
import React from "react";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { STEPS } from "../config";
import { StepCard, CurvedArrow } from "../Steps";

const DesktopFlow = () => (
    <Box display={{ base: "none", md: "block" }} position="relative">
        <Flex justify="center" mb={24} position="relative">
            <StepCard step={STEPS[0]} index={0} />
            <Box position="absolute" bottom="-70px" right="calc(50% - 100px)" zIndex={2}>
                <CurvedArrow direction="right" color={STEPS[1].color} delay={0.3} />
            </Box>
            <Box position="absolute" bottom="-70px" left="calc(50% - 100px)" zIndex={2}>
                <CurvedArrow direction="left" color={STEPS[2].color} delay={0.6} />
            </Box>
        </Flex>

        <Box position="relative">
            <Box position="absolute" top="50%" left="15%" right="15%" height="2px" bg="whiteAlpha.200" transform="translateY(-50%)" />
            <Grid templateColumns="1fr 1fr" gap={20}>
                <Flex justify="flex-end" pr={10}>
                    <StepCard step={STEPS[1]} index={1} />
                </Flex>
                <Flex justify="flex-start" pl={10}>
                    <StepCard step={STEPS[2]} index={2} />
                </Flex>
            </Grid>
        </Box>
    </Box>
);

export default DesktopFlow;
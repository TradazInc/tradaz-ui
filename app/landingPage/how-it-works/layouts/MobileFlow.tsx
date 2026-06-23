"use client";
import React from "react";
import { Box, VStack, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { STEPS } from "../config";
import { StepCard, MobileArrow } from "../Steps";

const MotionFlex = motion(Flex);

const MobileFlow = () => (
    <Box display={{ base: "block", md: "none" }}>
        <VStack gap={16}>
            {STEPS.map((step, index) => (
                <Box key={step.id} position="relative" width="100%">
                    <StepCard step={step} index={index} />
                    
                    {index < STEPS.length - 1 && (
                        <MotionFlex 
                            justify="center" 
                            mt={8}
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <MobileArrow color={step.color} />
                        </MotionFlex>
                    )}
                </Box>
            ))}
        </VStack>
    </Box>
);

export default MobileFlow;
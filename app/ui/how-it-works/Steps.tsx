"use client";
import React from "react";
import { Box, Flex, Heading, Text, Icon } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { STEPS } from "./config";

const MotionBox = motion(Box);

export const StepCard = ({ step, index }: { step: typeof STEPS[0]; index: number }) => {
    const cardRef = React.useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });

    return (
        <MotionBox
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            maxW="280px"
            w="full"
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            position="relative"
        >
            <Box position="relative" mb={5}>
                <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" width="90px" height="90px" bg={step.color} borderRadius="full" filter="blur(20px)" opacity={isInView ? 0.15 : 0} transition="opacity 0.5s ease" />
                <Flex w="80px" h="80px" bg="#151821" rounded="2xl" align="center" justify="center" border="1px solid" borderColor={`${step.color}40`} boxShadow={`0 8px 30px ${step.color}15`} position="relative" transition="all 0.3s ease" _hover={{ borderColor: step.color, transform: "scale(1.05)", transition: "all 0.3s ease" }}>
                    <Icon as={step.icon} fontSize="2xl" color={step.color} />
                </Flex>
                <Flex position="absolute" top="-8px" right="-8px" w="28px" h="28px" bg={step.color} rounded="full" align="center" justify="center" color="white" fontSize="sm" fontWeight="bold" boxShadow={`0 4px 10px ${step.color}50`} border="2px solid" borderColor="#0B0D14">
                    {index + 1}
                </Flex>
            </Box>
            <Heading as="h3" fontSize="xl" fontWeight="bold" color="white" mb={3} letterSpacing="tight">{step.title}</Heading>
            <Text color="gray.400" fontSize="sm" lineHeight="tall" px={2}>{step.description}</Text>
        </MotionBox>
    );
};

export const CurvedArrow = ({ direction = "right", color = "#5cac7d", delay = 0 }) => {
    const pathRef = React.useRef(null);
    const isInView = useInView(pathRef, { once: true, amount: 0.5 });
    
    return (
        
        <svg 
            width="120px" 
            height="60px" 
            viewBox="0 0 120 60" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}
        >
            <motion.path ref={pathRef} d={direction === "right" ? "M10 30 C 40 30, 80 45, 110 30" : "M10 30 C 40 30, 80 15, 110 30"} stroke={color} strokeWidth="2" strokeDasharray="8 8" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 1.2, delay, ease: "easeInOut" }} />
            <motion.path d="M110 30 L100 25 M110 30 L100 35" stroke={color} strokeWidth="2" strokeLinecap="round" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.4, delay: delay + 0.8 }} />
        </svg>
    );
};

export const MobileArrow = ({ color = "#5cac7d" }) => {
    const pathRef = React.useRef(null);
    const isInView = useInView(pathRef, { once: true });
    
    return (
        
        <svg 
            width="40px" 
            height="40px" 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path ref={pathRef} d="M20 10 L20 25" stroke={color} strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }} />
            <motion.path d="M17 22 L20 28 L23 22" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" initial={{ opacity: 0, y: -5 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }} transition={{ duration: 0.4, delay: 0.6 }} />
        </svg>
    );
};
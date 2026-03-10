"use client";
import React from "react";
import { VStack, Badge, Heading, Text, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const WhatWeOfferHeader = () => (
    <VStack gap={4} textAlign="center" mb={{ base: 12, md: 16 }}>
        <MotionBox initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Badge px={4} py={2} rounded="full" bg="rgba(92, 172, 125, 0.1)" color="#5cac7d" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" border="1px solid" borderColor="rgba(92, 172, 125, 0.2)">
                What We Offer
            </Badge>
        </MotionBox>

        <MotionBox initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} fontWeight="900" color="white" maxW="800px" mx="auto" lineHeight="1.2" letterSpacing="tight">
                Everything you need to{" "}
                <Text as="span" color="#5cac7d" position="relative">
                    succeed
                    <Box position="absolute" bottom="-4px" left="0" right="0" height="2px" bg="#5cac7d" opacity={0.3} />
                </Text>
            </Heading>
        </MotionBox>

        <MotionBox initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Text color="gray.400" fontSize={{ base: "md", md: "lg" }} maxW="600px" mx="auto">
                A complete e-commerce platform built for merchants, customers, and administrators
            </Text>
        </MotionBox>
    </VStack>
);

export default WhatWeOfferHeader;
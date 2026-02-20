"use client";
import React from "react";
import { VStack, Badge, Heading, Text, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const HowItWorksHeader = () => (
    <VStack gap={6} textAlign="center" mb={{ base: 16, md: 20 }}>
        <MotionBox
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <Badge
                px={4}
                py={2}
                rounded="full"
                bg="rgba(92, 172, 125, 0.1)"
                color="#5cac7d"
                textTransform="uppercase"
                fontSize="xs"
                fontWeight="bold"
                letterSpacing="wider"
                border="1px solid"
                borderColor="rgba(92, 172, 125, 0.2)"
            >
                How it works
            </Badge>
        </MotionBox>

        <MotionBox
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="extrabold"
                color="white"
                lineHeight="1.2"
                letterSpacing="tight"
            >
                3 easy steps to{" "}
                <Text
                    as="span"
                    color="#5cac7d"
                    position="relative"
                    display="inline-block"
                >
                    Get started
                    <Box
                        position="absolute"
                        bottom="-4px"
                        left="0"
                        width="100%"
                        height="2px"
                        bg="green.500"
                        opacity={0.3}
                    />
                </Text>
            </Heading>
        </MotionBox>

        <MotionBox
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Text
                color="gray.400"
                fontSize={{ base: "md", md: "lg" }}
                maxW="lg"
                mx="auto"
                px={4}
            >
                Join our community and begin your journey of sharing and discovering reviews!
            </Text>
        </MotionBox>
    </VStack>
);

export default HowItWorksHeader;
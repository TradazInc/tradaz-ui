"use client";
import React from "react";
import { Box, Container, SimpleGrid, Flex, Heading, Text, Icon, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { LuStore } from "react-icons/lu";

import { OFFERINGS } from "./config";
import { OfferCard } from "./OfferCard";
import WhatWeOfferHeader from "./WhatWeOfferHeader";

const MotionBox = motion(Box);

const WhatWeOffer = () => {
    return (
        <Box as="section" id="what-we-offer" bg="#0B0D14" py={{ base: 16, md: 24 }} position="relative">
            {/* Background Pattern */}
            <Box position="absolute" top="0" left="0" right="0" bottom="0" opacity={0.02} backgroundImage="radial-gradient(#5cac7d 1px, transparent 1px)" backgroundSize="50px 50px" pointerEvents="none" />

            <Container maxW="container.xl" position="relative">
                <WhatWeOfferHeader />

                {/* --- The Clean 6-Card Grid --- */}
                <Box mb={{ base: 16, md: 20 }}>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
                        {OFFERINGS.map((item, index) => (
                            <OfferCard key={item.id} item={item} index={index} />
                        ))}
                    </SimpleGrid>
                </Box>

                {/* --- CTA Section --- */}
                <MotionBox initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
                    <Flex bg="#5cac7d" rounded="2xl" p={{ base: 8, md: 12 }} direction={{ base: "column", md: "row" }} align="center" justify="space-between" gap={6} boxShadow="0 20px 40px -20px rgba(92, 172, 125, 0.5)">
                        <Box>
                            <Heading color="white" fontSize={{ base: "2xl", md: "3xl" }} mb={2} fontWeight="bold">Ready to grow your business?</Heading>
                            <Text color="whiteAlpha.900" fontSize="lg">Join hundreds of merchants already using Tradaz</Text>
                        </Box>
                        <HStack gap={4}>
                            <Flex as="button" bg="#0B0D14" color="white" px={6} py={3} rounded="lg" fontWeight="bold" align="center" gap={2} _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }} transition="all 0.3s">
                                <Icon as={LuStore} />
                                <Text>Start Selling</Text>
                            </Flex>
                        </HStack>
                    </Flex>
                </MotionBox>
            </Container>
        </Box>
    );
};

export default WhatWeOffer;
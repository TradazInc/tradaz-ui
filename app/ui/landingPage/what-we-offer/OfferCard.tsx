"use client";
import React from "react";
import { Box, Flex, Heading, Text, Icon, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { LuCheck } from "react-icons/lu";

const MotionBox = motion(Box);


export interface OfferItem {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    features: string[];
}


export const OfferCard = ({ item, index }: { item: OfferItem; index: number }) => {
    return (
        <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            
            
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            
            bg="#11131A" 
            p={6}
            rounded="2xl"
            border="1px solid"
            borderColor="whiteAlpha.100"
            _hover={{
                borderColor: item.color,
                boxShadow: `0 10px 40px -10px ${item.color}30`,
            }}
            
            
            transitionProperty="border-color, box-shadow"
            transitionDuration="0.3s"
            transitionTimingFunction="ease"
        >
            <Flex w="50px" h="50px" bg={`${item.color}15`} rounded="xl" align="center" justify="center" mb={6} border="1px solid" borderColor="whiteAlpha.50">
                <Icon as={item.icon} color={item.color} fontSize="24px" />
            </Flex>

            <Heading as="h4" fontSize="xl" fontWeight="bold" mb={3} color="white" letterSpacing="tight">
                {item.title}
            </Heading>

            <Text color="gray.400" fontSize="sm" lineHeight="tall" mb={6}>
                {item.description}
            </Text>

            <VStack gap={3} align="stretch">
                {item.features.map((feature: string, i: number) => (
                    <Flex key={i} align="flex-start" fontSize="sm" color="gray.400">
                        <Box as="span" mr={3} mt={0.5} color={item.color}>
                            <Icon as={LuCheck} boxSize="16px" /> 
                        </Box>
                        <Text>{feature}</Text>
                    </Flex>
                ))}
            </VStack>
        </MotionBox>
    );
};
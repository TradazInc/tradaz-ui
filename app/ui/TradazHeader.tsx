"use client";

import React from "react";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { LuShoppingBag } from "react-icons/lu"; 

export default function TradazHeader() {
    return (
        <Flex align="center" gap={3} userSelect="none">
            {/* Logo Icon Box */}
            <Flex
                w={8}
                h={8}
                bg="#5cac7d"
                rounded="lg"
                align="center"
                justify="center"
                boxShadow="0 0 15px rgba(92, 172, 125, 0.4)" 
            >
                <Icon as={LuShoppingBag} color="white" boxSize={5} strokeWidth={2.5} fill="whiteAlpha.300" />
            </Flex>

            <Text
                fontSize="xl"
                fontWeight="extrabold"
                color="white"
                letterSpacing="tight"
            >
                Tradaz
                <Text as="span" color="#5cac7d">.</Text>
            </Text>
        </Flex>
    );
}
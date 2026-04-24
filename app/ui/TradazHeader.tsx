"use client";

import React from "react";
import { Flex, Text } from "@chakra-ui/react";

export default function TradazHeader() {
    return (
        <Flex align="center" gap={3} userSelect="none">
            <Text
                fontSize="xl"
                fontWeight="extrabold"
                color="white"
                letterSpacing="tight"
            >
                Tradaz
                <Text as="span" color="#888888">.</Text>
            </Text>
        </Flex>
    );
}
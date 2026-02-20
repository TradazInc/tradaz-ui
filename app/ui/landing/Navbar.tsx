"use client";

import React from "react";
import { Flex, Text, Button, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { LuHexagon } from "react-icons/lu";

export default function Navbar() {
    return (
        <Flex 
            as="nav" w="full" py={4} px={{ base: 4, md: 8 }} 
            justify="space-between" align="center" 
            position="absolute" top={0} zIndex={100}
        >
            <Flex align="center" gap={3}>
                <Flex w={8} h={8} bg="#5cac7d" rounded="lg" align="center" justify="center" boxShadow="0 0 15px rgba(92, 172, 125, 0.4)">
                    <Icon as={LuHexagon} color="white" boxSize="20px" strokeWidth={2.5} fill="whiteAlpha.300" />
                </Flex>
                <Text fontSize="xl" fontWeight="extrabold" color="white" letterSpacing="tight">
                    Tradaz<Text as="span" color="#5cac7d">.</Text>
                </Text>
            </Flex>

            <Flex gap={4} align="center">
                <Link href="/signup">
                    <Button variant="ghost" color="white" _hover={{ bg: "whiteAlpha.100" }} size="sm">
                        Log in
                    </Button>
                </Link>
                <Link href="/">
                    <Button bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} fontWeight="bold" size="sm">
                        Get Started
                    </Button>
                </Link>
            </Flex>
        </Flex>
    );
}
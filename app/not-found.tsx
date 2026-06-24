// app/not-found.tsx
"use client";

import { Text, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Flex
      minH="100vh"
      bg="#000000"
      color="white"
      direction="column"
      align="center"
      justify="center"
      p={4}
    >
      <Text fontSize="4xl" fontWeight="black" letterSpacing="tight" mb={2}>
        404
      </Text>
      <Text color="#888888" mb={6}>
        The page you are looking for does not exist.
      </Text>
      <Link href="/" passHref>
        <Button
          bg="white"
          color="black"
          rounded="none"
          fontWeight="bold"
          _hover={{ bg: "#E5E5E5" }}
        >
          Return to Dashboard
        </Button>
      </Link>
    </Flex>
  );
}

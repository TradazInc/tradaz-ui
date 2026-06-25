import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export const LogoContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex align="center" gap={3} userSelect="none">
      <Text
        fontSize="xl"
        fontWeight="extrabold"
        color="white"
        letterSpacing="tight"
      >
        {children}
        <Text as="span" color="#888888">
          .
        </Text>
      </Text>
    </Flex>
  );
};

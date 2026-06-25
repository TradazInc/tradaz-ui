import { Flex } from "@chakra-ui/react";
import React from "react";

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      flex={1}
      position="relative"
      bg="#000000"
      alignItems="stretch"
      minH={0}
      overflow="hidden"
    >
      {" "}
      {children}
    </Flex>
  );
};

import { Flex } from "@chakra-ui/react";
import React from "react";

export const LayoutContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Flex direction="column" h="100vh" w="full" bg="#000000" overflow="hidden">
      {children}
    </Flex>
  );
};

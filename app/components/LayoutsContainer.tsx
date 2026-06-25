import { Flex } from "@chakra-ui/react";
import React from "react";

export const LayoutContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Flex direction="column" w="full" bg="#000000" overflow="hidden">
      {children}
    </Flex>
  );
};

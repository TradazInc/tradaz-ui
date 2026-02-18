import { HStack } from "@chakra-ui/react";
import React from "react";
import { ColorModeProvider } from "../../../components/ui/color-mode";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <ColorModeProvider forcedTheme="dark">
      <HStack
        h={{ base: "100vh", md: "full" }}
        w={"full"}
        paddingY={"90px"}
        paddingX={{ base: "16px", md: "47px" }}
        gap={"48px"}
      >
        {children}
      </HStack>
    </ColorModeProvider>
  );
};

export default Container;

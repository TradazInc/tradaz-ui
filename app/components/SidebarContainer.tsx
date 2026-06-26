import { Box } from "@chakra-ui/react";
import React from "react";

export const SidebarContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Box display={{ base: "none", md: "block" }} h="full" position="fixed">
      {" "}
      {children}
    </Box>
  );
};

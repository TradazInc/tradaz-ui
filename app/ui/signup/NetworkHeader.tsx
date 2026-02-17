import { Box } from "@chakra-ui/react";
import NextImage from "next/image";

const NetworkHeader = () => {
  return (
    <Box
      position="relative"
      hideFrom="md"
      w={"180.82px"}
      h={"65px"}
      marginY={"47px"}
    >
      <NextImage src="/networkx.png" alt="Networkx" fill />
    </Box>
  );
};

export default NetworkHeader;

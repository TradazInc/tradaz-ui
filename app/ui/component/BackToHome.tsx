"use client";
import React from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { LuArrowLeft } from "react-icons/lu";
import Link from "next/link";

const BackToHome = () => {
  return (
    <Box 
      asChild 
      position="absolute" 
      top={{ base: 6, md: 8 }} 
      left={{ base: 6, md: 8 }} 
      zIndex={10}
     
      _hover={{ textDecoration: "none" }} 
    >
      
      <Link href="/">
        <Flex 
          align="center" 
          gap={2} 
          color="gray.400" 
          _hover={{ color: "white", transform: "translateX(-4px)" }} 
          transition="all 0.3s ease"
        >
          <Icon as={LuArrowLeft} boxSize="20px" />
          <Text fontWeight="semibold" fontSize="sm">Back to Home</Text>
        </Flex>
      </Link>
    </Box>
  );
};

export default BackToHome;
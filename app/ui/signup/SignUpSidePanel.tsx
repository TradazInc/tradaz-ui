"use client";
import React from "react";
import { Flex, Heading, Text, Box, Link } from "@chakra-ui/react";


const SignupSidePanel = () => {
  return (
    <Flex
      flex={1}
      bg="#5cac7d" 
      direction="column"
      align="center"
      justify="center"
      color="white"
      textAlign="center"
      p={{ base: 8, md: 12 }}
      display={{ base: "none", lg: "flex" }} // Hides on mobile, shows on desktop
      position="relative"
      overflow="hidden"
    >
        
      {/* Decorative floating shapes to match the reference image */}
      <Box position="absolute" top="-10%" right="-10%" w="300px" h="300px" bg="whiteAlpha.200" rounded="full" />
      <Box position="absolute" bottom="-10%" left="-10%" w="200px" h="200px" bg="whiteAlpha.200" rounded="full" />
      <Box position="absolute" top="30%" left="15%" w="40px" h="40px" bg="whiteAlpha.200" transform="rotate(45deg)" />
      
      {/* Content */}
      <Flex direction="column" gap={6} zIndex={1} align="center">
        <Heading fontSize="4xl" fontWeight="bold">
          Hello, Friend!
        </Heading>
        <Text fontSize="lg" maxW="280px" lineHeight="tall" color="whiteAlpha.900">
          Enter your personal details and start your journey with us
        </Text>
    

        <Flex
          asChild
          mt={4}
          border="2px solid white"
          rounded="full"
          px={12}
          py={3}
          fontWeight="bold"
          letterSpacing="wider"
          cursor="pointer"
          _hover={{ bg: "white", color: "#5cac7d", transform: "scale(1.02)" }}
          _active={{ transform: "scale(0.98)" }}
          transition="all 0.3s ease"
        >
            <Link href="/signin" >  SIGN IN</Link>
            
        
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignupSidePanel;
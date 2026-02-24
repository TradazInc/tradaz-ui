"use client";

import React, { useState } from "react";
import { Box, Container, Flex, HStack, Button, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { LuMenu, LuX } from "react-icons/lu";
import TradazHeader from "../TradazHeader";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "How It Works", href: "#how-it-work" },
  { label: "What We Offer", href: "#what-we-offer" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      as="nav"
      position="fixed"
      w="full"
      top={0}
      zIndex={50}
      bg="rgba(23, 25, 35, 0.85)" 
      backdropFilter="blur(12px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
    >
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between" h={20}>
          
          {/* LOGO */}
          <Link href="/">
            <TradazHeader/>
          </Link>

          {/* DESKTOP NAVIGATION LINKS */}
          <HStack gap={8} display={{ base: "none", md: "flex" }}>
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href}>
                <Text 
                  fontSize="sm" 
                  fontWeight="medium" 
                  color="gray.300" 
                  _hover={{ color: "#5cac7d" }} 
                  transition="colors 0.2s"
                >
                  {link.label}
                </Text>
              </Link>
            ))}
          </HStack>

          {/* DESKTOP ACTIONS */}
          <HStack gap={4} display={{ base: "none", md: "flex" }}>
            <Button 
              asChild 
             
              variant="ghost" 
              color="white" 
              _hover={{ bg: "whiteAlpha.100" }}
            >
                <Link href="/signin" > Sign In</Link>
             
            </Button>
            <Button 
              asChild
              
              bg="#5cac7d" 
              color="white" 
              rounded="full" 
              px={6} 
              _hover={{ bg: "#4a9c6d", transform: "translateY(-1px)" }}
              _active={{ transform: "scale(0.98)" }}
              transition="all 0.2s"
            >
                <Link href="/signup">Get Started</Link>
              
            </Button>
          </HStack>

          {/* MOBILE TOGGLE BUTTON */}
          <Box
            as="button"
            display={{ base: "flex", md: "none" }}
            onClick={() => setIsOpen(!isOpen)}
            color="white"
            p={2}
            rounded="md"
            _hover={{ bg: "whiteAlpha.100" }}
          >
            {isOpen ? <LuX size={24} /> : <LuMenu size={24} />}
          </Box>
        </Flex>
      </Container>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <Box 
          display={{ base: "block", md: "none" }} 
          bg="#1e1e20" 
          borderBottom="1px solid" 
          borderColor="whiteAlpha.100" 
          px={4} 
          py={6}
          boxShadow="xl"
        >
          <VStack gap={4} align="stretch">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setIsOpen(false)}>
                <Text fontSize="md" fontWeight="medium" color="gray.300" py={2}>
                  {link.label}
                </Text>
              </Link>
            ))}
            
            <Flex direction="column" gap={3} pt={4} borderTop="1px solid" borderColor="whiteAlpha.100">
              <Button 
                asChild
                 
                variant="outline" 
                borderColor="whiteAlpha.300" 
                color="white" 
                w="full"
                h="50px"
              >
                <Link href="/signin">Sign In</Link>
                Sign In
              </Button>
              <Button 
                asChild
               
                bg="#5cac7d" 
                color="white" 
                w="full"
                h="50px"
              >
                <Link href="/signup" > Get Started</Link>
               
              </Button>
            </Flex>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
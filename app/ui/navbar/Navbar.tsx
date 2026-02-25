"use client";

import React, { useState, useEffect } from "react";
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

  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <Box
        as="nav"
        position="fixed"
        w="full"
        top={0}
        zIndex={100} 
        bg="rgba(11, 13, 20, 0.85)" 
        backdropFilter="blur(12px)"
        borderBottom="1px solid"
        borderColor="whiteAlpha.100"
      >
        <Container maxW="container.xl">
          <Flex align="center" justify="space-between" h="80px">
            
            {/* LOGO */}
            <Link href="/" onClick={() => setIsOpen(false)}>
              <TradazHeader />
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
              <Button asChild variant="ghost" color="white" _hover={{ bg: "whiteAlpha.100" }}>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button 
                asChild
                bg="#5cac7d" 
                color="white" 
                rounded="full" 
                px={6} 
                border="none"
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
              transition="all 0.2s"
            >
              {isOpen ? <LuX size={26} /> : <LuMenu size={26} />}
            </Box>
          </Flex>
        </Container>
      </Box>

      
      <Box 
        position="fixed"
        top="80px"
        left={0}
        w="100vw"
        h="calc(100dvh - 80px)"
        bg="blackAlpha.600"
        backdropFilter="blur(4px)"
        zIndex={85}
        display={{ base: isOpen ? "block" : "none", md: "none" }}
        onClick={() => setIsOpen(false)}
        opacity={isOpen ? 1 : 0}
        transition="opacity 0.3s ease"
      />

      {/* --- MODERN MOBILE SWIPE MENU (60% WIDTH) --- */}
      <Box
        position="fixed"
        top="80px" 
        right={0} 
        w="60%"   
        h="calc(100dvh - 80px)" 
        bg="#1A1C23" 
        zIndex={90}
        display={{ base: "block", md: "none" }}
        transform={isOpen ? "translateX(0)" : "translateX(100%)"}
        transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)" 
        overflowY="auto"
        borderLeft="1px solid"
        borderColor="whiteAlpha.100"
        shadow="-15px 0 30px rgba(0,0,0,0.5)" 
      >
        <VStack h="full" justify="space-between" px={4} py={8}>
          
          {/* Main Links */}
          <VStack align="stretch" gap={3} w="full">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setIsOpen(false)} style={{ width: "100%" }}>
                {/* Premium Block Hover Effect */}
                <Flex 
                    align="center"
                    w="full"
                    p={4}
                    rounded="xl"
                    color="gray.200"
                    _hover={{ 
                        bg: "rgba(92, 172, 125, 0.15)", 
                        color: "#5cac7d",               
                        paddingLeft: "24px"             
                    }} 
                    transition="all 0.2s ease"
                >
                  <Text fontSize="lg" fontWeight="bold">
                    {link.label}
                  </Text>
                </Flex>
              </Link>
            ))}
          </VStack>

          {/* Action Buttons at the bottom */}
          <Flex direction="column" gap={4} w="full" pb={4}>
            <Button 
              asChild
              variant="outline" 
              borderColor="whiteAlpha.300" 
              color="white" 
              w="full"
              h="50px"
              fontSize="md"
            >
              <Link href="/signin" onClick={() => setIsOpen(false)}>Sign In</Link>
            </Button>
            <Button 
              asChild
              bg="#5cac7d" 
              color="white" 
              border="none"
              w="full"
              h="50px"
              fontSize="md"
            >
              <Link href="/signup" onClick={() => setIsOpen(false)}>Get Started</Link>
            </Button>
          </Flex>
        </VStack>
      </Box>
    </>
  );
};

export default Navbar;
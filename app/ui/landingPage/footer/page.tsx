"use client";
import React from "react";
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  LuTwitter,
  LuInstagram,
  LuLinkedin,
  LuGithub,
} from "react-icons/lu";


const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} style={{ textDecoration: 'none' }}>
    <Text
      color="gray.400"
      fontSize="sm"
      transition="all 0.2s"
      _hover={{ color: "#5cac7d", transform: "translateX(2px)" }}
      display="inline-block"
    >
      {children}
    </Text>
  </Link>
);


const SocialButton = ({ icon, href }: { icon: React.ElementType; href: string }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    <Flex
      boxSize="36px"
      align="center"
      justify="center"
      bg="#111111"
      rounded="full"
      color="gray.400"
      border="1px solid"
      borderColor="#333333"
      transition="all 0.2s"
      _hover={{ bg: "#5cac7d", color: "white", borderColor: "#5cac7d" }}
    >
      <Icon as={icon} boxSize="18px" />
    </Flex>
  </Link>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box bg="#06080e" borderTop="1px solid" borderColor="#1A1A1A" pt={16} pb={8}>
      <Box maxW="1200px" mx="auto" px={{ base: 6, md: 8 }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} gap={{ base: 10, lg: 8 }} mb={12}>
          {/* Brand Section */}
          <VStack align="start" gap={4} gridColumn={{ lg: "span 2" }} pr={{ lg: 8 }}>
            <Text fontSize="2xl" fontWeight="black" color="white" letterSpacing="tight">
              Tradaz<Box as="span" color="#5cac7d">.</Box>
            </Text>
            <Text color="gray.400" fontSize="sm" lineHeight="tall" maxW="sm">
              The powerful platform designed to help small and large businesses build stunning, scalable e-commerce websites with ease.
            </Text>
            <HStack gap={3} mt={2}>
              <SocialButton icon={LuTwitter} href="#" />
              <SocialButton icon={LuInstagram} href="#" />
              <SocialButton icon={LuLinkedin} href="#" />
              <SocialButton icon={LuGithub} href="#" />
            </HStack>
          </VStack>

          {/* Links Section */}
          <VStack align="start" gap={4}>
            <Text color="white" fontWeight="bold" fontSize="md" mb={2}>
              Product
            </Text>
            <FooterLink href="/features">Features</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href="/integrations">Integrations</FooterLink>
            <FooterLink href="/templates">Templates</FooterLink>
          </VStack>

          {/* Links Section */}
          <VStack align="start" gap={4}>
            <Text color="white" fontWeight="bold" fontSize="md" mb={2}>
              Resources
            </Text>
            <FooterLink href="/docs">Documentation</FooterLink>
            <FooterLink href="/help">Help Center</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
            <FooterLink href="/guides">Guides</FooterLink>
          </VStack>

          {/* Links Section  */}
          <VStack align="start" gap={4}>
            <Text color="white" fontWeight="bold" fontSize="md" mb={2}>
              Company
            </Text>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/partners">Partners</FooterLink>
          </VStack>
        </SimpleGrid>

       
        <Box w="full" h="1px" bg="#1A1A1A" mb={6} />

        {/* Bottom Bar */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "center" }}
          gap={4}
        >
          <Text color="gray.500" fontSize="xs">
            &copy; {currentYear} Tradaz. All rights reserved.
          </Text>
          <HStack gap={6}>
            <Link href="/privacy">
              <Text color="gray.500" fontSize="xs" transition="all 0.2s" _hover={{ color: "#5cac7d" }}>
                Privacy Policy
              </Text>
            </Link>
            <Link href="/terms">
              <Text color="gray.500" fontSize="xs" transition="all 0.2s" _hover={{ color: "#5cac7d" }}>
                Terms of Service
              </Text>
            </Link>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};
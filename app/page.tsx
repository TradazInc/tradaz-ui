import { ColorModeButton } from "@/components/ui/color-mode";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import TradazLogo from "@/components/shared/TradazLogo";

export default function page() {
  return (
    <Box bg="bg" minH="100vh">
      <Box
        w="full"
        top={0}
        bg="bg.panel"
        borderBottomWidth="1px"
        borderColor="bg.emphasized"
        position="fixed"
        zIndex={2}
      >
        <Flex
          maxW="container.lg"
          mx="auto"
          px={{ base: 4, md: 8 }}
          py={2}
          align="center"
          justify="space-between"
        >
          <TradazLogo />

          <HStack gap="4">
            <ColorModeButton rounded="full" />

            <HStack gap="2">
              <Link href="/merchant/signin">
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  size="sm"
                  rounded="full"
                >
                  Business
                </Button>
              </Link>
              <Link href="/staff/signin">
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  size="sm"
                  rounded="full"
                >
                  Staff
                </Button>
              </Link>
            </HStack>
          </HStack>
        </Flex>
      </Box>

      <Container maxW="container.lg" pt={32} pb={20}>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={10}
          alignItems="center"
          mb={24}
        >
          <VStack
            gap="6"
            alignItems={{ base: "center", md: "flex-start" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Heading
              as="h1"
              size="3xl"
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              Welcome to{" "}
              <Text as="span" color="green.500">
                Tradaz
              </Text>
            </Heading>

            <Text fontSize="xl" color="fg.muted">
              A tailored e-commerce platform for business owners. Streamline
              your operations, manage your business, track sales and inventory
              and scale your growth seamlessly.
            </Text>
          </VStack>

          <Box w="full" display="flex" justifyContent="center">
            <Image
              src="/hero.png"
              alt="Tradaz hero image"
              objectFit="cover"
              maxH="450px"
              w="full"
            />
          </Box>
        </SimpleGrid>

        <Box as="section">
          <VStack gap="3" textAlign="center" mb={16}>
            <Heading as="h2" size="xl">
              How to Join
            </Heading>
            <Text color="fg.muted" fontSize="lg">
              Get your business up and running in three simple steps.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap="10">
            {steps.map((step) => (
              <Box
                key={step.id}
                bg="bg.panel"
                p={8}
                rounded="2xl"
                borderWidth="1px"
                borderColor="bg.emphasized"
                textAlign="center"
                transition="transform 0.2s ease"
                _hover={{ transform: "translateY(-5px)" }}
              >
                <Flex
                  w={14}
                  h={14}
                  mx="auto"
                  bg="green.500"
                  color="white"
                  rounded="full"
                  align="center"
                  justify="center"
                  fontSize="2xl"
                  fontWeight="bold"
                  mb={6}
                >
                  {step.id}
                </Flex>
                <Heading as="h3" size="md" mb={4}>
                  {step.title}
                </Heading>
                <Text color="fg.muted" lineHeight="tall">
                  {step.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>

      <Box
        as="footer"
        borderTopWidth="1px"
        borderColor="bg.emphasized"
        py={8}
        mt="auto"
      >
        <Container maxW="container.lg">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            gap={4}
          >
            <TradazLogo />

            <Text color="fg.muted" fontSize="sm">
              © {new Date().getFullYear()} Tradaz. All rights reserved.
            </Text>

            <HStack gap={6}>
              <Link href="/terms">
                <Text
                  color="fg.muted"
                  fontSize="sm"
                  _hover={{ color: "green.500" }}
                >
                  Terms
                </Text>
              </Link>
              <Link href="/privacy">
                <Text
                  color="fg.muted"
                  fontSize="sm"
                  _hover={{ color: "green.500" }}
                >
                  Privacy
                </Text>
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

const steps = [
  {
    id: 1,
    title: "Join",
    description: "Create your account in seconds to access the platform.",
  },
  {
    id: 2,
    title: "Create Business",
    description: "Register your business and set up its profile.",
  },
  {
    id: 3,
    title: "Create Branch",
    description: "Add your collections and start selling to your customers.",
  },
];

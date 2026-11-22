import { Box, HStack, Heading, Stack, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { ButtonItem, Buttons } from "./Buttons";

export function SectionHeader({
  eyebrow,
  title,
  description,
  buttons,
  center = false,
  display = false,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  buttons?: ButtonItem[];
  center?: boolean;
  /** Larger page-title styling used by the Hero. */
  display?: boolean;
}) {
  return (
    <Stack
      gap="6"
      align={center ? "center" : "flex-start"}
      textAlign={center ? "center" : "start"}
    >
      {eyebrow &&
        (display ? (
          <HStack
            gap="2"
            px="3.5"
            py="1.5"
            rounded="full"
            borderWidth="1px"
            borderColor="currentColor/20"
            fontSize="sm"
            fontWeight="semibold"
          >
            <Box boxSize="1.5" rounded="full" bg="currentColor" />
            {eyebrow}
          </HStack>
        ) : (
          <Text
            fontSize="sm"
            fontWeight="bold"
            letterSpacing="widest"
            textTransform="uppercase"
            color="currentColor/75"
          >
            {eyebrow}
          </Text>
        ))}
      <Heading
        as={display ? "h1" : "h2"}
        fontSize={
          display
            ? { base: "5xl", md: "7xl", lg: "8xl" }
            : { base: "4xl", md: "5xl", lg: "6xl" }
        }
        lineHeight={display ? "1" : "1.05"}
        letterSpacing={display ? "tighter" : "tight"}
        fontWeight="extrabold"
        textTransform="none"
        textWrap="balance"
      >
        {title}
      </Heading>
      {description && (
        <Box
          maxW="40rem"
          fontSize={{ base: "lg", md: "xl" }}
          color="currentColor/70"
          textWrap="pretty"
        >
          {description}
        </Box>
      )}
      <Buttons buttons={buttons} justify={center ? "center" : "flex-start"} />
    </Stack>
  );
}

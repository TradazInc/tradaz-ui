import { Badge, Box, Heading, Show, Stack } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { ButtonItem, Buttons } from "./Buttons";

const headings = {
  page: { as: "h1", size: { base: "4xl", md: "6xl" } },
  section: { as: "h2", size: { base: "3xl", md: "5xl" } },
} as const;

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description: ReactNode;
  buttons?: ButtonItem[];
  align?: "start" | "center";
  /** "page" is the larger h1 used by the Hero. */
  variant?: keyof typeof headings;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  buttons,
  align = "start",
  variant = "section",
}: SectionHeaderProps) {
  return (
    <Stack gap="5" align={align} textAlign={align}>
      <Show when={eyebrow}>
        <Badge size="lg" variant="outline" rounded="full">
          {eyebrow}
        </Badge>
      </Show>
      <Heading {...headings[variant]}>{title}</Heading>
      <Box maxW="2xl" fontSize="lg" color="fg.muted">
        {description}
      </Box>
      <Buttons buttons={buttons} justify={align} />
    </Stack>
  );
}

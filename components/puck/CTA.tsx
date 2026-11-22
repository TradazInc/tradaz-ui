import { Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import type { ComponentConfig } from "@puckeditor/core";
import {
  ButtonItem,
  Buttons,
  Layout,
  Section,
  SectionProps,
  buttonsField,
  layoutField,
  mutedColor,
  sectionDefaults,
  sectionFields,
} from "./shared";

export interface CTAProps extends SectionProps {
  layout: Layout;
  title: string;
  description: string;
  buttons: ButtonItem[];
}

export const CTA: ComponentConfig<CTAProps> = {
  fields: {
    layout: layoutField,
    title: { type: "text", contentEditable: true },
    description: { type: "textarea", contentEditable: true },
    buttons: buttonsField,
    ...sectionFields,
  },
  defaultProps: {
    ...sectionDefaults,
    layout: "centered",
    title: "Get started",
    description: "Ready when you are.",
    buttons: [{ label: "Get started", href: "#", variant: "primary" }],
  },
  render: ({ layout, background, backdrop, padding, title, description, buttons }) => {
    const centered = layout === "centered";
    const heading = (
      <Stack gap="4" textAlign={centered ? "center" : "start"}>
        <Heading as="h2" size={{ base: "3xl", md: "5xl" }}>
          {title}
        </Heading>
        <Text fontSize="lg" color={mutedColor(background)}>
          {description}
        </Text>
      </Stack>
    );

    return (
      <Section background={background} backdrop={backdrop} padding={padding}>
        {centered ? (
          <Stack gap="8" align="center" maxW="2xl" mx="auto">
            {heading}
            <Buttons buttons={buttons} background={background} justify="center" />
          </Stack>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="8" alignItems="center">
            {heading}
            <Stack align={{ base: "flex-start", md: "flex-end" }}>
              <Buttons buttons={buttons} background={background} />
            </Stack>
          </SimpleGrid>
        )}
      </Section>
    );
  },
};

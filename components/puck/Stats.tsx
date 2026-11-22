import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
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

export interface StatsProps extends SectionProps {
  layout: Layout;
  title: string;
  description: string;
  items: { value: string; label: string }[];
  buttons: ButtonItem[];
}

export const Stats: ComponentConfig<StatsProps> = {
  fields: {
    layout: layoutField,
    title: { type: "text", contentEditable: true },
    description: { type: "textarea", contentEditable: true },
    items: {
      type: "array",
      getItemSummary: (item) => `${item.value} ${item.label}`.trim() || "Stat",
      defaultItemProps: { value: "100+", label: "Label" },
      arrayFields: {
        value: { type: "text" },
        label: { type: "text" },
      },
    },
    buttons: buttonsField,
    ...sectionFields,
  },
  defaultProps: {
    ...sectionDefaults,
    layout: "split",
    title: "By the numbers",
    description: "Some numbers worth sharing.",
    items: [
      { value: "100+", label: "Customers" },
      { value: "24/7", label: "Support" },
    ],
    buttons: [],
  },
  render: ({
    layout,
    background,
    backdrop,
    padding,
    title,
    description,
    items,
    buttons,
  }) => {
    const centered = layout === "centered";
    const muted = mutedColor(background);

    return (
      <Section background={background} backdrop={backdrop} padding={padding}>
        <SimpleGrid
          columns={{ base: 1, md: centered ? 1 : 2 }}
          gap={{ base: 10, md: 16 }}
          alignItems="center"
        >
          <Stack
            gap="5"
            align={centered ? "center" : "flex-start"}
            textAlign={centered ? "center" : "start"}
            maxW={centered ? "2xl" : undefined}
            mx={centered ? "auto" : undefined}
          >
            <Heading as="h2" size={{ base: "3xl", md: "4xl" }}>
              {title}
            </Heading>
            <Text fontSize="lg" color={muted}>
              {description}
            </Text>
            <Buttons
              buttons={buttons}
              background={background}
              justify={centered ? "center" : "flex-start"}
            />
          </Stack>
          <SimpleGrid
            columns={{ base: 2, md: centered ? Math.min(items.length, 4) : 2 }}
            gap="0"
            borderTopWidth="1px"
            borderLeftWidth="1px"
            borderColor="currentColor/15"
          >
            {items.map((item, i) => (
              <Box
                key={i}
                p={{ base: 6, md: 8 }}
                borderRightWidth="1px"
                borderBottomWidth="1px"
                borderColor="currentColor/15"
                textAlign={centered ? "center" : "start"}
              >
                <Text
                  fontFamily="heading"
                  fontSize={{ base: "3xl", md: "5xl" }}
                  lineHeight="1"
                >
                  {item.value}
                </Text>
                <Text mt="2" color={muted}>
                  {item.label}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </SimpleGrid>
      </Section>
    );
  },
};

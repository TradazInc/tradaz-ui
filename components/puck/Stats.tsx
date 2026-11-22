import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import type { ComponentConfig } from "@puckeditor/core";
import { ButtonItem, buttonsField } from "./Buttons";
import {
  Layout,
  Section,
  SectionProps,
  layoutField,
  sectionDefaults,
  sectionFields,
} from "./Section";
import { SectionHeader } from "./SectionHeader";

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
    const split = layout === "split";

    return (
      <Section background={background} backdrop={backdrop} padding={padding}>
        <SimpleGrid
          columns={{ base: 1, lg: split ? 2 : 1 }}
          gap="16"
          alignItems="start"
        >
          <SectionHeader
            center={!split}
            title={title}
            description={description}
            buttons={buttons}
          />
          <SimpleGrid
            columns={{ base: 2, md: split ? 2 : Math.min(items.length, 4) }}
            columnGap="6"
          >
            {items.map((item, i) => (
              <Stack
                key={i}
                direction="column-reverse"
                gap="2"
                py="6"
                borderTopWidth="1px"
                borderColor="currentColor/15"
                textAlign={split ? "start" : "center"}
              >
                <Text
                  fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                  fontWeight="extrabold"
                  letterSpacing="tighter"
                  lineHeight="1"
                >
                  {item.value}
                </Text>
                <Text fontWeight="medium" color="currentColor/70">
                  {item.label}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        </SimpleGrid>
      </Section>
    );
  },
};

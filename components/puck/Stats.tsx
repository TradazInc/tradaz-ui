import { SimpleGrid, Stat } from "@chakra-ui/react";
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

const columns = { split: 2, centered: 1 };
const statColumns = { split: 2, centered: 4 };
const alignments = { split: "start", centered: "center" } as const;

export const Stats: ComponentConfig<StatsProps> = {
  fields: {
    layout: layoutField,
    title: { type: "text", contentEditable: true },
    description: { type: "textarea", contentEditable: true },
    items: {
      type: "array",
      getItemSummary: (item) => item.label,
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
  }) => (
    <Section background={background} backdrop={backdrop} padding={padding}>
      <SimpleGrid columns={{ base: 1, lg: columns[layout] }} gap="12">
        <SectionHeader
          align={alignments[layout]}
          title={title}
          description={description}
          buttons={buttons}
        />
        <SimpleGrid columns={{ base: 2, md: statColumns[layout] }} gap="6">
          {items.map((item, index) => (
            <Stat.Root key={index} size="lg" borderTopWidth="1px" pt="6">
              <Stat.Label>{item.label}</Stat.Label>
              <Stat.ValueText fontSize="5xl">{item.value}</Stat.ValueText>
            </Stat.Root>
          ))}
        </SimpleGrid>
      </SimpleGrid>
    </Section>
  ),
};

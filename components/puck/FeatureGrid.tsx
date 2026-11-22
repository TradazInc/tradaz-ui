import { Grid, Stack } from "@chakra-ui/react";
import type { ComponentConfig, Slot } from "@puckeditor/core";
import type { CardMode } from "./Card";
import { ButtonItem, Buttons, buttonsField } from "./Buttons";
import {
  Section,
  SectionProps,
  sectionDefaults,
  sectionFields,
} from "./Section";
import { SectionHeader } from "./SectionHeader";

export interface FeatureGridProps extends SectionProps {
  title: string;
  description: string;
  columns: number;
  cardMode: CardMode;
  cards: Slot;
  buttons: ButtonItem[];
}

export const FeatureGrid: ComponentConfig<FeatureGridProps> = {
  fields: {
    title: { type: "text", contentEditable: true },
    description: { type: "textarea", contentEditable: true },
    columns: { type: "number", min: 1, max: 4 },
    cardMode: {
      type: "radio",
      options: [
        { label: "Flat", value: "flat" },
        { label: "Card", value: "card" },
      ],
    },
    cards: { type: "slot", allow: ["Card"] },
    buttons: buttonsField,
    ...sectionFields,
  },
  defaultProps: {
    ...sectionDefaults,
    title: "Features",
    description: "What makes this great.",
    columns: 3,
    cardMode: "flat",
    cards: [],
    buttons: [],
  },
  // Changing the grid's card mode applies it to every card inside it.
  resolveData: ({ props }, { changed }) => {
    if (!changed.cardMode) return { props };

    return {
      props: {
        ...props,
        cards: props.cards.map((card) => ({
          ...card,
          props: { ...card.props, mode: props.cardMode },
        })),
      },
    };
  },
  render: ({
    background,
    backdrop,
    padding,
    title,
    description,
    columns,
    cards: Cards,
    buttons,
  }) => (
    <Section background={background} backdrop={backdrop} padding={padding}>
      <Stack gap="14">
        <SectionHeader center title={title} description={description} />
        <Cards
          as={Grid}
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: `repeat(${columns}, 1fr)`,
          }}
          gap="6"
        />
        <Buttons buttons={buttons} justify="center" />
      </Stack>
    </Section>
  ),
};

import { Grid, Heading, Stack, Text } from "@chakra-ui/react";
import type { ComponentConfig, Slot } from "@puckeditor/core";
import type { CardMode } from "./Card";
import {
  ButtonItem,
  Buttons,
  Section,
  SectionProps,
  buttonsField,
  mutedColor,
  sectionDefaults,
  sectionFields,
} from "./shared";

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
      <Stack gap={{ base: 10, md: 16 }}>
        <Stack gap="4" maxW="2xl">
          <Heading as="h2" size={{ base: "3xl", md: "4xl" }}>
            {title}
          </Heading>
          <Text fontSize="lg" color={mutedColor(background)}>
            {description}
          </Text>
        </Stack>
        <Cards
          as={Grid}
          templateColumns={{
            base: "1fr",
            md: `repeat(${Math.min(columns, 2)}, minmax(0, 1fr))`,
            lg: `repeat(${columns}, minmax(0, 1fr))`,
          }}
          gap={{ base: 8, md: 10 }}
          minHeight="80px"
        />
        <Buttons buttons={buttons} background={background} />
      </Stack>
    </Section>
  ),
};

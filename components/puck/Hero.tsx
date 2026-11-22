import { Image, Show, SimpleGrid } from "@chakra-ui/react";
import type { ComponentConfig, RichText, Slot } from "@puckeditor/core";
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

export interface HeroProps extends SectionProps {
  layout: Layout;
  eyebrow: string;
  title: string;
  description: RichText;
  buttons: ButtonItem[];
  image: {
    source: { src: string; alt: string };
    mode: "image" | "custom" | "none";
    content: Slot;
  };
}

const columns = { split: 2, centered: 1 };
const alignments = { split: "start", centered: "center" } as const;

export const Hero: ComponentConfig<HeroProps> = {
  fields: {
    layout: layoutField,
    eyebrow: { type: "text", contentEditable: true },
    title: { type: "text", contentEditable: true },
    description: { type: "richtext" },
    buttons: buttonsField,
    image: {
      type: "object",
      collapsible: true,
      objectFields: {
        mode: {
          type: "radio",
          options: [
            { label: "Image", value: "image" },
            { label: "Custom", value: "custom" },
            { label: "None", value: "none" },
          ],
        },
        source: {
          type: "object",
          objectFields: {
            src: { type: "text" },
            alt: { type: "text" },
          },
        },
        content: { type: "slot" },
      },
    },
    ...sectionFields,
  },
  defaultProps: {
    ...sectionDefaults,
    layout: "split",
    eyebrow: "Eyebrow",
    title: "Hero title",
    description: "<p>Describe what this page is about.</p>",
    buttons: [{ label: "Get started", href: "#", variant: "primary" }],
    image: { mode: "none", source: { src: "", alt: "" }, content: [] },
  },
  render: ({
    layout,
    background,
    backdrop,
    padding,
    eyebrow,
    title,
    description,
    buttons,
    image,
  }) => {
    const Content = image.content;

    return (
      <Section background={background} backdrop={backdrop} padding={padding}>
        <SimpleGrid
          columns={{ base: 1, lg: columns[layout] }}
          gap="12"
          alignItems="center"
        >
          <SectionHeader
            variant="page"
            align={alignments[layout]}
            eyebrow={eyebrow}
            title={title}
            description={description}
            buttons={buttons}
          />
          <Show when={image.mode === "image"}>
            <Image
              src={image.source.src}
              alt={image.source.alt}
              aspectRatio="landscape"
              rounded="l3"
              shadow="lg"
            />
          </Show>
          <Show when={image.mode === "custom"}>
            <Content />
          </Show>
        </SimpleGrid>
      </Section>
    );
  },
};

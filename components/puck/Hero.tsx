import { Box, Image, SimpleGrid, Stack } from "@chakra-ui/react";
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
    const split = layout === "split";
    const Content = image?.content;

    const media =
      image?.mode === "image" && image.source?.src ? (
        <Image
          src={image.source.src}
          alt={image.source.alt}
          width="full"
          aspectRatio={split ? 4 / 3 : 16 / 9}
          objectFit="cover"
          rounded="2xl"
          shadow="2xl"
        />
      ) : image?.mode === "custom" && Content ? (
        <Content as={Box} width="full" rounded="2xl" />
      ) : null;

    return (
      <Section background={background} backdrop={backdrop} padding={padding}>
        <Stack
          as={split ? SimpleGrid : undefined}
          columns={{ base: 1, lg: 2 }}
          gap={{ base: 12, lg: split ? 16 : 12 }}
          alignItems="center"
        >
          <SectionHeader
            display
            center={!split}
            eyebrow={eyebrow}
            title={title}
            description={description}
            buttons={buttons}
          />
          {media}
        </Stack>
      </Section>
    );
  },
};

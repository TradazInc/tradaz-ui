import { Box, Image, SimpleGrid, Stack, Text, Heading } from "@chakra-ui/react";
import type { ComponentConfig, RichText, Slot } from "@puckeditor/core";
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
    const centered = layout === "centered";
    const Content = image?.content;
    const hasMedia =
      (image?.mode === "image" && image.source?.src) ||
      image?.mode === "custom";

    const text = (
      <Stack
        gap="6"
        align={centered ? "center" : "flex-start"}
        textAlign={centered ? "center" : "start"}
        maxW={centered ? "3xl" : undefined}
        mx={centered ? "auto" : undefined}
      >
        {eyebrow && (
          <Text
            fontSize="sm"
            fontWeight="semibold"
            letterSpacing="wider"
            textTransform="uppercase"
            color={mutedColor(background)}
          >
            {eyebrow}
          </Text>
        )}
        <Heading as="h1" size={{ base: "4xl", md: "6xl" }} lineHeight="1.1">
          {title}
        </Heading>
        <Box fontSize={{ base: "md", md: "lg" }} color={mutedColor(background)}>
          {description}
        </Box>
        <Buttons
          buttons={buttons}
          background={background}
          justify={centered ? "center" : "flex-start"}
        />
      </Stack>
    );

    const media = hasMedia ? (
      image.mode === "image" ? (
        <Image
          src={image.source.src}
          alt={image.source.alt}
          width="full"
          height={{ base: "280px", md: "460px" }}
          objectFit="cover"
          rounded="2xl"
        />
      ) : (
        Content && <Content as={Box} minHeight="120px" />
      )
    ) : null;

    return (
      <Section background={background} backdrop={backdrop} padding={padding}>
        {centered || !media ? (
          <Stack gap="12">
            {text}
            {media}
          </Stack>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="12" alignItems="center">
            {text}
            {media}
          </SimpleGrid>
        )}
      </Section>
    );
  },
};

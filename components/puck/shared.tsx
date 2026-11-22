import { Box, Button, Container, HStack, Link } from "@chakra-ui/react";
import type { Fields } from "@puckeditor/core";
import type { ReactNode } from "react";

/* Section: background / backdrop / padding shared by every block */

export type Background = "default" | "subtle" | "inverse";
export type Backdrop = "none" | "grid" | "dots";
export type Padding = "0px" | "32px" | "64px" | "96px" | "128px" | "160px";
export type Layout = "split" | "centered";

export interface SectionProps {
  background: Background;
  backdrop: Backdrop;
  padding: Padding;
}

const paddingOptions: Padding[] = [
  "0px",
  "32px",
  "64px",
  "96px",
  "128px",
  "160px",
];

export const sectionFields: Fields<SectionProps> = {
  background: {
    type: "select",
    options: [
      { label: "Default", value: "default" },
      { label: "Subtle", value: "subtle" },
      { label: "Inverse", value: "inverse" },
    ],
  },
  backdrop: {
    type: "select",
    options: [
      { label: "None", value: "none" },
      { label: "Grid", value: "grid" },
      { label: "Dots", value: "dots" },
    ],
  },
  padding: {
    type: "select",
    options: paddingOptions.map((value) => ({ label: value, value })),
  },
};

export const sectionDefaults: SectionProps = {
  background: "default",
  backdrop: "none",
  padding: "96px",
};

export const layoutField = {
  type: "radio",
  options: [
    { label: "Split", value: "split" },
    { label: "Centered", value: "centered" },
  ],
} as const;

const surfaces: Record<Background, { bg: string; color: string }> = {
  default: { bg: "bg", color: "fg" },
  subtle: { bg: "bg.subtle", color: "fg" },
  inverse: { bg: "bg.inverted", color: "fg.inverted" },
};

/** Secondary text colour that stays legible on every background. */
export const mutedColor = (background: Background) =>
  background === "inverse" ? "fg.inverted/70" : "fg.muted";

const backdrops: Record<Exclude<Backdrop, "none">, string> = {
  grid: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
  dots: "radial-gradient(currentColor 1px, transparent 1px)",
};

export function Section({
  background,
  backdrop,
  padding,
  children,
}: SectionProps & { children: ReactNode }) {
  const surface = surfaces[background] ?? surfaces.default;
  // Scale padding down on small screens so 160px doesn't swallow mobile.
  const py = { base: `calc(${padding} / 2)`, md: padding };

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      width="full"
      bg={surface.bg}
      color={surface.color}
    >
      {backdrop !== "none" && backdrops[backdrop] && (
        <Box
          aria-hidden
          position="absolute"
          inset="0"
          pointerEvents="none"
          opacity={0.08}
          style={{
            backgroundImage: backdrops[backdrop],
            backgroundSize: backdrop === "grid" ? "48px 48px" : "20px 20px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      )}
      <Container position="relative" maxW="7xl" py={py} px={{ base: 4, md: 8 }}>
        {children}
      </Container>
    </Box>
  );
}

/* Buttons */

export interface ButtonItem {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export const buttonsField: Fields<{ buttons: ButtonItem[] }>["buttons"] = {
  type: "array",
  getItemSummary: (item) => item.label || "Button",
  defaultItemProps: { label: "Button", href: "#", variant: "primary" },
  arrayFields: {
    label: { type: "text" },
    href: { type: "text" },
    variant: {
      type: "radio",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
      ],
    },
  },
};

export function Buttons({
  buttons,
  background,
  justify = "flex-start",
}: {
  buttons?: ButtonItem[];
  background: Background;
  justify?: "flex-start" | "center";
}) {
  if (!buttons?.length) return null;
  const inverse = background === "inverse";

  return (
    <HStack gap="3" wrap="wrap" justify={justify}>
      {buttons.map((button, i) => {
        const primary = button.variant !== "secondary";
        return (
          <Button
            key={i}
            asChild
            size="lg"
            variant={primary ? "solid" : "outline"}
            {...(inverse &&
              (primary
                ? { bg: "bg", color: "fg", _hover: { bg: "bg.muted" } }
                : {
                    color: "fg.inverted",
                    borderColor: "fg.inverted/40",
                    _hover: { bg: "fg.inverted/10" },
                  }))}
          >
            <Link href={button.href} textDecoration="none">
              {button.label}
            </Link>
          </Button>
        );
      })}
    </HStack>
  );
}

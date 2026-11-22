import { Box, Container } from "@chakra-ui/react";
import type { Fields } from "@puckeditor/core";
import type { ReactNode } from "react";

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

// `--accent` / `--on-accent` drive buttons and card icons, flipping on inverse.
const fg = "var(--chakra-colors-fg)";
const bg = "var(--chakra-colors-bg)";
export const surfaces = {
  default: {
    bg: "bg",
    color: "fg",
    css: { "--accent": fg, "--on-accent": bg },
  },
  subtle: {
    bg: "bg.subtle",
    color: "fg",
    css: { "--accent": fg, "--on-accent": bg },
  },
  inverse: {
    bg: "bg.inverted",
    color: "fg.inverted",
    css: { "--accent": bg, "--on-accent": fg },
  },
} satisfies Record<Background, object>;

const line = "color-mix(in srgb, currentColor 8%, transparent)";
const backdrops = {
  grid: {
    bgImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(${line} 1px, transparent 1px)`,
    bgSize: "56px 56px",
  },
  dots: {
    bgImage: `radial-gradient(${line} 1.5px, transparent 1.5px)`,
    bgSize: "24px 24px",
  },
};

export function Section({
  background,
  backdrop,
  padding,
  children,
}: SectionProps & { children: ReactNode }) {
  return (
    <Box
      as="section"
      position="relative"
      isolation="isolate"
      width="full"
      // Shrinks with the viewport, but never below 80px (or above `padding`).
      py={`min(${padding}, max(80px, 11vw))`}
      {...(surfaces[background] ?? surfaces.default)}
      _before={
        backdrop !== "none"
          ? {
              content: '""',
              position: "absolute",
              inset: "0",
              zIndex: -1,
              pointerEvents: "none",
              backgroundPosition: "center",
              maskImage: "radial-gradient(farthest-side, black, transparent)",
              ...backdrops[backdrop],
            }
          : undefined
      }
    >
      <Container maxW="7xl" px={{ base: 4, md: 6 }}>
        {children}
      </Container>
    </Box>
  );
}

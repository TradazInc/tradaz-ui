import { Container, Theme, ThemeProps } from "@chakra-ui/react";
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

const paddings: Padding[] = ["0px", "32px", "64px", "96px", "128px", "160px"];

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
    options: paddings.map((value) => ({ label: value, value })),
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

// "inverse" renders the section in dark mode, so every Chakra component inside adapts.
const themes: Record<Background, ThemeProps> = {
  default: { bg: "bg" },
  subtle: { bg: "bg.subtle" },
  inverse: { appearance: "dark" },
};

const backdrops: Record<Backdrop, ThemeProps> = {
  none: {},
  grid: {
    bgImage:
      "linear-gradient(to right, {colors.border} 1px, transparent 1px), linear-gradient({colors.border} 1px, transparent 1px)",
    bgSize: "48px 48px",
  },
  dots: {
    bgImage: "radial-gradient({colors.border} 1px, transparent 1px)",
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
    <Theme
      as="section"
      width="full"
      py={{ base: `calc(${padding} / 2)`, md: padding }}
      {...themes[background]}
      {...backdrops[backdrop]}
    >
      <Container
        maxW="6xl"
        animationName="fade-in, slide-from-bottom"
        animationDuration="slowest"
      >
        {children}
      </Container>
    </Theme>
  );
}

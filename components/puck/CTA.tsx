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

export interface CTAProps extends SectionProps {
  layout: Layout;
  title: string;
  description: string;
  buttons: ButtonItem[];
}

export const CTA: ComponentConfig<CTAProps> = {
  fields: {
    layout: layoutField,
    title: { type: "text", contentEditable: true },
    description: { type: "textarea", contentEditable: true },
    buttons: buttonsField,
    ...sectionFields,
  },
  defaultProps: {
    ...sectionDefaults,
    layout: "centered",
    title: "Get started",
    description: "Ready when you are.",
    buttons: [{ label: "Get started", href: "#", variant: "primary" }],
  },
  render: ({ layout, background, backdrop, padding, title, description, buttons }) => (
    <Section background={background} backdrop={backdrop} padding={padding}>
      <SectionHeader
        center={layout === "centered"}
        title={title}
        description={description}
        buttons={buttons}
      />
    </Section>
  ),
};

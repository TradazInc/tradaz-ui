import { Button, HStack } from "@chakra-ui/react";
import type { Fields } from "@puckeditor/core";

export interface ButtonItem {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export const buttonsField: Fields<{ buttons: ButtonItem[] }>["buttons"] = {
  type: "array",
  getItemSummary: (item) => item.label,
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

const variants = { primary: "solid", secondary: "outline" } as const;

interface ButtonsProps {
  buttons?: ButtonItem[];
  justify?: "start" | "center";
}

export function Buttons({ buttons = [], justify = "start" }: ButtonsProps) {
  return (
    <HStack gap="3" wrap="wrap" justify={justify}>
      {buttons.map((button, index) => (
        <Button key={index} asChild size="lg" variant={variants[button.variant]}>
          <a href={button.href}>{button.label}</a>
        </Button>
      ))}
    </HStack>
  );
}

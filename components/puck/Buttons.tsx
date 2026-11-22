import { Button, HStack, Link } from "@chakra-ui/react";
import type { Fields } from "@puckeditor/core";
import { LuArrowRight } from "react-icons/lu";

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
  justify = "flex-start",
}: {
  buttons?: ButtonItem[];
  justify?: "flex-start" | "center";
}) {
  if (!buttons?.length) return null;

  return (
    <HStack gap="3" mt="3" wrap="wrap" justify={justify}>
      {buttons.map((button, i) => {
        const primary = button.variant !== "secondary";
        return (
          <Button
            key={i}
            asChild
            size="xl"
            rounded="lg"
            fontWeight="semibold"
            {...(primary
              ? {
                  bg: "var(--accent)",
                  color: "var(--on-accent)",
                  _hover: { opacity: 0.85 },
                }
              : {
                  variant: "outline",
                  color: "inherit",
                  borderColor: "currentColor/20",
                  _hover: {
                    bg: "currentColor/5",
                    borderColor: "currentColor/40",
                  },
                })}
          >
            <Link href={button.href} textDecoration="none">
              {button.label}
              {primary && <LuArrowRight />}
            </Link>
          </Button>
        );
      })}
    </HStack>
  );
}

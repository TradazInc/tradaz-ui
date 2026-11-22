import { Card as ChakraCard, Center, GridItem, Icon } from "@chakra-ui/react";
import type { ComponentConfig } from "@puckeditor/core";
import {
  LuBookOpen,
  LuCloud,
  LuGitMerge,
  LuGithub,
  LuLock,
  LuPenTool,
  LuSparkles,
  LuStar,
  LuUsers,
  LuZap,
} from "react-icons/lu";

export const cardIcons = {
  "git-merge": LuGitMerge,
  "pen-tool": LuPenTool,
  github: LuGithub,
  sparkles: LuSparkles,
  lock: LuLock,
  cloud: LuCloud,
  users: LuUsers,
  "book-open": LuBookOpen,
  star: LuStar,
  zap: LuZap,
};

export type CardIcon = keyof typeof cardIcons;
export type CardMode = "flat" | "card";

export interface CardProps {
  title: string;
  description: string;
  icon: CardIcon;
  mode: CardMode;
  layout: { spanCol: number; spanRow: number; padding: string };
}

const variants = { flat: "subtle", card: "elevated" } as const;

export const Card: ComponentConfig<CardProps> = {
  fields: {
    title: { type: "text", contentEditable: true },
    description: { type: "textarea", contentEditable: true },
    icon: {
      type: "select",
      options: Object.keys(cardIcons).map((value) => ({ label: value, value })),
    },
    mode: {
      type: "radio",
      options: [
        { label: "Flat", value: "flat" },
        { label: "Card", value: "card" },
      ],
    },
    layout: {
      type: "object",
      collapsible: true,
      objectFields: {
        spanCol: { type: "number", min: 1, max: 4 },
        spanRow: { type: "number", min: 1, max: 4 },
        padding: { type: "text" },
      },
    },
  },
  defaultProps: {
    title: "Feature",
    description: "Describe this feature.",
    icon: "sparkles",
    mode: "flat",
    layout: { spanCol: 1, spanRow: 1, padding: "0px" },
  },
  render: ({ title, description, icon, mode, layout }) => {
    const CardIcon = cardIcons[icon];

    return (
      <GridItem
        colSpan={{ base: 1, md: layout.spanCol }}
        rowSpan={layout.spanRow}
        py={layout.padding}
      >
        <ChakraCard.Root
          variant={variants[mode]}
          height="full"
          transition="transform 0.2s"
          _hover={{ transform: "translateY(-4px)" }}
        >
          <ChakraCard.Body gap="3">
            <Center boxSize="12" rounded="l2" bg="bg.emphasized">
              <Icon boxSize="6">
                <CardIcon />
              </Icon>
            </Center>
            <ChakraCard.Title mt="2">{title}</ChakraCard.Title>
            <ChakraCard.Description>{description}</ChakraCard.Description>
          </ChakraCard.Body>
        </ChakraCard.Root>
      </GridItem>
    );
  },
};

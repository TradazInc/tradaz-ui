import { Flex, GridItem, Icon, Stack, Text } from "@chakra-ui/react";
import type { ComponentConfig } from "@puckeditor/core";
import type { IconType } from "react-icons";
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
import { surfaces } from "./Section";

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
} satisfies Record<string, IconType>;

export type CardIcon = keyof typeof cardIcons;
export type CardMode = "flat" | "card";

export interface CardProps {
  title: string;
  description: string;
  icon: CardIcon;
  mode: CardMode;
  layout: {
    grow: boolean;
    spanCol: number;
    spanRow: number;
    padding: string;
  };
}

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
        grow: {
          type: "radio",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false },
          ],
        },
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
    layout: { grow: true, spanCol: 1, spanRow: 1, padding: "0px" },
  },
  render: ({ title, description, icon, mode, layout }) => {
    const isCard = mode === "card";
    const CardIcon = cardIcons[icon] ?? LuSparkles;

    return (
      <GridItem
        colSpan={{ base: 1, md: layout?.spanCol ?? 1 }}
        rowSpan={layout?.spanRow ?? 1}
        py={layout?.padding}
      >
        <Stack
          gap="2"
          height="full"
          {...(isCard
            ? {
                ...surfaces.default,
                bg: "bg.panel",
                p: "8",
                rounded: "2xl",
                borderWidth: "1px",
                transition: "all 0.2s",
                _hover: {
                  transform: "translateY(-4px)",
                  shadow: "xl",
                  borderColor: "border.emphasized",
                },
              }
            : { align: "center", textAlign: "center" })}
        >
          <Flex
            boxSize="12"
            mb="4"
            align="center"
            justify="center"
            rounded="xl"
            bg="var(--accent)"
            color="var(--on-accent)"
          >
            <Icon boxSize="6">
              <CardIcon />
            </Icon>
          </Flex>
          <Text
            fontSize="xl"
            fontWeight="bold"
            lineHeight="short"
            letterSpacing="tight"
          >
            {title}
          </Text>
          <Text color="currentColor/70">{description}</Text>
        </Stack>
      </GridItem>
    );
  },
};

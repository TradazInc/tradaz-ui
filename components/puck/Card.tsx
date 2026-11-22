import { Box, GridItem, Heading, Icon, Stack, Text } from "@chakra-ui/react";
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
    const IconComponent = cardIcons[icon] ?? LuSparkles;
    const isCard = mode === "card";

    return (
      <GridItem
        colSpan={{ base: 1, md: layout?.spanCol ?? 1 }}
        rowSpan={layout?.spanRow ?? 1}
        height={layout?.grow ? "full" : undefined}
        p={layout?.padding}
      >
        <Stack
          gap="4"
          height={layout?.grow ? "full" : undefined}
          {...(isCard && {
            p: "6",
            rounded: "xl",
            borderWidth: "1px",
            bg: "bg.panel",
            color: "fg",
            shadow: "xs",
          })}
        >
          <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            boxSize="10"
            rounded="lg"
            borderWidth="1px"
            borderColor="currentColor/20"
          >
            <Icon as={IconComponent} boxSize="5" />
          </Box>
          <Heading as="h3" size="md">
            {title}
          </Heading>
          <Text color={isCard ? "fg.muted" : "currentColor/70"}>
            {description}
          </Text>
        </Stack>
      </GridItem>
    );
  },
};

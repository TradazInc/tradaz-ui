"use client";

import { PERMISSION_VISIBLE_COUNT } from "@/data/constants";
import { humanizeText } from "@/utilities/humanizeText";
import { Badge, Button, Wrap } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  permission: Record<string, readonly string[]>;
}

const PermissionBadges = ({ permission }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const entries = Object.entries(permission);
  const visible = expanded
    ? entries
    : entries.slice(0, PERMISSION_VISIBLE_COUNT);
  const hiddenCount = entries.length - PERMISSION_VISIBLE_COUNT;

  return (
    <Wrap gap={1} align={"center"}>
      {visible.map(([resource, actions]) => (
        <Badge key={resource} variant={"subtle"}>
          {humanizeText(resource)}: {actions.map(humanizeText).join(", ")}
        </Badge>
      ))}
      {hiddenCount > 0 && (
        <Button
          size={"2xs"}
          variant={"ghost"}
          aria-expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show less" : `+${hiddenCount} more`}
        </Button>
      )}
    </Wrap>
  );
};

export default PermissionBadges;

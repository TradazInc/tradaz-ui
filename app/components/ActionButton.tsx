"use client";

import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
interface ActionButtonProps extends Omit<ButtonProps, "variant"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export const ActionButton = ({
  variant = "primary",
  ...props
}: ActionButtonProps) => {
  const styles = {
    primary: {
      bg: "white",
      color: "black",
      border: "none",
      _hover: { bg: "gray.200" },
    },
    secondary: {
      bg: "#111111",
      color: "white",
      border: "1px solid #1A1A1A",
      _hover: { bg: "#1A1A1A" },
    },
    outline: {
      bg: "#0A0A0A",
      color: "white",
      border: "1px solid #1A1A1A",
      _hover: { bg: "#111111" },
    },
    ghost: {
      bg: "transparent",
      color: "gray.400",
      border: "none",
      _hover: { bg: "#111111", color: "white" },
    },
  };

  return (
    <Button
      rounded="md"
      fontWeight="bold"
      transition="all 0.2s"
      {...styles[variant]}
      {...props}
    />
  );
};

import type { SystemStyleObject } from "@chakra-ui/react";

export const controlStyles: SystemStyleObject = {
  bg: "#0A0A0A",
  border: "1px solid",
  borderColor: "#333333",
  color: "white",
  h: "44px",
  rounded: "none",
  px: 4,
  _focus: { outline: "none", borderColor: "white" },
  _hover: { bg: "#111111" },
  _placeholder: { color: "#555555" },
};

export const labelStyles: SystemStyleObject = {
  color: "#888888",
  fontSize: "10px",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "wider",
  mb: 2,
  display: "block",
};
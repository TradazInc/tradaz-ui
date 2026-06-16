// app/overwatch/users/constants.ts

import React from "react";
import { LuUsers, LuUser, LuStore, LuShieldAlert } from "react-icons/lu";

export const USER_KPIs = [
  { label: "Total Platform Users", value: "48,312", trend: "+1,240 this month", icon: LuUsers, iconColor: "blue.400" },
  { label: "Active Buyers", value: "45,102", trend: "93% of base", icon: LuUser, iconColor: "#888888" },
  { label: "Verified Merchants", value: "3,185", trend: "+42 this week", icon: LuStore, iconColor: "#5cac7d" },
  { label: "Restricted Accounts", value: "25", trend: "System flagged", icon: LuShieldAlert, iconColor: "red.400" },
];

export const controlStyles = {
  bg: "#0A0A0A",
  border: "1px solid",
  borderColor: "#333333",
  color: "white",
  h: "44px",
  rounded: "none",
  px: 3,
  _focus: { outline: "none", borderColor: "white" },
  _hover: { bg: "#111111" },
};

export const nativeSelectStyle: React.CSSProperties = {
  backgroundColor: "#0A0A0A",
  color: "white",
  height: "44px",
  borderRadius: "0px",
  padding: "0 12px",
  border: "1px solid #333333",
  outline: "none",
  cursor: "pointer",
  fontSize: "14px",
  minWidth: "160px",
};

export const labelStyles = {
  color: "#888888",
  fontSize: "10px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  letterSpacing: "wider",
  mb: 2,
  display: "block",
};

export const dangerButtonStyle = {
  w: "full",
  h: "40px",
  rounded: "none",
  fontSize: "sm",
  fontWeight: "bold",
  border: "1px solid #333333",
  bg: "#0A0A0A",
  color: "white",
  _hover: { bg: "#111111" },
  display: "flex",
  gap: "2",
};
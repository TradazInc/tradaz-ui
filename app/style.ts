export const inputStyles = {
  bg: "#111111",
  border: "1px solid #333333",
  color: "white",
  rounded: "none",
  h: "44px",
  px: 4,
  _focus: { borderColor: "white", outline: "none" },
  _placeholder: { color: "#555555" },
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

export const customerControlStyles = {
  bg: "#0A0A0A",
  border: "1px solid",
  borderColor: "#1A1A1A",
  color: "white",
  h: "40px",
  px: 3,
  rounded: "none",
  _focus: {
    outline: "none",
    borderColor: "white",
    boxShadow: "0 0 0 1px white",
  },
  _hover: { bg: "#111111" },
};

export const nativeSelectStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#0A0A0A",
  color: "white",
  height: "40px",
  borderRadius: "0px",
  padding: "0 12px",
  border: "1px solid #1A1A1A",
  outline: "none",
  cursor: "pointer",
  fontSize: "14px",
};

import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: { value: "var(--font-raleway), system-ui, sans-serif" },
        heading: { value: "var(--font-space-grotesk), system-ui, sans-serif" },
        mono: { value: "var(--font-raleway), system-ui, sans-serif" },
      },
    },
    recipes: {
      heading: {
        base: {
          fontWeight: "normal",
          textTransform: "uppercase",
        },
      },
    },
  },
  globalCss: {
    "html, body": {
      fontFamily: "body",
      fontWeight: "medium",
    },
    "h1, h2, h3, h4, h5, h6": {
      fontFamily: "heading",
      fontWeight: "normal",
      textTransform: "uppercase",
    },
    /* Force cloudinary iFrame to light mode for transparent canvas */
    'iframe[src^="https://upload-widget.cloudinary.com/"]': {
      colorScheme: "light",
    },
    /* Dark mode for the Puck editor (it has no built-in dark theme). */
    ".dark": {
      "--puck-color-surface": "var(--puck-color-grey-01) !important",
      "--puck-color-surface-subtle": "var(--puck-color-grey-02) !important",
      "--puck-color-surface-muted": "var(--puck-color-grey-03) !important",
      "--puck-color-surface-inverse": "var(--puck-color-grey-12) !important",

      "--puck-color-text": "var(--puck-color-grey-12) !important",
      "--puck-color-text-secondary": "var(--puck-color-grey-08) !important",
      "--puck-color-text-muted": "var(--puck-color-grey-07) !important",
      "--puck-color-text-subtle": "var(--puck-color-grey-06) !important",
      "--puck-color-text-disabled": "var(--puck-color-grey-05) !important",
      "--puck-color-text-inverse": "var(--puck-color-grey-01) !important",

      "--puck-color-border": "var(--puck-color-grey-03) !important",
      "--puck-color-border-muted": "var(--puck-color-grey-02) !important",
      "--puck-color-border-hover": "var(--puck-color-grey-05) !important",
      "--puck-color-border-inverse": "var(--puck-color-grey-08) !important",
      "--puck-color-bg-disabled": "var(--puck-color-grey-03) !important",

      "--puck-color-interactive-neutral-hover":
        "var(--puck-color-grey-03) !important",
      "--puck-color-interactive-subtle":
        "var(--puck-color-azure-02) !important",
      "--puck-color-interactive-soft": "var(--puck-color-azure-02) !important",
      "--puck-color-interactive-soft-hover":
        "var(--puck-color-azure-03) !important",
    },
  },
});

export const system = createSystem(defaultConfig, config);

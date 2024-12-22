import { config } from "@tamagui/config/v3"
import { createFont, createTamagui, createTokens } from "tamagui"

const tokens = createTokens({
  color: {
    black: "#1F1F1F",
    "black-opacity-high": "rgba(31, 31, 31, 0.8)",
    "black-opacity-mid": "rgba(31, 31, 31, 0.32)",
    "black-opacity-low": "rgba(31, 31, 31, 0.12)",
    white: "#FFFFFF",
    "white-opacity-high": "rgba(255, 255, 255, 0.8)",
    "white-opacity-mid": "rgba(255, 255, 255, 0.32)",
    "white-opacity-low": "rgba(255, 255, 255, 0.12)"
  },
  space: {},
  size: {},
  radius: {},
  zIndex: {}
})

const interFont = createFont({
  family: "OpenSauceOne, sans-serif",
  size: {
    "display-large": 36,
    "display-medium": 32,
    "display-small": 26,

    "headline-large": 28,
    "headline-medium": 26,
    "headline-small": 22,

    "title-large": 18,
    "title-medium": 16,
    "title-small": 14,

    "subhead-large": 22,
    "subhead-medium": 18,
    "subhead-small": 16,

    "body-large": 18,
    "body-medium": 16,
    "body-small": 14,

    "body-large-w-medium": 18,
    "body-medium-w-medium": 16,
    "body-small-w-medium": 14,

    "label-large": 12,
    "label-medium": 10,
    "label-small": 8,

    "label-large-w-medium": 12,
    "label-large-w-bold": 12,
    "label-medium-w-medium": 10
  },
  lineHeight: {
    "display-large": 48,
    "display-medium": 40,
    "display-small": 34,

    "headline-large": 36,
    "headline-medium": 32,
    "headline-small": 28,

    "title-large": 24,
    "title-medium": 22,
    "title-small": 20,

    "subhead-large": 26,
    "subhead-medium": 22,
    "subhead-small": 20,

    "body-large": 24,
    "body-medium": 22,
    "body-small": 20,

    "body-large-w-medium": 24,
    "body-medium-w-medium": 22,
    "body-small-w-medium": 20,

    "label-large": 16,
    "label-medium": 14,
    "label-small": 12,

    "label-large-w-medium": 16,
    "label-large-w-bold": 16,
    "label-medium-w-medium": 14
  },
  weight: {
    "display-large": "bold",
    "display-medium": "bold",
    "display-small": "bold",

    "headline-large": "bold",
    "headline-medium": "bold",
    "headline-small": "bold",

    "title-large": "semibold",
    "title-medium": "semibold",
    "title-small": "semibold",

    "subhead-large": "medium",
    "subhead-medium": "medium",
    "subhead-small": "medium",

    "body-large": "regular",
    "body-medium": "regular",
    "body-small": "regular",

    "body-large-w-medium": "medium",
    "body-medium-w-medium": "medium",
    "body-small-w-medium": "medium",

    "label-large": "regular",
    "label-medium": "regular",
    "label-small": "regular",

    "label-large-w-medium": "medium",
    "label-large-w-bold": "bold",
    "label-medium-w-medium": "medium"
  },
  letterSpacing: {
    "display-large": -2,
    "display-medium": -2,
    "display-small": -2,

    "headline-large": -2,
    "headline-medium": -2,
    "headline-small": -2,

    "title-large": -1,
    "title-medium": -1,
    "title-small": -1,

    "subhead-large": -1,
    "subhead-medium": -1,
    "subhead-small": -1,

    "body-large": -1,
    "body-medium": -1,
    "body-small": -1,

    "body-large-w-medium": -1,
    "body-medium-w-medium": -1,
    "body-small-w-medium": -1,

    "label-large": -1,
    "label-medium": -1,
    "label-small": -1,

    "label-large-w-medium": -1,
    "label-large-w-bold": 0,
    "label-medium-w-medium": 0
  },

  face: {
    regular: { normal: "OpenSauceOne-Regular" },
    medium: { normal: "OpenSauceOne-Medium" },
    semibold: { normal: "OpenSauceOne-SemiBold" },
    bold: { normal: "OpenSauceOne-Bold" }
  }
})

export const tamaguiConfig = createTamagui({
  ...config,
  tokens: {
    ...config.tokens,
    color: {
      ...tokens.color
    }
  },
  fonts: {
    heading: interFont,
    body: interFont
  },
  themes: {
    light: {
      "element-high": "#1F1F1F",
      "element-high-opacity-mid": "rgba(255, 255, 255, 0.2)",
      "element-high-opacity-low": "rgba(255, 255, 255, 0.1)",
      "element-mid": "#666666",
      "element-low": "#8F8F8F",
      "element-disabled": "#B8B8B8",

      "outline-accent": "#D6D6D6",
      outline: "#EBEBEB",

      "overlay-accent": "#F0F0F0",
      overlay: "#F7F7F7",

      "surface-accent": "#FAFAFA",
      surface: "#FFFFFF",
      "surface-opacity-low": "rgba(56, 56, 56, 1)",

      "background-accent": "#F5F5F5",
      background: "#FAFAFA"
    },
    dark: {
      "element-high": "#FFFFFF",
      "element-high-opacity-mid": "rgba(31, 31, 31, 0.12)",
      "element-high-opacity-low": "rgba(31, 31, 31, 0.03)",
      "element-mid": "#B8B8B8",
      "element-low": "#858585",
      "element-disabled": "#666666",

      "outline-accent": "#424242",
      outline: "#383838",

      "overlay-accent": "#292929",
      overlay: "#1F1F1F",

      "surface-accent": "#141414",
      surface: "#0A0A0A",
      "surface-opacity-low": "rgba(235, 235, 235, 1)",

      "background-accent": "#050505",
      background: "#000000"
    }
  }
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

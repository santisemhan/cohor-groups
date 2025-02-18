import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        black: "#1F1F1F",
        white: "#FFFFFF",
        success: "#10B981",
        error: "#ED5A46",

        "black-opacity-high": "rgba(31, 31, 31, 0.8)",
        "black-opacity-mid": "rgba(31, 31, 31, 0.32)",
        "black-opacity-low": "rgba(31, 31, 31, 0.12)",
        "white-opacity-high": "rgba(255, 255, 255, 0.8)",
        "white-opacity-mid": "rgba(255, 255, 255, 0.32)",
        "white-opacity-low": "rgba(255, 255, 255, 0.12)",

        "element-high": "#1F1F1F",
        "element-high-opacity-mid": "rgba(31, 31, 31, 0.12)",
        "element-high-opacity-low": "rgba(31, 31, 31, 0.03)",
        "element-mid": "#666666",
        "element-low": "#8F8F8F",
        "element-disabled": "#B8B8B8",
        "outline-accent": "#D6D6D6",
        outline: "#EBEBEB",
        "overlay-accent": "#F0F0F0",
        overlay: "#F7F7F7",
        "surface-accent": "#FAFAFA",
        surface: "#FFFFFF",
        "surface-opacity-low": "rgba(255, 255, 255, 0)",
        "background-accent": "#F5F5F5",
        background: "#FAFAFA",

        dark: {
          "element-high": "#FFFFFF",
          "element-high-opacity-mid": "rgba(255, 255, 255, 0.2)",
          "element-high-opacity-low": "rgba(255, 255, 255, 0.1)",
          "element-mid": "#B8B8B8",
          "element-low": "#858585",
          "element-disabled": "#666666",
          "outline-accent": "#424242",
          outline: "#383838",
          "overlay-accent": "#292929",
          overlay: "#1F1F1F",
          "surface-accent": "#141414",
          surface: "#0A0A0A",
          "surface-opacity-low": "rgba(10, 10, 10, 0)",
          "background-accent": "#050505",
          background: "#000000"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"]
      },
      fontSize: {
        "display-large": ["64px", "72px"],
        "display-medium": ["56px", "64px"],
        "display-small": ["48px", "56px"],

        "headline-large": ["40px", "48px"],
        "headline-medium": ["32px", "40px"],
        "headline-small": ["24px", "32px"],

        "title-large": ["18px", "24px"],
        "title-medium": ["16px", "22px"],
        "title-small": ["14px", "20px"],

        "subhead-large": ["32px", "40px"],
        "subhead-medium": ["24px", "32px"],
        "subhead-small": ["20px", "26px"],

        "body-large": ["18px", "24px"],
        "body-large-w-medium": ["18px", "24px"],
        "body-medium": ["16px", "22px"],
        "body-medium-w-medium": ["16px", "22px"],
        "body-small": ["14px", "20px"],
        "body-small-w-medium": ["14px", "20px"],

        "label-large": ["12px", "16px"],
        "label-large-w-medium": ["12px", "16px"],
        "label-medium": ["10px", "14px"],
        "label-small": ["8px", "12px"],
        "label-medium-w-medium": ["10px", "14px"]
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config

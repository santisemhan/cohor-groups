import clsx from "clsx"
import { ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const fontSizes = [
  "display-large",
  "display-medium",
  "display-small",

  "headline-large",
  "headline-medium",
  "headline-small",

  "title-medium",
  "title-small",
  "title-large",

  "subhead-large",
  "subhead-medium",
  "subhead-small",

  "body-large",
  "body-large-w-medium",
  "body-medium",
  "body-medium-w-medium",
  "body-small",
  "body-small-w-medium",

  "label-large",
  "label-large-w-medium",
  "label-medium",
  "label-small"
]

const customTwMerge = extendTailwindMerge({
  override: {
    classGroups: {
      "font-size": [{ text: fontSizes }]
    }
  }
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}

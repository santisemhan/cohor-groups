import { Button as TamaguiButton, GetProps, styled } from "tamagui"

export const Button = styled(TamaguiButton, {
  unstyled: true,
  borderRadius: 100,
  flexDirection: "row",
  justifyContent: "center",

  paddingVertical: 16,
  paddingHorizontal: 20,
  size: "$title-small",
  fontSize: "$title-small",

  variants: {
    sizing: {
      xlarge: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        fontSize: "$title-medium"
      },
      large: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: "$title-small"
      },
      small: {
        paddingVertical: 7,
        paddingHorizontal: 10,
        fontSize: "$label-large-w-bold"
      }
    },
    type: {
      contained: {
        backgroundColor: "$element-high",
        color: "$surface"
      },
      subtle: {
        backgroundColor: "$element-high-opacity-low",
        borderWidth: 1,
        borderColor: "$element-high-opacity-mid",
        color: "$element-high"
      }
    }
  } as const,

  defaultVariants: {
    sizing: "xlarge",
    type: "contained"
  }
})

export type ButtonProps = GetProps<typeof Button>

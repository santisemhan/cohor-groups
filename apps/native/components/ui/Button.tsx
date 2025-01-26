import { forwardRef } from "react"
import { Button as TamaguiButton, GetProps, styled, Spinner, TamaguiElement } from "tamagui"

const StyledButton = styled(TamaguiButton, {
  unstyled: true,
  borderRadius: 100,
  flexDirection: "row",
  justifyContent: "center",

  paddingVertical: 16,
  paddingHorizontal: 20,
  size: "$title-small",
  fontSize: "$title-small",

  animation: "100ms",
  elevation: "$size.15",
  pressStyle: {
    elevation: "$size.7",
    scale: 0.95
  },

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
    },
    isDisabled: {
      true: {
        backgroundColor: "$overlay-accent",
        color: "$element-disabled"
      }
    }
  } as const,

  defaultVariants: {
    sizing: "xlarge",
    type: "contained",
    isDisabled: false
  }
})

export type ButtonProps = GetProps<typeof StyledButton> & { loading?: boolean }

export const Button = forwardRef<TamaguiElement, ButtonProps>(({ children, loading, ...props }, ref) => {
  return (
    <StyledButton ref={ref} {...props}>
      {loading && !props.isDisabled && (
        <Spinner size="small" color={props.type === "subtle" ? "$element-high" : "$overlay-accent"} />
      )}
      {children}
    </StyledButton>
  )
})

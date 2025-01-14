import { Input as TamaguiInput, GetProps, styled } from "tamagui"

export const Input = styled(TamaguiInput, {
  borderRadius: 100,
  height: 52,
  fontSize: "$body-small",
  variants: {
    hasError: {
      true: {
        borderColor: "$error",
        borderWidth: 2
      }
    }
  }
})

export type ButtonProps = GetProps<typeof Input>

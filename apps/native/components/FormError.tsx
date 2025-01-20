import { SizableText, useTheme, XStack } from "tamagui"
import XCircleIcon from "./icons/XCircle"

interface FormErrorProps {
  message: string
}

export default function FormError({ message }: FormErrorProps) {
  const theme = useTheme()
  return (
    <XStack gap={4} ml={4} alignItems="center">
      <XCircleIcon width={13} height={13} color={theme.error.val} />
      <SizableText color="$error">{message}</SizableText>
    </XStack>
  )
}

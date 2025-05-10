import { ReactNode } from "react"
import { SizableText, Stack, View, ViewProps } from "tamagui"

interface EmptyStateProps extends ViewProps {
  title: string
  subtitle: string
  ilustration: ReactNode
}

export default function EmptyState({ title, subtitle, ilustration, ...props }: EmptyStateProps) {
  return (
    <View
      backgroundColor="$surface"
      borderColor="$outline"
      borderWidth={1}
      borderRadius={12}
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding={40}
      marginHorizontal={12}
      textWrap="pretty"
      gap={24}
      {...props}
    >
      {ilustration}
      <Stack gap={12} maxWidth={480}>
        <SizableText textAlign="center" size="$title-medium" color="$element-high">
          {title}
        </SizableText>
        <SizableText textAlign="center" size="$body-small" color="$element-mid">
          {subtitle}
        </SizableText>
      </Stack>
    </View>
  )
}

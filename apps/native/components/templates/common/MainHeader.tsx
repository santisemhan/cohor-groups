import { SizableText, Stack, View } from "tamagui"

interface MainHeaderProps {
  title: string
  subtitle?: string
}

export default function MainHeader({ title, subtitle }: MainHeaderProps) {
  return (
    <View alignItems="flex-start" backgroundColor="transparent" paddingVertical={24} paddingHorizontal={12}>
      <Stack gap={2}>
        <SizableText textAlign="center" size="$headline-large" color="$element-high">
          {title}
        </SizableText>
        {subtitle && (
          <SizableText textAlign="center" size="$body-small" color="$element-mid">
            {subtitle}
          </SizableText>
        )}
      </Stack>
    </View>
  )
}

import { Avatar, SizableText, useTheme, View, XStack } from "tamagui"
import { router } from "expo-router"
import CaretLeft from "../../icons/CaretLeft"

interface ChatGroupHeaderProps {
  groupName: string
  groupImageUrl: string
}

export default function ChatGroupHeader({ groupName, groupImageUrl }: ChatGroupHeaderProps) {
  const theme = useTheme()
  return (
    <View alignItems="flex-start" backgroundColor="transparent" paddingVertical={24} paddingHorizontal={12}>
      <XStack gap={4} alignItems="center">
        <CaretLeft color={theme["element-low"].val} onPress={() => router.back()} width={20} height={20} />
        <XStack gap={8} alignItems="center">
          <Avatar circular size="$3">
            <Avatar.Image accessibilityLabel={groupName} src={groupImageUrl} />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
          <SizableText textAlign="center" size="$title-large" color="$element-high">
            {groupName}
          </SizableText>
        </XStack>
      </XStack>
    </View>
  )
}

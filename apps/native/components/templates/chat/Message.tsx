import { Avatar, SizableText, View, XStack, YStack } from "tamagui"

interface MessageProps {
  sender?: { name: string; imageUrl: string }
  message: string
}

export default function Message({ sender, message }: MessageProps) {
  return (
    <XStack w="100%" py={8} gap={8}>
      {sender && (
        <Avatar circular size="$2">
          <Avatar.Image accessibilityLabel={sender.name} src={sender.imageUrl} />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
      )}
      <View
        w={!sender ? "100%" : "90%"}
        backgroundColor={!sender ? "$primary" : "$surface-accent"}
        paddingHorizontal={12}
        paddingVertical={8}
        borderEndEndRadius={16}
        borderStartEndRadius={16}
        borderStartStartRadius={!sender ? 16 : 0}
        borderEndStartRadius={!sender ? 0 : 16}
      >
        {!sender ? (
          <>
            <SizableText color="$white" size="$body-small-w-medium">
              {message}
            </SizableText>
            <SizableText
              // position="absolute"
              // bottom={5}
              // right={15}
              color="$white"
              alignSelf="flex-end"
              size="$label-medium-w-medium"
            >
              10:45
            </SizableText>
          </>
        ) : (
          <YStack gap={10}>
            <XStack justifyContent="space-between">
              <SizableText color="$element-high" size="$label-large-w-medium">
                {sender.name}
              </SizableText>
              <SizableText color="$white" alignSelf="flex-end" size="$label-medium-w-medium">
                10:45
              </SizableText>
            </XStack>
            <SizableText color="$element-mid" size="$body-small-w-medium">
              {message}
            </SizableText>
          </YStack>
        )}
      </View>
    </XStack>
  )
}

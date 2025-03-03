import { Avatar, SizableText, useTheme, XStack, YStack } from "tamagui"
import HearthIcon from "../../icons/Hearth"
import { router } from "expo-router"

interface ChatPreviewProps {
  id: string
  newMessage: boolean
  groupName: string
  groupImageUrl: string
  username?: string
  lastMessage?: string
}

export default function ChatPreview({
  id,
  newMessage,
  groupName,
  groupImageUrl,
  username,
  lastMessage
}: ChatPreviewProps) {
  const theme = useTheme()

  return (
    <XStack
      gap={8}
      padding="$3"
      borderBottomWidth={1}
      borderBottomColor="$white-opacity-low"
      onPress={() =>
        router.push({
          pathname: `app/chats/${id}`,
          params: { groupName, groupImageUrl }
        })
      }
    >
      <Avatar circular size="$4">
        <Avatar.Image accessibilityLabel={groupName} src={groupImageUrl} />
        <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>
      <YStack gap={2} w="87%">
        <XStack justifyContent="space-between">
          <SizableText color="$element-high" size="$title-small">
            {groupName}
          </SizableText>
          <SizableText color="$element-mid" size="$body-small">
            10:45
          </SizableText>
        </XStack>
        {lastMessage ? (
          <XStack>
            <SizableText color="$element-mid" size="$body-small-w-medium">
              {username}:{" "}
            </SizableText>
            <SizableText color="$element-mid" size="$body-small" numberOfLines={1} ellipsizeMode="tail" w="75%">
              {lastMessage}
            </SizableText>
            {newMessage && (
              <SizableText color="$primary" scale={1.5}>
                &#9679;
              </SizableText>
            )}
          </XStack>
        ) : (
          <XStack gap={4} alignItems="center">
            <HearthIcon color={theme.primary.val} width={15} height={15} />
            <SizableText alignItems="center" color="$primary" size="$body-small">
              Match Reciente
            </SizableText>
          </XStack>
        )}
      </YStack>
    </XStack>
  )
}

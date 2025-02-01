import { SwippeableGroup } from "@cohor/types"
import { Avatar, Image, SizableText, useTheme, View, XStack, YStack } from "tamagui"
import Gradient from "../../ui/Gradient"
import { BlurView } from "expo-blur"
import XIcon from "../../icons/X"
import HearthIcon from "../../icons/Hearth"
import CaretDobleRightIcon from "../../icons/CaretDobleRight"
import CaretDobleLeftIcon from "../../icons/CaretDobleLeft"

export default function Card({ group }: { group: SwippeableGroup }) {
  const theme = useTheme()
  return (
    <View position="absolute" width="100%" height="100%" borderRadius={10} overflow="hidden">
      <Image src={group.imageUrl} alt={group.name} objectFit="cover" width="100%" height="100%" />

      <View position="absolute" bottom={0} left={0} right={0} height="50%" zIndex={1}>
        <Gradient fromColor="rgba(0,0,0,0)" toColor="rgba(0, 0, 0, 0)" height="100%" opacityColor1={0} />
      </View>

      <View position="absolute" top={-10} left={0} right={0} height="20%" zIndex={1} rotate="180deg">
        <Gradient fromColor="rgba(0,0,0,0)" toColor="rgba(0, 0, 0, 0)" height="100%" opacityColor1={0} />
      </View>

      <View position="absolute" bottom={0} left={0} right={0} justifyContent="center" alignItems="center" zIndex={2}>
        <YStack gap={8}>
          <SizableText color="$white" size="$display-small" textAlign="center">
            {group.name}
          </SizableText>
          <SizableText color="$white-opacity-high" size="$body-small-w-medium" textAlign="center">
            {group.presentation}
          </SizableText>
        </YStack>
        <XStack alignItems="center" gap="$4" marginTop={12}>
          <XStack position="relative" width={50} height={24}>
            {group.members.slice(0, 3).map((member, index) => (
              <Avatar
                key={member.id}
                circular
                size="$2"
                position="absolute"
                left={index * 17}
                zIndex={3 - index}
                borderColor={"$white-opacity-low"}
                borderWidth={1}
              >
                <Avatar.Image accessibilityLabel={member.name} src={member.imageUrl} />
                <Avatar.Fallback backgroundColor="$blue10" />
              </Avatar>
            ))}
          </XStack>
          <SizableText size="$label-large-w-medium" color="$white-opacity-high">
            {`${group.members.length} miembros`}
          </SizableText>
        </XStack>
        <XStack gap={24} justifyContent="center" alignItems="center" marginTop={24}>
          <View>
            <CaretDobleLeftIcon color={theme["white-opacity-mid"].val} />
          </View>
          <View>
            <BlurView
              intensity={30}
              tint="light"
              style={{
                borderRadius: 100,
                borderColor: theme["white-opacity-mid"].val,
                borderWidth: 1,
                overflow: "hidden"
              }}
            >
              <XIcon width={32} height={32} style={{ margin: 15 }} />
            </BlurView>
          </View>
          <View>
            <BlurView
              intensity={30}
              tint="light"
              style={{
                borderRadius: 100,
                borderColor: theme["white-opacity-mid"].val,
                borderWidth: 1,
                overflow: "hidden"
              }}
            >
              <HearthIcon width={32} height={32} style={{ margin: 15 }} />
            </BlurView>
          </View>
          <View>
            <CaretDobleRightIcon color={theme["white-opacity-mid"].val} />
          </View>
        </XStack>
      </View>
    </View>
  )
}

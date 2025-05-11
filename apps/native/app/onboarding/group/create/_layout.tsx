import { SizableText, YStack } from "tamagui"
import { Slot } from "expo-router"
import Reanimated, { useAnimatedStyle } from "react-native-reanimated"
import { KeyboardGestureArea } from "react-native-keyboard-controller"
import { useKeyboardAnimation } from "../../../../lib/hooks/useKeyboardAnimation"

export default function CreateGroupLayout() {
  const { height } = useKeyboardAnimation()

  const scrollViewStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: -height.value }]
    }),
    []
  )

  return (
    <KeyboardGestureArea interpolator="ios" offset={50} style={{ flex: 1, width: "100%" }}>
      <Reanimated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ height: "100%", flex: 1, justifyContent: "flex-end", width: "100%" }}
        style={scrollViewStyle}
      >
        <YStack gap={40} width="100%">
          <YStack justifyContent="center" alignItems="center" gap={4}>
            <SizableText textTransform="uppercase" color="$white" size="$headline-large">
              Cohor
            </SizableText>
          </YStack>
          <Slot />
        </YStack>
      </Reanimated.ScrollView>
    </KeyboardGestureArea>
  )
}

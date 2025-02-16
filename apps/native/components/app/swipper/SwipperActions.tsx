import { useTheme, useWindowDimensions, View, XStack } from "tamagui"
import CaretDobleLeftIcon from "../../icons/CaretDobleLeft"
import { BlurView } from "expo-blur"
import XIcon from "../../icons/X"
import Gradient from "../../ui/Gradient"
import HearthIcon from "../../icons/Hearth"
import CaretDobleRightIcon from "../../icons/CaretDobleRight"
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated"

export default function SwipperActions() {
  const theme = useTheme()

  const { width: SCREEN_WIDTH } = useWindowDimensions()

  const translateX = useSharedValue(0)

  const opacity = useSharedValue(1)

  const handleSwipeComplete = (direction: "left" | "right") => {
    console.log(direction)
  }

  const handleHearthTouch = () => {
    translateX.value = withTiming(SCREEN_WIDTH, {}, () => runOnJS(handleSwipeComplete)("right"))
    opacity.value = withTiming(0, { duration: 300 })
  }

  const handleXTouch = () => {
    translateX.value = withTiming(-SCREEN_WIDTH, {}, () => runOnJS(handleSwipeComplete)("left"))
    opacity.value = withTiming(0, { duration: 300 })
  }

  return (
    <XStack
      gap={24}
      position="absolute"
      justifyContent="center"
      alignItems="center"
      bottom={0}
      marginBottom={12}
      width={"100%"}
    >
      <View style={{ rotate: "-12deg" }}>
        <CaretDobleLeftIcon color={theme["white-opacity-mid"].val} />
      </View>
      <XStack gap={8}>
        <View>
          <BlurView
            intensity={10}
            tint="light"
            style={{
              borderRadius: 100,
              overflow: "hidden"
            }}
          >
            <BlurView
              intensity={10}
              tint="light"
              style={{
                borderRadius: 100,
                borderColor: theme["element-high-opacity-mid"].val,
                borderWidth: 1,
                backgroundColor: theme["element-high-opacity-low"].val,
                overflow: "hidden",
                margin: 5
              }}
            >
              <XIcon width={32} height={32} style={{ margin: 15 }} onPress={handleXTouch} />
            </BlurView>
          </BlurView>
        </View>
        <View>
          <BlurView
            intensity={20}
            tint="dark"
            style={{
              borderRadius: 100,
              overflow: "hidden"
            }}
          >
            <Gradient
              fromColor="rgb(255, 62, 133)"
              toColor="rgb(255, 62, 133)"
              height="100%"
              opacityColor1={0.32}
              opacityColor2={0.08}
            />
            <BlurView
              intensity={30}
              tint="dark"
              style={{
                borderRadius: 100,
                borderColor: "rgba(255, 62, 133, 0.32)",
                borderWidth: 1,
                overflow: "hidden",
                margin: 5,
                backgroundColor: "#FF3E8552"
              }}
            >
              <Gradient
                fromColor="rgb(255, 62, 133)"
                toColor="rgb(255, 62, 133)"
                height="100%"
                opacityColor1={0.32}
                opacityColor2={0.08}
              />
              <HearthIcon color="#FF3E85" width={32} height={32} style={{ margin: 15 }} onPress={handleHearthTouch} />
            </BlurView>
          </BlurView>
        </View>
      </XStack>
      <View style={{ rotate: "12deg" }}>
        <CaretDobleRightIcon color={theme["white-opacity-mid"].val} />
      </View>
    </XStack>
  )
}

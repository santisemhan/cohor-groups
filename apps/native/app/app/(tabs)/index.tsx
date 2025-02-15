import React from "react"
import { SafeAreaView, StyleSheet, useWindowDimensions } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useTheme, View, XStack } from "tamagui"
import Card from "../../../components/app/swipper/Card"
import { groups } from "../../../assets/mock/groups"
import CaretDobleRightIcon from "../../../components/icons/CaretDobleRight"
import XIcon from "../../../components/icons/X"
import { BlurView } from "expo-blur"
import CaretDobleLeftIcon from "../../../components/icons/CaretDobleLeft"
import HearthIcon from "../../../components/icons/Hearth"
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated"
import Gradient from "../../../components/ui/Gradient"

export default function Home() {
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
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView style={style.container}>
        <View flex={1} justifyContent="center" alignItems="center">
          {groups.map((group, index) => (
            <Card key={index} group={group} onSwipe={(direction) => console.log(direction)} />
          ))}

          {/* Pasar a componente */}
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
                  <HearthIcon
                    color="#FF3E85"
                    width={32}
                    height={32}
                    style={{ margin: 15 }}
                    onPress={handleHearthTouch}
                  />
                </BlurView>
              </BlurView>
            </View>
            <View style={{ rotate: "12deg" }}>
              <CaretDobleRightIcon color={theme["white-opacity-mid"].val} />
            </View>
          </XStack>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%"
  }
})

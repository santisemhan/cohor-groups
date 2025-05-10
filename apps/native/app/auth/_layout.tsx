import { ResizeMode, Video } from "expo-av"
import { Slot, useFocusEffect } from "expo-router"
import React, { useRef } from "react"
import { View } from "react-native"
import { KeyboardGestureArea } from "react-native-keyboard-controller"
import Reanimated, { useAnimatedStyle } from "react-native-reanimated"
import { useKeyboardAnimation } from "../../lib/hooks/useKeyboardAnimation"

export default function AuthLayout() {
  const videoRef = useRef<Video>(null)

  useFocusEffect(
    React.useCallback(() => {
      videoRef.current?.playAsync()

      return () => {
        videoRef.current?.pauseAsync()
      }
    }, [])
  )

  const { height } = useKeyboardAnimation()

  const scrollViewStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: -height.value }]
    }),
    []
  )

  return (
    <View style={{ flex: 1 }}>
      <Video
        ref={videoRef}
        source={require("../../assets/video/CohorCreateAccount.mp4")}
        rate={1.0}
        volume={1.0}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      />
      <KeyboardGestureArea interpolator="ios" offset={50} style={{ flex: 1 }}>
        <Reanimated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ height: "100%", flex: 1, justifyContent: "flex-end" }}
          style={scrollViewStyle}
        >
          <Slot />
        </Reanimated.ScrollView>
      </KeyboardGestureArea>
    </View>
  )
}

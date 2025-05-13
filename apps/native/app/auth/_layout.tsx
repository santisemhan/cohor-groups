import { ResizeMode, Video } from "expo-av"
import { Slot, useFocusEffect } from "expo-router"
import React, { useRef } from "react"
import { View } from "react-native"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"

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
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1, width: "100%" }}>
        <View
          style={{
            flexGrow: 1,
            justifyContent: "flex-end"
          }}
        >
          <Slot />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

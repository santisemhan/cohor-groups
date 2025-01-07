import { View } from "tamagui"
import { ResizeMode, Video } from "expo-av"
import React, { useRef } from "react"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import { Slot, useFocusEffect } from "expo-router"

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
    <View style={{ display: "flex", height: "100%", justifyContent: "flex-end", alignItems: "center" }}>
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
      <KeyboardAvoidingView style={{ flex: 1, width: "100%" }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end"
          }}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false}
        >
          <Slot />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

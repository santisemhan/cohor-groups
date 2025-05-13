import { View } from "tamagui"
import { Slot, useFocusEffect } from "expo-router"
import { ResizeMode, Video } from "expo-av"
import React, { useRef } from "react"
import { SizableText, YStack } from "tamagui"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"

export default function CreateGroupSucessLayout() {
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
        source={require("../../assets/video/CohorOnboarding.mp4")}
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
          <YStack gap={40} width="100%">
            <YStack justifyContent="center" alignItems="center" gap={4}>
              <SizableText textTransform="uppercase" color="$white" size="$headline-large">
                Cohor
              </SizableText>
            </YStack>
            <Slot />
          </YStack>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

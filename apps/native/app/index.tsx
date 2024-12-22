import React, { useState, useRef } from "react"
import { View } from "tamagui"
import { ResizeMode, Video } from "expo-av"
import { YStack, SizableText } from "tamagui"
import GlassBottomSheet from "../components/GlassBotomSheet"
import AuthOptions from "../components/templates/auth/AuthOptions"
import LoginOptions from "../components/templates/auth/login/LoginOptions"
import { useFocusEffect } from "expo-router"

export default function Home() {
  const [wantLogin, setWantLogin] = useState(false)
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
    <View
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      <Video
        ref={videoRef}
        source={require("../assets/video/CohorOnboarding.mp4")}
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
      <YStack gap={40} width="100%">
        <YStack justifyContent="center" alignItems="center" gap={4}>
          <SizableText textTransform="uppercase" color="$white" size="$headline-large">
            Cohor
          </SizableText>
          <SizableText color="$white" size="$body-medium-w-medium">
            Explora nuevas conexiones
          </SizableText>
        </YStack>
        <GlassBottomSheet>
          {!wantLogin ? <AuthOptions setWantLogin={setWantLogin} /> : <LoginOptions />}
        </GlassBottomSheet>
      </YStack>
    </View>
  )
}

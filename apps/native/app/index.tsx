import React, { useState, useRef, useEffect } from "react"
import { View } from "tamagui"
import { ResizeMode, Video } from "expo-av"
import { YStack, SizableText } from "tamagui"
import GlassBottomSheet from "../components/GlassBotomSheet"
import { router, useFocusEffect } from "expo-router"
import AuthOptions from "../components/templates/auth/AuthOptions"
import LoginOptions from "../components/templates/auth/login/LoginOptions"
import RegisterOptions from "../components/templates/auth/register/RegisterOptions"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Home() {
  const [authFlow, setAuthFlow] = useState<"login" | "register" | undefined>(undefined)

  const flowMap = {
    register: <RegisterOptions setAuthFlow={setAuthFlow} />,
    login: <LoginOptions setAuthFlow={setAuthFlow} />
  }

  const videoRef = useRef<Video>(null)

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("access_token")
      if (token) {
        router.replace("/app")
      }
    }

    checkLoginStatus()
  }, [])

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
          {authFlow === undefined ? <AuthOptions setAuthFlow={setAuthFlow} /> : flowMap[authFlow]}
        </GlassBottomSheet>
      </YStack>
    </View>
  )
}

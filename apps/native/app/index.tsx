import React, { useState, useRef, useEffect, useCallback } from "react"
import { View } from "tamagui"
import { ResizeMode, Video } from "expo-av"
import { YStack, SizableText } from "tamagui"
import { useFocusEffect, useRouter } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { OnboardingStep, User } from "@cohor/types"
import { useFonts } from "expo-font"
import RegisterOptions from "../components/templates/auth/register/RegisterOptions"
import LoginOptions from "../components/templates/auth/login/LoginOptions"
import { useApiClient } from "../lib/http/useApiClient"
import { endpoint } from "../lib/common/Endpoint"
import GlassBottomSheet from "../components/GlassBotomSheet"
import AuthOptions from "../components/templates/auth/AuthOptions"

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 1000,
  fade: true
})

export default function Home() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [loaded] = useFonts({
    "OpenSauceOne-Regular": require("../assets/fonts/OpenSauceOne-Regular.ttf"),
    "OpenSauceOne-Medium": require("../assets/fonts/OpenSauceOne-Medium.ttf"),
    "OpenSauceOne-SemiBold": require("../assets/fonts/OpenSauceOne-SemiBold.ttf"),
    "OpenSauceOne-Bold": require("../assets/fonts/OpenSauceOne-Bold.ttf")
  })
  const [authFlow, setAuthFlow] = useState<"login" | "register" | undefined>(undefined)

  const router = useRouter()

  const flowMap = {
    register: <RegisterOptions setAuthFlow={setAuthFlow} />,
    login: <LoginOptions setAuthFlow={setAuthFlow} />
  }
  const videoRef = useRef<Video>(null)
  const api = useApiClient()

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token")
        if (!token) {
          await SplashScreen.hideAsync()
          return
        }

        const { user } = await api.get<{ user: User }>(endpoint.auth.loggedUser)
        const onboardingStep = user?.onboardingStep ?? null

        const onboardingRoutes: Record<OnboardingStep, string> = {
          [OnboardingStep.STEP_ONE]: "/onboarding/user",
          [OnboardingStep.STEP_TWO]: "/onboarding/user",
          [OnboardingStep.STEP_THREE]: "/onboarding/user/success",
          [OnboardingStep.COMPLETED]: "/app"
        }

        const route = onboardingRoutes[onboardingStep as OnboardingStep] || "/auth/login"
        await router.replace(route)
      } catch (error) {
        console.error("Error checking login status:", error)
      } finally {
        setAppIsReady(true)
      }
    }
    checkLoginStatus()
  }, [loaded])

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hide()
    }
  }, [appIsReady])

  useFocusEffect(
    React.useCallback(() => {
      videoRef.current?.playAsync()

      return () => {
        videoRef.current?.pauseAsync()
      }
    }, [])
  )

  if (!appIsReady || !loaded) return null

  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
      onLayout={onLayoutRootView}
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

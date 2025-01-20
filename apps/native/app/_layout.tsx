import { TamaguiProvider } from "tamagui"
import { router, Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useFonts } from "expo-font"
import { useEffect } from "react"

import { tamaguiConfig } from "../tamagui.config"
import { StatusBar } from "expo-status-bar"

import { AuthProvider } from "../lib/context/AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { endpoint } from "../lib/common/Endpoint"
import { OnboardingStep, User } from "@cohor/types"
import { useApiClient } from "../lib/http/useApiClient"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    "OpenSauceOne-Regular": require("../assets/fonts/OpenSauceOne-Regular.ttf"),
    "OpenSauceOne-Medium": require("../assets/fonts/OpenSauceOne-Medium.ttf"),
    "OpenSauceOne-SemiBold": require("../assets/fonts/OpenSauceOne-SemiBold.ttf"),
    "OpenSauceOne-Bold": require("../assets/fonts/OpenSauceOne-Bold.ttf")
  })
  const api = useApiClient()

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (loaded) {
        const token = await AsyncStorage.getItem("access_token")
        if (token) {
          SplashScreen.hideAsync()
          const loggedUserResponse = await api.get<{ user: User }>(endpoint.auth.loggedUser)

          switch (loggedUserResponse.user.onboardingStep) {
            case OnboardingStep.STEP_ONE:
            case OnboardingStep.STEP_TWO:
              router.replace("/onboarding/user")
              break
            case OnboardingStep.STEP_THREE:
              router.replace("/onboarding/user/success")
              break
            case OnboardingStep.COMPLETED:
              router.replace("/app")
              break
            default:
              router.replace("/auth/login")
          }
        }
        SplashScreen.hideAsync()
        router.replace("/app")
      }
    }

    checkLoginStatus()
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={"dark"}>
      <AuthProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </TamaguiProvider>
  )
}

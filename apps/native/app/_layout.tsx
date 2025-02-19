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
import CustomToast from "../components/toast"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { ToastProvider } from "@tamagui/toast"

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
    GoogleSignin.configure({
      webClientId: "300195889471-o655ub38lc5e0obfh9hicqpecundh0hg.apps.googleusercontent.com",
      iosClientId: "300195889471-lka9cqqind6u4hloqdcsl4vne93nt5gg.apps.googleusercontent.com"
    })
  }, [])

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        if (!loaded) return

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
        await SplashScreen.hideAsync()
      } catch (error) {
        console.error("Error checking login status:", error)
        await SplashScreen.hideAsync()
      }
    }

    checkLoginStatus()
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <KeyboardProvider>
      <ToastProvider swipeDirection="horizontal">
        <TamaguiProvider config={tamaguiConfig} defaultTheme={"dark"}>
          <AuthProvider>
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false }} />
          </AuthProvider>
          <CustomToast />
        </TamaguiProvider>
      </ToastProvider>
    </KeyboardProvider>
  )
}

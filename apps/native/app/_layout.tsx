import { TamaguiProvider } from "tamagui"
import { Stack } from "expo-router"
import { useEffect } from "react"

import { tamaguiConfig } from "../tamagui.config"
import { StatusBar } from "expo-status-bar"

import { AuthProvider } from "../lib/context/AuthContext"
import CustomToast from "../components/toast"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { ToastProvider } from "@tamagui/toast"

export default function RootLayout() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "300195889471-o655ub38lc5e0obfh9hicqpecundh0hg.apps.googleusercontent.com",
      iosClientId: "300195889471-lka9cqqind6u4hloqdcsl4vne93nt5gg.apps.googleusercontent.com"
    })
  }, [])

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

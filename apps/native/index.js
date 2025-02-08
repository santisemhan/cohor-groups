import "react-native-gesture-handler"

import { ToastProvider } from "@tamagui/toast"
import { registerRootComponent } from "expo"
import { ExpoRoot } from "expo-router"
import { KeyboardProvider } from "react-native-keyboard-controller"

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context("./app") //Path with src folder
  return (
    <KeyboardProvider>
      <ToastProvider swipeDirection="horizontal" placement="top-right">
        <ExpoRoot context={ctx} />
      </ToastProvider>
    </KeyboardProvider>
  )
}

registerRootComponent(App)

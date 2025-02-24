import "react-native-gesture-handler"

import { registerRootComponent } from "expo"
import { ExpoRoot } from "expo-router"

import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated"

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false
})

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context("./app") //Path with src folder
  return <ExpoRoot context={ctx} />
}

registerRootComponent(App)

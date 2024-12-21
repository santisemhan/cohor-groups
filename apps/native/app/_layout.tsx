import { SizableText, TamaguiProvider, View } from "tamagui"
import * as SplashScreen from "expo-splash-screen"

import { tamaguiConfig } from "../tamagui.config"

import { useFonts } from "expo-font"
import { useEffect } from "react"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    "OpenSauceOne-Regular": require("../assets/fonts/OpenSauceOne-Regular.ttf"),
    "OpenSauceOne-Medium": require("../assets/fonts/OpenSauceOne-Medium.ttf"),
    "OpenSauceOne-SemiBold": require("../assets/fonts/OpenSauceOne-SemiBold.ttf"),
    "OpenSauceOne-Bold": require("../assets/fonts/OpenSauceOne-Bold.ttf")
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={"dark"}>
      <View backgroundColor="$background" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <SizableText size="$display-large" color="$element-high">
          display-large
        </SizableText>
      </View>
    </TamaguiProvider>
  )
}

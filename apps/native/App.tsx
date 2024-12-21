import { SizableText, TamaguiProvider, View } from "tamagui"

import { tamaguiConfig } from "./tamagui.config"

import { useFonts } from "expo-font"

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf")
  })

  if (!loaded) {
    return null
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={"dark"}>
      <View backgroundColor="$background" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <SizableText size="$display-large" color="$element-high">
          Display
        </SizableText>
        <SizableText size="$display-medium" color="$element-high">
          Display
        </SizableText>
        <SizableText size="$display-small" color="$element-high">
          Display
        </SizableText>
      </View>
    </TamaguiProvider>
  )
}

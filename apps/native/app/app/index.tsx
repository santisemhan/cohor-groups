import React from "react"
import { View } from "tamagui"
import { YStack, SizableText } from "tamagui"

export default function Home() {
  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <YStack gap={40} width="100%">
        <YStack justifyContent="center" alignItems="center" gap={4}>
          <SizableText color="$black" size="$headline-large">
            App
          </SizableText>
        </YStack>
      </YStack>
    </View>
  )
}

import React from "react"
import { Toast, ToastViewport, useToastState } from "@tamagui/toast"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { YStack } from "tamagui"

export default function CustomToast() {
  const { left, top, right } = useSafeAreaInsets()
  const currentToast = useToastState()
  let backgroundColor = "$color.white"
  if (!currentToast) return null
  if (currentToast.customData) {
    backgroundColor = currentToast.customData?.backgroundColor || backgroundColor
  }
  return (
    <>
      <Toast
        key={currentToast.id}
        duration={currentToast.duration}
        backgroundColor={backgroundColor}
        animation="100ms"
        viewportName={currentToast.viewportName}
      >
        <YStack>
          <Toast.Title>{currentToast.title}</Toast.Title>
          {!!currentToast.message && <Toast.Description>{currentToast.message}</Toast.Description>}
        </YStack>
      </Toast>
      <ToastViewport flexDirection="column" left={left} top={top} right={right} />
    </>
  )
}

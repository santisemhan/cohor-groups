import React from "react"
import { SizableText, YStack } from "tamagui"
import { Button } from "../../ui/Button"
import { BlurView } from "expo-blur"

interface AuthOptionsProps {
  // TODO: Add to context
  setAuthFlow: (value: "login" | "register" | undefined) => void
}

export default function AuthOptions({ setAuthFlow }: AuthOptionsProps) {
  return (
    <>
      <SizableText color="$white" size="$body-small-w-medium">
        Descubrí a quien podes conocer hoy.
      </SizableText>
      <YStack gap={20} width="100%">
        <Button onPress={() => setAuthFlow("register")} backgroundColor="$element-high">
          Crear una cuenta
        </Button>
        <BlurView
          intensity={100}
          tint="dark"
          style={{
            borderRadius: 100,
            overflow: "hidden"
          }}
        >
          <Button
            onPress={() => setAuthFlow("login")}
            type="subtle"
            backgroundColor="transparent"
            borderColor="$element-high-opacity-mid"
          >
            Iniciar sesión
          </Button>
        </BlurView>
      </YStack>
      <SizableText color="$white" size="$body-small" textAlign="center">
        Cohor v.0.1.0
      </SizableText>
    </>
  )
}

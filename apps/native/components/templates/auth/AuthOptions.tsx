import { Link } from "expo-router"
import React from "react"
import { SizableText, YStack } from "tamagui"
import { Button } from "../../ui/Button"
import { BlurView } from "expo-blur"

interface AuthOptionsProps {
  // TODO: Add to context
  setWantLogin: (value: boolean) => void
}

export default function AuthOptions({ setWantLogin }: AuthOptionsProps) {
  return (
    <>
      <SizableText color="$white" size="$body-small-w-medium">
        Descubrí a quien podes conocer hoy.
      </SizableText>
      <YStack gap={20} width="100%">
        <Link asChild href="/auth/details">
          <Button backgroundColor="$element-high">Crear una cuenta</Button>
        </Link>
        <BlurView
          intensity={100}
          tint="dark"
          style={{
            borderRadius: 100,
            overflow: "hidden"
          }}
        >
          <Button
            onPress={() => setWantLogin(true)}
            type="subtle"
            backgroundColor="transparent"
            borderColor="rgba(255, 255, 255, 0.2)"
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

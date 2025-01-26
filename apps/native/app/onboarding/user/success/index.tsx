import { SizableText, YStack } from "tamagui"

import React from "react"

import { useAuth } from "../../../../lib/context/AuthContext"
import GlassBottomSheet from "../../../../components/GlassBotomSheet"
import { BlurView } from "expo-blur"
import { Button } from "../../../../components/ui/Button"

// Este usa otro video
export default function UserProfileSuccess() {
  const { user } = useAuth()
  return (
    <>
      <YStack gap={40} width="100%">
        <YStack justifyContent="center" alignItems="center" gap={4}>
          <SizableText color="$white" size="$headline-small">
            Bienvenid@ {user?.name}!
          </SizableText>
        </YStack>
        <GlassBottomSheet>
          <SizableText color="$white" size="$body-medium-w-medium">
            ¿Listo para conectar?
          </SizableText>
          <YStack gap={20} width="100%">
            <Button onPress={() => console.log("hola")} backgroundColor="$element-high">
              Iniciar un grupo
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
                onPress={() => console.log("hola")}
                type="subtle"
                backgroundColor="transparent"
                borderColor="$element-high-opacity-mid"
              >
                Unirme a un grupo
              </Button>
            </BlurView>
          </YStack>
        </GlassBottomSheet>
      </YStack>
    </>
  )
}

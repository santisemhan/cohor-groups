import { SizableText, YStack } from "tamagui"

import React from "react"

import { BlurView } from "expo-blur"
import { router, useLocalSearchParams } from "expo-router"
import GlassBottomSheet from "../../../../../components/GlassBotomSheet"
import { Button } from "../../../../../components/ui/Button"
import { Share } from "react-native"

export default function GroupCreatedSuccess() {
  const { code, name } = useLocalSearchParams()
  const shareCode = async () => {
    await Share.share({
      message: `¡Unite a mi grupo en Cohor! Código de invitación: ${code.toString().padStart(5, "0")}`
    })
  }

  return (
    <YStack gap={40} width="100%">
      <YStack justifyContent="center" alignItems="center" gap={8}>
        <SizableText color="$white-opacity-high" size="$body-small-w-medium">
          ¡Listo para conectar!
        </SizableText>
        <SizableText color="$white" size="$headline-small">
          {name}
        </SizableText>
      </YStack>
      <GlassBottomSheet>
        <SizableText color="$white" size="$body-medium-w-medium">
          Invitá a quienes querés sumar
        </SizableText>
        <YStack gap={20} width="100%">
          <Button backgroundColor="$element-high" onPress={shareCode}>
            Compartir codigo de invitación
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
              onPress={() => router.replace("/app")}
              type="subtle"
              backgroundColor="transparent"
              borderColor="$element-high-opacity-mid"
            >
              Continuar
            </Button>
          </BlurView>
        </YStack>
      </GlassBottomSheet>
    </YStack>
  )
}

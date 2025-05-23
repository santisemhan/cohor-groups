import { SizableText, YStack } from "tamagui"

import React from "react"

import { useAuth } from "../../../../lib/context/AuthContext"
import GlassBottomSheet from "../../../../components/GlassBotomSheet"
import { BlurView } from "expo-blur"
import { Button } from "../../../../components/ui/Button"
import { router } from "expo-router"

export default function UserProfileSuccess() {
  const { user } = useAuth()
  return (
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
          <Button onPress={() => router.push("/onboarding/group/create")} backgroundColor="$element-high">
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
              onPress={() => router.push("/onboarding/group/join")}
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
  )
}

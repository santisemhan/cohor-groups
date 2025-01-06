import { SizableText, YStack } from "tamagui"
import React from "react"
import GlassBottomSheet from "../../../../components/GlassBotomSheet"
import { Button } from "../../../../components/ui/Button"
import { BlurView } from "expo-blur"
import { openInbox } from "react-native-email-link"

export default function Validation() {
  const onOpenMailer = () => {
    openInbox()
  }

  return (
    <YStack gap={40} width="100%">
      <YStack justifyContent="center" alignItems="center" gap={4}>
        <SizableText textTransform="uppercase" color="$white" size="$headline-large">
          Cohor
        </SizableText>
        <SizableText color="$white" size="$body-medium-w-medium">
          Explorá nuevas conexiones
        </SizableText>
      </YStack>
      <GlassBottomSheet>
        <YStack width="90%" alignItems="center" gap={12}>
          <SizableText color="$white" size="$headline-small">
            Verificá tu email
          </SizableText>
          <SizableText textAlign="center" color="$white-opacity-high" size="$body-small">
            Te hemos enviado un correo electrónico a{" "}
            <SizableText color="$white" size="$body-medium-w-medium">
              santiventura.96@gmail.com
            </SizableText>{" "}
            Haz clic en el enlace dentro para comenzar.
          </SizableText>
        </YStack>
        <YStack width="100%" gap={20}>
          <Button onPress={onOpenMailer}>Abrir email</Button>
          <BlurView
            intensity={100}
            tint="dark"
            style={{
              borderRadius: 100,
              overflow: "hidden"
            }}
          >
            <Button type="subtle" backgroundColor="transparent" borderColor="$element-high-opacity-mid">
              Reenviar email
            </Button>
          </BlurView>
        </YStack>
      </GlassBottomSheet>
    </YStack>
  )
}

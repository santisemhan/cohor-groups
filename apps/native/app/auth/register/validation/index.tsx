import { SizableText, YStack } from "tamagui"
import React from "react"
import GlassBottomSheet from "../../../../components/GlassBotomSheet"
import { Button } from "../../../../components/ui/Button"
import { BlurView } from "expo-blur"
import { Link, useLocalSearchParams } from "expo-router"
import { endpoint } from "../../../../lib/common/Endpoint"
import { useApiClient } from "../../../../lib/http/useApiClient"
import { useToastController } from "@tamagui/toast"

export default function Validation() {
  const { userId, email } = useLocalSearchParams()
  const toast = useToastController()
  const api = useApiClient()

  const resendEmail = () => {
    api
      .post<undefined, undefined>(`${endpoint.auth.resend}/${userId}`)
      .then(() => {
        toast.show("Email sended!", {
          customData: {
            backgroundColor: "$success"
          }
        })
      })
      .catch(() => {
        toast.show("Please wait a few minutes", {
          customData: {
            backgroundColor: "$error"
          }
        })
      })
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
              {email}
            </SizableText>{" "}
            Haz clic en el enlace dentro para comenzar.
          </SizableText>
        </YStack>
        <YStack width="100%" gap={20}>
          <Link href="/auth/login" asChild>
            <Button>Iniciar Sesión</Button>
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
              onPress={resendEmail}
              type="subtle"
              backgroundColor="transparent"
              borderColor="$element-high-opacity-mid"
            >
              Reenviar email
            </Button>
          </BlurView>
        </YStack>
      </GlassBottomSheet>
    </YStack>
  )
}

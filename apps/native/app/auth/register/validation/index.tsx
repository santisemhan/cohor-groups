import { SizableText, YStack } from "tamagui"
import React from "react"
import GlassBottomSheet from "../../../../components/GlassBotomSheet"
import { Button } from "../../../../components/ui/Button"
import { BlurView } from "expo-blur"
import { openInbox } from "react-native-email-link"
import { useLocalSearchParams } from "expo-router"
import { endpoint } from "../../../../lib/common/Endpoint"
import { useApiClient } from "../../../../lib/http/MakeRequest"
import Toast from "react-native-toast-message"
import { toastConfig } from "../../../../lib/Toast/config"

export default function Validation() {
  const { userId, email } = useLocalSearchParams()
  const api = useApiClient()

  const onOpenMailer = () => {
    openInbox()
  }

  const resendEmail = () => {
    api
      .post<undefined, undefined>(`${endpoint.auth.resend}/${userId}`)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Email sended!"
        })
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "Please wait a few minutes"
        })
        console.log(err)
      })
  }

  return (
    <>
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
            <Button onPress={onOpenMailer}>Abrir email</Button>
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
      <Toast config={toastConfig} />
    </>
  )
}

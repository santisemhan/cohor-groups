import React from "react"
import { Separator, SizableText, useTheme, XStack, YStack } from "tamagui"
import { Button } from "../../../ui/Button"
import { BlurView } from "expo-blur"
import MailboxIcon from "../../../icons/Mailbox"
import GoogleIcon from "../../../icons/GoogleIcon"
import { Link } from "expo-router"

interface RegisterOptionsProps {
  // TODO: Add to context
  setAuthFlow: (value: "login" | "register" | undefined) => void
}

export default function RegisterOptions({ setAuthFlow }: RegisterOptionsProps) {
  const theme = useTheme()

  return (
    <>
      <SizableText color="$white" size="$headline-small">
        Crear una cuenta
      </SizableText>
      <YStack gap={24} width="100%">
        <Button backgroundColor="$element-high" icon={<GoogleIcon width={21} height={21} />}>
          Continuar con Google
        </Button>
        <XStack justifyContent="center" alignItems="center" gap={8}>
          <Separator borderColor="$white-opacity-mid" />
          <SizableText color="$white" size="$body-small" marginBottom={4}>
            ó
          </SizableText>
          <Separator borderColor="$white-opacity-mid" />
        </XStack>
        <BlurView
          intensity={100}
          tint="dark"
          style={{
            borderRadius: 100,
            overflow: "hidden"
          }}
        >
          <Link href="/auth/register" asChild>
            <Button
              type="subtle"
              backgroundColor="transparent"
              borderColor="rgba(255, 255, 255, 0.2)"
              icon={<MailboxIcon width={21} height={21} color={theme.white.val} />}
            >
              Continuar con email
            </Button>
          </Link>
        </BlurView>
        <SizableText color="$white-opacity-high" size="$body-small" textAlign="center">
          ¿Ya tenes una cuenta?{" "}
          <SizableText onPress={() => setAuthFlow("login")} color="$white" size="$body-small-w-medium">
            Iniciar sesión
          </SizableText>
        </SizableText>
      </YStack>
    </>
  )
}

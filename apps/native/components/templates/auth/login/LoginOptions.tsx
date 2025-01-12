import React from "react"
import { Separator, SizableText, useTheme, XStack, YStack } from "tamagui"
import { Button } from "../../../ui/Button"
import { BlurView } from "expo-blur"
import MailboxIcon from "../../../icons/Mailbox"
import { Link } from "expo-router"
import LoginWithGoogle from "../../../auth/LoginWithGoogle"

interface LoginOptionsProps {
  // TODO: Add to context
  setAuthFlow: (value: "login" | "register" | undefined) => void
}

export default function LoginOptions({ setAuthFlow }: LoginOptionsProps) {
  const theme = useTheme()

  return (
    <>
      <SizableText color="$white" size="$headline-small">
        Iniciar Sesión
      </SizableText>
      <YStack gap={24} width="100%">
        <LoginWithGoogle />
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
          <Link href="/auth/login" asChild>
            <Button
              type="subtle"
              backgroundColor="transparent"
              borderColor="$element-high-opacity-mid"
              icon={<MailboxIcon width={21} height={21} color={theme.white.val} />}
            >
              Continuar con email
            </Button>
          </Link>
        </BlurView>
        <SizableText color="$white-opacity-high" size="$body-small" textAlign="center">
          ¿No tenes una cuenta?{" "}
          <SizableText onPress={() => setAuthFlow("register")} color="$white" size="$body-small-w-medium">
            Crear una cuenta
          </SizableText>
        </SizableText>
      </YStack>
    </>
  )
}

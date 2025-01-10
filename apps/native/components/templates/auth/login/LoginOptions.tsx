import React, { useEffect, useState } from "react"
import { Separator, SizableText, useTheme, XStack, YStack } from "tamagui"
import { Button } from "../../../ui/Button"
import { BlurView } from "expo-blur"
import MailboxIcon from "../../../icons/Mailbox"
import GoogleIcon from "../../../icons/GoogleIcon"
import { Link } from "expo-router"
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import * as AuthSession from "expo-auth-session"

WebBrowser.maybeCompleteAuthSession()

interface LoginOptionsProps {
  // TODO: Add to context
  setAuthFlow: (value: "login" | "register" | undefined) => void
}

export default function LoginOptions({ setAuthFlow }: LoginOptionsProps) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "300195889471-o655ub38lc5e0obfh9hicqpecundh0hg.apps.googleusercontent.com",
    iosClientId: "300195889471-lka9cqqind6u4hloqdcsl4vne93nt5gg.apps.googleusercontent.com",
    androidClientId: "300195889471-gebukno7f83ouj36me59bghuuquf4onj.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ native: "https://auth.expo.io/cohor/mobile" })
  })
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState()
  const theme = useTheme()

  useEffect(() => {
    if (response && response?.type === "success") {
      const { authentication } = response
      if (authentication) {
        setAccessToken(authentication.accessToken)
        accessToken && fetchUserInfo()
      }
      console.log("Token de Google:", authentication?.accessToken)
    }
  }, [response, accessToken])

  const fetchUserInfo = async () => {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const userInfo = await response.json()
    setUser(userInfo)
  }

  return (
    <>
      <SizableText color="$white" size="$headline-small">
        Iniciar Sesión
      </SizableText>
      <YStack gap={24} width="100%">
        <Button
          onPress={() => promptAsync()}
          backgroundColor="$element-high"
          icon={<GoogleIcon width={21} height={21} />}
        >
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

import React, { useEffect } from "react"
import { View } from "tamagui"
import { YStack, SizableText } from "tamagui"
import { Button } from "../../components/ui/Button"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { useApiClient } from "../../lib/http/useApiClient"
import { endpoint } from "../../lib/common/Endpoint"
import { useAuth } from "../../lib/context/AuthContext"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { User } from "@cohor/types"

export default function Home() {
  const api = useApiClient()
  const { user, setUser } = useAuth()

  useEffect(() => {
    api.get<{ user: User }>(endpoint.auth.loggedUser).then((response) => {
      setUser(response.user)
    })
  }, [])

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
    } catch {
      /* empty */
    }

    await AsyncStorage.removeItem("access_token")
    router.replace("/")
  }

  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <YStack gap={40} width="100%">
        <YStack justifyContent="center" alignItems="center" gap={4}>
          <SizableText color="$black" size="$headline-large">
            {JSON.stringify(user)}
          </SizableText>
          <Button onPress={() => signOut()}>Cerrar Sesion</Button>
        </YStack>
      </YStack>
    </View>
  )
}

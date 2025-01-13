import React, { useEffect } from "react"
import { View } from "tamagui"
import { YStack, SizableText } from "tamagui"
import { Button } from "../../components/ui/Button"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { useApiClient } from "../../lib/http/useApiClient"
import { endpoint } from "../../lib/common/Endpoint"
import { useAuth } from "../../lib/context/AuthContext"
import Toast from "react-native-toast-message"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { User } from "@cohor/types"

export default function Home() {
  const api = useApiClient()
  const { user, setUser } = useAuth()
  const [message, setMessage] = React.useState("App")

  useEffect(() => {
    api.get<{ user: User }>(endpoint.auth.loggedUser).then((response) => {
      setUser(response.user)
    })

    api
      .get<{ message: string }>(endpoint.example)
      .then((response) => {
        setMessage(response.message)
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: error.message
        })
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
            {message}
          </SizableText>
          <SizableText color="$black" size="$headline-large">
            {JSON.stringify(user)}
          </SizableText>
          <Button onPress={() => signOut()}>Cerrar Sesion</Button>
        </YStack>
      </YStack>
    </View>
  )
}

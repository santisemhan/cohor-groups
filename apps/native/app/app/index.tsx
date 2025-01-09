import React, { useEffect } from "react"
import { View } from "tamagui"
import { YStack, SizableText } from "tamagui"
import { Button } from "../../components/ui/Button"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { useApiClient } from "../../lib/http/useApiClient"
import { endpoint } from "../../lib/common/Endpoint"
import Toast from "react-native-toast-message"

export default function Home() {
  const api = useApiClient()
  const [message, setMessage] = React.useState("App")

  useEffect(() => {
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
          <Button onPress={() => signOut()}>Cerrar Sesion</Button>
        </YStack>
      </YStack>
    </View>
  )
}

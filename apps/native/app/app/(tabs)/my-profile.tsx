import { View } from "tamagui"
import { Button } from "../../../components/ui/Button"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"

export default function MyProfile() {
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
    <View flex={1} justifyContent="center" alignItems="center">
      <Button onPress={() => signOut()}>Cerrar Sesion</Button>
    </View>
  )
}

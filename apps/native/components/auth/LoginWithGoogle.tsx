import { useEffect } from "react"
import { useApiClient } from "../../lib/http/useApiClient"
import { Button } from "../ui/Button"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { endpoint } from "../../lib/common/Endpoint"
import { User } from "@cohor/types"
import { GoogleSignin, SignInResponse } from "@react-native-google-signin/google-signin"
import { useAuth } from "../../lib/context/AuthContext"
import GoogleIcon from "../icons/GoogleIcon"
import { useToastController } from "@tamagui/toast"

export default function LoginWithGoogle() {
  const api = useApiClient()
  const toast = useToastController()
  const { setUser } = useAuth()
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "300195889471-o655ub38lc5e0obfh9hicqpecundh0hg.apps.googleusercontent.com",
      iosClientId: "300195889471-lka9cqqind6u4hloqdcsl4vne93nt5gg.apps.googleusercontent.com"
    })
  }, [])

  const signIn = async () => {
    try {
      try {
        await GoogleSignin.revokeAccess()
        await GoogleSignin.signOut()
      } catch {
        /* empty */
      }

      await GoogleSignin.hasPlayServices()
      const userInfo: SignInResponse = await GoogleSignin.signIn()
      if (userInfo.data === null) throw new Error("No user info")
      const email = userInfo.data.user.email

      api
        .post<{ email: string; isThirdParty: boolean }, { id: string; email: string }>(
          endpoint.auth.register,
          {
            email: userInfo.data.user.email,
            isThirdParty: true
          },
          { headers: { Idtoken: userInfo.data.idToken, email } }
        )
        .then(() => {
          api
            .post<{ email: string }, { accessToken: string; user: User }>(
              endpoint.auth.login,
              { email },
              { headers: { Idtoken: userInfo.data.idToken, email } }
            )
            .then(async (res) => {
              setUser(res.user)
              await AsyncStorage.setItem("access_token", res.accessToken)
              router.dismissAll()
              router.replace("/app")
            })
            .catch(() => {
              toast.show("Error!", {
                message: "Error al iniciar sesión con Google",
                customData: {
                  backgroundColor: "$color.red"
                }
              })
            })
        })
        .catch(() => {
          toast.show("Error!", {
            message: "Error al registrar el usuario de Google",
            customData: {
              backgroundColor: "$color.red"
            }
          })
        })
    } catch (error) {
      console.log("Error", JSON.stringify(error))
      console.log("Error2", error)
      toast.show("Error!", {
        message: "Error al iniciar sesión",
        customData: {
          backgroundColor: "$color.red"
        }
      })
    }
  }
  return (
    <Button onPress={signIn} backgroundColor="$element-high" icon={<GoogleIcon width={21} height={21} />}>
      Continuar con Google
    </Button>
  )
}

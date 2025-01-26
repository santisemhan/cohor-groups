import { useApiClient } from "../../lib/http/useApiClient"
import { Button } from "../ui/Button"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { endpoint } from "../../lib/common/Endpoint"
import { OnboardingStep, User } from "@cohor/types"
import { GoogleSignin, SignInResponse } from "@react-native-google-signin/google-signin"
import { useAuth } from "../../lib/context/AuthContext"
import GoogleIcon from "../icons/GoogleIcon"
import { useToastController } from "@tamagui/toast"

export default function LoginWithGoogle() {
  const api = useApiClient()
  const toast = useToastController()
  const { setUser } = useAuth()

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
              const loggedUserResponse = await api.get<{ user: User }>(endpoint.auth.loggedUser)

              switch (loggedUserResponse.user.onboardingStep) {
                case OnboardingStep.STEP_ONE:
                case OnboardingStep.STEP_TWO:
                  router.replace("/onboarding/user")
                  break
                case OnboardingStep.STEP_THREE:
                  router.replace("/onboarding/user/success")
                  break
                case OnboardingStep.COMPLETED:
                  router.replace("/app")
                  break
                default:
                  router.replace("/auth/login")
              }
            })
            .catch(() => {
              toast.show("Error!", {
                message: "Error al iniciar sesión con Google",
                customData: {
                  backgroundColor: "$error"
                }
              })
            })
        })
        .catch(() => {
          toast.show("Error!", {
            message: "Error al registrar el usuario de Google",
            customData: {
              backgroundColor: "$error"
            }
          })
        })
    } catch {
      toast.show("Error!", {
        message: "Error al iniciar sesión",
        customData: {
          backgroundColor: "$error"
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

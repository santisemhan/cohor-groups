import { SizableText, Stack, useTheme, XStack, YStack } from "tamagui"

import React, { useState } from "react"

import GlassBottomSheet from "../../../components/GlassBotomSheet"
import { Button } from "../../../components/ui/Button"
import { Input } from "../../../components/ui/Input"
import EyeIcon from "../../../components/icons/Eye"
import EyeSlashIcon from "../../../components/icons/EyeSlash"
import { BlurView } from "expo-blur"
import { router } from "expo-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { LoginForm, LoginFormSchema } from "../../../lib/schema/auth/LoginFormSchema"
import { endpoint } from "../../../lib/common/Endpoint"
import { useApiClient } from "../../../lib/http/useApiClient"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAuth } from "../../../lib/context/AuthContext"
import { OnboardingStep, User } from "@cohor/types"
import FormError from "../../../components/FormError"
import { useToastController } from "@tamagui/toast"

export default function Login() {
  const { setUser } = useAuth()
  const toast = useToastController()
  const api = useApiClient()
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false)

  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    control
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema)
  })

  const onSubmitLogin: SubmitHandler<LoginForm> = async (formValues) => {
    try {
      const response = await api.post<LoginForm, { accessToken: string; user: User }>(endpoint.auth.login, formValues)
      await AsyncStorage.setItem("access_token", response.accessToken)
      setUser(response.user)
      const loggedUserResponse = await api.get<{ user: User }>(endpoint.auth.loggedUser)

      router.dismissAll()
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
    } catch {
      toast.show("Error!", {
        message: "Email o contraseña incorrectos",
        customData: {
          backgroundColor: "$error"
        }
      })
    }
  }

  return (
    <YStack gap={40} width="100%">
      <YStack justifyContent="center" alignItems="center" gap={4}>
        <SizableText textTransform="uppercase" color="$white" size="$headline-large">
          Cohor
        </SizableText>
      </YStack>
      <GlassBottomSheet>
        <SizableText color="$white" size="$headline-small">
          Iniciar Sesión
        </SizableText>
        <YStack gap={24} width="100%">
          <YStack gap={8} width="100%">
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <BlurView
                  intensity={60}
                  tint="light"
                  style={{
                    borderRadius: 100,
                    borderColor: theme["white-opacity-mid"].val,
                    borderWidth: 1,
                    overflow: "hidden"
                  }}
                >
                  <Input
                    borderWidth={0}
                    backgroundColor="transparent"
                    color="$white-opacity-high"
                    placeholder="Email"
                    placeholderTextColor="$white-opacity-high"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    hasError={!!errors.email}
                  />
                </BlurView>
              )}
            />
            {errors.email && <FormError message={errors.email.message!} />}
          </YStack>
          <YStack gap={8} width="100%">
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <BlurView
                  intensity={60}
                  tint="light"
                  style={{
                    borderRadius: 100,
                    borderColor: theme["white-opacity-mid"].val,
                    borderWidth: 1,
                    overflow: "hidden"
                  }}
                >
                  <XStack height={50} width="100%" alignItems="center">
                    <Input
                      width="100%"
                      position="absolute"
                      borderWidth={0}
                      backgroundColor="transparent"
                      color="$white-opacity-high"
                      placeholder="Contraseña"
                      placeholderTextColor="$white-opacity-high"
                      secureTextEntry={!showPassword}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      hasError={!!errors.password}
                    />
                    <Stack
                      position="absolute"
                      width="100%"
                      paddingRight={16}
                      alignItems="flex-end"
                      justifyContent="center"
                    >
                      {showPassword ? (
                        <EyeIcon
                          color={theme.white.val}
                          onPress={() => setShowPassword((prev) => !prev)}
                          height={21}
                          width={21}
                        />
                      ) : (
                        <EyeSlashIcon
                          color={theme.white.val}
                          onPress={() => setShowPassword((prev) => !prev)}
                          height={21}
                          width={21}
                        />
                      )}
                    </Stack>
                  </XStack>
                </BlurView>
              )}
            />
            {errors.password && <FormError message={errors.password.message!} />}
          </YStack>
          <Button
            isDisabled={!isValid}
            loading={isSubmitting}
            onPress={handleSubmit(onSubmitLogin)}
            borderColor="$element-high-opacity-mid"
          >
            Continuar
          </Button>
        </YStack>
      </GlassBottomSheet>
    </YStack>
  )
}

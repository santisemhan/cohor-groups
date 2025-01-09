import { SizableText, Stack, useTheme, XStack, YStack } from "tamagui"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import GlassBottomSheet from "../../../components/GlassBotomSheet"
import { Button } from "../../../components/ui/Button"
import { Input } from "../../../components/ui/Input"
import EyeIcon from "../../../components/icons/Eye"
import EyeSlashIcon from "../../../components/icons/EyeSlash"
import { BlurView } from "expo-blur"
import { router } from "expo-router"
import { useApiClient } from "../../../lib/http/MakeRequest"
import { endpoint } from "../../../lib/common/Endpoint"
import { RegisterForm, RegisterFormSchema } from "../../../lib/schema/auth/RegisterFormSchema"
import { SubmitHandler, useForm, Controller } from "react-hook-form"
import Toast from "react-native-toast-message"
import { toastConfig } from "../../../lib/Toast/config"

export default function Register() {
  const api = useApiClient()
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false)

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema)
  })

  const onSubmitRegister: SubmitHandler<RegisterForm> = async (formValues) => {
    api
      .post<RegisterForm, { id: string; email: string }>(endpoint.auth.register, formValues)
      .then((response) =>
        router.push({
          pathname: "auth/register/validation",
          params: { userId: response.id, email: response.email }
        })
      )
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "Register fail!"
        })
      })
  }

  return (
    <>
      <YStack gap={40} width="100%">
        <YStack justifyContent="center" alignItems="center" gap={4}>
          <SizableText textTransform="uppercase" color="$white" size="$headline-large">
            Cohor
          </SizableText>
        </YStack>
        <GlassBottomSheet>
          <SizableText color="$white" size="$headline-small">
            Crear una cuenta
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
                    />
                  </BlurView>
                )}
              />
              {errors.email && (
                <SizableText ml={4} color="red">
                  {errors.email.message}
                </SizableText>
              )}
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
              {errors.password && (
                <SizableText ml={4} color="red">
                  {errors.password.message}
                </SizableText>
              )}
            </YStack>

            <Button
              borderColor="$element-high-opacity-mid"
              disabled={isSubmitting}
              onPress={handleSubmit(onSubmitRegister)}
            >
              Continuar
            </Button>
          </YStack>
        </GlassBottomSheet>
      </YStack>
      <Toast config={toastConfig} />
    </>
  )
}

import { Image, SizableText, useTheme, YStack } from "tamagui"

import React, { useState } from "react"

import GlassBottomSheet from "../../../components/GlassBotomSheet"
import { Button } from "../../../components/ui/Button"
import { Input } from "../../../components/ui/Input"

import { BlurView } from "expo-blur"
import { router } from "expo-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { CreateUserProfileSchema, CreateUserProfileForm } from "../../../lib/schema/auth/CreateUserProfileSchema"
import { endpoint } from "../../../lib/common/Endpoint"
import { useApiClient } from "../../../lib/http/useApiClient"

import Toast from "react-native-toast-message"
import DateTimePicker from "../../../components/ui/DatePicker"
import UploadIcon from "../../../components/icons/Upload"
import { useAuth } from "../../../lib/context/AuthContext"
import * as ImagePicker from "expo-image-picker"
import { User } from "@cohor/types"
import { toastConfig } from "../../../components/ui/Toast"
import FormError from "../../../components/FormError"

export default function CreateUserProfile() {
  const { user, setUser } = useAuth()
  const api = useApiClient()
  const theme = useTheme()
  const [showStepTwo, setShowStepTwo] = useState(false)
  const [image, setImage] = useState<string | null>(null)

  // valores de google pueden venir por default en el form (se le permite editarlos)
  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    control
  } = useForm<CreateUserProfileForm>({
    resolver: zodResolver(CreateUserProfileSchema)
  })

  const onCreateAccount: SubmitHandler<CreateUserProfileForm> = async (formValues) => {
    // si mando una fecha en el futuro me la toma igual. Tiene que validar en el front y en el back
    try {
      await api.put<CreateUserProfileForm, undefined>(endpoint.user.onboarding, formValues)
      setShowStepTwo(true)
      const userToUpdate: User = {
        id: user?.id ?? "",
        name: formValues.name,
        email: user?.email ?? "",
        birthdate: new Date(formValues.birthdate)
      }
      setUser(userToUpdate)
    } catch {
      Toast.show({
        type: "error",
        text1: "Error al registrar el usuario"
      })
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const onUpdateImage = () => {
    const userId = user?.id
    // se sube con S3 al bucket del userId la imagen seleccionada
    router.replace("/onboarding/user/success")
    return userId
  }

  return (
    <>
      <YStack gap={40} width="100%">
        <YStack justifyContent="center" alignItems="center" gap={4}>
          <SizableText textTransform="uppercase" color="$white" size="$headline-large">
            Cohor
          </SizableText>
        </YStack>
        {!showStepTwo ? (
          <GlassBottomSheet>
            <SizableText color="$white" size="$subhead-medium">
              Contanos quién sos
            </SizableText>
            <YStack gap={16} width="100%">
              <Controller
                name="name"
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
                      placeholder="Tu nombre"
                      placeholderTextColor="$white-opacity-high"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      hasError={!!errors.name}
                    />
                  </BlurView>
                )}
              />
              {errors.name && (
                <FormError message={errors.name.message!} />
              )}
              <Controller
                name="birthdate"
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
                    <DateTimePicker onChange={onChange} onBlur={onBlur} value={value} />
                  </BlurView>
                )}
              />
              {errors.birthdate && (
                <FormError message={errors.birthdate.message!} />
              )}
              <Button
                isDisabled={!isValid}
                onPress={handleSubmit(onCreateAccount)}
                borderColor="$element-high-opacity-mid"
                loading={isSubmitting}
              >
                Continuar
              </Button>
            </YStack>
          </GlassBottomSheet>
        ) : (
          <GlassBottomSheet>
            <SizableText color="$white" size="$subhead-medium">
              Elegí tu mejor foto
            </SizableText>
            <YStack gap={32} justifyContent="flex-end">
              <BlurView
                intensity={60}
                tint="light"
                style={{
                  borderRadius: 999,
                  overflow: "hidden"
                }}
              >
                {/* NO TIENE DASH el border */}
                <YStack
                  gap={8}
                  width={280}
                  height={280}
                  borderRadius={999}
                  alignItems="center"
                  justifyContent="center"
                  borderWidth={2}
                  borderColor="$white-opacity-mid"
                  onPress={pickImage}
                >
                  {image ? (
                    <Image source={{ uri: image }} style={{ width: "100%", height: "100%", borderRadius: 999 }} />
                  ) : (
                    <YStack alignItems="center" justifyContent="center">
                      <UploadIcon color={theme.white.val} width={52} height={52} />
                      <Button borderWidth={0} backgroundColor="transparent" color="$white" size="$body-small-w-medium">
                        Elegí desde tu galería
                      </Button>
                    </YStack>
                  )}
                </YStack>
              </BlurView>
              <Button disabled={!image} onPress={handleSubmit(onUpdateImage)} borderColor="$element-high-opacity-mid">
                Siguiente
              </Button>
            </YStack>
          </GlassBottomSheet>
        )}
      </YStack>
      <Toast config={toastConfig} />
    </>
  )
}

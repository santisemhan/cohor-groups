import { Image, ScrollView, SizableText, useTheme, YStack } from "tamagui"

import React, { useEffect, useState } from "react"

import GlassBottomSheet from "../../../components/GlassBotomSheet"
import { Button } from "../../../components/ui/Button"
import { Input } from "../../../components/ui/Input"

import { BlurView } from "expo-blur"
import { router } from "expo-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { CreateUserProfileSchema, CreateUserProfileForm } from "../../../lib/schema/onboarding/CreateUserProfileSchema"
import { endpoint } from "../../../lib/common/Endpoint"
import { useApiClient } from "../../../lib/http/useApiClient"

import DateTimePicker from "../../../components/ui/DatePicker"
import UploadIcon from "../../../components/icons/Upload"
import { useAuth } from "../../../lib/context/AuthContext"
import * as ImagePicker from "expo-image-picker"
import { OnboardingStep, User } from "@cohor/types"
import FormError from "../../../components/FormError"
import { useToastController } from "@tamagui/toast"
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME } from "../../../lib/common/Environment"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { KeyboardAvoidingView, Platform } from "react-native"

export default function CreateUserProfile() {
  const toast = useToastController()
  const { user, setUser } = useAuth()
  const api = useApiClient()
  const theme = useTheme()
  const [showStepTwo, setShowStepTwo] = useState(false)
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null)

  useEffect(() => {
    if (user?.onboardingStep === OnboardingStep.STEP_TWO) {
      setShowStepTwo(true)
    }
  }, [])

  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    control,
    setValue
  } = useForm<CreateUserProfileForm>({
    resolver: zodResolver(CreateUserProfileSchema)
  })

  useEffect(() => {
    async function fetchGoogleUser() {
      try {
        const googleUser = await GoogleSignin.getCurrentUser()
        if (googleUser) {
          setValue("name", googleUser.user.name || "")
        }
      } catch (error) {
        console.error("Failed to fetch Google user", error)
      }
    }

    fetchGoogleUser()
  }, [])

  const onCreateAccount: SubmitHandler<CreateUserProfileForm> = async (formValues) => {
    // si mando una fecha en el futuro me la toma igual. Tiene que validar en el front y en el back
    try {
      await api.put<CreateUserProfileForm & { onboardingStep: OnboardingStep }, undefined>(endpoint.user.onboarding, {
        ...formValues,
        onboardingStep: OnboardingStep.STEP_TWO
      })
      setShowStepTwo(true)
      const userToUpdate: User = {
        ...user!,
        name: formValues.name,
        birthdate: new Date(formValues.birthdate)
      }
      setUser(userToUpdate)
    } catch {
      toast.show("Error!", {
        message: "Error al registrar el usuario",
        customData: {
          backgroundColor: "$error"
        }
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
      setImage(result.assets[0])
    }
  }

  const onUpdateImage = async () => {
    try {
      const { signature, timestamp } = await api.get<{ signature: string; timestamp: string }>(
        endpoint.user.imagePresignedParams
      )
      const form = new FormData()

      // @ts-ignore
      form.append("file", {
        uri: image!.uri,
        name: user!.id,
        type: image!.mimeType
      })

      form.append("api_key", CLOUDINARY_API_KEY)
      form.append("timestamp", timestamp)
      form.append("signature", signature)
      form.append("folder", "profile")
      form.append("public_id", user!.id)

      await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: form
      })

      await api.put<CreateUserProfileForm & { onboardingStep: OnboardingStep }, undefined>(endpoint.user.onboarding, {
        name: user?.name,
        birthdate: user?.birthdate,
        onboardingStep: OnboardingStep.STEP_THREE
      })

      router.replace("/onboarding/user/success")
    } catch {
      toast.show("Error!", {
        message: "Error al cargar la imagen del usuario",
        customData: {
          backgroundColor: "$error"
        }
      })
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, width: "100%" }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-end"
        }}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
      >
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
                {errors.name && <FormError message={errors.name.message!} />}
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
                      <DateTimePicker onChange={onChange} onBlur={onBlur} value={value} hasError={!!errors.birthdate} />
                    </BlurView>
                  )}
                />
                {errors.birthdate && <FormError message={errors.birthdate.message!} />}
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
                  intensity={30}
                  tint="light"
                  style={{
                    borderRadius: 999,
                    overflow: "hidden"
                  }}
                >
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
                      <Image source={{ uri: image.uri }} style={{ width: "100%", height: "100%", borderRadius: 999 }} />
                    ) : (
                      <YStack alignItems="center" justifyContent="center">
                        <UploadIcon color={theme.white.val} width={52} height={52} />
                        <Button
                          borderWidth={0}
                          backgroundColor="transparent"
                          color="$white"
                          size="$body-small-w-medium"
                        >
                          Elegí desde tu galería
                        </Button>
                      </YStack>
                    )}
                  </YStack>
                </BlurView>
                <Button isDisabled={!image} onPress={onUpdateImage} borderColor="$element-high-opacity-mid">
                  Siguiente
                </Button>
              </YStack>
            </GlassBottomSheet>
          )}
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

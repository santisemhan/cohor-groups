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
import { StyleSheet } from "react-native"
import { User } from "@cohor/types"
import { toastConfig } from "../../../components/ui/Toast"

export default function CreateUserProfile() {
  const { user, setUser } = useAuth()
  const api = useApiClient()
  const theme = useTheme()
  const [showStepTwo, setShowStepTwo] = useState(false)
  const [image, setImage] = useState<string | null>(null)

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control
  } = useForm<CreateUserProfileForm>({
    resolver: zodResolver(CreateUserProfileSchema)
  })

  const onCreateAccount: SubmitHandler<CreateUserProfileForm> = async (formValues) => {
    api
      .put(endpoint.user.userOnobarding, formValues)
      .then(() => {
        setShowStepTwo(true)
        const userToUpdate: User = {
          id: user?.id ?? "",
          name: formValues.name,
          email: user?.email ?? "",
          birthdate: new Date(formValues.birthdate)
        }
        setUser(userToUpdate)
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Nombre y/o fecha de nacimiento incorrectos"
        })
      })
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    console.log(result)

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    image: {
      width: 200,
      height: 200
    }
  })

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
            <SizableText color="$white" size="$headline-small">
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
                    />
                  </BlurView>
                )}
              />
              {errors.name && (
                <SizableText ml={4} color="red">
                  {errors.name.message}
                </SizableText>
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
                <SizableText ml={4} color="red">
                  {errors.birthdate.message}
                </SizableText>
              )}
              <Button
                disabled={isSubmitting}
                onPress={handleSubmit(onCreateAccount)}
                borderColor="$element-high-opacity-mid"
              >
                Continuar
              </Button>
            </YStack>
          </GlassBottomSheet>
        ) : (
          <GlassBottomSheet>
            <SizableText color="$white" size="$headline-small">
              Elegí tu mejor foto
            </SizableText>
            <YStack gap={16} width="100%" height={400} justifyContent="flex-end">
              <BlurView
                intensity={60}
                tint="light"
                style={{
                  borderRadius: 999,
                  borderColor: theme["white-opacity-mid"].val,
                  borderWidth: 1,
                  overflow: "hidden"
                }}
              >
                {image ? (
                  <YStack
                    gap={8}
                    width="100px"
                    height={350}
                    borderRadius={999}
                    alignItems="center"
                    justifyContent="center"
                    borderWidth={2}
                    borderStyle="dashed"
                    borderColor="$white"
                  >
                    <Image source={{ uri: image }} style={styles.image} />
                  </YStack>
                ) : (
                  <YStack
                    gap={8}
                    width="100px"
                    height={350}
                    borderRadius={999}
                    alignItems="center"
                    justifyContent="center"
                    borderWidth={2}
                    borderStyle="dashed"
                    borderColor="$white"
                    onPress={pickImage}
                  >
                    <UploadIcon color="$white" />
                    <Button borderWidth={0} backgroundColor="transparent" color="$white">
                      Elegí desde tu galería
                    </Button>
                  </YStack>
                )}
              </BlurView>
              <Button
                disabled={isSubmitting}
                onPress={handleSubmit(onUpdateImage)}
                borderColor="$element-high-opacity-mid"
              >
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

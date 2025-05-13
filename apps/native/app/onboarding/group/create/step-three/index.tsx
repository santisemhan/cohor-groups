import { Image, SizableText, useTheme, YStack } from "tamagui"
import GlassBottomSheet from "../../../../../components/GlassBotomSheet"
import { BlurView } from "expo-blur"
import UploadIcon from "../../../../../components/icons/Upload"
import { Button } from "../../../../../components/ui/Button"
import * as ImagePicker from "expo-image-picker"
import { useState } from "react"
import { useToastController } from "@tamagui/toast"
import { endpoint } from "../../../../../lib/common/Endpoint"
import { useApiClient } from "../../../../../lib/http/useApiClient"
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME } from "../../../../../lib/common/Environment"
import { useRouter } from "expo-router"
import { CreateGroupForm } from "../../../../../lib/schema/onboarding/group/CreateGroupSchema"
import useOnboardingGroupStore from "../../../../../lib/store/onboardingGroupStore"

export default function CreateGroupStepThree() {
  const { form: data, setFormValues } = useOnboardingGroupStore()
  const router = useRouter()
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(data.image || null)
  const [isLoading, setIsLoading] = useState(false)
  const api = useApiClient()
  const theme = useTheme()
  const toast = useToastController()

  const onUpdateImage = async () => {
    try {
      setIsLoading(true)
      const response = await api.post<CreateGroupForm, { id: string; code: number; name: string }>(
        endpoint.group.groups,
        {
          interestIds: data.interests,
          name: data.name
        }
      )

      const { signature, timestamp } = await api.get<{ signature: string; timestamp: string }>(
        endpoint.group.imagePresignedParams
      )
      const form = new FormData()
      // @ts-ignore
      form.append("file", {
        uri: image!.uri,
        name: response.id,
        type: image!.mimeType
      })

      form.append("api_key", CLOUDINARY_API_KEY)
      form.append("timestamp", timestamp)
      form.append("signature", signature)
      form.append("folder", "group-profile")
      form.append("public_id", response.id)

      await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: form
      })
      router.replace({
        pathname: "/onboarding-success/creation",
        params: { code: response.code, name: response.name }
      })
    } catch {
      toast.show("Error al crear el grupo", {
        customData: {
          backgroundColor: "$error"
        }
      })
    } finally {
      setIsLoading(false)
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
      setFormValues({ ...data, image: result.assets[0] })
    }
  }

  return (
    <GlassBottomSheet>
      <SizableText color="$white" size="$subhead-medium">
        Seleccioná una foto para tu grupo
      </SizableText>
      <YStack gap={32} justifyContent="flex-end" width="100%">
        <BlurView
          intensity={30}
          tint="light"
          style={{
            borderRadius: 32,
            overflow: "hidden"
          }}
        >
          <YStack
            gap={8}
            width="100%"
            height={480}
            borderRadius={32}
            alignItems="center"
            justifyContent="center"
            borderWidth={2}
            borderColor="$white-opacity-mid"
            onPress={pickImage}
          >
            {image ? (
              <Image source={{ uri: image.uri }} style={{ width: "100%", height: "100%", borderRadius: 32 }} />
            ) : (
              <YStack alignItems="center" justifyContent="center" width="100%">
                <UploadIcon color={theme.white.val} width={52} height={52} />
                <Button borderWidth={0} backgroundColor="transparent" color="$white" size="$body-small-w-medium">
                  Elegí desde tu galería
                </Button>
              </YStack>
            )}
          </YStack>
        </BlurView>
        <Button
          isDisabled={!image || isLoading}
          disabled={!image || isLoading}
          borderColor="$element-high-opacity-mid"
          onPress={onUpdateImage}
          loading={isLoading}
        >
          Siguiente
        </Button>
      </YStack>
    </GlassBottomSheet>
  )
}

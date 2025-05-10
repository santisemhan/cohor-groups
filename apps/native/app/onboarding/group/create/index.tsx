import { useEffect, useState } from "react"
import { Image, ScrollView, Separator, SizableText, useTheme, XStack, YStack } from "tamagui"
import Reanimated, { useAnimatedStyle } from "react-native-reanimated"
import GlassBottomSheet from "../../../../components/GlassBotomSheet"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { BlurView } from "expo-blur"
import { Input } from "../../../../components/ui/Input"
import FormError from "../../../../components/FormError"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../../../../components/ui/Button"
import * as ImagePicker from "expo-image-picker"
import UploadIcon from "../../../../components/icons/Upload"
import MapPinIcon from "../../../../components/icons/MapPin"
import { CreateGroupForm, CreateGroupSchema } from "../../../../lib/schema/onboarding/group/CreateGroupSchema"
import { router } from "expo-router"
import { useToastController } from "@tamagui/toast"
import { useApiClient } from "../../../../lib/http/useApiClient"
import { Category } from "@cohor/types"
import { endpoint } from "../../../../lib/common/Endpoint"
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME } from "../../../../lib/common/Environment"
import { KeyboardGestureArea } from "react-native-keyboard-controller"
import { useKeyboardAnimation } from "../../../../lib/hooks/useKeyboardAnimation"
import Chip from "../../../../components/ui/Chip"
import { unicodeToHex } from "../../../../lib/support/unicodeToHex"
// Hay que usar https://www.npmjs.com/package/react-native-google-places-autocomplete pero sale plata la api de google. Se puede reemplazar la api de google por otras, algo asi: https://stackoverflow.com/questions/71714305/alternatives-for-places-api-autocomplete-for-expo-react-native
export default function CreateGroup() {
  const toast = useToastController()
  const api = useApiClient()
  const [categories, setCategories] = useState<Category[]>([])
  const [rotations, setRotations] = useState<
    {
      interestId: string
      rotation: number
    }[]
  >([])
  const [selectedInterest, setSelectedInterest] = useState<string[]>([])
  const [step, setStep] = useState<"ONE" | "TWO" | "THREE">("ONE")
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null)
  const theme = useTheme()

  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    control
  } = useForm<CreateGroupForm>({
    resolver: zodResolver(CreateGroupSchema)
  })

  const onPressChip = (interestId: string) => {
    if (selectedInterest.includes(interestId)) {
      setSelectedInterest(selectedInterest.filter((interest) => interest !== interestId))
      return
    }
    setSelectedInterest([...selectedInterest, interestId])
  }

  useEffect(() => {
    const onGetCategories = async () => {
      try {
        const categories = await api.get<Category[]>(endpoint.category.root)
        setCategories(categories)
        setRotations(
          categories.flatMap((category) =>
            category.interests.map((interest) => ({
              interestId: interest.id,
              rotation: Math.floor(Math.random() * 8)
            }))
          )
        )
      } catch {
        toast.show("Error al obtener categorias", {
          customData: {
            backgroundColor: "$error"
          }
        })
      }
    }
    onGetCategories()
  }, [])

  const onCreateGroup = async () => {
    setStep("TWO")
  }

  const onSelectImage = async () => {
    setStep("THREE")
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

  const onUpdateImage: SubmitHandler<CreateGroupForm> = async (data) => {
    try {
      //despues mandamos las otras cosas cuando definamos todo
      const response = await api.post<CreateGroupForm, { id: string; code: number; name: string }>(
        endpoint.group.root,
        {
          interestIds: selectedInterest,
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
        pathname: "/onboarding/group/create/success",
        params: { code: response.code, name: response.name }
      })
    } catch {
      toast.show("Error al crear el grupo", {
        customData: {
          backgroundColor: "$error"
        }
      })
    }
  }

  const { height } = useKeyboardAnimation()

  const scrollViewStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: -height.value }]
    }),
    []
  )

  return (
    <KeyboardGestureArea interpolator="ios" offset={50} style={{ flex: 1, width: "100%" }}>
      <Reanimated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ height: "100%", flex: 1, justifyContent: "flex-end", width: "100%" }}
        style={scrollViewStyle}
      >
        <YStack gap={40} width="100%">
          <YStack justifyContent="center" alignItems="center" gap={4}>
            <SizableText textTransform="uppercase" color="$white" size="$headline-large">
              Cohor
            </SizableText>
          </YStack>
          {step === "ONE" && (
            <GlassBottomSheet>
              <SizableText color="$white" size="$subhead-medium">
                Iniciar un grupo
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
                        placeholder="Nombre del grupo"
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
                  name="description"
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
                        placeholder="Describe al grupo en una linea"
                        placeholderTextColor="$white-opacity-high"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        hasError={!!errors.name}
                      />
                    </BlurView>
                  )}
                />
                {errors.description && <FormError message={errors.description.message!} />}
                <Controller
                  name="location"
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
                      <XStack alignItems="center" ml={16}>
                        <MapPinIcon color={theme.white.val} width={20} height={20} />
                        <Input
                          borderWidth={0}
                          pl={4}
                          width="100%"
                          backgroundColor="transparent"
                          color="$white-opacity-high"
                          placeholder="Ubicación"
                          placeholderTextColor="$white-opacity-high"
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                          hasError={!!errors.name}
                        />
                      </XStack>
                    </BlurView>
                  )}
                />
                {errors.location && <FormError message={errors.location.message!} />}

                <Button
                  isDisabled={!isValid}
                  disabled={!isValid}
                  onPress={onCreateGroup}
                  borderColor="$element-high-opacity-mid"
                >
                  Continuar
                </Button>
              </YStack>
            </GlassBottomSheet>
          )}
          {step === "TWO" && (
            <GlassBottomSheet>
              <SizableText color="$white" size="$subhead-medium">
                Elige los intereses de tu grupo
              </SizableText>
              <YStack gap={32} justifyContent="flex-end" width="100%">
                <ScrollView maxHeight={500} width="100%" mb="20">
                  <YStack gap="24">
                    {categories.length > 0 &&
                      categories.map((category) => (
                        <YStack gap="24">
                          <XStack alignItems="center" gap="8">
                            <Separator borderColor="$white-opacity-mid" />
                            <SizableText color="$white" size={"$body-small-w-medium"}>
                              {category.name}
                            </SizableText>
                            <Separator borderColor="$white-opacity-mid" />
                          </XStack>
                          <XStack flexWrap="wrap" gap="16" justifyContent="center">
                            {category.interests.map((interest) => (
                              <Chip
                                rotate={`${rotations.find((rotation) => rotation.interestId === interest.id)?.rotation || 0}deg`}
                                backgroundColor={
                                  selectedInterest.includes(interest.id) ? "$white" : "$white-opacity-low"
                                }
                                onPress={() => onPressChip(interest.id)}
                              >
                                <SizableText
                                  color={selectedInterest.includes(interest.id) ? "$black" : "$white"}
                                  size="$body-small-w-medium"
                                >
                                  {interest.name}
                                </SizableText>
                                <SizableText>{String.fromCodePoint(unicodeToHex(interest.unicode))}</SizableText>
                              </Chip>
                            ))}
                          </XStack>
                        </YStack>
                      ))}
                  </YStack>
                </ScrollView>
                <Button
                  isDisabled={selectedInterest.length < 1}
                  disabled={selectedInterest.length < 1}
                  borderColor="$element-high-opacity-mid"
                  loading={isSubmitting}
                  onPress={onSelectImage}
                >
                  Siguiente
                </Button>
              </YStack>
            </GlassBottomSheet>
          )}
          {step === "THREE" && (
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
                <Button
                  isDisabled={!image}
                  disabled={!image}
                  borderColor="$element-high-opacity-mid"
                  loading={isSubmitting}
                  onPress={handleSubmit(onUpdateImage)}
                >
                  Siguiente
                </Button>
              </YStack>
            </GlassBottomSheet>
          )}
        </YStack>
      </Reanimated.ScrollView>
    </KeyboardGestureArea>
  )
}

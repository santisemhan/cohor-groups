import { Separator, SizableText, XStack, YStack, ScrollView } from "tamagui"
import GlassBottomSheet from "../../../../../components/GlassBotomSheet"
import Chip from "../../../../../components/ui/Chip"
import { useEffect, useState } from "react"
import { Button } from "../../../../../components/ui/Button"
import { Category } from "@cohor/types"
import { useApiClient } from "../../../../../lib/http/useApiClient"
import { endpoint } from "../../../../../lib/common/Endpoint"
import { useToastController } from "@tamagui/toast"
import { unicodeToHex } from "../../../../../lib/utils/support/unicodeToHex"
import useOnboardingGroupStore from "../../../../../lib/store/onboardingGroupStore"
import { useRouter } from "expo-router"

export default function CreateGroupStepTwo() {
  const api = useApiClient()
  const toast = useToastController()
  const router = useRouter()
  const { form, setFormValues } = useOnboardingGroupStore()
  const [loading, setLoading] = useState(false)
  const [selectedInterest, setSelectedInterest] = useState<string[]>(form.interests || [])
  const [categories, setCategories] = useState<Category[]>([])
  const [rotations, setRotations] = useState<
    {
      interestId: string
      rotation: number
    }[]
  >([])

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
        setLoading(true)
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
      } finally {
        setLoading(false)
      }
    }
    onGetCategories()
  }, [])

  const onSetStepTwo = () => {
    setFormValues({ ...form, interests: selectedInterest })
    router.push("/onboarding/group/create/step-three")
  }

  return (
    <GlassBottomSheet>
      <SizableText color="$white" size="$subhead-medium">
        Elige los intereses de tu grupo
      </SizableText>
      <YStack gap={32} justifyContent="flex-end" width="100%">
        <ScrollView maxHeight={500} width="100%" mb="20">
          <YStack gap="24">
            {categories.length > 0 &&
              categories.map((category) => (
                <YStack gap="24" key={category.id}>
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
                        backgroundColor={selectedInterest.includes(interest.id) ? "$white" : "$white-opacity-low"}
                        onPress={() => onPressChip(interest.id)}
                        key={interest.id}
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
          isDisabled={selectedInterest.length < 1 || loading}
          disabled={selectedInterest.length < 1 || loading}
          loading={loading}
          borderColor="$element-high-opacity-mid"
          onPress={onSetStepTwo}
        >
          Siguiente
        </Button>
      </YStack>
    </GlassBottomSheet>
  )
}

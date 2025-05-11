import { Image, SizableText, YStack } from "tamagui"
import GlassBottomSheet from "../../../components/GlassBotomSheet"
import { Button } from "../../../components/ui/Button"
import { router, useLocalSearchParams } from "expo-router"

export default function SuccessJoinGroup() {
  const { name, imageURL } = useLocalSearchParams()

  console.log(imageURL)

  return (
    <YStack gap={40} width="100%">
      <GlassBottomSheet>
        <YStack gap={12} width="100%" justifyContent="center" alignItems="center">
          <SizableText color="$white-opacity-high" size="$body-small-w-medium">
            ¡Ya estás dentro!
          </SizableText>
          <SizableText color="$white" size="$headline-large">
            {name}
          </SizableText>
        </YStack>
        <YStack
          gap={8}
          width="100%"
          height={400}
          borderRadius={32}
          alignItems="center"
          justifyContent="center"
          borderWidth={2}
          borderColor="$white-opacity-mid"
        >
          <Image source={{ uri: imageURL.toString() }} style={{ width: "100%", height: "100%", borderRadius: 32 }} />
        </YStack>
        <Button width="100%" borderColor="$element-high-opacity-mid" onPress={() => router.replace("/app")}>
          Continuar
        </Button>
      </GlassBottomSheet>
    </YStack>
  )
}

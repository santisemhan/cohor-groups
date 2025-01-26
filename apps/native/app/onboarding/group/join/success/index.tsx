import { Image, SizableText, YStack } from "tamagui"
import GlassBottomSheet from "../../../../../components/GlassBotomSheet"
import { Button } from "../../../../../components/ui/Button"
import { router } from "expo-router"

export default function SuccessJoinGroup() {
  return (
    <YStack gap={40} width="100%">
      <GlassBottomSheet>
        <YStack gap={12} width="100%" justifyContent="center" alignItems="center">
          <SizableText color="$white-opacity-high" size="$body-small-w-medium">
            ¡Ya estás dentro!
          </SizableText>
          <SizableText color="$white-opacity-high" size="$headline-large">
            Dios, Patria y Familia!
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
          <Image
            source={{ uri: "https://i.pinimg.com/736x/a6/aa/b5/a6aab5d443ad179a060173c85651f99a.jpg" }}
            style={{ width: "100%", height: "100%", borderRadius: 32 }}
          />
        </YStack>
        <Button width="100%" borderColor="$element-high-opacity-mid" onPress={() => router.replace("/app")}>
          Continuar
        </Button>
      </GlassBottomSheet>
    </YStack>
  )
}

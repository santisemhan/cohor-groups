import { SizableText, View, YStack } from "tamagui"
import { Slot } from "expo-router"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"

export default function CreateGroupLayout() {
  return (
    <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1, width: "100%" }}>
      <View
        style={{
          flexGrow: 1,
          justifyContent: "flex-end"
        }}
      >
        <YStack gap={40} width="100%">
          <YStack justifyContent="center" alignItems="center" gap={4}>
            <SizableText textTransform="uppercase" color="$white" size="$headline-large">
              Cohor
            </SizableText>
          </YStack>
          <Slot />
        </YStack>
      </View>
    </KeyboardAvoidingView>
  )
}

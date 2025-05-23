import { SizableText, View, YStack } from "tamagui"
import GlassBottomSheet from "../../../../components/GlassBotomSheet"
import OtpInput from "../../../../components/ui/OTPInput"
import { Button } from "../../../../components/ui/Button"
import { JoinGroupForm, JoinGroupSchema } from "../../../../lib/schema/onboarding/group/JoinGroupSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { router } from "expo-router"
import { useToastController } from "@tamagui/toast"
import { useApiClient } from "../../../../lib/http/useApiClient"
import { endpoint } from "../../../../lib/common/Endpoint"
import { Group } from "@cohor/types"
import { KeyboardAvoidingView } from "react-native-keyboard-controller"

export default function JoinGroup() {
  const toast = useToastController()
  const api = useApiClient()
  const {
    formState: { isSubmitting, isValid },
    handleSubmit,
    control
  } = useForm<JoinGroupForm>({
    resolver: zodResolver(JoinGroupSchema)
  })

  const onSumbitJoinGroup: SubmitHandler<JoinGroupForm> = async (formValues) => {
    try {
      const { name, imageUrl } = await api.post<JoinGroupForm, Group>(endpoint.group.join, {
        code: parseInt(formValues.code, 10)
      })
      router.replace({
        pathname: "/onboarding-success/join",
        params: { name: name, imageURL: imageUrl }
      })
    } catch {
      toast.show("Error al entrar al grupo", {
        customData: {
          backgroundColor: "$error"
        }
      })
    }
  }

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
          <GlassBottomSheet>
            <YStack gap={12} width="100%" justifyContent="center" alignItems="center">
              <SizableText color="$white" size="$headline-small">
                Unite con tu código
              </SizableText>
              <SizableText color="$white-opacity-high" size="$body-small" w="50%" textAlign="center">
                Ingresá el código que te compartieron para unirte.
              </SizableText>
            </YStack>
            <YStack gap={32} width="100%">
              <Controller
                control={control}
                name="code"
                render={({ field: { onChange, value } }) => <OtpInput value={value} onChange={onChange} />}
              />
              <Button
                isDisabled={!isValid}
                loading={isSubmitting}
                onPress={handleSubmit(onSumbitJoinGroup)}
                borderColor="$element-high-opacity-mid"
              >
                Confirmar
              </Button>
            </YStack>
          </GlassBottomSheet>
        </YStack>
      </View>
    </KeyboardAvoidingView>
  )
}

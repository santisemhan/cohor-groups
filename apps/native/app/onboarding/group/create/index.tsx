import { SizableText, useTheme, XStack, YStack } from "tamagui"
import GlassBottomSheet from "../../../../components/GlassBotomSheet"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { BlurView } from "expo-blur"
import { Input } from "../../../../components/ui/Input"
import FormError from "../../../../components/FormError"
import { Button } from "../../../../components/ui/Button"
import MapPinIcon from "../../../../components/icons/MapPin"
import { CreateGroupForm, CreateGroupSchema } from "../../../../lib/schema/onboarding/group/CreateGroupSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import useOnboardingGroupStore from "../../../../lib/store/onboardingGroupStore"
import { router } from "expo-router"

export default function CreateGroupStepOne() {
  const { form, setFormValues } = useOnboardingGroupStore()
  const theme = useTheme()

  const {
    formState: { errors, isValid },
    handleSubmit,
    control
  } = useForm<CreateGroupForm>({
    defaultValues: {
      name: form.name,
      description: form.description,
      location: form.location
    },
    resolver: zodResolver(CreateGroupSchema)
  })

  const onSetStepOne: SubmitHandler<CreateGroupForm> = (data) => {
    setFormValues({ ...form, ...data })
    router.push("/onboarding/group/create/step-two")
  }

  return (
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
          onPress={handleSubmit(onSetStepOne)}
          borderColor="$element-high-opacity-mid"
        >
          Continuar
        </Button>
      </YStack>
    </GlassBottomSheet>
  )
}

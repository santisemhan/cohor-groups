import { SizableText, Stack, useTheme, XStack, YStack } from "tamagui"
import React, { useState } from "react"
import GlassBottomSheet from "../../../components/GlassBotomSheet"
import { Button } from "../../../components/ui/Button"
import { Input } from "../../../components/ui/Input"
import EyeIcon from "../../../components/icons/Eye"
import EyeSlashIcon from "../../../components/icons/EyeSlash"
import { BlurView } from "expo-blur"

export default function Register() {
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <GlassBottomSheet>
      <SizableText color="$white" size="$headline-small">
        Crear una cuenta
      </SizableText>
      <YStack gap={24} width="100%">
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
            placeholder="Email"
            placeholderTextColor="$white-opacity-high"
          />
        </BlurView>
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
          <XStack height={50} width="100%" alignItems="center">
            <Input
              width="100%"
              position="absolute"
              borderWidth={0}
              backgroundColor="transparent"
              color="$white-opacity-high"
              placeholder="Contraseña"
              placeholderTextColor="$white-opacity-high"
              secureTextEntry={!showPassword}
            />
            <Stack position="absolute" width="100%" paddingRight={16} alignItems="flex-end" justifyContent="center">
              {showPassword ? (
                <EyeIcon
                  color={theme.white.val}
                  onPress={() => setShowPassword((prev) => !prev)}
                  height={21}
                  width={21}
                />
              ) : (
                <EyeSlashIcon
                  color={theme.white.val}
                  onPress={() => setShowPassword((prev) => !prev)}
                  height={21}
                  width={21}
                />
              )}
            </Stack>
          </XStack>
        </BlurView>
        <Button borderColor="rgba(255, 255, 255, 0.2)">Continuar</Button>
      </YStack>
    </GlassBottomSheet>
  )
}

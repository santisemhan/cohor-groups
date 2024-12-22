import { SizableText, Stack, useTheme, View, XStack, YStack } from "tamagui"
import { ResizeMode, Video } from "expo-av"
import React, { useRef, useState } from "react"
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import GlassBottomSheet from "../../components/GlassBotomSheet"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import EyeIcon from "../../components/icons/Eye"
import EyeSlashIcon from "../../components/icons/EyeSlash"
import { BlurView } from "expo-blur"
import { useFocusEffect } from "expo-router"

export default function AuthWithEmail() {
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false)

  const videoRef = useRef<Video>(null)

  useFocusEffect(
    React.useCallback(() => {
      videoRef.current?.playAsync()

      return () => {
        videoRef.current?.pauseAsync()
      }
    }, [])
  )

  return (
    <View style={{ display: "flex", height: "100%", justifyContent: "flex-end", alignItems: "center" }}>
      <Video
        ref={videoRef}
        source={require("../../assets/video/CohorCreateAccount.mp4")}
        rate={1.0}
        volume={1.0}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      />
      <KeyboardAvoidingView style={{ flex: 1, width: "100%" }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end"
          }}
          keyboardShouldPersistTaps="handled"
        >
          <YStack gap={40} width="100%">
            <YStack justifyContent="center" alignItems="center" gap={4}>
              <SizableText textTransform="uppercase" color="$white" size="$headline-large">
                Cohor
              </SizableText>
            </YStack>
            <GlassBottomSheet>
              <SizableText color="$white" size="$headline-small">
                Iniciar Sesión
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
                    <Stack
                      position="absolute"
                      width="100%"
                      paddingRight={16}
                      alignItems="flex-end"
                      justifyContent="center"
                    >
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
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

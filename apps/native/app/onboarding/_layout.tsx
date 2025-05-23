import { View } from "tamagui"
import { ResizeMode, Video } from "expo-av"
import React, { useEffect, useRef } from "react"
import { Slot, useFocusEffect } from "expo-router"
import { useAuth } from "../../lib/context/AuthContext"
import { endpoint } from "../../lib/common/Endpoint"
import { useApiClient } from "../../lib/http/useApiClient"
import { User } from "@cohor/types"

export default function OnboardingLayout() {
  const videoRef = useRef<Video>(null)
  const api = useApiClient()
  const { setUser } = useAuth()

  useEffect(() => {
    const setUserLoggedIn = async () => {
      const loggedUserResponse = await api.get<{ user: User }>(endpoint.auth.loggedUser)
      setUser(loggedUserResponse.user)
    }

    setUserLoggedIn()
  }, [])

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
      <Slot />
    </View>
  )
}

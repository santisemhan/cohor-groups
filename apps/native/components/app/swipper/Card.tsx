import { SwippeableGroup } from "@cohor/types"
import { Avatar, Image, SizableText, View, XStack, YStack, ScrollView } from "tamagui"
import Gradient from "../../ui/Gradient"
import { GestureDetector, Gesture } from "react-native-gesture-handler"
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from "react-native-reanimated"
import { useWindowDimensions } from "react-native"
import { useState } from "react"

export default function Card({
  group,
  onSwipe
}: {
  group: SwippeableGroup
  onSwipe: (direction: "left" | "right") => void
}) {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions()
  const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25

  const [isVisible, setIsVisible] = useState(true)
  const [isTeamVisible, setIsTeamVisible] = useState(false)

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const rotate = useSharedValue(0)
  const opacity = useSharedValue(1)
  const teamSectionHeight = useSharedValue(SCREEN_HEIGHT * 0.15) // Altura inicial del contenedor de "Miembros del equipo"
  const teamSectionOpacity = useSharedValue(0)

  // Altura dinámica para el contenedor de "Miembros del equipo"
  const TEAM_SECTION_HEIGHT = SCREEN_HEIGHT * 0.7 // Ocupa el 80% de la pantalla

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { rotate: `${rotate.value}deg` }],
    opacity: opacity.value
  }))

  const teamSectionStyle = useAnimatedStyle(() => ({
    height: teamSectionHeight.value,
    opacity: teamSectionOpacity.value,
    overflow: "hidden"
  }))

  const handleSwipeComplete = (direction: "left" | "right") => {
    onSwipe(direction)
    setIsVisible(false)
  }

  const horizontalPanGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (isTeamVisible) return
      translateX.value = event.translationX
      rotate.value = (event.translationX / SCREEN_WIDTH) * 20
    })
    .onEnd((event) => {
      if (isTeamVisible) return
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SCREEN_WIDTH, {}, () => runOnJS(handleSwipeComplete)("right"))
        opacity.value = withTiming(0, { duration: 300 })
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH, {}, () => runOnJS(handleSwipeComplete)("left"))
        opacity.value = withTiming(0, { duration: 300 })
      } else {
        translateX.value = withSpring(0)
        rotate.value = withSpring(0)
      }
    })

  const verticalPanGesture = Gesture.Pan().onEnd((event) => {
    if (event.translationY < -50) {
      runOnJS(setIsTeamVisible)(true)
      teamSectionHeight.value = withTiming(TEAM_SECTION_HEIGHT, { duration: 300 }) // Usa la altura dinámica
      teamSectionOpacity.value = withTiming(1, { duration: 300 })
    } else if (event.translationY > 50) {
      runOnJS(setIsTeamVisible)(false)
      teamSectionHeight.value = withTiming(TEAM_SECTION_HEIGHT * 0.2, { duration: 300 })
      teamSectionOpacity.value = withTiming(0, { duration: 300 })
    }
    translateY.value = withSpring(0)
  })

  const combinedGesture = Gesture.Simultaneous(horizontalPanGesture, verticalPanGesture)

  if (!isVisible) {
    return null
  }

  return (
    <GestureDetector gesture={combinedGesture}>
      <Animated.View
        style={[{ position: "absolute", width: "100%", height: "100%", overflow: "hidden" }, animatedStyle]}
      >
        <Image src={group.imageUrl} alt={group.name} objectFit="cover" width="100%" height="100%" />

        <View position="absolute" bottom={0} left={0} right={0} height="50%" zIndex={1}>
          <Gradient fromColor="rgba(0,0,0,0)" toColor="rgba(0,0,0,0)" height="100%" opacityColor1={0} />
        </View>

        <View position="absolute" top={-10} left={0} right={0} height="20%" zIndex={1} rotate="180deg">
          <Gradient fromColor="rgba(0,0,0,0)" toColor="rgba(0, 0, 0, 0)" height="100%" opacityColor1={0} />
        </View>

        <View position="absolute" bottom={0} left={0} right={0} justifyContent="center" alignItems="center" zIndex={2}>
          <YStack gap={8}>
            <SizableText color="$white" size="$display-small" textAlign="center">
              {group.name}
            </SizableText>
            <SizableText color="$white-opacity-high" size="$body-small-w-medium" textAlign="center">
              {group.presentation}
            </SizableText>
          </YStack>
          <XStack alignItems="center" gap="$4" marginTop={12}>
            <XStack position="relative" width={50} height={24}>
              {group.members.slice(0, 3).map((member, index) => (
                <Avatar
                  key={member.id}
                  circular
                  size="$2"
                  position="absolute"
                  left={index * 17}
                  zIndex={3 - index}
                  borderColor={"$white-opacity-low"}
                  borderWidth={1}
                >
                  <Avatar.Image accessibilityLabel={member.name} src={member.imageUrl} />
                  <Avatar.Fallback backgroundColor="$blue10" />
                </Avatar>
              ))}
            </XStack>
            <SizableText size="$label-large-w-medium" color="$white-opacity-high">
              {`${group.members.length} miembros`}
            </SizableText>
          </XStack>
          {/* Sección "Miembros del equipo" con ScrollView y altura dinámica */}
          <Animated.View style={[{ width: "100%" }, teamSectionStyle]}>
            <ScrollView style={{ maxHeight: TEAM_SECTION_HEIGHT }}>
              <YStack gap={8} marginTop={12}>
                {group.members.map((member) => (
                  <XStack key={member.id} alignItems="center" gap={8}>
                    <Avatar circular size="$2">
                      <Avatar.Image accessibilityLabel={member.name} src={member.imageUrl} />
                      <Avatar.Fallback backgroundColor="$blue10" />
                    </Avatar>
                    <SizableText color="$white">{member.name}</SizableText>
                  </XStack>
                ))}
              </YStack>
            </ScrollView>
          </Animated.View>
        </View>
      </Animated.View>
    </GestureDetector>
  )
}

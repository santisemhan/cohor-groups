import React, { useState, useRef, useImperativeHandle, forwardRef } from "react"
import { Avatar, Image, SizableText, View, XStack, YStack, Separator } from "tamagui"
import { GestureDetector, Gesture, FlatList, ScrollView } from "react-native-gesture-handler"
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from "react-native-reanimated"
import { useWindowDimensions } from "react-native"
import MapPinIcon from "../../icons/MapPin"
import { SwippeableGroup } from "@cohor/types"
import Gradient from "../../ui/Gradient"
import Chip from "../../ui/Chip"
import { unicodeToHex } from "../../../lib/utils/support/unicodeToHex"

export type CardHandle = { swipeLeft: () => void; swipeRight: () => void }

export default forwardRef<CardHandle, { group: SwippeableGroup; onSwipe: (direction: "left" | "right") => void }>(
  function Card({ group, onSwipe }, ref) {
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions()
    const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.1

    const [isVisible, setIsVisible] = useState(true)
    const [isTeamVisible, setIsTeamVisible] = useState(false)

    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const rotate = useSharedValue(0)
    const opacity = useSharedValue(1)
    const teamSectionHeight = useSharedValue(SCREEN_HEIGHT * 0.12)
    const teamSectionOpacity = useSharedValue(0)
    const backgroundOpacity = useSharedValue(0.3)
    const scrollX = useSharedValue(SCREEN_WIDTH)

    const TEAM_SECTION_HEIGHT = SCREEN_HEIGHT * 0.65

    const flatListRef = useRef<FlatList>(null)

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { rotate: `${rotate.value}deg` }],
      opacity: opacity.value
    }))

    const teamSectionStyle = useAnimatedStyle(() => ({
      height: teamSectionHeight.value,
      opacity: teamSectionOpacity.value
    }))

    const backgroundStyle = useAnimatedStyle(() => ({ opacity: backgroundOpacity.value }))

    const handleSwipeComplete = (direction: "left" | "right") => {
      onSwipe(direction)
      setIsVisible(false)
    }

    const swipeLeft = () => {
      translateX.value = withTiming(-SCREEN_WIDTH, {}, () => runOnJS(handleSwipeComplete)("left"))
      opacity.value = withTiming(0, { duration: 300 })
    }

    const swipeRight = () => {
      translateX.value = withTiming(SCREEN_WIDTH, {}, () => runOnJS(handleSwipeComplete)("right"))
      opacity.value = withTiming(0, { duration: 300 })
    }

    useImperativeHandle(ref, () => ({ swipeLeft, swipeRight }))

    const scrollToStart = () => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
    }

    const scrollToEnd = () => {
      flatListRef.current?.scrollToEnd({ animated: true })
    }

    const horizontalPanGesture = Gesture.Pan()
      .onUpdate((event) => {
        if (isTeamVisible) return
        if (Math.abs(event.translationY) > Math.abs(event.translationX)) return

        translateX.value = event.translationX
        rotate.value = (event.translationX / SCREEN_WIDTH) * 20
      })
      .onEnd((event) => {
        if (isTeamVisible) return
        if (Math.abs(event.translationY) > Math.abs(event.translationX)) return

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
        teamSectionHeight.value = withTiming(TEAM_SECTION_HEIGHT, { duration: 400 })
        teamSectionOpacity.value = withTiming(1, { duration: 400 })
        backgroundOpacity.value = withTiming(0.75, { duration: 400 })
        scrollX.value = withTiming(0, { duration: 400 }, () => {
          runOnJS(scrollToStart)()
        })
      } else if (event.translationY > 50) {
        runOnJS(setIsTeamVisible)(false)
        teamSectionHeight.value = withTiming(TEAM_SECTION_HEIGHT * 0.2, { duration: 400 })
        teamSectionOpacity.value = withTiming(0, { duration: 400 })
        backgroundOpacity.value = withTiming(0.3, { duration: 400 })
        scrollX.value = withTiming(SCREEN_WIDTH, { duration: 0 }, () => {
          runOnJS(scrollToEnd)()
        })
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
          <Image src={group.imageURL} alt={group.name} objectFit="cover" width="100%" height="100%" />

          <Animated.View
            style={[
              {
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "100%",
                zIndex: 1,
                backgroundColor: "black"
              },
              backgroundStyle
            ]}
          ></Animated.View>
          <View position="absolute" bottom={0} left={0} right={0} height="20%" zIndex={1}>
            <Gradient fromColor="rgb(0,0,0)" toColor="rgb(0,0,0)" height="100%" opacityColor1={0} />
          </View>
          <View position="absolute" top={-10} left={0} right={0} height="20%" zIndex={1} rotate="180deg">
            <Gradient fromColor="rgb(0,0,0)" toColor="rgb(0,0,0)" height="100%" opacityColor1={0} />
          </View>

          <View
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            justifyContent="center"
            alignItems="center"
            zIndex={2}
          >
            <YStack gap={8}>
              <SizableText color="$white" size="$display-small" textAlign="center">
                {group.name}
              </SizableText>
              <XStack gap={4} justifyContent="center" alignItems="center">
                <MapPinIcon width={18} />
                <SizableText color="$white-opacity-high" size="$body-small-w-medium" textAlign="center">
                  {group.location}
                </SizableText>
              </XStack>
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
                    <Avatar.Image accessibilityLabel={member.name} src={member.imageURL} />
                    <Avatar.Fallback backgroundColor="$blue10" />
                  </Avatar>
                ))}
              </XStack>
              <SizableText size="$label-large-w-medium" color="$white-opacity-high">
                {`${group.members.length} miembros`}
              </SizableText>
            </XStack>

            <Animated.View style={[{ width: "100%", height: TEAM_SECTION_HEIGHT }, teamSectionStyle]}>
              <ScrollView>
                <View width="90%" alignSelf="center">
                  <Separator marginVertical={24} borderColor="$white-opacity-mid" />
                  <YStack gap={24}>
                    <YStack gap={24}>
                      <SizableText color="$white" size="$title-small">
                        Miembros del grupo
                      </SizableText>
                      <FlatList
                        ref={flatListRef}
                        contentContainerStyle={{ gap: 20 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={group.members}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                          <YStack gap={12} alignItems="center">
                            <Avatar circular size="$8">
                              <Avatar.Image accessibilityLabel={item.name} src={item.imageURL} />
                              <Avatar.Fallback backgroundColor="$blue10" />
                            </Avatar>
                            <YStack gap={2} alignItems="center">
                              <SizableText color="$white" size="$label-large-w-medium">
                                {item.name}
                              </SizableText>
                              <SizableText color="$white-opacity-high" size="$label-large-w-medium">
                                24 años
                              </SizableText>
                            </YStack>
                          </YStack>
                        )}
                        contentOffset={{ x: scrollX.value, y: 0 }}
                      />
                    </YStack>
                    <YStack gap={24}>
                      <SizableText color="$white" size="$title-small">
                        Intereses del grupo
                      </SizableText>
                      <XStack gap={12} flexWrap="wrap">
                        {group &&
                          group.interests.map((interest) => (
                            <Chip
                              key={interest.name}
                              backgroundColor="$white-opacity-low"
                              borderColor="$white-opacity-low"
                              borderWidth={1}
                            >
                              <SizableText color="$element-high" size="$label-large-w-medium">
                                {interest.name}
                              </SizableText>
                              <SizableText>{String.fromCodePoint(unicodeToHex(interest.unicode))}</SizableText>
                            </Chip>
                          ))}
                      </XStack>
                    </YStack>
                  </YStack>
                </View>
              </ScrollView>
            </Animated.View>
          </View>
        </Animated.View>
      </GestureDetector>
    )
  }
)

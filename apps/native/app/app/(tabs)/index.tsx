import React, { useRef, useState } from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { View } from "tamagui"
import Card, { CardHandle } from "../../../components/templates/swipper/Card"
import { groups } from "../../../assets/mock/groups"
import SwipperActions from "../../../components/templates/swipper/SwipperActions"

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(groups.length - 1)
  const cardRef = useRef<CardHandle>(null)

  const handleSwipe = (direction: "left" | "right") => {
    console.log(direction)
    setCurrentIndex((prev) => prev - 1)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView style={style.container}>
        <View flex={1} justifyContent="center" alignItems="center">
          {groups.map(
            (group, index) =>
              (currentIndex == index || currentIndex == index + 1) && (
                <Card
                  key={group.id}
                  ref={currentIndex == index ? cardRef : undefined}
                  group={group}
                  onSwipe={handleSwipe}
                />
              )
          )}
          <SwipperActions cardRef={cardRef} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%"
  }
})

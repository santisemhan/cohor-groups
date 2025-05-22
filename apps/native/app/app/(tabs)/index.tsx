import React, { useEffect, useRef, useState } from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { View } from "tamagui"
import Card, { CardHandle } from "../../../components/templates/swipper/Card"
import SwipperActions from "../../../components/templates/swipper/SwipperActions"
import { useApiClient } from "../../../lib/http/useApiClient"
import { endpoint } from "../../../lib/common/Endpoint"
import { SwippeableGroup } from "@cohor/types"
import { Endpoint } from "../../../lib/utils/http/endpoint.support"

const MAXGROUPS_PER_PAGE = 15

export default function Home() {
  const [groups, setGroups] = useState<SwippeableGroup[]>([])
  const [currentIndex, setCurrentIndex] = useState(groups.length)
  const [currentAmountOfGroupsSwiped, setCurrentAmountOfGroupsSwiped] = useState(0)
  const api = useApiClient()
  const cardRef = useRef<CardHandle>(null)

  const onGetGroups = async () => {
    const response = await api.get<{ data: SwippeableGroup[] }>(
      endpoint.group.groups +
        Endpoint.queryParams({
          page: currentAmountOfGroupsSwiped / MAXGROUPS_PER_PAGE || 1,
          pageSize: MAXGROUPS_PER_PAGE
        })
    )
    setGroups(response.data)
    setCurrentIndex(groups.length)
  }

  useEffect(() => {
    if (currentAmountOfGroupsSwiped % MAXGROUPS_PER_PAGE === 0) {
      onGetGroups()
    }
  }, [currentAmountOfGroupsSwiped])

  const handleSwipe = async (direction: "left" | "right") => {
    console.log(direction)
    setCurrentAmountOfGroupsSwiped((prev) => prev + 1)
    setCurrentIndex((prev) => prev - 1)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView style={style.container}>
        <View flex={1} justifyContent="center" alignItems="center">
          {groups.length > 0 &&
            groups.map(
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
  container: { justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }
})

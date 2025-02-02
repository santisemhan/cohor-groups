import React from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { View } from "tamagui"
import Card from "../../../components/app/swipper/Card"
import { groups } from "../../../assets/mock/groups"

export default function Home() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView style={style.container}>
        <View flex={1} justifyContent="center" alignItems="center">
          {groups.map((group, index) => (
            <Card key={index} group={group} onSwipe={(direction) => console.log(direction)} />
          ))}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  }
})

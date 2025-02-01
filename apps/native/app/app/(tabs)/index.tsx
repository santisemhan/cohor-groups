import React from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SwippeableGroup } from "@cohor/types"
import { View } from "tamagui"
import Card from "../../../components/app/swipper/Card"

export default function Home() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView style={style.container}>
        <View flex={1} justifyContent="center" alignItems="center">
          {Array.from({ length: 20 }, (_, index) => (
            <Card key={index} group={{ ...data[0], name: `${data[0].name} ${index}` }} />
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

const data: SwippeableGroup[] = [
  {
    id: "some-id",
    name: "Dios, patria y familia!",
    presentation: "Monogamia o bala",
    imageUrl: "https://i.pinimg.com/736x/3c/82/a3/3c82a335d12c3ccdc338bea8bfce2a6c.jpg",
    members: [
      {
        id: "asdas",
        name: "Jorgelina",
        imageUrl: "https://randomuser.me/portraits/women/20.jpg"
      },
      {
        id: "asdas2",
        name: "Jorge",
        imageUrl: "https://randomuser.me/api/portraits/men/35.jpg"
      },
      {
        id: "asdas3",
        name: "Santiago",
        imageUrl: "https://randomuser.me/api/portraits/men/21.jpg"
      },
      {
        id: "asdas23",
        name: "Bautista",
        imageUrl: "https://randomuser.me/api/portraits/men/51.jpg"
      },
      {
        id: "asdas23233",
        name: "Alberto",
        imageUrl: "https://randomuser.me/api/portraits/men/23.jpg"
      }
    ]
  }
]

import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, useTheme } from "tamagui"
import EmptyState from "../../../components/templates/common/EmptyState"
import MainHeader from "../../../components/templates/common/MainHeader"
import EmptyEvents from "../../../components/illustations/EmptyEvents"
import { ChatPreview as ChatPreviewType } from "@cohor/types"
import React, { useEffect, useState } from "react"
import ChatPreview from "../../../components/templates/chat/ChatPreview"

export default function Chat() {
  const theme = useTheme()

  const [chats, setChats] = useState<ChatPreviewType[]>([])

  useEffect(() => {
    setChats([
      {
        id: "1",
        group: {
          name: "Vientos de cambio",
          imageUrl: "https://i.pinimg.com/736x/3c/82/a3/3c82a335d12c3ccdc338bea8bfce2a6c.jpg"
        },
        lastMessage: {
          fromName: "Santiago",
          content: "Hola, ¿cómo están? Me gustaría saber si les gustaría hacer una videollamada para conocernos mejor.",
          date: "2021-09-01T12:00:00Z",
          viewed: false
        },
        recentMatch: false
      },
      {
        id: "2",
        group: {
          name: "Fuerza y honor",
          imageUrl: "https://i.pinimg.com/736x/c7/69/0b/c7690b132ff7a01d51922c134ab4a859.jpg"
        },
        lastMessage: {
          fromName: "Martina",
          content: "Hola, ¿cómo están?",
          date: "2021-09-01T12:00:00Z",
          viewed: true
        },
        recentMatch: true
      },
      {
        id: "3",
        group: {
          name: "La revolución del alma",
          imageUrl: "https://i.pinimg.com/736x/9e/35/48/9e35484c88fa2c5aac66e9c3c849f434.jpg"
        },
        lastMessage: undefined,
        recentMatch: true
      }
    ])
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.surface.val }}>
      <MainHeader title="Chats" />
      {chats.length > 0 ? (
        <ScrollView>
          {chats.map((chat) => (
            <ChatPreview
              key={chat.id}
              id={chat.id}
              groupName={chat.group.name}
              groupImageUrl={chat.group.imageUrl}
              username={chat.lastMessage?.fromName}
              lastMessage={chat.lastMessage?.content}
              newMessage={!chat.lastMessage?.viewed}
            />
          ))}
        </ScrollView>
      ) : (
        <EmptyState
          title="Todavía no hay chats grupales"
          subtitle="Cuando hagas match con otro grupo, se creará automáticamente un chat para que puedan conocerse mejor."
          ilustration={<EmptyEvents />}
        />
      )}
    </SafeAreaView>
  )
}

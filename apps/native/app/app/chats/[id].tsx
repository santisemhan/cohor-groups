import { useLocalSearchParams } from "expo-router"
import ChatGroupHeader from "../../../components/templates/chat/ChatGroupHeader"
import { View } from "tamagui"
import Message from "../../../components/templates/chat/Message"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { KeyboardGestureArea } from "react-native-keyboard-controller"
import Reanimated, { useAnimatedStyle } from "react-native-reanimated"
import { Input } from "../../../components/ui/Input"
import { useKeyboardAnimation } from "../../../lib/hooks/useKeyboardAnimation"
import { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import PaperPlaneTiltIcon from "../../../components/icons/PaperPlaneTilt"
import { Message as MessageType } from "@cohor/types"
import EmptyState from "../../../components/templates/common/EmptyState"
import EmptyEvents from "../../../components/illustations/EmptyEvents"

export default function ChatScreen() {
  const { id: _, groupName, groupImageUrl } = useLocalSearchParams()
  const insets = useSafeAreaInsets()

  const [isFocused, setIsFocused] = useState(false)
  const { height } = useKeyboardAnimation()

  const scrollViewStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: -height.value }]
    }),
    []
  )

  const [messages, setMessages] = useState<MessageType[]>([])
  useEffect(() => {
    setMessages([
      {
        id: "1",
        content: "Hola grupo!! Todo bien?",
        sender: { name: "Mica", imageUrl: "https://randomuser.me/portraits/women/11.jpg" }
      },
      {
        id: "2",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua  dolore magna aliqua"
      },
      {
        id: "3",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        sender: { name: "Martina", imageUrl: "https://randomuser.me/portraits/women/3.jpg" }
      },
      {
        id: "4",
        content: "Hola grupo!! Todo bien?",
        sender: { name: "Mica", imageUrl: "https://randomuser.me/portraits/women/11.jpg" }
      },
      {
        id: "5",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua  dolore magna aliqua"
      },
      {
        id: "6",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        sender: { name: "Martina", imageUrl: "https://randomuser.me/portraits/women/3.jpg" }
      },
      {
        id: "7",
        content: "Hola grupo!! Todo bien?",
        sender: { name: "Mica", imageUrl: "https://randomuser.me/portraits/women/11.jpg" }
      },
      {
        id: "8",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua  dolore magna aliqua"
      },
      {
        id: "9",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        sender: { name: "Martina", imageUrl: "https://randomuser.me/portraits/women/3.jpg" }
      },
      {
        id: "10",
        content: "Hola grupo!! Todo bien?",
        sender: { name: "Mica", imageUrl: "https://randomuser.me/portraits/women/11.jpg" }
      },
      {
        id: "11",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        sender: { name: "Martina", imageUrl: "https://randomuser.me/portraits/women/3.jpg" }
      },
      {
        id: "12",
        content: "Hola grupo!! Todo bien?",
        sender: { name: "Mica", imageUrl: "https://randomuser.me/portraits/women/11.jpg" }
      },
      { id: "13", content: "Lorem ipsum dolor sit amet" },
      {
        id: "14",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        sender: { name: "Martina", imageUrl: "https://randomuser.me/portraits/women/3.jpg" }
      },
      {
        id: "15",
        content: "Hola grupo!! Todo bien?",
        sender: { name: "Mica", imageUrl: "https://randomuser.me/portraits/women/11.jpg" }
      },
      {
        id: "16",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua  dolore magna aliqua"
      },
      {
        id: "17",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        sender: { name: "Martina", imageUrl: "https://randomuser.me/portraits/women/3.jpg" }
      }
    ])
  }, [])

  return (
    <View flex={1} backgroundColor="$surface">
      <ChatGroupHeader
        position="relative"
        backgroundColor="$surface"
        zIndex={2}
        groupName={groupName as string}
        groupImageUrl={groupImageUrl as string}
        paddingTop={insets.top}
      />
      <KeyboardGestureArea offset={150} interpolator="ios" style={{ flex: 1 }}>
        <Reanimated.View
          style={[
            scrollViewStyle,
            {
              flex: 1,
              paddingHorizontal: 12,
              paddingBottom: 12
            }
          ]}
        >
          {messages.length > 0 ? (
            <Reanimated.FlatList
              data={messages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Message message={item.content} sender={item.sender} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: "column-reverse",
                justifyContent: "flex-start"
              }}
              inverted
            />
          ) : (
            <EmptyState
              marginHorizontal={-2}
              title="Todavía nadie escribió…"
              subtitle="No hay apuro, pero alguien tiene que dar el primer paso. ¿Quién se anima?"
              ilustration={<EmptyEvents />}
            />
          )}
          <View paddingVertical={12} backgroundColor="$surface" flexDirection="row" alignItems="center">
            <Input
              flex={1}
              borderWidth={1}
              borderColor={isFocused ? "$primary" : "$outline"}
              backgroundColor="transparent"
              color="$white-opacity-high"
              placeholder="Mensaje"
              placeholderTextColor="$element-low"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <TouchableOpacity onPress={() => console.log("Send message")} style={{ position: "absolute", right: 20 }}>
              <PaperPlaneTiltIcon color="white" width={24} height={24} />
            </TouchableOpacity>
          </View>
        </Reanimated.View>
      </KeyboardGestureArea>
    </View>
  )
}

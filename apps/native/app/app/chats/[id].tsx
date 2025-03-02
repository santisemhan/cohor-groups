import { useLocalSearchParams } from "expo-router"
import ChatGroupHeader from "../../../components/templates/chat/ChatGroupHeader"
import { ScrollView, View } from "tamagui"
import Message from "../../../components/templates/chat/Message"

export default function ChatScreen() {
  const { id, groupName, groupImageUrl } = useLocalSearchParams()

  return (
    <View flex={1} backgroundColor="$surface">
      <ChatGroupHeader groupName={groupName as string} groupImageUrl={groupImageUrl as string} />
      <ScrollView padding={12}>
        <Message
          message="Hola grupo!! Todo bien?"
          sender={{ name: "Mica", imageUrl: "https://randomuser.me/portraits/women/11.jpg" }}
        />
        <Message message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" />
        <Message
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
          sender={{ name: "Martina", imageUrl: "https://randomuser.me/portraits/women/23.jpg" }}
        />
      </ScrollView>
    </View>
  )
}

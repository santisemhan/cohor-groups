import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "tamagui"
import EmptyState from "../../../components/app/common/EmptyState"
import MainHeader from "../../../components/app/common/MainHeader"
import EmptyEvents from "../../../components/illustations/EmptyEvents"

export default function Chat() {
  const theme = useTheme()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.surface.val }}>
      <MainHeader title="Chats" />
      <EmptyState
        title="Todavía no hay chats grupales"
        subtitle="Cuando hagas match con otro grupo, se creará automáticamente un chat para que puedan conocerse mejor."
        ilustration={<EmptyEvents />}
      />
    </SafeAreaView>
  )
}

import { Link } from "expo-router"
import { View, SizableText } from "tamagui"

export default function Home() {
  return (
    <View backgroundColor="$background" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SizableText size="$display-large" color="$element-high">
        Index
      </SizableText>
      <Link href="/auth/details" asChild>
        <SizableText size="$body-medium" color="$element-high">
          Go to Details
        </SizableText>
      </Link>
    </View>
  )
}

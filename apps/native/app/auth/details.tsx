import { Link } from "expo-router"
import { View, SizableText } from "tamagui"

export default function Details() {
  return (
    <View backgroundColor="$background" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SizableText size="$display-large" color="$element-high">
        Details
      </SizableText>
      <Link href="/" asChild>
        <SizableText size="$body-medium" color="$element-high">
          Go to Home
        </SizableText>
      </Link>
      <Link href="/auth" asChild>
        <SizableText size="$body-medium" color="$element-high">
          Go to index auth
        </SizableText>
      </Link>
    </View>
  )
}

import { SizableText, View, YStack } from "tamagui"
import { Button } from "../components/ui/Button"
import { BlurView } from "expo-blur"
import { ResizeMode, Video } from "expo-av"
import { Link } from "expo-router"

export default function Home() {
  return (
    <View style={{ display: "flex", height: "100%", justifyContent: "flex-end", alignItems: "center" }}>
      <Video
        source={require("../assets/video/SampleVideo.mp4")}
        rate={1.0}
        volume={1.0}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      />
      <BlurView
        intensity={80}
        tint="dark"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: 324,
          paddingVertical: 40,
          paddingHorizontal: 28,
          borderTopStartRadius: 40,
          borderTopEndRadius: 40,
          overflow: "hidden"
        }}
      >
        <SizableText color="$white" size="$body-small-w-medium">
          Descubrí a quien podes conocer hoy.
        </SizableText>
        <YStack gap={20} width="100%">
          <Link asChild href="/auth/details">
            <Button backgroundColor="$element-high">Crear una cuenta</Button>
          </Link>
          <BlurView
            intensity={100}
            tint="dark"
            style={{
              borderRadius: 100,
              overflow: "hidden"
            }}
          >
            {/* El border color tiene que ser element-high-opacity-mid pero le pusieron en Figma el del light mode */}
            <Link asChild href="/auth/details">
              <Button type="subtle" backgroundColor="transparent" borderColor="rgba(255, 255, 255, 0.2)">
                Iniciar sesión
              </Button>
            </Link>
          </BlurView>
        </YStack>
        <SizableText color="$white" size="$body-small" textAlign="center">
          Cohor v.0.1.0
        </SizableText>
      </BlurView>
    </View>
  )
}

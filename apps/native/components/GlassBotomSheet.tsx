import { BlurView } from "expo-blur"

export default function GlassBottomSheet({ children }: { children: React.ReactNode }) {
  return (
    <BlurView
      intensity={80}
      tint="dark"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        gap: 32,
        paddingVertical: 40,
        paddingHorizontal: 28,
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        overflow: "hidden"
      }}
    >
      {children}
    </BlurView>
  )
}

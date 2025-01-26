import { View, StyleSheet, type ViewStyle } from "react-native"
import { OTPInput, type SlotProps } from "input-otp-native"
import { useEffect } from "react"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated"
import { SizableText } from "tamagui"

export default function OtpInput({ onChange, value }: { onChange: (value: string) => void; value: string }) {
  return (
    <OTPInput
      onChange={onChange}
      value={value}
      containerStyle={styles.container}
      maxLength={5}
      render={({ slots }: { slots: SlotProps[] }) => (
        <View style={styles.slotsContainer}>
          {slots.map((slot, idx) => (
            <Slot key={idx} {...slot} />
          ))}
        </View>
      )}
    />
  )
}

function Slot({ char, isActive, hasFakeCaret }: SlotProps) {
  return (
    <View style={styles.slot}>
      {char !== null ? (
        <SizableText size="$display-large" color="$white">
          {char}
        </SizableText>
      ) : (
        !isActive && (
          <SizableText size="$display-large" color="$white">
            -
          </SizableText>
        )
      )}
      {hasFakeCaret && <FakeCaret />}
      <View style={[styles.underline, isActive && styles.activeUnderline]} />
    </View>
  )
}

function FakeCaret({ style }: { style?: ViewStyle }) {
  const opacity = useSharedValue(1)

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(withTiming(0, { duration: 500 }), withTiming(1, { duration: 500 })),
      -1,
      true
    )
  }, [opacity])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  return (
    <View style={styles.fakeCaretContainer}>
      <Animated.View style={[styles.fakeCaret, style, animatedStyle]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  slotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  slot: {
    width: 44,
    height: 60,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  underline: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 2,
    backgroundColor: "#FFFFFF"
  },
  activeUnderline: {
    backgroundColor: "#FFFFFF",
    height: 1
  },
  fakeCaretContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  fakeCaret: {
    width: 2,
    height: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 1
  }
})

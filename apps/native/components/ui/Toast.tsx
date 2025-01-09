import { Text, View } from "react-native"
import { BaseToastProps, ToastConfigParams } from "react-native-toast-message"

export const toastConfig = {
  success: ({ text1 }: ToastConfigParams<BaseToastProps>) => (
    <View
      style={{
        width: "65%",
        height: 60,
        backgroundColor: "#10B981",
        borderRadius: "10%",
        display: "flex",
        alignItems: "center",
        padding: 10
      }}
    >
      <Text style={{ fontSize: 14, marginTop: 10, color: "white" }}>{text1}</Text>
    </View>
  ),
  error: ({ text1 }: ToastConfigParams<BaseToastProps>) => (
    <View
      style={{
        width: "65%",
        height: 60,
        backgroundColor: "#ED5A46",
        borderRadius: "10%",
        display: "flex",
        alignItems: "center",
        padding: 10
      }}
    >
      <Text style={{ fontSize: 14, marginTop: 10, color: "white" }}>{text1}</Text>
    </View>
  )
}

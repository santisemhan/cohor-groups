import { useState } from "react"
import { Pressable } from "react-native"
import { XStack } from "tamagui"
import { Input } from "./Input"
import DatePickerComponent from "react-native-date-picker"

interface DatePickerProps {
  date?: Date
  hasError?: boolean
  onChange?: (value: string) => void
  onBlur?: () => void
  value?: string
}

const DatePicker = function DatePicker(props: DatePickerProps) {
  const { onChange, onBlur, value } = props

  const [date, setDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
  const [open, setOpen] = useState(false)

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0]
  }

  return (
    <Pressable onPress={() => setOpen(true)}>
      <XStack alignItems={"center"} justifyContent="flex-end">
        <Input
          hasError={props.hasError}
          borderWidth={0}
          backgroundColor="transparent"
          color="$white-opacity-high"
          placeholder="Fecha de nacimiento"
          placeholderTextColor="$white-opacity-high"
          onChangeText={onChange}
          onBlur={onBlur}
          value={value || (date && formatDate(date))}
          pointerEvents="none"
          editable={false}
          flexGrow={1}
        />
      </XStack>

      <DatePickerComponent
        modal
        open={open}
        date={date}
        maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        theme="dark"
        mode="date"
        locale="es-AR"
      />
    </Pressable>
  )
}

export default DatePicker

import { useEffect, useState } from "react"
import { Pressable } from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { XStack, Input } from "tamagui"

interface DatePickerProps {
  date?: Date
  confirmText?: string
  cancelText?: string
  accentColor?: string
  textColor?: string
  buttonTextColorIOS?: string
  onChange?: (value: string) => void
  onConfirm?: (date: Date) => void
  onBlur?: () => void
  value?: string
}

const DateTimePicker = function DatePicker(props: DatePickerProps) {
  const { onChange, onBlur, value } = props
  const [show, setShow] = useState(false)
  const [date, setDate] = useState<Date | undefined>(props.date)

  useEffect(() => {
    setDate(props.date)
  }, [props.date])

  const hideDatePicker = () => {
    setShow(false)
  }

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0]
  }

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate)
    const formattedValue = formatDate(selectedDate)
    props.onConfirm && props.onConfirm(selectedDate)
    onChange && onChange(formattedValue)
    hideDatePicker()
  }

  return (
    <Pressable onPress={() => setShow(true)}>
      <XStack alignItems={"center"} justifyContent="flex-end">
        <Input
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

      <DateTimePickerModal
        cancelTextIOS={props.cancelText}
        confirmTextIOS={props.confirmText}
        date={date}
        isVisible={show}
        accentColor={props.accentColor}
        textColor={props.textColor}
        buttonTextColorIOS={props.buttonTextColorIOS}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  )
}

export default DateTimePicker

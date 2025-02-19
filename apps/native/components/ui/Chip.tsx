import { XStack, XStackProps } from "tamagui"

interface ChipProps extends XStackProps {
  children: React.ReactNode
}

export default function Chip({ children, ...props }: ChipProps) {
  return (
    <XStack
      gap="4"
      paddingTop="6"
      paddingRight="10"
      paddingBottom="6"
      paddingLeft="10"
      borderRadius="$16"
      alignItems="center"
      backgroundColor="$white-opacity-low"
      {...props}
    >
      {children}
    </XStack>
  )
}

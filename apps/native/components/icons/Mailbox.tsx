import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function MailboxIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 0 256 256" {...props}>
      <Path fill="none" d="M0 0H256V256H0z" />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M96 152L56 152"
      />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M160 144L160 24 192 24"
      />
      <Path
        d="M232 176v-60a52 52 0 00-52-52H76a52 52 0 0152 52v68h96a8 8 0 008-8z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
      />
      <Path
        d="M128 224v-40H32a8 8 0 01-8-8v-60a52 52 0 0152-52"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
      />
    </Svg>
  )
}

export default MailboxIcon

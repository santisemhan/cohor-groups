import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function ChatCircleIcon(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 256 256" {...props}>
      <Path
        fill={props.color || "white"}
        d="M232.07 186.76a80 80 0 00-62.5-114.17 80 80 0 10-145.64 66.17l-7.27 24.71a16 16 0 0019.87 19.87l24.71-7.27a80.39 80.39 0 0025.18 7.35 80 80 0 00108.34 40.65l24.71 7.27a16 16 0 0019.87-19.86zM62 159.5a8.28 8.28 0 00-2.26.32L32 168l8.17-27.76a8 8 0 00-.63-6A64 64 0 1165.8 160.5a8 8 0 00-3.8-1zm153.79 28.73L224 216l-27.76-8.17a8 8 0 00-6 .63 64.05 64.05 0 01-85.87-24.88 79.93 79.93 0 0070.33-93.87 64 64 0 0141.75 92.48 8 8 0 00-.63 6.04z"
      />
    </Svg>
  )
}

export default ChatCircleIcon

export function ChatCircleFilledIcon(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 256 256" {...props}>
      <Path
        fill={props.color || "white"}
        d="M232.07 186.76a80 80 0 00-62.5-114.17 80 80 0 10-145.64 66.17l-7.27 24.71a16 16 0 0019.87 19.87l24.71-7.27a80.39 80.39 0 0025.18 7.35 80 80 0 00108.34 40.65l24.71 7.27a16 16 0 0019.87-19.86zm-16.25 1.47L224 216l-27.76-8.17a8 8 0 00-6 .63 64.05 64.05 0 01-85.87-24.88 79.93 79.93 0 0070.33-93.87 64 64 0 0141.75 92.48 8 8 0 00-.63 6.04z"
      />
    </Svg>
  )
}

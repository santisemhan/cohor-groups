import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function XIcon(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 256 256" {...props}>
      <Path
        fill={props.color || "white"}
        d="M205.66 194.34a8 8 0 01-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 01-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0111.32-11.32L128 116.69l66.34-66.35a8 8 0 0111.32 11.32L139.31 128z"
      />
    </Svg>
  )
}

export default XIcon

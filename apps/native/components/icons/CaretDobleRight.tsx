import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function CaretDobleRightIcon(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 256 256" {...props}>
      <Path
        fill={props.color || "white"}
        d="M141.66 133.66l-80 80a8 8 0 01-11.32-11.32L124.69 128 50.34 53.66a8 8 0 0111.32-11.32l80 80a8 8 0 010 11.32zm80-11.32l-80-80a8 8 0 00-11.32 11.32L204.69 128l-74.35 74.34a8 8 0 0011.32 11.32l80-80a8 8 0 000-11.32z"
      />
    </Svg>
  )
}

export default CaretDobleRightIcon

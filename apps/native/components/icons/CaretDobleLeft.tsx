import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function CaretDobleLeftIcon(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 256 256" {...props}>
      <Path
        fill={props.color || "white"}
        d="M205.66 202.34a8 8 0 01-11.32 11.32l-80-80a8 8 0 010-11.32l80-80a8 8 0 0111.32 11.32L131.31 128zM51.31 128l74.35-74.34a8 8 0 00-11.32-11.32l-80 80a8 8 0 000 11.32l80 80a8 8 0 0011.32-11.32z"
      />
    </Svg>
  )
}

export default CaretDobleLeftIcon

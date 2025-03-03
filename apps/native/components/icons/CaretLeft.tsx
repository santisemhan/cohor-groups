import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function CaretLeft({ ...props }: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 256 256" {...props}>
      <Path
        fill={props.color || "white"}
        d="M165.66 202.34a8 8 0 01-11.32 11.32l-80-80a8 8 0 010-11.32l80-80a8 8 0 0111.32 11.32L91.31 128z"
      />
    </Svg>
  )
}

export default CaretLeft

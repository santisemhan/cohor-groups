import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function HouseSimpleIcon(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 256 256" {...props}>
      <Path
        fill={props.color || "white"}
        d="M224 120v96a8 8 0 01-8 8H40a8 8 0 01-8-8v-96a15.87 15.87 0 014.69-11.32l80-80a16 16 0 0122.62 0l80 80A15.87 15.87 0 01224 120z"
      />
    </Svg>
  )
}

export default HouseSimpleIcon

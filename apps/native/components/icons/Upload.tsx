import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function UploadIcon(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 256 256" {...props}>
      <Path
        fill={props.color || "white"}
        d="M224 144v64a8 8 0 01-8 8H40a8 8 0 01-8-8v-64a8 8 0 0116 0v56h160v-56a8 8 0 0116 0zM93.66 77.66L120 51.31V144a8 8 0 0016 0V51.31l26.34 26.35a8 8 0 0011.32-11.32l-40-40a8 8 0 00-11.32 0l-40 40a8 8 0 0011.32 11.32z"
      />
    </Svg>
  )
}

export default UploadIcon

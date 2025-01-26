import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function XCircleIcon(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 256 256" {...props}>
      <Path
        fill={props.color || "white"}
        d="M165.66 101.66L139.31 128l26.35 26.34a8 8 0 01-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 01-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0111.32-11.32L128 116.69l26.34-26.35a8 8 0 0111.32 11.32zM232 128A104 104 0 11128 24a104.11 104.11 0 01104 104zm-16 0a88 88 0 10-88 88 88.1 88.1 0 0088-88z"
      />
    </Svg>
  )
}

export default XCircleIcon

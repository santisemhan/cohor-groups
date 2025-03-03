import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function PaperPlaneTiltIcon(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 256 256" {...props}>
      <Path
        fill={props.color || "white"}
        d="M227.32 28.68a16 16 0 00-15.66-4.08h-.15L19.57 82.84a16 16 0 00-2.49 29.8L102 154l41.3 84.87a15.86 15.86 0 0014.44 9.13q.69 0 1.38-.06a15.88 15.88 0 0014-11.51l58.2-191.94v-.15a16 16 0 00-4-15.66zm-69.49 203.17l-.05.14v-.07l-40.06-82.3 48-48a8 8 0 00-11.31-11.31l-48 48-82.33-40.06h-.07.14L216 40z"
      />
    </Svg>
  )
}

export default PaperPlaneTiltIcon

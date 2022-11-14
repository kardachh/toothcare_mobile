import * as React from "react"
import Svg, { Path } from "react-native-svg"

const ArrowIcon = (props) => (
    <Svg
        width={10}
        height={18}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 18a.997.997 0 0 1-.707-.293l-8-8a.999.999 0 0 1 0-1.414l8-8a.999.999 0 1 1 1.414 1.414L2.414 9l7.293 7.293A.999.999 0 0 1 9 18Z"
            fill="#000"
        />
    </Svg>
)

export default ArrowIcon

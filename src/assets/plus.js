import * as React from "react"
import Svg, { Path } from "react-native-svg"

const PlusIcon = (props) => (
    <Svg
        width={20}
        height={20}
        viewBox={"0 0 42 42"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.418 3.128c0-1.393-1.09-2.521-2.454-2.521-1.635 0-2.725 1.128-2.725 2.521v15.139H2.702C1.34 18.267.25 19.395.25 20.788c0 1.396 1.09 2.524 2.453 2.524H18.24v15.496c0 1.393 1.09 2.521 2.725 2.521 1.363 0 2.454-1.128 2.454-2.521V23.312h14.99c1.364 0 2.727-1.128 2.727-2.524 0-1.393-1.363-2.521-2.726-2.521H23.418V3.128Z"
            fill="#000"
        />
    </Svg>
)

export default PlusIcon

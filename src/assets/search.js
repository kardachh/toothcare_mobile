import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SearchIcon = (props) => (
    <Svg
        width={28}
        height={28}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 2C6.701 2 2 6.701 2 12.5S6.701 23 12.5 23c2.897 0 5.518-1.172 7.419-3.07A10.463 10.463 0 0 0 23 12.5C23 6.701 18.299 2 12.5 2ZM0 12.5C0 5.596 5.596 0 12.5 0S25 5.596 25 12.5c0 3.094-1.125 5.927-2.987 8.109l5.693 5.683a1 1 0 1 1-1.412 1.416l-5.696-5.685A12.454 12.454 0 0 1 12.5 25C5.596 25 0 19.404 0 12.5Z"
            fill="#000"
        />
    </Svg>
)

export default SearchIcon

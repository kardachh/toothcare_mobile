import * as React from 'react';
import {SvgProps, Svg, Path} from 'react-native-svg';
import PropTypes from 'prop-types';

const Loading: React.FC<SvgProps> = ({width, height, color}) => {
    return (
        <Svg width={width} height={height} fill="none">
            <Path
                d="M35 1v9.714M59.286 10.714 52 18M10.714 10.714 18 18M35 69v-9.714M59.286 59.286 52 52M10.714 59.286 18 52M1 35h9.714M59.286 35H69"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

Loading.propTypes = {
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
};

Loading.defaultProps = {
    color: 'black',
    width: 70,
    height: 70,
    viewBox: '0 0 70 70',
};

export default Loading;

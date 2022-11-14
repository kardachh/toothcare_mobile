import { Animated, Easing } from 'react-native';

const waitAnimation = (spinValue, duration = 3000) => {
    return Animated.timing(spinValue, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
    });
};

const fadeOut = (value) => {
    return Animated.timing(value, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
    });
};

export { waitAnimation, fadeOut };

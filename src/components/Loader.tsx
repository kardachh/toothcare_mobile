import React, {useRef, useEffect, useState, FC} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {fadeOut, waitAnimation} from "./waitAnimation";
import Loading from "../assets/loading";

export interface IProps {
  isDataLoaded: boolean;
}

const Loader: FC<IProps> = props => {
  const {isDataLoaded} = props;
  const spinValue = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const [show, setShow] = useState(false);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const fade = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1.0, 0.05],
  });

  useEffect(() => {
    const rotateAnimation = waitAnimation(spinValue);

    if (!isDataLoaded) {
      setShow(true);
      spinValue.setValue(0);
      opacity.setValue(0);
      Animated.loop(rotateAnimation).start();
    } else {
      const rotateAnimationFade = waitAnimation(spinValue, 1000);
      const fadeAnimation = fadeOut(opacity);
      Animated.parallel([fadeAnimation, rotateAnimationFade]).start(() => {
        spinValue.setValue(0);
        opacity.setValue(0);
        setShow(false);
      });
    }
  }, [isDataLoaded, spinValue, opacity]);

  return show ? (
    <Animated.View
      style={{
        ...styles.logoContainer,
        opacity: fade,
      }}>
      <Animated.View
        style={{
          transform: [{rotate: spin}],
        }}>
        <Loading />
      </Animated.View>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  logoContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    flex: 1,
    flexGrow: 1,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    width: '100%',
  },
});

export default Loader;

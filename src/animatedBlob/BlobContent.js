// @flow
import React, { useMemo } from 'react';
import {
  Animated,
  StyleSheet,
} from 'react-native';

import {
  BLOB_TRANSITION_MAX_INDEX,
} from './types';

type Props = {|
  animation: Animated.Value,
  component: React$Node,
|};

const BlobContent = ({
  animation,
  component,
}: Props) => {
  const containerStyle = useMemo(() => {
    function getRandomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandom(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const transformInputRange = [];
    const translateXOutputeRange: number[] = [];
    const translateYOutputeRange: number[] = [];
    const scaleOutputeRange: number[] = [];
    const rotateOutputeRange: string[] = [];

    for (let index = 0; index <= BLOB_TRANSITION_MAX_INDEX; index++) {
      const sign = Math.random() <= 0.5 === 0 ? -1 : 1;

      transformInputRange.push(index);
      translateXOutputeRange.push(sign * getRandomInt(15, 50));
      translateYOutputeRange.push(sign * getRandomInt(15, 50));

      if (index % 2 === 0) {
        scaleOutputeRange.push(1);
      } else {
        scaleOutputeRange.push(getRandom(1.05, 1.25));
      }

      rotateOutputeRange.push(`${sign * getRandomInt(0, 10)}deg`);
    }

    translateXOutputeRange[BLOB_TRANSITION_MAX_INDEX] = translateXOutputeRange[0];
    translateYOutputeRange[BLOB_TRANSITION_MAX_INDEX] = translateYOutputeRange[0];

    rotateOutputeRange[BLOB_TRANSITION_MAX_INDEX] = rotateOutputeRange[0];

    return {
      ...styles.container,
      transform: [
        {
          translateX: animation.interpolate({
            inputRange: transformInputRange,
            outputRange: translateXOutputeRange,
          }),
        },
        {
          translateY: animation.interpolate({
            inputRange: transformInputRange,
            outputRange: translateYOutputeRange,
          }),
        },
        {
          scale: animation.interpolate({
            inputRange: transformInputRange,
            outputRange: scaleOutputeRange,
          }),
        },
        {
          rotate: animation.interpolate({
            inputRange: transformInputRange,
            outputRange: rotateOutputeRange,
          }),
        },
      ],
    };
  }, [animation]);

  return (
    <Animated.View style={containerStyle}>
      {component}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: -45,
    top: -45,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo<Props>(BlobContent);

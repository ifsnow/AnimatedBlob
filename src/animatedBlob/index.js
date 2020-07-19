// @flow

import React, {
  useMemo,
  useEffect,
} from 'react';
import {
  Animated,
  View,
} from 'react-native';

import BlobShape from './BlobShape';
import BlobContent from './BlobContent';

import {
  BLOB_TRANSITION_MAX_INDEX,
  type AnimatedBlobGradientColorsType,
} from './types';

type Props = {|
  mode: 'fill' | 'gradient',
  size: number,
  fillColor?: ?string,
  gradientColors?: ?AnimatedBlobGradientColorsType,
  children: React$Node,
|};

const AnimatedBlob = ({
  mode,
  size,
  fillColor,
  gradientColors,
  children,
}: Props) => {
  const animation = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    animation.setValue(0);

    Animated.loop(
      Animated.timing(animation, {
        toValue: BLOB_TRANSITION_MAX_INDEX,
        duration: BLOB_TRANSITION_MAX_INDEX * 500,
        useNativeDriver: true,
      }),
    ).start();
  }, [animation]);

  return (
    <View>
      <BlobShape
        mode={mode}
        size={size}
        fillColor={fillColor}
        gradientColors={gradientColors}
        animation={animation}
      />
      <BlobContent
        component={children}
        animation={animation}
      />
    </View>
  );
};

export default React.memo<Props>(AnimatedBlob);

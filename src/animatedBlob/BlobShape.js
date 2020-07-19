// @flow
import React, {
  useMemo,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Animated } from 'react-native';

import {
  Surface,
  Shape,
  LinearGradient,
} from '@react-native-community/art';

import generator from './generator';

import {
  BLOB_SHAPE_PATTERN_SIZE,
  BLOB_TRANSITION_MAX_INDEX,
  type AnimatedBlobGradientColorsType,
} from './types';

const SVGPath = require('art/modes/svg/path');
const Morph = require('art/morph/path');

type Props = {|
  mode: 'fill' | 'gradient',
  size: number,
  fillColor?: ?string,
  gradientColors?: ?AnimatedBlobGradientColorsType,
  animation: Animated.Value,
|};

const BlobShape = ({
  mode,
  size,
  fillColor,
  gradientColors,
  animation,
}: Props) => {
  const [shapePath, setShapePath] = useState('');
  const morphSVGPath = useMemo(() => new SVGPath(), []);

  const morphTransitions = useMemo(() => {
    const paths = [...Array(BLOB_SHAPE_PATTERN_SIZE)].map(() => Morph.Path(generator({ size })));

    const transitions = [];
    for (let index = 0; index < paths.length - 1; index++) {
      transitions.push(Morph.Tween(paths[index], paths[index + 1]));
    }

    for (let index = paths.length - 1; index >= 1; index--) {
      transitions.push(Morph.Tween(paths[index], paths[index - 1]));
    }

    return transitions;
  }, [size]);

  const changeShapePath = useCallback((value: number) => {
    const tweenValue = Number((value % 1).toFixed(4));
    const transitionIndex = Math.floor(value % BLOB_TRANSITION_MAX_INDEX);
    morphTransitions[transitionIndex].tween(tweenValue);
    morphTransitions[transitionIndex].applyToPath(morphSVGPath);
    setShapePath(morphSVGPath.path);
  }, [morphTransitions, morphSVGPath]);

  const shapeFill = useMemo(() => {
    if (mode === 'gradient' && gradientColors) {
      return new LinearGradient(
        {
          '0': gradientColors.start,
          '1': gradientColors.end,
        },
        size / 2, 0, size / 2, size,
      );
    }

    return fillColor ?? '#000';
  }, [
    mode,
    size,
    fillColor,
    gradientColors,
  ]);

  useEffect(() => {
    const id = animation.addListener(({ value }) => {
      changeShapePath(value);
    });

    return () => {
      animation.removeListener(id);
    };
  }, [animation, changeShapePath]);

  return (
    <Surface width={size} height={size}>
      <Shape fill={shapeFill} d={shapePath} />
    </Surface>
  );
};

export default React.memo<Props>(BlobShape);

// @flow
import React, {
  useCallback,
  useMemo,
} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Surface,
  Shape,
  LinearGradient,
} from '@react-native-community/art';

import { type AnimatedBlobGradientColorsType } from '~/animatedBlob/types';

type Props = {|
  colors: AnimatedBlobGradientColorsType,
  gradientColors: ?AnimatedBlobGradientColorsType,
  onPress: (colors: AnimatedBlobGradientColorsType) => mixed,
|};

function getCirclePath(cx: number, cy: number, r: number) {
  return `M ${cx} ${cy} m -${r}, 0 a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`;
}

const CIRCLE_PATH = getCirclePath(15, 15, 15);

const GradientColorButton = ({
  colors,
  gradientColors,
  onPress,
}: Props) => {
  const layout = useMemo(() => ({
    selectStyle: {
      ...styles.select,
      borderColor: (gradientColors?.start === colors.start && gradientColors?.end === colors.end)
        ? colors.end
        : 'transparent',
    },
    circleGradient: new LinearGradient(
      {
        '0': colors.start,
        '1': colors.end,
      },
      15, 0, 15, 30,
    ),
  }), [colors, gradientColors]);

  const onPressCallback = useCallback(() => {
    onPress(colors);
  }, [onPress, colors]);

  return (
    <TouchableWithoutFeedback onPress={onPressCallback}>
      <View style={styles.container}>
        <View style={layout.selectStyle}>
          <Surface width={30} height={30}>
            <Shape fill={layout.circleGradient} d={CIRCLE_PATH} />
          </Surface>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 44,
  },
  select: {
    width: 40,
    height: 40,
    borderRadius: 19,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo<Props>(GradientColorButton);

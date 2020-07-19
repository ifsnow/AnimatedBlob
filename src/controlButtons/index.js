// @flow
import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import {
  GRADIENT_COLORS,
  FILL_COLORS,
} from './colorDefines';
import FillColorButton from './FillColorButton';
import GradientColorButton from './GradientColorButton';

import { type AnimatedBlobGradientColorsType } from '~/animatedBlob/types';

type Props = {|
  fillColor: ?string,
  gradientColors: ?AnimatedBlobGradientColorsType,
  onChangeFillColor: (color: string) => mixed,
  onChangeGradientColor: (colors: AnimatedBlobGradientColorsType) => mixed,
|};

const ControlButtons = ({
  fillColor,
  gradientColors,
  onChangeFillColor,
  onChangeGradientColor,
}: Props) => {
  const gradientColorButtons = useMemo(() => GRADIENT_COLORS.map(colors => (
    <GradientColorButton
      key={`gradient-color-button-${colors.start}-${colors.end}`}
      colors={colors}
      gradientColors={gradientColors}
      onPress={onChangeGradientColor}
    />
  )), [gradientColors, onChangeGradientColor]);

  const fillColorButtons = useMemo(() => FILL_COLORS.map(color => (
    <FillColorButton
      key={`fill-color-button-${color}`}
      color={color}
      fillColor={fillColor}
      onPress={onChangeFillColor}
    />
  )), [fillColor, onChangeFillColor]);

  return (
    <>
      <View style={styles.colors}>
        {gradientColorButtons}
      </View>
      <View style={styles.colors}>
        {fillColorButtons}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  colors: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default React.memo<Props>(ControlButtons);

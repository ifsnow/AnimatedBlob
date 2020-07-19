// @flow

import React, {
  useState,
  useCallback,
} from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

import AnimatedBlob from '~/animatedBlob';
import { type AnimatedBlobGradientColorsType } from '~/animatedBlob/types';
import AnimatedBlobContent from './AnimatedBlobContent';

import ControlButtons from '~/controlButtons';
import { GRADIENT_COLORS } from '~/controlButtons/colorDefines';

const App = () => {
  const [mode, setMode] = useState('gradient');
  const [gradientColors, setGradientColors] = useState<?AnimatedBlobGradientColorsType>(GRADIENT_COLORS[0]);
  const [fillColor, setFillColor] = useState<?string>(null);
  const { width } = useWindowDimensions();

  const changeFillColor = useCallback((color: string) => {
    setMode('fill');
    setFillColor(color);
    setGradientColors(null);
  }, []);

  const changeGradientColor = useCallback((colors: AnimatedBlobGradientColorsType) => {
    setMode('gradient');
    setGradientColors(colors);
    setFillColor(null);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.blob}>
        <AnimatedBlob
          mode={mode}
          gradientColors={gradientColors}
          fillColor={fillColor}
          size={width}
        >
          <AnimatedBlobContent width={width} text="Hello!" />
        </AnimatedBlob>
      </View>

      <View style={styles.buttons}>
        <ControlButtons
          fillColor={fillColor}
          gradientColors={gradientColors}
          onChangeFillColor={changeFillColor}
          onChangeGradientColor={changeGradientColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f9',
  },
  blob: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
});

export default App;

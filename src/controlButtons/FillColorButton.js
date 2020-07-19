// @flow
import React, {
  useCallback,
} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

type Props = {|
  color: string,
  fillColor: ?string,
  onPress: (color: string) => mixed,
|};

const FillColorButton = ({
  color,
  fillColor,
  onPress,
}: Props) => {
  const circleStyle = {
    ...styles.circle,
    backgroundColor: color,
  };

  const selectStyle = {
    ...styles.select,
    borderColor: fillColor === color ? color : 'transparent',
  };

  const onPressCallback = useCallback(() => {
    onPress(color);
  }, [onPress, color]);

  return (
    <TouchableWithoutFeedback onPress={onPressCallback}>
      <View style={styles.container}>
        <View style={selectStyle}>
          <View style={circleStyle} />
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
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default React.memo<Props>(FillColorButton);

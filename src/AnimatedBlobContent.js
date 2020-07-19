// @flow
import React, { useMemo } from 'react';
import { Text } from 'react-native';

type Props = {|
  width: number,
  text: string,
|};

const AnimatedBlobContent = ({
  width,
  text,
}) => {
  const textStyle = useMemo(() => {
    const DEVICE_SCALE = Math.min(480, width) / 360;
    const fontSize = Math.round(DEVICE_SCALE * 40);

    return {
      fontSize,
      fontWeight: 'bold',
      color: '#fff',
    };
  }, [width]);

  return <Text style={textStyle}>{text}</Text>;
};

export default React.memo<Props>(AnimatedBlobContent);

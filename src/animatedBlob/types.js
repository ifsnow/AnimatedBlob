// @flow

export const BLOB_SHAPE_PATTERN_SIZE = 8;

export const BLOB_TRANSITION_MAX_INDEX = (BLOB_SHAPE_PATTERN_SIZE - 1) * 2;

export type AnimatedBlobGradientColorsType = {|
  start: string,
  end: string,
|};

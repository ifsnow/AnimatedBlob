/* eslint-disable no-bitwise */
/*
  Original Code: https://github.com/lokesh-coder/blobs.app/blob/master/src/services/generator.js
*/

const generator = ({
  size = 400,
  growth = 7,
  edges = 7,
}) => {
  const { destPoints } = _createPoints(size, growth, edges);
  return _createSvgPath(destPoints);
};

const _toRad = deg => deg * (Math.PI / 180.0);

const _divide = count => {
  const deg = 360 / count;

  return Array(count)
    .fill('a')
    .map((_, i) => i * deg);
};

const _randomDoubleGenerator = s => {
  const mask = 0xffffffff;
  let m_w = (123456789 + s) & mask;
  let m_z = (987654321 - s) & mask;

  return function () {
    m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;

    let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
  };
};

const _magicPoint = (value, min, max) => {
  let radius = min + value * (max - min);
  if (radius > max) {
    radius -= min;
  } else if (radius < min) {
    radius += min;
  }
  return radius;
};

const _point = (origin, radius, degree) => {
  const x = origin + radius * Math.cos(_toRad(degree));
  const y = origin + radius * Math.sin(_toRad(degree));
  return [Math.round(x), Math.round(y)];
};

const _shuffle = array => {
  array.sort(() => Math.random() - 0.5);
  return array;
};

const _createPoints = (size, minGrowth, edgesCount) => {
  const outerRad = size / 2;
  const innerRad = minGrowth * (outerRad / 10);
  const center = size / 2;

  const slices = _divide(edgesCount);
  const maxRandomValue = _shuffle([99, 999, 9999, 99999, 999999])[0];
  const id = Math.floor(Math.random() * maxRandomValue);
  const seedValue = id;
  const randVal = _randomDoubleGenerator(seedValue);
  const destPoints = [];

  slices.forEach(degree => {
    const O = _magicPoint(randVal(), innerRad, outerRad);
    const end = _point(center, O, degree);
    destPoints.push(end);
  });
  return {
    destPoints,
    id,
  };
};

const _createSvgPath = points => {
  let svgPath = '';
  let mid = [
    (points[0][0] + points[1][0]) / 2,
    (points[0][1] + points[1][1]) / 2,
  ];
  svgPath += `M${mid[0]},${mid[1]}`;

  for (let i = 0; i < points.length; i++) {
    const p1 = points[(i + 1) % points.length];
    const p2 = points[(i + 2) % points.length];
    mid = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
    svgPath += `Q${p1[0]},${p1[1]},${mid[0]},${mid[1]}`;
  }
  svgPath += 'Z';
  return svgPath;
};

export default generator;

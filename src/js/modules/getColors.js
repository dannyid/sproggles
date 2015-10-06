const cssProperties = [
  "backgroundColor",
  "borderBottomColor",
  "borderColor",
  "borderLeftColor",
  "borderRightColor",
  "borderTopColor",
  "color",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorRendering",
  "floodColor",
  "lightingColor",
  "outlineColor",
  "stopColor",
  "webkitBorderAfterColor",
  "webkitBorderBeforeColor",
  "webkitBorderEndColor",
  "webkitBorderStartColor",
  "webkitColumnRuleColor",
  "webkitPrintColorAdjust",
  "webkitTapHighlightColor",
  "webkitTextEmphasisColor",
  "webkitTextFillColor",
  "webkitTextStrokeColor"
];

const domElements = [].slice.call(document.querySelectorAll('body *:not(script):not(style)'));

export default () => {
  const colorMap = {};

  domElements.forEach(el => {
    const elementStyle = window.getComputedStyle(el);

    cssProperties.forEach(colorProperty => {
      const colorValue = elementStyle[colorProperty].indexOf('rgb') !== -1 ? elementStyle[colorProperty] : '';
      const colorArray = colorValue.split(') ').join(')|').split('|').filter(e => e !== '');

      colorArray.forEach(color => {
        if (typeof colorMap[color] === 'undefined') {
          colorMap[color] = new Set();
        }
        colorMap[color].add(el);
      })
    });
  });
  return colorMap;
};

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

export default domElements => {
  // This becomes an Object of Sets, keyed by the rgb color value
  // The Set contains an Object of {domNode, colorProperty}
  const colorMap = {};

  domElements.forEach(domNode => {
    const elementComputedStyle = window.getComputedStyle(domNode);

    cssProperties.forEach(colorProperty => {
      const colorValue = elementComputedStyle[colorProperty].indexOf('rgb') !== -1 ? elementComputedStyle[colorProperty] : '';
      const colorArray = colorValue.split(') ').join(')|').split('|').filter(e => e !== '');

      colorArray.forEach(color => {
        if (
          color.indexOf('(0, 0, 0') !== -1 ||
          color.indexOf('(255, 255, 255') !== -1
        ) {
          return;
        }

        if (typeof colorMap[color] === 'undefined') {
          colorMap[color] = new Set();
        }

        colorMap[color].add({domNode, colorProperty});
      })
    });
  });
  return colorMap;
};

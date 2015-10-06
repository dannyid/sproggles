const domElements = [].slice.call(document.querySelectorAll('body *:not(script):not(style)'));

export function getFonts() {
  const fontMap = {};

  domElements.forEach(el => {
    const elementStyle = window.getComputedStyle(el);
    const fontValue = elementStyle.fontFamily;
    const fontArray = fontValue.split("'").join('').split(', ').filter(e => e !== '');

    fontArray.forEach(font => {
      if (typeof fontMap[font] === 'undefined') {
        fontMap[font] = new Set();
      }
      fontMap[font].add(el);
    })
  });
  return fontMap;
}

import $ from 'jquery';

export default (colors) => {
  return colors.map((color) => {
    if (color === 'rgb(0, 0, 0)' ||
      color === 'rgba(0, 0, 0, 0)' ||
      color === 'rgb(255, 255, 255)' ||
      color === 'rgba(255, 255, 255, 1)') {
      return null;
    }
    return $(
      `<div class="color-square-container">` +
        `<div id="${color}" class="color-square" style="background-color: ${color};"></div>` +
        `<div class="color-name">${color}</div>` +
      `</div>`
    );
  });
};

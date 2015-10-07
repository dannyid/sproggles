import humanize from 'humanize';

export function convertRgbToHex(color) {
  if (color.indexOf('rgba') !== -1) {return color; }

  return '#' + color.slice(4, -1).split(',').map((i) => {
    var hexValue = parseInt(i, 10).toString(16).toUpperCase();
    // if the hex value is < 10, add a leading 0
    return hexValue.length === 1 ? '0' + hexValue : hexValue;
  }).join('');
}

export function completeImageUrl(imageUrl) {
  if (imageUrl.indexOf('//') === 0) {
    return window.location.protocol + imageUrl;
  } else if (imageUrl.indexOf('/') === 0) {
    return window.location.origin + imageUrl;
  }
  return imageUrl;
}

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Pulled from here: http://beeker.io/jquery-document-ready-equivalent-vanilla-javascript
export function domReady(callback) {
  const {readyState} = document;
  if (readyState === "interactive" || readyState === "complete") {
   callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}

export function formatNum(num) {
  return humanize.numberFormat(num, 0);
}

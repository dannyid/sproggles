import $ from 'jquery';

export function convertRgbToHex(color) {
  return '#' + color.slice(4, -1).split(',').map((i) => {
    var hexValue = parseInt(i, 10).toString(16).toUpperCase();
    // if the hex value is < 10, add a leading 0
    return hexValue.length === 1 ? '0' + hexValue : hexValue;
  }).join('');
}

export function createSelectors() {
  return {
    $colorsTab: $('.tab-content #colors'),
    $fontsTab: $('.tab-content #fonts'),
    $imagesTab: $('.tab-content #images'),
    $spinner: $('#spinner'),
    $tabPanel: $('#tabpanel'),
    $tabContent: $('.tab-content'),
    $tab: $('ul.nav-tabs li a'),
    $themeButton: $('span.dark-theme'),
    $pleaseRefresh: $('#please-refresh'),
    $twitterShareCount: $('.twitter-share-count'),
    $facebookShareCount: $('.facebook-share-count'),
    $linkedInShareCount: $('.linkedin-share-count'),
    $pinterestShareCount: $('.pinterest-share-count'),
    $feedbackButton: $('.feedback-button'),
    $feedbackForm: $('.tab-content #feedback-form'),
    $feedbackToolbar: $('#tabpanel .tab-pane-toolbar #feedback'),
    $derivedKeywords: $('.derived-keywords'),
    $keywordForm: $('.derived-keywords form')
  };
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

export function resetCSS(...additionalStyles) {
  const normalize = {
    // all: 'initial',
    // azimuth: 'center',
    borderCollapse: 'separate',
    borderSpacing: 0,
    boxSizing: 'border-box',
    captionSide: 'top',
    color: 'black',
    cursor: 'auto',
    direction: 'ltr',
    // elevation: '',
    emptyCells: 'show',
    // font: '',
    fontFamily: 'sans-serif',
    fontSize: 'medium',
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: 'normal',
    letterSpacing: 'normal',
    lineHeight: 'normal',
    listStyleImage: 'none',
    listStylePosition: 'outside',
    listStyleType: 'disc',
    margin: 0,
    orphans: 2,
    padding: 0,
    textAlign: 'left',
    textIndent: 0,
    textTransform: 'none',
    visibility: 'visible',
    whiteSpace: 'normal',
    widows: 2,
    wordSpacing: 'normal'
  };

  // Object.assign requires a gulp-babel plugin to function
  return Object.assign({}, normalize, ...additionalStyles);
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

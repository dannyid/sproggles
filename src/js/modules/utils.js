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
    $feedbackToolbar: $('#tabpanel .tab-pane-toolbar #feedback')
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

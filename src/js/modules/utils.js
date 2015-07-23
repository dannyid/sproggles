import $ from 'jquery';
import * as mixpanelEvents from './mixpanelEvents';

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

export function reduceColorsAndFonts(elements) {
  return elements.reduce((prev, curr) => {
    // Derives all the colors
    Object.keys(prev.colors).forEach((prop) => {
      var colorValue = $(curr).css(prop);

      // Store colors in respective buckets
      if (colorValue && $.inArray(colorValue, prev.colors[prop]) === -1) {
        prev.colors[prop].push(colorValue);
      }

      // Create "allColors" array to store all colors not broken out by type
      if (colorValue && $.inArray(colorValue, prev.results.allColors) === -1) {
        prev.results.allColors.push(colorValue);
      }
    });

    // Derives all the fonts
    Object.keys(prev.fonts).forEach((prop) => {
      // Separates out font declarations by commas
      var fontValue = $(curr).css(prop).split(',');

      // Trims lead/trailing spaces/quotes
      fontValue.forEach((font) => {
        font = font.trim().replace(/\'/g, '');
        // Store fonts in respective buckets
        if (font && $.inArray(font, prev.fonts[prop]) === -1) {
          prev.fonts[prop].push(font);
        }

        // Create "allFonts" array to store all fonts not broken out by type
        if (font && $.inArray(font, prev.results.allFonts) === -1) {
          prev.results.allFonts.push(font);
        }
      });
    });

    return prev;
  }, {
    "colors": {
      "color": [],
      "background-color": [],
      "border-bottom-color": [],
      "border-left-color": [],
      "border-right-color": [],
      "border-top-color": [],
      "text-decoration-color": [],
      "outline-color": [],
      "column-rule-color": []
    },
    "fonts": {
      "font-family": []
    },
    "results": {
      "allColors": [],
      "allFonts": [],
      "allImages": []
    }
  });
}

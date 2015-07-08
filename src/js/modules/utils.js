import $ from 'jquery';

export function convertRgbToHex(color) {
  console.log('convert rgb');
  return '#' + color.slice(4, -1).split(',').map((i) => {
    var hexValue = parseInt(i, 10).toString(16).toUpperCase();
    // if the hex value is < 10, add a leading 0
    return hexValue.length === 1 ? '0' + hexValue : hexValue;
  }).join('');
}

export function colorSquareClickListener() {
  const $colorSquare = $('.color-square');
  let timeout = 0;

  function copyColorToClipboard(e) {
    console.log('copied!');
    const $input = $('input#clipboard');
    const $copied = $('.copied.alert');
    const color = ((colorCode) => {
      if (colorCode.indexOf('rgba') !== -1) {
        return colorCode;
      } else if (colorCode.indexOf('rgb') !== -1) {
        return convertRgbToHex(colorCode);
      }
    })($(e.currentTarget).attr('id'));

    $input.val(color).select();
    document.execCommand('Copy');

    $copied.text(`Copied: ${color}`).hide().fadeIn(200);

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      $copied.fadeOut(200);
    }, 2000);
  }

  return {
    attach: function() {
      $colorSquare.click(copyColorToClipboard);
    }
  };
}

export function tabClickHandler(e) {
  console.log('tab click handler');
  e.preventDefault();
  const $this = $(e.currentTarget);
  const tabId = $this.attr('href').substr(1);
  const $relatedTabPanel = $(`.tab-content .tab-pane#${tabId}`);

  $this
    .parent().addClass('active').fadeIn()
    .siblings().removeClass('active');

  $relatedTabPanel
    .addClass('in active').fadeIn()
    .siblings().removeClass('in active');
}

export function createSelectors() {
  console.log('create selectors');
  const $colorsTab = $('#colors');
  const $fontsTab = $('#fonts');
  const $imagesTab = $('#images');
  const $spinner = $('#spinner');
  const $tabPanel = $('#tabpanel');
  const $tab = $('ul.nav-tabs li a');
  return [
    $colorsTab,
    $fontsTab,
    $imagesTab,
    $spinner,
    $tabPanel,
    $tab
  ];
}

export function completeImageUrl(imageUrl) {
  console.log('complete imgage url');
  if (imageUrl.indexOf('//') === 0) {
    return window.location.protocol + imageUrl;
  } else if (imageUrl.indexOf('/') === 0) {
    return window.location.origin + imageUrl;
  }
  return imageUrl;
}

export function reduceColorsAndFonts(elements) {
  console.log('reduce colors');
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
};

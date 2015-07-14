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

    // Insert color value text into input box and copy it to the clipboard
    $input.val(color).select();
    document.execCommand('Copy');

    // Activate "copied" alert and then fade it out
    $copied.text(`Copied: ${color}`).addClass('active');
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      $copied.removeClass('active');
    }, 2000);
  }

  return {
    attach: function() {
      $colorSquare.click(copyColorToClipboard);
    }
  };
}

export function tabClickHandler(e) {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const tabId = $this.attr('href').substr(1);
  const $relatedToolbar = $(`.tab-pane-toolbar #${tabId}`);
  const $relatedTabPanel = $(`.tab-content .tab-pane#${tabId}`);
  console.log(`Tab #${tabId} has been clicked`);

  // Highlight active tab
  $this
    .parent().addClass('active').fadeIn()
    .siblings().removeClass('active');

  // Choose proper toolbar
  $relatedToolbar
    .addClass('active').fadeIn()
    .siblings().removeClass('active');

  // Display proper tab content
  $relatedTabPanel
    .addClass('in active').fadeIn()
    .siblings().removeClass('in active');
}

export function themeButtonClickHandler(e) {
  $('span.dark-theme').toggleClass('dark');
  $('.tab-content').toggleClass('dark');
}

export function createSelectors() {
  console.log('Selectors created.');
  return {
    $colorsTab: $('.tab-content #colors'),
    $fontsTab: $('.tab-content #fonts'),
    $imagesTab: $('.tab-content #images'),
    $spinner: $('#spinner'),
    $tabPanel: $('#tabpanel'),
    $tab: $('ul.nav-tabs li a'),
    $themeButton: $('span.dark-theme'),
    $pleaseRefresh: $('#please-refresh'),
    $twitterShareCount: $('.twitter-share-count'),
    $facebookShareCount: $('.facebook-share-count'),
    $linkedInShareCount: $('.linkedin-share-count'),
    $pinterestShareCount: $('.pinterest-share-count')
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

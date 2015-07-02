import $ from 'jquery';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  function completeImageUrl(imageUrl) {
    if (imageUrl.indexOf('//') === 0) {
      return window.location.protocol+imageUrl;
    } else if (imageUrl.indexOf('/') === 0) {
      return window.location.origin+imageUrl;
    }
    return imageUrl;
  }

  if (request.get === "pageData") {
    var elements = $.makeArray($('body *').not('script, link, style'));
    var images = $.makeArray($('body img'));

    var reduced = elements.reduce((prev, curr) => {
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

    console.log(reduced);

    // Sort fonts in alphabetical order
    reduced.results.allFonts.sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    }); 

    // Derives all the images
    images.forEach((i) => {
      var imageUrl = completeImageUrl($(i).attr('src') || '');

      if (imageUrl && $.inArray(imageUrl, reduced.results.allImages) === -1) {
        reduced.results.allImages.push(imageUrl); 
      }
    });

    // Send data to popup.js
    sendResponse({
      colors: reduced.results.allColors,
      fonts: reduced.results.allFonts,
      images: reduced.results.allImages
    });
  }
});

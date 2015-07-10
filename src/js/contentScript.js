import $ from 'jquery';
import {completeImageUrl, reduceColorsAndFonts} from './modules/utils';

$(() => {
  // Get fonts and colors on page load
  const elements = $.makeArray($('body *').not('script, link, style'));
  const images = $.makeArray($('body img'));

  let reduced = reduceColorsAndFonts(elements);

  console.log(reduced);

  // Sort fonts in alphabetical order
  reduced.results.allFonts.sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  });

  // Derives all the images and adds them to the reduced result
  images.forEach((i) => {
    var imageUrl = completeImageUrl($(i).attr('src') || '');

    // Dedupe images and only add one of each
    if (imageUrl && $.inArray(imageUrl, reduced.results.allImages) === -1) {
      reduced.results.allImages.push(imageUrl);
    }
  });

  // Only send gotten fonts and colors upon message from popup.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.get === "pageData") {
      // Send data to popup.js
      sendResponse({
        colors: reduced.results.allColors,
        fonts: reduced.results.allFonts,
        images: reduced.results.allImages,
        url: location.origin + (location.pathname || '')
      });
    }
  });
});

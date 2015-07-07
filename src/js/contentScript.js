import $ from 'jquery';
import {completeImageUrl, reduceColorsAndFonts} from './modules/utils'

$(() => {
  // Get fonts and colors on page load
  var elements = $.makeArray($('body *').not('script, link, style'));
  var images = $.makeArray($('body img'));

  var reduced = reduceColorsAndFonts(elements);

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

  // Only send gotten fonts and colors upon message from popup.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.get === "pageData") {
      // Send data to popup.js
      sendResponse({
        colors: reduced.results.allColors,
        fonts: reduced.results.allFonts,
        images: reduced.results.allImages
      });
    }
  });
});
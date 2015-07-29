import $ from 'jquery';
import React from 'react';
import ColorsPanel from './components/ColorsPanel.js';
import {completeImageUrl} from './modules/utils';
import reduceColorsAndFonts from './modules/reduceColorsAndFonts';

$(() => {
  // Only send gotten fonts and colors upon message from popup.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.get === "pageData") {
      // Get fonts and colors on page load
      const elements = $.makeArray($('body *').not('script, link, style'));
      const images = $.makeArray($('body img'));

      let reduced = reduceColorsAndFonts(elements);

      // Sort fonts in alphabetical order
      reduced.results.allFonts.sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });

      // Derives all the images and adds them to the reduced result
      images.forEach((i) => {
        const imgSrc = $(i).attr('src') || '';
        const imageUrl = completeImageUrl(imgSrc);

        // Dedupe images and only add one of each
        if (imageUrl && $.inArray(imageUrl, reduced.results.allImages) === -1) {
          reduced.results.allImages.push(imageUrl);
        }
      });

      console.log(reduced);
      // Send data to popup.js
      sendResponse({
        colors: reduced.results.allColors,
        fonts: reduced.results.allFonts,
        images: reduced.results.allImages,
        url: location.origin + (location.pathname || '')
      });
    }
  });

  const app = document.createElement('div');
  app.id = 'sproggles-app';
  document.body.appendChild(app);


  React.render(
    <ColorsPanel />,
    document.getElementById('sproggles-app')
  );
});

import $ from 'jquery';
import reduceColorsAndFonts from './reduceColorsAndFonts';
import {completeImageUrl} from './utils';

export default () => {
  // Get fonts and colors on page load
  const elements = $.makeArray($('body *').not('script, link, style'));

  // Whittle DOM nodes down into list of colors and fonts
  const reduced = reduceColorsAndFonts(elements);

  // Derive all the images and add them to the reduced result
  const images = $.makeArray($('body img'));

  images.forEach((i) => {
    const imgSrc = $(i).attr('src') || '';
    const imageUrl = completeImageUrl(imgSrc);
    const imageNotDupe = $.inArray(imageUrl, reduced.results.allImages) === -1;
    const imageNotFromExtension = imageUrl.indexOf('chrome-extension') === -1;

    // Dedupe images and only add one of each
    // Also exclude extension's own images
    if (imageUrl && imageNotDupe && imageNotFromExtension) {
      reduced.results.allImages.push(imageUrl);
    }
  });

  return reduced.results;
};

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

    // Dedupe images and only add one of each
    // Also exclude extension's own images
    if (
      imageUrl &&
      $.inArray(imageUrl, reduced.results.allImages) === -1 &&
      imageUrl.indexOf('chrome-extension') === -1
    ) {
      reduced.results.allImages.push(imageUrl);
    }
  });
  console.log(reduced.results);

  return reduced.results;
}

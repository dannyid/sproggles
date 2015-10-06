import {completeImageUrl} from './utils';

export default () => {
  const images = [].slice.call(document.querySelectorAll('body img'));
  const bgImages = [].slice.call(document.querySelectorAll('body img'))

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
